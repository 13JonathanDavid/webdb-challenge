module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/GTD.db3'
    },
  pool:{
    afterCreate : (connection , done) =>{
      connection.run('PRAGMA foreign_keys = ON', done )
    }
  },
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  }
}
}