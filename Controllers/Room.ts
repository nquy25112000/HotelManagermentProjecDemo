import { RoomService } from '../Services/Room'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new RoomService();

export class RoomController extends BaseController {


    public findAll = (req: Request, res: Response, next: NextFunction) => {

        service.findAll()
            .then(result => {
                this.sendResponse(result, req, res);
            })
            .catch(err => { this.sendResponse(err, req, res.status(400)) });
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = await req.body;
        item.uuid = uuidv4();
        try {
            await service.checkValidInput(item.name, item.type, item.price, item.status, item.hotelId)
            await service.checkHotelId(item.hotelId);
            await service.checkPriceValidate(item.price);
            await service.checkValidateRoomName(item.name);
            const result = await service.create(item);
            this.sendResponse(result, req, res);
        }
        catch (err) {
            this.sendResponse(err, req, res.status(400));
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
            this.sendResponse(result, req, res);
        }
        catch (err) {
            this.sendResponse(err, req, res.status(400))
        }
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const result = await service.findOne(id)
            this.sendResponse(result, req, res)
        } catch (error) {
            this.sendResponse(error, req, res.status(400))
        }
    }

    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        try {
            const result = await service.findItem(item);
            this.sendResponse(result, req, res);
        } catch (error) {
            this.sendResponse(error, req, res.status(400))
        }

    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const result = await service.delete(id);
            this.sendResponse(result, req, res);
        } catch (error) {
            this.sendResponse(error, req, res.status(400))
        }

    }

    public check = (req: Request, res: Response, next: NextFunction) => {
        const name = req.body.name;
        service.checkValidateRoomName(name)
            .then(rs => { this.sendResponse(rs, req, res.status(200)); })
            .catch(err => this.sendResponse(err, req, res.status(400)));
    }
}


