import { cn } from "@/libs/utils";

export const Heading = ({ title, className, style }: { title: string; className?: string; style?: any }) => (
    <h1 className={cn('text-white text-[40px] text-left font-medium leading-[1.3]', className)} style={style}>
    {title}
      </h1>
)