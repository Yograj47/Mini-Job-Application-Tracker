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
                ? new Date(initialData.appliedDate).toISOString().split('T')[0] as any
                : new Date().toISOString().split('T')[0] as any,
            notes: initialData?.notes ?? "",
        },
    });

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-5 w-full mx-auto p-4 sm:p-6 bg-white rounded-lg border border-gray-100 sm:border-gray-200 sm:shadow-sm"
        >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                {initialData ? "Edit Application" : "New Application"}
            </h2>

            <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Company Name</label>
                <input
                    type="text"
                    {...register("companyName")}
                    className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                    placeholder="e.g. Google"
                />
                {errors.companyName && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.companyName.message}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Title</label>
                <input
                    type="text"
                    {...register("jobTitle")}
                    className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-gray-400"
                    placeholder="e.g. Frontend Engineer"
                />
                {errors.jobTitle && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.jobTitle.message}</p>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Type</label>
                    <select
                        {...register("jobType")}
                        className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-gray-800"
                    >
                        <option value={JobType.INTERNSHIP}>Internship</option>
                        <option value={JobType.FULL_TIME}>Full Time</option>
                        <option value={JobType.PART_TIME}>Part Time</option>
                    </select>
                    {errors.jobType && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.jobType.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</label>
                    <select
                        {...register("status")}
                        className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-gray-800"
                    >
                        <option value={Status.APPLIED}>Applied</option>
                        <option value={Status.INTERVIEWING}>Interviewing</option>
                        <option value={Status.OFFER}>Offer</option>
                        <option value={Status.REJECTED}>Rejected</option>
                    </select>
                    {errors.status && (
                        <p className="mt-1 text-xs font-medium text-red-600">{errors.status.message}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Applied Date</label>
                <input
                    type="date"
                    {...register("appliedDate")}
                    max={new Date().toISOString().slice(0,10)}
                    className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-800"
                />
                {errors.appliedDate && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.appliedDate.message}</p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Notes (Optional)</label>
                <textarea
                    {...register("notes")}
                    rows={4}
                    className="mt-1.5 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-gray-400 resize-none"
                    placeholder="Add salaries, interview links, details here..."
                />
                {errors.notes && (
                    <p className="mt-1 text-xs font-medium text-red-600">{errors.notes.message}</p>
                )}
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? "Saving..." : "Save Application"}
                </button>
            </div>
        </form>
    );
}