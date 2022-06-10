import React from 'react'
import 'antd/dist/antd.css'
import { Alert } from 'antd'

const ErrorIndicator = (text) => {
  return <Alert message={text} type="error" />
}

export default ErrorIndicator
