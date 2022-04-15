
import { Service } from '../../Models/Service'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';
const knex = new Connect().knex;

const service = new Service();

export class ServiceRepository extends KnexRepository<Service> {
    constructor() {
        super(service.tableName);
    }

    checkNameService(name : string ): Promise<Service[]> {
        return knex(this.tableName)
                .where('name', '=', name)
                .select()
                ;
    }
}