let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/info.ejs',{
    	email: req.cookies.username,
        tab: '2'
    });
});

module.exports = {url: '/info', router: router};