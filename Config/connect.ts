export class Connect {
    public knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '',
            database: 'Hotel_18_4',
            charset: 'utf8',
            timezone : 'UTC'

        }
    })
}

