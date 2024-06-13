"use server";
import { db } from "@/db/db";
import { Folder, User, UserGroup } from "@/db/schema";
import { cookies } from "next/headers";
import { actionResponseObj } from "@/lib/helpers/actionResHelpers";
import { getFirstRecord } from "@/db/helpers/getFirstRecord";
import { verifyToken } from "@/lib/auth/auth";
import { eq, and } from "drizzle-orm";

export async function createNewFolder(
    groupID: string,
    parentFolderID: string,
    folderName: string
) {
    const token = cookies().get("auth_token");
    if (!token) return actionResponseObj(false, "Unauthorized");

    try {
        const user = verifyToken(token.value);
        if (!user) return actionResponseObj(false, "Invalid Token");

        // Check if the user is a member of the group
        const userGroup = getFirstRecord(
            await db
                .select()
                .from(UserGroup)
                .where(
                    and(
                        eq(UserGroup.userId, user.id),
                        eq(UserGroup.groupId, parseInt(groupID))
                    )
                )
        );

        if (!userGroup)
            return actionResponseObj(false, "You Dont have access to this group");

        await db.insert(Folder).values({
            name: folderName,
            parentId: parseInt(parentFolderID)==0 ? null : parseInt(parentFolderID),
            groupId: parseInt(groupID),
        });

        return actionResponseObj(true, "Folder Created");
    } catch (err) {
        console.log(err);
        return actionResponseObj(false, "Internal Server Error");
    }
}
