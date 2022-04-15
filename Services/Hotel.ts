import { HotelRepository } from '../Repositories/Repository/Hotel';


const Repository = new HotelRepository();


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
        const name = await Repository.checkNameHotel(item.name);
        if (Object.keys(name).length > 0) {
            return Promise.reject({ messager: "Name already exists !" });
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


    public create = async (item: any) => {
        try {
            const ob = await new HotelService().checkvalidateHotel(item);
            try {
                const rs = await Repository.create(item);
                if (rs) {
                    return Promise.resolve({messager : "Sucsuess"});           
                }
            } catch (error) {
                return Promise.reject({messager : "Create Faild "});
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    public update = async (id: string, item: []) => {
       try {
            const ob = await new HotelService().checkvalidateHotel(item);
            try {
                const rs = await Repository.update(id, item);
                if (rs) {  // rs = 1
                    return Promise.resolve({ messager: "Sucsess" });          
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
        const rs = await Repository.delete(id);
        if (rs == 0) {
            return Promise.reject({ messager: "Delete Faild" })
        }
        return Promise.resolve({messager : "Sucsuess"})
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
