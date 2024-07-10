import { Button } from "@/components/ui/button"
import { HomeIcon, UploadIcon } from "lucide-react"
import File from "@/components/files/File"
import Folder from "@/components/files/Folder"
import Link from "next/link"
import NewFolderModal from "@/components/files/NewFolderModal"
import UploadFileModal from "@/components/files/UploadFileModal"
import { getFolders } from "@/lib/helpers/getFolders"
import { getFiles } from "@/lib/helpers/getFiles"

interface IProps {
    params: {
        groupID: string
        folderID: string
    }
}

export default async function ({params}:IProps) {

    const folders = await getFolders(params.groupID, params.folderID)
    const files = await getFiles(params.groupID, params.folderID)    

    return (
        <div className="flex flex-col h-screen">
            <header className=" p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">

                    {/* Menu Buttons */}
                    <Link href={`/home/${params.groupID}/files/0`}>
                        <Button variant="ghost" size="icon">
                            <HomeIcon className="w-5 h-5" />
                            <span className="sr-only">Go Home</span>
                        </Button>
                    </Link>
                    <NewFolderModal parentFolderID={params.folderID} groupID={params.groupID}/>
                    <UploadFileModal folderID={params.folderID} groupID={params.groupID}/>

                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <span className="sr-only">Filter</span>
                    </Button>
                </div>
            </header>
            <div className="flex-1 overflow-auto p-4">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">

                    {/* File/Folder Cards */}
                    {folders.map(folder => {
                        return <Folder key={folder.id} folderName={folder.name} groupID={params.groupID} folderID={folder.id}/>
                    })}

                    {files.map(file => {
                        return <File key={file.id} fileName={file.name} fileUrl={file.url}/>
                    })}

                </div>
            </div>
        </div>
    )
}

