import Box from '@components/layout/box/Box.tsx';
import CardContainer from '@/pages/main/(components)/CardContainer.tsx';
import {GetBookingsParams} from '@/api/bookings/type.ts';
import {formatDate} from '@/utils/dateFormat.ts';

const INIT_BOOKING_PARMAS: GetBookingsParams = {
  bookingDate: formatDate(new Date(), 'YYYY-MM-DD'),
  perPage: 10
};

export default function Main() {
  const bookingsParams = INIT_BOOKING_PARMAS;

  // const {data} = getStaffs();
  //
  // const staffOptions = useMemo(() => {
  //   return data?.staff.map((staff) => ({
  //     id: staff.id,
  //     value: staff.name
  //
  //   }));
  // }, [data?.staff]);

  return (
    <div className="w-1/3">
      <Box className="absolute w-full h-full gap-4 p-10">
        <CardContainer title="예약현황" type="PENDING" options={bookingsParams} />
        <CardContainer title="접수완료" type="PROGRESS" options={bookingsParams} />
        <CardContainer title="결제완료" type="COMPLETE" options={bookingsParams} />
      </Box>
    </div>
  );
}
