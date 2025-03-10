import express, { Application } from "express";
import dotenv from "dotenv";
import restaurantsRouter from "./routes/restaurants";
import cuisinesRouter from "./routes/cuisines";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const PORT= process.env.PORT || 4000

const app:Application= express();
app.use(express.json())

app.use("/restaurants", restaurantsRouter)
app.use("/cuisines", cuisinesRouter)

app.use(errorHandler)
 

app.listen(PORT, ()=>{console.log(`Server started at port ${PORT}`)}).on("error",error=>{throw new Error(error.message)})