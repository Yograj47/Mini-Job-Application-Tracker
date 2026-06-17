import { CreateApplicationDto } from "../dto/create-application.dto";
import { QueryApplicationDto } from "../dto/query-application.dto";
import { UpdateApplicationDto } from "../dto/update-application.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class ApplicationService {
    constructor(private prisma: PrismaService) { }

    async create(createDto: CreateApplicationDto) {
        const data = await this.prisma.application.create({
            data: {
                ...createDto,
                appliedDate: new Date(createDto.appliedDate)
            },
        })

        return {
            status: "success",
            message: "Application created successfully",
            data
        }
    }

    async findAll(queryDto: QueryApplicationDto) {
        const { status, search } = queryDto;

        const andConditions: Prisma.ApplicationWhereInput[] = [];

        if (status) {
            andConditions.push({ status });
        }

        if (search) {
            andConditions.push({
                OR: [
                    { jobTitle: { contains: search, mode: 'insensitive' } },
                    { companyName: { contains: search, mode: 'insensitive' } },
                ]
            })

        }

        const where: Prisma.ApplicationWhereInput = andConditions.length > 0
            ? { AND: andConditions }
            : {};

        const data = await this.prisma.application.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });

        return {
            status: "success",
            message: "Applications fetched successfully",
            data
        };
    }

    async findOne(id: string) {
        const application = await this.prisma.application.findUnique({
            where: { id },
        })

        if (!application) {
            throw new NotFoundException(`Job application not found`)
        }

        return {
            status: "success",
            message: "Application details fetched",
            data: application
        };
    }

    async update(id: string, updateDto: UpdateApplicationDto) {
        await this.findOne(id);

        const data = await this.prisma.application.update({
            where: { id },
            data: {
                ...updateDto,
                appliedDate: updateDto.appliedDate ?
                    new Date(updateDto.appliedDate)
                    : undefined,
            }
        })

        return {
            status: "success",
            message: "Application updated successfully",
            data
        };
    }

    async remove(id: string) {
        await this.findOne(id);
        await this.prisma.application.delete({ where: { id } });
        return {
            status: "success",
            message: "Application delete successfully"
        };
    }
}