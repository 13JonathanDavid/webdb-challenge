const knex = require ('knex');
const config = require('./../../knex');
const db = knex(config.development);


function findProjectbyId(id) {
    return db('projects').where({id});
}

function addProject(project){
    return db('projects').insert(project);
}

module.exports = {
  findProjectbyId,
  addProject
};