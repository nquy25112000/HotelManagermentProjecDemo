
import { Service } from '../../Models/Service'
import { KnexRepository } from '../KnexRepository'

const service = new Service();

export class ServiceRepository extends KnexRepository<Service> {
    constructor() {
        super(service.tableName);
    }
}