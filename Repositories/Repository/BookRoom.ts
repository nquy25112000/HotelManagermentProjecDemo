
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository'

const bookRoom = new BookRoom();

export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }
}