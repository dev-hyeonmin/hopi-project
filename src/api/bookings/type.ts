import {GENDER_KEY} from '@/constants.ts';

export interface GetBookingsParams {
  bookingDate: string;
  page?: number;
  perPage?: number;
  name?: string;
  nation?: string;
  customerLocation?: string;
  doctorId?: string;
}

interface Customer {
  birth: string;
  chartCode: string;
  email: string | null;
  gender: GENDER_KEY;
  id: number;
  name: string;
  nation: string;
  phone: string;
  rank: string;
}

export interface BookingType {
  id: number;
  bookingDate: string;
  customer: Customer;
}

interface PaginationType {
  currentPage: number;
  totalCnt: number;
  hasMore: boolean;
}
export interface GetBookingsResponse {
  data: BookingType[];
  pagination: PaginationType;
}
