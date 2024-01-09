import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Smith" })
  public name: string;
  @ApiProperty({ example: "@johny" })
  public username: string;
  @ApiProperty({ example: "+3736091232" })
  public phone: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;
  @ApiProperty({ example: "10.12.23" })
  public created: Date;

  public constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.phone = user.phone;
    this.avatar = user.avatar;
    this.created = user.created_at;
  }

  public static collect(users: any[]): UsersResource[] {
    return users.map((user) => {
      return new UsersResource(user);
    });
  }
}
