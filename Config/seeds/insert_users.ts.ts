import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {

    const id = uuidv4();
    await knex("Role").insert([
        { uuid: id, name: "Root" }
    ])

    await knex.schema.raw(`INSERT INTO Users(uuid, username, password, roleId) VALUES ('${id}','1312312a', 'b' , (SELECT uuid FROM Role where name = 'Root'))`);


};

