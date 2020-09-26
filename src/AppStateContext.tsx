import React, { createContext, useReducer, useContext } from 'react'
import { nanoid } from 'nanoid'
import { findItemIndexById } from './utils/findItemIndexById'
import { moveItem } from './MoveItem'

interface Task {
  id: string
  text: string
}

interface List {
  id: string
  text: string
  tasks: Task[]
}

export interface AppState {
  lists: List[]
}

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

/* This technique called discriminated union */
type Action =
  | { type: 'ADD_LIST'; payload: string }
  | { type: 'ADD_TASK'; payload: { text: string; listId: string } }
  | { type: 'MOVE_LIST'; payload: { dragIndex: number; hoverIndex: number } }

const appData: AppState = {
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps,
)

/*Switch Case wrapped with curly brackets to define the block scope
  if we remove the curly brackets, ts will throw the error
*/
const AppStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] },
        ],
      }
    }
    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId,
      )
      state.lists[targetLaneIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text,
      })
      return {
        ...state,
      }
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return {
        ...state,
      }
    }
    default: {
      return state
    }
  }
}

export const useAppState = () => {
  return useContext(AppStateContext)
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(AppStateReducer, appData)
  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}
