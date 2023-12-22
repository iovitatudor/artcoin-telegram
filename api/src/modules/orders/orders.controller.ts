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
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrdersResource } from "./resources/orders.resource";
import { OrdersService } from "./orders.service";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService
  ) {
  }

  @ApiResponse({ status: 200, type: [OrdersResource] })
  @ApiOperation({ summary: "Get all orders" })
  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return OrdersResource.collect(orders);
  }

  @ApiResponse({ status: 200, type: OrdersResource })
  @ApiOperation({ summary: "Get order by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const order = await this.ordersService.findOne(+id);
    return new OrdersResource(order);
  }

  @ApiResponse({ status: 200, type: OrdersResource })
  @ApiOperation({ summary: "Create order" })
  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto
  ) {
    const createdOrder =
      await this.ordersService.create(createOrderDto);

    const order = await this.ordersService.findOne(
      createdOrder.id
    );
    return new OrdersResource(order);
  }

  @ApiResponse({ status: 200, type: OrdersResource })
  @ApiOperation({ summary: "Update order" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    await this.ordersService.update(+id, updateOrderDto);
    const order = await this.ordersService.findOne(+id);
    return new OrdersResource(order);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted"
  })
  @ApiOperation({ summary: "Delete order" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const order = await this.ordersService.remove(+id);
    return new OrdersResource(order);
  }
}