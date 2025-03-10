 import type {Request, Response, NextFunction} from "express";
import { errorResponse } from "../utils/responses";
import { errorMonitor } from "events";

 export function errorHandler(error:any, req:Request, res:Response, next:NextFunction){
    errorResponse(res,500,error)
 }