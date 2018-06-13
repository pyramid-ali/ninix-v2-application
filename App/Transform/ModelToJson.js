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

const dailyStat = model => {
  return {
    weight: model.weight,
    height: model.height,
    head: model.head,
    register_at: model.registerAt
  }
}

export default {
  baby,
  dailyStat
}
