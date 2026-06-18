"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { applicationService } from "@/services/application.service";
import { ApplicationData } from "@/types/application";
import ApplicationTable from "@/components/application/ApplicationTable";
import SearchBar from "@/components/application/SearchBar";
import StatusFilter from "@/components/application/StatusFilter";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<ApplicationData[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(""); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            setError("");
            
            const response = await applicationService.findAll(
                status || undefined,
                search || undefined
            );
            
            setApplications(response.data);
        } catch (err: any) {
            console.error("Fetch error:", err);
            setError("Failed to load applications. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [status, search]);

    return (
        <div className="container mx-auto py-10 px-4 max-w-6xl">
            {/* Header Block */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Applications</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and manage your ongoing recruitment processes.</p>
                </div>
                <Link
                    href="/applications/new"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 shadow-sm transition-colors"
                >
                    + New Application
                </Link>
            </div>

            {/* Filter and Search Layout Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
                <SearchBar value={search} onChange={setSearch} />
                <StatusFilter selectedValue={status} onChange={setStatus} />
            </div>

            {/* Application Data Presentation Layout */}
            {isLoading ? (
                <div className="flex flex-col justify-center items-center py-20 bg-white rounded-lg border border-gray-200">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-sm text-gray-500">Loading applications...</p>
                </div>
            ) : error ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                    {error}
                </div>
            ) : (
                <ApplicationTable 
                    data={applications} 
                    onRefresh={fetchApplications} 
                />
            )}
        </div>
    );
}