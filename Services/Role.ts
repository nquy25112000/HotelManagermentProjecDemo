import { Role } from '../Models/Role'
import { RoleRepository } from '../Repositories/Repository/Role';


const Repository = new RoleRepository();


export class RoleService {
    public findAll = async () => {
        const rs = await Repository.findAllRole();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: []) => {
        const rs = await Repository.create(item);
        if (rs == null) {
            return Promise.reject({ messager: "Create Faild " })
        }
        return Promise.resolve({ result: item })
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
