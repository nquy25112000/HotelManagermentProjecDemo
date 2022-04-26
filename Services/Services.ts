
import { ServiceRepository } from '../Repositories/Repository/Service';
import { HotelRepository } from '../Repositories/Repository/Hotel';

const Repository = new ServiceRepository();
const HotelRepo = new HotelRepository();
export class ServicesService {

    public checkvalidateService = async (item: any) => {
        if (typeof item.name === "undefined" || !item.name) {
            return Promise.reject({ messager: "Name Invalid !" });
        }
        if (typeof item.price === "undefined" || !item.price || item.price < 1) {
            return Promise.reject({ messager: "Price Invalid !" });
        }
        if (typeof item.hotelId === "undefined") {
            return Promise.reject({ messager: "Hotel undefined !" });
        }
        const hotel = await HotelRepo.findOne(item.hotelId);
        if (hotel == false) {
            return Promise.reject({ messager: "Hotel not exists !" });
        }
    }

    public checkvalidateNameServiceCreate = async (name: string, hotelId: string) => {
        const nameService = await Repository.checkNameServiceCreate(name, hotelId);
        if (Object.keys(nameService).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
        }

    }

    public checkvalidateNameServiceUpdate = async (id: string, name: string, hotelId: string) => {
        const nameService = await Repository.checkNameServiceUpdate(id, name, hotelId);
        if (Object.keys(nameService).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
        }
    }

    public findAll = async (hotelId: string) => {
        const rs = await Repository.findAllWhereHotelId(hotelId);
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: any) => {

        try {
            const validService = await new ServicesService().checkvalidateService(item);
            await new ServicesService().checkvalidateNameServiceCreate(item.name, item.hotelId); // tim xem service cos trong HotelId do chua
            try {
                const rs = await Repository.create(item);
                if (rs) {
                    const service = await Repository.findOne(item.id);
                    return Promise.resolve({
                        messager: "Sucsuess",
                        inforService: service
                    });
                }

            } catch (error) {
                return Promise.reject({ messager: "Create Faild " });
            }
        } catch (error) {
            return Promise.reject(error);
        }

    }
    public update = async (id: string, item: any) => {
        try {
            const validService = await new ServicesService().checkvalidateService(item);
            await new ServicesService().checkvalidateNameServiceUpdate(id, item.name, item.hotelId);
            try {
                const rs = await Repository.update(id, item);
                if (rs) {

                    const service: any = await Repository.findOne(id);
                    return Promise.resolve({
                        messager: "Sucsess",
                        inforService: service[0]
                    })

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
    public delete = async (id: string, HotelId: string) => {
        try {
            const rs = await Repository.delete(id)
            const inforService = await Repository.findAllWhereHotelId(HotelId);;
            if (rs == 0) {
                return Promise.reject({ messager: "Delete Faild" })
            }
            return Promise.resolve({
                messager: "Sucsuess",
                inforService: inforService
            })
        } catch (error) {
            return Promise.reject(error);
        }
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
