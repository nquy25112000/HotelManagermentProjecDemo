export class Connect {
    public knex = require('knex')({
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: '3306',
            user: 'root',
            password: '',
            database: 'hotel123',
            charset: 'utf8',
            timezone: 'UTC'

        }
    })
}

