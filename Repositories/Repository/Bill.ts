
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
    // getTimeAndPrice (id : string):  Promise<any[]>{
    //     const tableBookRoom : any = bookRoom.tableName;
    //     const tableRoom : any = room.tableName;
    //     return knex.select('BookRoom.id' ,'BookRoom.customerName','BookRoom.customersIdCard', 'BookRoom.fromDate', 'BookRoom.toDate','BookRoom.userId' ,'Room.name' ,'Room.type','Room.price')
    //             .from('BookRoom').join('Room', function() {
    //             this.on('BookRoom.roomId', '=', ' Room.id').andOn('BookRoom.id', knex.raw('?', [id ]) )})    
    // }

    findAllBillByHotelId (hotelid : string):  Promise<any[]>{
        return knex.select('Bill.id' ,'Bill.total','Bill.createdAt', 'Bill.updatedAt','Bill.bookRoomId')
                .from('Bill')
                .innerJoin('BookRoom', function() { this.on('Bill.bookRoomId', '=', ' BookRoom.id')})    
                .innerJoin('Room', function() { this.on('BookRoom.roomId ', '=', ' Room.id').andOn('Room.hotelId', knex.raw('?', [hotelid ]) )})   
    }

    getTimeAndPrice (id : string, hotelId : string):  Promise<any[]>{
        return knex.select('BookRoom.id' ,'BookRoom.customerName','BookRoom.customerIdCard', 'BookRoom.fromDate', 'BookRoom.toDate','BookRoom.userId' ,'Room.id as idRoom','Room.name' ,'RoomType.type','RoomType.price')
                .from('Room')
                .innerJoin('BookRoom', function() { this.on('BookRoom.id ', knex.raw('?', [id ]))  
                                            .andOn('BookRoom.roomId', '=', ' Room.id')
                                            .andOn('Room.hotelId', knex.raw('?', [hotelId]))})    
                .innerJoin('RoomType', function() { this.on('Room.roomTypeId ', '=', ' RoomType.id')})   
    }

    getInforserviceOrder (idBookRoom : string): Promise<any[]>{
        return knex.select('Services.name' , 'Services.price', 'Serviceorders.number' , 'Serviceorders.total').from('Serviceorders').join('Services', function() {
            this.on('Serviceorders.serviceId ', '=', ' Services.id').andOn('Serviceorders.bookRoomId', knex.raw('?', [idBookRoom ]) )})    
    }

    getInforUser (idBookRoom : string): Promise<any[]>{
        return knex.select('Services.name' , 'Services.price', 'Serviceorders.number' , 'Serviceorders.total').from('Serviceorders').join('Services', function() {
            this.on('Serviceorders.serviceId ', '=', ' Services.id').andOn('Serviceorders.bookRoomId', knex.raw('?', [idBookRoom ]) )})    
    }

}