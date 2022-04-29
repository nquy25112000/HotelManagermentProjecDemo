import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

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
import { LoginRouter } from './Router/Login'
import {StatisticalRouter} from './Router/Statistical'

import { TokenController } from './Controllers/Token'
const tokenController = new TokenController();


import { Passport } from './Controllers/Passport'

const passportController = new Passport();

const login = new LoginRouter();
const roleRouter = new RoleRouter();
const usersRouter = new UsersRouter();
const holtelRouter = new HotelRouter();
const roomRouter = new RoomRouter();
const billRouter = new BillRouter();
const serviceRouter = new ServiceRouter();
const serviceOrdersRouter = new ServiceOrdersRouter();
const bookRoomRouter = new BookRoomRouter();
const roomTypeRouter = new RoomTypeRouter();
const statisticalRouter = new StatisticalRouter();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API-NguyenCongQuy",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://192.168.199.223:4000",
                description: "My API Documentation",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    name: 'Authorization',
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
    },

    apis: ["./Router/*.ts"],
};

const specs = swaggerJsDoc(options);

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
            .use(cors({ origin: '*' }))

    }

    public router(): void {
        this.app
            .use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
            .use('/hotel', tokenController.authorization, tokenController.RoleRoot, holtelRouter.Router)
            .use('/role', tokenController.authorization, roleRouter.Router)

            .use('/users', tokenController.authorization, usersRouter.Router)
            .use('/room', tokenController.authorization, roomRouter.Router)
            .use('/roomtype', tokenController.authorization, roomTypeRouter.Router)
            .use('/bill', tokenController.authorization, billRouter.Router)
            .use('/services', tokenController.authorization, serviceRouter.Router)
            .use('/orders', tokenController.authorization, serviceOrdersRouter.Router)
            .use('/bookroom', tokenController.authorization, bookRoomRouter.Router)
            .use('/statistical-month', tokenController.authorization, statisticalRouter.Router)
            
            .use('/login', login.Router)



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
