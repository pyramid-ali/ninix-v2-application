export default class ErrorMessage {

  static parse (errors: object) {
    let message = ''
    const keys = Object.keys(errors)
    keys.forEach((key) => {
      const arr = errors[key]
      message = message.concat(key.toUpperCase() + ': ' + arr.join(','))
    })
    
    return message
  }

}
