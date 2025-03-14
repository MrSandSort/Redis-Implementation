 import express,{type Request, Response, NextFunction } from "express";
import { Restaurant, RestaurantSchema } from "../Schemas/restaurants.schema";
import { validate } from "../middleware/validate";
import { successResponse } from "../utils/responses";
import { initializeRedisClient } from "../utils/client";
import { restaurantById, reviewById, reviewDetailsById } from "../utils/keys";
import { nanoid } from "nanoid";
import { checkRestaurantExists } from "../middleware/checkRestaurantById";
import { reviews, reviewSchema } from "../Schemas/review.schema";


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

 router.post('/:restaurantId/reviews', checkRestaurantExists, validate(reviewSchema), async(req:Request<{restaurantId:string}>,res:Response, next:NextFunction)=>{

  const {restaurantId}= req.params
  const data= req.body as reviews

  try {
   const client= await initializeRedisClient();
   const reviewId= nanoid();
   const reviewKey= reviewById(restaurantId);
   const reviewDetailKey= reviewDetailsById(reviewId);
   const hashData= {id:reviewId, ...data, timestamp:Date.now() ,restaurantId};
   await Promise.all([
    client.lPush(reviewKey, reviewId),
    client.hSet(reviewDetailKey, hashData )
   ])
   successResponse(res, hashData, 'Review Details Added Successfully')
 
  } catch (error) {
    next(error)
  }

 })

 router.get('/:restaurantId', checkRestaurantExists, async(req:Request<{restaurantId:string}>, res, next)=>{
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