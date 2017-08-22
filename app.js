const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();
// logger is a custom middleware; must be declared before app.route() code
// var logger = function(req, res, next) {
//     console.log('Logging...');
//     next();
// }
// app.use(logger);

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
// If we have an index.html file in the public folder, the Hello World! would be replaced by its contents
// angular apps are used this way, and they are usually found in the public folder
//app.use(express.static(path.join(__dirname, 'public')));

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
    res.render('index', {
        title: 'EJS View Engine',
        users: users
    });
}); 

app.listen(3000, function() {
    console.log('Server started on Port 3000');
})