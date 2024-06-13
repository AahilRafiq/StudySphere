import { db } from "@/db/db";
import { File } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

export async function getFiles(groupID: string, parentFolderID: string) {

    const parentID = parseInt(parentFolderID) === 0 ? null : parseInt(parentFolderID)

    return db
        .select()
        .from(File)
        .where(
            and(
                eq(File.groupId, parseInt(groupID)),
                parentID ? eq(File.folderId, parentID) : isNull(File.folderId),
            )
        );
}
