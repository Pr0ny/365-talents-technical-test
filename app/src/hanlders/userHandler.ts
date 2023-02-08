import {HandlerDecorations, Request} from "hapi";
import IUser from "../interfaces/IUser";
import UserModel from "../models/User";

// const getUsers = (request: Request, h: HandlerDecorations): IUser => {
//     const {id} = request.params;
//     const user = new UserModel();
//     const userResult: IUser = user.getUsers();
//     return userResult;
// }

const getUserFromId = async (request: Request, h: HandlerDecorations) => {
    const {id} = request.params
    const user = new UserModel()
    console.log("id = %d", id);
    const userResult: Array<IUser> = await user.getUserFromId(Number(id))
    if (userResult.length >= 1) {
        return userResult[0]
    }
    return {}
}

const createUser = async (request: Request, h: HandlerDecorations) => {
    return;
}

const updateUserFromId = async (request: Request, h: HandlerDecorations) => {
    return;
}

const deleteUserFromId = async (request: Request, h: HandlerDecorations) => {
    return;
}


export {getUserFromId, createUser, updateUserFromId, deleteUserFromId};
