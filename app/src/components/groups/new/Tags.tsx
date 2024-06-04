'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { useState , ChangeEvent } from "react"
import { getExistingTags } from "@/actions/groups/selectTags"

interface Tag {
    id: number,
    name: string
}

export default function() {

    const [query , setQuery] = useState('')
    const [tags , setTags] = useState<Tag[]>([])

    async function handleQuery(e:ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if(query.length !== 0 && query.length < 2) return

        const res = await getExistingTags(query)
        setTags(res)
    }

    return(
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2">

            {/* Inidivdual tag */}
            <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full flex items-center gap-2">
              <span className="text-sm">Study</span>
              <button className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50">
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
              <span className="text-sm">Group</span>
              <button className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2">
              <span className="text-sm">Learning</span>
              <button className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50">
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Existing Tags</SelectLabel>

                {/* Display tags */}
                {tags.map(tag => {
                    return <SelectItem key={tag.id} value={tag.name}>{tag.name}</SelectItem>
                })}

              </SelectGroup>
              <Separator />
              <SelectGroup>

                {/* Create a new Tag */}
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