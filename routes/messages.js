let express = require('express');
let router = express.Router();

let Message = require('../models/message');

router.post('/', function(req, res) {
   let message = new Message({
       content: req.body.content
   });

   message.save(function(err, result) {
       if (err) {
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }

       res.status(201).json({
           message: 'Saved message',
           obj: result
       });
   })
});

router.get('/', function(req, res) {
    Message.find()
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

router.patch('/:id', (req, res) => {
    Message.findById(req.params.id, function(err, message ) {
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
    Message.findById(req.params.id, (err, message) => {
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

