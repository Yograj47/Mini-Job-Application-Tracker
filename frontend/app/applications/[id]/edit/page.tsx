"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationForm from "@/components/application/ApplicationForm";
import { applicationService } from "@/services/application.service";
import { ApplicationData, ApplicationInput } from "@/types/application";
import { toast } from "sonner";

interface EditPageProps {
    params: Promise<{ id: string }>;
}

export default function EditApplicationPage({ params }: EditPageProps) {
    const { id } = use(params); 
    const router = useRouter();
    
    const [application, setApplication] = useState<ApplicationData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchApplication() {
            try {
                const response = await applicationService.findOne(id);
                setApplication(response.data);
            } catch (error) {
                console.error("Error loading application:", error);
                toast.error("Could not load the application data.");
                router.push("/applications");
            } finally {
                setIsLoading(false);
            }
        }
        fetchApplication();
    }, [id, router]);

    const handleUpdateSubmit = async (data: ApplicationInput) => {
        setIsSubmitting(true);
        try {
            await applicationService.update(id, data);
            toast.success("Application updated successfully!");
            router.push("/applications");
            router.refresh();
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Failed to update application.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh] px-4">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-200 border-b-blue-600"></div>
            </div>
        );
    }

    if (!application) return null;

    return (
        <div className="mx-auto max-w-xl w-full py-6 sm:py-10 px-4">
            <div className="mb-4 sm:mb-5">
                <button 
                    onClick={() => router.back()}
                    className="text-xs font-semibold text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                    &larr; Cancel and Go Back
                </button>
            </div>

            <ApplicationForm 
                initialData={application} 
                onSubmit={handleUpdateSubmit} 
                isSubmitting={isSubmitting} 
            />
        </div>
    );
}