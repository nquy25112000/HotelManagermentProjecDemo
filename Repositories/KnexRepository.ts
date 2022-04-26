import { RepositoryGeneral } from './RepositoryGeneral'
import { Connect } from '../Config/connect'


const knex = new Connect().knex;

export abstract class KnexRepository<T> implements RepositoryGeneral<T> {
    constructor(
        public tableName: string
    ) { this.tableName = tableName; }

    delete(id: string): Promise<any> {
        return knex(this.tableName)
            .where('id', id)
            .del()

    }
    findAll(): Promise<T[]> {
        return knex(this.tableName)
            .select()
    }
    
    findAllWhereHotelId(hotelId: string): Promise<T[]> {
        return knex.table(this.tableName)
            .select()
            .where(this.tableName + ".hotelId", "=", hotelId)
    }
    findOneWhereHotelId(id: string, hotelId: string): Promise<boolean> {
        return knex(this.tableName)
            .where({id: id})
            .andWhere("hotelId", "=", hotelId) //làm vầy để tránh việc user của khách sạn này mà xem được user của khách sạn kia
            .select()
    }
    create(item: T[]): Promise<any> {
        return knex(this.tableName)
            .insert(item)
    }
    update(id: string, item: T[]): Promise<T[]> {
        return knex(this.tableName)
            .where('id', '=', id)
            .update(item)
    }
    findOne(id: string): Promise<boolean> {
        return knex(this.tableName)
            .where({
                id: id
            })
            .select();
    }
    findItem(item: T[]): Promise<T[]> {
        return knex(this.tableName)
            .where(item)
            .select();
    }


}