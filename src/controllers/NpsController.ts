import { Request } from "express";
import { Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/* 
NOTAS DE 1 A 10
EXISTEM 3 CASSIFICAÇÕES

DETRATORES 0 - 6
PASSIVOS 7 - 8
PROMOTORES 9 10

NPS:
(N° DE DETRATORES - N° DE PROMOTORES) / (N° DE RESPONDENTES) * 100

*/
class NpsController{
  async execute(req: Request, res: Response){

    const {survey_id} = req.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({survey_id})

    const detractors = surveysUsers.filter(surveys => (surveys.value >= 0 && surveys.value <= 6)).length
    const promoters = surveysUsers.filter(surveys => (surveys.value >= 9 && surveys.value <= 10)).length
    const passives = surveysUsers.filter(surveys => (surveys.value >= 7 && surveys.value <= 8)).length

    const totalAnswers = surveysUsers.length

    const calculate = (promoters - detractors) / totalAnswers * 100

    return res.json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      nps: calculate
    })

  }

}
export {NpsController} 