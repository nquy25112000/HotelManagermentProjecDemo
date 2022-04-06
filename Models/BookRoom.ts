import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { ServiceOrders } from './ServiceOrders';
import { Bill } from './Bill';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class BookRoom extends bookshelf.Model<BookRoom> {
    get tableName() { return 'BookRoom'; }

    service(): Bookshelf.Collection<ServiceOrders> {
        return this.hasMany(ServiceOrders, 'bookRoomId');
    }

    bill(): Bookshelf.Collection<Bill> {
        return this.hasMany(Bill, 'bookRoomId');
    }

}