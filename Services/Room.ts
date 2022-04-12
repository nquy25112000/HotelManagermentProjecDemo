import { RoomRepository } from '../Repositories/Repository/Room';


const Repository = new RoomRepository();


export class RoomService {
    public findAll = async () => {
        const rs = await Repository.findAll();
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

    public checkValidateRoomName = async (item: any) => {
        const rs = await Repository.checkValidateRoomName(item);
        if (Object.keys(rs).length == 0) {
            return Promise.resolve()
        }
        return Promise.reject({ messager: "Room name already exists" });
    }

    public checkPriceValidate = (price: number) => {
        if (price < 0) {
            return Promise.reject({ messager: "Please enter a valid amount" })
        }
        else {
            return Promise.resolve();
        }
    }
    public checkHotelId = async (hotelId: string) => {
        if (hotelId === undefined) {
            return Promise.reject({ messager: "Please choose a hotel" });
        }
        const rs = await Repository.checkHotelId(hotelId)
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "Hotel does not exist" });
        }
        return Promise.resolve();
    }

}
