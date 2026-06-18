"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplicationForm from "@/components/application/ApplicationForm";
import { ApplicationInput } from "@/types/application";
import { toast } from "sonner";
import { applicationService } from "@/services/application.service";

export default function NewApplicationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCreateSubmit = async (data: ApplicationInput) => {
        setIsSubmitting(true);
        try {
            await applicationService.create(data);
            toast.success("Application created successfully!");
            router.push("/applications");
            router.refresh();
        } catch (error) {
            console.error("Create error:", error);
            toast.error("Failed to create application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-xl w-full py-6 sm:py-10 px-4">
            <div className="mb-4 sm:mb-5">
                <button
                    onClick={() => router.back()}
                    className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                    &larr; Back to Applications
                </button>
            </div>

            <ApplicationForm
                onSubmit={handleCreateSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}