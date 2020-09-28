import React, { useRef } from 'react'
import { ColumnContainer, ColumnTitle } from '../styles'
import { AddNewItem } from './AddNewItem'
import { useAppState } from '../AppStateContext'
import { Card } from './Card'
import { useItemDrag } from '../utils/useItemDrag'

interface ColumnProps {
  text: string
  index: number
  id: string

  /* Optional Value, React.PropsWithChildren handle it clearly
  children?: React.ReactNode
  */
}

export const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)

  const { drag } = useItemDrag({ type: 'COLUMN', id, index, text })

  drag(ref)

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        toogleButtonText="+ Add another task"
        onAdd={(text) =>
          dispatch({ type: 'ADD_TASK', payload: { text, listId: id } })
        }
        dark
      />
    </ColumnContainer>
  )
}
