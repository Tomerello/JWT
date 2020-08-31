const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.json({
        message: 'Response from /auth/ route'
    })
});

router.post('/getjwt', (req, res) => {
    jwt.sign(req.body, process.env.TOKEN_SECRET, {
        expiresIn: '15s'
    }, (err, token) => {
        if(err){

        }
        else{
            res.json({
                token
            });
        }
    });
});

router.post('/verifyjwt', (req, res, next) => {
    console.log(req.body.token);
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, decoded) => {
        if(decoded){
            res.json({
                decoded
            });
        }
        else{
            res.status(401);
            next(new Error('Token has expired'));
        }

    });
});

router.get('/test', (req, res, next) => {
    next(new Error('Failed'));
});

module.exports = router;