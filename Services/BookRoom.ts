import { BookRoomRepository } from '../Repositories/Repository/BookRoom';
import { RoomRepository } from '../Repositories/Repository/Room';
import { UsersRepository } from '../Repositories/Repository/Users';


const Repository = new BookRoomRepository();
const userRepository = new UsersRepository();
const roomRepository = new RoomRepository();



export class BookRoomService {
    public findAllWhereHotel = async (hotelId: any) => {
        const rs = await Repository.findAllBookRoomWhereHotelId(hotelId);
        if (rs == null) {
            return Promise.reject({ messager: "No Data to display" })
        }
        return Promise.resolve({ result: rs })
    }

    public findOneWhereHotel = async (id: string, hotelId: string) => {
        const rs = await Repository.findOneBookRoomWhereHotelId(hotelId, id);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "No data to display" });
        }
        return Promise.resolve({ result: rs });
    }




    public create = async (item: []) => {
        await Repository.create(item);
        return Promise.resolve({ messager: "Sucsuess" })
    }

    public update = async (id: string, item: []) => {
        const findOne = await Repository.findOne(id);
        const lengthObject = Object.keys(findOne).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Reservation Data Not Found" });
        }
        else {
            await Repository.update(id, item);
            return Promise.resolve({ messager: "Sucsuess" });
        }

    }
    public delete = async (id: string) => {
        const findOne = await Repository.findOne(id)
        if (findOne == false) {
            return Promise.reject({ messager: "Reservation Data Not Found" });
        }
        else {
            await Repository.delete(id);
            return Promise.resolve({ messager: "Sucsuess" });
        }

    }


    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "Reservation Data Not Found" });
        }
        return Promise.resolve({ result: rs });
    }



    public checkTimeFromDateToCreate = async (RoomId: any, date: any) => {
        const dateNow = new Date().getTime();
        const fromDate = new Date(date).getTime();
        if (fromDate < dateNow) {
            return Promise.reject({ messager: "The reservation date cannot be less than the current date" })
        }
        else {
            const findRoomId = await Repository.findRoomIdAndFromDateToDateToCreate(RoomId, date);
            const lengthObject = Object.keys(findRoomId).length;
            if (lengthObject > 0) {
                const fromDateOfObject = findRoomId[0].fromDate
                return Promise.reject({ messager: `Someone made a reservation on ${fromDateOfObject}` })
            }
            return Promise.resolve();

        }
    }

    public checkTimeToDateToCreate = async (Fdate: any, Tdate: any, RoomId: any) => {
        const fromDate = new Date(Fdate).getTime();
        const toDate = new Date(Tdate).getTime();
        if (toDate < fromDate) {
            return Promise.reject({ messager: "Payment date must not be less than reservation date" })
        }
        else {
            const findRoomId = await Repository.findRoomIdAndFromDateToDateToCreate(RoomId, Tdate);
            const lengthObject = Object.keys(findRoomId).length;
            if (lengthObject > 0) {
                const fromDateOfObject = findRoomId[0].fromDate
                return Promise.reject({ messager: `Someone made a reservation on ${fromDateOfObject} , Please select a check-out date before ${fromDateOfObject}` });
            }
            return Promise.resolve();
        }
    }


    public checkTimeFromDateToUpdate = async (RoomId: any, date: any, id: any) => {
        const dateNow = new Date().getTime();
        const fromDate = new Date(date).getTime();
        if (fromDate < dateNow) {
            return Promise.reject({ messager: "The reservation date cannot be less than the current date" })
        }
        else {
            const findRoomId = await Repository.findRoomIdAndFromDateToDateToUpDate(RoomId, date, id);
            const lengthObject = Object.keys(findRoomId).length;
            if (lengthObject > 0) {
                const fromDateOfObject = findRoomId[0].fromDate
                return Promise.reject({ messager: `Someone made a reservation on ${fromDateOfObject}` })
            }
            return Promise.resolve();

        }
    }

    public checkTimeToDateToUpdate = async (Fdate: any, Tdate: any, RoomId: any, id: any) => {
        const fromDate = new Date(Fdate).getTime();
        const toDate = new Date(Tdate).getTime();
        if (toDate < fromDate) {
            return Promise.reject({ messager: "Payment date must not be less than reservation date" })
        }
        else {
            const findRoomId = await Repository.findRoomIdAndFromDateToDateToUpDate(RoomId, Tdate, id);
            const lengthObject = Object.keys(findRoomId).length;
            if (lengthObject > 0) {
                const fromDateOfObject = findRoomId[0].fromDate
                return Promise.reject({ messager: `Someone made a reservation on ${fromDateOfObject} , Please select a check-out date before ${fromDateOfObject}` });
            }
            return Promise.resolve();
        }
    }

    public checkInput = (customerName: string, customerIdCard: any, fromDate: any, toDate: any, roomId: any, userId: any) => {
        if (customerName.trim() == null || customerName.trim() == "") {
            return Promise.reject({ message: "Please enter Customer Name" })
        }
        if (customerIdCard.trim() == null || customerIdCard.trim() == "") {
            return Promise.reject({ message: "Please enter Customer Id Card" })
        }
        if (isNaN(customerIdCard)) {
            return Promise.reject({ message: "Please enter a series of numbers in Customer Id Card" })
        }
        if (fromDate.trim() == null || toDate.trim() == "") {
            return Promise.reject({ message: "Please enter a date" })
        }
        if (toDate.trim() == null || toDate.trim() == "") {
            return Promise.reject({ message: "Please enter a date" })
        }
        if (roomId.trim() == null || roomId.trim() == "") {
            return Promise.reject({ message: "Please enter a date" })
        }
        if (userId.trim() == null || userId.trim() == "") {
            return Promise.reject({ message: "Please enter a date" })
        }
        return Promise.resolve();
    }

    public checkUserId = async (userId: any) => {
        const user = await userRepository.findOne(userId);
        if (user == false) {
            return Promise.reject({ message: "Please select a valid user" })
        }
        return Promise.resolve();

    }
    public checkRoomId = async (roomId: any) => {
        const room = await roomRepository.findOne(roomId);
        if (room == false) {
            return Promise.reject({ message: "Please select a valid room" })
        }
        return Promise.resolve();

    }


}
