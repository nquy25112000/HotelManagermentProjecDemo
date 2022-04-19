
import { Connect } from '../../Config/connect';
import { BookRoom } from '../../Models/BookRoom'
import { KnexRepository } from '../KnexRepository';

const knex = new Connect().knex;
const bookRoom = new BookRoom();

export class BookRoomRepository extends KnexRepository<BookRoom> {
    constructor() {
        super(bookRoom.tableName);
    }
    findRoomIdAndFromDateToDateToCreate(roomId: any, date: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where('roomId', '=', roomId)
            .andWhere('fromDate', '<=', `${date}`)
            .andWhere('toDate', '>=', `${date}`)
            .select();
    }
    findRoomIdAndFromDateToDateToUpDate(roomId: any, date: any, id: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .where('roomId', '=', roomId)
            .andWhere('fromDate', '<=', `${date}`)
            .andWhere('toDate', '>=', `${date}`)
            .andWhere('id', '!=', `${id}`)
            .select();
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
    findAllBookRoomWhereHotelId(id: string): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.roomId", "Room.name", "BookRoom.userId", "Users.fullName")
            .innerJoin("Room", "Room.id", "=", bookRoom.tableName + ".roomId")
            .innerJoin("Users", "Users.id", "=", bookRoom.tableName + ".userId")
            .where('Room.hotelId', "=", id)
    }
    findOneBookRoomWhereHotelId(hotelId: string, bookRoomId: any): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select("BookRoom.id", "BookRoom.customerName", "BookRoom.customerIdCard", "BookRoom.fromDate", "BookRoom.toDate", "BookRoom.roomId", "Room.name", "BookRoom.userId", "Users.fullName")
            .innerJoin("Room", "Room.id", "=", "BookRoom.id")
            .innerJoin("Users", "Users.id", "=", "BookRoom.id")
            .where('Room.hotelId', "=", hotelId)
            .andWhere("BookRoom.id", "=", bookRoomId)
            .andWhere("BookRoom.id", "=", bookRoomId)
    }

    findBookRoomWhereRoomIdAndHotelId(id: string): Promise<any> {
        return knex.table(bookRoom.tableName)
            .select()
            .innerJoin("Room", "Room.id", "=", bookRoom.tableName + ".roomId")
            .where('Room.hotelId', "=", id)
    }
}

