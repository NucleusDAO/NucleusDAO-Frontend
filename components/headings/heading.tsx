import { cn } from "@/libs/utils";

export const Heading = ({ title, className }: { title: string; className?: string; }) => (
    <h1 className={cn('text-white text-[40px] text-left font-medium leading-[1.3]', className)}>
    {title}
      </h1>
)