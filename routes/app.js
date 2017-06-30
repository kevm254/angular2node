var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/message/:msg', function(req, res) {
    console.log(req.params.msg);
    res.render('message', {
        message: req.params.msg,
    });
});

router.post('/message', function(req, res) {
    let message = req.body.message;

    res.redirect('/message/' + message);
});

module.exports = router;
