const knex = require ('knex');
const config = require('./../../knex');
const db = knex(config.development);

const bcrypt = require('bcryptjs');

module.exports = {
  findActionsbyProjectId,
  addAction,
  login
};
function findUser(id) {
    return db('users').where('user',id);
}
function findUserByString(str) {
    return db('users').where('name',str).first();
}

function findAllUsers() {
    return db('users');
}
function createUser(username,password){
    password = bcrypt.hashSync(password, 12);
    return db('users').insert({name:username,password:password});
}
function createToken (userId) {
    return db('tokens').insert({user_id:userId,token: Math.random()
*100});
}
async function verifyUser (token) {
    let record = await db('tokens').where('token',token);
    return await findUser(record.user_id);
}
async function login(username,password) {
    console.log('in login funct');
    return 1;
    record = await findUserByString(username);
    console.log(record);
    return ((bcrypt.compareSync(password, record.password)?record.id:0)); 
}