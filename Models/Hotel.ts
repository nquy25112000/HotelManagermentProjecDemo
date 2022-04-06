import { Connect } from '../Config/connect'
import Bookshelf from 'bookshelf';
import { Users } from './Users';
import { Room } from './Room';
import { Service } from './Service';




const knex = new Connect().knex;
const bookshelf = Bookshelf(knex)

export class Hotel extends bookshelf.Model<Hotel> {
    get tableName() { return 'Hotel'; }

    users(): Bookshelf.Collection<Users> {
        return this.hasMany(Users, 'hotelId');
    }
    room(): Bookshelf.Collection<Room> {
        return this.hasMany(Room, 'holtelId');
    }
    service(): Bookshelf.Collection<Service> {
        return this.hasMany(Service, 'holtelId');
    }
}