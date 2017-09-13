import moment from 'moment'

export default class BabyModel {

  static fromJson (json) {
    return {
      name: json.name,
      birthDate: json.birth_date ? moment(json.birth_date) : null,
      bloodGroup: json.blood_type,
      gender: json.gender,
      updatedAt: moment(json.updated_at)
    }
  }

  static toJson(model) {
    return {
      name: model.name,
      birth_date: model.birthDate ? moment(model.birthDate).toJSON() : null,
      blood_type: model.bloodGroup,
      gender: model.gender,
      updated_at: moment(model.updatedAt).toJSON()
    }
  }

}
