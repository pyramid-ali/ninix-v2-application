 import moment from 'moment'

const baby = model => {
  console.tron.log({model})
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

export default {
  baby
}
