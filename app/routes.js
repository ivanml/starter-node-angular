/* Required Models */
var Nerd = require('./models/nerd');
var Bill = require('./models/bill');
var User = require('./models/user');

var bCrypt = require('bcrypt-nodejs');

// get nerds list
function getNerds(res){
	Nerd.find(function(err, nerds) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(nerds); // return all nerds in JSON format
		});
};

/* Bill functions */
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

// add a bill record
function addBill(req, res) {
	// create a bill, information comes from AJAX request from Angular
    var formData = req.body.submitForm;
    var isAllBill = req.body.isAllBillChecked;
	Bill.create({
		owner : formData.owner == "" ? "Me" : formData.owner,
		amount : formData.amount,
		description : formData.description,
        pending : !formData.pending
	    }, function(err, bill) {
            if (err)
                res.send(err);

            getViewBills(isAllBill, res);
	    });
};

// delete a bill after checking it
function removeBill(req, res) {
    var isAllBill = req.body.isAllBillChecked;
	Bill.remove(
        { _id : req.params.bill_id },
        function(err, bill) {
		    if (err)
			    res.send(err);

            getViewBills(isAllBill, res);
        });
}

// archive/unarchive a bill
function toggleBillStatus(req, res) {
    var billStatus = req.body.billStatus;
    var isAllBill = req.body.isAllBillChecked;
    Bill.update(
        { _id : req.params.bill_id },
        { $set : { pending: !billStatus } },
        function(err, bills) {
            if (err)
                res.send(err);

            getViewBills(isAllBill, res);
        });
}

/* Route APIs */
module.exports = function(app, passport) {
	// server routes ===========================================================

    // LOGOUT ==============================
    app.get('/api/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // LOGIN ==============================
    app.post('/api/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return res.status(500).json({err: err});
                //return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                console.log('login error, info: ' + JSON.stringify(info));
                return res.status(401).json({err: info});
                //return res.send({ success : false, message : 'authentication failed' });
            }
            res.status(200).json({status: 'Login successful!'});
            //return res.send({ success : true, message : 'authentication succeeded' });
        })(req, res, next);
    });

    // SIGNUP ==============================
    app.post('/api/signup', function(req, res, next) {
        console.log('server side signup api called. ');
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return res.status(500).json({err: err});
                //return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                console.log('signup error, info: ' + JSON.stringify(info));
                return res.status(401).json({err: info});
                //return res.send({ success : false, message : 'authentication failed' });
            }
            res.status(200).json({status: 'Signup successful!'});
            //return res.send({ success : true, message : 'authentication succeeded' });
        })(req, res, next);
    });


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

	// delete a bill permanently from db
	app.put('/api/bills/delete/:bill_id', function(req, res) {
		removeBill(req, res);
	});

    // archive/unarchive a bill
    app.put('/api/bills/toggle/:bill_id', function(req, res) {
        toggleBillStatus(req, res);
    })
};