"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog,DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter,} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { FilterIcon } from "lucide-react";
import { Category , Tag } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import GroupCard from "@/components/groups/display/GroupCard";
import FilterModal from "@/components/groups/display/FilterModal";

type TCategory = InferSelectModel<typeof Category>
type TTag = InferSelectModel<typeof Tag>

interface IFilter {
    category?: TCategory,
    tags: TTag[],
}

export default function Component() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<IFilter>({
    category:undefined,
    tags: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Find Study Groups</h1>
        <Button>Create Group</Button>
      </div>
      <div className="flex items-center mb-8">
        <div className="relative flex-1 mr-4">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search groups..."
            className="pl-8"
          />
        </div>
        <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filters Modal */}
      {isFilterModalOpen && (
        <FilterModal
          isFilterModalOpen={isFilterModalOpen}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Group Cards */}
        {/* {groups.map((group) => (
          <GroupCard group={group} />
        ))} */}
      </div>
    </div>
  );
}