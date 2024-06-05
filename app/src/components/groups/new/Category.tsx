"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { getExistingCategories } from "@/actions/groups/selectCategory"
import { createNewCategory } from "@/actions/groups/newCategory"
import { useToast } from "@/components/ui/use-toast"
interface Category {
    id: number,
    name: string
}

export default function ({setSelectedCategory}:{setSelectedCategory:Dispatch<SetStateAction<Category>>}) {

    const {toast} = useToast()
    const [query , setQuery] = useState<string>('')
    const [catergories , setCategories] = useState<Category[]>([])

    async function handleQuery(e:ChangeEvent<HTMLInputElement>) {
        setQuery(e.currentTarget.value)
        if(query.length !== 0 && query.length < 3) return

        const res = await getExistingCategories(query)
        setCategories(res)
    }

    async function handleCreate() {
        if(query.length === 0) return
        const res = await createNewCategory(query)
        if(res !== null) {
          setCategories([res])
        } else {
          toast({
            title: 'Error',
            variant: 'destructive',
            description: 'Category already exists'
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
                    <Input onChange={handleQuery} placeholder="Search or create new" />
                    <Button onClick={handleCreate} size="sm">Create</Button>
                  </div>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
    )
}