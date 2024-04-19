'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

type HydrationZustandProps = {
  children: ReactNode;
};

const HydrationZustand: FC<HydrationZustandProps> = ({ children }) => {
  const [isHydrated, setHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationZustand;
