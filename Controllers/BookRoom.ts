import { BookRoomService } from '../Services/BookRoom'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
const baseController = new BaseController();
const statusCode = new StatusCode();
const service = new BookRoomService();

export class BookRoomController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await service.findAll()
            this.sendResponse(result, req, res);
        } catch (error) {
            this.sendResponse(error, req, res);
        }


    }


    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.uuid = uuidv4();
        try {
            await service.checkInput(item.customerName, item.customerIdCard, item.fromDate, item.toDate, item.roomId, item.userId)
            await service.checkUserId(item.userId)
            await service.checkRoomId(item.roomId)
            await service.checkTimeFromDate(item.roomId, item.fromDate);
            await service.checkTimeToDate(item.fromDate, item.toDate, item.roomId);
            const result = await service.create(item)
            this.sendResponse(result, req, res)
        }
        catch (err) {
            this.sendResponse(err, req, res)
        }


    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.updatedAt = new Date();
        try {
            await service.checkInput(item.customerName, item.customerIdCard, item.fromDate, item.toDate, item.roomId, item.userId)
            await service.checkUserId(item.userId)
            await service.checkRoomId(item.roomId)
            await service.checkTimeFromDate(item.roomId, item.fromDate);
            await service.checkTimeToDate(item.fromDate, item.toDate, item.roomId);
            const result = await service.update(id, item);
            this.sendResponse(result, req, res);
        }
        catch (error) {
            this.sendResponse(error, req, res)
        }
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const result = await service.findOne(id)
            this.sendResponse(result, req, res)
        } catch (error) {
            this.sendResponse(error, req, res)
        }
    }

    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        try {
            const result = await service.findItem(item);
            this.sendResponse(result, req, res);
        } catch (error) {
            this.sendResponse(error, req, res)
        }



    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const result = await service.delete(id);
            this.sendResponse(result, req, res);
        } catch (error) {
            this.sendResponse(error, req, res)
        }

    }

}
