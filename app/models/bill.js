
// load the things we need
var mongoose = require('mongoose');

// define the schema for our bill model
var billSchema = mongoose.Schema({

    userId : {
        type : String
    },

    owner : {
        type : String,
        default: "Me"
    },

    amount : {
        type : Number,
        default: 0
    },

    description : {
        type : String,
        default: ""
    },

    pending : {
        type: Boolean,
        default: true
    },

    add_date : {
        type : Date,
        default: Date.now
    }

});

// create the model for bills and expose it to our app
module.exports = mongoose.model('Bill', billSchema);