var mongoose = require('mongoose')

var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var DelegationSchema = new Schema({
  delegator: { type: ObjectId, ref: 'User', required: true },
  delegatee: { type: ObjectId, ref: 'User', required: true },
  tag: { type: ObjectId, ref: 'Tag', required: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = function init (conn) {
  return conn.model('Delegation', DelegationSchema)
}
