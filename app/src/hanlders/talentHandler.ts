import {HandlerDecorations, Request} from "hapi";
import {TalentWrapper} from "../services/TalentWrapper";
import {TALENT_CONF} from "../config";

const talentWrapper = new TalentWrapper(TALENT_CONF.TALENT_API_URL, true);
talentWrapper.setPartnerCredential(TALENT_CONF.TALENT_API_PARTNER, TALENT_CONF.TALENT_API_PASSWORD);

const talentSkillHandler: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {version} = request.query;
  const skills = await talentWrapper.getSkills(Number(version));
  // Redundant variable BUT you can manipulate data there
  return skills;
}

const talentSkillCategory: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const skillsCategories = await talentWrapper.getSkillsCategories();
  // Redundant variable BUT you can manipulate data there
  return skillsCategories;
}

const talentUsers: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {query} = request;
  const {page, pageSize} = query;
  const hasValidatedCharter: boolean | null = query['hasValidatedCharter'] !== undefined ? Boolean(query['hasValidatedCharter']) : null;
  const modifiedAfter: string | null = query['modifiedAfter'] !== undefined ? String(query['modifiedAfter']) : null;
  const users = await talentWrapper.getUsers(Number(page), Number(pageSize), hasValidatedCharter, modifiedAfter);
  // Redundant variable BUT you can manipulate data there
  return users;
}

const talentActiveUsers: object | string | null = async (request: Request, h: HandlerDecorations) => {
  const {page, pageSize} = request.query;
  const users = await talentWrapper.getActiveUsers(Number(page), Number(pageSize));
  // Redundant variable BUT you can manipulate data there
  return users;
}

export {talentSkillHandler, talentSkillCategory, talentUsers, talentActiveUsers};
