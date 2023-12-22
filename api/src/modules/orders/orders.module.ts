import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersService } from "./orders.service";
import { Order } from "./entities/orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {
}
