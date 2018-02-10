var pgp = require('pg-promise')({});
var connectionString = 'postgres://localhost/userlist2';
//postgres://postgres:postgres@localhost:5433/userlist
var db = pgp(connectionString);
const authHelpers = require('../auth/helpers');
const passport = require('../auth/local');

var expressValidator = require('express-validator'); // for FUN validation


function getAllUsers(req, res, next) {
  db.any('select * from users')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleUser(req, res, next) {
  db.any('select * from users where username = ${username}',
    req.params)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Fetched one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateSingleUser(req, res, next) {
  db.none('update users set username = ${newName} where username = ${username}',
    req.body)
    .then(function (data) {
      res.status(200)
        .json({ 
          status: 'success',
          message: 'Changed one user'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function registerUser(req, res, next) {
  // req.checkBody( usernameInput, 'can Not Be empty').notEmpty(); //(name , err)
  // const errors = req.validationErrors();
  // if(errors){
  //   console.log(`errors: ${JSON.stringify(errors)}`);
  //   res.render('/users/new',{title: 'error try again'})
  // }

  return authHelpers.createUser(req)
    .then((response) => {
      passport.authenticate('local', (err, user, info) => {
        if (user) {
          res.status(200)
             .json({
               status: 'success',
               data: user,
               message: 'Registered one user'
             });
        }
      })(req, res, next);
    })
    .catch((err) => {
      res.status(500)
         .json({
           status: 'error',
           error: err
         })
    });
}

// function authUser(req, res, next) {
//   console.log(req.body)
//   return   passport.authenticate('local'),
//   res.send('localhost:3000/user.id') 
// };



function authUser(req, res, next) {
  console.log(req.body)//
    //grab username from database that matches username submitted
  db.any('select * from users where username = ${username}',
    req.body)
  
    .then(function (data) {
      //let compare = comparePass(req.body.password, data[0].password_digest)
      let compare = authHelpers.comparePass(req.body.password, data[0].password_digest)

      console.log(compare, ': comparedHash_result')
        //       passport.authenticate('local', (err, user, info) => {
        //   if (err) { handleResponse(res, 500, 'error'); }
        //   if (!user) { handleResponse(res, 404, 'User not found'); }
        //   if (user) {
        //     req.logIn(user, function (err) {
        //       if (err) { handleResponse(res, 500, 'error'); }
        //       handleResponse(res, 200, 'success');
        //     });
        //   }
        // })(req, res, next);
        //#####

        // app.post('/login',
        // passport.authenticate('local', { successRedirect: '/',
        //                                  failureRedirect: '/login' }));
        //##########
        // passport.authenticate('local', { successRedirect: '/',
        //                                  failureRedirect: '/login' });
//################################################################




passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' },(err, user, info) => {
        if (user) {
          console.log('user?: ', user)
         // console.log(successRedirect)
//#################

          // req.login(user, function(){
          //   res.redirect('/') 
          //  // res.redirect('/users/' + user.username + '/edit') 

          // })
//#################
res.redirect('/') 
          req.login(user, function(){
           
           // res.redirect('/users/' + user.username + '/edit') 

          })
//#################

          // res.status(200, '/')

          //   .json({
          //     status: 'success',
          //     data: user,
          //     message: 'LOGGGEDD1 one user',
          //     successRedirect: '/',
          //     failureRedirect: '/login'
          //   });
          

           console.log(req.user , ':user_In_session')
          console.log(req.isAuthenticated(), ':auth') // is my user authicated 
        }else if(err){
          res.status(500)
            .json({
              status: 'fail',
              data: user,
              message: 'NOPE !'
            });
        }
      })(req, res, next);




//#########################################        
      // passport.authenticate('local')
      // res.status(200)
      //   .json({
      //     status: 'success',
      //     data: data,
      //     message: 'logged in one user'
      //   });
    })
    .catch(function (err) {
      console.log(err);
      return next(err);
    });
}






// router.post('/login', (req, res, next) => {
      //   passport.authenticate('local', (err, user, info) => {
      //     if (err) { handleResponse(res, 500, 'error'); }
      //     if (!user) { handleResponse(res, 404, 'User not found'); }
      //     if (user) {
      //       req.logIn(user, function (err) {
      //         if (err) { handleResponse(res, 500, 'error'); }
      //         handleResponse(res, 200, 'success');
      //       });
      //     }
      //   })(req, res, next);
// });
//################################################################
// passport.authenticate('local', (err, user, info) => {
//   if (user) {
//     res.status(200)
//        .json({
//          status: 'success',
//          data: user,
//          message: 'Registered one user'
//        });
//   }
// })(req, res, next);


module.exports = {
  getAllUsers: getAllUsers,
  getSingleUser: getSingleUser,
  registerUser: registerUser,
  updateSingleUser: updateSingleUser,
  authUser: authUser
};

// function authUser(req, res, next) {
//   console.log('testing login')
//   return authHelpers.createUser(req)
//     .then((response) => {
//       passport.authenticate('local', (err, user, info) => {
//         if (user) {
//           res.status(200)
//              .json({
//                status: 'success',
//                data: user,
//                message: 'Registered one user'
//              });
//         }
//       })(req, res, next);
//     })
//     .catch((err) => {
//       res.status(500)
//          .json({
//            status: 'error',
//            error: err
//          })
//     });
// }