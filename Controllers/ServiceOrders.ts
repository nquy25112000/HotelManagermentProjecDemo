import { ServiceOrdersService } from '../Services/ServiceOrders'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
import { TokenService } from '../Services/Token'
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new ServiceOrdersService();
const tokenService = new TokenService();

export class ServiceOrdersController {


    public findAll =async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        service.findAll(HotelId)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });



    }
    // try {
    //     await service.checkHotelId(item.hotelId);
    //     await service.checkPriceValidate(item.price)
    //     await service.checkValidateRoomName(item.name)
    //     const result = await service.create(item)
    //     baseController.sendResponse(result, req, res);
    // }
    // catch (err) {
    //     res.json(err);
    // }

    public create = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const item = req.body;
            const token = req.headers["authorization"]?.split(" ")[1];
            const HotelId = await tokenService.findHotelIdWhereToken(token);
            const rs = await service.create(item, HotelId);
            baseController.sendResponse(rs, req, res);
        } catch (error) {
            baseController.sendResponse(error, req, res.status(500));
        }
    }

    public update =async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.updatedAt = new Date();
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        service.update(id, item, HotelId)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(500)); });
    }

    public findOne = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        service.findServiceByBookroom(id)
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

    public delete =async (req: Request, res: Response, next: NextFunction) => {
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


