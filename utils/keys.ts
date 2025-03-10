export function getKeyName(...args:string[]){
    return `bites:${args.join(":")}`
}
 
export const restaurantById=(id:string)=> getKeyName("restaurants", id)
