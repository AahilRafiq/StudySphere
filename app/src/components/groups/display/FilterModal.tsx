import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

interface Iprops {
    isFilterModalOpen: boolean,
    setIsFilterModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function({ isFilterModalOpen, setIsFilterModalOpen}:Iprops) {
    return(
        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
              <DialogDescription>Select categories and tags to filter the groups.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="text-sm font-semibold mb-2">Category</h3>
                <Input
                  type="search"
                  placeholder="Search categories..."
                  className="mb-2"
                />
                <div />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Tags</h3>
                <Input
                  type="search"
                  placeholder="Search tags..."
                  className="mb-2"
                />
                <div />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsFilterModalOpen(false)}>
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    )
}