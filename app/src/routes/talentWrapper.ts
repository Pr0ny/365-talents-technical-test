import {Server, ServerApplicationState} from "@hapi/hapi";
import {skillVersionValidation} from "../validators/query";
import {talentSkillHandler} from "../hanlders/talenthandler";

const pathPrefix = '/talent'

const talentRoutes = (server: Server<ServerApplicationState>): void => {

  // Get a single info
  server.route({
    method: 'GET',
    path: `${pathPrefix}/skills`,
    options: {
      validate: {
        query: skillVersionValidation,
      }
    },
    handler: talentSkillHandler
  });

}

export default talentRoutes;
