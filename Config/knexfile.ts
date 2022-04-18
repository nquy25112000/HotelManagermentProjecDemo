
module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
  },
  migrations: {
    file: __dirname + '/migrations'
  },
  seed: {
    file: __dirname + '/seed'
  },
  useNullAsDefault: true
}