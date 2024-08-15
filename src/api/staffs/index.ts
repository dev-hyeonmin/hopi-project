import {useFetch} from '@/utils/reactQuery.ts';
import {GetStaffsResponse} from '@/api/staffs/type.ts';

export const getStaffs = () => {
  return useFetch<GetStaffsResponse>(
    `staff`,
    {perPage: 99},
    {cacheTime: 1800000, refetchOnWindowFocus: false},
  );
};
