'use strict';

const Hapi = import("@hapi/hapi");
import {configureRoutes} from "./routes";
import {Server, ServerApplicationState} from "@hapi/hapi";
import {SERVER_CONF} from "./config";
import {initDB} from "./database/mysql";

const hapiConf = SERVER_CONF.hapiServer;

console.log(`port = ${hapiConf.HAPI_PORT} && host = ${hapiConf.HAPI_HOST}`);

const initHapiServer = async () => {

    const server: Server<ServerApplicationState> = (await Hapi).server({
        port: hapiConf.HAPI_PORT,
        host: hapiConf.HAPI_HOST
    });

    configureRoutes(server);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

initDB();
initHapiServer(); // Better use deno for top level await. (:

