import { Role } from '../Models/Role'
import { RoleRepository } from '../Repositories/Repository/Role';


const Repository = new RoleRepository();


export class RoleService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject("Not Found")
        }
        return Promise.resolve(rs)
    }

    public create = async (item: []) => {
        const rs = await Repository.create(item);
        if (rs == null) {
            return Promise.reject("Not Found")
        }
        return Promise.resolve("Sucsuess")
    }
    public update = async (id: string, item: []) => {
        const rs = await Repository.update(id, item);
        if (rs == null) {
            return Promise.reject({ messager: "Update Faild" })
        }
        return Promise.resolve({ messager: "Sucsess" })
    }
    public delete = async (id: string) => {
        const rs = await Repository.delete(id)
        if (rs == 0) {
            return Promise.reject("Not Found")
        }
        return Promise.resolve("Sucsuess")
    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        if (rs == false) {
            return Promise.reject("Not Found")
        }
        return Promise.resolve(rs)
    }
    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject("Not Found")
        }
        return Promise.resolve(rs)
    }


}
