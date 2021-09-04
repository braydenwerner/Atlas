import { useState, useRef, useContext, useEffect } from 'react'

import {
  useCreateDrawingMutation,
  useUpdateDrawingMutation,
  GetDrawingsDocument,
  useDeleteDrawingMutation,
  useGetDrawingsLazyQuery,
} from '../../../generated/graphql'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { DynamicContainer } from '../../modules'
import { OtherSettingsContext, SignedInContext } from '../../../providers'
import { drawingsType } from '../../../types'
import * as Styled from './Drawings.styled'

//https://vinoth.info/react-sketch-canvas/?path=/story/documentation-react-sketch-canvas--page

export type Drawings = drawingsType[]

export const Drawings: React.FC = () => {
  const { tokenAttached } = useContext(SignedInContext)

  const { containerColor } = useContext(OtherSettingsContext)

  const [minimizeDrawings, setMinimizeDrawings] = useLocalStorage(
    'minimizeDrawings',
    true
  )

  const [drawings, setDrawings] = useState<Drawings>()
  const [drawingsIndex, setDrawingsIndex] = useState<number>(0)
  const [draggableDisabled, setDraggableDisabled] = useState(false)
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [toggleColorPicker, setToggleColorPicker] = useState(false)
  // const [toggleWidthPicker, setToggleWidthPicker] = useState(false)
  const [useEraser, setUseEraser] = useState(false)
  const [, setPrevImageData] = useState()

  const [getDrawings, { data }] = useGetDrawingsLazyQuery()
  const drawingsData = data && data.getDrawings

  const [createDrawing] = useCreateDrawingMutation()
  const [updateDrawing] = useUpdateDrawingMutation()
  const [deleteDrawing] = useDeleteDrawingMutation()

  const canvasRef = useRef<any>()

  useEffect(() => {
    if (tokenAttached) {
      getDrawings()
    }
  }, [tokenAttached])

  useEffect(() => {
    if (drawingsData) {
      initDrawings()
    }
  }, [drawingsData])

  useEffect(() => {
    if (!drawings) return

    const save = setInterval(saveContent, 1000)

    return () => clearInterval(save)
  }, [drawings])

  const initDrawings = async () => {
    if (drawingsData) {
      if (drawingsData.length === 0) {
        await createDrawing({
          refetchQueries: [{ query: GetDrawingsDocument }],
        })
      }
      loadDrawing(drawingsIndex)

      setDrawings(drawingsData)
    }
  }

  const loadDrawing = async (updatedDrawingsIndex: number) => {
    if (drawingsData) {
      canvasRef.current.resetCanvas()
      if (drawingsData[updatedDrawingsIndex]?.imageData) {
        const imagesData = JSON.parse(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          drawingsData[updatedDrawingsIndex].imageData!
        )
        if (canvasRef && canvasRef.current) {
          await canvasRef.current.loadPaths(imagesData)
        }
      }
    }
  }

  const saveContent = async () => {
    if (canvasRef && canvasRef.current) {
      const imageData = await canvasRef.current.exportPaths()

      let updatedPrevImageData
      setPrevImageData((oldPrevImageData) => {
        updatedPrevImageData = oldPrevImageData
        return oldPrevImageData
      })

      // let updatedDrawingsIndex = drawingsIndex
      // setDrawingsIndex((oldDrawingsIndex) => {
      //   updatedDrawingsIndex = oldDrawingsIndex
      //   return oldDrawingsIndex
      // })

      if (
        drawingsData &&
        drawingsIndex >= 0 &&
        imageData !== updatedPrevImageData
      ) {
        setPrevImageData(imageData)
        updateDrawing({
          variables: {
            id: drawingsData[drawingsIndex].id,
            data: {
              imageData: JSON.stringify(imageData),
            },
          },
        })
      }
    }
  }

  return (
    <>
      <DynamicContainer
        nodeTitle="Drawings"
        defaultLocation={{ x: 0.4, y: 0.3 }}
        draggableDisabled={draggableDisabled}
      >
        <Styled.ToggleView showCard={minimizeDrawings}>
          <Styled.DrawingCard containerColor={containerColor}>
            <Styled.ButtonsContainer>
              <Styled.ColorPickerIcon
                backgroundColor={strokeColor}
                onClick={() => setToggleColorPicker(!toggleColorPicker)}
              />

              {/* <Styled.WidthSelector> </Styled.WidthSelector> */}
              <Styled.EraserIcon
                size={32}
                $isErasing={useEraser}
                onClick={() => {
                  canvasRef.current.eraseMode(!useEraser)
                  setUseEraser((oldUseEraser) => !oldUseEraser)
                }}
              />
              <Styled.UndoIcon
                size={22}
                onClick={async () => {
                  canvasRef.current.undo()
                  await saveContent()
                }}
              />
              <Styled.RedoIcon
                size={22}
                onClick={async () => {
                  canvasRef.current.redo()
                  await saveContent()
                }}
              />
              <Styled.TrashIcon
                size={32}
                onClick={async () => {
                  // if the user deletes and they only have one page, clear the canvas, not need to run the mutation
                  if (drawings) {
                    if (drawings.length > 1) {
                      await deleteDrawing({
                        variables: { id: drawings[drawingsIndex].id },
                        refetchQueries: [{ query: GetDrawingsDocument }],
                      })
                      //setDrawingsIndex(
                      //   (oldDrawingsIndex) => oldDrawingsIndex - 1
                      // )
                    } else {
                      await updateDrawing({
                        variables: {
                          id: drawings[drawingsIndex].id,
                          data: { imageData: '' },
                        },
                      })
                      canvasRef.current.resetCanvas()
                    }
                  }

                  if (drawings) {
                    await updateDrawing({
                      variables: {
                        id: drawings[drawingsIndex].id,
                        data: { imageData: '' },
                      },
                    })
                    canvasRef.current.resetCanvas()
                  }
                }}
              />
            </Styled.ButtonsContainer>
            {toggleColorPicker && (
              <Styled.ColorPickerContainer
                onMouseEnter={() => setDraggableDisabled(true)}
                onMouseLeave={() => setDraggableDisabled(false)}
              >
                <Styled.ColorPicker
                  colors={[
                    '#000000',
                    '#B80000',
                    '#DB3E00',
                    '#FCCB00',
                    '#008B02',
                    '#1273DE',
                    '#004DCF',
                    '#5300EB',
                  ]}
                  triangle="hide"
                  onChangeComplete={(color) => {
                    canvasRef.current.eraseMode(false)
                    setStrokeColor(color.hex)
                    setUseEraser(false)
                  }}
                />
              </Styled.ColorPickerContainer>
            )}
            <Styled.DrawingContainer
              onMouseEnter={() => setDraggableDisabled(true)}
              onMouseLeave={() => setDraggableDisabled(false)}
            >
              <Styled.Whiteboard
                ref={canvasRef}
                width="400px"
                height="300px"
                strokeWidth={4}
                strokeColor={strokeColor}
                style={{ border: 'none' }}
              />
            </Styled.DrawingContainer>
            {/* <Styled.PaginationContainer>
              {
                 <Styled.LeftPageArrow
                size={20}
                onClick={async () => {
                  if (drawings && drawingsIndex > 0) {
                    loadDrawing(drawingsIndex - 1)
                    setDrawingsIndex((oldDrawingsIndex) => oldDrawingsIndex - 1)
                  }
                }}
                /> 
              }
              {<Styled.PaginationLabel>
                {drawingsIndex + 1} / {drawings?.length}
              </Styled.PaginationLabel>}
              {
                <Styled.RightPageArrow
                size={20}
                onClick={async () => {
                  if (
                    drawingsData &&
                    drawingsIndex + 1 >= drawingsData.length
                  ) {
                    console.log('in createdrawing block')
                    const selectedDrawing = await createDrawing({
                      refetchQueries: [{ query: GetDrawingsDocument }],
                    })
                  }
                  loadDrawing(drawingsIndex + 1)
                  setDrawingsIndex((oldDrawingsIndex) => oldDrawingsIndex + 1)
                }}
                /> 
              }
            </Styled.PaginationContainer> */}
          </Styled.DrawingCard>
        </Styled.ToggleView>
      </DynamicContainer>
      <Styled.MinimizeDrawingsButton
        minimizeDrawings={minimizeDrawings}
        onClick={async () => {
          setMinimizeDrawings((oldMinimizeDrawings) => !oldMinimizeDrawings)
        }}
      >
        Drawings
      </Styled.MinimizeDrawingsButton>
    </>
  )
}
