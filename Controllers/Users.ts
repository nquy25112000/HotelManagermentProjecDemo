import { UsersService } from '../Services/Users'
import { TokenService } from '../Services/Token'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { BaseController } from './BaseController';

const service = new UsersService();
const tokenService = new TokenService();
const baseController = new BaseController();

export class UsersController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const UserId = await tokenService.findUserIdWhereToken(token);
        try {
            const result = await service.findAll(HotelId, UserId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);

        try {
            const result = await service.create(item, HotelId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.id = id;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);

        try {
            const result = await service.update(id, item, HotelId);
            baseController.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
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
        const UserIdAdmin = await tokenService.findUserIdWhereToken(token);
        try {
            const result = await service.delete(id, HotelId, UserIdAdmin);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }
    public findUserCurentLogin = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const UserId = await tokenService.findUserIdWhereToken(token);
        try {
            const result = await service.findOne(UserId, HotelId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }
    public updateUserCurentLogin = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        const UserId = await tokenService.findUserIdWhereToken(token);
        try {
            const result = await service.updateUserCurentLogin(UserId, item, HotelId);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }
}


