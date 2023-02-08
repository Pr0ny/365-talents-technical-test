import {HandlerDecorations, Request} from "hapi";
import {TalentWrapper} from "../services/TalentWrapper";
import {TALENT_CONF} from "../config";

const talentSkillHandler: any = async (request: Request, h: HandlerDecorations) => {
  console.log(TALENT_CONF.TALENT_API_URL)
  console.log(TALENT_CONF.TALENT_API_PARTNER)
  console.log(TALENT_CONF.TALENT_API_PASSWORD)
  const talentWrapper = new TalentWrapper(TALENT_CONF.TALENT_API_URL);
  console.log('pabien')
  const ret = await talentWrapper.partnerAuthenticate(TALENT_CONF.TALENT_API_PARTNER, TALENT_CONF.TALENT_API_PASSWORD);
  console.log('ret = ')
  console.log(ret)
  return {};
}

export {talentSkillHandler};
