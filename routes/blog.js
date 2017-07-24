const express = require('express');
let router = express.Router();

let Blog = require('../models/blog');

router.get('/', (req, res) => {
    Blog.find()
        .exec((err, blogs) => {
            if (err) {
                return res.status(400).json({
                    title: 'An error occurred',
                    error: 'There was an error'
                });
            }

            res.status(200).send({
                blogs:  blogs
            })
        });
});

router.post('/', (req, res) => {
    console.log('REQ BODY', req.body);
    res.send('yo');
});

module.exports = router;