import { FC, useEffect, useState } from 'react';

interface IDelayedProps {
  children: JSX.Element;
  waitTimeMs?: number;
}

export const Delayed: FC<IDelayedProps> = ({ children, waitTimeMs = 200 }) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsShown(true), waitTimeMs);
    return () => clearTimeout(timer);
  }, [waitTimeMs]);

  return isShown ? children : null;
};
