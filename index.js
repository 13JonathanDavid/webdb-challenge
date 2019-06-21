const actionModel = require('./data/models/actionModel');
const projectModel = require('./data/models/projectModel');
const express = require('express');
const router = express.Router(); 
// const {check, validationResult } = require('express-validator/check');
const port = 3333;

//server def and init
const server = express();
server.use(express.json());

server.get('/project/:id', async (req,res) => {
    try {
        let id = parseInt(req.params.id);
        let result = await projectModel.findProjectbyId(parseInt(id));
        const actions = await actionModel.findActionsbyProjectId(id);
        res.status(200).json({...result, actions : actions});
    }
    catch(e) {
        await res.status(500).json({errorMessage: e });
    }
});

server.post('/project', async (req,res) => {
    try {
       let result = await projectModel.addProject(req.body);
        res.status(200).json(result);
    }
    catch(e) {
        await res.status(500).json({errorMessage: e });
    }
});

server.post('/action', async (req,res) => {
    try {
       let result = await actionModel.addAction(req.body);
        res.status(200).json(result);
    }
    catch(e) {
        await res.status(500).json({errorMessage: e });
    }
});

//server invoke
server.listen(port, () => {
    console.log(`I am listening on part ${port}`);
});
