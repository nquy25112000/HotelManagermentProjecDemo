
import { ServiceOrders } from '../../Models/ServiceOrders'
import { KnexRepository } from '../KnexRepository'

const serviceOrders = new ServiceOrders();

export class ServiceOrdersRepository extends KnexRepository<ServiceOrders> {
    constructor() {
        super(serviceOrders.tableName);
    }
}