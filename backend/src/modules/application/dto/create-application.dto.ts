import { IsString, IsNotEmpty, MinLength, IsEnum, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JobType, Status } from '@prisma/client';

export class CreateApplicationDto {
    @ApiProperty({ example: 'InternSathi', description: 'Minimum 2 characters' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2, { message: 'Company name must be at least 2 characters long' })
    companyName!: string;

    @ApiProperty({ example: 'Full Stack Intern' })
    @IsString()
    @IsNotEmpty()
    jobTitle!: string;

    @ApiProperty({ enum: JobType, example: 'INTERNSHIP' })
    @IsEnum(JobType, { message: 'Job type must be INTERNSHIP, FULL_TIME, or PART_TIME' })
    @IsNotEmpty()
    jobType!: JobType;

    @ApiProperty({ enum: Status, example: 'APPLIED' })
    @IsEnum(Status, { message: 'Status must be APPLIED, INTERVIEWING, OFFER, or REJECTED' })
    @IsNotEmpty()
    status!: Status;

    @ApiProperty({ example: '2026-06-17T12:00:00.000Z' })
    @IsDateString()
    @IsNotEmpty()
    appliedDate!: string;

    @ApiProperty({ example: 'Found on LinkedIn, sounds like a great team.', required: false })
    @IsString()
    @IsOptional()
    notes?: string;
}