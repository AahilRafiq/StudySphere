"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { FilterIcon } from "lucide-react";
import { Category , Tag , Group } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import GroupCard from "@/components/groups/display/GroupCard";
import FilterModal from "@/components/groups/display/FilterModal";
import { findGroups } from "@/actions/groups/findGroups";
import { useToast } from "@/components/ui/use-toast";

type TCategory = InferSelectModel<typeof Category>
type TTag = InferSelectModel<typeof Tag>
type TGroup = InferSelectModel<typeof Group>
type DisplayGroup = {
    id: number,
    name: string,
    description: string,
    category: string,
}
interface IFilter {
    category: TCategory[],
    tags: TTag[],
}

export default function Component() {
  const [groups, setGroups] = useState<DisplayGroup[]>([]);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState<IFilter>({
    category:[],
    tags: [],
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const { toast } = useToast();

  useEffect(() => {
    findGroups(filters, query).then((res) => {
      if (res.success) {
        setGroups(
          res.res.map(({ Group, Category }) => {
            return {
              id: Group.id,
              name: Group.name,
              description: Group.description,
              category: Category.name,
            }
          })
        );
      } else {
        toast({
          title: "Error",
          description: res.message,
        });
      }
    });
  }, [filters, query])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Find Study Groups</h1>
        <Link href="/groups/new">
          <Button>Create Group</Button>
        </Link>
      </div>
      <div className="flex items-center mb-8">
        <div className="relative flex-1 mr-4">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search groups and press Enter..."
            className="pl-8"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDownCapture={(e) => {
              e.key === "Enter" && setQuery(searchInput);
            }}
          />
        </div>
        <Button 
          className="mr-3 p-1" 
          size="icon"
          onClick={() => setQuery(searchInput)}
        >
          <SearchIcon />
        </Button>
        <Button variant="outline" onClick={() => setIsFilterModalOpen(true)}>
          <FilterIcon className="mr-2 h-4 w-4" />
          <span className="hidden sm:block">Filters</span>
        </Button>
      </div>

      {/* Filters Modal */}
      {isFilterModalOpen && (
        <FilterModal
          isFilterModalOpen={isFilterModalOpen}
          setIsFilterModalOpen={setIsFilterModalOpen}
          setFilters={setFilters}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Group Cards */}
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
