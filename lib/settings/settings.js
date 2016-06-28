import title from '../title/title'
import page from 'page'
import dom from 'component-dom'
import user from '../user/user'
import { domRender } from '../render/render'
import Password from '../settings-password/view'
import Profile from '../settings-profile/view'
import Notifications from '../settings-notifications/view'
import Forums from '../settings-forum/view'
import settings from './settings-container.jade'
import config from '../config/config'

/**
 * Check if page is valid
 */

const valid = (function () {
  const pages = ['profile', 'password', 'notifications']
  if (config.multiForum) pages.push('forums')

  return (ctx, next) => {
    var page = ctx.params.page || 'profile'
    ctx.valid = ~pages.indexOf(page)
    return next()
  }
})()

/**
 * Check if exists external settings
 */

const external = (ctx, next) => {
  if (!config.settingsUrl) return next()
  window.location = config.settingsUrl + (ctx.params.page ? ('/' + ctx.params.page) : '')
}

page('/settings/:page?', valid, external, user.required, (ctx, next) => {
  if (!ctx.valid) return next()

  const page = ctx.params.page || 'profile'
  const container = dom(domRender(settings))
  const content = dom('.settings-content', container)

  // prepare wrapper and container
  dom('#content').empty().append(container)

  // set active section on sidebar
  if (dom('.active', container)) {
    dom('.active', container).removeClass('active')
  }

  dom('[href="/settings/' + page + '"]', container).addClass('active')

  // Set page's title
  title(dom('[href="/settings/' + page + '"]').html())

  // render all settings pages

  let profile = new Profile()
  profile.appendTo(content)

  if (!config.facebookSignin) {
    let password = new Password()
    password.appendTo(content)
  }

  let notifications = new Notifications()
  notifications.appendTo(content)

  if (config.multiForum) {
    let forums = new Forums()
    forums.appendTo(content)
  }

  // Display current settings page
  dom(`#${page}-wrapper`, container).removeClass('hide')
})
