"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Category from "@/components/groups/new/Category";
import Tags from "@/components/groups/new/Tags";
import { useState } from "react";
import { createNewGroup } from "@/actions/groups/newGroup";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import type { actionRes } from "@/types/serverActionResponse";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

export default function () {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>();
  const [tags, setTags] = useState<Tag[]>();

  async function handleSubmit() {
    const res:actionRes = await createNewGroup(title, description, category, tags);
    if (res.success) {
      router.push("/groups");
    } else {
      toast({
        title: "Error",
        variant: "destructive",
        description: res.message,
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Study Group</CardTitle>
        <CardDescription>
          Fill out the form to create a new study group.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            placeholder="Enter study group title"
          />
        </div>

        {/* Select category */}
        <Category setSelectedCategory={setCategory} />

        {/* Select Tags */}
        <Tags setTagsToSubmit={setTags} />

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            placeholder="Enter study group description"
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} type="submit" className="ml-auto">
          Create Study Group
        </Button>
      </CardFooter>
    </Card>
  );
}
