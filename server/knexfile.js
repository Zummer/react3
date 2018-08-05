require('dotenv').config();

module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'db', // service name in docker network
            database: process.env.MYSQL_DATABASE,
            user:     'root',
            password: 'root'
        }
    },
    migrations: {
        client: 'mysql',
        connection: {
            host: 'db', // service name in docker network
            database: process.env.MYSQL_DATABASE,
        }
    }
};
