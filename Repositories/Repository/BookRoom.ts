
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository';

const knex = new Connect().knex;
const bookRoom = new BookRoom();

export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }
    findRoomIdAndFromDateToDate(roomId: any, date: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where('roomId', '=', roomId)
            .andWhere('fromDate', '<=', `${date}`)
            .andWhere('toDate', '>=', `${date}`)
            .select();
    }
    getHour(id: string): Promise<BookRoom[]> {
        return knex.column('fromDate', 'toDate').where('uuid ', '=', id).select().from(this.tableName)
    }
    findRoomId(id: string): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where('roomId', '=', id)
            .select();
    }
    findUsers(id: string): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where('userId', '=', id)
            .select();
    }
}

