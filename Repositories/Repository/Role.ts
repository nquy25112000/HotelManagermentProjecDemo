
import { Role } from '../../Models/Role'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';
const role = new Role();
const knex = new Connect().knex;

export class RoleRepository extends KnexRepository<Role> {
    constructor() {
        super(role.tableName);
    }

    findIdbyNameAdmin (): Promise<any> {
        return knex(this.tableName)
            .select('id')
            .where({ name: 'Admin' })
    }
}