import React from 'react'
import { Column } from './components/Column'
import { Card } from './components/Card'
import { AppContainer } from './styles'
import { AddNewItem } from './components/AddNewItem'
import { useAppState } from './AppStateContext'

const App = () => {
  const { state } = useAppState()
  return (
    <AppContainer>
      {/* <Column text="To Do">
        <Card text="Generate App Scaffold"></Card>
      </Column>
      <Column text="In Progress">
        <Card text="Learning TypeScript"></Card>
      </Column>
      <Column text="Done">
        <Card text="Begin to use static typing"></Card>
      </Column> */}
      {state.lists.map((list, i) => (
        <Column text={list.text} key={list.id} index={i}></Column>
      ))}
      <AddNewItem toogleButtonText="+ Add another todo" onAdd={console.log} />
    </AppContainer>
  )
}

export default App
