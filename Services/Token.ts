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
            dateCreated: date
        }
        const rs = await repository.create(item);
        if (rs) {
            return Promise.resolve({ messager: "Sucsess", Token: accesToken })
        }
        return Promise.reject({ messager: "Create Faild" })

    }


    public checkToken = async (token: any) => {
        const findOne = await repository.findOne(token)
        if (Object.keys(findOne).length == 0) {
            return Promise.reject({ messager: "You Need Login" });
        }
        return Promise.resolve(findOne);
    }

    public checkTimeToken = async (date: any) => {
        const dateNow = new Date().getTime();
        console.log()
        if (dateNow - date.getTime() >= 0) {
            return Promise.reject({ messager: "You need to login again" });
        }
        return Promise.resolve();
    }

}