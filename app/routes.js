var Nerd = require('./models/nerd');
var Bill = require('./models/bill');

// authentication


// get nerds list
function getNerds(res){
	Nerd.find(function(err, nerds) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(nerds); // return all nerds in JSON format
		});
};

// get respective Bills
function getViewBills(isAllBill, res) {
    if (isAllBill == true) {
        getAllBills(res);
    } else {
        getPendingBills(res);
    }
}

// get all bills
function getAllBills(res) {
	Bill.find(function(err, bills) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

            res.json(bills); // return all bills in JSON format
		});
};

// get only active bills
function getPendingBills(res){
    Bill.find({ pending: true }, function(err, bills) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(bills);
    });
};

function addBill(req, res) {
	// create a bill, information comes from AJAX request from Angular
	Bill.create({
		owner : req.body.owner == "" ? "Me" : req.body.owner,
		amount : req.body.amount,
		description : req.body.description,
        pending : !req.body.pending
	}, function(err, bill) {
		if (err)
			res.send(err);

        getViewBills(req.body.allBillCheck, res);
	});
};

// delete a bill after checking it
function removeBill(req, res) {
	Bill.remove(
        { _id : req.params.bill_id },
        function(err, bill) {
		    if (err)
			    res.send(err);

            getPendingBills(res);
        });
}

function closeBill(req, res) {
    Bill.update(
        { _id : req.params.bill_id },
        { $set : { pending: false } },
        function(err, bills) {
            if (err)
                res.send(err);

            getPendingBills(res);
    });
}

function openBill(req, res) {
    Bill.update(
        { _id : req.params.bill_id },
        { $set : { pending: true } },
        function(err, bills) {
            if (err)
                res.send(err);

            getPendingBills(res);
        });
}

module.exports = function(app) {
	// server routes ===========================================================
	// authentication routes
/*    // route to test if the user is logged in or not
    app.get('/logged_in', function(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    });

    // route to log in
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.send(req.user);
    });

    // route to log out
    app.post('/logout', function(req, res){
        req.logOut(); res.send(200);
    });*/

	// frontend routes =========================================================
	// get all nerds
	app.get('/api/nerds', function(req, res) {

		// use mongoose to get all nerds in the database
		getNerds(res);
	});

	// get all bills
	app.get('/api/all_bills', function(req, res) {

		// In case of bill route, call getBill()
		getAllBills(res);
	});

    app.get('/api/pending_bills', function(req, res) {
        getPendingBills(res);
    });

	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

	// create bill and send back all bills after creation
	app.post('/api/bills', function(req, res) {
		addBill(req, res);
	});

	// delete a bill
	app.delete('/api/bills/:bill_id', function(req, res) {
		removeBill(req, res);
	});

    // finish a bill
    app.delete('/api/bills/finish_bill/:bill_id', function(req, res) {
        closeBill(req, res);
    });

    // unfinish a bill
    app.delete('/api/bills/unfinish_bill/:bill_id', function(req, res) {
        console.log(req.params.bill_id);
        openBill(req, res);
    });
};