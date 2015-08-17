var Nerd = require('./models/nerd');

function getNerds(res){
	Nerd.find(function(err, nerds) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(nerds); // return all nerds in JSON format
		});
};

var Bill = require('./models/bill');

function getBills(res){
	Bill.find(function(err, bills) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(bills); // return all bills in JSON format
		});
};

function addBill(req, res) {
	// create a bill, information comes from AJAX request from Angular
	Bill.create({
		owner : req.body.owner,
		amount : req.body.amount,
		description : req.body.description
	}, function(err, bill) {
		if (err)
			res.send(err);

		// get and return all the bills after you create another
		getBills(res);
	});
};

module.exports = function(app) {
	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
    
    // api ---------------------------------------------------------------------
	// get all nerds
	app.get('/api/nerds', function(req, res) {

		// use mongoose to get all nerds in the database
		getNerds(res);
	});
    
	app.get('/api/bills', function(req, res) {
		
		// In case of bill route, call getBill()
		getBills(res);
	});
    
	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});


	// create bill and send back all bills after creation
	app.post('/api/bills', function(req, res) {
		addBill(req, res);
	});
};