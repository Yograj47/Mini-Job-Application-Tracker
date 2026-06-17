import { ApiProperty } from "@nestjs/swagger";
import { Status } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class QueryApplicationDto {
    @ApiProperty({ enum: Status, required: false })
    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @ApiProperty({ required: false, description: "Search by company or title" })
    @IsString()
    @IsOptional()
    search?: string;
}