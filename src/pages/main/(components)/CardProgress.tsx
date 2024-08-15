import Box from '@components/layout/box/Box.tsx';
import {GENDER, GENDER_KEY, NATION, NATION_KEY} from '@/constants.ts';
import {BookingType} from '@/api/bookings/type.ts';
import {formatDate} from '@/utils/dateFormat.ts';
import {calcAge} from '@/utils/calcAge.ts';
import Search, {OptionProps} from '@components/form/Search.tsx';
import {getStaffs} from '@/api/staffs';

interface CardProgressProps {
  booking: BookingType;
}

export default function CardProgress({booking}: CardProgressProps) {
  const {data: getStaffsData} = getStaffs();
  const staffs = getStaffsData?.staff.map((staff) => ({
    id: staff.id,
    value: staff.name
  }));

  const handleChangeOption = ({id, value}: OptionProps) => {
    console.log(`Select id : ${id} / value : ${value}`);
  };

  return (
    <Box key={booking.id} className="w-full bg-white rounded-lg p-4 border border-zinc-200" direction="vertical">
      <Box className="gap-1.5" verticalAlign="middle">
        <span className="text-zinc-600 text-sm">{booking.customer.chartCode}</span>
        <span className="font-bold">{booking.customer.name}</span>
      </Box>

      <Box className="gap-1.5" verticalAlign="middle">
        <span className="text-red font-bold">{formatDate(booking.bookingDate, 'HH:mm')}</span>
        <span className="font-medium">
          {GENDER[booking.customer.gender as GENDER_KEY]}

          {booking.customer.birth && '/'}
          {calcAge(booking.customer.birth)}

          {booking.customer.nation && '/'}
          {NATION[booking.customer.nation as NATION_KEY]}
        </span>
      </Box>

      <Box className="text-zinc-500 tracking-wide">
        {booking.customer.phone || booking.customer.email}
      </Box>

      <div className="w-full text-zinc-500 line-clamp-1">
        {booking.productNames.join(', ') || '시술 정보 없음'}
      </div>

      <Box className="text-zinc-400 text-xs">
        접수 완료 {formatDate(booking.checkedInDate, 'YYYY-MM-DD HH:mm')}
      </Box>

      <Box direction="vertical" className="mt-4 gap-1.5">
        <Box verticalAlign="middle" className="gap-1.5">
          <div className="font-medium text-sm">위치</div>

          <Search
            placeholder="선택"
            size="small"
            options={staffs}
            handleChangeOption={handleChangeOption}
          />
        </Box>

        <Box verticalAlign="middle" className="gap-1.5">
          <div className="font-medium text-sm">상담</div>

          <Search
            placeholder="선택"
            size="small"
            options={staffs}
            handleChangeOption={handleChangeOption}
          />
        </Box>
      </Box>
    </Box>
  );
}
