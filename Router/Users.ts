import express from 'express';
import { Router } from "express";
import { UsersController } from "../Controllers/Users"
import bodyParser from 'body-parser';
import { TokenController } from '../Controllers/Token';
import cors from 'cors';

const tokenController = new TokenController();

const Controller = new UsersController();


export class UsersRouter {
    public Router: Router;

    constructor() {
        this.Router = Router();
        this.routers();
        this.config();
    }

    routers() {

        /**
             * @swagger
             * components:
             *   schemas:
             *     Users:
             *       type: object
             *       required:
             *         - username
             *         - password
             *         - fullName
             *         - birtDate
             *         - adress
             *         - phone
             *         - roleId
             *       properties:
             *         username:
             *           type: string
             *           description: username to login
             *         password:
             *           type: string
             *           description: password to login
             *         fullName:
             *           type: string
             *           description: full name users
             *         birtDate:
             *           type: date
             *           description: date of birth
             *         address:
             *           type: string
             *           description: address of users
             *         roleId:
             *           type: string
             *           description: role of users
             *       example:
             *         username: quydeptrai
             *         password: 123456
             *         fullName: Nguyen Cong Quy
             *         birtDate: 2000-11-25
             *         adress: Phu Yen
             *         phone: 12345678901
             *         roleId: djs7fmg-ajhf0sma.f=ema,.eyha54g23
             * 
             */

        /**
            * @swagger
            *  tags:
            *    name: Users
            *    description: CRUD Users
            */


        //FIND ALL
        /**
            * @swagger
            * /users/findAll:
            *   get:
            *     summary: Returns all Users
            *     tags: [Users]
            *     security:
            *       - BearerAuth: []
            *     responses:
            *       200:
            *         description: the list of the Users
            *         headers:
            *           Access-Control-Allow-Origin:
            *              type: string
            *           Access-Control-Allow-Methods:
            *              type: string
            *           Access-Control-Allow-Headers:
            *              type: string
            *         content:
            *           application/json:
            *             schema:
            *               type: array
            *               items:
            *                 $ref: '#/components/schemas/Users'
            */
        this.Router.get('/findAll', tokenController.RoleAdmin, Controller.findAll);




        //FIND ONE
        /**
             * @swagger
             * /users/findOne/{id}:
             *   get:
             *     summary: gets user by id
             *     tags: [Users]
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in : path
             *         name: id
             *         description: id of user
             *         schema:
             *           type: string
             *         required: true
             *     responses:
             *       200:
             *         description: user by its id
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/Post'
             *       400:
             *         description: users not found
             */
        this.Router.get('/findOne/:id', tokenController.RoleAdmin, Controller.findOne);


        //FIND USER CURENT LOGIN
        /**
            * @swagger
            * /users/userCurentLogin:
            *   get:
            *     summary: Returns user curent login
            *     tags: [Users]
            *     security:
            *       - BearerAuth: []
            *     responses:
            *       200:
            *         description: the list of the Users
            *         content:
            *           application/json:
            *             schema:
            *               type: object
            *               items:
            *                 $ref: '#/components/schemas/Users'
            */
        this.Router.get('/userCurentLogin', tokenController.RoleAdminAndUser, Controller.findUserCurentLogin);
        this.Router.put('/userCurentLogin/update', tokenController.RoleAdminAndUser, Controller.updateUserCurentLogin);



        // CREATE
        /** 
            * @swagger
            * /users/create:
            *   post:
            *     summary: create Users
            *     tags: [Users]
            *     security:
            *       - BearerAuth: []
            *     requestBody:
            *       required: true
            *       content: 
            *         application/json: 
            *           schema:
            *             $ref: '#/components/schemas/Users'
            *     responses:
            *       200:
            *         description: the user was create
            *         content:
            *           application/json:
            *             schema:
            *               type: array
            *               items:
            *                 $ref: '#/components/schemas/Users'
            *       400:
            *         description: badd rrequest
            */
        this.Router.post('/create', tokenController.RoleAdmin, Controller.create);




        //UPDATE
        /**
             * @swagger
             * /users/update/{id}:
             *   put:
             *     summary: updates users by id
             *     tags: [Users]
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in: path
             *         name: id
             *         schema:
             *           type: string
             *         required: true
             *         description: user id
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/Users'
             *     responses:
             *       200:
             *         decsription: The users was updated
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/Users'
             *       400:
             *         description: users was not found.
             *
             */
        this.Router.put('/update/:id', tokenController.RoleAdmin, Controller.update);




        //DELETE
        /**
             * @swagger
             * /users/delete/{id}:
             *   delete:
             *     summary: delete by id
             *     tags: [Users]
             *     security:
             *       - BearerAuth: []
             *     parameters:
             *       - in: path
             *         name: id
             *         schema:
             *           type: string
             *         required: true
             *         description: user id
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/Users'
             *     responses:
             *       200:
             *         decsription: The list user befor delete
             *         content:
             *           application/json:
             *             schema:
             *               $ref: '#/components/schemas/Users'
             *       400:
             *         description: users was not found.
             *
             */
        this.Router.delete('/delete/:id', tokenController.RoleAdmin, Controller.delete);

    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
        this.Router.use(cors({ origin: '*' }));
    }
}