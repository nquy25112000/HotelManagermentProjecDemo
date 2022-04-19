import { UsersService } from '../Services/Users'
import { TokenService } from '../Services/Token'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';

const statusCode = new StatusCode();
const service = new UsersService();
const tokenService = new TokenService();
const baseController = new BaseController();

export class UsersController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers["authorization"]?.split(" ")[1];
            const HotelId = await tokenService.findHotelIdWhereToken(token);
            const UserId = await tokenService.findUserIdWhereToken(token);
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
        item.hotelId = HotelId;
        item.id = uuidv4();

        try {
            await service.checkValidInput(item.username, item.password, item.fullName, item.birtDate, item.adress, item.phone, item.roleId);
            await service.checkHotelId(item.hotelId);
            await service.checkRoleId(item.roleId);
            await service.checkUserName(item.username, HotelId);
            await service.checkValidCharactersUsername(item.username);
            await service.checkValidCharactersFullName(item.fullName);
            const result = await service.create(item);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        const id = req.params.id;
        item.id = req.params.id;
        const token = req.headers["authorization"]?.split(" ")[1];
        const HotelId = await tokenService.findHotelIdWhereToken(token);
        item.hotelId = HotelId;
        try {
            await service.checkValidInput(item.username, item.password, item.fullName, item.birtDate, item.adress, item.phone, item.roleId);
            await service.checkHotelId(item.hotelId);
            await service.checkRoleId(item.roleId);
            await service.checkUserNameOtherId(item.username, id, HotelId);
            await service.checkValidCharactersUsername(item.username);
            await service.checkValidCharactersFullName(item.fullName);
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
}


