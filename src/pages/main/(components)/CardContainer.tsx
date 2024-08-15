import Box from '@components/layout/box/Box.tsx';
import {GetBookingsParams} from '@/api/bookings/type.ts';
import {getBookingsComplete, getBookingsPending, getBookingsProgress} from '@/api/bookings';
import React, {useEffect, useMemo, useRef} from 'react';
import CardComplete from '@/pages/main/(components)/CardComplete.tsx';
import CardPending from '@/pages/main/(components)/CardPending.tsx';
import CardProgress from '@/pages/main/(components)/CardProgress.tsx';

interface CardContainerProps extends CardListBoxProps {
  title: string;
}

export default function CardContainer({title, ...props}: CardContainerProps) {
  return (
    <Box direction="vertical" className="w-1/3 h-full rounded-xl bg-purple-100 border border-zinc-200">
      <div className="p-4 font-bold">{title}</div>

      <CardListBox {...props} />
    </Box>
  );
}

/**
 * CardListBox
 */
const CardListVariableByType = (type: CardContainerProps['type']) => {
  switch (type) {
    case 'PENDING':
      return {
        getQuery: getBookingsPending,
        component: CardPending
      };
    case 'PROGRESS':
      return {
        getQuery: getBookingsProgress,
        component: CardProgress
      };
    case 'COMPLETE':
      return {
        getQuery: getBookingsComplete,
        component: CardComplete
      };
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
  const {getQuery, component} = CardListVariableByType(type);
  const {data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage} = getQuery(options);
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
      className="w-full h-full px-4 pb-4 overflow-y-auto gap-4">
      {bookings?.map((booking, index) => (
        <div key={booking.id} ref={bookings.length - 3 === index ? observeRef : null} className="w-full">
          {React.createElement(component, {booking})}
        </div>
      ))}
    </Box>
  );
}
