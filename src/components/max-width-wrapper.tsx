import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface IMaxWidthWrapper {
  className?: string;
  children: ReactNode;
}

const MaxWidthWrapper = ({ className, children }: IMaxWidthWrapper) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      <div
        className={cn(
          'mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20',
          className,
        )}
      >
        {children}
      </div>
    </div>

  );
};

export default MaxWidthWrapper;
