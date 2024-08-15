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

interface OptionType {
  id: number;
  name: string;
}

interface MedicalRecordType {
  id: number;
  procedureName: string;
  isComplete: boolean;
  bed?: OptionType;
  doctor?: OptionType;
  esthetician?: OptionType;
  assistant?: OptionType;
}

export interface BookingType {
  id: number;
  bookingDate: string;
  checkedInDate: string;
  confirmedDate: string;
  medicalRecords: MedicalRecordType[];
  assiMemo: string;
  productNames: string[];
  agreements: [{
    shortName: string;
    isAgree: boolean;
  }];
  customer: Customer;
}