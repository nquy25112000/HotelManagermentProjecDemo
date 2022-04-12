
import { BillRepository } from '../Repositories/Repository/Bill';
import {ServiceOrdersRepository} from '../Repositories/Repository/ServiceOrders'
import {BookRoomRepository} from '../Repositories/Repository/BookRoom';
import {UsersRepository} from '../Repositories/Repository/Users';
const Repository = new BillRepository();
const BookRoomRepo = new BookRoomRepository();
const ServiceOrdersRepo = new ServiceOrdersRepository();
const userRepo = new UsersRepository();


export class BillService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }

    public getBookroomdAndPrice = async(item : any) => { 
       try {
            const inforBookroom : any = await Repository.getTimeAndPrice(item);
            var fromDate : any = new Date(inforBookroom[0].fromDate);
            var toDate : any  = new Date(inforBookroom[0].toDate);
            var seconds = Math.floor((toDate - (fromDate))/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var price = hours * inforBookroom[0].price ;
            inforBookroom[0].hours = hours;
            return {price, inforBookroom};
       } catch (error) {
            return error;
       } 
    }
    public create = async (item: any) => {
        try {
            const totalService : any = await ServiceOrdersRepo.totalService(item.bookRoomId); // sum total service
            const {price, inforBookroom} : any = await new BillService().getBookroomdAndPrice(item.bookRoomId);
            const inforUser : any = await userRepo.findOne(inforBookroom[0].userId); // Property '0' does not exist on type 'Boolean'
            const inforServiceOder = await   Repository.getInforserviceOrder(item.bookRoomId)
            const totalBill = totalService[0].sum + price; // console.log(total[0].sum); // 0:RowDataPacket {sum: 40000}
            item.total = totalBill;
            const rs = await Repository.create(item);
            if(rs) {
                return Promise.resolve({
                messager : "Sucsuess",
                inforBookroom : inforBookroom , 
                inforServiceOder : inforServiceOder,
                inforUser : inforUser[0].fullName,
                totalBill : totalBill
            })
            }
        } catch (error) {
            return Promise.reject({messager : "Create Faild "})
        }
        
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