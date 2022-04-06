import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class ServiceOrders extends bookshelf.Model<ServiceOrders> {
    get tableName() { return 'Serviceorders'; }

}