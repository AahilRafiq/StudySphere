import { NextResponse, NextRequest } from "next/server";
import { Group, GroupTag, Tag, Category, UserGroup } from "@/db/schema";
import { db } from "@/db/db";
import { InferSelectModel, eq, not } from "drizzle-orm";
import { sql, inArray, and } from "drizzle-orm";
import { verifyToken } from "@/lib/auth/auth";
import { cookies } from "next/headers";

type TCategory = InferSelectModel<typeof Category>;
type TTag = InferSelectModel<typeof Tag>;
type IFilter = {
  category: TCategory[];
  tags: TTag[];
}

// API route handler
export async function GET(req: NextRequest, res: NextResponse) {
  
  const filters = req.nextUrl.searchParams.get("filters");
  const search = req.nextUrl.searchParams.get("query");
  
    if (!filters || search === undefined) {
      return NextResponse.json(
        { success: false, message: "Bad Request" },
        { status: 400 }
      );
    }
  
    const parsedFilters: IFilter = JSON.parse(filters as string);
    const searchString: string = search as string;
  
    const { data, success } = await findGroups(parsedFilters, searchString);
    if (!success)
      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
  
    return NextResponse.json(data, { status: 200 });
  }
  


/********* Function to find groups based on filters and search string *******/
async function findGroups(filters: IFilter, search: string) {
  const tagsIdArray = filters.tags.map((tag) => tag.id);
  const categoriesIdArray = filters.category.map((cat) => cat.id);
  const cookie = cookies().get("auth_token");

  try {
    const user = verifyToken(cookie.value);

    // Filter only not joined groups
    let q0 = q0notJoinedGroups(user.id);
    // Filter based on categories
    let q1 = q1withoutCategories();
    // Filter based on tags
    let q2 = q2withoutTags();
    if (categoriesIdArray.length > 0) q1 = q1withCategories(categoriesIdArray);
    if (tagsIdArray.length > 0) q2 = q2withTags(tagsIdArray);

    // Query returns group ids based on tags and categories filter
    let q3 = db
      .select({
        groupID: Group.id,
        groupName: Group.name,
      })
      .from(Group)
      .where(
        and(
          not(inArray(Group.id, db.select({ groupID: q0.groupID }).from(q0))),
          inArray(Group.id, db.select({ groupID: q1.groupID }).from(q1)),
          inArray(Group.id, db.select({ groupID: q2.groupID }).from(q2))
        )
      )
      .as("q3");

    // Filter groups based on q4 , and fuzzy search using trigram
    const q4 = await db
      .select()
      .from(Group)
      .$dynamic()
      .where(
        and(
          inArray(Group.id, db.select({ groupID: q3.groupID }).from(q3)),
          search.length
            ? sql`similarity(${Group.name}, ${search}::text) > 0.25`
            : undefined
        )
      )
      .leftJoin(Category, eq(Category.id, Group.categoryId))
      .limit(15);

    return { data: q4, success: true };
  } catch (err) {
    console.log(err);
    return { data: null, success: false };
  }
}

function q0notJoinedGroups(userID: number) {
  return db
    .select({
      groupID: UserGroup.groupId,
    })
    .from(UserGroup)
    .where(eq(UserGroup.userId, userID))
    .as("q0");
}
function q1withCategories(categoryIDs: number[]) {
  return db
    .select({
      groupID: Group.id,
    })
    .from(Group)
    .where(inArray(Group.categoryId, categoryIDs))
    .as("q1Categories");
}
function q1withoutCategories() {
  return db
    .select({
      groupID: Group.id,
    })
    .from(Group)
    .as("q1Categories");
}
function q2withTags(tagIDs: number[]) {
  return db
    .select({
      groupID: GroupTag.groupId,
    })
    .from(GroupTag)
    .where(inArray(GroupTag.tagId, tagIDs))
    .as("q2Tags");
}
function q2withoutTags() {
  return db
    .select({
      groupID: GroupTag.groupId,
    })
    .from(GroupTag)
    .as("q2Tags");
}

