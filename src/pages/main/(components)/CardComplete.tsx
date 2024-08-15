import Box from '@components/layout/box/Box.tsx';
import {GENDER, GENDER_KEY, NATION, NATION_KEY} from '@/constants.ts';
import Search, {OptionProps} from '@components/form/Search.tsx';
import {getStaffs} from '@/api/staffs';
import {BookingType} from '@/api/bookings/type.ts';

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
    <Box key={booking.id} className="w-full bg-white" direction="vertical">
      <Box className="gap-1.5">
        <span>{booking.customer.chartCode}</span>
        <span>{booking.customer.name}</span>
      </Box>

      <Box className="gap-1.5">
        {/*<span>{booking.bookingDate}</span>*/}
        <span>{GENDER[booking.customer.gender as GENDER_KEY]}</span>
        <span>{NATION[booking.customer.nation as NATION_KEY]}</span>
      </Box>

      <Box className="w-full gap-1.5">
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
    </Box>
  );
}
