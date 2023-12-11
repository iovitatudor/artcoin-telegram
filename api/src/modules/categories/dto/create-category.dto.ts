import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({ example: "Spaces" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "A co-working space located..." })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "description" in o)
  description: string;
}