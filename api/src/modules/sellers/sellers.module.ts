import { Module } from "@nestjs/common";
import { CrudSellersService } from "./services/crud-sellers.service";
import { SellersController } from "./sellers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Seller } from "./entities/sellers.entity";
import { FilesService } from "../../common/files/files.service";
import { ValidationSellersService } from "./services/validation-sellers.service";

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  controllers: [SellersController],
  providers: [CrudSellersService, ValidationSellersService, FilesService],
  exports: [CrudSellersService, ValidationSellersService]
})
export class SellersModule {}
