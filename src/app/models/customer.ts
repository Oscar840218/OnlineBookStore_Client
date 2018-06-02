import { CustomerDetail } from './customer-detail';
import { CustomerSecurity } from './customer-security';
import { Book } from './book';

export class Customer {
  id?: Number;
  firstName: string;
  lastName: string;
  email: string;
  customerDetail: CustomerDetail;
  customerSecurity: CustomerSecurity;
  books?: Book[];
}
