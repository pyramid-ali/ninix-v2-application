export default class DataModel {

  static toJson(data) {
    const { temperature, respiratory, orientation, humidity, count, updatedAt } = data
    return {
      temperature,
      respiratory,
      orientation,
      humidity,
      count,
      createdAt: data.registerAt,
      updatedAt
    }
  }

  static fromJson() {

  }

  static toJsonArray(data) {
    let jsonArray = []
    data.forEach((item) => {
      jsonArray.push(DataModel.toJson(item))
    })
    return jsonArray
  }

}
