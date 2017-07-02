let router = require('express').Router();
let bcrypt = require('bcryptjs');

let User = require('../models/user');
let jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    user.save((err, result) => {
        if (err) {
            res.status(500).json({
                title: 'An error message',
                error: err
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result
        })
    });
});

router.post('/signin', (req, res) => {
   User.findOne({
       email: req.body.email
   }, (err, user) => {
       if (err) {
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }
       if (!user) {
           return res.status(401).json({
               title: 'Login failed',
               error: { message: 'Invalid login credentials'  }
           });
       }

       if (!bcrypt.compareSync(req.body.password, user.password)) {
           return res.status(401).json({
               title: 'Login failed',
               error: { message: 'Invalid' +
               ' login credentials' }
           })
       }

       let token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
       res.status(200).json({
           message: 'Successfully logged in',
           token: token,
           userId: user._id
       });

   });
});

module.exports = router;