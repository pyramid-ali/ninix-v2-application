import moment from 'moment'

const baby = json => ({
  id: json.id,
  name: json.name,
  weight: json.weight,
  height: json.height,
  head: json.head,
  gestation: json.gestation,
  gender: json.gender,
  birthDate: json.birth_date ? moment(json.birth_date) : null,
  number: json.number
})

const father = json => ({
  name: json.name
})

const mother = json => ({
  name: json.name
})

const dailyStat = json => {
  console.tron.log({json, a: json.weight})
  return ({
    weight: json.weight,
    height: json.height,
    head: json.head,
    registerAt: json.register_at
  })
}

export default {
  baby,
  father,
  mother,
  dailyStat
}
