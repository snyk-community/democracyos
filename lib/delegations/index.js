var express = require('express')
var forumRouter = require('lib/forum-router')

var app = module.exports = express()

app.get(forumRouter('/delegations'), require('lib/layout'))
