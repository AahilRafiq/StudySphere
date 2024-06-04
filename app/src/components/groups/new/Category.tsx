import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"
import { getExistingCategories } from "@/actions/groups/selectCategory"

export default function () {

    const [query , setQuery] = useState<string>('')
    const [catergories , setCategories] = useState<string[]>()

    async function handleQuery(e:ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if(query.length < 3) return

        const res = await getExistingCategories(query)
        setCategories(res.map(categoryObj => categoryObj.category))
    }

    return(
        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Existing Categories</SelectLabel>

                <SelectItem value="select">Select</SelectItem>
                {catergories?.map(category => {
                    return <SelectItem value={category}>{category}</SelectItem>
                })}

              </SelectGroup>
              <Separator />
              <SelectGroup>
                <SelectLabel>Create New</SelectLabel>
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Input onChange={handleQuery} placeholder="New category name" />
                    <Button size="sm">Create</Button>
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    )
}