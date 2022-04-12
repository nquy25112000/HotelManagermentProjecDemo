
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository';

const knex = new Connect().knex;
const bookRoom = new BookRoom();

export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }
    findRoomId(roomId: any, date: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where('roomId', '=', roomId)
            .andWhere('fromDate', '<=', `${date}`)
            .andWhere('toDate', '>=', `${date}`)
            .select();
    }

}

