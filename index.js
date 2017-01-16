"use strict"

//var firebase      = require("firebase");

var ejs           = require('ejs');
var express       = require('express');
var path          = require('path');
//var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var session       = require('express-session');
var dotenv        = require('dotenv');
var passport      = require('passport');
var Auth0Strategy = require('passport-auth0');

dotenv.load();

var app = express();
//global.app = express();

/*
    app.locals.firebase = require("firebase");
    
    //app.locals.firebase.initializeApp({ serviceAccount: "key/mysekolah-dffed98c588e.json",
    //                                    databaseURL:    "https://mysekolah-a5654.firebaseio.com"});
    
    var config = {  apiKey:             "AIzaSyBC0OhmkRaPCXNL49cFawYoOU3zTOiR-uw",
                    authDomain:         "mysekolah-a5654.firebaseapp.com",
                    databaseURL:        "https://mysekolah-a5654.firebaseio.com",
                    storageBucket:      "mysekolah-a5654.appspot.com",
                    messagingSenderId:  "609726729365"
                  };
    app.locals.firebase.initializeApp(config);
    
    
    //app.locals.firebase = firebase;
    app.locals.fbRef    = app.locals.firebase.database().ref("data");
*/    



//////////////////////////////////////////////////////////////////////
    app.locals.env  = { domain:         process.env.AUTH0_DOMAIN,
                        clientID:       process.env.AUTH0_CLIENT_ID,
                        callbackURL:    process.env.AUTH0_CALLBACK_URL || 'https://www.1sekolah.xyz/user'
                      };
                      
var myAuth          = { clientSecret:   process.env.AUTH0_CLIENT_SECRET};
///////////////////////////////////////////////////////////////////////

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy(Object.assign(myAuth,app.locals.env), 
                                 function(accessToken, refreshToken, extraParams, profile, done) 
                                 {  // accessToken is the token to call Auth0 API (not needed in the most cases)
                                    // extraParams.id_token has the JSON Web Token
                                    // profile has all the information from the user
                                    return done(null, profile);
                                });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done)   { done(null, user);});
passport.deserializeUser(function(user, done) { done(null, user);});

//app.locals.passport  = passport;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');
//app.set('view cache', true);

//app.set('view engine', 'html');
//app.engine('html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(__dirname + '/public'));
//app.use(favicon(__dirname + '/public/icon/favicon.ico'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'shhhhhhhhhsszzz',resave: true,saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/',        require('./routes/route_index.js'));
app.use('/user',    require('./routes/route_user.js' ));
//app.use('/rchat',   require('./routes/route_rchat.js' ));

//|///////////////////////////////////////|
//|     error handlers                    |
//|///////////////////////////////////////|

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{   var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') 
{   app.use(function(err, req, res, next) 
    { res.status(err.status || 500);
      res.render('error', { message: err.message,error: err});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) 
{   res.status(err.status || 500);
    res.render('error', { message: err.message,error: {}});
});


//module.exports = app;
app.listen(3001);
