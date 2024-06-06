import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import { Category as CategorySchema , Tag as TagSchema } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import CategoryDropdown from "@/components/groups/display/CategoryDropdown"
import TagsDropdown from "@/components/groups/display/TagsDropdown"

type TCategory = InferSelectModel<typeof CategorySchema>
type TTag = InferSelectModel<typeof TagSchema>
interface IFilter {
    category: TCategory[],
    tags: TTag[],
}
interface Iprops {
    isFilterModalOpen: boolean,
    setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
    setFilters: Dispatch<SetStateAction<IFilter>>
}

export default function({ isFilterModalOpen, setIsFilterModalOpen , setFilters}:Iprops) {

    const [categories, setCategories] = useState<TCategory[]>([])
    const [tags, setTags] = useState<TTag[]>([])

    useEffect(() => {
        setFilters({
            category: categories,
            tags: tags
        })
    }
    , [categories, tags])

    return(
        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
              <DialogDescription>Select categories and tags to filter the groups.</DialogDescription>
            </DialogHeader>

            {/* Filter by categories */}
            <CategoryDropdown setCategoriesToSubmit={setCategories} />
                
            {/* Filter by tags */}  
            <TagsDropdown setTagsToSubmit={setTags} />

          </DialogContent>
        </Dialog>
    )
}