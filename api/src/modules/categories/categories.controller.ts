import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode
} from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryResource } from "./resources/category.resource";
import { CategoriesService } from "./categories.service";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {
  }

  @ApiResponse({ status: 200, type: [CategoryResource] })
  @ApiOperation({ summary: "Get all categories" })
  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return CategoryResource.collect(categories);
  }

  @ApiResponse({ status: 200, type: CategoryResource })
  @ApiOperation({ summary: "Get category by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const category = await this.categoriesService.findOne(+id);
    return new CategoryResource(category);
  }

  @ApiResponse({ status: 200, type: CategoryResource })
  @ApiOperation({ summary: "Create category" })
  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    const createdCategory =
      await this.categoriesService.create(createCategoryDto);

    const category = await this.categoriesService.findOne(
      createdCategory.id
    );
    return new CategoryResource(category);
  }

  @ApiResponse({ status: 200, type: CategoryResource })
  @ApiOperation({ summary: "Update category" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    await this.categoriesService.update(+id, updateCategoryDto);
    const category = await this.categoriesService.findOne(+id);
    return new CategoryResource(category);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted"
  })
  @ApiOperation({ summary: "Delete category" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const category = await this.categoriesService.remove(+id);
    return new CategoryResource(category);
  }
}