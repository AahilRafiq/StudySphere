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
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadIcon } from "lucide-react";

interface IProps {
    folderID: string;
}

export default function ({ folderID }: IProps) {
    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (selectedFile) {

            const fileExtension = getFileExtention(selectedFile.name);

            alert(`Selected file: ${selectedFile.name} , ${fileExtension}`);
        } else {
            alert("No file selected");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <UploadIcon className="w-5 h-5" />
                    <span className="sr-only">Upload</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Upload a file</AlertDialogTitle>
                    <AlertDialogDescription>
                        <div className="sm:max-w-[425px]">
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="file">File</Label>
                                    <Input id="file" type="file" onChange={handleFileChange} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="fileName">File Name</Label>
                                    <Input
                                        onChange={(e) => setFileName(e.target.value)}
                                        id="fileName"
                                        placeholder="Enter a name for the file"
                                    />
                                </div>
                            </div>
                            <div>
                                <Button
                                    className="mt-2"
                                    type="button"
                                    onClick={handleUploadClick}
                                >
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function getFileExtention(fileName: string) {
    // read from behind till a dot is found
    const dotIndex = fileName.lastIndexOf(".");
    if (dotIndex === -1) {
        return "";
    }
    return fileName.substring(dotIndex + 1);
}