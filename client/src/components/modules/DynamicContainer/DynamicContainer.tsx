import React, { useState, useEffect, useRef, RefObject } from 'react'
import Draggable from 'react-draggable'

import { useLocalStorage } from '../../../hooks/useLocalStorage'

interface DynamicContainerProps {
  nodeTitle: string
  defaultLocation: NodeLocation
  fullscreen?: boolean
  draggableDisabled?: boolean
  nodeLoc?: NodeLocation
}

export type NodeLocation = { x: number; y: number }

export const DynamicContainer: React.FC<DynamicContainerProps> = ({
  children,
  nodeTitle,
  defaultLocation,
  draggableDisabled,
  fullscreen,
  nodeLoc,
}) => {
  //  if the user stops dragging, and container in the corner, set as px position, not percentage position
  const [dragging, setDragging] = useState(false)
  const [nodeLocation, setNodeLocation] = useLocalStorage<NodeLocation>(
    `${nodeTitle}-location`,
    defaultLocation
  )
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const dragRef = useRef() as RefObject<Draggable>

  useEffect(() => {
    if (nodeLoc) {
      console.log('setting node location')
      setNodeLocation(nodeLoc)
    }
  }, [nodeLoc])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [dragRef])

  //  when the container becomes fullscreen, the position of the
  //  draggable does not auto update, manually set the location
  useEffect(() => {
    if (fullscreen && draggableDisabled) {
      setNodeLocation({ x: 0, y: 0 })
    }
  }, [fullscreen, draggableDisabled])

  const handleWindowResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  return (
    <Draggable
      defaultPosition={{
        x: windowSize.width * nodeLocation.x,
        y: windowSize.height * nodeLocation.y,
      }}
      position={{
        x: windowSize.width * nodeLocation.x,
        y: windowSize.height * nodeLocation.y,
      }}
      bounds="parent"
      disabled={draggableDisabled}
      onStop={(e: any, d: any) => {
        setDragging(false)
        setNodeLocation({
          x: d.x / window.innerWidth,
          y: d.y / window.innerHeight,
        })
      }}
      onDrag={() => setDragging(true)}
      ref={dragRef}
    >
      {children}
    </Draggable>
  )
}
