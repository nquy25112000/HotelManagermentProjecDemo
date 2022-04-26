
import { BookRoomRepository } from '../Repositories/Repository/BookRoom';
import { RoomRepository } from '../Repositories/Repository/Room';
import { RoomTypeRepository } from '../Repositories/Repository/RoomType';
import { v4 as uuidv4 } from 'uuid';

const Repository = new RoomRepository();
const bookRoomRepository = new BookRoomRepository();
const roomTypeRepository = new RoomTypeRepository();


export class RoomService {
    public findAll = async (hotelId: string) => {
        const rs = await Repository.findAllWhereHotelId(hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "No data to display" })
        }
        return Promise.resolve({ result: rs });
    }

    public create = async (item: any, hotelId: any) => {
        item.hotelId = hotelId;
        item.id = uuidv4();
        item.status = 0;
        await this.checkValidInput(item.name, item.roomTypeId);
        await this.checkValidateRoomNameToCreate(item.name, hotelId);
        await this.checkValidRoomTypeId(item.roomTypeId, hotelId);
        await Repository.create(item);
        return Promise.resolve({ result: item });
    }

    public update = async (id: string, item: any, hotelId: string) => {
        item.id = id;
        await this.checkValidInput(item.name, item.roomTypeId);
        await this.checkValidateRoomNameToUpdate(item.name, hotelId, id);
        await this.checkValidRoomTypeId(item.roomTypeId, hotelId);
        await Repository.update(id, item);
        return Promise.resolve({ result: item });
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
            const rs = await Repository.findAllWhereHotelId(hotelId);
            return Promise.resolve({ result: rs });
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



    public checkValidateRoomNameToCreate = async (item: any, hotelid: string) => {
        const rs = await Repository.checkValidateRoomName(item, hotelid);
        if (Object.keys(rs).length == 0) {
            return Promise.resolve()
        }
        return Promise.reject({ messager: "Room name already exists" });
    }

    public checkValidateRoomNameToUpdate = async (item: any, hotelid: string, id: string) => {
        const rs = await Repository.checkValidateRoomNameOtherId(item, hotelid, id);
        if (Object.keys(rs).length == 0) {
            return Promise.resolve();
        }
        return Promise.reject({ messager: "Room name already exists" });
    }

    public checkValidRoomTypeId = async (id: string, hotelId: string) => {
        const rs = await roomTypeRepository.findOneWhereHotelId(id, hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Type Data already exists" });
        }
        return Promise.resolve();
    }

    public checkValidInput = (name: string, roomtypeId: string) => {
        if (name.trim() == null || name.trim() == "" || name == undefined) {
            return Promise.reject({ message: "Please enter room Name" });
        }
        if (roomtypeId.trim() == null || roomtypeId.trim() == "" || roomtypeId == undefined) {
            return Promise.reject({ message: "Please select room type" });
        }
        return Promise.resolve();
    }
}
