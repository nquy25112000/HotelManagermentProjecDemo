import express from 'express';
import { Router } from "express";
import { RoleController } from "../Controllers/Role"
import bodyParser from 'body-parser';
import { TokenController } from '../Controllers/Token';


const tokenController = new TokenController();


const Controller = new RoleController();


export class RoleRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', tokenController.RoleAdmin, Controller.findAll);
        this.Router.get('/findOne/:id', tokenController.RoleAdmin, Controller.findOne);
        this.Router.get('/findItem', tokenController.RoleAdmin, Controller.findItem);

        this.Router.post('/create', tokenController.RoleRoot, Controller.create);
        this.Router.put('/update/:id', tokenController.RoleRoot, Controller.update);
        this.Router.delete('/delete/:id', tokenController.RoleRoot, Controller.delete);
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}