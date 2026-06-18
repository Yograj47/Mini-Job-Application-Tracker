"use client";

import Link from "next/link";
import { useState } from "react";
import { ApplicationData } from "@/types/application";
import DeleteDialog from "./DeleteDialog";
import { applicationService } from "@/services/application.service";
import { toast } from "sonner";
import StatusBadge from "./StatusBadge";

interface ApplicationTableProps {
    data: ApplicationData[];
    onRefresh: () => void;
}

export default function ApplicationTable({ data, onRefresh }: ApplicationTableProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Open confirmation dialog for deletion
    const handleDeleteClick = (id: string) => {
        setSelectedId(id);
        setIsDeleteDialogOpen(true);
    };

    // Execute API delete call
    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        setIsDeleting(true);
        try {
            await applicationService.remove(selectedId);
            toast.success("Application deleted successfully");
            onRefresh(); 
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Failed to delete application.");
        } finally {
            setIsDeleting(false);
            setIsDeleteDialogOpen(false);
            setSelectedId(null);
        }
    };

    if (data.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
                <p className="text-gray-500">No applications found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse text-sm text-gray-700">
                <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-600 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4">Company Name</th>
                        <th className="px-6 py-4">Job Title</th>
                        <th className="px-6 py-4">Job Type</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Applied Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-medium">
                    {data.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50/70 transition-colors">
                            {/* Company Name */}
                            <td className="px-6 py-4 font-semibold text-gray-900">{app.companyName}</td>
                            
                            {/* Job Title */}
                            <td className="px-6 py-4 text-gray-600">{app.jobTitle}</td>
                            
                            {/* Job Type Enum Formatting */}
                            <td className="px-6 py-4 text-xs text-gray-500">
                                <span className="bg-gray-100 border border-gray-200 rounded px-2 py-0.5 capitalize">
                                    {app.jobType.toLowerCase().replace("_", " ")}
                                </span>
                            </td>
                            
                            {/* Status Badge Component */}
                            <td className="px-6 py-4">
                                <StatusBadge status={app.status} />
                            </td>
                            
                            {/* Applied Date Formatting */}
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(app.appliedDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </td>
                            
                            {/* View, Edit, Delete Actions */}
                            <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                <Link
                                    href={`/applications/${app.id}/edit`}
                                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDeleteClick(app.id)}
                                    className="text-sm text-red-600 hover:text-red-800 transition-colors bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isDeleteDialogOpen && (
                <DeleteDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    onConfirm={handleConfirmDelete}
                    isDeleting={isDeleting}
                />
            )}
        </div>
    );
}