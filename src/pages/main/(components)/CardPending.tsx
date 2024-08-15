import Box from '@components/layout/box/Box.tsx';
import {GENDER, GENDER_KEY, NATION, NATION_KEY} from '@/constants.ts';
import {BookingType} from '@/api/bookings/type.ts';
import {formatDate} from '@/utils/dateFormat.ts';
import {calcAge} from '@/utils/calcAge.ts';

interface CardPendingProps {
  booking: BookingType;
}

export default function CardPending({booking}: CardPendingProps) {
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
    </Box>
  );
}
