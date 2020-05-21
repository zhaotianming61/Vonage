require('dotenv').config();

const path = require('path')
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const Nexmo = require('nexmo');
const SmsProxy = require('./SmsProxy');

const NEXMO_API_KEY = process.env.NEXMO_API_KEY;
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET;
const NEXMO_BRAND_NAME = process.env.NEXMO_BRAND_NAME;

const nexmo = new Nexmo({
    apiKey: NEXMO_API_KEY,
    apiSecret: NEXMO_API_SECRET
}, {
        debug: true
    });

let username = 'ztm';
let verifyRequestId = null;
let verifyRequestNumber = null;

app.use(express.static('public'));

app.use(session({
    secret: 'loadsofrandomstuff',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');


const smsProxy = new SmsProxy();


app.get('/', (req, res) => { 
    if (!req.session.user) {
        res.render('index', {
            brand: NEXMO_BRAND_NAME
        });
    }
    else { 
        res.render('index', {
            username: req.session.user.username,
            number: req.session.user.number,
            brand: NEXMO_BRAND_NAME
        });
    }
});

app.get('/login', (req, res) => {
    // Display the login page
    res.render('login');
});

app.post('/verify', (req, res) => { 
    verifyRequestNumber = req.body.number;
    username = req.body.username;
    console.log(req);
    nexmo.verify.request({
        number: verifyRequestNumber,
        brand: NEXMO_BRAND_NAME
    }, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            verifyRequestId = result.request_id;
            console.log(`request_id: ${verifyRequestId}`);
        }
    });
    /* 
        Redirect to page where the user can 
        enter the code that they received
     */
    res.render('entercode');
});

app.post('/check-code', (req, res) => {
    // Check the code provided by the user
    console.log(req); 
    nexmo.verify.check({
        request_id: verifyRequestId,
        code: req.body.code
    }, (err, result) => {
        if (err) {
            console.error(err);
        } else {
            if (result.status == 0) {
                /* 
                    User provided correct code,
                    so create a session for that user
                */
                req.session.user = {
                    username: username,
                    number: verifyRequestNumber
                }
            }
        }
        // Redirect to the home page
        res.redirect('/');
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


app.post('/chat', (req, res) => { 
    const userANumber = verifyRequestNumber;
    const userBNumber = req.body.tonumber;
    smsProxy.createChat(userANumber, userBNumber, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(result);
        }
    });
    res.render('chat');
}); 
app.post('/webhooks/inbound-sms', (req, res) => {
    const from = req.body.msisdn;
    const to = req.body.to;
    const text = req.body.text; 
    // Route virtual number to real number
    console.log('server inbound-sms');
    console.log(req);
    console.log(from);
    smsProxy.proxySms(from, text);

    res.sendStatus(204);
});

const server = app.listen(3000, () => {
    console.log(`Server running on port ${server.address().port}`);
});

