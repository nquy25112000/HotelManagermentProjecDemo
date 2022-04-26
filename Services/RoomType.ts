
import { RoomTypeRepository } from '../Repositories/Repository/RoomType';
import { v4 as uuidv4 } from 'uuid';


const Repository = new RoomTypeRepository();



export class RoomTypeService {
    public findAll = async (hotelId: any) => {
        const rs = await Repository.findAllWhereHotelId(hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "No data to display" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: any, hotelId: any) => {
        item.hotelId = hotelId;
        item.id = uuidv4();
        await this.checkValidInput(item.type, item.price)
        await this.checkValidateRoomTypeName(item.type, hotelId);
        await Repository.create(item);
        return Promise.resolve({ result: item })
    }

    public update = async (id: string, item: any, hotelId: string) => {
        item.id = id;
        await this.checkValidInput(item.type, item.price);
        await this.findOne(id, hotelId);
        await this.checkValidateRoomTypeNameOtherId(item.type, hotelId, id);
        await Repository.update(id, item);
        return Promise.resolve({ result: item });

    }
    public delete = async (id: string, hotelId: string) => {
        const findOne = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObject = Object.keys(findOne).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Room Type Data Not Found" });
        }
        else {
            const findRoomId = await Repository.findRoomId(id);
            const lengthObject = Object.keys(findRoomId).length
            if (lengthObject > 0) {
                return Promise.reject({ messager: "This room type data is being used." })
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
            return Promise.reject({ messager: "Room Type Data Not Found" });
        }
        return Promise.resolve({ result: rs });
    }

    public checkValidateRoomTypeName = async (item: any, hotelId: any) => {
        const rs = await Repository.checkValidateTypeName(item, hotelId);
        if (Object.keys(rs).length == 0) {
            return Promise.resolve()
        }
        return Promise.reject({ messager: "Type name already exists" });
    }
    public checkValidateRoomTypeNameOtherId = async (item: any, hotelId: any, id: any) => {
        const rs = await Repository.checkValidateTypeNameOtherId(item, hotelId, id);
        if (Object.keys(rs).length == 0) {
            return Promise.resolve()
        }
        return Promise.reject({ messager: "Type name already exists" });
    }

    public checkValidInput = (type: any, price: any) => {
        if (type.trim() == null || type.trim() == "") {
            return Promise.reject({ message: "Please enter Room Type" })
        }
        if (price.trim() == null || price.trim() == "") {
            return Promise.reject({ message: "Please enter price" })
        }
        if (isNaN(price)) {
            return Promise.reject({ message: "Please enter a series of numbers in price" })
        }
        if (price < 0) {
            return Promise.reject({ messager: "Please enter an amount greater than 0" })
        }
        return Promise.resolve();
    }

}
