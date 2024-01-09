import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Seller } from "../entities/sellers.entity";

@Injectable()
export class SellersResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Doe" })
  public name: string;
  @ApiProperty({ example: "@johny" })
  public username: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;
  @ApiProperty({ example: "10.12.23" })
  public created: Date;

  public constructor(specialist: Seller) {
    this.id = specialist.id;
    this.name = specialist.name;
    this.username = specialist.username;
    this.avatar = specialist.avatar;
    this.created = specialist.created_at;
  }

  public static collect(specialists: any[]): SellersResource[] {
    return specialists.map((specialist) => {
      return new SellersResource(specialist);
    });
  }
}
