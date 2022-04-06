import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('Hotel', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable();
            table.string('adress', 255).notNullable();
            table.string('phone', 255).notNullable();
            table.string('email', 255).notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
        .createTable('Room', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable();
            table.string('type', 255).notNullable();
            table.float('price').notNullable();
            table.boolean('status').notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.specificType('hotelId', 'CHAR(36)').notNullable();
            table.foreign('hotelId').references('uuid').inTable('Hotel');
        })
        .createTable('Services', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable();
            table.float('price').notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.specificType('hotelId', 'CHAR(36)').notNullable();
            table.foreign('hotelId').references('uuid').inTable('Hotel');
        })
        .createTable('Role', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable().unique();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
        .createTable('Users', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.string('username', 255).notNullable();
            table.string('password', 255).notNullable();
            table.string('fullName', 255).notNullable();
            table.date('birtDate').notNullable();
            table.string('adress', 255).notNullable();
            table.string('phone', 255).notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.specificType('hotelId', 'CHAR(36)');
            table.foreign('hotelId').references('uuid').inTable('Hotel');

            table.specificType('roleId', 'CHAR(36)').notNullable();
            table.foreign('roleId').references('uuid').inTable('Role');
        })
        .createTable('BookRoom', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.string('customerName', 255).notNullable();
            table.integer('customerIdCard', 11).notNullable();
            table.datetime('fromDate').notNullable();
            table.datetime('toDate').notNullable()
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            table.specificType('roomId', 'CHAR(36)').notNullable();
            table.foreign('roomId').references('uuid').inTable('Room');

            table.specificType('userId', 'CHAR(36)').notNullable();
            table.foreign('userId').references('uuid').inTable('Users');
        })
        .createTable('ServiceOrders', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();
            table.float('number', 100).notNullable();
            table.float('total', 100).notNullable();

            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            table.specificType('bookRoomId', 'CHAR(36)').notNullable();
            table.foreign('bookRoomId').references('uuid').inTable('BookRoom');

            table.specificType('serviceId', 'CHAR(36)').notNullable();
            table.foreign('serviceId').references('uuid').inTable('Services');
        })
        .createTable('Bill', function (table) {
            table.specificType('uuid', 'CHAR(36)').notNullable().primary();;
            table.float('total', 100).notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            table.specificType('bookRoomId', 'CHAR(36)').notNullable();
            table.foreign('bookRoomId').references('uuid').inTable('BookRoom');
        })


}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("Bill")
        .dropTable("ServiceOrders")
        .dropTable("BookRoom")
        .dropTable("Users")
        .dropTable("Room")
        .dropTable("Services")
        .dropTable("Hotel")
        .dropTable("Role")


}

