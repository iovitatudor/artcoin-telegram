import { Module } from "@nestjs/common";
import * as path from "path";
import * as process from "process";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/users.module";
import { User } from "./modules/users/entities/user.entity";
import { FilesModule } from "./common/files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { SellersModule } from "./modules/sellers/sellers.module";
import { Seller } from "./modules/sellers/entities/sellers.entity";
import { AuthModule } from "./modules/auth/auth.module";
import { Category } from "./modules/categories/entities/categories.entity";
import { CategoriesModule } from "./modules/categories/categories.module";
import { Product } from "./modules/products/entities/products.entity";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { Order } from "./modules/orders/entities/orders.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./.env",
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, Seller, Category, Product, Order],
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "../uploads")
    }),
    FilesModule,
    UsersModule,
    SellersModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
