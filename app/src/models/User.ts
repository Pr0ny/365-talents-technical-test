import IUser from "../interfaces/IUser";
import {execute} from "../database/mysql";


export default class UserModel {

    // getUsers(): IUser[] {
    //     const sql = `SELECT email, forename, lastname, age from db.user LIMIT 0,20 ORDER BY forename ASC, lastname ASC`
    //     return {age: 1, email: '', forename: '', lastname: ''}
    // }

    async insert(user: IUser) {
        const sql = `INSERT INTO user (email, forename, lastname, password, age) VALUES (?, ?, ?, ?, ?)`
        return await execute<Array<any>>(sql, Object.values(user))
    }

    async getUserFromId(id: number): Promise<Array<IUser>> {
        const sql = `SELECT id, forename, lastname, age FROM user WHERE id = ? LIMIT 0,20`
        return await execute<Array<IUser>>(sql, [id])
    }

    async getUserFromEmail(email: string): Promise<Array<IUser>> {
        const sql = `SELECT id, email, password from user WHERE id = ? LIMIT 0,20`
        return await execute<Array<IUser>>(sql, [email]);
    }
}
