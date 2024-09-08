const { ipcRenderer } = require('electron')
import React, { useEffect } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import TagTree from './components/tagsTree'
// 引入antd组件 css，并且不影响其他组件
import { ConfigProvider } from 'antd'
import { Input, Table, Button } from 'antd'
import { DownOutlined } from '@ant-design/icons'
const store = require('../shared/store/storyStore')
export { store }
import electron from 'electron'
const remote = require('@electron/remote')
const electronApp = electron.app ? electron.app : remote.app
import Text from '../../components/Text';
const userDataPath = electronApp.getPath('userData')
import { sendData } from '../services/api/novelService';
import './index.less'

const App = () => {
  const boardData = useSelector(state => state.boardData);
  const dispatch = useDispatch()

  if (!boardData) {
    return <div>No board data</div>
  }

  const handleSendData = async () => {
    try {
      const chunks = await sendData(boardData.originalText);
      console.log('data',chunks)
      dispatch({ type: 'SET_SHORT_TEXTS', payload: chunks });
    } catch (error) {
      console.error('Error handling send data:', error);
    }
  };

  return (
    <div className="conception-container">
      {/* 原文输入框 */}
      <Text translationKey="conception.originalText" />
      <div>
        <Input.TextArea
          className="original-text-input"
          id="originalText"
          style={{ width: '100%' }}
          autoSize={{ minRows: 10, maxRows: 20 }}
          value={boardData.originalText.replace(/\\n/g, '\n')}
          onChange={(e) => {
            dispatch({ type: 'SET_ORIGINAL_TEXT', payload: e.target.value.replace(/\n/g, '\\n') })
          }}
        />
        <Button onClick={handleSendData}><DownOutlined /></Button>
        <Text translationKey="conception.shortTexts" />
        <Table
          dataSource={boardData.shortTexts.map((item, index) => ({
            key: index,
            shortText: item
          }))}
          columns={[{
            title: '短文',
            dataIndex: 'shortText',
            key: 'shortText',
          }]}
        />
      </div>
    </div>
  )
}

const AppWrapper = () => (
  <Provider store={store}>
    <ConfigProvider prefixCls="conception-antd">
      <App />
    </ConfigProvider>
  </Provider>
)

export default AppWrapper