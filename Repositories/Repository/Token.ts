import { Connect } from '../../Config/connect'


const knex = new Connect().knex;

export class TokenRepository {
    create(item: any): Promise<boolean> {
        return knex("Token")
            .insert(item)
    }

    findHoteIdlWhereToken(token: any): Promise<any> {
        return knex.table('Hotel')
            .select("Hotel.id")
            .innerJoin("Users", "Users.hotelId", "=", "Hotel.id")
            .innerJoin("Token", "Token.userId", "=", "Users.id")
            .where("Token.tokenCode", "=", `${token}`)
    }
    findToKenCode(token: string): Promise<any> {
        return knex("Token")
            .select()
            .where({ tokenCode: token })
    }

    findJoin(token: string): Promise<any> {
        return knex.table('Role')
            .select("Role.name")
            .innerJoin("Users", "Users.roleId", "=", "Role.id")
            .innerJoin("Token", "Token.userId", "=", "Users.id")
            .where({ tokenCode: token })
    }
    updateWhereToken(token: string, time: any): Promise<any> {
        return knex.table("Token")
            .update({ timeExpire: time })
            .where({ tokenCode: token })
    }
}