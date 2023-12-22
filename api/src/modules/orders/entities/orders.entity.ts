import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../products/entities/products.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid" })
  productId: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column({ type: "varchar", length: 30 })
  price: string;

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
