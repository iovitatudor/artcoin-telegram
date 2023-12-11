import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class SellersResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Doe" })
  public name: string;
  @ApiProperty({ example: "johny@gmail.com" })
  public email: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;

  public constructor(specialist) {
    this.id = specialist.id;
    this.name = specialist.name;
    this.email = specialist.email;
    this.avatar = specialist.avatar;
  }

  public static collect(specialists): SellersResource[] {
    return specialists.map((specialist) => {
      return new SellersResource(specialist);
    });
  }
}
