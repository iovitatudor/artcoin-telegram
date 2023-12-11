import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { AvailabilityEnum } from "../enums/availability.enum";
import { LocationEnum } from "../enums/location.enum";
import { CategoryResource } from "../../categories/resources/category.resource";
import { SellersResource } from "../../sellers/resources/sellers.resource";

@Injectable()
export class ProductResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "Spaces" })
  public name: string;
  @ApiProperty({ example: "A co-working space located..." })
  public description: string;
  public price: number;
  @ApiProperty({ example: "image-mock.png" })
  public image: string;
  @ApiProperty({ example: "Co-working hub" })
  public destination: string;
  @ApiProperty({ example: AvailabilityEnum.individual })
  public availability: string;
  @ApiProperty({ example: "12" })
  public area: string;
  @ApiProperty({ example: LocationEnum.artCor })
  public location: string;
  @ApiProperty({ example: "Conference room, desk, chair, WC, kettle" })
  public facilities_amenities: string;
  @ApiProperty({ example: "1 working day" })
  public unit_item: string;
  @ApiProperty({ example: 1 })
  public seats_numbers: number;
  @ApiProperty({ example: 10 })

  @ApiProperty({ example: CategoryResource })
  public category: CategoryResource;
  @ApiProperty({ example: SellersResource })
  public seller: SellersResource;

  public constructor(product) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.image = product.image;
    this.availability = product.availability;
    this.destination = product.destination;
    this.area = product.area;
    this.location = product.location;
    this.facilities_amenities = product.facilities_amenities;
    this.unit_item = product.unit_item;
    this.seats_numbers = product.seats_numbers;
    this.category = new CategoryResource(product.category);
    this.seller = new SellersResource(product.seller);
  }

  public static collect(products): ProductResource[] {
    return products.map((product) => {
      return new ProductResource(product);
    });
  }
}
