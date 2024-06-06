import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Dispatch, SetStateAction } from "react"

export default function ({ group }) {
  return (
    <Card key={group.id} className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-gray-500">
          {group.category}
        </div>
        <div className="text-sm font-semibold text-gray-500">
          {group.members} members
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{group.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {group.tags.map((tag) => (
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
