const dbConfig = require('../config/config')


const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },

    logging: console.log
})

// const db = {}

// db.Sequelize = Sequelize
// db.sequelize = sequelize

// // db.User = require("./userModel")/
// // db.Blog = require("./blogModel")

module.exports = sequelize