import bus from 'bus'
import dom from 'component-dom'
import page from 'page'
import config from '../config/config'
import Landing from './view'

if (config.multiForum) {
  page('/', initHomepage)
  page.exit('/', onExit)
}

function initHomepage (ctx) {
  document.body.classList.add('landing')
  ctx.content = document.querySelector('#content')
  dom(ctx.content).empty()
  ctx.view = new Landing({
    container: ctx.content
  })

  bus.emit('page:render')
}

function onExit (ctx, next) {
  document.body.classList.remove('landing')
  next()
}
