"use client";

import { Status } from "@/schemas/application.schema";

interface StatusFilterProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

export default function StatusFilter({ selectedValue, onChange }: StatusFilterProps) {
    return (
        <div className="w-full sm:w-48">
            <label className="sr-only">Filter by Status</label>
            <select
                value={selectedValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white text-gray-700 shadow-sm"
            >
                <option value="">All Status</option>
                <option value={Status.APPLIED}>Applied</option>
                <option value={Status.INTERVIEWING}>Interviewing</option>
                <option value={Status.OFFER}>Offer</option>
                <option value={Status.REJECTED}>Rejected</option>
            </select>
        </div>
    );
}