import { HotelRepository } from '../Repositories/Repository/Hotel';
import {UsersRepository} from '../Repositories/Repository/Users';
import {RoleRepository} from '../Repositories/Repository/Role';
import { v4 as uuidv4 } from 'uuid';


const Repository = new HotelRepository();
const UserRepo = new UsersRepository();
const RoleRepo = new RoleRepository()


export class HotelService {
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


    public createUser = async (idHotel: any) => {   
        try {
            const idRoleAdmin = await RoleRepo.findIdbyNameAdmin();
            const iduser = uuidv4();
            const user : any =  {id:  `${iduser}`  , fullName : 'admin', username: 'admin',password : 'admin' , birtDate : '', adress : '', phone : '', hotelId : `${idHotel}` , roleId :   `${idRoleAdmin[0].id}` };
            const rs = await UserRepo.create(user);
            if (rs) {
                return Promise.resolve(iduser);           
            }
        } catch (error) {
            return Promise.reject({messager : "Create User Faild "});
        }
    }

    public create = async (item: any) => {
        try {
            const ob = await new HotelService().checkvalidateHotel(item);
            await  new HotelService().checkvalidateNameHotelCreate(item.name);
            try {
                const rs = await Repository.create(item);
                var idUser : any = await new HotelService().createUser(item.id);
                if (rs) {
                    const hotel = await Repository.findOne(item.id);
                    const user = await Repository.inforUser(idUser);
                   
                    return Promise.resolve({
                        messager : "Sucsuess", 
                        inforHotel :  hotel,
                        inforUser : user
                    });           
                }
            } catch (error) {
                return Promise.reject({messager : "Create Faild "});
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
