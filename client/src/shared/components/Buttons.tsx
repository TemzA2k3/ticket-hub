import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "default" | "sm";
// type ButtonWidth = "auto" | "block";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconOnly?: boolean;
  type?: ButtonType;
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "default",
  fullWidth = false,
  iconOnly = false,
  type = "button",
  className,
  children,
  ...props
}) => {
  const classes = clsx(
    "inline-flex items-center justify-center font-medium cursor-pointer transition-all whitespace-nowrap rounded-[var(--radius)]",
    {
      "bg-primary text-primary-foreground border-none hover:bg-primary-hover": variant === "primary",
      "bg-transparent text-foreground border border-border hover:bg-accent": variant === "outline",
      "h-10 px-4 text-sm": size === "default" && !iconOnly,
      "h-8 px-3 text-xs": size === "sm" && !iconOnly,
      "w-full": fullWidth,
      "w-10 px-0": iconOnly,
    },
    className
  );

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};
