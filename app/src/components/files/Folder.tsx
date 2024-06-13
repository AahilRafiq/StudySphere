import { FolderIcon } from "lucide-react";

export default function ({folderName}:{folderName:string}) {

    const trimmedFolderName = folderName.length > 12 ? folderName.substring(0, 12) + "..." : folderName;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2">
            <FolderIcon className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">{trimmedFolderName}</span>
        </div>
    )
}