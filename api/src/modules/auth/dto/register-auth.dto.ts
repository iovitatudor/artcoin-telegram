import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { AuthTypeEnum } from "../enums/auth-type.enum";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export class RegisterAuthDto {
  @ApiProperty({ example: "John Smith" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "@johny" })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: "qwerQWER1234%$" })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @ApiProperty({ example: AuthTypeEnum.seller })
  @IsString()
  @IsEnum([...Object.values(AuthTypeEnum)])
  type: string;
}