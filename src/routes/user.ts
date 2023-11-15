import { Router } from "express";
import { User } from '../entity/User'
import { AppDataSource } from "../db/index";
import { log } from "console";

const userRepository = AppDataSource.getRepository(User)

const route = Router()

route.get("/", async (req, res) => {
   try {
      const users = await userRepository.find()
      const filter  = users.map( (user) => {
        const {  personGoodBad , personGoodGift , ...restObj } = user
        return restObj
      })
      return res.status(200).json(filter)
   } catch (error) {
    console.log(error);
     return res.status(500).json({ error: true });
   }
})



route.get('/:name', async (req , res) =>{
  try {
    if(!req.params.name){
      return res.status(404).json({ error: true, message: "el parámetro name es requerido" });
    }

    const name = req.params.name
    const user  = await userRepository.findOneBy({name: name.replace('_', " ")})

    if(!user){
      return res.status(500).json({ error: true, message:"usuario no encontrado"})
    }

    const {personGoodBad, personGoodGift, ...rest} = user
    return res.status(200).json(rest)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true });
  }
})

route.post('/', async (req , res) =>{
  try {
    if(!req.body.name){
      return res.status(404).json({ error: true, message: "El nombre del usuario es requerido"})
    }
    const {
      name
    } = req.body

    const isExistUser = await userRepository.findOneBy({name})
    
    if(isExistUser){
      return res.status(404).json({ error: true, message: "Ya existe un usuario con este nombre"})
    }

    const users = await userRepository.save({
      name,
      hasGiftBad:false,
      hasGiftGood:false,
      personGoodGift:'',
      personGoodBad:''
    })

    return res.status(200).json(users)
 } catch (error) {
  console.log(error);
   return res.status(500).json({ error: true });
 }
})

route.put('/:id', async (req , res) =>{
  try {
    if(!req.params.id){
      return res.status(404).json({ error: true, message: "el parámetro name es requerido" });
    }

    if(!req.body){
      return res.status(404).json({ error: true, message: "Se require la information a actualizar"})
    }

    const id = req.params.id
    const data = req.body

    const {id: ID, ...lastData} = await userRepository.findOneBy({id:Number(id)})
    const update = {
      ...lastData,
      ...data
    }
    const users = await userRepository.update({
      id:Number(id)
    },{
      ...update
    })

  const result =  await userRepository.findOneBy({name:data.name})
  return res.status(200).json(result)
 } catch (error) {
  console.log(error);
  
   return res.status(500).json({ error: true });
 }

})


route.delete('/:id', async (req , res) =>{
  try {
    if(!req.params.id){
      return res.status(404).json({ error: true, message: "el parámetro name es requerido" });
    }

    const id = req.params.id
   
    const result = await userRepository.delete({id:Number(id)});
  
  return res.status(200).json(result)
 } catch (error) {
   return res.status(500).json({ error: true });
 }

})


export default route