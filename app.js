const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const expressValidator = require('express-validator');
var app = express();

var mongojs = require('mongojs')
var db = mongojs('customerapp', ['users']);

// logger is a custom middleware; must be declared before app.route() code
// var logger = function(req, res, next) {
//     console.log('Logging...');
//     next();
// }
// app.use(logger);

//Global Vars
app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
})

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
// If we have an index.html file in the public folder, the Hello World! would be replaced by its contents
// angular apps are used this way, and they are usually found in the public folder
//app.use(express.static(path.join(__dirname, 'public')));

// In this snippet, the formParam value is going to get morphed into form body format useful for printing
// imported from express-validator's documentation
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

var people = [{
        name: 'Jeff',
        age: 30
    },
    {
        name: 'Sarah',
        age: 22
    },
    {
        name: 'Rihanna',
        age: 25
    }
];

var users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com'
    },
    {
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bobsmith@gmail.com'
    },
    {
        firstName: 'Jill',
        lastName: 'Jackson',
        email: 'johndoe@gmail.com'
    }
]

app.get('/', function(req, res) {
    // find everything
    db.users.find(function (err, users) {
        res.render('index', {
            title: 'Express Crash Course',
            users: users
        });    
    });
    //res.end();
}); 

app.post('/users/add', function(req, res) {
    // from express-validator
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: 'Express Crash Course',
            users: users,
            errors: errors
        });
 
    } else {
        var newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        db.users.insert(newUser, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.redirect('/');
        });

    }

});

app.listen(3000, function() {
    console.log('Server started on Port 3000');
})