import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class ValidationUsersService {
  private readonly validRegex: RegExp;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
    this.validRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  }

  async validateUsername(username: string, id: number = 0): Promise<boolean> {
    // this.validateEmailFormat(username);
    return await this.validateUniqueUsername(username, id);
  }

  validateEmailFormat(email: string): boolean {
    if (!this.validRegex.test(email)) {
      throw new HttpException(
        "Please provide valid Email.",
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }

  async validateUniqueUsername(
    username: string,
    id: number = 0
  ): Promise<boolean> {
    const users = await this.userRepository.find({
      where: { username, id: Not(id) }
    });
    if (users.length > 0) {
      throw new HttpException(
        "This username is already taken.",
        HttpStatus.BAD_REQUEST
      );
    }
    return true;
  }
}