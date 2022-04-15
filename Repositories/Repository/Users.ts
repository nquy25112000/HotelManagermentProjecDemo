
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
    findUserName(user: string): Promise<Users[]> {
        return knex(this.tableName)
            .where('username', '=', user)
            .select()
    };
    selectPass(pass: string): Promise<boolean> {
        return knex(this.tableName)
            .where('username', '=', pass)
            .select()
    };

    checkHotelId(id: string): Promise<any> {
        return knex("Hotel")
            .select("Hotel.id")
            .innerJoin("Room", "Room.hotelId", "=", "Hotel.id")
            .where({ hotelId: id })
    }
}