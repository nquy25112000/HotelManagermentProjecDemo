
import { Room } from '../../Models/Room'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';

const room = new Room();
const knex = new Connect().knex;

export class RoomRepository extends KnexRepository<Room> {
    constructor() {
        super(room.tableName);
    }
    checkValidateRoomName(roomName: string, hotelid: string): Promise<any> {
        return knex(this.tableName)
            .select()
            .where({ name: roomName })
            .andWhere({ hotelId: hotelid })
    }
    checkValidateRoomNameOtherId(roomName: string, hotelid: string, id: string): Promise<any> {
        return knex(this.tableName)
            .select()
            .where({ name: roomName })
            .andWhere({ hotelId: hotelid })
            .andWhere("id", "!=", id)
    }
    checkHotelId(hotelId: string): Promise<any> {
        return knex("Hotel")
            .select("Hotel.id")
            .where({ id: hotelId })
    }
}