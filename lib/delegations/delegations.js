import bus from 'bus'
import page from 'page'
import dom from 'component-dom'
import user from '../user/user'
import visibility from '../visibility/visibility'
import forumRouter from '../forum-router/forum-router'
import { findForum } from '../forum-middlewares/forum-middlewares'
import DelegationsView from './view'

page(forumRouter('/delegations'),
  init,
  user.optional,
  visibility,
  findForum,
  render
)

function init (ctx, next) {
  ctx.content = document.querySelector('#content')
  dom(ctx.content).empty()
  next()
}

function render (ctx) {
  new DelegationsView({
    container: ctx.content,
    locals: {
      topics: ctx.topics
    }
  })
  bus.emit('page:render')
}
