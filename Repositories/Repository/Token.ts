import { Connect } from '../../Config/connect'


const knex = new Connect().knex;

export class TokenRepository {
    create(item: any): Promise<boolean> {
        return knex("Token")
            .insert(item)
    }

    findHotelWhereToken(token: any): Promise<any> {
        return knex.table('Hotel')
            .select()
            .innerJoin("Users", "Users.hotelId", "=", "Hotel.id")
            .innerJoin("Token", "Token.userId", "=", "Users.id")
            .where("Token.tokenCode", "=", `${token}`)
    }

    findToKenCode(token: string): Promise<any> {
        return knex("Token")
            .select()
            .where({ tokenCode: token })
    }
    findUserIdWhereToken(token: any): Promise<any> {
        return knex.table('Users')
            .select("Users.id")
            .innerJoin("Token", "Token.userId", "=", "Users.id")
            .where("Token.tokenCode", "=", `${token}`)
    }

    findRole(token: string): Promise<any> {
        return knex.table('Role')
            .select("Role.name")
            .innerJoin("Users", "Users.roleId", "=", "Role.id")
            .innerJoin("Token", "Token.userId", "=", "Users.id")
            .where({ tokenCode: token })
    }
    updateTimeExpire(token: string, time: any): Promise<any> {
        return knex.table("Token")
            .update({ timeExpire: time })
            .where({ tokenCode: token })
    }
}