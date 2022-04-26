import { RoomService } from '../Services/Room'
import { Request, Response, NextFunction } from 'express';

import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';
import { TokenService } from '../Services/Token';
const baseController = new BaseController();
const statusCode = new StatusCode();
const tokenService = new TokenService();
const service = new RoomService();

export class RoomController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        try {
            const result = await service.findAll(HotelId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400))
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = await req.body;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        try {
            const result = await service.create(item, HotelId);
            this.sendResponse(result, req, res.status(200));
        }
        catch (err) {
            this.sendResponse(err, req, res.status(400));
        }

    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        try {
            const result = await service.update(id, item, HotelId);
            this.sendResponse(result, req, res.status(200));
        }
        catch (err) {
            this.sendResponse(err, req, res.status(400));
        }
    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        try {
            const result = await service.findOne(id, HotelId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }
    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        try {
            const result = await service.delete(id, HotelId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }

}