'use server'
import { Group , GroupTag , Tag , Category } from "@/db/schema";
import { db } from "@/db/db";
import { InferSelectModel, like } from "drizzle-orm";
import { sql , inArray , and} from "drizzle-orm";
import { actionRes } from "@/types/serverActionResponse";

type TCategory = InferSelectModel<typeof Category>
type TTag = InferSelectModel<typeof Tag>
type TGroup = InferSelectModel<typeof Group>
interface IFilter {
    category: TCategory[],
    tags: TTag[],
}

export async function findGroups(filters:IFilter , search:string):Promise<actionRes<TGroup[]>> {

    let res:actionRes<TGroup[]> = {
        success: undefined,
        message: undefined,
        res: undefined
    }
    const tagsIdArray = filters.tags.map(tag => tag.id)
    const categoriesIdArray = filters.category.map(cat => cat.id)    

    try {

        let q1 = q1withoutCategories()
        let q2 = q2withoutTags()
        if(categoriesIdArray.length > 0) q1 = q1withCategories(categoriesIdArray)
        if(tagsIdArray.length > 0) q2 = q2withTags(tagsIdArray)

        let q3 = db
            .select({
                groupID : Group.id,
                groupName: Group.name
            })
            .from(Group)
            .where(and(
                    inArray(Group.id , db.select({groupID : q1.groupID}).from(q1)),
                    inArray(Group.id , db.select({groupID : q2.groupID}).from(q2))
                )
            ).as('q3')

        let q4 = await db
          .select()
          .from(Group)
          .where(
            and(
                inArray(Group.id, db.select({ groupID: q3.groupID }).from(q3)),
                // use fuzzy search here
            )
          );

        res.success = true
        res.res = q4
        return res
    } catch(err) {
        console.log(err);
        res.success = false
        res.message = 'Internal Server Error'
        return res
    }
}

function q1withCategories(categoryIDs: number[]) {
    return db.select({
        groupID:Group.id
    }).from(Group).where(inArray(Group.categoryId , categoryIDs)).as('q1Categories')
}
function q1withoutCategories() {
    return db.select({
        groupID:Group.id
    }).from(Group).as('q1Categories')
}
function q2withTags(tagIDs: number[]) {
    return db.select({
        groupID:GroupTag.groupId
    }).from(GroupTag).where(inArray(GroupTag.tagId , tagIDs)).as('q2Tags')
}
function q2withoutTags() {
    return db.select({
        groupID:GroupTag.groupId
    }).from(GroupTag).as('q2Tags')
}


// try {
//     const q1 = db.select({ field1: GroupTag.groupId })
//         .from(GroupTag)
//         .where(inArray(GroupTag.tagId, filters.tags.map(tag => tag.id)))
//         .as('q1');

//     const groups = await db.select()
//                    .from(Group)
//                    .where(inArray(Group.id, db.select({ field1: q1.field1 }).from(q1)));

//     res.success = true
//     res.res = groups
