// grab the mongoose module
var mongoose = require('mongoose');

// define our bill model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Bill', {
	owner : {type : String, default: "Me"},
	amount : {type : Number, default: 0},
	description : {type : String, default: ""},
	pending : {type: Boolean, default: true},
	add_date : {type : Date, default: Date.now}
});