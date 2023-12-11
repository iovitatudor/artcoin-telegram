import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode, UseInterceptors, UploadedFile
} from "@nestjs/common";
import {
  ApiConsumes,
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductResource } from "./resources/product.resource";
import { ProductsService } from "./products.service";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
  }

  @ApiResponse({ status: 200, type: [ProductResource] })
  @ApiOperation({ summary: "Get all products" })
  @Get()
  async findAll() {
    const products = await this.productService.findAll();
    return ProductResource.collect(products);
  }

  @ApiResponse({ status: 200, type: ProductResource })
  @ApiOperation({ summary: "Get product by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const product = await this.productService.findOne(+id);
    return new ProductResource(product);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image"))
  @ApiResponse({ status: 200, type: ProductResource })
  @ApiOperation({ summary: "Create category" })
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() image
  ) {
    const createdCategory = await this.productService.create(
      createProductDto,
      image
    );

    const product = await this.productService.findOne(
      createdCategory.id
    );
    return new ProductResource(product);
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("image"))
  @ApiResponse({ status: 200, type: ProductResource })
  @ApiOperation({ summary: "Update product" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() image
  ) {
    await this.productService.update(+id, updateProductDto, image);
    const product = await this.productService.findOne(+id);
    return new ProductResource(product);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted"
  })
  @ApiOperation({ summary: "Delete product" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const category = await this.productService.remove(+id);
    return new ProductResource(category);
  }
}