import { TApiResponse } from "@/lib/helpers/apiRequestHelpers";

export async function getMemberCount(groupID:string):Promise<TApiResponse<number>> {

    try {
        const res = await fetch(`/api/groups/membercount/${groupID}`)
        const memberCount = await res.json()
        return {res:memberCount , success:true}
    } catch(err) {
        console.log(err.message);
        return {res: null , success:false}
    }
    
}