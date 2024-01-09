import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile
} from "@nestjs/common";
import {
  ApiConsumes,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CrudUsersService } from "./services/crud-users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersResource } from "./resources/users.resource";
import { ValidationUsersService } from "./services/validation-users.service";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly crudUsersService: CrudUsersService,
    private readonly validationUsersService: ValidationUsersService
  ) {}

  @ApiResponse({ status: 200, type: [UsersResource] })
  @ApiOperation({ summary: "Get all users" })
  @Get()
  async findAll() {
    const users = await this.crudUsersService.findAllUser();
    return UsersResource.collect(users);
  }

  @ApiResponse({ status: 200, type: UsersResource })
  @ApiOperation({ summary: "Get user by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.crudUsersService.findUser(+id);
    return new UsersResource(user);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: UsersResource })
  @ApiOperation({ summary: "Create user" })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() avatar) {
    await this.validationUsersService.validateUsername(createUserDto.username);
    const user = await this.crudUsersService.createUser(createUserDto, avatar);
    return new UsersResource(user);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: UsersResource })
  @ApiOperation({ summary: "Update user" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() avatar
  ) {
    await this.validationUsersService.validateUsername(
      updateUserDto.username,
      +id
    );
    await this.crudUsersService.updateUser(+id, updateUserDto, avatar);
    const user = await this.crudUsersService.findUser(+id);
    return new UsersResource(user);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted"
  })
  @ApiOperation({ summary: "Delete user" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const user = await this.crudUsersService.findUser(+id);
    await this.crudUsersService.removeUser(+id);
    return new UsersResource(user);
  }
}
