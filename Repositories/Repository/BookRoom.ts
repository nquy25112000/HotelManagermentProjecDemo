
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository';

const knex = new Connect().knex;
const bookRoom = new BookRoom();

export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }
    getHour(id: string): Promise<BookRoom[]> {
        return knex.column('fromDate', 'toDate').where('id ', '=', id).select().from(this.tableName)
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

    //Check date book room

    findRoomIdAndFromDateToDateToCreate(roomId: any, date: any, hotelId: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Room", "Room.id", "=", "BookRoom.roomId")
            .where('BookRoom.roomId', '=', roomId)
            .andWhere('Room.hotelId', '=', hotelId)
            .andWhere('BookRoom.fromDate', '<=', `${date}`)
            .andWhere('BookRoom.toDate', '>=', `${date}`)

    }
    findRoomIdAndFromDateToDateToUpDate(roomId: any, date: any, id: any, hotelId: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.paymentDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Room", "Room.id", "=", "BookRoom.roomId")
            .where('BookRoom.roomId', '=', roomId)
            .andWhere('Room.hotelId', "=", hotelId)
            .andWhere('BookRoom.fromDate', '<=', date)
            .andWhere('BookRoom.toDate', '>=', date)
            .andWhere('BookRoom.id', '!=', id)
    }


    findBetweenFromDateAndToDate(roomId: any, Fdate: any, Tdate: any, hotelId: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.paymentDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Room", "Room.id", "=", "BookRoom.roomId")
            .where('roomId', '=', roomId)
            .andWhere('Room.hotelId', "=", hotelId)
            .andWhereBetween('BookRoom.fromDate', [Fdate, Tdate])

    }


    findBetweenFromDateAndToDateToUpDate(roomId: any, Fdate: any, Tdate: any, id: any, hotelId: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.paymentDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Room", "Room.id", "=", "BookRoom.roomId")
            .where('roomId', '=', roomId)
            .andWhere('Room.hotelId', "=", hotelId)
            .andWhere('BookRoom.id', '!=', id)
            .andWhereBetween('BookRoom.fromDate', [Fdate, Tdate])
    }

    //----------------------------------

    findExistCustomerIdCard(date: any, hotelId: any, customerIdCard: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.paymentDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Users", "Users.id", "=", "BookRoom.userId")
            .where('Users.hotelId', '=', hotelId)
            .andWhere('BookRoom.fromDate', '<=', date)
            .andWhere('BookRoom.toDate', '>=', date)
            .andWhere('BookRoom.customerIdCard', "=", customerIdCard)
    }


    findAllBookRoomWhereHotelIdPaymentNull(id: string): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.paymentDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Room", "Room.id", "=", "BookRoom.roomId")
            .where('Room.hotelId', "=", id)
            .havingNull('BookRoom.paymentDate')
    }
    findOneBookRoomWhereHotelId(hotelId: string, bookRoomId: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.paymentDate", "BookRoom.roomId", "Room.name as roomName", "BookRoom.userId")
            .innerJoin("Room", "Room.id", "=", "BookRoom.roomId")
            .where('Room.hotelId', "=", hotelId)
            .andWhere("BookRoom.id", "=", bookRoomId)
            .havingNull('BookRoom.paymentDate')
    }
}
