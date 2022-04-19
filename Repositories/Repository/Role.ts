
import { Role } from '../../Models/Role'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect';

const knex = new Connect().knex;
const role = new Role();


export class RoleRepository extends KnexRepository<Role> {
    constructor() {
        super(role.tableName);
    }


    findIdbyNameAdmin(): Promise<any> {
        return knex(this.tableName)
            .select('id')
            .where({ name: 'Admin' })
    }

    findAllRole(): Promise<any> {
        return knex(this.tableName)
            .where("name", "!=", "Root")
            .select()

    }
}