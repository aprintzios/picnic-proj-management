var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatar: String,
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);