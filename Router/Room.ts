import express from 'express';
import { Router } from "express";
import { RoomController } from "../Controllers/Room"
import bodyParser from 'body-parser';


const Controller = new RoomController();


export class RoomRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {
        this.Router.get('/findAll', Controller.findAll);
        this.Router.get('/findOne/:id', Controller.findOne);
        this.Router.post('/findItem', Controller.findItem);

        this.Router.post('/create', Controller.create);
        this.Router.put('/update', Controller.update);
        this.Router.delete('/delete', Controller.delete);
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
    }
}