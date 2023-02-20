import {HandlerDecorations, Request} from "hapi";
import {TalentWrapper} from "../services/TalentWrapper";
import {TALENT_CONF} from "../config";

const talentWrapper = new TalentWrapper(TALENT_CONF.TALENT_API_URL, true);
talentWrapper.setPartnerCredential(TALENT_CONF.TALENT_API_PARTNER, TALENT_CONF.TALENT_API_PASSWORD);

const talentsUserSigninHandler: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {clientId} = request.query;
  const userLogin = await talentWrapper.userAuthenticate(clientId.toString());
  // Redundant variable BUT you can manipulate data there
  return userLogin;
}

const talentsSkillHandler: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {version} = request.query;
  const skills = await talentWrapper.getSkills(Number(version));
  // Redundant variable BUT you can manipulate data there
  return skills;
}

const talentsSkillCategoryHandler: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const skillsCategories = await talentWrapper.getSkillsCategories();
  // Redundant variable BUT you can manipulate data there
  return skillsCategories;
}

const talentsUsersHandler: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {query} = request;
  const {page, pageSize} = query;
  const hasValidatedCharter: boolean | null = query['hasValidatedCharter'] !== undefined ? Boolean(query['hasValidatedCharter']) : null;
  const modifiedAfter: string | null = query['modifiedAfter'] !== undefined ? String(query['modifiedAfter']) : null;
  const users = await talentWrapper.getUsers(Number(page), Number(pageSize), hasValidatedCharter, modifiedAfter);
  // Redundant variable BUT you can manipulate data there
  return users;
}

const talentsActiveUsersHandler: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {page, pageSize} = request.query;
  const users = await talentWrapper.getActiveUsers(Number(page), Number(pageSize));
  // Redundant variable BUT you can manipulate data there
  return users;
}

const talentsSuggestionHandler: object = async (request: Request, h: HandlerDecorations) => {
  const {talentToken} = request.headers;

  let suggestions = {}

  if (talentToken) {
    suggestions = await talentWrapper.getSuggestion(talentToken);
  }
  return suggestions;
}

const talentsUserHandler: object = async (request: Request, h: HandlerDecorations) => {
  const {talentToken} = request.headers;

  let userInfos: object = {}

  if (talentToken) {
    talentWrapper.userToken = talentToken;
    userInfos = await talentWrapper.getUser();
  }
  return userInfos;
}

const talentsUserOpportunitiesHandler: object = async (request: Request, h: HandlerDecorations) => {
  const {talentToken} = request.headers;

  let opportunities: object = [];

  if (talentToken) {
    talentWrapper.userToken = talentToken;
    opportunities = await talentWrapper.getUserOpportunities();
  }
  return opportunities;
}

const talentsUserAllowedOpportunitiesTypesHandler: object = async (request: Request, h: HandlerDecorations) => {
  const {talentToken} = request.headers;

  let opportunities: object = [];

  if (talentToken) {
    talentWrapper.userToken = talentToken;
    opportunities = await talentWrapper.getUserAllowedOpportunitiesTypes();
  }
  return opportunities;
}

const talentsUserOpportunitiesByIdHandler: object = async (request: Request, h: HandlerDecorations) => {
  const {talentToken} = request.headers;
  const {id} = request.params;

  let opportunities: object = [];

  if (talentToken) {
    talentWrapper.userToken = talentToken;
    opportunities = await talentWrapper.getUserOpportunityById(id);
  }
  return opportunities;
}

const talentsUserValidateCharterHandler: object = async (request: Request, h: HandlerDecorations) => {
  // @ts-ignore
  const {clientId, validationDate} = request.payload;

  const response = await talentWrapper.postUserValidateChart(clientId, validationDate);
  return response;
}

export {
  talentsSkillHandler,
  talentsSkillCategoryHandler,
  talentsUsersHandler,
  talentsActiveUsersHandler,
  talentsUserSigninHandler,
  talentsSuggestionHandler,
  talentsUserHandler,
  talentsUserOpportunitiesHandler,
  talentsUserAllowedOpportunitiesTypesHandler,
  talentsUserOpportunitiesByIdHandler,
  talentsUserValidateCharterHandler
};
