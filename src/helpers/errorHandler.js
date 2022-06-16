const errorHandler = (err) => {
  console.log(err)

  if (err.message === 'Network Error') {
    return {
      name: 'Network Error',
      message: 'Check your Network Connection',
      status: 500,
      description: { 'Network': 'Unable to load resourse' },
    }
  }

  const { name, message } = err
  const { status } = err.response
  // console.log(err.response)
  //   const description = err.response.data.errors ? err.response.data.errors : null
  // const descResult = () => {
  //   if (err.response.data.errors) {
  //     console.log(err.response)
  //     const arrOfErr = err.response.data.errors
  //     console.log(arrOfErr)
  //     const errNames = Object.keys(arrOfErr)

  //     const description = errNames.reduce((acc, item) => {
  //       acc.push(`${item}:${arrOfErr[item]}`)
  //       return acc
  //     }, [])
  //     return description
  //   } else {
  //     return null
  //   }
  // }
  // console.log({ name, message, status, description: descResult() })
  return { name, message, status, description: err.response.data }
  // ?descResult() }
}

export default errorHandler
