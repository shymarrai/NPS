import 'reflect-metadata'
import createConnection from'./database'
import express from 'express';
import {router} from './routes'



createConnection()
const app = express()

app.use(express.json())
app.use(router)


/* 
get BUSCAR
post SALVAR
put  ALTERAR
delete DELETAR
patch ALTERAÇÃO ESPECÍFICA

*/


export {app}