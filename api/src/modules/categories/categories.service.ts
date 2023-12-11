import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/categories.entity";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryRepository.save({ ...createCategoryDto });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: { children: true } });
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { id }
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any category.",
        HttpStatus.NOT_FOUND
      );
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<UpdateResult> {
    try {
      return await this.categoryRepository.update(id, updateCategoryDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.categoryRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}