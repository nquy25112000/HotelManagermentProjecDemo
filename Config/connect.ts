export class Connect {
    public knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'hotel',
            charset: 'utf8'
        }
    })
}
