import CategoryMock from "./CategoryMock";
import {SellerMock} from "./SellerMock";
import {ProductType} from "../types/ProductType";

export const ProductsMock: ProductType[] = [
  {
    id: 1,
    name: 'Co-working space',
    description: 'A co-working space located in MediaCor for 1 person',
    price: 5000,
    image: 'https://uschamber-co.imgix.net/https%3A%2F%2Fs3.us-east-1.amazonaws.com%2Fco-assets%2Fassets%2Fimages%2Fbenefits-coworking-space.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=415&q=88&w=622&s=fddd528f0321cf8ca5a53f0bfb84add1',
    destination: 'Co-working hub',
    availability: 'Weekdays, 09:00 - 18:00',
    area: '12',
    location: 'MediaCor',
    facilities_amenities: 'Conference room, desk, chair, WC, kettle',
    unit_item: '1 hour',
    seats_numbers: '100',
    category: CategoryMock[0],
    seller: SellerMock[0],
  },
  {
    id: 2,
    name: 'Lunchbox Premium',
    description: 'Premium lunch box (with luxury spoon and chopsticks), comes with luxury spoon and chopsticks, Conveniently foldable, Discreet and leak proof - Large capacity',
    price: 5000,
    image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/439/840/products/11.jpg?v=1636363308920',
    destination: 'Co-working hub',
    availability: 'Weekdays, 09:00 - 18:00',
    area: '12',
    location: 'MediaCor',
    facilities_amenities: 'Conference room, desk, chair, WC, kettle',
    unit_item: '1 box',
    seats_numbers: '100',
    category: CategoryMock[3],
    seller: SellerMock[0],
  },
  {
    id: 3,
    name: 'Cinema Cabaret',
    description: 'Residual tickets for moovies. Please check the residual tickets availability here: www.cineplex.md',
    price: 5000,
    image: 'https://zameenblog.s3.amazonaws.com/blog/wp-content/uploads/2019/08/Cover-1440x625-1.jpg',
    destination: 'Co-working hub',
    availability: 'Weekdays, 09:00 - 18:00',
    area: '12',
    location: 'MediaCor',
    facilities_amenities: 'Conference room, desk, chair, WC, kettle',
    unit_item: '1 ticket',
    seats_numbers: '100',
    category: CategoryMock[2],
    seller: SellerMock[0],
  },
  {
    id: 4,
    name: 'Design & Art',
    description: 'Graphic design services (logo, brand book, corporate identity, etc.)',
    price: 5000,
    image: 'https://sigmatechnology.com/content/uploads/2021/06/Screenshot-1.jpg',
    destination: 'Co-working hub',
    availability: 'Weekdays, 09:00 - 18:00',
    area: '12',
    location: 'MediaCor',
    facilities_amenities: 'Conference room, desk, chair, WC, kettle',
    unit_item: '1 hour',
    seats_numbers: '100',
    category: CategoryMock[1],
    seller: SellerMock[0],
  },
];

