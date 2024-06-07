'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"
import { useState , useEffect , ChangeEvent, Dispatch, SetStateAction } from "react"
import { getExistingCategories } from "@/actions/groups/selectCategory"
import { useToast } from "@/components/ui/use-toast"
import { Category } from "@/db/schema"
import { InferInsertModel } from "drizzle-orm"

type TCategory = InferInsertModel<typeof Category>

export default function({setCategoriesToSubmit}:{setCategoriesToSubmit: Dispatch<SetStateAction<TCategory[]>>}) {

    const {toast} = useToast()
    const [query , setQuery] = useState('')
    const [categories , setCategories] = useState<TCategory[]>([])
    const [selectedCategories , setSelectedCategories] = useState<TCategory[]>([])

    useEffect(() => {
        async function handleQuery() {
            const res = await getExistingCategories(query)
            if(res.success) {
              setCategories(res.res)
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
    } , [query])


    function handleSelection(id: number) {
      const selectedCategory = categories.find(category => category.id === id)
      if(selectedCategories.find(category => category.id === selectedCategory.id)) return
      const newSelectedCategories = [...selectedCategories , selectedCategory]
      setCategoriesToSubmit(newSelectedCategories)
      setSelectedCategories(newSelectedCategories)
    }

    function handleRemoveCategory(id:number) {
      const newSelectedCategories = selectedCategories.filter(category => category.id !== id)
      setCategoriesToSubmit(newSelectedCategories)
      setSelectedCategories(newSelectedCategories)
    }

    return(
        <div className="space-y-2">
          <Label htmlFor="categories">Categories</Label>
          <div className="flex flex-wrap gap-2">

            {/* Selected categories */}

            {selectedCategories?.map(category => {
                return <SelectedCategory key={category.id} id={category.id} handleRemoveCategory={handleRemoveCategory} name={category.name}/>
            })}

          </div>
          <Select >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="flex flex-col">

                {/* Display categories */}
                {categories.map(category => {
                  return <DisplayCategory key={category.id} id={category.id} handleSelection={handleSelection} name={category.name}/>
                })}

              </SelectGroup>
              <Separator />
              <SelectGroup>

                {/* Search for a Category */}
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Input onChange={e=>setQuery(e.target.value)} placeholder="Search" />
                  </div>
                </div>

              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    )
}

interface SelectedCategoryProps {
    id: number,
    name: string,
    handleRemoveCategory:(id:number)=>void
}

function SelectedCategory({id , name , handleRemoveCategory}:SelectedCategoryProps) {
    return(
        <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full flex items-center gap-2">
          <span className="text-sm">{name}</span>
          <button onClick={()=>handleRemoveCategory(id)} className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50">
            <XIcon className="h-4 w-4" />
          </button>
        </div>
    )
}

interface DisplayCategoryProps {
  id: number,
  name: string,
  handleSelection:(id:number)=>void
}
function DisplayCategory({id , name , handleSelection}:DisplayCategoryProps) {
    return <span className="ml-4"><Button variant="ghost" value={name} onClick={()=>handleSelection(id)}>{name}</Button></span>
}
