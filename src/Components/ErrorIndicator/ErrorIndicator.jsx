import React from 'react'
import 'antd/dist/antd.css'
import { Alert } from 'antd'

const ErrorIndicator = (err) => {
  console.log(err)
  const { name, description, status, message } = err.err
  console.log(name, description, status, message)
  if (err)
    return (
      <Alert message={name} description={message || ''} type="error" showIcon />
    )
}

export default ErrorIndicator
