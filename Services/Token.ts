import console from 'console';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TokenRepository } from "../Repositories/Repository/Token"

const repository = new TokenRepository();

export class TokenService {

    public findHotelIdWhereToken = async (token: any) => {
        const rs = await repository.findHotelWhereToken(token);
        const hotelId = rs[0].hotelId;
        return Promise.resolve(hotelId);
    }



    public createToken = async (userId: any) => {

        const accesToken = jwt.sign({ userId }, "JWT");
        const item = {
            id: uuidv4(),
            tokenCode: accesToken,
            userId: userId,
        }
        const rs = await repository.create(item);
        if (rs) {
            const checkRole = await repository.findRole(accesToken);
            const role = checkRole[0].name;
            if (role == "Root") {
                return Promise.resolve({ Token: accesToken, role: role });
            }
            else {
                const checkHotelName = await repository.findHotelWhereToken(accesToken);
                const HotelName = checkHotelName[0].name;
                return Promise.resolve({ Token: accesToken, role: role, hotelName: HotelName });
            }

        }
        return Promise.reject({ messager: "Create Faild" })

    }

    public findUserIdWhereToken = async (token: any) => {
        const rs = await repository.findUserIdWhereToken(token);
        const hotelId = rs[0].id;
        return Promise.resolve(hotelId);
    }


    //check token and time token
    public checkToken = async (token: any) => {
        if (token == undefined) {
            return Promise.reject({ messager: "Need verification code" });
        }
        const findToken = await repository.findToKenCode(token)
        if (Object.keys(findToken).length == 0) {
            return Promise.reject({ messager: "Invalid verification code" });
        }
        else {
            const findTokenCode = await repository.findToKenCodeAndTimeExpire(token)
            const itemToken = findTokenCode[0];
            if (itemToken.length == 0) {
                await repository.deleteWhereToken(token)
                return Promise.reject({ messager: "Session has expired, please login again" });
            }
            else {
                await repository.updateTimeExpire(token);
                return Promise.resolve();
            }
        }
    }


    //check role
    public RoleRootAndAdmin = async (token: any) => {
        const result = await repository.findRole(token) //xem token đó có quyền gì
        const roleName = result[0].name;
        if (roleName == "Root" || roleName == "Admin") {
            return Promise.resolve();
        }
        return Promise.reject({ messager: "You Forbidden" });
    }
    public RoleAdminAndUser = async (token: any) => {
        const result = await repository.findRole(token) //xem token đó có quyền gì
        const roleName = result[0].name;
        if (roleName == "Admin" || roleName == "User") {
            return Promise.resolve();
        }
        return Promise.reject({ messager: "You Forbidden" });
    }
    public RoleRoot = async (token: any) => {
        const result = await repository.findRole(token) //xem token đó có quyền gì
        const roleName = result[0].name;
        if (roleName == "Root") {
            return Promise.resolve();
        }
        return Promise.reject({ messager: "You Forbidden" });
    }
    public RoleAdmin = async (token: any) => {
        const result = await repository.findRole(token) //xem token đó có quyền gì
        const roleName = result[0].name;
        if (roleName == "Admin") {
            return Promise.resolve();
        }
        return Promise.reject({ messager: "You Forbidden" });
    }

}