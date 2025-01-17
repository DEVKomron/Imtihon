const config =require("config")
const { Sequelize } = require("sequelize")


const sequalize = new Sequelize(
    config.get("db_name"),
    config.get("db_username"),
    config.get("db_password"),
    {
        dialect:"postgres",
        logging:false,
        port:config.get("db_port"),
        host:config.get("db_host"),

    }

);
module.exports = sequalize;