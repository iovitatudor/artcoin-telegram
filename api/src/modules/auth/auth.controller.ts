import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Register new user/seller" })
  @ApiResponse({ status: 200, description: "Application Token" })
  @UsePipes(ValidationPipe)
  @Post("/register")
  public async register(
    @Body() registerAuthDto: RegisterAuthDto
  ): Promise<object> {
    return await this.authService.register(registerAuthDto);
  }

  @ApiOperation({ summary: "Login user/seller" })
  @ApiResponse({ status: 201, description: "Application Token" })
  @Post("/login")
  public async login(@Body() loginAuthDto: LoginAuthDto): Promise<object> {
    return await this.authService.login(loginAuthDto);
  }
}
