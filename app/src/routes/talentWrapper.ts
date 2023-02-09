import {Server, ServerApplicationState} from "@hapi/hapi";
import {talentsSkillVersionValidation, talentsUsersActiveValidation, talentsUsersValidation} from "../validators/query";
import {talentActiveUsers, talentSkillCategory, talentSkillHandler, talentUsers} from "../hanlders/talentHandler";

const pathPrefix = '/talents'

const talentRoutes = (server: Server<ServerApplicationState>): void => {

  // Get all skills from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/skills`,
    options: {
      validate: {
        query: talentsSkillVersionValidation,
      }
    },
    handler: talentSkillHandler
  });

  // Get all skill categories from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/skills/categories`,
    handler: talentSkillCategory
  });

  // Get users from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/users`,
    options: {
      validate: {
        query: talentsUsersValidation,
      }
    },
    handler: talentUsers
  });

  // Get active users from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/users/active`,
    options: {
      validate: {
        query: talentsUsersActiveValidation,
      }
    },
    handler: talentActiveUsers
  });
}

export default talentRoutes;
