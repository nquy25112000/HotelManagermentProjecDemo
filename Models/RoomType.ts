import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { Room } from './Room';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class RoomType extends bookshelf.Model<RoomType> {
    get tableName() { return 'Roomtype'; }

    rome(): Bookshelf.Collection<Room> {
        return this.hasMany(Room, 'roomTypeId');
    }

}