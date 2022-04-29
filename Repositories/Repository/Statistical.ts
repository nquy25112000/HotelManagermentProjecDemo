
import { KnexRepository } from '../KnexRepository'
import { Connect } from '../../Config/connect'


const knex = new Connect().knex;


export class StaticticalRepository {
    // constructor() {
    //     super(aa);
    
    // getTimeAndPrice (id : string):  Promise<any[]>{
    //     const tableBookRoom : any = bookRoom.tableName;
    //     const tableRoom : any = room.tableName;
    //     return knex.select('BookRoom.id' ,'BookRoom.customerName','BookRoom.customersIdCard', 'BookRoom.fromDate', 'BookRoom.toDate','BookRoom.userId' ,'Room.name' ,'Room.type','Room.price')
    //             .from('BookRoom').join('Room', function() {
    //             this.on('BookRoom.roomId', '=', ' Room.id').andOn('BookRoom.id', knex.raw('?', [id ]) )})    
    // }

    findServiceStatisticalMost (month : string ,year : string , hotelid : string):  Promise<any[]>{
        return knex.select('ServiceOrders.serviceId','Services.name')
					.count('serviceId as number')
                .from('ServiceOrders')
                .innerJoin('Services', function() { this.on('ServiceOrders.serviceId', '=', 'Services.id')})    
                .innerJoin('BookRoom', function() { this.on('ServiceOrders.bookRoomId ', '=', ' BookRoom.id')
                    // knex.raw(`AND MONTH(ServiceOrders.createdAt) = ${month}`)
					.andOn('MONTH(ServiceOrders.createdAt)', knex.raw('?', [month ]) )
					.andOn('YEAR(ServiceOrders.createdAt)', knex.raw('?', [year ]) )})   
				.innerJoin('Room', function() { this.on('BookRoom.roomId', '=', 'Room.id')
					.andOn('Room.hotelId ', knex.raw('?', [hotelid ]) )})
				.groupBy('ServiceOrders.serviceId ')
				.orderBy('number', 'desc')
                .limit(10)
    } 
    }
