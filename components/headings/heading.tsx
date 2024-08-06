import { cn } from '@/libs/utils';

export const Heading = ({
  title,
  className,
  style,
}: {
  title: string;
  className?: string;
  style?: any;
}) => (
  <h1
    className={cn(
      'text-white text-[32px] lg:text-[40px] text-center lg:text-left font-medium leading-[1.3]',
      className
    )}
    style={style}
    data-aos="fade-up"
    data-aos-duration="500"
    data-aos-easing="linear"
  >
    {title}
  </h1>
);
