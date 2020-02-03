const { config } = require('dotenv')

module.exports = function() {
  config() // Load config form .env file
  const database = {
    client: 'mysql',
    connection: {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    }
  }
  return { database }
}