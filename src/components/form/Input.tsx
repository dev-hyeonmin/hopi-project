import {Controller, RegisterOptions, useFormContext} from 'react-hook-form';

export interface InputProps {
  className?: string;
  name: string;
  type?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  defaultValue?: string | number;
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

const sizeVariants: Record<string, string> = {
  small: 'text-sm px-2.5 py-1.5 rounded-md',
  medium: 'px-3 py-1.5 rounded-md',
  large: 'px-4 py-3 rounded-lg',
};

export default function Input({
  className,
  name,
  type,
  placeholder,
  size = 'medium',
  disabled,
  defaultValue,
  rules,
}: InputProps) {
  const method = useFormContext();
  const style = [
    'w-full outline-none border border-zinc-200 focus:border-primary',
    sizeVariants[size],
    className,
  ].join(' ');

  // default input
  if (method === null) {
    return (
      <input
        className={style}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
      />
    );
  }

  // react hook form
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      rules={rules}
      control={method.control}
      render={({field}) => (
        <input
          className={style}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          {...field}
        />
      )}
    />
  );
}
