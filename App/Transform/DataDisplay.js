export const temperature = (data) => {
  if (data.length) {
    const lastData = data[data.length - 1]
    return lastData.temperature + ' ºC'
  }
  return 'N/A'
}

export const respiratory = (data) => {
  if (data.length) {
    const latestData = data.slice(-10).filter(d => d.respiratory < 253)

    if (latestData.length) {
      const average = latestData.reduce((acc, curr) => acc + curr.respiratory, 0) / latestData.length
      return Math.round(average) + ' BPS'
    }

  }
  return 'N/A'
}

export const humidity = (data) => {
  if (data.length) {
    const lastData = data[data.length - 1]
    return lastData.humidity > 4 ? 'Pooped' : 'Normal'
  }
  return 'N/A'
}

export const orientation = (data) => {
  if (data.length) {
    const lastData = data[data.length - 1]
    return lastData.orientation === 0 ? 'Prone' : 'Normal'
  }
  return 'N/A'
}

export default {
  temperature,
  respiratory,
  humidity,
  orientation
}
