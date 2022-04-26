import { HotelRepository } from '../Repositories/Repository/Hotel';
import {UsersRepository} from '../Repositories/Repository/Users';
import {RoleRepository} from '../Repositories/Repository/Role';
import { v4 as uuidv4 } from 'uuid';
const  {google} = require ('googleapis');
const nodemailer = require('nodemailer');
const emailExistence = require('email-existence')
var emailCheck = require('email-check');
require('dotenv').config();


const Repository = new HotelRepository();
const UserRepo = new UsersRepository();
const RoleRepo = new RoleRepository()




export class HotelService {
    public sendMail = async (username : any,password : any , nameHotel : any , emailhotel : any) => {
        var  CLIENT_ID = process.env.CLIENT_ID;
        var CLIENT_SECRET = process.env.CLIENT_SECRET;
        var REDIRECT_URI = process.env.REDIRECT_URI;
        var  REFRESH_TOKEN  = process.env.REFRESH_TOKEN;
        const oAuth2Client  = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI  );
        oAuth2Client.setCredentials({refresh_token : REFRESH_TOKEN });
        try {
            const accesToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service : 'gmail',
                auth : {
                    type : 'OAuth2',
                    user : 'truongngo071@gmail.com',
                    clientId : CLIENT_ID,
                    clientSecret : CLIENT_SECRET,
                    refreshToken : REFRESH_TOKEN,
                    accesToken : accesToken
                }
            });
            let info = await transporter.sendMail({
                from: `TMA: <truongngo071@gmail.com>`, // sender address
                to: `${emailhotel}`, // list of receivers
                subject: `Account Hotel: ${nameHotel}`, // Subject line
                text: "Hello world?", // plain text body
                html: `<b> Username: ${username}  - PassWord: ${password}</b>`, // html body
              } );
    
    
            const rs = await transporter.sendMail(info);
            return rs;
        } catch (error) {
            return Promise.reject({messager : "Error Send Mail !!! "});
        } 
    }



    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }

    public checkvalidateHotel  = async (item : any) => {
        if(typeof item.name === "undefined" || !item.name ){
            return Promise.reject({ messager: "Name Invalid !" });
        }
        if(!item.adress  || typeof item.adress === "undefined" ){
            return Promise.reject({ messager: "Adress Invalid !" });
        }
        if(!item.phone  || typeof item.phone === "undefined" ){
            return Promise.reject({ messager: "Phone Invalid !" });
        }
        if(item.phone.length < 10){
            return Promise.reject({ messager: "Please enter the correct phone number !" });
        }
        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        var valid = emailRegex.test(item.email);
        if(!item.email || !valid){
             return Promise.reject({ messager: "Please enter the correct email !" });
        }
        await  new HotelService().checkExitsEmail(item.email);
    }

    public checkExitsEmail = async (mail : any) =>{
        return  emailCheck(mail)
        .then(function (res : any) {
        //   console.log('res: '+res);  // return true if correct email
        })
        .catch(function (err : any) {
          if (err.message === 'refuse') {
            return  Promise.reject({ messager: "Email not exist  !!" });
          } else {
            return  Promise.reject({ messager: "Error check email  !!" });
          }
        });
    }
        

    public checkvalidateNameHotelCreate = async (name : string) => {
        const nameHotel = await Repository.checkNameHotelCreate(name);
        if (Object.keys(nameHotel).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
        }
    }

    public checkvalidateNameHotelUpdate = async (id : string ,name : string) => {
        const nameHotel = await Repository.checkNameHotelUpdate(id, name);
        if (Object.keys(nameHotel).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
        }
    }

    public randomPassUser  = async (length : any) => {
        var username = '';
        var password = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length ; i++ ) {
            username += characters.charAt(Math.floor(Math.random() * charactersLength));
            password += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return {username , password} ;
    }

    public createUser = async (idHotel: any, nameHotel : any, emailhotel : any) => {   
        try {
            const idRoleAdmin = await RoleRepo.findIdbyNameAdmin();
            const {username , password } = await new HotelService().randomPassUser(10);
            const iduser = uuidv4();
            const user : any =  {id:  `${iduser}`  , fullName : 'admin', username: `${username}`,password : `${password}` , birtDate : '', adress : '', phone : '', hotelId : `${idHotel}` , roleId :   `${idRoleAdmin[0].id}` };
            const rs = await UserRepo.create(user);
            if (rs) {
                const mail = await new HotelService().sendMail(username,password, nameHotel, emailhotel );
                return Promise.resolve(iduser);           
            }
        } catch (error) {
            return Promise.reject({messager : "Create User Faild !!! "});
        }
    }

    public create = async (item: any) => {
        try {
            await new HotelService().checkvalidateHotel(item);
            await  new HotelService().checkvalidateNameHotelCreate(item.name);
            try {            
                const rs = await Repository.create(item);
                var idUser : any = await new HotelService().createUser(item.id , item.name, item.email);        
                if (rs) {     
                    const user = await Repository.inforUser(idUser);          
                    return Promise.resolve({
                        messager : "Sucsuess", 
                        inforHotel :  item,
                        inforUser : user
                    });           
                }
            } catch (error) {
                return Promise.reject({messager : "Create Faild !!!"});
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    public update = async (id: string, item: any) => {
       try {
            await new HotelService().checkvalidateHotel(item);
            await  new HotelService().checkvalidateNameHotelUpdate(id, item.name);
            try {
                const rs = await Repository.update(id, item);
                if (rs) {  // rs = 1
                    const hotel : any = await Repository.findOne(id);
                    return Promise.resolve({ 
                        messager: "Sucsess" , 
                        inforHotel :  hotel[0]
                    });          
                }      
                else{
                    return Promise.reject({ messager: " Hotel Id not exists ! " })
                }     
            } catch (error) {
                return Promise.reject({ messager: "Update Faild" });
            }
       } catch (error) {
            return Promise.reject(error);
       }
    }
    public delete = async (id: string) => {
       try {
            const rs = await Repository.delete(id);
            if (rs == 0) {
                return Promise.reject({ messager: "Delete Faild" })
            }
            return Promise.resolve({messager : "Sucsuess"})
       } catch (error) {
        return Promise.reject({ messager: "Error Delete !!" }) /// error k xoa dc vi lien ket voi User
       }
    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        if (rs == false) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }
    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject({messager :"Not Found"} )
        }
        return Promise.resolve({result : rs})
    }



}
