
import { BillRepository } from '../Repositories/Repository/Bill';
import {ServiceOrdersRepository} from '../Repositories/Repository/ServiceOrders'
import {BookRoomRepository} from '../Repositories/Repository/BookRoom';
const Repository = new BillRepository();
const BookRoomRepo = new BookRoomRepository();
const ServiceOrdersRepo = new ServiceOrdersRepository();

export class BillService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }

    public getHour = async(item : any) => { 

        const date : any = await BookRoomRepo.getHour(item); // 0:RowDataPacket {fromDate: Tue Apr 05 2022 10:01:12 GMT+0700 (Indochina Time), toDate: Tue Apr 05 2022 12:01:12 GMT+0700 (Indochina Time)}
        var fromDate : any = new Date(date[0].fromDate);
        var toDate : any  = new Date(date[0].toDate);
        var seconds = Math.floor((toDate - (fromDate))/1000);
        var minutes = Math.floor(seconds/60);
        // var hours = Math.floor(minutes/60);
        // console.log(hours);
        return minutes;

    }
    public create = async (item: any) => {
        // console.log(item);
        const total : any = await ServiceOrdersRepo.totalService(item.bookRoomId); // sum total service
        const minutes = await new BillService().getHour(item.bookRoomId);  // get formdate, todate
        console.log(minutes)
        // console.log(total[0].sum); // 0:RowDataPacket {sum: 40000}
        const rs = await Repository.create(item);
        if (rs == null) {
            return Promise.reject({messager : "Create Faild "})
        }
        return Promise.resolve({messager : "Sucsuess"})
    }
    public update = async (id: string, item: []) => {
        const rs = await Repository.update(id, item);
        if (rs) {
            return Promise.resolve({ messager: "Sucsess" })
           
        }
        return Promise.reject({ messager: "Update Faild" })
    }
    public delete = async (id: string) => {
        const rs = await Repository.delete(id)
        if (rs == 0) {
            return Promise.reject({ messager: "Delete Faild" })
        }
        return Promise.resolve({messager : "Sucsuess"})
    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        if (rs == false) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }
    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }



}