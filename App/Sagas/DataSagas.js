import RealmStorage from '../Realm/Storage'

export function *didReceiveData (action) {

  const { data } = action
  RealmStorage.save(data)

}
