import React, { useState } from 'react'
import { NewItemButton, NewItemFormContainer, NewItemInput } from '../styles'
import { useFocus } from '../utils/useFocus'

interface NewItemProps {
  onAdd(text: string): void
}

export const NewItemForm = ({ onAdd }: NewItemProps) => {
  const [text, setText] = useState('')
  const inputRef = useFocus()

  return (
    <NewItemFormContainer>
      <NewItemInput
        value={text}
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  )
}
