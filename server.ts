import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module "express-session" {
    interface SessionData {
        user: any;
        id: any;

    }
}

import { RoleRouter } from './Router/Role';
import { UsersRouter } from './Router/Users'
import { HotelRouter } from './Router/Hotel'
import { BillRouter } from './Router/Bill'
import { BookRoomRouter } from './Router/BookRoom'
import { ServiceRouter } from './Router/Services'
import { ServiceOrdersRouter } from './Router/ServiceOrders'
import { RoomTypeRouter } from './Router/Roomtype'
import { RoomRouter } from './Router/Room'

import { TokenController } from './Controllers/Token'
const tokenController = new TokenController();


import { Passport } from './Controllers/Passport'

const passportController = new Passport();


const roleRouter = new RoleRouter();
const usersRouter = new UsersRouter();
const holtelRouter = new HotelRouter();
const roomRouter = new RoomRouter();
const billRouter = new BillRouter();
const serviceRouter = new ServiceRouter();
const serviceOrdersRouter = new ServiceOrdersRouter();
const bookRoomRouter = new BookRoomRouter();
const roomTypeRouter = new RoomTypeRouter();



class Server {
    public app: express.Application
    PORT: number = 4000;

    constructor() {
        this.app = express();
        this.config();
        this.start();
        this.router();

    }

    public config(): void {
        this.app.use(express.json())
            .use(
                session({
                    secret: "keyboard cat",
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: false }
                })
            )
            .use(passport.initialize())
            .use(passport.session())
            .use(cors())

    }

    public router(): void {
        this.app

            .use('/hotel', tokenController.authorization, tokenController.RoleRoot, holtelRouter.Router)
            .use('/role', tokenController.authorization, roleRouter.Router)

            .use('/users', tokenController.authorization, tokenController.RoleAdmin, usersRouter.Router)
            .use('/room', tokenController.authorization, roomRouter.Router)
            .use('/roomtype', tokenController.authorization, roomTypeRouter.Router)
            .use('/bill', tokenController.authorization, billRouter.Router)
            .use('/services', tokenController.authorization, serviceRouter.Router)
            .use('/orders', tokenController.authorization, serviceOrdersRouter.Router)
            .use('/bookroom', tokenController.authorization, bookRoomRouter.Router)

            .post('/login', passportController.Authenticate, tokenController.createToken)



            .get('/test', tokenController.authorization, tokenController.RoleRoot, (req, res) => {

                res.json("đăng nhập thành công")
            })


    }
    public start(): void {
        this.app.listen(this.PORT, () => {

            console.log(`server running at port: ${this.PORT}`);
        });
    }
}

new Server();
