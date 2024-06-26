import { FileIcon } from "lucide-react";
import Link from "next/link";

export default function({fileName , fileUrl}:{fileName:string, fileUrl:string}) {

    const trimmedFileName = fileName.length > 12 ? fileName.substring(0, 12) + "..." : fileName;

    return(
        <a href={fileUrl} className="bg-white dark:bg-gray-900 rounded-md shadow-sm p-4 flex items-center gap-2">
            <FileIcon className="w-5 h-5 text-blue-500" />
            <span className="font-medium">{trimmedFileName}</span>
          </a>
    )
}