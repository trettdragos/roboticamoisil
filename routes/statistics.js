let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

router.get('/', function (req, res) {
	con.query("SELECT PROFILE FROM accounts", function(err, result){
		if(err) throw err;
		let stats = {
			"5":0,
			"6":0,
			"7":0,
			"8":0,
			"9":0,
			"10":0,
			"11":0,
			"12":0
		};
		let nr = 0;
		for(i in result){
			nr++;
			var list = JSON.parse(result[i].PROFILE);
			let about = list['ABOUT'];
			let clasaList = about.split(' ');
			let clasaSub = clasaList[0];
			let clasa = '';
			for (var i = 0; i < clasaSub.length; i++) {
  				if(!isNaN(parseInt(clasaSub.charAt(i), 10))){
  					clasa = clasa+clasaSub.charAt(i);
  				}
			}
			//debug.log(clasa);
			if(clasa !== '' && clasa !== '1')
				stats[clasa] = stats[clasa]+1;
		}
		debug.log(stats);
		let total = stats['5']+stats['6']+stats['7']+stats['8']+stats['9']+stats['10']+stats['11']+stats['12'];
		res.render('pages/statistics', {
			stats : stats,
			nr : nr-1,
			other : nr-total-1
		});
	})

});

module.exports = {url: '/statistics', router: router};