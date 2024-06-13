'use server'

import { db } from "@/db/db"
import { File } from "@/db/schema"
import { actionResponseObj } from "../../lib/helpers/actionResHelpers"

export async function addFileDetailsInDB(filename:string , downloadUrl:string , folderID:string , groupID:string) {
    
    try {
        await db.insert(File).values({
            name: filename,
            url: downloadUrl,
            folderId: parseInt(folderID) == 0 ? null : parseInt(folderID),
            groupId: parseInt(groupID)
        })

        return actionResponseObj(true , "File added successfully");
    } catch(err) {
        console.log(err)
        return actionResponseObj(false , "Error while adding file details in DB");
    }
}