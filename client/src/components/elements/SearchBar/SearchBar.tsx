import { Dispatch, SetStateAction, useContext, useRef } from 'react'

import { OtherSettingsContext } from '../../../providers'
import { DynamicContainer } from '../../modules'
import * as Styled from './SearchBar.styled'

export const SearchBar: React.FC = () => {
  const { containerColor } = useContext(OtherSettingsContext)

  const searchRef = useRef() as
    | React.RefObject<HTMLInputElement>
    | null
    | undefined

  return (
    <DynamicContainer
      defaultLocation={{ x: 0.5, y: 0.7 }}
      nodeTitle="SearchBar"
    >
      <Styled.SearchBarContainer containerColor={containerColor}>
        <Styled.SearchBarForm
          onSubmit={(e) => {
            e.preventDefault()
            if (searchRef && searchRef.current?.value) {
              window.open(
                '//' + 'google.com/search?q=' + searchRef.current.value,
                '_blank'
              )
              searchRef.current.value = ''
            }
          }}
        >
          <Styled.SearchIconContainer>
            <Styled.SearchIcon size={24} />
          </Styled.SearchIconContainer>
          <Styled.SearchNoteInput ref={searchRef} />
        </Styled.SearchBarForm>
      </Styled.SearchBarContainer>
    </DynamicContainer>
  )
}
