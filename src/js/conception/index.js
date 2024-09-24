import React, { useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import { Spin, Drawer, Button, ConfigProvider } from 'antd'
import ConceptionPanel from './components/conceptionPanel'
import store from '../shared/store/storyStore'
import electron from 'electron'
import { RightCircleOutlined, LeftOutlined } from '@ant-design/icons'
const remote = require('@electron/remote')
const electronApp = electron.app ? electron.app : remote.app
const userDataPath = electronApp.getPath('userData')
import { useTranslation } from 'react-i18next'
import './index.less'
import './index.css'

const AppContent = () => {
  const isLoading = useSelector(state => state.isLoading)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const { t } = useTranslation()

  return (
    <ConfigProvider prefixCls="conception-antd" className="conception-antd">
      <Button
        className='conception-bubble-button'
        shape="circle"
        icon={<RightCircleOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ position: 'absolute'}}
      >
      </Button>
      <Drawer
        className='conception-drawer'
        title={t('conception.drawerTitle')}
        width={800}
        placement="left"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        extra={<Button onClick={() => setDrawerVisible(false)} icon={<LeftOutlined />}></Button>}
      >
        <Spin spinning={isLoading} tip={t('conception.loading')}>
          <ConceptionPanel />
        </Spin>
      </Drawer>
    </ConfigProvider>
  )
}


const AppWrapper = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
)

export default AppWrapper