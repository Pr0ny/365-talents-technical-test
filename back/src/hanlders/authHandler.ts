import {HandlerDecorations, Request} from "hapi";
import {Crypto} from "../libs/crypto";
import UserModel from "../models/User";
import * as stream from "stream";
import IUser from "../interfaces/IUser";
import jwt from "jsonwebtoken";
import {Authentication} from "../libs/authentication";

const signupHandler: any = async (request: Request, h: HandlerDecorations) => {
    // @ts-ignore
    const {email, password, forename, lastname, age} = request.payload; // FIXME: @HAPI check this typing and add references / links.
    const user = new UserModel();
    const crypto = new Crypto();
    const auth = new Authentication();
    const userResult = await user.getUserFromEmail(email); // FIXME: Check if the user already exist
    const hash: string = await crypto.generateHash(password);
    let userObject: IUser = {email: email, forename: forename, lastname: lastname, password: hash, age: age}; // Use userResult
    const insert = await user.insert(userObject);

    delete userObject['password'];
    userObject['id'] = insert['insertId'];

    const authenticationResponse = auth.generatePayload({expire_date_gmt: 'Shrek is love', expire_date_utc: 'Shrek is life'}); // TODO: Add expiration utc && gmt

    authenticationResponse['user'] = userObject;
    return authenticationResponse;
}

const signinHandler: any = async (request: Request, h: HandlerDecorations) => {
    // @ts-ignore
    const {email, password} = request.payload; // FIXME: @HAPI check this typing and add references / links.
    const user = new UserModel();
    const crypto = new Crypto();
    const userResult = await user.getUserFromEmail(email);

    if (userResult.length >= 1) {
        const passwordValid = await crypto.compareHash(password, userResult[0].password);

        if (passwordValid) {
            const auth = new Authentication();

            const authenticationResponse = auth.generatePayload({expire_date_gmt: 'Shrek is love', expire_date_utc: 'Shrek is life'}); // TODO: Add expiration utc && gmt
            authenticationResponse['user'] = userResult[0];
            return authenticationResponse;
        } else {
            return {'error': 'AUTH_FAILED', 'message': 'Authentication failure. Please try again.'}; // Invalid password
        }
    } else {
        return {'error': 'AUTH_FAILED', 'message': 'Authentication failure. Please try again.'}; // User not found
    }
    return;
}

export {signupHandler, signinHandler};
