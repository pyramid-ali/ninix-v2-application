
export const temperature = (data, noData = 'N/A') => {
  if (data.length) {
    const lastData = data[data.length - 1]
    return lastData.temperature + ' ºC'
  }
  return noData
}

export const respiratory = (data, noData = 'N/A') => {
  if (data.length) {
    const latestData = data.slice(-10).filter(d => d.respiratory < 253)

    if (latestData.length) {
      const average = latestData.reduce((acc, curr) => acc + curr.respiratory, 0) / latestData.length
      return Math.round(average) + ' BPS'
    }

  }
  return noData
}

export const humidity = (data, noData = 'N/A') => {
  if (data.length) {
    const lastData = data[data.length - 1]
    return lastData.humidity > 4 ? 'Pooped' : 'Normal'
  }
  return noData
}

export const orientation = (data, noData = 'N/A') => {
  if (data.length) {
    const lastData = data[data.length - 1]
    return lastData.orientation === 0 ? 'Prone' : 'Normal'
  }
  return noData
}

export const battery = (data) => {
  if (data.length) {
    const { battery, fullCharge, charging, lowBattery } = data[data.length - 1]
    if (fullCharge) {
      return 'battery-bluetooth'
    }

    if (charging) {
      return 'battery-charging'
    }

    if (lowBattery) {
      return 'battery-charging-wireless-alert'
    }

    let level = Math.round(battery / 10)
    level = level < 1 ? 1 : level
    level = level > 9 ? 9 : level

    return `battery-${level * 10}`
  }
  return null
}

export default {
  temperature,
  respiratory,
  humidity,
  orientation,
  battery
}
