import React from 'react'
import { ColumnContainer, ColumnTitle } from '../styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../AppStateContext'
import { Card } from './Card'

interface ColumnProps {
  text: string
  index: number

  /* Optional Value, React.PropsWithChildren handle it clearly
  children?: React.ReactNode
  */
}

export const Column = ({ text, index }: ColumnProps) => {
  const { state } = useAppState()

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        toogleButtonText="+ Add another task"
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  )
}
