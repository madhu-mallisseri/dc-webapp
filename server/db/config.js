var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/data-coral', function(err){
  console.log("CONNECTED");
  console.log(err);
});
