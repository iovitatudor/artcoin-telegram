import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { CreateSellerDto } from "../dto/create-seller.dto";
import { UpdateSellerDto } from "../dto/update-seller.dto";
import { Seller } from "../entities/sellers.entity";
import { FilesService } from "../../../common/files/files.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class CrudSellersService {
  constructor(
    @InjectRepository(Seller)
    private readonly specialistRepository: Repository<Seller>,
    private readonly fileService: FilesService
  ) {}

  async create(
    createSpecialistDto: CreateSellerDto,
    avatar: any
  ): Promise<Seller> {
    try {
      if (avatar) {
        createSpecialistDto.avatar = await this.fileService.createFile(avatar);
      }
      if (createSpecialistDto.password) {
        createSpecialistDto.password = await bcrypt.hash(
          createSpecialistDto.password,
          5
        );
      }
      return await this.specialistRepository.save({ ...createSpecialistDto });
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  findAll(): Promise<Seller[]> {
    return this.specialistRepository.find({ order: { id: "DESC" } });
  }

  async findOne(id: number): Promise<Seller> {
    try {
      return await this.specialistRepository.findOneOrFail({
        where: { id }
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any specialist.",
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findByUsername(username: string): Promise<Seller> {
    try {
      return await this.specialistRepository.findOneOrFail({
        where: { username }
      });
    } catch (e) {
      throw new HttpException(
        "Could not find any specialist.",
        HttpStatus.NOT_FOUND
      );
    }
  }

  async update(
    id: number,
    updateSpecialistDto: UpdateSellerDto,
    avatar: any
  ): Promise<UpdateResult> {
    try {
      if (avatar) {
        updateSpecialistDto.avatar = await this.fileService.createFile(avatar);
      }
      if (updateSpecialistDto.password) {
        updateSpecialistDto.password = await bcrypt.hash(
          updateSpecialistDto.password,
          5
        );
      }
      return await this.specialistRepository.update(id, updateSpecialistDto);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(id: number): Promise<{ affected?: number }> {
    try {
      return this.specialistRepository.delete(id);
    } catch (e) {
      throw new HttpException(e.detail, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
