import moment from 'moment'

const baby = json => ({
  id: json.id,
  name: json.name,
  weight: json.weight,
  height: json.height,
  head: json.head,
  gestation: json.gestation,
  gender: json.gender,
  birthDate: moment(json.birth_date),
  number: json.number
})

export default {
  baby
}
