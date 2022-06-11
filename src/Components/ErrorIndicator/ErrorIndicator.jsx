import React from 'react'
import 'antd/dist/antd.css'
import { Alert } from 'antd'

const ErrorIndicator = (err) => {
  console.log(err)
  return (
    <Alert
      // message={err.err.error.status}
      description={err.err.message}
      type="error"
      showIcon
    />
  )
}

export default ErrorIndicator
