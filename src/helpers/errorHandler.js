const errorHandler = (err) => {
  if (err.message === 'Network Error') {
    return {
      name: 'Network Error',
      message: 'Check your Network Connection',
      status: 500,
      description: { 'Network': 'Unable to load resourse' },
    }
  } else {
    const { name, message } = err
    const { status } = err.response
    return { name, message, status, description: err.response.data }
  }
}

export default errorHandler
