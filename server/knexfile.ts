import * as dotenv from 'dotenv';
dotenv.config();

export default {
    development: {
        client: 'mysql',
        connection: {
            host: 'db', // service name in docker network
            database: process.env.MYSQL_DATABASE,
            user:     'root',
            password: 'root',
        },
    },
    migrations: {
        client: 'mysql',
        connection: {
            host: 'db', // service name in docker network
            database: process.env.MYSQL_DATABASE,
        },
    },
};
