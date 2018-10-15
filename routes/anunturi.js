let express = require('express');
let router = express.Router();
let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TeamFinder"
});

const posts_per_page = 25;

// router.get('/', function (req, res) {
//     con.query("SELECT * FROM projects WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, projects, fields) {
//         if (err) throw err;
//         projects.forEach((project) => require('../other/security').convertUUIDToBase64(project.ID, (b64) => project.BASE64 = b64));
//         con.query("SELECT * FROM teams WHERE ACTIVE=1 ORDER BY TIMESTAMP DESC", function (err, teams, fields) {
//             if (err) throw err;
//             teams.forEach((team) => require('../other/security').convertUUIDToBase64(team.ID, (b64) => team.BASE64 = b64));
//             let list = teams.concat(projects);
//             res.render('pages/anunturi.ejs', {email: req.cookies.username, tab: '1', posts: list, term: ''});
//         });
//     });
// });
router.get('/create', function (req, res) {
    if (req.cookies.username) {
        res.render('pages/create-anunt', {tab: '1'});
    }
    else {
        res.redirect('/login');
    }
});

router.get('/register', function (req, res) {
    team = req.query;
    con.query("INSERT INTO anunturi (TITLE, TEXT, TIME, POSTEDBY) VALUES (?, ?, ?, ?)", [team.name, team.summary, Date.now().toString(), team.postedBy], function (err, result) {
        if (err) {
            debug.log(err);
            res.send({status: "failed"});
        }
        res.send({status: "successful"});
    })
});

router.get('/', function (req, res) {
    res.redirect('/anunturi/page/1');
});

router.get('/page', (req, res) => {
    res.redirect('/anunturi/page/1');
});


router.get('/page/:num', (req, res) => {
    let current_page = parseInt(req.params.num);
    if (current_page < 1) {
        res.redirect('/anunturi/page/1');
        return;
    }
    con.query("SELECT * FROM anunturi ORDER BY TIME DESC", function (err, teams, fields) {
        if (err) throw err;
        let list = teams;

        let last_page = teams.length / posts_per_page;
        if (last_page !== parseInt(last_page)) {
            last_page = parseInt(last_page) + 1;
        }
        if(last_page === 0) {
            last_page = 1;
        }

        if (current_page > last_page) {
            res.redirect('/anunturi/page/' + last_page);
            return;
        }

        let start_page = current_page - 2;
        let end_page = current_page + 2;
        if (current_page <= 2) {
            start_page = 1;
            end_page = 5 <= last_page ? 5 : last_page;
        } else if (current_page >= last_page - 1) {
            start_page = last_page - 4;
            end_page = last_page;
        }
        if(start_page < 1)
            start_page = 1;
        if(end_page > last_page)
            end_page = last_page;

        let pages = {
            current_page: current_page,
            start_page: start_page,
            end_page: end_page,
            last_page: last_page
        };

        loaded_posts = list.slice((current_page - 1) * posts_per_page, current_page * posts_per_page);

        res.render('pages/anunturi.ejs', {
            email: req.cookies.username,
            tab: '1',
            posts: loaded_posts,
            term: '',
            pages: pages
        });
    });
});

router.get('/:searchTerm', function (req, res) {
    res.redirect(`/anunturi/${req.params.searchTerm}/page/1`);
});

router.get('/:searchTerm/page', (req, res) => {
    res.redirect(`/anunturi/${req.params.searchTerm}/page/1`);
});

router.get('/:searchTerm/page/:num', function (req, res) {
    let current_page = parseInt(req.params.num);
    if (current_page < 1) {
        res.redirect('/anunturi/'+req.params.searchTerm+'/page/1');
        return;
    }
        con.query("SELECT * FROM anunturi WHERE TITLE LIKE ? ORDER BY TIME DESC", [`%${req.params.searchTerm}%`], function (err, teams, fields) {
            if (err) throw err;
            let list = teams;

            let last_page = list.length / posts_per_page;
            if (last_page !== parseInt(last_page)) {
                last_page = parseInt(last_page) + 1;
            }
            if(last_page === 0) {
                last_page = 1;
            }
            if (current_page > last_page) {
                res.redirect('/anunturi/'+req.params.searchTerm+'/page/' + last_page);
                return;
            }

            let start_page = current_page - 2;
            let end_page = current_page + 2;
            if (current_page <= 2) {
                start_page = 1;
                end_page = 5 <= last_page ? 5 : last_page;
            } else if (current_page >= last_page - 1) {
                start_page = last_page - 4;
                end_page = last_page;
            }

            let pages = {
                current_page: current_page,
                start_page: start_page,
                end_page: end_page,
                last_page: last_page
            };

            loaded_posts = list.slice((current_page - 1) * posts_per_page, current_page * posts_per_page);

            res.render('pages/anunturi.ejs', {
                email: req.cookies.username,
                tab: '1',
                posts: loaded_posts,
                term: '',
                pages: pages
            });
        });
});






module.exports = {url: '/anunturi', router: router};