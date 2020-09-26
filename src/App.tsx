import React from 'react'
import { Column } from './components/Column'
import { Card } from './components/Card'
import { AppContainer } from './styles'
import { AddNewItem } from './components/AddNewItem'
import { useAppState } from './AppStateContext'

const App = () => {
  const { state, dispatch } = useAppState()
  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i}></Column>
      ))}
      <AddNewItem
        toogleButtonText="+ Add another todo"
        onAdd={(text) => dispatch({ type: 'ADD_LIST', payload: text })}
      />
    </AppContainer>
  )
}

export default App
