 import express,{type Request} from "express";
import { Restaurant, RestaurantSchema } from "../Schemas/restaurants.schema";
import { validate } from "../middleware/validate";
import { successResponse } from "../utils/responses";
import { initializeRedisClient } from "../utils/client";
import { restaurantById } from "../utils/keys";
import { nanoid } from "nanoid";

 const router= express.Router()

 router.post('/', validate(RestaurantSchema), async(req,res, next)=>{
    const data= req.body as Restaurant

    try {
      const client= await initializeRedisClient();
      const id= nanoid();
      const restaurantKey= restaurantById(id)
      const hashData= {id, name:data.name, location:data.location}
      const addResult= await client.hSet(restaurantKey, hashData)
      successResponse(res, hashData, "Restaurant Added successfully")
      console.log(hashData)
    } catch (error) {
      next(error);
    }
  
 })

 router.get('/:restaurantId', async(req:Request<{restaurantId:string}>, res, next)=>{
   const {restaurantId}= req.params

   try {

      const client= await initializeRedisClient();
      const restaurantKey= restaurantById(restaurantId);
      const restaurant= await client.hGetAll(restaurantKey);
      successResponse(res,restaurant);
   } catch (error) {
      next(error)
   }

 })
 export default router;