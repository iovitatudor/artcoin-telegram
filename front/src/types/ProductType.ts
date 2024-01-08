import {CategoryType} from "./CategoryType";
import {SellerType} from "./SellerType";

export interface ProductType {
   id: number;
   name: string;
   description: string;
   price: number;
   image: string;
   destination: string;
   availability: string;
   area: string;
   location: string;
   facilities_amenities: string;
   unit_item: string;
   seats_numbers: string;
   category: CategoryType;
   seller: SellerType;
}