 import express from "express";
import { Restaurant, RestaurantSchema } from "../Schemas/restaurants.schema";
import { validate } from "../middleware/validate";
import { successResponse } from "../utils/responses";
import { initializeRedisClient } from "../utils/client";

 const router= express.Router()

 router.post('/', validate(RestaurantSchema), async(req,res)=>{
    const data= req.body as Restaurant
    const client= await initializeRedisClient();
    successResponse(res, data, "Restaurant Added successfully")
 })

 export default router;