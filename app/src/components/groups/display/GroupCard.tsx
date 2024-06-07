import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Dispatch, SetStateAction } from "react"
import { getMembersCount } from "@/actions/groups/getMembersCount";
import { getGroupTags } from "@/actions/groups/getGroupTags";
import { useState , useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function ({ group }) {

  const { toast } = useToast();
  const [membersCount, setMembersCount] = useState<number | undefined>(undefined)
  const [tags, setTags] = useState<string[] | undefined>(undefined)

  useEffect(() => {
    getMembersCount(group.id).then(res => {
      if(res.success) {
        setMembersCount(res.res)
      } else {
        toast({
          title: "Error",
          description: res.message
        })
      }
    })
    getGroupTags(group.id).then(res => {
      if(res.success) {
        setTags(res.res)
      } else {
        toast({
          title: "Error",
          description: res.message
        })
      }
    }
    )
  }, [])

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-gray-500">
          {group.category}
        </div>
        <div className="text-sm font-semibold text-gray-500">
          {membersCount} members
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{group.name}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag) => (
          <div>{tag}</div>
        ))}
      </div>
      <p className="text-gray-500">{group.description}</p>
      <div className="mt-4">
        <Button className="w-full">Join</Button>
      </div>
    </Card>
  );
}
