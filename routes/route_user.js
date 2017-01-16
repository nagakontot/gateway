'use strict';

var express         = require('express');
var passport        = require('passport');
//var iframe          = require('iframe');

//var frame = iframe({ container: document.querySelector('#iframecontainer') , src: "https://localhost:3100"});
//var frame = iframe({ src: "https://localhost:3100"});
//iframe({ src: "https://www.placehold.it"});


//var ensureLoggedIn  = require('connect-ensure-login').ensureLoggedIn('/login');
/*
var firebase      = require("firebase");

firebase.initializeApp({    serviceAccount: "key/mysekolah-dffed98c588e.json",
                            databaseURL:    "https://mysekolah-a5654.firebaseio.com"
                        });

app.locals.firebase = firebase;
*/

var router          = express.Router();

/* GET user profile. */
router.get( '/', 
            // ensureLoggedIn, 
            passport.authenticate('auth0',{ failureRedirect: '/' }),    //<<--this is 1sekolah.xyz/
            function(req, res, next) 
            {   //res.render('user.ejs', { user: req.user });
                //res.render('user.ejs', { user: req.user, myfirebase: res.locals.firebase,myfbRef: res.locals.fbRef});
                //res.render('user.ejs', { user: req.user, myfirebase: req.app.locals.firebase});
                //res.render('user.ejs', { myfirebase: req.app.locals.firebase, myfbRef: req.app.locals.fbRef});
                res.render('user.ejs');
            });

router.get( '/logout', 
            function(req, res)
            {   req.logout();
                res.redirect('https://nagakontot.au.auth0.com/v2/logout?returnTo=https://www.1sekolah.xyz');
            });
module.exports = router;
