const { ipcRenderer } = require('electron')
import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
// import store from '../shared/store/storyStore'
const store = require('../shared/store/storyStore')
export { store }
import electron from 'electron'
const remote = require('@electron/remote')
const electronApp = electron.app ? electron.app : remote.app
const userDataPath = electronApp.getPath('userData')

const App = () => {
  const boardData = useSelector(state => state.boardData);
  useEffect(() => {
    console.log('boardData', boardData)
  }, [boardData])

  if (!boardData) {
    return <div>No board data</div>
  }

  return (
    <div>
      {boardData.boards.map((board, index) => (
        <div key={index}>
          <h1>{board.url}</h1>
        </div>
      ))}
    </div>
  )
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppWrapper