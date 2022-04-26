import { BookRoomRepository } from '../Repositories/Repository/BookRoom';
import { RoomRepository } from '../Repositories/Repository/Room';


const Repository = new BookRoomRepository();
const roomRepository = new RoomRepository();



export class BookRoomService {
    public findAllWhereHotel = async (hotelId: any) => {
        const rs = await Repository.findAllBookRoomWhereHotelIdPaymentNull(hotelId);
        if (rs == null) {
            return Promise.reject({ messager: "No Data to display" })
        }
        return Promise.resolve({ result: rs })
    }

    public findOneWhereHotel = async (hotelId: string, id: string) => {
        const rs = await Repository.findOneBookRoomWhereHotelId(hotelId, id);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "data undefined" });
        }
        return Promise.resolve({ result: rs });
    }



    public create = async (item: any, hotelId: any, userId: any) => {
        const status: any = { status: 1 }
        item.userId = userId;
        await this.checkInput(item.customerName, item.customerIdCard, item.fromDate, item.toDate, item.roomId)
        await this.checkRoomId(item.roomId, hotelId)
        await this.checkTimeToCreate(item.roomId, item.fromDate, item.toDate, hotelId);
        await this.checkBetweenToCreate(item.fromDate, item.toDate, item.roomId, hotelId);
        await roomRepository.update(item.roomId, status)
        await Repository.create(item);
        return Promise.resolve({ messager: item })
    }

    public update = async (id: string, item: any, hotelId: any, userId: string) => {

        item.userId = userId;
        await this.checkInput(item.customerName, item.customerIdCard, item.fromDate, item.toDate, item.roomId)
        await this.checkRoomId(item.roomId, hotelId)
        await this.checkTimeToCreate(item.roomId, item.fromDate, item.toDate, hotelId);
        await this.checkBetweenToUpdate(item.roomId, item.fromDate, item.toDate, id, hotelId)
        await Repository.update(id, item);
        return Promise.resolve({ messager: item });


    }

    public delete = async (id: string, hotelId: string) => {
        await this.findOneWhereHotel(id, hotelId);
        await Repository.delete(id);
        const findAll = await this.findAllWhereHotel(hotelId);
        return Promise.resolve({ messager: findAll });
    }



    public checkInput = (customerName: string, customerIdCard: any, fromDate: any, toDate: any, roomId: any) => {
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
        return Promise.resolve();
    }

    public checkRoomId = async (roomId: any, hotelId: any) => {
        const room = await roomRepository.findOneWhereHotelId(roomId, hotelId);
        if (room == false) {
            return Promise.reject({ message: "Please select a valid room" })
        }
        return Promise.resolve();

    }


    //check time create
    public checkTimeToCreate = async (RoomId: any, Fdate: any, Tdate: any, hotelId: any) => {
        const dateNow = new Date().getTime();
        const fromDate = new Date(Fdate).getTime();
        const toDate = new Date(Tdate).getTime();
        if (fromDate < dateNow) {
            return Promise.reject({ messager: "The preset time cannot be less than the current time" })
        }
        if (toDate < fromDate) {
            return Promise.reject({ messager: "Check-out time cannot be less than check-in time" })
        }
        else {
            const findRoomIdByFromDate = await Repository.findRoomIdAndFromDateToDateToCreate(RoomId, Fdate, hotelId);
            const lengthObjectFromDate = Object.keys(findRoomIdByFromDate).length;
            if (lengthObjectFromDate > 0) {
                return Promise.reject({ messager: `Check-in date cannot coincide with the booked time`, result: findRoomIdByFromDate });
            }

            const findRoomIdByToDate = await Repository.findRoomIdAndFromDateToDateToCreate(RoomId, Tdate, hotelId);
            const lengthObjectToDate = Object.keys(findRoomIdByToDate).length;
            if (lengthObjectToDate > 0) {
                return Promise.reject({ messager: `Check-out date must not coincide with the booked time`, result: findRoomIdByToDate });
            }

            return Promise.resolve();

        }
    }


    //check time update
    public checkTimeToUpdate = async (Fdate: any, Tdate: any, RoomId: any, id: any, hotelId: any) => {
        const dateNow = new Date().getTime();
        const fromDate = new Date(Fdate).getTime();
        const toDate = new Date(Tdate).getTime();
        if (fromDate < dateNow) {
            return Promise.reject({ messager: "The preset time cannot be less than the current time" })
        }
        if (toDate < fromDate) {
            return Promise.reject({ messager: "Check-out time cannot be less than check-in time" })
        }
        else {
            const findRoomIdByFromDate = await Repository.findRoomIdAndFromDateToDateToUpDate(RoomId, Fdate, id, hotelId);
            const lengthObjectFromDate = Object.keys(findRoomIdByFromDate).length;
            if (lengthObjectFromDate > 0) {
                return Promise.reject({ messager: `Check-in date cannot coincide with the booked time`, result: findRoomIdByFromDate });

            }
            const findRoomIdByToDate = await Repository.findRoomIdAndFromDateToDateToUpDate(RoomId, Tdate, id, hotelId);
            const lengthObjectToDate = Object.keys(findRoomIdByToDate).length;
            if (lengthObjectToDate > 0) {
                return Promise.reject({ messager: `Check-out date must not coincide with the booked time`, result: findRoomIdByToDate });

            }
            return Promise.resolve();
        }
    }


    public checkBetweenToCreate = async (fromDate: Date, toDate: Date, RoomId: any, hotelId: any) => {
        const findRoomId = await Repository.findBetweenFromDateAndToDate(RoomId, fromDate, toDate, hotelId);
        const lengthObject = Object.keys(findRoomId).length;
        if (lengthObject > 0) {
            return Promise.reject({ message: "This time period is already booked, please choose a reasonable reservation time", result: findRoomId })
        }
        return Promise.resolve()
    }
    public checkBetweenToUpdate = async (roomId: any, fromDate: any, toDate: any, id: any, hotelId: any) => {
        const findRoomId = await Repository.findBetweenFromDateAndToDateToUpDate(roomId, fromDate, toDate, id, hotelId);
        const lengthObject = Object.keys(findRoomId).length;
        if (lengthObject > 0) {
            return Promise.reject({ message: "This time period is already booked, please choose a reasonable reservation time", result: findRoomId })
        }
        return Promise.resolve()
    }
}
