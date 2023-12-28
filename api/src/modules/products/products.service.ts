import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./entities/products.entity";
import { FilesService } from "../../common/files/files.service";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileService: FilesService
  ) {}

  async create(createProductDto: CreateProductDto, image) {
    try {
      if (image) {
        createProductDto.image = await this.fileService.createFile(image);
      }
      return await this.productRepository.save({ ...createProductDto });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find({
      order: { id: "DESC" },
      relations: { category: true, seller: true }
    });
  }

  findAllByCategory(categoryId: string): Promise<Product[]> {
    return this.productRepository.find({
      order: { id: "DESC" },
      where: { categoryId },
      relations: { category: true, seller: true }
    });
  }

  async findAllTop(): Promise<Product[]> {
    const products = await this.productRepository.find({
      order: { id: "DESC" },
      where: { top: true },
      relations: { category: true, seller: true }
    });
    return products.sort(() => Math.random() - 0.5);
  }

  async findAllHot(): Promise<Product[]> {
    const products = await this.productRepository.find({
      order: { id: "DESC" },
      where: { hot: true },
      relations: { category: true, seller: true }
    });
    return products.sort(() => Math.random() - 0.5);
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.productRepository.findOneOrFail({
        where: { id },
        relations: { category: true, seller: true }
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any product.",
        HttpStatus.NOT_FOUND
      );
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    image
  ): Promise<UpdateResult> {
    try {
      if (image) {
        updateProductDto.image = await this.fileService.createFile(image);
      }
      return await this.productRepository.update(id, updateProductDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<Product> {
    const product = await this.findOne(id);

    if (!product)
      throw new HttpException(
        "id is required",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    await this.productRepository.delete(id);

    return product;
  }
}
