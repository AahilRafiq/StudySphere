import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChangeEvent, useState } from "react"
import { getExistingCategories } from "@/actions/groups/selectCategory"

interface Category {
    id: number,
    name: string
}

export default function () {

    const [query , setQuery] = useState<string>('')
    const [catergories , setCategories] = useState<Category[]>([])

    async function handleQuery(e:ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if(query.length !== 0 && query.length < 3) return

        const res = await getExistingCategories(query)
        setCategories(res)
    }

    return(
        <div className="space-y-2">
          <Label>Category</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Existing Categories</SelectLabel>

                {catergories?.map(category => {
                    return <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                })}

              </SelectGroup>
              <Separator />
              <SelectGroup>
                <SelectLabel>Create New</SelectLabel>
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Input onChange={handleQuery} placeholder="Search or create new" />
                    <Button size="sm">Create</Button>
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    )
}