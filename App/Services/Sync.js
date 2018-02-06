import ParentAction from '../Redux/ParentRedux'
import BabyAction from '../Redux/BabyRedux'
import { store } from '../Containers/App'

export default class Sync {

  static start () {
    const sync = new Sync(store.getState())

    store.dispatch(sync.syncFatherProfile())
    store.dispatch(sync.syncMotherProfile())
    store.dispatch(sync.syncBabyProfile())
  }

  constructor (state) {
    this.state = state
  }

  syncFatherProfile () {
    const { father } = this.state

    if (!father.sync) {
      return ParentAction.updateFather(father)
    }
    else {
      return ParentAction.retrieveFather()
    }
  }

  syncMotherProfile () {
    const { mother } = this.state
    if (!mother.sync) {
      return ParentAction.updateMother(mother)
    }
    else {
      return ParentAction.retrieveMother()
    }
  }

  syncBabyProfile () {
    const { baby } = this.state
    if (!baby.sync) {
      return BabyAction.update(baby)
    }
    else {
      return BabyAction.retrieve()
    }
  }

  syncData () {

  }

}
