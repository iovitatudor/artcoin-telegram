import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AvailabilityEnum } from "../enums/availability.enum";
import { LocationEnum } from "../enums/location.enum";
import { UnitItemEnum } from "../enums/unitItem.enum";
import { Category } from "../../categories/entities/categories.entity";
import { Seller } from "../../sellers/entities/sellers.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  categoryId: string;

  @ManyToOne(() => Category)
  category: Category;

  @Column({ type: "uuid" })
  sellerId: string;

  @ManyToOne(() => Seller)
  seller: Seller;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", length: 100 })
  destination: string;

  @Column({
    type: "varchar",
    length: 100,
    default: AvailabilityEnum.individual
  })
  availability: AvailabilityEnum;

  @Column({ type: "varchar", length: 100, default: 0 })
  area: string;

  @Column({ type: "varchar", length: 100, default: LocationEnum.artCor })
  location: LocationEnum;

  @Column({ type: "varchar", length: 100, nullable: true })
  facilities_amenities: string;

  @Column({ type: "varchar", length: 100, default: UnitItemEnum.oneHour })
  unit_item: UnitItemEnum;

  @Column({ type: "varchar", default: "0" })
  seats_numbers: string;

  @Column({ type: "varchar", default: "0" })
  price: string;

  @Column({ type: "varchar", length: 255, default: "image-mock.png" })
  image: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  public updated_at: Date;
}
