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
        <div className="container mx-auto py-10 px-4">
            <div className="mb-6 max-w-xl mx-auto">
                <button
                    onClick={() => router.back()}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
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