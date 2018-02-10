//NOT USEING THIS FILE. 
var express = require('express');
var router = express.Router();
//Hit up the data base
let db = require('../db/queries')

/* GET home page. */


// router.get('/users', db.getAllUsers);
// router.get('/users/new', db.registerUser);

/////////##########turn this off this is bad
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
