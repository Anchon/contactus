var express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router);

router.post('/', function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'accout@gmail.com',
            pass: 'password'
        }
    });

    var r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (r.test(req.body.email) == false) {
        res.writeHead(400);
        res.write("Your message wasn't delivered");
        res.end();
        return;
    }

    var mailOptions = {
        from: req.body.email,
        to: 'account@gmail.com',
        subject: 'Website submission',
        text: 'You have a new submission with following details... Name: ' + req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
        html: '<p>You have a new submission with following details</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            //res.redirect('/');
        } else {
            console.log('Message sent: ' + info.response);
            res.writeHead(200);
            res.write("Your message was sent successfully");
            res.end();
            //res.redirect('/');
        }
    });
});

server = app.listen(3000, function () {
    console.log('listening on port 3000');
});