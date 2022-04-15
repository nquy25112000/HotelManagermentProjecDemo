
import passport from "passport";
import { UsersService } from '../Services/Users'
const usersService = new UsersService();
import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface AuthInfo { }
        interface User {
            id: any
        }
    }
}
const localStrategy = require('passport-local').Strategy;


export class Passport {

    constructor() {
        this.localStrategy = localStrategy;
    }
    public localStrategy = passport.use(new localStrategy(async (username: string, password: string, done: any) => {
        let authenticated_user = await usersService.selectAcount(username, password); //truy vấn db
        if (Object.keys(authenticated_user).length == 0) { //object rỗng trả về false
            return done(null, false);
        }
        else {
            return done(null, authenticated_user) //trả về username
        }
    }
    ))
    public serializeUser = passport.serializeUser((user, done) => {
        done(null, user); //lấy dữ liệu từ return done done(null, authenticated_user)
    })

    public deserializeUser = passport.deserializeUser(async (username: any, done) => { //hàm giải mã định dạng
        done(null, username)
    })


    public Authenticate = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (err, user) => {

            if (!user) return res.status(401).json({ message: "Wrong login information" });
            else {
                req.user = user[0].id
                next();
            }

        })(req, res, next);
    }
}