import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export class CreateUserDto {
  @ApiProperty({ example: "John Smith" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "@johny" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: "+3736091232", required: false })
  @ValidateIf((o) => "phone" in o)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    format: "binary",
    required: false
  })
  @ValidateIf((o) => "avatar" in o)
  @IsOptional()
  avatar: string;

  @ApiProperty({ example: "qwerQWER1234%$" })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`
  })
  password: string;
}