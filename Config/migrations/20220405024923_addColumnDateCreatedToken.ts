import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw(`alter table Token add dateCreated datetime`);

}


export async function down(knex: Knex): Promise<void> {
}

