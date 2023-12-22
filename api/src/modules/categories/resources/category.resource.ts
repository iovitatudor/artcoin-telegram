import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class CategoryResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: 1 })
  public parentId: number;
  @ApiProperty({ example: "Spaces" })
  public name: string;
  @ApiProperty({ example: "A co-working space located..." })
  public description: string;
  @ApiProperty({ example: CategoryResource })
  public children: CategoryResource[] | null;

  public constructor(category) {
    this.id = category.id;
    this.parentId = category.parentId;
    this.name = category.name;
    this.description = category.description;
    this.children = category.children
      ? CategoryResource.collect(category.children)
      : [];
  }

  public static collect(categories): CategoryResource[] {
    return categories.map((category) => {
      return new CategoryResource(category);
    });
  }
}
