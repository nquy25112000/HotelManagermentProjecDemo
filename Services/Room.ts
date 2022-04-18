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
    public findAll = async (hotelId: string) => {
        const rs = await Repository.findAllWhereHotelId(hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "No data to display" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: []) => {
        await Repository.create(item);
        return Promise.resolve({ result: item })
    }

    public update = async (id: string, item: [], hotelId: string) => {
        const findOne = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObject = Object.keys(findOne).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Data Not Found" });
        }
        else {
            await Repository.update(id, item);
            return Promise.resolve({ messager: "Sucsuess" });
        }

    }
    public delete = async (id: string, hotelId: string) => {
        const findOne = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObjectFindOne = Object.keys(findOne).length;
        if (lengthObjectFindOne == 0) {
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

    public findOne = async (id: string, hotelId: string) => {
        const rs = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Data Not Found" });
        }
        return Promise.resolve({ result: rs });
    }


    public checkValidateRoomName = async (item: any, hotelid: string) => {
        const rs = await Repository.checkValidateRoomName(item, hotelid);
        if (Object.keys(rs).length == 0) {
            return Promise.resolve()
        }
        return Promise.reject({ messager: "Room name already exists" });
    }

    public checkValidInput = (name: string, roomtypeId: string) => {
        if (name.trim() == null || name.trim() == "" || name == undefined) {
            return Promise.reject({ message: "Please enter room Name" })
        }
        if (roomtypeId.trim() == null || roomtypeId.trim() == "" || roomtypeId == undefined) {
            return Promise.reject({ message: "Please select room type" })
        }
        return Promise.resolve();
    }



}
