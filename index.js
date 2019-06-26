const actionModel = require('./data/models/actionModel');
const projectModel = require('./data/models/projectModel');
const userModel = require('./data/models/projectModel');
const express = require('express');
const router = express.Router(); 
// const {check, validationResult } = require('express-validator/check');
const port = 3333;

//server def and init
const server = express();
server.use(express.json());


// configure express-session middleware
const session = require('express-session');
server.use(
    session({
      name: 'Jyl2aWeBPpoZVOdMNOTF',
      secret: 'DQhbt4aCuNGHcNEGsTGB!',
      cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, //days * hours * minutes * seconds * ms 
        secure: false, 
      }, 
      httpOnly: true, 
      resave: false,
      saveUninitialized: false,
    })
  );


server.get('/api/:users', async (req,res) => {
    try {
        if(typeof req.session.userId && req.sessions.userId >= 1){
            let result = userModel.findAllUsers();
            res.status(200).json(result);
        }
        else throw "unauthorized";

    }
    catch(e) {
        await res.status(500).json({errorMessage: e });
    }
});

server.post('/api/login', async (req,res) => {

    try {
      console.log('start');
       console.log('end');
       console.log(req.body.username),
       console.log(req.body.password);
       if(true){
           req.session.userId = result;
       }
       res.status(200).json(result);
    }
    catch(e) {
        await res.status(500).json({errorMessage: e });
    }
});

server.get('/api/logout', async (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send('error logging out');
        } else {
          res.send('logged out');
        }
      });
    }
  });

server.post('/api/register', async (req,res) => {
    try {
       let result = await actionModel.addAction(req.body);
        res.status(200).json(result);
    }
    catch(e) {
        await res.status(500).json({errorMessage: e });
    }
});

  server.get('/greet', (req, res) => {
    const name = req.session.name;
    res.send(`hello ${req.session.name}`);
  });

//server invoke
server.listen(port, () => {
    console.log(`I am listening on part ${port}`);
});
