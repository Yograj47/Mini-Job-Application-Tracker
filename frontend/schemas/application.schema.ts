import { z } from "zod";

export enum JobType {
    INTERNSHIP = "INTERNSHIP",
    FULL_TIME = "FULL_TIME",
    PART_TIME = "PART_TIME",
}

export enum Status {
    APPLIED = "APPLIED",
    INTERVIEWING = "INTERVIEWING",
    OFFER = "OFFER",
    REJECTED = "REJECTED",
}

export const ApplicationSchema = z.object({
    companyName: z
        .string()
        .min(2, "Company name must be at least 2 characters long"),

    jobTitle: z
        .string()
        .min(1, "Job title is required"),

    jobType: z.enum(JobType),

    status: z.enum(Status),

    appliedDate: z.coerce.date(),

    notes: z.string().optional(),
});

