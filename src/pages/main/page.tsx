import Button from '@/components/actions/Button.tsx';
import {useContext, useMemo} from 'react';
import {ConfirmContext} from '@/utils/confirm.ts';
import Search, {OptionProps} from '@components/form/Search.tsx';
import {getStaffs} from '@/api/staffs';
import Box from '@components/layout/box/Box.tsx';
import CardContainer from '@/pages/main/(components)/CardContainer.tsx';
import {GetBookingsParams} from '@/api/bookings/type.ts';

const INIT_BOOKING_PARMAS: GetBookingsParams = {
  bookingDate: '2024-08-06',
  perPage: 10
};

export default function Main() {
  const {confirm} = useContext(ConfirmContext);
  const bookingsParams = INIT_BOOKING_PARMAS;

  const {data} = getStaffs();

  const staffOptions = useMemo(() => {
    return data?.staff.map((staff) => ({
      id: staff.id,
      value: staff.name
    }));
  }, [data?.staff]);

  const onClick = async (message: string) => {
    const result = await confirm({title: 'title', message});
    console.log(result);
  };

  const handleSearchChange = (_: string) => {
    // console.log(value);
  };

  const handleSearchOptionChange = ({id}: OptionProps) => {
    console.log(`Select id : ${id}`);
  };

  return (
    <div className="w-1/3">
      <Search
        placeholder={'Search'}
        handleChangeInput={handleSearchChange}
        options={staffOptions}
        handleChangeOption={handleSearchOptionChange}
      />
      <Button label={'Submit'} onClick={() => onClick('hello')} />
      <Button
        label={'Submit'}
        priority={'primary'}
        onClick={() => onClick('world')}
      />

      <Box className="absolute w-full h-full gap-4">
        <CardContainer title="예약현황" type="PENDING" options={bookingsParams} />
        <CardContainer title="접수완료" type="PROGRESS" options={bookingsParams} />
        <CardContainer title="결제완료" type="COMPLETE" options={bookingsParams} />
      </Box>
    </div>
  );
}
