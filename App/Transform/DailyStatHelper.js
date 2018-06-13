import _ from 'lodash'
import moment from 'moment'
/***
 *
 * @param stats
 * @param index
 * @returns {Array}
 */
export const getDatesFor = (stats, index) => {
  return Object.keys(_.pickBy(stats, item => item[index]))
}

/***
 *
 * @param stats
 * @param index
 */
export const getLastDateFor = (stats, index) => {
  const dates = getDatesFor(stats, index)
  return dates.reduce((acc, curr) => curr > acc ? curr : acc, dates[0])
}

/***
 * return last stats if it exists or default value
 * @param stats
 * @param index
 * @param defaultValue
 * @returns number
 */
export const getLastStatFor = (stats, index, defaultValue = null) => {
  const lastDate = getLastDateFor(stats, index)
  if (lastDate) {
    return stats[lastDate][index] || defaultValue
  }

  return defaultValue
}

/***
 *
 * @param stats
 * @param index
 * @param defaultValue
 * @returns string | null
 */
export const getTodayStatFor = (stats, index, defaultValue = null) => {
  const today = moment().format('YYYY-MM-DD')
  return _.get(stats, `${today}.${index}`, defaultValue)
}

export default {
  getDatesFor,
  getLastDateFor,
  getLastStatFor,
  getTodayStatFor
}
