
import { ServiceOrders } from '../../Models/ServiceOrders'
import { KnexRepository } from '../KnexRepository';
import { Connect } from '../../Config/connect';


const knex = new Connect().knex;

const serviceOrders = new ServiceOrders();

export class ServiceOrdersRepository extends KnexRepository<ServiceOrders> {
    constructor() {
        super(serviceOrders.tableName);
    }
    totalService(id : string ): Promise<ServiceOrders[]> {
        return knex(this.tableName)
                .where('bookRoomId', '=', id)
                .sum('total  as sum')
                ;
    }
}