let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/meca.ejs',{
    	email: req.cookies.username,
        tab: '3'
    });
});

module.exports = {url: '/meca', router: router};