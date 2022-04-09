import React from 'react'
import { Spin } from 'antd'
import 'antd/dist/antd.min.css'
import './Spinner.scss'

function Spinner() {
  return (
    <div className="spinner">
      <Spin size="large" />
    </div>
  )
}

export default Spinner
