import { createClient, RedisClientType } from "redis";

// Initialize the client
let client: RedisClientType |null= null;

export async function initializeRedisClient(){
    if(!client){
        client= createClient();
        client.on("error", (error)=>{
            console.error("Redis client error:", error);
        });

        client.on("connect", ()=>{
            console.log("Redis client connected");
        });
        
        await client.connect();
    }
    return client;
}
