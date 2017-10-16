import ErrorMessage from '../Transform/ErrorMessage'

const resolve = (response) => {
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.data)
    }
    else {
      let message = null
      const problem = response.problem

      if (!response.data) {
        message = problem
      }
      else {
        const { errors } = response.data
        message = errors ? ErrorMessage.parse(errors) : response.data.message
      }

      reject({
        message,
        problem
      })
    }
  })
}

export default {
  resolve
}
