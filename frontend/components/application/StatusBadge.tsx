"use client";

import { Status } from "@/schemas/application.schema";

interface StatusBadgeProps {
    status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const config = {
        [Status.APPLIED]: {
            text: "Applied",
            classes: "bg-blue-50 text-blue-700 border-blue-200",
        },
        [Status.INTERVIEWING]: {
            text: "Interviewing",
            classes: "bg-amber-50 text-amber-700 border-amber-200",
        },
        [Status.OFFER]: {
            text: "Offer Received",
            classes: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        [Status.REJECTED]: {
            text: "Rejected",
            classes: "bg-gray-50 text-gray-600 border-gray-200",
        },
    };

    const current = config[status] || { text: status, classes: "bg-gray-50 text-gray-600 border-gray-200" };

    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${current.classes}`}>
            {current.text}
        </span>
    );
}