const express = require('express');
const volleyball = require('volleyball');
const auth = require('./auth/index');
require('dotenv').config();

const app = express();

//logging requests
app.use(volleyball);
app.use(express.json());

//default route /
app.get('/', (req, res) => {
    res.json({
        message: "Response on \'/\' route"
    });
});

//auth route
app.use('/auth', auth);


function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ' + req.originalUrl);
    next(error);
    //console.log(res);
}

function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}

app.use(notFound);
app.use(errorHandler);



//start server on port 3000

const server = app.listen(3000, () =>{
    console.log(`Server started listening on ${server.address().port}`)
});