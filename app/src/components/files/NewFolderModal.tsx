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
import { createNewFolder } from "@/actions/files/createNewFolder"
import { useToast } from "@/components/ui/use-toast"
import { displayToast } from "@/lib/helpers/actionResHelpers"
import { useRouter } from "next/navigation"

interface IProps {
    groupID: string
    parentFolderID: string
}

export default function ({parentFolderID , groupID}:IProps) {

    const {toast} = useToast()
    const router = useRouter()
    const [folderName, setFolderName] = useState("")

    async function handleCreateFolder(){
        const res = await createNewFolder(groupID, parentFolderID, folderName)
        if(res.success){
            router.refresh()
        }else{
            displayToast(toast, res.err)
        }
    }

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
                    <AlertDialogAction onClick={handleCreateFolder}>Create</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
