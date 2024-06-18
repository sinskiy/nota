import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Skeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge(
        "animate-pulse size-full bg-surface rounded-main",
        className
      )}
    ></div>
  );
}
