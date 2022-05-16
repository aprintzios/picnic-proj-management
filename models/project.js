var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taskSchema = new mongoose.Schema({
    name: String,
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
    assignedTo: {type: Schema.Types.ObjectId, ref: 'User'},
    due: Date,
    status: String
}, {
    timestamps: true
  });

var projectSchema = new mongoose.Schema({
  name: String,
  createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
  groupMembers: [{type: Schema.Types.ObjectId, ref: 'User'}],
  tasks: [taskSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
