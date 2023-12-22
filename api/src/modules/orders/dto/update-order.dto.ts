import { IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "productId" in o)
  productId: string;

  @ApiProperty({ example: "200" })
  @IsString()
  @IsNotEmpty()
  price: string;
}