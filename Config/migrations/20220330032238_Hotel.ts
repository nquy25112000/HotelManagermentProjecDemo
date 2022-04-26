import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('Hotel', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
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
        .createTable('RoomType', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.string('type', 255).notNullable();
            table.float('price').notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.specificType('hotelId', 'CHAR(36)').notNullable();
            table.foreign('hotelId').references('id').inTable('Hotel').onUpdate("CASCADE");
        })
        .createTable('Room', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable();
            table.boolean('status').notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.specificType('hotelId', 'CHAR(36)').notNullable();
            table.foreign('hotelId').references('id').inTable('Hotel').onUpdate("CASCADE");

            table.specificType('roomTypeId', 'CHAR(36)').notNullable();
            table.foreign('roomTypeId').references('id').inTable('RoomType').onUpdate("CASCADE");
        })
        .createTable('Services', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable();
            table.float('price', 100).notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            table.specificType('hotelId', 'CHAR(36)').notNullable();
            table.foreign('hotelId').references('id').inTable('Hotel').onUpdate("CASCADE");
        })
        .createTable('Role', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.string('name', 255).notNullable().unique();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        })
        .createTable('Users', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
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
            table.foreign('hotelId').references('id').inTable('Hotel').onUpdate("CASCADE");

            table.specificType('roleId', 'CHAR(36)').notNullable();
            table.foreign('roleId').references('id').inTable('Role').onUpdate("CASCADE");
        })
        .createTable('BookRoom', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
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
            table.foreign('roomId').references('id').inTable('Room').onUpdate("CASCADE");

            table.specificType('userId', 'CHAR(36)').notNullable();
            table.foreign('userId').references('id').inTable('Users').onUpdate("CASCADE");
        })
        .createTable('ServiceOrders', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.float('number', 100).notNullable();
            table.float('total', 100).notNullable();

            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            table.specificType('bookRoomId', 'CHAR(36)').notNullable();
            table.foreign('bookRoomId').references('id').inTable('BookRoom').onUpdate("CASCADE");

            table.specificType('serviceId', 'CHAR(36)').notNullable();
            table.foreign('serviceId').references('id').inTable('Services').onUpdate("CASCADE");
        })
        .createTable('Bill', function (table) {
            table.specificType('id', 'CHAR(36)').notNullable().primary();
            table.float('total', 100).notNullable();
            table.timestamp('createdAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
            table
                .timestamp('updatedAt')
                .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            table.specificType('bookRoomId', 'CHAR(36)').notNullable();
            table.foreign('bookRoomId').references('id').inTable('BookRoom').onUpdate("CASCADE").onDelete("CASCADE");
        })
        .then(async () => {
            const id = uuidv4();
            await knex("Role")
                .insert([
                    { id: id, name: "Root" }
                ])
                .insert([
                    { id: id, name: "Admin" }
                ])
                .insert([
                    { id: id, name: "User" }
                ])


            await knex.schema
                .raw(`INSERT INTO Users(id, username, password, roleId) VALUES ('${id}','a', 'b' , (SELECT id FROM Role where name = 'Root'))`)
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

