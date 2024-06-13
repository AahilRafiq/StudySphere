"use client";

import {
    AlertDialog,
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
import { upload } from '@vercel/blob/client';
import { useToast } from "@/components/ui/use-toast";
import { displayToast , displayNormalToast } from "@/lib/helpers/actionResHelpers";
import { addFileDetailsInDB } from "@/actions/files/addFileDetailDB";

interface IProps {
    folderID: string;
    groupID: string;
}

export default function ({ folderID , groupID}: IProps) {
    const [fileName, setFileName] = useState("");
    const {toast} = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUploadClick = async () => {
        if (selectedFile) {

            const fileExtension = getFileExtention(selectedFile.name);

            // file size limit is 10MB
            if(selectedFile.size > 1024 * 1024 * 10) {
                alert("File size limit is 10MB");
                return;
            }

            try {
                displayNormalToast(toast ,'Uploading', 'Please wait while we upload the file');
                const {downloadUrl} = await upload(fileName+fileExtension, selectedFile, {
                    access: 'public',
                    handleUploadUrl: '/api/file/upload',
                });

                const res = await addFileDetailsInDB(fileName+'.'+fileExtension , 'gg' , folderID , groupID);
                if(res.success) {
                    displayNormalToast(toast ,'Success', 'File Uploaded Successfully');
                } else {
                    displayToast(toast , res.err);
                }

            } catch(err) {
                console.log(err);
                displayToast(toast , "Error while uploading file");
            }


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
                    <AlertDialogTitle>Upload a file (10mb max size)</AlertDialogTitle>
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