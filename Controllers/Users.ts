import { UsersService } from '../Services/Users'
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { StatusCode } from './StatusCode';
import { BaseController } from './BaseController';

const statusCode = new StatusCode();
const service = new UsersService();
const baseController = new BaseController();

export class UsersController extends BaseController {


    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await service.findAll();
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        item.id = uuidv4();
        try {
            await service.checkValidInput(item.username, item.password, item.fullName, item.birtDate, item.adress, item.phone, item.hotelId, item.roleId);
            await service.checkHotelId(item.hotelId);
            await service.checkRoleId(item.roleId);
            await service.checkUserName(item.username);
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
        try {
            await service.checkValidInput(item.username, item.password, item.fullName, item.birtDate, item.adress, item.phone, item.hotelId, item.roleId);
            await service.checkHotelId(item.hotelId);
            await service.checkRoleId(item.roleId);
            await service.checkUserName(item.username);
            await service.checkValidCharactersUsername(item.username);
            await service.checkValidCharactersFullName(item.fullName);
            const result = await service.update(id, item);
            baseController.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }

    public findOne = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const result = await service.findOne(id);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }

    public findItem = async (req: Request, res: Response, next: NextFunction) => {
        const item = req.body;
        try {
            const result = await service.findItem(item);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const result = await service.delete(id);
            this.sendResponse(result, req, res.status(200));
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }

    public selectAcount = async (req: Request, res: Response, next: NextFunction) => {
        const username = req.body.username
        const password = req.body.password
        try {
            const result = await service.selectAcount(username, password);
            this.sendResponse(result, req, res.status(200))
        } catch (error) {
            this.sendResponse(error, req, res.status(400));
        }

    }
}


