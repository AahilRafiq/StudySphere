'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { useState , useEffect , ChangeEvent, Dispatch, SetStateAction } from "react"
import { getExistingTags } from "@/actions/groups/selectTags"
import { useToast } from "@/components/ui/use-toast"
import { Tag } from "@/db/schema"
import { InferInsertModel } from "drizzle-orm"

type TTag = InferInsertModel<typeof Tag>

export default function({setTagsToSubmit}:{setTagsToSubmit: Dispatch<SetStateAction<TTag[]>>}) {

    const {toast} = useToast()
    const [query , setQuery] = useState('')
    const [tags , setTags] = useState<TTag[]>([])
    const [selectedTags , setSelectedTags] = useState<TTag[]>([])

    useEffect(() => {
        async function handleQuery() {
            const res = await getExistingTags(query)
            if(res.success) {
              setTags(res.res)
            } else {
              toast({
                title: 'Error',
                description: res.message,
                variant: 'destructive',
                duration: 3000
              })
            }
        }
        handleQuery()
    },[query])

    async function handleQuery(e:ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value)
        if(query.length !== 0 && query.length < 1) return

        const res = await getExistingTags(query)
        if(res.success) {
          setTags(res.res)
        } else {
          toast({
            title: 'Error',
            description: res.message,
            variant: 'destructive',
            duration: 3000
          })
        }
    }

    function handleSelection(id: number) {
        const selectedTag = tags.find(tag => tag.id === id)
        if(selectedTags.find(tag => tag.id === selectedTag.id)) return
        const newSelectedTags = [...selectedTags , selectedTag]
        setTagsToSubmit(newSelectedTags)
        setSelectedTags(newSelectedTags)
    }

    function handleRemoveTag(id:number) {
        const newSelectedTags = selectedTags.filter(tag => tag.id !== id)
        setTagsToSubmit(newSelectedTags)
        setSelectedTags(newSelectedTags)
    }

    return(
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2">

            {/* Selected tags */}

            {selectedTags?.map(tag => {
                return <SelectedTag key={tag.id} id={tag.id} handleRemoveTag={handleRemoveTag} name={tag.name}/>
            })}

          </div>
          <Select >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="flex flex-col">

                {/* Display tags */}
                {tags.map(tag => {
                  return <DisplayTag key={tag.id} id={tag.id} handleSelection={handleSelection} name={tag.name}/>
                })}

              </SelectGroup>
              <Separator />
              <SelectGroup>

                {/* Search for tags */}
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Input onChange={handleQuery} placeholder="Search" />
                  </div>
                </div>

              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    )
}

interface SelectedTagProps {
    id: number,
    name: string,
    handleRemoveTag:(id:number)=>void
}

function SelectedTag({id , name , handleRemoveTag}:SelectedTagProps) {
    return(
        <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full flex items-center gap-2">
          <span className="text-sm">{name}</span>
          <button onClick={()=>handleRemoveTag(id)} className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50">
            <XIcon className="h-4 w-4" />
          </button>
        </div>
    )
}

interface DisplayTagProps {
  id: number,
  name: string,
  handleSelection:(id:number)=>void
}
function DisplayTag({id , name , handleSelection}:DisplayTagProps) {
    return <span className="ml-4"><Button variant="ghost" value={name} onClick={()=>handleSelection(id)}>{name}</Button></span>
}

