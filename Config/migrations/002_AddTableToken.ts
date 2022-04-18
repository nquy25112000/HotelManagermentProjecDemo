import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('Token', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.string('tokenCode', 255).notNullable();
            table.dateTime('timeExpire').notNullable();
            table.specificType('userId', 'CHAR(36)').notNullable();
            table.foreign('userId').references('id').inTable('Users').onUpdate("CASCADE");
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

        })
}


export async function down(knex: Knex): Promise<void> {
}

