import { UsersRepository } from '../Repositories/Repository/Users';
import { HotelRepository } from '../Repositories/Repository/Hotel';
import { RoleRepository } from '../Repositories/Repository/Role';
import { BookRoomRepository } from '../Repositories/Repository/BookRoom';

import { Users } from '../Models/Users'


const Repository = new UsersRepository();
const hotelRepository = new HotelRepository();
const roleRepository = new RoleRepository();
const bookRoomRepository = new BookRoomRepository();
const usersModel = new Users()


export class UsersService {
    public findAll = async (hotelId: string, id: string) => {
        const rs = await Repository.findAllWhereHotelOtherUserId(hotelId, id);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "No data to display" });
        }
        return Promise.resolve({ result: rs });
    }

    public create = async (item: []) => {
        await Repository.create(item);
        return Promise.resolve({ result: item });
    }

    public update = async (id: string, item: [], hotelId: string) => {
        const findOne = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObject = Object.keys(findOne).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "User Data Not Found" });
        }
        else {
            await Repository.update(id, item);
            return Promise.resolve({ result: item });
        }

    }

    public delete = async (id: any, hotelId: string) => {
        const findOne = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObjectFindOne = Object.keys(findOne).length;
        if (lengthObjectFindOne == 0) {
            return Promise.reject({ messager: "User Data Not Found" });
        }
        else {
            const bookroomId = await bookRoomRepository.findUsers(id);
            const lengthObjectFindUsers = Object.keys(bookroomId).length;
            if (lengthObjectFindUsers == 0) {
                await Repository.delete(id);
                const rs = await Repository.findAllWhereHotelId(hotelId); // FE yêu cầu trả về dữ liệu sau khi xóa để khỏi load lại trang
                return Promise.resolve({ result: rs });
            }
            return Promise.reject({ messager: "This room contains some booking data, Please clear the reservation data before deleting the Room" })
        }
    }
    public findOne = async (id: string, hotelId: string) => {
        const rs = await Repository.findOneWhereHotelId(id, hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject == 0) {
            return Promise.reject({ messager: "User Data Not Found" });
        }
        return Promise.resolve({ result: rs });
    }

    public selectAcount = async (user: string, pass: string) => {
        const rs = await Repository.selectAcount(user, pass);
        return rs;
    }

    public checkUserName = async (username: string, hotelId: string) => {
        const rs = await Repository.findUserNameById(username, hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject > 0) {
            return Promise.reject({ message: "Username already exists" })
        }
        return Promise.resolve();
    }

    public checkUserNameOtherId = async (username: string, id: string, hotelId: string) => {
        const rs = await Repository.findUserNameOtherId(username, id, hotelId);
        const lengthObject = Object.keys(rs).length;
        if (lengthObject > 0) {
            return Promise.reject({ message: "Username already exists" })
        }
        return Promise.resolve();
    }

    public checkValidInput = (username: string, password: any, fullName: any, birtDate: any, adress: any, phone: any, roleId: any) => {
        if (username.trim() == null || username.trim() == "" || username == undefined) {
            return Promise.reject({ message: "Please enter Username" })
        }
        if (password.trim() == null || password.trim() == "") {
            return Promise.reject({ message: "Please enter Password" })
        }
        if (username.length <= 5) {
            return Promise.reject({ message: "Username must be at least 6 characters" })
        }
        if (password.length <= 5) {
            return Promise.reject({ message: "Password must be at least 6 characters" })
        }
        if (fullName.trim() == null || fullName.trim() == "") {
            return Promise.reject({ message: "Please enter price" })
        }
        if (birtDate.trim() == null || birtDate.trim() == "") {
            return Promise.reject({ message: "Please enter BirtDate" })
        }
        if (adress.trim() == null || adress.trim() == "") {
            return Promise.reject({ message: "Please enter Adress" })
        }
        if (phone.trim() == null || phone.trim() == "") {
            return Promise.reject({ message: "Please enter Phone" })
        }
        if (phone.length < 10 || phone.length > 11) {
            return Promise.reject({ message: "Please enter a phone number of 10 or 11 characters" })
        }
        if (isNaN(phone)) {
            return Promise.reject({ message: "Please enter a series of numbers in Phone" })
        }
        if (roleId.trim() == null || roleId.trim() == "") {
            return Promise.reject({ message: "Please select Role" })
        }
        return Promise.resolve();
    }


    public checkHotelId = async (hotelId: string) => {
        const rs = await hotelRepository.findOne(hotelId);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "Hotel does not exist" });
        }
        return Promise.resolve();
    }
    public checkRoleId = async (hotelId: string) => {
        const rs = await roleRepository.findOne(hotelId);
        if (Object.keys(rs).length == 0) {
            return Promise.reject({ messager: "Role does not exist" });
        }
        return Promise.resolve();
    }
    public checkValidCharactersUsername = (string: any) => {
        let specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
        for (let i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return Promise.reject({ message: "Username cannot contain special characters" })
            }
        }
        return Promise.resolve();

    }
    public checkValidCharactersFullName = (string: any) => {
        let specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
        for (let i = 0; i < specialChars.length; i++) {
            if (string.indexOf(specialChars[i]) > -1) {
                return Promise.reject({ message: "FullName cannot contain special characters" })
            }
        }
        return Promise.resolve();

    }

}