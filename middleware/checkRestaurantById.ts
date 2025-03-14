import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utils/responses";
import { initializeRedisClient } from "../utils/client";
import { restaurantById } from "../utils/keys";

export const checkRestaurantExists= async(req:Request, res:Response, next:NextFunction) => 
{
    const {restaurantId}= req.params;
    if(!restaurantId){
        errorResponse(res,400,"RestaurantId not found")
    }
    const client= await initializeRedisClient();
    const restaurantKey= restaurantById(restaurantId);
    const exist= await client.exists(restaurantKey);
    if(!exist){
      errorResponse(res,404,"Restaurant not found")
    }
    next();
}