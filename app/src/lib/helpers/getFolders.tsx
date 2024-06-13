import { db } from "@/db/db";
import { Folder } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

export async function getFolders(groupID: string, parentFolderID: string) {

    const parentID = parseInt(parentFolderID) === 0 ? null : parseInt(parentFolderID)

    return db
        .select()
        .from(Folder)
        .where(
            and(
                eq(Folder.groupId, parseInt(groupID)),
                parentID ? eq(Folder.parentId, parentID) : isNull(Folder.parentId),
            )
        );
}
