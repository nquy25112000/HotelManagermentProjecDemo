import { RoomService } from '../Services/Room'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new RoomService();

export class RoomController {


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
            .then(result => {
                baseController.sendResponse(result, req, res);
            })
            .catch(err => { res.json(err); });



    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.uuid = uuidv4();
        try {
            await service.checkHotelId(item.hotelId);
            await service.checkPriceValidate(item.price)
            await service.checkValidateRoomName(item.name)
            const result = await service.create(item)
            baseController.sendResponse(result, req, res);
        }
        catch (err) {
            res.json(err);
        }

    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.updatedAt = new Date();
        try {
            await service.checkHotelId(item.hotelId);
            await service.checkPriceValidate(item.price)
            await service.checkValidateRoomName(item.name)
            const result = await service.update(id, item)
            baseController.sendResponse(result, req, res);
        }
        catch (err) {
            res.json(err)
        }
    }

    public findOne = (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        service.findOne(id)
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

    public check = (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;
        service.checkValidateRoomName(name)
            .then(rs => { res.json(rs); })
            .catch(err => res.json(err));
    }
}


