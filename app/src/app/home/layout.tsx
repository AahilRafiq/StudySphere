"use client";
import Sidebar from "@/components/home/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-[calc(100vh-4rem)] w-full">
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        ><Ellipsis />
        
        </Button>
      <div
        className={`bg-gray-950 md:rounded-r-lg flex flex-col gap-2  ${
          isSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
        />
      </div>
      {children}
    </div>
  );
}
