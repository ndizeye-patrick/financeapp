const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
    ssl: 'require'
  }
}