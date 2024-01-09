import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { AuthTypeEnum } from "./enums/auth-type.enum";
import { CrudUsersService } from "../users/services/crud-users.service";
import { CrudSellersService } from "../sellers/services/crud-sellers.service";
import { User } from "../users/entities/user.entity";
import { Seller } from "../sellers/entities/sellers.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { ValidationSellersService } from "../sellers/services/validation-sellers.service";
import { ValidationUsersService } from "../users/services/validation-users.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly crudUsersService: CrudUsersService,
    private readonly validationUsersService: ValidationUsersService,
    private readonly crudSpecialistsService: CrudSellersService,
    private readonly validationSpecialistsService: ValidationSellersService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    if (loginAuthDto.type === AuthTypeEnum.seller) {
      const specialist = await this.checkSpecialist(loginAuthDto);
      const token = this.generateToken(specialist, loginAuthDto.type);
      return { token, specialistId: specialist.id };
    }
    if (loginAuthDto.type === AuthTypeEnum.user) {
      const user = await this.checkUser(loginAuthDto);
      const token = this.generateToken(user, loginAuthDto.type);
      return { token, userId: user.id };
    }
    throw new UnauthorizedException({
      message: "Login type filed."
    });
  }

  async register(registerAuthDto: RegisterAuthDto): Promise<object> {
    let token = null;

    if (registerAuthDto.type === AuthTypeEnum.seller) {
      await this.validationSpecialistsService.validateUsername(
        registerAuthDto.username
      );
      const specialist = await this.crudSpecialistsService.create(
        {
          ...registerAuthDto,
          avatar: "avatar-mock.png"
        },
        null
      );
      token = this.generateToken(specialist, registerAuthDto.type);
      return { token, specialistId: specialist.id };
    }
    if (registerAuthDto.type === AuthTypeEnum.user) {
      await this.validationUsersService.validateUsername(
        registerAuthDto.username
      );
      const user = await this.crudUsersService.createUser(
        {
          name: registerAuthDto.name,
          username: registerAuthDto.username,
          password: registerAuthDto.password,
          phone: null,
          avatar: "avatar-mock.png"
        },
        null
      );
      token = this.generateToken(user, registerAuthDto.type);
      return { token, userId: user.id };
    }

    throw new UnauthorizedException({
      message: "Register type filed."
    });
  }

  private generateToken(entity: User | Seller, type: string): string {
    const payload = {
      email: entity.username,
      name: entity.name,
      id: entity.id,
      type
    };
    return this.jwtService.sign(payload);
  }

  private async checkUser(loginAuthDto: LoginAuthDto) {
    const user = await this.crudUsersService.findByUsername(
      loginAuthDto.username
    );

    if (!user) {
      throw new UnauthorizedException({
        message: "Username is incorrect"
      });
    }

    const passwordsEquals = await bcrypt.compare(
      loginAuthDto.password,
      user.password
    );

    if (user && passwordsEquals) return user;

    throw new UnauthorizedException({
      message: "Username or password is incorrect"
    });
  }

  private async checkSpecialist(loginAuthDto: LoginAuthDto) {
    const specialist = await this.crudSpecialistsService.findByUsername(
      loginAuthDto.username
    );

    if (!specialist) {
      throw new UnauthorizedException({
        message: "Email is incorrect"
      });
    }

    const passwordsEquals = await bcrypt.compare(
      loginAuthDto.password,
      specialist.password
    );

    if (specialist && passwordsEquals) return specialist;

    throw new UnauthorizedException({
      message: "Email or password is incorrect"
    });
  }
}
