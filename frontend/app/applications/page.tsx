"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { applicationService } from "@/services/application.service";
import { ApplicationData } from "@/types/application";
import { Status } from "@/schemas/application.schema";
import ApplicationTable from "@/components/application/ApplicationTable";
import SearchBar from "@/components/application/SearchBar";
import StatusFilter from "@/components/application/StatusFilter";
import { toast } from "sonner";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<ApplicationData[]>([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchApplications = async () => {
        try {
            setIsLoading(true);
            const response = await applicationService.findAll(status || undefined, debouncedSearch || undefined);
            setApplications(response.data);
            setCurrentPage(1);
        } catch (err) {
            console.error("Error fetching applications:", err);
            toast.error("Error fetching applications");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search])

    useEffect(() => {
        fetchApplications();
    }, [status, debouncedSearch]);

    // Stats
    const stats = {
        total: applications.length,
        applied: applications.filter(a => a.status === Status.APPLIED).length,
        interviewing: applications.filter(a => a.status === Status.INTERVIEWING).length,
        offers: applications.filter(a => a.status === Status.OFFER).length,
        rejected: applications.filter(a => a.status === Status.REJECTED).length,
    };

    // Pagination
    const totalPages = Math.ceil(applications.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = applications.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Applications</h1>
                    <p className="text-xs text-gray-500">Manage and update your logs.</p>
                </div>
                <Link
                    href="/applications/new"
                    className="rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
                >
                    + Add New
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 font-medium uppercase">Total</p>
                    <p className="text-lg font-bold text-gray-900 mt-0.5">{stats.total}</p>
                </div>
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-center">
                    <p className="text-xs text-blue-500 font-medium uppercase">Applied</p>
                    <p className="text-lg font-bold text-blue-700 mt-0.5">{stats.applied}</p>
                </div>
                <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-3 text-center">
                    <p className="text-xs text-amber-500 font-medium uppercase">Interviews</p>
                    <p className="text-lg font-bold text-amber-700 mt-0.5">{stats.interviewing}</p>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-3 text-center">
                    <p className="text-xs text-emerald-500 font-medium uppercase">Offers</p>
                    <p className="text-lg font-bold text-emerald-700 mt-0.5">{stats.offers}</p>
                </div>
                <div className="bg-gray-100/70 border border-gray-200 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
                    <p className="text-xs text-gray-400 font-medium uppercase">Rejected</p>
                    <p className="text-lg font-bold text-gray-600 mt-0.5">{stats.rejected}</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center mb-6">
                <SearchBar value={search} onChange={setSearch} />
                <StatusFilter selectedValue={status} onChange={setStatus} />
            </div>

            <ApplicationTable data={paginatedData} onRefresh={fetchApplications} isLoading={isLoading} />

            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="text-xs font-medium text-gray-600 hover:text-black disabled:opacity-40 disabled:hover:text-gray-600 transition-colors"
                    >
                        ← Previous
                    </button>
                    <span className="text-xs text-gray-400 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="text-xs font-medium text-gray-600 hover:text-black disabled:opacity-40 disabled:hover:text-gray-600 transition-colors"
                    >
                        Next →
                    </button>
                </div>
            )}
        
        </div>
    );
}