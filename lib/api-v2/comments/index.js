var express = require('express')
var debug = require('debug')
var privileges = require('lib/middlewares/forum-middlewares').privileges
var validate = require('../validate')
var paginationSchema = require('../validate/pagination-schema')
var middlewares = require('../middlewares')
var api = require('../db-api')

var log = debug('democracyos:api:comments')

var app = module.exports = express()

app.get('/comments', validate({
  query: Object.assign({}, paginationSchema, {
    topicId: {
      type: 'string',
      required: true,
      format: 'mongo-object-id',
      description: 'id of the Topic to fetch comments from'
    },
    sort: {
      enum: ['score', '-score', 'createdAt', '-createdAt'],
      default: '-score'
    }
  })
}),
middlewares.topics.findByTopicId,
middlewares.forums.findFromTopic,
privileges('canView'),
function getComments (req, res, next) {
  log('GET /api/comments')

  Promise.all([
    api.comments.list(req.query),
    api.comments.listCount(req.query)
  ]).catch((err) => {
    log('GET /api/comments ERROR', err)
    next(new Error('Server error.'))
  }).then((results) => {
    res.json({
      status: 200,
      count: results[1],
      page: req.query.page,
      limit: req.query.limit,
      comments: results[0]
    })
  })
})
