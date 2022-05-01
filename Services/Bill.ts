
import { BillRepository } from '../Repositories/Repository/Bill';
import {ServiceOrdersRepository} from '../Repositories/Repository/ServiceOrders'
import {BookRoomRepository} from '../Repositories/Repository/BookRoom';
import {UsersRepository} from '../Repositories/Repository/Users';
import {RoomRepository} from '../Repositories/Repository/Room';
const Repository = new BillRepository();
const BookRoomRepo = new BookRoomRepository();
const ServiceOrdersRepo = new ServiceOrdersRepository();
const userRepo = new UsersRepository();
const roomRepo = new RoomRepository();


export class BillService {
    public findAll = async (hotelId: string) => {
        const rs = await Repository.findAllBillByHotelId(hotelId);
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }

    public getBookroomdAndPrice = async(item : any , hotelId: any) => { 
       try {
            const inforBookroom : any = await Repository.getTimeAndPrice(item, hotelId);
            if (Object.keys(inforBookroom).length == 0) {
                return Promise.reject({ messager: "Bookroom or Hotel not exists !" });
            }
            var fromDate : any = new Date(inforBookroom[0].fromDate);
            var toDate : any  = new Date(inforBookroom[0].toDate);
            var seconds = Math.floor((toDate - (fromDate))/1000);
            var minutes = Math.floor(seconds/60);
            var hours = Math.floor(minutes/60);
            var price = hours * inforBookroom[0].price ;
            inforBookroom[0].hours = hours;
            return {price, inforBookroom};
       } catch (error) {
            return Promise.reject({messager : "Error get inforBookRoom !!!"} );
       } 
    }

    public getTotalBill  = async (id: any, hotelId: any) => {
        try {
            const {price, inforBookroom} : any = await new BillService().getBookroomdAndPrice(id , hotelId);
            try {
                const totalService : any = await ServiceOrdersRepo.totalService(id); // sum total service        
                const inforUser : any = await userRepo.findOne(inforBookroom[0].userId); // Property '0' does not exist on type 'Boolean'
                const inforServiceOder = await   Repository.getInforserviceOrder(id)
                const totalBill = totalService[0].sum + price; // console.log(total[0].sum); // 0:RowDataPacket {sum: 40000}
                // item.total = totalBill;
                // update status room after printf bill
                    return Promise.resolve({
                    messager : "Sucsuess",
                    inforBookroom : inforBookroom[0] , 
                    inforServiceOder : inforServiceOder,
                    inforUser : inforUser[0].fullName,
                    totalBill : totalBill
                })
                
            } catch (error) {
                return Promise.reject({messager : "Show Faild !!!"});
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public create = async (item: any, hotelId: any) => {
        try {
            const {price, inforBookroom} : any = await new BillService().getBookroomdAndPrice(item.bookRoomId , hotelId);
            try {
                const totalService : any = await ServiceOrdersRepo.totalService(item.bookRoomId); // sum total service        
                const inforUser : any = await userRepo.findOne(inforBookroom[0].userId); // Property '0' does not exist on type 'Boolean'
                const inforServiceOder = await   Repository.getInforserviceOrder(item.bookRoomId)
                const totalBill = totalService[0].sum + price; // console.log(total[0].sum); // 0:RowDataPacket {sum: 40000}
                item.total = totalBill;
                const rs = await Repository.create(item);
                if(rs) {
                    const  payment : any = {paymentDate : new Date()} ;
                    await BookRoomRepo.update(inforBookroom[0].id, payment); // update payment room after printf bill
                    return Promise.resolve({
                    messager : "Sucsuess",
                    inforBookroom : inforBookroom[0] , 
                    inforServiceOder : inforServiceOder,
                    inforUser : inforUser[0].fullName,
                    totalBill : totalBill
                })
                }
            } catch (error) {
                return Promise.reject({messager : "Create Faild !!!"});
            }
        } catch (error) {
            return Promise.reject(error);
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

    public findOne = async (id: string , hotelId: string) => {
        try {
            const rs : any = await Repository.findOne(id);
            if (Object.keys(rs).length == 0) {
                return Promise.reject({ messager: " Bill not exists ! "  });
            }
            const {price, inforBookroom} : any = await new BillService().getBookroomdAndPrice(rs[0].bookRoomId, hotelId);
            const inforUser : any = await userRepo.findOne(inforBookroom[0].userId); // Property '0' does not exist on type 'Boolean'
            const inforServiceOder : any = await   Repository.getInforserviceOrder(rs[0].bookRoomId)
            if (rs) {
                return Promise.resolve({
                    inforBill : rs,
                    inforBookroom : inforBookroom , 
                    inforServiceOder : inforServiceOder,
                    inforUser : inforUser[0].fullName,
                })
            }
        } catch (error) {
            return Promise.reject({messager :"Not Found"} )
        }
    }


    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }



}