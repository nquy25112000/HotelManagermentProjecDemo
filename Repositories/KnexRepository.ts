import { RepositoryGeneral } from './RepositoryGeneral'
import { Connect } from '../Config/connect'


const knex = new Connect().knex;

export abstract class KnexRepository<T> implements RepositoryGeneral<T> {
    constructor(
        public tableName: string
    ) { this.tableName = tableName; }

    delete(id: string): Promise<any> {
        return knex(this.tableName)
            .where('uuid', id)
            .del()
    }

    findAll(): Promise<T[]> {
        return knex(this.tableName)
            .select()
    }

    create(item: T[]): Promise<T[]> {
        return knex(this.tableName)
            .insert(item)
    }
    update(id: string, item: T[]): Promise<T[]> {
        return knex(this.tableName)
            .where('id', '=', id)
            .update(item)
    }
    findOne(id: string): Promise<boolean> {
        return knex(this.tableName)
            .where({
                uuid: id
            })
            .select()
    }
    findItem(item: T[]): Promise<T[]> {
        return knex(this.tableName)
            .where(item)
            .select()
    }
}