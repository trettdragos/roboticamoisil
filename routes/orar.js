let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/orar.ejs',{
    	email: req.cookies.username,
        tab: '5'
    });
});

module.exports = {url: '/orar', router: router};