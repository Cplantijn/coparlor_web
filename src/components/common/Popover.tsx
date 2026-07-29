import * as RadixPopover from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ReactElement,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import { cn } from "@utils";

const popoverContentVariants = cva(
  "z-50 overflow-auto rounded-md border border-gray-200 bg-white p-4 text-gray-950 shadow-lg outline-none ring-1 ring-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      size: {
        sm: "h-[150px] w-[300px]",
        md: "h-[225px] w-[450px]",
        lg: "h-[480px] w-[600px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type PopoverContentSize = NonNullable<
  VariantProps<typeof popoverContentVariants>["size"]
>;

export type PopoverContentProps = ComponentPropsWithoutRef<
  typeof RadixPopover.Content
> &
  VariantProps<typeof popoverContentVariants>;

export const PopoverContent = forwardRef<
  ComponentRef<typeof RadixPopover.Content>,
  PopoverContentProps
>(function PopoverContent({ className, sideOffset = 8, size, ...props }, ref) {
  return (
    <RadixPopover.Portal>
      <RadixPopover.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          popoverContentVariants({ size }),
          "max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]",
          className,
        )}
        {...props}
      />
    </RadixPopover.Portal>
  );
});

export type PopoverProps = ComponentPropsWithoutRef<
  typeof RadixPopover.Root
> & {
  trigger: ReactElement;
  children: ReactNode;
  contentClassName?: string;
  size?: PopoverContentSize;
} & Pick<
    PopoverContentProps,
    | "align"
    | "alignOffset"
    | "avoidCollisions"
    | "collisionPadding"
    | "side"
    | "sideOffset"
  >;

export function Popover({
  trigger,
  children,
  contentClassName,
  size,
  align = "center",
  alignOffset,
  avoidCollisions,
  collisionPadding,
  side,
  sideOffset,
  ...props
}: PopoverProps) {
  return (
    <RadixPopover.Root {...props}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <PopoverContent
        align={align}
        alignOffset={alignOffset}
        avoidCollisions={avoidCollisions}
        collisionPadding={collisionPadding}
        side={side}
        sideOffset={sideOffset}
        size={size}
        className={contentClassName}
      >
        {children}
      </PopoverContent>
    </RadixPopover.Root>
  );
}

export const PopoverRoot = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverClose = RadixPopover.Close;
