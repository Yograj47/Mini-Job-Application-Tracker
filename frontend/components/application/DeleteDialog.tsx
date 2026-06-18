"use client";

import { AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isDeleting?: boolean;
}

export default function DeleteDialog({
    isOpen,
    onClose,
    onConfirm,
    isDeleting = false,
}: DeleteDialogProps) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md rounded-lg">
                <AlertDialogHeader>
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-2">
                        <AlertTriangle size={20} />
                    </div>
                    
                    <AlertDialogTitle className="text-xl font-bold text-gray-900">
                        Delete Application
                    </AlertDialogTitle>
                    
                    <AlertDialogDescription className="text-gray-500 text-sm">
                        Are you sure you want to delete this job application? This action cannot be undone and the record will be permanently removed.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-4 gap-2">
                    <AlertDialogCancel 
                        disabled={isDeleting}
                        className="rounded-md"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isDeleting}
                        className="rounded-md bg-red-600 hover:bg-red-700 text-white font-medium"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}