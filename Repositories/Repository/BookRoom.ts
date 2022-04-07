
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository'

const bookRoom = new BookRoom();
const knex = new Connect().knex;
export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }

    findCustomersIdCard(idCard: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where({ customerIdCard: idCard })
            .select()
    }
}