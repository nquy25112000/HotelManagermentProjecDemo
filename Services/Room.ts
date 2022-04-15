import { AnyARecord } from 'dns';
import { BookRoomRepository } from '../Repositories/Repository/BookRoom';
import { HotelRepository } from '../Repositories/Repository/Hotel';
import { RoleRepository } from '../Repositories/Repository/Role';
import { RoomRepository } from '../Repositories/Repository/Room';

const Repository = new RoomRepository();
const hotelRepository = new HotelRepository();
const roleRepository = new RoleRepository();
const bookRoomRepository = new BookRoomRepository();


export class RoomService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: []) => {
        await Repository.create(item);
        return Promise.resolve({ messager: "Sucsuess" })
    }

    public update = async (id: string, item: []) => {
        const findOne = await Repository.findOne(id);
        const lengthObject = Object.keys(findOne).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Data Not Found" });
        }
        else {
            await Repository.update(id, item);
            return Promise.resolve({ messager: "Sucsuess" });
        }

    }
    public delete = async (id: string) => {
        const findOne = await Repository.findOne(id)
        if (findOne == false) {
            return Promise.reject({ messager: "Room Data Not Found" });
        }
        else {
            const findRoomId = await bookRoomRepository.findRoomId(id);
            const lengthObject = Object.keys(findRoomId).length
            if (lengthObject > 0) {
                return Promise.reject({ messager: "This room contains some booking data, Please clear the reservation data before deleting the Room" })
            }
            await Repository.delete(id);
            return Promise.resolve({ messager: "Sucsuess" });
        }

    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Data Not Found" });
        }
        return Promise.resolve({ result: rs });
    }

    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Data Not Found" });
        }
        return Promise.resolve({ result: rs });
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
            return Promise.reject({ messager: "Please enter an amount greater than 0" })
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
    public checkValidInput = (name: string, type: any, price: any, status: any, hotelId: any) => {
        if (name.trim() == null || name.trim() == "" || name == undefined) {
            return Promise.reject({ message: "Please enter room Name" })
        }
        if (type.trim() == null || type.trim() == "") {
            return Promise.reject({ message: "Please enter Room Type" })
        }
        if (price.trim() == null || price.trim() == "") {
            return Promise.reject({ message: "Please enter price" })
        }
        if (isNaN(price)) {
            return Promise.reject({ message: "Please enter a series of numbers in Price" })
        }

        if (hotelId.trim() == null || hotelId.trim() == "") {
            return Promise.reject({ message: "Please select a Hotel" })
        }

        return Promise.resolve();
    }

}
