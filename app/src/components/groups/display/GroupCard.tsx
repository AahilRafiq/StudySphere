'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGroupTags } from "@/client-requets/tags/getGroupTags";
import { getMemberCount } from "@/client-requets/groups/getMemberCount";
import { useState , useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { joinGroup } from "@/actions/groups/joinGroup";
import { useRouter } from "next/navigation";

export default function ({ group }) {

  const { toast } = useToast();
  const [membersCount, setMembersCount] = useState<number | undefined>(undefined)
  const [tags, setTags] = useState<string[] | undefined>(undefined)
  const router = useRouter()

  async function handleJoin() {
    const res = await joinGroup(group.id)
    if(res.success) router.push('/home')
    else toast({
      title: "Error",
      description: res.message
    })
  }

  useEffect(() => {
    getMemberCount(group.id).then(res => {
      if (res.success) setMembersCount(res.res)
      else toast({
        title: "Error",
        description: 'Internal Server Error'
      })
    })
    getGroupTags(group.id).then(res => {
      if (res.success) setTags(res.res)
      else toast({
        title: "Error",
        description: 'Internal Server Error'
      })
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
        <Button onClick={handleJoin} className="w-full">Join</Button>
      </div>
    </Card>
  );
}
