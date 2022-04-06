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
}