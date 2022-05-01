
import { ServiceOrders } from '../../Models/ServiceOrders'
import { KnexRepository } from '../KnexRepository';
import { Connect } from '../../Config/connect';


const knex = new Connect().knex;

const serviceOrders = new ServiceOrders();

export class ServiceOrdersRepository extends KnexRepository<ServiceOrders> {
    constructor() {
        super(serviceOrders.tableName);
    }
    totalService(id : string ): Promise<ServiceOrders[]> {
        return knex(this.tableName)
                .where('bookRoomId', '=', id)
                .sum('total  as sum')
                ;
    }

    checkBookroomByHotelId(id : string , hotelId : string): Promise<ServiceOrders[]> {
        return knex.select()
        .from('Room')
        .innerJoin('BookRoom', function() { this.on('BookRoom.id ', knex.raw('?', [id ]))  
                                    .andOn('BookRoom.roomId', '=', ' Room.id')
                                    .andOn('Room.hotelId', knex.raw('?', [hotelId]))})   
    }

    findAllServiceOrderbyHotelId( hotelId : string): Promise<ServiceOrders[]> {
        return knex.select('ServiceOrders.id','ServiceOrders.number', 'ServiceOrders.total', 'ServiceOrders.bookRoomId ', 'ServiceOrders.serviceId ' , 'ServiceOrders.createdAt', 'ServiceOrders.updatedAt' )
        .from('ServiceOrders')
        .innerJoin('Services', function() { this.on('Services.hotelId  ', knex.raw('?', [hotelId ]))  
                                    .andOn('ServiceOrders.serviceId ', '=', ' Services.id')})   
    }

    checkServiceOrderIdByHotelId(id : string , hotelId : string): Promise<ServiceOrders[]> {
        return knex.select()
        .from('ServiceOrders')
        .innerJoin('Services', function() { this.on('ServiceOrders.id ', knex.raw('?', [id ]))  
                                    .andOn('ServiceOrders.serviceId', '=', ' Services.id')
                                    .andOn('Services.hotelId', knex.raw('?', [hotelId]))})   
    }
}