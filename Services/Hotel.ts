import { HotelRepository } from '../Repositories/Repository/Hotel';


const Repository = new HotelRepository();


export class HotelService {
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



}
