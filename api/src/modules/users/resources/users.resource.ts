import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class UsersResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Smith" })
  public name: string;
  @ApiProperty({ example: "johny@gmail.com" })
  public email: string;
  @ApiProperty({ example: "+3736091232" })
  public phone: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;

  public constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.avatar = user.avatar;
  }

  public static collect(users): UsersResource[] {
    return users.map((user) => {
      return new UsersResource(user);
    });
  }
}
