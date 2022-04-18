import express from 'express';
import { Router } from "express";
import { RoomTypeController } from "../Controllers/RoomType"
import bodyParser from 'body-parser';
import { TokenController } from '../Controllers/Token';


const tokenController = new TokenController();

const Controller = new RoomTypeController();


export class RoomTypeRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', tokenController.RoleAdminAndUser, Controller.findAll);
        this.Router.get('/findOne/:id', tokenController.RoleAdminAndUser, Controller.findOne);

        this.Router.post('/create', tokenController.RoleAdmin, Controller.create);
        this.Router.put('/update/:id', tokenController.RoleAdmin, Controller.update);
        this.Router.delete('/delete/:id', tokenController.RoleAdmin, Controller.delete);
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}