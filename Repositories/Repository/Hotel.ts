
import { Hotel } from '../../Models/Hotel'
import { KnexRepository } from '../KnexRepository'

const hotel = new Hotel();

export class HotelRepository extends KnexRepository<Hotel> {
    constructor() {
        super(hotel.tableName);
    }
}