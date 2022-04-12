
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
        return knex.select('BookRoom.uuid' ,'BookRoom.customerName','BookRoom.customersIdCard', 'BookRoom.fromDate', 'BookRoom.toDate','BookRoom.userId' ,'Room.name' ,'Room.type','Room.price')
                .from('BookRoom').join('Room', function() {
                this.on('BookRoom.roomId', '=', ' Room.uuid').andOn('BookRoom.uuid', knex.raw('?', [id ]) )})    
    }

    getInforserviceOrder (idBookRoom : string): Promise<any[]>{
        return knex.select('Services.name' , 'Services.price', 'Serviceorders.number' , 'Serviceorders.total').from('Serviceorders').join('Services', function() {
            this.on('Serviceorders.serviceId ', '=', ' Services.uuid').andOn('Serviceorders.bookRoomId', knex.raw('?', [idBookRoom ]) )})    
    }

    getInforUser (idBookRoom : string): Promise<any[]>{
        return knex.select('Services.name' , 'Services.price', 'Serviceorders.number' , 'Serviceorders.total').from('Serviceorders').join('Services', function() {
            this.on('Serviceorders.serviceId ', '=', ' Services.uuid').andOn('Serviceorders.bookRoomId', knex.raw('?', [idBookRoom ]) )})    
    }

}