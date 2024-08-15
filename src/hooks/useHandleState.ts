import {useEffect, useState} from 'react';

const useHandleState = (
  ref: React.RefObject<HTMLElement>,
  callback?: () => void,
) => {
  const [state, setState] = useState(false);

  const open = () => setState(() => true);
  const close = () => setState(() => false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
        callback?.();
      }
    };
    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [ref]);

  return {state, open, close};
};

export default useHandleState;
