import { Controller, Get, Post, Body, Patch, Delete, Query, Param } from "@nestjs/common";
import { ApplicationService } from "../services/application.service";
import { CreateApplicationDto } from "../dto/create-application.dto";
import { QueryApplicationDto } from "../dto/query-application.dto";
import { UpdateApplicationDto } from "../dto/update-application.dto";
import { ApiOperation } from "@nestjs/swagger";

@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) { }

    @Post()
    @ApiOperation({ summary: "Create a new job appplication" })
    create(@Body() createDto: CreateApplicationDto) {
        return this.applicationService.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all job applications with optional filter and search parameters' })
    findAll(@Query() query: QueryApplicationDto) {
        return this.applicationService.findAll(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get details of a single job application' })
    findOne(@Param('id') id: string) {
        return this.applicationService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update specific fields of an application' })
    update(@Param('id') id: string, @Body() updateDto: UpdateApplicationDto) {
        return this.applicationService.update(id, updateDto);
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a tracked application record' })
    remove(@Param('id') id: string) {
        return this.applicationService.remove(id);
    }
}