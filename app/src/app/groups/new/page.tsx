"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Category from "@/components/groups/new/Category"
import Tags from "@/components/groups/new/Tags"

export default function() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Study Group</CardTitle>
        <CardDescription>Fill out the form to create a new study group.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter study group title" />
        </div>
        
        {/* Select category */}
        <Category/>

        {/* Select Tags */}
        <Tags/>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter study group description" className="min-h-[100px]" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="num-people">Number of People</Label>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              -
            </Button>
            <Input id="num-people" type="number" min="1" max="100" className="w-20 text-center" />
            <Button variant="outline" size="sm">
              +
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Create Study Group
        </Button>
      </CardFooter>
    </Card>
  )
}