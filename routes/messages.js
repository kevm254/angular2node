let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let User = require('../models/user');
let Message = require('../models/message');


router.get('/', function(req, res) {
    Message.find()
        .populate('user', 'firstName')
        .exec((err, messages) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })
        });

});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    });
});


// POST /
router.post('/', function(req, res) {
    let decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        let message = new Message({
            content: req.body.content,
            user: user
        });

        message.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();

            res.status(201).json({
                message: 'Saved message',
                obj: result
            });
        });

    });
});



router.patch('/:id', (req, res) => {
    const decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function(err, message ) {
        // error-checking
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message found!',
                error: { message: 'Message not found' }
            });
        }
        if (message.user !== decoded.user._id) {
            return res
                .status(401)
                .json({
                    title: 'Not Authenticated',
                    error: { message: 'Users do not match' }
                });
        }
        // END error-checking

        message.content = req.body.content;
        message.save((err, result) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const decoded = jwt.decide(req.query.token);

    Message.findById(req.params.id, (err, message) => {
       // error conditions
        if (err) {
           res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }
       if (!message) {
           res.status(500).json({
               title: 'No message found',
               err: 'No message found'
           })


       }
       if (message.user !== decoded.user._id) {
            res
                .status(401)
                .json({
                    title: 'Not Authenticated',
                    error: { message: 'Users do not match' }
                })
       }

       // END error conditions

       message.remove(function(err, result) {
           if (err) {
               res.status(500).json({
                   title: 'An error occurred',
                   error: err
               });
           }
               res.status(200).json({
                   message: 'Message deleted',
                   obj: result
               });
       });



    });
});

module.exports = router;

