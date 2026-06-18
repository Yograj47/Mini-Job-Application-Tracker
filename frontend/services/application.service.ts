import { api } from "@/lib/axios";
import {
    ApiResponse,
    ApplicationData,
    ApplicationInput,
    UpdateApplicationInput,
} from "@/types/application";

export const applicationService = {
    create: async (createDto: ApplicationInput) => {
        const res = await api.post<ApiResponse<ApplicationData>>("/applications", createDto);
        return res.data;
    },

    findAll: async (status?: string, search?: string) => {
        const res = await api.get<ApiResponse<ApplicationData[]>>("/applications", {
            params: {
                status,
                search,
            },
        });
        return res.data;
    },

    findOne: async (id: string) => {
        const res = await api.get<ApiResponse<ApplicationData>>(`/applications/${id}`);
        return res.data;
    },

    update: async (id: string, updateDto: UpdateApplicationInput) => {
        const res = await api.patch<ApiResponse<ApplicationData>>(`/applications/${id}`, updateDto);
        return res.data;
    },

    remove: async (id: string) => {
        const res = await api.delete<ApiResponse<null>>(`/applications/${id}`);
        return res.data;
    },
};