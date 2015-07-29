// grab the mongoose module
var mongoose = require('mongoose');

// define our bill model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Bill', {
	amount : {type : Number, default: 0}
});