export class Connect {
    public knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'Hotel_18_4',
            charset: 'utf8',
            timezone : 'UTC'
        }
    })
}
