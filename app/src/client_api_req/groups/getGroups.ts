import { Tag, Category , Group } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { TApiResponse } from "@/lib/helpers/apiRequestHelpers";

type TCategory = InferSelectModel<typeof Category>;
type TTag = InferSelectModel<typeof Tag>;
type TGroup = InferSelectModel<typeof Group>;
type IFilter = {
  category: TCategory[];
  tags: TTag[];
}
type TResponse = {
    Category: TCategory
    Group: TGroup
}[]

export async function findGroups(filters: IFilter, query: string):Promise<TApiResponse<TResponse>> {
    
    try {
        const res = await fetch(`/api/groups?filters=${JSON.stringify(filters)}&query=${query}`);
        const data:TResponse = await res.json();
        return { success: true, res: data };
    } catch {
        return { success: false, err: "Internal Server Error"};
    }
}