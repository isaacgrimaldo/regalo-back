import "reflect-metadata"
import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
config()

import'./db/index'

import userRoutes  from './routes/user'


const app = express()
const port = process.env.PORT
app.use(cors())
app.use(express.json())

app.set('port', port )

app.use('/users', userRoutes)

app.listen(port , () => {
    console.log('listening on port ' + port);
    
})