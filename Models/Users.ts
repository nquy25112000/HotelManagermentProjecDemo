import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { BookRoom } from './BookRoom';


const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class Users extends bookshelf.Model<Users> {

    get tableName() { return 'Users'; }
    bookRoom(): Bookshelf.Collection<BookRoom> {
        return this.hasMany(BookRoom, 'usersId');
    }
}
