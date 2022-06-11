import React, { Component } from 'react'

import { ErrorIndicator } from '../ErrorIndicator'

export default class ErrorBoundry extends Component {
  state = {
    hasError: false,
    errorType: null,
  }

  componentDidCatch(er) {
    console.log(er)
    this.setState({
      hasError: true,
      errorType: null,
    })
  }

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    return this.props.children
  }
}
