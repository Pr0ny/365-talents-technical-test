import {Server, ServerApplicationState} from "@hapi/hapi";
import {talentsSkillVersionValidation, talentsUsersActiveValidation, talentsUsersValidation} from "../validators/query";
import {
  talentsActiveUsersHandler,
  talentsSkillCategoryHandler,
  talentsSkillHandler,
  talentsUsersHandler,
  talentsUserSigninHandler,
  talentsSuggestionHandler,
  talentsUserHandler,
  talentsUserOpportunitiesHandler,
  talentsUserAllowedOpportunitiesTypesHandler,
  talentsUserOpportunitiesByIdHandler,
  talentsUserValidateCharterHandler
} from "../hanlders/talentHandler";
import {talentSigninValidation, talentCharterValidationValidation} from "../validators/body";
import {idValidation} from "../validators/params";

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
    handler: talentsSkillHandler
  });

  // Get all skill categories from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/skills/categories`,
    handler: talentsSkillCategoryHandler
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
    handler: talentsUsersHandler
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
    handler: talentsActiveUsersHandler
  });

  // Post a request to authenticate a user
  server.route({
    method: 'POST',
    path: `${pathPrefix}/signin`,
    options: {
      validate: {
        payload: talentSigninValidation
      }
    },
    handler: talentsUserSigninHandler
  });

  // Get suggestion for any user from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/suggestions`,
    options: {},
    handler: talentsSuggestionHandler
  });

  // Get infos about the current user from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/user`,
    options: {},
    handler: talentsUserHandler
  });

  // Get infos about the current user from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/opportunities/suggested`,
    options: {},
    handler: talentsUserOpportunitiesHandler
  });

  // Get infos about the current user from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/opportunities/types`,
    options: {},
    handler: talentsUserAllowedOpportunitiesTypesHandler
  });

  // Get opportunity from an id from 365Talents
  server.route({
    method: 'GET',
    path: `${pathPrefix}/opportunities/{id}`,
    options: {
      validate: {
        params: idValidation
      }
    },
    handler: talentsUserOpportunitiesByIdHandler
  });

  // Post a request to authenticate a user
  server.route({
    method: 'POST',
    path: `${pathPrefix}/validateCharter`,
    options: {
      validate: {
        payload: talentCharterValidationValidation
      }
    },
    handler: talentsUserValidateCharterHandler
  });

}

export default talentRoutes;
