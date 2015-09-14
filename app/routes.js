/* Required Models */
var Nerd = require('./models/nerd');
var Bill = require('./models/bill');
var User = require('./models/user');

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
function getViewBills(isAllBill, req, res) {
    if (isAllBill == true) {
        getAllBills(req, res);
    } else {
        getPendingBills(req, res);
    }
}

// get all bills
function getAllBills(req, res) {
	Bill.find({ userId: req.body.userId }, function(err, bills) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

            res.json(bills); // return all bills in JSON format
		});
};

// get only active bills
function getPendingBills(req, res){
    Bill.find({ userId: req.body.userId, pending: true }, function(err, bills) {
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
        userId: req.body.userId,
		owner : formData.owner == "" ? "Me" : formData.owner,
		amount : formData.amount,
		description : formData.description,
        pending : !formData.pending
	    }, function(err, bill) {
            if (err)
                res.send(err);

            getViewBills(isAllBill, req, res);
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

            getViewBills(isAllBill, req, res);
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

            getViewBills(isAllBill, req, res);
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
    app.post('/api/login', function (req, res, next) {
        passport.authenticate('local-login', function (err, user, info) {
            if (err) {
                return res.status(500).json({err: err});
            }
            if (!user) {
                return res.status(401).json({err: info});
            }
            req.login(user, function(err) {
                if (err) {
                    return res.status(500).json({err: err});
                } else {
                    res.status(200).json({status: 'Login successful!', user: req.user});
                }
            })
        })(req, res, next);
    });

    // SIGNUP ==============================
    app.post('/api/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
            if (err) {
                return res.status(500).json({err: err});
            }
            // Generate a JSON response reflecting authentication status
            if (! user) {
                return res.status(401).json({err: info});
            }
            req.login(user, function(err) {
                if (err) {
                    return res.status(500).json({err: err});
                } else {
                    res.status(200).json({status: 'Signup successful!', user: req.user});
                }
            })
        })(req, res, next);
    });


	// frontend routes =========================================================
	// get all nerds
	app.get('/api/nerds', function(req, res) {

		// use mongoose to get all nerds in the database
		getNerds(res);
	});

	// get all bills
	app.post('/api/all_bills', function(req, res) {

		// In case of bill route, call getBill()
		getAllBills(req, res);
	});

    app.post('/api/pending_bills', function(req, res) {
        getPendingBills(req, res);
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