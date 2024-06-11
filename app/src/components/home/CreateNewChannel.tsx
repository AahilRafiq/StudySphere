"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createNewChannel } from "@/actions/home/createChannel";
import { useRouter, useParams } from "next/navigation";

export default function () {
  const params = useParams();
  const router = useRouter();
  const [name, setName] = useState("");

  const groupID = Array.isArray(params.groupID)
    ? null
    : parseInt(params.groupID);

  async function handleCreate() {
    await createNewChannel(groupID, name);
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-24" size="sm">
          <PlusIcon className="h-4 w-4 mr-1" />
          New
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter Channel Name</AlertDialogTitle>
          <AlertDialogDescription>
            <Input placeholder="Enter name" onChange={(e) => setName(e.target.value)}></Input>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreate}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
