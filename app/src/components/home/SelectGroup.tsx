"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getGroups } from "@/actions/home/getGroups";
import { displayToast } from "@/lib/helpers/actionResHelpers";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
interface IGroup {
  id: number;
  name: string;
}

export default function () {
  const {toast} = useToast()
  const router = useRouter()
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    getGroups().then((res) => {
      if(res.success) setGroups(res.res)
      else displayToast(toast,res.err)
    })
  },[])

  function handleSelection(val: string) {
    const groupID = parseInt(val)
    router.push(`/home/${groupID}`)
  }

  return (
    <Select onValueChange={handleSelection}>
      <SelectTrigger className="w-[180px] text-neutral-50 bg-transparent border-none text-md">
        <div className="rounded-full bg-white text-black flex items-center justify-center w-7 h-7">
          <BotIcon className="h-4 w-4" />
        </div>
        <SelectValue placeholder="Select Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>

          {groups.map(group => {
            return <SelectItem key={group.id} value={group.id.toString()}>{group.name}</SelectItem>
          })}

        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
