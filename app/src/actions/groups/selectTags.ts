"use server"
import { db } from "@/db/db";
import { Tag } from "@/db/schema";
import { like } from "drizzle-orm";
import { InferSelectModel } from "drizzle-orm";
import { actionRes } from "@/types/serverActionResponse";

type TTag = InferSelectModel<typeof Tag>;

export async function getExistingTags(str: string):Promise<actionRes<TTag[]>> {
  let res: actionRes<TTag[]> = {
    success: undefined,
    message: undefined,
    res: undefined,
  };
  const input = str.toLocaleLowerCase()

  try {
    const tags = await db
      .select()
      .from(Tag)
      .where(like(Tag.name, `%${input}%`))
      .limit(5)

    res.success = true;
    res.res = tags;
    return res;

  } catch (err) {
    console.log(err);
    res.success = false;
    res.message = "Internal server error";
    return res;
  }
}
