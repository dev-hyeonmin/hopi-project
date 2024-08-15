// hooks/useThrottleDebounce.ts
import {useCallback, useRef, useState} from 'react';
import {ThrottleManager} from '@/utils/throttle';

const throttleManager = new ThrottleManager(100);

interface UseThrottleDebounceProps {
  ref?: React.RefObject<HTMLInputElement>;
  initialValue?: string;
  debounceTime?:number;
}

const useThrottleDebounce = ({
  ref,
  initialValue= '',
  debounceTime = 500,
}: UseThrottleDebounceProps) => {
  const [value, setValue] = useState(initialValue);
  const latestValue = useRef(initialValue);

  const throttledSetValue = useCallback(
    throttleManager.create((newValue: string) => {
      setValue(newValue);
      latestValue.current = newValue;
    }),
    [],
  );

  const debouncedSetValue = useCallback(
    throttleManager.debounce((newValue: string) => {
      setValue(newValue);
    }, debounceTime),
    [debounceTime],
  );

  const handleChange = useCallback(
    (newValue: string) => {
      throttledSetValue(newValue);
      debouncedSetValue(newValue);

      if (ref?.current) {
        ref.current.value = newValue;
      }
    },
    [throttledSetValue, debouncedSetValue],
  );

  return {value, setValue, handleChange};
};

export default useThrottleDebounce;
