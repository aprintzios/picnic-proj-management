var mongoose = require('mongoose');
const Schema = mongoose.Schema;


var projectSchema = new mongoose.Schema({
  name: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  groupMembers: [{type: Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
