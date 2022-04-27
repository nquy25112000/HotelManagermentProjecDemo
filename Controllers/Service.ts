import { ServicesService } from '../Services/Services'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
import { TokenService } from '../Services/Token'
const baseController = new BaseController();
const statusCode = new StatusCode();
const tokenService = new TokenService();

const service = new ServicesService();

export class ServicesController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        service.findAll(HotelId)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public create =async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const item = req.body;
        item.id = uuidv4();
        service.create(item, HotelId)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public update =async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const id = req.params.id;
        item.updatedAt = new Date();
        service.update(id, item ,HotelId )
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public findOne = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        service.findOne(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }
    public findItem = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        service.findItem(item)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        service.delete(id , HotelId)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });

    }
}


