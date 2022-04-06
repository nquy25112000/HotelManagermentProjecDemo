import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { ServiceOrders } from './ServiceOrders';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class Service extends bookshelf.Model<Service> {
    get tableName() { return 'Services'; }

    serviceOrders(): Bookshelf.Collection<ServiceOrders> {
        return this.hasMany(ServiceOrders, 'serviceId');
    }
}