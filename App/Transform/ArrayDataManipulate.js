import moment from 'moment'

export function transformTemperature (data) {
  const now = moment().unix()
  const manipulatedData = data.reduce((acc, curr) => ({...acc, [curr.registerAt]: {temperature: curr.temperature}}), {})
  if (manipulatedData.length === 0 || Math.max(Object.keys(manipulatedData)) <= now - 60) {
    return null
  }

  return Array.apply(null, {length: 60}).fill(0).map((i, index) => {
    const item = manipulatedData[now - (60 - index - 1)]
    return item ? item.temperature : null
  })

}

export function transformRespiratory (data) {

  const now = moment().unix()
  const manipulatedData = data.reduce((acc, curr) => ({...acc, [curr.registerAt]: {respiratory: curr.respiratory}}), {})
  if (manipulatedData.length === 0 || Math.max(Object.keys(manipulatedData)) <= now - 60) {
    return null
  }

  return Array.apply(null, {length: 60}).fill(0).map((i, index) => {
    let items = []
    for (let i = 9; i >= 0; i--) {
      const curr = manipulatedData[now - (60 - index - 1) - i]

      if (curr && curr.respiratory < 253) {
        items = [...items, curr.respiratory]
      }
    }

    if (items.length) {
      return items.reduce((acc, curr) => acc + curr, 0) / items.length
    }

    return null
  })
}
