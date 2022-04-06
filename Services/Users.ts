import { UsersRepository } from '../Repositories/Repository/Users';


const Repository = new UsersRepository();


export class UsersService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        return rs;
    }

    public create = async (item: []) => {
        const rs = await Repository.create(item);
        return rs;
    }
    public update = async (id: string, item: []) => {
        const rs = await Repository.update(id, item);
        return rs;
    }
    public delete = async (id: string) => {
        const rs = await Repository.delete(id);
        return rs;
    }
    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        return rs;
    }
    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        return rs;
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