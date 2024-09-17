import React from 'react'
import { Provider } from 'react-redux'
import store from '../shared/store/storyStore'
import BoardMetadata from './components/BoardMetadata'
import electron from 'electron'
const remote = require('@electron/remote')
const electronApp = electron.app ? electron.app : remote.app
import './index.less'


const BoardMetadataApp = () => (
  <Provider store={store}>
    <BoardMetadata />
  </Provider>
)

export default BoardMetadataApp