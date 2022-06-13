const errorHandler = (err) => {
  console.log(err)

  if (err.message === 'Network Error') {
    return {
      name: 'Network Error',
      message: 'Check your Network Connection',
      status: 500,
      description: 'Unable to load resourse',
    }
  }

  const { name, message } = err
  const { status } = err.response
  //   const description = err.response.data.errors ? err.response.data.errors : null
  const descResult = () => {
    if (err.response.data.errors) {
      const arrOfErr = err.response.data.errors
      const errNames = Object.keys(arrOfErr)

      const description = errNames.reduce((acc, item) => {
        acc.push(`${item}:${arrOfErr[item]}`)
        return acc
      }, [])
      return description
    } else {
      return null
    }
  }
  console.log({ name, message, status, description: descResult() })
  return { name, message, status, description: descResult() }
}

export default errorHandler
