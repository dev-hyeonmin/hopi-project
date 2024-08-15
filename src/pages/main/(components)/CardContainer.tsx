import Box from '@components/layout/box/Box.tsx';
import {GetBookingsParams} from '@/api/bookings/type.ts';
import {getBookingsComplete, getBookingsPending, getBookingsProgress} from '@/api/bookings';
import {useEffect, useMemo, useRef} from 'react';
import CompleteCard from '@/pages/main/(components)/CompleteCard.tsx';

interface CardContainerProps extends CardListBoxProps {
  title: string;
}

export default function CardContainer({title, ...props}: CardContainerProps) {
  return (
    <Box direction="vertical" className="w-1/3 h-full rounded-xl bg-secondary">
      <div>{title}</div>

      <CardListBox {...props} />
    </Box>
  );
}

/**
 * CardListBox
 */
const getQuery = (type: CardContainerProps['type']) => {
  switch (type) {
    case 'PENDING':
      return getBookingsPending;
    case 'PROGRESS':
      return getBookingsProgress;
    case 'COMPLETE':
      return getBookingsComplete;
  }
};

interface CardListBoxProps {
  type: 'PENDING' | 'PROGRESS' | 'COMPLETE';
  options: GetBookingsParams;
}

interface useIntersectionObserverProps {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
}

const useIntersectionObserver = ({fetchNextPage, isFetchingNextPage, hasNextPage}: useIntersectionObserverProps) => {
  const observeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }, {threshold: 0});

    if (observeRef.current) {
      observer.observe(observeRef.current);
    }

    return () => {
      if (observeRef.current) {
        observer.unobserve(observeRef.current);
      }
    };
  }, [observeRef.current, isFetchingNextPage]);

  return observeRef;
};


function CardListBox({type, options}: CardListBoxProps) {
  const {data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage} = getQuery(type)(options);
  const observeRef = useIntersectionObserver({fetchNextPage, isFetchingNextPage, hasNextPage});
  
  const bookings = useMemo(() => {
    return data?.pages.flatMap((page) => page.data);
  }, [data?.pageParams]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      direction="vertical"
      className="w-full h-full p-4 pb-0 overflow-y-auto">
      {bookings?.map((booking, index) => (
        <div key={booking.id} ref={bookings.length - 3 === index ? observeRef : null}>
          <CompleteCard booking={booking} />
        </div>
      ))}
    </Box>
  );
}
