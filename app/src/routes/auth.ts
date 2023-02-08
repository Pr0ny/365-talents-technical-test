import {Server, ServerApplicationState} from "@hapi/hapi";
import {signupHandler, signinHandler} from "../hanlders/authHandler";
import {signupValidation, signinValidation} from "../validators/body";

const pathPrefix = '/auth'

const authRoutes = (server: Server<ServerApplicationState>): void => {

    // Signup route
    server.route({
        method: 'POST',
        path: `${pathPrefix}/signup`,
        options: {
            validate: {
                payload: signupValidation
            }
        },
        handler: signupHandler
    });

    // Signin route
    server.route({
        method: 'POST',
        path: `${pathPrefix}/signin`,
        options: {
            validate: {
                payload: signinValidation
            }
        },
        handler: signinHandler
    });
}

export default authRoutes;
