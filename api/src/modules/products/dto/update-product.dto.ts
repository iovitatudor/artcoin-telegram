import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AvailabilityEnum } from "../enums/availability.enum";
import { LocationEnum } from "../enums/location.enum";
import { UnitItemEnum } from "../enums/unitItem.enum";

export class UpdateProductDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  sellerId: string;

  @ApiProperty({ example: "Spaces" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  @ValidateIf((o) => "name" in o)
  name: string;

  @ApiProperty({ example: "A co-working space located..." })
  @IsString()
  @ValidateIf((o) => "description" in o)
  description: string;

  @ApiProperty({ example: "Co-working hub" })
  @IsString()
  @ValidateIf((o) => "destination" in o)
  destination: string;

  @ApiProperty({ example: "Weekdays, 09:00 - 18:00" })
  @IsString()
  @ValidateIf((o) => "availability" in o)
  availability: AvailabilityEnum;

  @ApiProperty({ example: "12" })
  @IsString()
  @ValidateIf((o) => "area" in o)
  area: string;

  @ApiProperty({ example: LocationEnum.artCor })
  @IsString()
  @ValidateIf((o) => "location" in o)
  location: LocationEnum;

  @ApiProperty({ example: "Conference room, desk, chair, WC, kettle" })
  @IsString()
  @ValidateIf((o) => "facilities_amenities" in o)
  facilities_amenities: string;

  @ApiProperty({ example: "1 working day" })
  @IsString()
  @ValidateIf((o) => "unit_item" in o)
  unit_item: UnitItemEnum;

  @ApiProperty({ example: 1 })
  @IsString()
  @ValidateIf((o) => "seats_numbers" in o)
  seats_numbers: string;

  @ApiProperty({ example: 1 })
  @IsString()
  @ValidateIf((o) => "price" in o)
  price: string;

  @ApiProperty({ example: 0 })
  @IsString()
  @ValidateIf((o) => "top" in o)
  top: boolean;

  @ApiProperty({ example: 1 })
  @IsString()
  @ValidateIf((o) => "hot" in o)
  hot: boolean;

  @ApiProperty({
    format: "binary",
    required: false
  })
  @ValidateIf((o) => "image" in o)
  @IsOptional()
  image: string;
}