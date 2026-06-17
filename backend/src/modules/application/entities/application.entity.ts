import { ApiProperty } from "@nestjs/swagger";
import { Application, JobType, Status } from "@prisma/client";

export class ApplicationEntity implements Application {
    id!: string;

    @ApiProperty({ example: 'InternSathi' })
    companyName!: string;

    @ApiProperty({ example: 'Full Stack Intern' })
    jobTitle!: string;

    @ApiProperty({ enum: JobType, example: 'INTERNSHIP' })
    jobType!: JobType;

    @ApiProperty({ enum: Status, example: 'APPLIED' })
    status!: Status;

    @ApiProperty({ example: '2026-06-17T12:00:00.000Z' })
    appliedDate!: Date;

    @ApiProperty({ example: 'Found on LinkedIn.', required: false, nullable: true })
    notes!: string | null;

    @ApiProperty({ example: '2026-06-17T12:00:00.000Z' })
    createdAt!: Date;

    @ApiProperty({ example: '2026-06-17T12:00:00.000Z' })
    updatedAt!: Date;
}