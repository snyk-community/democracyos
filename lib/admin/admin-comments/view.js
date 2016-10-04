import template from './template.jade'
import View from '../../view/view.js'

export default class ExportComments extends View {
  constructor (options = {}) {
    super(template, options)
    this.options = options
  }
}
