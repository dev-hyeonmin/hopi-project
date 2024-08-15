import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  className?: string;
  label: string;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  skin?: 'default' | 'primary';
  priority?: 'primary' | 'secondary';
}

const disabledStyles =
  'bg-zinc-100 text-zinc-400 border-zinc-100 cursor-not-allowed';

const colorVariants = {
  primary: {
    primary: 'bg-primary text-white border-primary',
    secondary: 'text-primary',
  },
  default: {
    primary: 'border-zinc-600',
    secondary: 'border-zinc-200',
  },
  disabled: {
    primary: disabledStyles,
    secondary: disabledStyles,
  },
};

const sizeVariants: Record<string, string> = {
  tiny: 'text-xs px-2 py-1 rounded-md',
  small: 'text-sm px-2.5 py-1.5 rounded-md',
  medium: 'px-3 py-1.5 rounded-md',
  large: 'text-lg px-4 py-3 rounded-lg',
};

export default function Button({
  className,
  label,
  type = 'button',
  size = 'medium',
  skin = 'default',
  priority = 'secondary',
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  const style = [
    colorVariants[disabled ? 'disabled' : skin][priority],
    sizeVariants[size],
    className,
  ].join(' ');

  return (
    <button
      type={type}
      className={`border font-bold ${style}`}
      onClick={onClick}
      disabled={disabled}>
      {label}
    </button>
  );
}
