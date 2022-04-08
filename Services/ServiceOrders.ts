import { ServiceOrdersRepository } from '../Repositories/Repository/ServiceOrders';
import { ServiceRepository } from '../Repositories/Repository/Service';
import { v4 as uuidv4 } from 'uuid';

const Repository = new ServiceOrdersRepository();
const serviceRepo  = new ServiceRepository();


export class ServiceOrdersService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: any) => {
        var object: any = [];
        for (let i = 0; i < item.order.length; i++) {
            const serviceid = item.order[i].serviceId; // get id service
            const service : any = await serviceRepo.findOne(serviceid); // get price   console.log(service[0].price)
            const total = service[0].price * item.order[i].number;
            item.order[i].total = total;
            item.order[i].uuid = uuidv4();
            object.push(item.order[i])
        }
        console.log(object);
        const rs = await Repository.create(object);
        if (rs == null) {
            return Promise.reject({ messager: "Create Faild " })
        }
        return Promise.resolve({ messager: "Sucsuess" })
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
        return Promise.resolve({ messager: "Sucsuess" })
    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        if (rs == false) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }



}
