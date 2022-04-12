
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository'

const bookRoom = new BookRoom();
const knex = new Connect().knex;
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
