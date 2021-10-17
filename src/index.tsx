import React from 'react'
import ReactDOM from 'react-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import * as dayjs from 'dayjs'
import reportWebVitals from '@/reportWebVitals'
import 'dayjs/locale/zh-cn'
import '@/theme/app.less'
import App from './App'
dayjs.locale('zh-cn')

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()
