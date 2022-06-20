import React from 'react'
import 'antd/dist/antd.css'
import { Alert } from 'antd'

const ErrorIndicator = (err) => {
  const { name, message } = err.err

  if (err)
    return (
      <Alert message={name} description={message || ''} type="error" showIcon />
    )
}

export default ErrorIndicator
