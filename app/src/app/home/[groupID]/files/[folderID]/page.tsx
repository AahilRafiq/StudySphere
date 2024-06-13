import { Button } from "@/components/ui/button"
import { HomeIcon, UploadIcon } from "lucide-react"
import File from "@/components/files/File"
import Folder from "@/components/files/Folder"
import Link from "next/link"
import NewFolderModal from "@/components/files/NewFolderModal"
import UploadFileModal from "@/components/files/UploadFileModal"

interface IProps {
    params: {
        groupID: string
        folderID: string
    }
}

export default async function ({params}:IProps) {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-100 dark:bg-gray-950 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">

                    {/* Menu Buttons */}
                    <Link href={`/home/${params.groupID}/files/0`}>
                        <Button variant="ghost" size="icon">
                            <HomeIcon className="w-5 h-5" />
                            <span className="sr-only">Go Home</span>
                        </Button>
                    </Link>
                    <NewFolderModal parentFolderID={params.folderID}/>
                    <UploadFileModal folderID={params.folderID} />

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

                    <Folder folderName="Damnasdfasdfasdf" />
                    <File fileName="image.jpg" />

                </div>
            </div>
        </div>
    )
}

