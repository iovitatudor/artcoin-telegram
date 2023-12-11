import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/products.entity";
import { ProductsService } from "./products.service";
import { FilesService } from "../../common/files/files.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, FilesService],
  exports: [ProductsService]
})
export class ProductsModule {
}
