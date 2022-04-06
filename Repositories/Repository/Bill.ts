
import { Bill } from '../../Models/Bill'
import { KnexRepository } from '../KnexRepository'

const bill = new Bill();

export class BillRepository extends KnexRepository<Bill> {
    constructor() {
        super(bill.tableName);
    }

}