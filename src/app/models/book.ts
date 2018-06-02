import { Customer } from './customer';
import { Review } from './review';

export class Book {
  id?: Number;
  title: string;
  type: string;
  date: Date;
  author: string;
  price: Number;
  bookPic?: Array<any>;
  status: string;
  description: string;
  customers?: Customer[];
  reviews?: Review[];
  uploadUserId?: Number;
}
