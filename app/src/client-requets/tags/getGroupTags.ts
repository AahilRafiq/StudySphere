import { TApiResponse } from "@/lib/helpers/apiRequestHelpers";

export async function getGroupTags(groupID:string):Promise<TApiResponse<string[]>> {

    try {
        const res = await fetch(`/api/tags/${groupID}`)
        const tags = await res.json()
        return {res:tags , success:true}
    } catch(err) {
        console.log(err.message);
        return {res: null , success:false}
    }
    
}