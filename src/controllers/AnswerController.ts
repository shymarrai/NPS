import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

/* 
ROUTE PARAMS -> SÃO PARAMETROS Q VEM NA ROTA EX: /:id

QUERY PARAMS -> USADOS PARA BUSCA, PAGINAÇÃO, SÃO NÃO OBRIGATORIOS OU SEJA INDEPENDENTE SE USAR OU NÃO NA ROTA AINDA VAI FUNCIONAR EX CHAVE=VALOR
*/

class AnswerController{
  async execute(req: Request, res: Response){
    const { value } = req.params;
    const {u} = req.query

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
      
    })

    if(!surveyUser){
      return res.status(400).json({error: "Survey Users doe not exist"})
    }

    surveyUser.value = Number(value)

    await surveysUsersRepository.save(surveyUser)

    return res.status(200).json(surveyUser)




  }
}

export {AnswerController}