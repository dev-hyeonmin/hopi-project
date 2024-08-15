import useThrottleDebounce from '@/hooks/useThrottleDebounce.ts';
import React, {useEffect, useMemo} from 'react';
import useHandleState from '@/hooks/useHandleState.ts';

export interface OptionProps {
  id: number;
  value: string;
}

interface BaseSearchProps {
  className?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  defaultValue?: string | number;
  handleChangeInput?: (value: string) => void;
  optionsMaxHeight?: number;
  showIcon?: boolean;
}

interface SearchPropsWithoutOptions extends BaseSearchProps {
  options?: OptionProps[];
  handleChangeOption?: (option: OptionProps) => void;
}

interface SearchPropsWithOptions extends BaseSearchProps {
  options: OptionProps[];
  handleChangeOption: (option: OptionProps) => void;
}

type SearchProps = SearchPropsWithoutOptions | SearchPropsWithOptions;

const sizeVariants: Record<string, string> = {
  small: 'text-sm px-2.5 py-1.5 rounded-md',
  medium: 'px-3 py-1.5 rounded-md',
  large: 'px-4 py-3 rounded-lg',
};

const searchBgStyle = {
  paddingRight: '48px',
  backgroundImage: 'url(/public/assets/images/icn-search.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'calc(100% - 12px) 50%',
};

export default function Search({
  className,
  placeholder,
  size = 'medium',
  disabled,
  handleChangeInput,
  options,
  handleChangeOption,
  optionsMaxHeight,
  showIcon = false,
}: SearchProps) {
  const bgStyle = showIcon ? searchBgStyle : {};
  const style = [
    'w-full outline-none border border-zinc-200 focus:border-primary',
    sizeVariants[size],
    className,
  ].join(' ');

  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {state, open, close} = useHandleState(ref);
  const {value: currentValue, handleChange} = useThrottleDebounce({ref: inputRef});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event.target.value);
  };

  const handleOptionSelected = ({id, value}: OptionProps) => {
    handleChange(value);
    handleChangeOption?.({id, value});
    close();
  };

  const handleInputClick = () => {
    if (!options) {
      return;
    }

    open();
  };

  useEffect(() => {
    handleChangeInput?.(currentValue);
  }, [currentValue]);

  return (
    <div ref={ref} className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        className={style}
        style={bgStyle}
        disabled={disabled}
        onChange={handleInputChange}
        onClick={handleInputClick}
      />

      {state && options && (
        <Options
          keyword={currentValue}
          options={options}
          handleOptionSelected={handleOptionSelected}
          maxHeight={optionsMaxHeight}
          size={size}
        />
      )}
    </div>
  );
}

/**
 * Search Options
 */
interface OptionsProps {
  keyword: string;
  options: OptionProps[];
  handleOptionSelected: (option: OptionProps) => void;
  maxHeight?: number;
  size?: 'small' | 'medium' | 'large';
}

const optionSizeVariants: Record<string, string> = {
  small: 'text-sm px-2.5 py-1.5',
  medium: 'px-3 py-1.5',
  large: 'px-4 py-3',
};

function Options({
  keyword,
  options,
  handleOptionSelected,
  maxHeight = 180,
  size = 'medium',
}: OptionsProps) {
  const optionStyle = [
    'cursor-pointer truncate hover:bg-zinc-100',
    optionSizeVariants[size],
  ].join(' ');

  const filteredOptions = useMemo(() => {
    // TODO 자음 모음 검색
    if (!keyword) return options;
    return options.filter((option) =>
      option.value.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [options, keyword]);

  return (
    <ul
      className="absolute w-full bg-white mt-1 shadow-lg rounded-md overflow-hidden z-10 overflow-y-auto"
      style={{maxHeight: `${maxHeight}px`}}>
      {filteredOptions?.map((option) => (
        <li
          key={option.id}
          onClick={() => handleOptionSelected(option)}
          className={optionStyle}>
          {option.value}
        </li>
      ))}
    </ul>
  );
}
