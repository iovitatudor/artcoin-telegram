import { Module } from "@nestjs/common";
import { CrudUsersService } from "./services/crud-users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { FilesService } from "../../common/files/files.service";
import { ValidationUsersService } from "./services/validation-users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [CrudUsersService, ValidationUsersService, FilesService],
  exports: [CrudUsersService, ValidationUsersService],
})
export class UsersModule {
}
