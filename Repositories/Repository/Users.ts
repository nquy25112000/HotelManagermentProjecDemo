
import { Users } from '../../Models/Users'
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect'


const knex = new Connect().knex;
const users = new Users();

export class UsersRepository extends KnexRepository<Users> {
    constructor() {
        super(users.tableName);
    }
    selectAcount(user: string, pass: string): Promise<Object> {
        return knex(this.tableName)
            .where('username', '=', user)
            .andWhere('password', '=', pass)
            .select()
    };
    selectName(user: string): Promise<Users[]> {
        return knex(this.tableName)
            .where('username', '=', user)
            .select()
    };
    selectPass(pass: string): Promise<boolean> {
        return knex(this.tableName)
            .where('username', '=', pass)
            .select()
    };
}