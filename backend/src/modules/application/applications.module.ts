import { Module } from "@nestjs/common";
import { ApplicationController } from "./controllers/application.controlller";
import { ApplicationService } from "./services/application.service";

@Module({
    controllers: [ApplicationController],
    providers: [ApplicationService]
})

export class ApplicationModule { }