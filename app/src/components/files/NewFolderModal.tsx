'use client'

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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FolderPlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface IProps {
    parentFolderID: string
}

export default function ({parentFolderID}:IProps) {

    const [folderName, setFolderName] = useState("")

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>

                <Button variant="ghost" size="icon">
                    <FolderPlusIcon className="w-5 h-5" />
                    <span className="sr-only">New Folder</span>
                </Button>

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Enter Folder Name</AlertDialogTitle>
                    <AlertDialogDescription>
                        <Input onChange={e=>setFolderName(e.target.value)} placeholder="Folder Name" />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
