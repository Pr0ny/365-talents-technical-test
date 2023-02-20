import {Server, ServerApplicationState} from "@hapi/hapi";
import {idValidation} from "../validators/params";
import {createUser, deleteUserFromId, getUserFromId, updateUserFromId} from "../hanlders/userHandler";

const pathPrefix = '/user'

const userRoutes = (server: Server<ServerApplicationState>): void => {

    // Get a single user
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

    // Create user
    server.route({
        method: 'POST',
        path: `${pathPrefix}`,
        handler: createUser
    });

    // Update a user
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

    // Delete an user
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
