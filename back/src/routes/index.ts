'use strict';

import authRoutes from "./auth";
import userRoutes from "./user";
import {Server, ServerApplicationState} from "@hapi/hapi";
import talentRoutes from "./talentWrapper";

const configureRoutes = (server: Server<ServerApplicationState>): void => {
    authRoutes(server);
    userRoutes(server);
    talentRoutes(server);
}

export {configureRoutes};
