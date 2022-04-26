import express from 'express';
import { Router } from "express";
import bodyParser from 'body-parser';
import cors from 'cors';


import { Passport } from '../Controllers/Passport'

const passportController = new Passport();

import { TokenController } from '../Controllers/Token'
const tokenController = new TokenController();

export class LoginRouter {
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
          *     Login:
          *       example:
          *         username: admin12
          *         password: 123456
          * 
          */
        /**
          * @swagger
          *  tags:
          *    name: Login
          *    description: Login Authorization
          */

        /**
         * @swagger
         * /login/:
         *   post:
         *     summary: Return Token
         *     tags: [Login]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Login'
         *     responses:
         *       200:
         *         description:  Login To Use Api
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Login'
         */
        this.Router.post('/', passportController.Authenticate, tokenController.createToken)
    }

    public config(): void {
        this.Router.use(express.json());
        this.Router.use(bodyParser.urlencoded({ extended: true }));
        this.Router.use(cors());
    }
}