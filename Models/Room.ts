import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { BookRoom } from './BookRoom';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class Room extends bookshelf.Model<Room> {
    get tableName() { return 'Room'; }

    bookrome(): Bookshelf.Collection<BookRoom> {
        return this.hasMany(BookRoom, 'roomId');
    }
    name: any;

}