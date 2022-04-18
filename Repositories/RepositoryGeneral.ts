export interface RepositoryGeneral<T> {
    delete(id: string): Promise<boolean>
    findAll(): Promise<T[]>
    findAllWhereHotelId(hotelId: string): Promise<T[]>
    findOneWhereHotelId(id: string, hotelId: string): Promise<boolean>
    create(item: T[]): Promise<T[]>
    update(id: string, item: T[]): Promise<T[]>
    findOne(id: string): Promise<boolean>
    findItem(item: T[]): Promise<T[]>
}