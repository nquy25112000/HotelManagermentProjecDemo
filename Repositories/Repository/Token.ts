import { Connect } from '../../Config/connect'


const knex = new Connect().knex;

export class TokenRepository {
    create(item: any): Promise<boolean> {
        return knex("Token")
            .insert(item)
    }

    findOne(token: string): Promise<any> {
        return knex("Token")
            .select()
            .where({ tokenCode: token })
    }

    findJoin(token: string): Promise<any> {
        return knex.table('Role')
            .select("Role.name")
            .innerJoin("Users", "Users.roleId", "=", "Role.uuid")
            .innerJoin("Token", "Token.userId", "=", "Users.uuid")
            .where("Token.tokenCode", "=", token)



        // .andWhere("Users.roleId", "=", "Role.uuid")

        // .andWhere()
    }
}