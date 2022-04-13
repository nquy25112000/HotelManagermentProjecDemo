import { ServiceOrdersService } from '../Services/ServiceOrders'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new ServiceOrdersService();

export class ServiceOrdersController {


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });



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
            const rs = await service.create(item);
            baseController.sendResponse(rs, req, res);
        } catch (error) {
            baseController.sendResponse(error, req, res.status(404));
        }
    }

    public update = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.updatedAt = new Date();
        service.update(id, item)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { baseController.sendResponse(err, req, res.status(404)); });
    }

    public findOne = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        service.findServiceByBookroom(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });
    }
    public findItem = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        service.findItem(item)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });

    }

    public delete = (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        service.delete(id)
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });

    }
}


