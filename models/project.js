var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new mongoose.Schema({
    name: String,
    assignedTo: {type: Schema.Types.ObjectId, ref: 'User'},
    due: Date,
    status: String
}, {
    timestamps: true
  });

var projectSchema = new mongoose.Schema({
  name: String,
  groupMembers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  tasks: [taskSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
