import {Server, ServerApplicationState} from "@hapi/hapi";
import {idValidation} from "../validators/params";
import {createUser, deleteUserFromId, getUserFromId, updateUserFromId} from "../hanlders/userHandler";

const pathPrefix = '/user'

const userRoutes = (server: Server<ServerApplicationState>): void => {

    // Get all infos
    // server.route({
    //     method: 'GET',
    //     path: `${pathPrefix}`,
    //     handler: getUser
    // });

    // Get a single info
    server.route({
        method: 'GET',
        path: `${pathPrefix}/{id}`,
        options: {
            validate: {
                params: idValidation
            }
        },
        handler: getUserFromId
    });

    // Create an info
    server.route({
        method: 'POST',
        path: `${pathPrefix}`,
        handler: createUser
    });

    // Update an info
    server.route({
        method: 'PUT',
        path: `${pathPrefix}/{id}`,
        options: {
            validate: {
                params: idValidation
            }
        },
        handler: updateUserFromId
    });

    // Delete an info
    server.route({
        method: 'DELETE',
        path: `${pathPrefix}/{id}`,
        options: {
            validate: {
                params: idValidation
            }
        },
        handler: deleteUserFromId
    });
}

export default userRoutes;
