
import { Room } from '../../Models/Room'
import { KnexRepository } from '../KnexRepository'

const room = new Room();

export class RoomRepository extends KnexRepository<Room> {
    constructor() {
        super(room.tableName);
    }
}