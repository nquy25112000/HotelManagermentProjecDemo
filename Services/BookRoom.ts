import { BookRoomRepository } from '../Repositories/Repository/BookRoom';

const Repository = new BookRoomRepository();


export class BookRoomService {
    public findAll = async () => {
        const rs = await Repository.findAll();
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public create = async (item: []) => {
        const rs = await Repository.create(item);
        if (rs == null) {
            return Promise.reject({ messager: "Create Faild " })
        }
        return Promise.resolve({ messager: "Sucsuess" })
    }

    public update = async (id: string, item: []) => {
        const rs = await Repository.update(id, item);
        if (rs) {
            return Promise.resolve({ messager: "Sucsess" })

        }
        return Promise.reject({ messager: "Update Faild" })
    }
    public delete = async (id: string) => {
        const rs = await Repository.delete(id)
        if (rs == 0) {
            return Promise.reject({ messager: "Delete Faild" })
        }
        return Promise.resolve({ messager: "Sucsuess" })
    }

    public findOne = async (id: string) => {
        const rs = await Repository.findOne(id)
        if (rs == false) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }
    public findItem = async (item: []) => {
        const rs = await Repository.findItem(item);
        if (rs == null) {
            return Promise.reject({ messager: "Not Found" })
        }
        return Promise.resolve({ result: rs })
    }

    public checkTimeFromDate = async (date: any) => {
        const dateNow = new Date().getTime();
        const fromDate = new Date(date).getTime()
        if (dateNow > fromDate) {
            return Promise.reject({ messager: "The reservation date cannot be less than the current date" })
        }
        return Promise.resolve()
    }
    public checkTimeToDate = async (fromdate: any, todate: any) => {
        const fromDate = new Date(fromdate).getTime();
        const toDate = new Date(todate).getTime();
        if (toDate < fromDate) {
            return Promise.reject({ messager: "Payment date must not be less than reservation date" })
        }
        return Promise.resolve()
    }

}
