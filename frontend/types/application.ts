import { ApplicationSchema } from "@/schemas/application.schema";
import z from "zod";

export type ApplicationInput = z.infer<
    typeof ApplicationSchema
>;

export type UpdateApplicationInput =
    Partial<ApplicationInput>;

export interface ApplicationData
    extends ApplicationInput {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export interface ApplicationFormProps {
    initialData?: Partial<ApplicationData>;
    onSubmit: (data: ApplicationInput) => Promise<void>;
    isSubmitting?: boolean;
}