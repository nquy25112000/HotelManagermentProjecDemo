
import { Service } from '../../Models/Service'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';
const knex = new Connect().knex;

const service = new Service();

export class ServiceRepository extends KnexRepository<Service> {
    constructor() {
        super(service.tableName);
    }

    checkNameServiceCreate(name : string , hotelId : string): Promise<Service[]> {
        return knex(this.tableName)
                .where('name', '=', name)
                .andWhere('hotelId ', '=', hotelId)
                .select()
                ;
    }
    checkNameServiceUpdate(id: string, name : string, hotelId : string ): Promise<Service[]> {
        return knex(this.tableName)
                .whereNot('id', '=', id)
                .andWhere('name', '=', name)
                .andWhere('hotelId ', '=', hotelId)
                .select()
                ;
    }

    checkServiceByHotelId(id : string , hotelId : string): Promise<Service[]> {
        return knex.select()
        .from('Services')
        .where('id', '=', id)
        .andWhere('hotelId ', '=', hotelId)
    }
}