import console from 'console';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { TokenRepository } from "../Repositories/Repository/Token"

const repository = new TokenRepository();

export class TokenService {


    public createToken = async (userId: any) => {

        const accesToken = jwt.sign({ userId }, "JWT");
        const today = new Date();
        const newDate = today.getTime() + 10800000; //cộng 3 tiếng, nhưng cộng mili giây
        const date = new Date(newDate);
        const item = {
            uuid: uuidv4(),
            tokenCode: accesToken,
            userId: userId,
            timeExpire: date
        }
        const rs = await repository.create(item);
        if (rs) {
            const checkRole = await repository.findJoin(accesToken);
            const role = checkRole[0].name;
            return Promise.resolve({ messager: "Sucsess", Token: accesToken, role: role })
        }
        return Promise.reject({ messager: "Create Faild" })

    }


    public checkToken = async (token: any) => {
        if (token == undefined) {
            return Promise.reject({ messager: "Need verification code" });
        }
        const findOne = await repository.findOne(token)
        if (Object.keys(findOne).length == 0) {
            return Promise.reject({ messager: "Invalid verification code" });
        }
        return Promise.resolve(findOne);
    }
    public checkRoleToken = async (token: any) => {
        const result = await repository.findJoin(token) //xem token đó có quyền gì
        const roleName = result[0].name;
        if (roleName == "Root") {
            return Promise.resolve();
        }
        return Promise.reject({ messager: "You Forbidden" });
    }
    public checkTimeToken = async (date: any) => {
        const dateNow = new Date().getTime();
        if (dateNow - date.getTime() >= 0) {
            return Promise.reject({ messager: "Session has expired, please login again" });
        }
        return Promise.resolve();
    }

}