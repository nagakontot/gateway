"use strict"

var express         = require('express');
var router          = express.Router();

/*
var env             = { AUTH0_CLIENT_ID:        process.env.AUTH0_CLIENT_ID,
                        AUTH0_DOMAIN:           process.env.AUTH0_DOMAIN,
                        AUTH0_CALLBACK_URL:     process.env.AUTH0_CALLBACK_URL || 'https://www.1sekolah.xyz/login/callback'
                      };
*/
/*
//http://stackoverflow.com/questions/17206487/nodejs-expressjs-passportjs-for-admin-pages-only
var requiresAdmin = function() 
{   return [ensureLoggedIn('/login'),
            function(req, res, next) 
            {   if (req.user && req.user.isAdmin === true)  next();
                else                                        res.send(401, 'Unauthorized');
            }]
};
app.all('/admin/*', requiresAdmin());
app.get('/admin/', ...);
*/

/* GET home page. */
router.get( '/', 
            function(req, res, next) 
            {   //res.render('index',{ title: '1sekolah', env: env });
                res.render('index.ejs',{ title: '1sekolah', env: req.app.locals.env });
            });


module.exports = router;