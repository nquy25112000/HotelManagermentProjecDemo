import { UsersRepository } from '../Repositories/Repository/Users';


const Repository = new UsersRepository();


export class UsersService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }

    public create = async (item: []) => {
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


    public selectAcount = async (user: string, pass: string) => {
        const rs = await Repository.selectAcount(user, pass);
        return rs;
    }

    public selectName = async (user: string) => {
        const rs = await Repository.selectName(user);
        return rs;
    }
    public selectPass = async (pass: string) => {
        const rs = await Repository.selectPass(pass);
        return rs;
    }
}