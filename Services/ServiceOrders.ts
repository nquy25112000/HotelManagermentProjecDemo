import { ServiceOrdersRepository } from '../Repositories/Repository/ServiceOrders';
import { ServiceRepository } from '../Repositories/Repository/Service';
import {BillRepository} from '../Repositories/Repository/Bill';
import {BookRoomRepository} from '../Repositories/Repository/BookRoom';
import { v4 as uuidv4 } from 'uuid';

const Repository = new ServiceOrdersRepository();
const serviceRepo  = new ServiceRepository();
const BillRepo = new BillRepository();
const BookroomRepo = new BookRoomRepository();


export class ServiceOrdersService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public checkvalidateBookRoom  = async (bookRoomId : string) => {
        if(typeof bookRoomId === "undefined"){
            return Promise.reject({ messager: "BookRoom undefined !" })
        }
        const rs = await BookroomRepo.findOne(bookRoomId);
        
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "BookRoom Invalid !" })
        }
        else {
            return Promise.resolve( rs );
        }
    }

    public checkvalidateServiceOrder  = async (serviceOrderId : any) => {
        const rs = await Repository.findOne(serviceOrderId);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "BookRoom Invalid !" })
        }
        else {
            return Promise.resolve( rs );
        }

    }

    public checkvalidateNumberService  = async (number : any) => {
        if(typeof number === "undefined"){
            return Promise.reject({ messager: "Number undefined !" })
        }
        if (number < 1 || typeof number === "string") {
            return Promise.reject({ messager: "Number Invalid !" })
        }
        else {
            return Promise.resolve( number );
        }
    }

    public checkvalidateServive  = async (serviceId : string) => {
        if(typeof serviceId === "undefined"){
            return Promise.reject({ messager: "ServiceId undefined !" })
        }
        const rs = await serviceRepo.findOne(serviceId);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "Service Invalid !" })
        }
        else {
            return Promise.resolve( rs );
        }
    }

    public create = async (item: any) => {
        try {
            var object: any = [];
            const bookRoom = await new ServiceOrdersService().checkvalidateBookRoom(item.bookRoomId);
            for (let i = 0; i < item.order.length; i++) {
                const service : any = await new ServiceOrdersService().checkvalidateServive(item.order[i].serviceId);
                const number = await new ServiceOrdersService().checkvalidateNumberService(item.order[i].number)
                const total = service[0].price * number;
                item.order[i].total = total;
                item.order[i].bookRoomId = item.bookRoomId;
                item.order[i].uuid = uuidv4();
                object.push(item.order[i]);
            }
            try {
                const rs = await Repository.create(object);
                if (rs) {
                    return Promise.resolve({ messager: "Sucsuess" })     
                }
            } catch (error) {
                return Promise.reject({ messager: "Create Faild " })
           }
        } catch (error) {
            return Promise.reject(error)
        }
    }


    public update = async (id: string, item: any) => {
        try {
            const bookRoom = await new ServiceOrdersService().checkvalidateBookRoom(item.bookRoomId); 
            const service : any = await new ServiceOrdersService().checkvalidateServive(item.serviceId);
            const number = await new ServiceOrdersService().checkvalidateNumberService(item.number)
            const total = service[0].price * number;
            item.total = total;
            const rs = await Repository.update(id, item);
            try {
                if (rs) {
                    return Promise.resolve({ messager: "Sucsess" });
                }
                else{
                    return Promise.reject({ messager: " ServiceOrders Id invalid ! " })
                }
            } catch (error) {
                return Promise.reject({ messager: "Update Faild" })
            }
        } catch (error) {
            return Promise.reject(error)
        }
       
    }

    public delete = async (id: string) => {
        const rs = await Repository.delete(id)
        if (rs == 0) {
            return Promise.reject({ messager: "Delete Faild" })
        }
        return Promise.resolve({ messager: "Sucsuess" })
    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        if (rs == false) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public findServiceByBookroom = async (id: string) => { // tim bookromid do dat cac service nao 
        const rs = await BillRepo.getInforserviceOrder(id);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "BookRoom Invalid !" })
        }
        else {
            return Promise.resolve( { result: rs } );
        }
        
    }


    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }



}
