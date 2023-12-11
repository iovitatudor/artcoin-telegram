import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty({ example: 0 })
  @IsString()
  @IsNotEmpty()
  parentId: string;

  @ApiProperty({ example: "Spaces" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  @ValidateIf((o) => "name" in o)
  name: string;

  @ApiProperty({ example: "A co-working space located..." })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "description" in o)
  description: string;
}