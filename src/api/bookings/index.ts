import {useLoadMore} from '@/utils/reactQuery.ts';
import {BookingType, GetBookingsParams} from '@/api/bookings/type.ts';

/**
 * 예약현황 - 예약
 */
export const getBookingsPending = (params: GetBookingsParams) => {
  return useLoadMore<BookingType[]>(`bookings/pending`, params);
};

/**
 * 예약현황 - 접수
 */
export const getBookingsProgress = (params: GetBookingsParams) => {
  return useLoadMore<BookingType[]>(`bookings/progress`, params);
};

/**
 * 예약현황 - 완료
 */
export const getBookingsComplete = (params: GetBookingsParams) => {
  return useLoadMore<BookingType[]>(`bookings/complete`, params);
};
