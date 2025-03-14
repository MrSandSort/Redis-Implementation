export function getKeyName(...args:string[]){
    return `bites:${args.join(":")}`
}
 
export const restaurantById=(id:string)=> getKeyName("restaurants", id)
export const reviewById=(id:string)=> getKeyName("reviews",id)
export const reviewDetailsById=(id:string)=> getKeyName("review_details",id)
