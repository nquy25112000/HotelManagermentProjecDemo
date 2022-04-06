import { ServiceOrdersRepository } from '../Repositories/Repository/ServiceOrders';
import { v4 as uuidv4 } from 'uuid';

const Repository = new ServiceOrdersRepository();


export class ServiceOrdersService  {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }

    public create = async (item: any) => {
        var object : any = [];
        for (let i = 0 ; i < item.order.length ; i ++ ){
            item.order[i].id = uuidv4();
            object.push(item.order[i])
        }
        // item.id = uuidv4();
        // const item : any   = [{id : 4 ,bookRoomId: "f7c2f505-4fe4-4638-9080-d796844703b8",serviceId	: "1ba4e639-4bb9-47f2-8ca7-718da582c48f", number :  2},{id : 3 ,bookRoomId: "f7c2f505-4fe4-4638-9080-d796844703b8",serviceId	: "1ba4e639-4bb9-47f2-8ca7-718da582c48f", number :  4}] ;
        const rs = await Repository.create(object);
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
