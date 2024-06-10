import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BotIcon } from "lucide-react";

export default function () {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-black border-none text-md">
        <div className="rounded-full bg-white text-black flex items-center justify-center w-7 h-7">
          <BotIcon className="h-4 w-4" />
        </div>
        <SelectValue placeholder="Select Group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
