
import { ServiceRepository } from '../Repositories/Repository/Service';
import { HotelRepository } from '../Repositories/Repository/Hotel';

const Repository = new ServiceRepository();
const HotelRepo = new HotelRepository();
export class ServicesService {

    public checkvalidateService = async (item: any) => {
        if (typeof item.name === "undefined" || !item.name) {
            return Promise.reject({ messager: "Name Invalid !" });
        }
        const name = await Repository.checkNameService(item.name);
        if (Object.keys(name).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
        }
        if (typeof item.price === "string" || typeof item.price === "undefined" || !item.price || item.price < 1) {
            return Promise.reject({ messager: "Price Invalid !" });
        }
        const hotel = await HotelRepo.findOne(item.hotelId);
        if (hotel == false) {
            return Promise.reject({ messager: "Hotel not exists !" });
        }

    }

    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: any) => {
        try {
            const checkservice = await new ServicesService().checkvalidateService(item);
            try {
                const rs = await Repository.create(item);
                if (rs) {
                    return Promise.resolve({ messager: "Sucsuess" });
                }
            } catch (error) {
                return Promise.reject({ messager: "Create Faild " });
            }
        } catch (error) {
            return Promise.resolve(error);
        }
    }
    public update = async (id: string, item: []) => {
        try {
            const checkservice = await new ServicesService().checkvalidateService(item)
            try {
                const rs = await Repository.update(id, item);
                if (rs) {
                    return Promise.resolve({ messager: "Sucsess" })
                }
                else {
                    return Promise.reject({ messager: "Service Id not exists !" });
                }
            } catch (error) {
                return Promise.reject({ messager: "Update Faild" })
            }
        } catch (error) {
            return Promise.reject(error);
        }

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
