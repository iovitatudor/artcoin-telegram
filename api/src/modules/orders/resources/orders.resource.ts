import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { ProductResource } from "../../products/resources/product.resource";

@Injectable()
export class OrdersResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "200" })
  public price: string;
  @ApiProperty({ example: "20.02.1990" })
  public created_at: string;
  @ApiProperty({ example: ProductResource })
  public product: ProductResource | null;

  public constructor(order) {
    this.id = order.id;
    this.price = order.price;
    this.created_at = order.created_at;
    this.product = order.product ? new ProductResource(order.product) : null;
  }

  public static collect(orders): OrdersResource[] {
    return orders.map((order) => {
      return new OrdersResource(order);
    });
  }
}
