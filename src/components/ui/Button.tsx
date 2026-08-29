"use client";

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from "@base-ui/react/button";
import { forwardRef, type ReactNode } from "react";

const variantStyles = {
  ghost: `
        border
        border-transparent
        bg-transparent
        hover:bg-surface-hover
    `,
  outline: `
        border
        border-border
        bg-background
        shadow-sm
        hover:bg-surface-hover
    `,
} as const;

const sizeStyles = {
  default: "h-10 px-3",
  icon: "size-10",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export type ButtonProps = Omit<
  BaseButtonProps,
  "className" | "nativeButton" | "render"
> & {
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

const baseStyle = `
    inline-flex
    shrink-0
    cursor-pointer
    touch-manipulation
    select-none
    items-center
    justify-center
    gap-2
    whitespace-nowrap
    rounded-lg
    text-sm
    font-medium
    text-foreground
    transition
    duration-150
    active:scale-[0.98]
    data-popup-open:bg-surface-hover
    data-disabled:cursor-not-allowed
    data-disabled:opacity-50
    motion-reduce:transition-none
    motion-reduce:active:scale-100
`;

export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(
  { className, size = "default", type = "button", variant = "ghost", ...props },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      type={type}
      className={[
        baseStyle,
        variantStyles[variant],
        sizeStyles[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});

export type IconButtonProps = Omit<
  ButtonProps,
  "aria-label" | "children" | "size"
> & {
  "aria-label": string;
  children?: ReactNode;
};

export const IconButton = forwardRef<HTMLElement, IconButtonProps>(
  function IconButton(props, ref) {
    return <Button ref={ref} size="icon" {...props} />;
  },
);
