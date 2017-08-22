export default class ParenModel {

  static fromJson (json) {
    return {
      name: json.name,
      birthDate: json.birth_date,
      job: json.job,
      mobile: json.mobile,
      bloodType: json.blood_type,
      phone: json.phone,
      email: json.email
    }
  }

  static toJson(model) {
    return {
      name: model.name,
      birth_date: model.birthDate,
      job: model.job,
      mobile: model.mobile,
      blood_type: model.bloodType,
      phone: model.phone,
      email: model.email
    }
  }

}
