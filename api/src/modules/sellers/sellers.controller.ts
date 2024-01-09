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
import { CrudSellersService } from "./services/crud-sellers.service";
import { ValidationSellersService } from "./services/validation-sellers.service";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { UpdateSellerDto } from "./dto/update-seller.dto";
import { SellersResource } from "./resources/sellers.resource";

@ApiTags("Sellers")
@Controller("sellers")
export class SellersController {
  constructor(
    private readonly crudSpecialistsService: CrudSellersService,
    private readonly validationSpecialistsService: ValidationSellersService
  ) {}

  @ApiResponse({ status: 200, type: [SellersResource] })
  @ApiOperation({ summary: "Get all sellers" })
  @Get()
  async findAll() {
    const specialists = await this.crudSpecialistsService.findAll();
    return SellersResource.collect(specialists);
  }

  @ApiResponse({ status: 200, type: SellersResource })
  @ApiOperation({ summary: "Get specialist by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const specialist = await this.crudSpecialistsService.findOne(+id);
    return new SellersResource(specialist);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: SellersResource })
  @ApiOperation({ summary: "Create specialist" })
  @Post()
  async create(
    @Body() createSpecialistDto: CreateSellerDto,
    @UploadedFile() avatar: any
  ) {
    await this.validationSpecialistsService.validateUsername(
      createSpecialistDto.username
    );
    const createdSpecialist = await this.crudSpecialistsService.create(
      createSpecialistDto,
      avatar
    );

    const specialist = await this.crudSpecialistsService.findOne(
      createdSpecialist.id
    );
    return new SellersResource(specialist);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("avatar"))
  @ApiResponse({ status: 200, type: SellersResource })
  @ApiOperation({ summary: "Update specialist" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateSpecialistDto: UpdateSellerDto,
    @UploadedFile() avatar: any
  ) {
    await this.validationSpecialistsService.validateUsername(
      updateSpecialistDto.username,
      +id
    );
    await this.crudSpecialistsService.update(+id, updateSpecialistDto, avatar);
    const specialist = await this.crudSpecialistsService.findOne(+id);
    return new SellersResource(specialist);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted"
  })
  @ApiOperation({ summary: "Delete specialist" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const specialist = await this.crudSpecialistsService.findOne(+id);
    await this.crudSpecialistsService.remove(+id);
    return new SellersResource(specialist);
  }
}
