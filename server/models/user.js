var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  name: String,
  email: Number,
  password: String,
  company: String,
  createdOn: { type: Date, default: Date.now },
  lastLoggedIn: { type: Date, default: Date.now }
});
mongoose.model('users', userSchema);
