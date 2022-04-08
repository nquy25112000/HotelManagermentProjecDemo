
import { Bill } from '../../Models/Bill'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { Room } from '../../Models/Room';

const room = new Room();
const bookRoom = new BookRoom();

const knex = new Connect().knex;

const bill = new Bill();

export class BillRepository extends KnexRepository<Bill> {
    constructor() {
        super(bill.tableName);
    }
    getTimeAndPrice (id : string):  Promise<any[]>{
        const tableBookRoom : any = bookRoom.tableName;
        const tableRoom : any = room.tableName;
        return knex(tableRoom) .join(tableBookRoom, tableBookRoom.roomId, '=', tableRoom.uuid)
                .select(tableBookRoom.uuid, tableBookRoom.fromDate, tableBookRoom.toDate,tableRoom.price  );
        ;
    }
    // SELECT BookRoom.uuid , BookRoom.fromDate, BookRoom.toDate , Room.price FROM BookRoom INNER JOIN Room on BookRoom.roomId = Room.uuid and BookRoom.uuid = "817117c3-1093-442f-bd1e-09431faaace2"
    //knex('users') .join('contacts', 'users.id', '=', 'contacts.user_id').select('users.id', 'contacts.phone')

}