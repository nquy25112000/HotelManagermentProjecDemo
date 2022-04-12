
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository';
import { Connect } from '../../Config/connect'

const knex = new Connect().knex;
const bookRoom = new BookRoom();

export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }

}