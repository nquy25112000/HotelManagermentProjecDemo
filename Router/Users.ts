import express from 'express';
import { Router } from "express";
import { UsersController } from "../Controllers/Users"
import bodyParser from 'body-parser';


const Controller = new UsersController();


export class UsersRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', Controller.findAll);
        this.Router.get('/findOne/:id', Controller.findOne);


        this.Router.get('/acount', Controller.selectAcount);

        this.Router.post('/findItem', Controller.findItem);

        this.Router.post('/create', Controller.create);
        this.Router.put('/update', Controller.update);
        this.Router.delete('/delete', Controller.delete);
        this.Router.delete('/login', Controller.delete);
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}