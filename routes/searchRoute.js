var express = require('express');
var router = express.Router();
const https = require('https');



let CHROME_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';
let FIREFOX_USER_AGENT = "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0";
let IE_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931';



router.get("/searchResult",isLoggedIn,(req, res) => { // add isLoggedIn
    let username = req.query.name;
    console.log("username:::::::::",username);
    if (username!=undefined) {
        
        let options = {
            host: "api.datamuse.com", // path: '/users/' + username,
            path: `/words?rel_rhy=${username}`,
          method: "GET", headers: { "user-agent": CHROME_USER_AGENT } };
        let request = https.request(options, (response) => {
            let body = '';
    
            response.on('data', (out) => {
                body += out;
            });
    
            response.on('end', (out) => {
                let json = JSON.parse(body);
                console.log(json);
                let availData=json;
                
                // res.render('searchResults.ejs',{availData})
            })
        });
    
        request.on('error', (e) => {
            console.log(e);
        });
    
        request.end();
    }else {
        let availData;
        res.render('searchResults.ejs',{availData})
    }
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("user is logged in");
        return next();
    }
    console.log("user is not logged in");
    res.redirect("/login");
}

module.exports = router;
