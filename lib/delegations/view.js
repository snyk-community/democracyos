import view from '../view/mixin'
import AddUserInput from '../admin-permissions/add-user-input/add-user-input'
import template from './template.jade'

export default class DelegationsView extends view('appendable') {
  constructor (options = {}) {
    options.template = template
    super(options)
  }

  switchOn () {
    this.addUserInput = new AddUserInput({
      onSelect: this.onSelect,
      container: this.el.querySelector('[data-delegatee-selector]')
    })
  }

  switchOff () {
    this.addUserInput.switchOff()
  }

  onSelect (user) {
    if (this.list.querySelector(`[data-user="${user.id}"]`)) {
      return Promise.resolve();
    }

    return new Promise((accept, reject) => {
      forumStore.grantPermission(forumId, user.id, role)
        .then(() => {
          accept();
          this.list.appendChild(this.renderUser(user));
        })
        .catch(err => {
          reject(err);
          throw err;
        });
    });
  }
}
