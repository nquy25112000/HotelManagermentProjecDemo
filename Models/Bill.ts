import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';



const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class Bill extends bookshelf.Model<Bill> {
    get tableName() { return 'Bill'; }

}