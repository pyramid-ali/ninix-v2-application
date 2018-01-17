import moment from 'moment'

export default class ParentModel {

  static fromJson (json) {
    return {
      name: json.name,
      birthDate: moment(json.birth_date),
      job: json.job,
      mobile: json.mobile,
      bloodGroup: json.blood_type,
      phone: json.phone,
      email: json.email,
      updatedAt: moment(json.updated_at)
    }
  }

  static toJson(model) {
    return {
      name: model.name,
      birth_date: model.birthDate ? moment(model.birthDate).toDate().toDateString() : null,
      job: model.job,
      mobile: model.mobile,
      blood_type: model.bloodGroup,
      phone: model.phone,
      email: model.email,
      updated_at: moment(model.updatedAt).toJSON()
    }
  }

}
