 import moment from 'moment'

const baby = model => {
  return {
    name: model.name,
    weight: model.weight,
    height: model.height,
    head: model.head,
    gestation: model.gestation,
    gender: model.gender,
    birth_date: moment(model.birthDate).toISOString(),
    number: model.number
  }
}

const father = model => ({
  name: model.name
})

const mother = model => ({
 name: model.name
})

const dailyStat = model => {
  return {
    weight: model.weight,
    height: model.height,
    head: model.head,
    register_at: model.registerAt
  }
}

const vitalSign = model => ({
  temperature: model.temperature,
  respiratory: model.respiratory,
  orientation: model.orientation,
  humidity: model.humidity,
  register_at: moment(model.registerAt * 1000)
})

const connectivityLog = model => ({
  device: {
    name: model.name,
    mac: model.mac,
    serial: '' + model.serial,
    firmware: model.firmware,
    revision: model.revision,
  },
  type: model.type,
  error: model.error,
  happened_at: model.happenedAt
})

const alarm = model => ({
  type: model.type,
  duration: model.duration,
  register_at: model.registerAt
})

const changePassword = model => ({
  new_password: model.newPassword,
  old_password: model.oldPassword
})

export default {
  baby,
  father,
  mother,
  dailyStat,
  vitalSign,
  connectivityLog,
  alarm,
  changePassword
}
