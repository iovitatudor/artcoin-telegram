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
  @IsNotEmpty()
  @ValidateIf((o) => "description" in o)
  description: string;

  @ApiProperty({ example: "Co-working hub" })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "destination" in o)
  destination: string;

  @ApiProperty({ example: "Weekdays, 09:00 - 18:00" })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "availability" in o)
  availability: AvailabilityEnum;

  @ApiProperty({ example: "12" })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "area" in o)
  area: string;

  @ApiProperty({ example: LocationEnum.artCor })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "location" in o)
  location: LocationEnum;

  @ApiProperty({ example: "Conference room, desk, chair, WC, kettle" })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "facilities_amenities" in o)
  facilities_amenities: string;

  @ApiProperty({ example: "1 working day" })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => "unit_item" in o)
  unit_item: UnitItemEnum;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((o) => "seats_numbers" in o)
  seats_numbers: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((o) => "price" in o)
  price: number;

  @ApiProperty({
    format: "binary",
    required: false
  })
  @ValidateIf((o) => "image" in o)
  @IsOptional()
  image: string;
}