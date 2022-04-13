
import { Hotel } from '../../Models/Hotel'
import { KnexRepository } from '../KnexRepository';
import { Connect } from '../../Config/connect';
const knex = new Connect().knex;
const hotel = new Hotel();

export class HotelRepository extends KnexRepository<Hotel> {
    constructor() {
        super(hotel.tableName);
    }
    checkNameHotel(name : string ): Promise<Hotel[]> {
        return knex(this.tableName)
                .where('name', '=', name)
                .select()
                ;
    }
}