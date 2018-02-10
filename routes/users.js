var express = require('express');
var router = express.Router();
let db = require('../db/queries');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', db.getAllUsers, function(){
    console.log(req.user , ':user_In_session')
          console.log(req.isAuthenticated(), ':auth') // is my user authicated 
});

router.get('/profile', function(){
    console.log(req.user , ':user_In_session')
          console.log(req.isAuthenticated(), ':auth') // is my user authicated 
});

router.post('/new', db.registerUser);
// router.post('/login', db.authUser, passport.authenticate('local', { successRedirect: '/',
// failureRedirect: '/login' }));

router.post('/login', db.authUser);

//   passport.authenticate('local', { successRedirect: '/',
//                                          failureRedirect: '/login' })


module.exports = router;
