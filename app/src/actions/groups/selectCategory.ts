"use server";
import { db } from "@/db/db";
import { Category } from "@/db/schema";
import { like } from "drizzle-orm";
import type { actionRes } from "@/types/serverActionResponse";
import { InferSelectModel } from "drizzle-orm";

type TCategory = InferSelectModel<typeof Category>;

export async function getExistingCategories(str: string): Promise<actionRes<TCategory[]>> {

  let res: actionRes<TCategory[]> = {
    success: undefined,
    message: undefined,
    res: undefined,
  };

  try {
    const input = toTitleCase(str);
    const categories = await db
      .select()
      .from(Category)
      .where(like(Category.name, `%${input}%`))
      .limit(5);

    res.success = true;
    res.res = categories;
    return res
    
  } catch (err) {
    console.log(err);
    res.success = false;
    res.message = "Internal server error";
    return res;
  }
}

function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}
