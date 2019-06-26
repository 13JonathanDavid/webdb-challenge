const knex = require ('knex');
const config = require('./../../knex');
const db = knex(config.development);
module.exports = {
  findActionsbyProjectId,
  addAction
};
function findActionsbyProjectId(id) {
    return db('actions').where('project_id',id);
}

function addAction(action){
    return db('actions').insert(action);
}



