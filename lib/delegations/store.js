import Store from '../store/store'

export class DelegationsStore extends Store {
  name () {
    return 'delegations'
  }
}

export default new DelegationsStore()
