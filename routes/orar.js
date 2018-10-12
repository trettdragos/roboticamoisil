let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/orar.ejs',{
    	email: req.cookies.username,
        tab: '2'
    });
});

module.exports = {url: '/orar', router: router};