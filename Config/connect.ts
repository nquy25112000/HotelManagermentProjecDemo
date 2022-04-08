export class Connect {
    public knex = require('knex')({
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'HotelManagerment',
            charset: 'utf8'
        }
    })
}
