import Box from '@components/layout/box/Box.tsx';
import {GENDER, GENDER_KEY, NATION, NATION_KEY} from '@/constants.ts';
import Search, {OptionProps} from '@components/form/Search.tsx';
import {getStaffs} from '@/api/staffs';
import {BookingType} from '@/api/bookings/type.ts';
import {formatDate} from '@/utils/dateFormat.ts';
import {calcAge} from '@/utils/calcAge.ts';

interface CardCompleteProps {
  booking: BookingType;
}

export default function CardComplete({booking}: CardCompleteProps) {
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
          {'/'}{calcAge(booking.customer.birth)}
          {'/'}{NATION[booking.customer.nation as NATION_KEY]}
        </span>
      </Box>

      <Box className="text-zinc-500 tracking-wide">
        {booking.customer.phone || booking.customer.email}
      </Box>

      <Box className="text-zinc-400 text-xs">
        결제 완료 {formatDate(booking.confirmedDate, 'YYYY-MM-DD HH:mm')}
      </Box>

      <Box className="w-full gap-4 mt-4" direction="vertical">
        {booking.medicalRecords.map((medical) => (
          <Box key={medical.id} className="gap-1.5" direction="vertical">
            <div className="font-medium text-sm">{medical.procedureName}</div>
            
            <Box className="gap-1.5">
              <Search placeholder="bed" size="small" />
              <Search
                placeholder="doc"
                size="small"
                options={staffs}
                handleChangeOption={handleChangeOption}
              />
              <Search
                placeholder="assi"
                size="small"
                options={staffs}
                handleChangeOption={handleChangeOption}
              />
              <Search
                placeholder="skin"
                size="small"
                options={staffs}
                handleChangeOption={handleChangeOption}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
