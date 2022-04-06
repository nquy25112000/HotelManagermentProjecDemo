
import { Role } from '../../Models/Role'
import { KnexRepository } from '../KnexRepository'

const role = new Role();

export class RoleRepository extends KnexRepository<Role> {
    constructor() {
        super(role.tableName);
    }
}