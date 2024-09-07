const { ipcRenderer } = require('electron')
import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import TagTree from './components/tagsTree'
import { Input } from 'antd'
import './index.scss'
// import store from '../shared/store/storyStore'
const store = require('../shared/store/storyStore')
export { store }
import electron from 'electron'
const remote = require('@electron/remote')
const electronApp = electron.app ? electron.app : remote.app
import Text from '../../components/Text';
const userDataPath = electronApp.getPath('userData')

const App = () => {
  const boardData = useSelector(state => state.boardData);
  const dispatch = useDispatch()

  if (!boardData) {
    return <div>No board data</div>
  }

  return (
    <div className="conception-container">
      {/* 原文输入框 */}
      <Text translationKey="conception.originalText" />
      <div>
        <Input.TextArea 
        id="originalText" 
        autoSize={{ minRows: 10, maxRows: 20 }}
        value={boardData.originalText}
        onChange={(e) => {
          console.log('originalText', e.target.value)
          dispatch({ type: 'SET_ORIGINAL_TEXT', payload: e.target.value })
        }}
        />
      </div>
    </div>
  )
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default AppWrapper