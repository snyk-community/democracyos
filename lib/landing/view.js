import view from '../view/mixin'
import template from './template.jade'

export default class Newsfeed extends view('appendable', 'withEvents') {
  constructor (options = {}) {
    options.template = template
    super(options)
    this.page = 0
    this.loadingPage = false
  }
}
