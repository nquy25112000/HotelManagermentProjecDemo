
import { StaticticalRepository } from '../Repositories/Repository/Statistical';

const Repository = new StaticticalRepository();


export class StaticticalService {
    public findServiceMost = async ( month : string ,year : string , hotelId: string) => {
       try {
        const rs = await Repository.findServiceStatisticalMost(month,year, hotelId);
            if (rs == null) {
                return Promise.reject({messager :"Not Found"} )
            }
            return Promise.resolve({result : rs})
       } catch (error) {
        return Promise.resolve(error)
           
       }

   }
}