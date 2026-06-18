"use client";

import { ApplicationSchema } from "@/schemas/application.schema";
import { ApplicationFormProps, ApplicationInput } from "@/types/application";
import { useForm, type Resolver } from "react-hook-form";
import { JobType, Status } from "@/schemas/application.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ApplicationForm({ initialData, onSubmit, isSubmitting }: ApplicationFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ApplicationInput>({
        resolver: zodResolver(ApplicationSchema) as Resolver<ApplicationInput>,
        defaultValues: {
            companyName: initialData?.companyName ?? "",
            jobTitle: initialData?.jobTitle ?? "",
            jobType: initialData?.jobType ?? JobType.INTERNSHIP,
            status: initialData?.status ?? Status.APPLIED,
            appliedDate: initialData?.appliedDate
                ? new Date(initialData.appliedDate)
                : new Date(),
            notes: initialData?.notes ?? "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {initialData ? "Edit Application" : "New Application"}
            </h2>

            {/* Company Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                    type="text"
                    {...register("companyName")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Google"
                />
                {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                )}
            </div>

            {/* Job Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                    type="text"
                    {...register("jobTitle")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    placeholder="e.g. Frontend Engineer"
                />
                {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600">{errors.jobTitle.message}</p>
                )}
            </div>

            {/* Grid for Job Type & Status */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Job Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Job Type</label>
                    <select
                        {...register("jobType")}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none bg-white"
                    >
                        <option value={JobType.INTERNSHIP}>Internship</option>
                        <option value={JobType.FULL_TIME}>Full Time</option>
                        <option value={JobType.PART_TIME}>Part Time</option>
                    </select>
                    {errors.jobType && (
                        <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        {...register("status")}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none bg-white"
                    >
                        <option value={Status.APPLIED}>Applied</option>
                        <option value={Status.INTERVIEWING}>Interviewing</option>
                        <option value={Status.OFFER}>Offer</option>
                        <option value={Status.REJECTED}>Rejected</option>
                    </select>
                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                    )}
                </div>
            </div>

            {/* Applied Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Applied Date</label>
                <input
                    type="date"
                    {...register("appliedDate")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                />
                {errors.appliedDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.appliedDate.message}</p>
                )}
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea
                    {...register("notes")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Add salaries, interview links, details here..."
                />
                {errors.notes && (
                    <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? "Saving..." : "Save Application"}
                </button>
            </div>
        </form>
    );
}