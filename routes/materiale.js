let express = require('express');
let router = express.Router();
let mysql = require('mysql');

router.get('/', function (req, res) {
    res.render('pages/materiale.ejs',{
    	email: req.cookies.username,
        tab: '4'
    });
});

module.exports = {url: '/materiale', router: router};