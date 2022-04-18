
import { Hotel } from '../../Models/Hotel'
import { KnexRepository } from '../KnexRepository';
import { Connect } from '../../Config/connect';
const knex = new Connect().knex;
const hotel = new Hotel();

export class HotelRepository extends KnexRepository<Hotel> {
    constructor() {
        super(hotel.tableName);
    }

    checkNameHotelCreate(name : string): Promise<Hotel[]> {
        return knex(this.tableName)
                .where('name', '=', name)
                .select()
                ;
    }
    checkNameHotelUpdate(id: string, name : string ): Promise<Hotel[]> {
        return knex(this.tableName)
                .whereNot('id', '=', id)
                .andWhere('name', '=', name)
                .select()
                ;
    }

    inforUser(id: string): Promise<any[]> {
        return knex('Users')
                .where('id', '=', id)
                .select('fullName', 'birtDate', 'adress' , 'phone')
                ;
    }
}