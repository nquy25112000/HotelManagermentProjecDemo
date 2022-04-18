
import { RoomType } from '../../Models/RoomType'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';

const roomType = new RoomType();
const knex = new Connect().knex;

export class RoomTypeRepository extends KnexRepository<RoomType> {
    constructor() {
        super(roomType.tableName);
    }
    checkValidateTypeName(roomTypeName: string, hotelid: any): Promise<any> {
        return knex(this.tableName)
            .select()
            .where({ type: roomTypeName })
            .andWhere({ hotelId: hotelid })
    }
    checkValidateTypeNameOtherId(roomTypeName: string, hotelid: any, id: string): Promise<any> {
        return knex(this.tableName)
            .select()
            .where({ type: roomTypeName })
            .andWhere({ hotelId: hotelid })
            .andWhere("id", "!=", id)
    }
    findRoomId(id: string): Promise<any> {
        return knex.table("Room")
            .where('roomTypeId', '=', id)
            .select();
    }
}