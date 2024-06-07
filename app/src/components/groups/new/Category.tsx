"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Category } from "@/db/schema"
import { Button } from "@/components/ui/button"
import { ChangeEvent, Dispatch, SetStateAction, useState , useEffect } from "react"
import { getExistingCategories } from "@/actions/groups/selectCategory"
import { createNewCategory } from "@/actions/groups/newCategory"
import { useToast } from "@/components/ui/use-toast"
import { InferInsertModel } from "drizzle-orm"

type TCategory = InferInsertModel<typeof Category>

export default function ({setSelectedCategory}:{setSelectedCategory:Dispatch<SetStateAction<TCategory>>}) {

    const {toast} = useToast()
    const [query , setQuery] = useState<string>('')
    const [catergories , setCategories] = useState<TCategory[]>([])

    useEffect(() => {
        async function getCategories() {
            const res = await getExistingCategories(query)
            if(res.success) {
              setCategories(res.res)
            } else {
              toast({
                title: 'Error',
                variant: 'destructive',
                description: res.message
              })
            }
        }
        getCategories()
    }
    , [query])

    async function handleCreate() {
        if(query.length === 0) return
        const res = await createNewCategory(query)
        if(res.success) {
          setCategories([res.res])
        } else {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: res.message
          })
        }
    }

    function handleSelection(value: string) {
      const categoryID = parseInt(value)
      const selectedCategory = catergories.find(category => category.id === categoryID)
      setSelectedCategory(selectedCategory)
    }

    return(
        <div className="space-y-2">
          <Label>Category</Label>
          <Select onValueChange={value => handleSelection(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Existing Categories</SelectLabel>

                {catergories?.map(category => {
                    return <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                })}

              </SelectGroup>
              <Separator />
              <SelectGroup>
                <SelectLabel>Create New</SelectLabel>
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Input onChange={e=>setQuery(e.target.value)} placeholder="Search or create new" />
                    <Button onClick={handleCreate} size="sm">Create</Button>
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    )
}