import { FileIcon } from "lucide-react";

export default function({fileName}:{fileName:string}) {

    const trimmedFileName = fileName.length > 12 ? fileName.substring(0, 12) + "..." : fileName;

    return(
        <div className="bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2">
            <FileIcon className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{trimmedFileName}</span>
          </div>
    )
}