import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import RangeSlider from 'react-range-slider-input';
import {
  Button,
  Popover,
  PopoverHandler,
  PopoverContent
} from '@material-tailwind/react';
import 'react-range-slider-input/dist/style.css';

const MIN = import.meta.env.VITE_PRICE_RANGE_MIN;
const MAX = import.meta.env.VITE_PRICE_RANGE_MAX;

type Props = {
  active: boolean;
  onChangePrice: (values: number[]) => void;
};

const FilterPopover: React.FC<Props> = ({ active, onChangePrice }) => {
  const [values, setValues] = useState<number[]>([MIN, MAX]);

  useEffect(() => {
    setValues([MIN, MAX]);
  }, [active]);

  const handleChangeSlider = (changeValue: number[]) => {
    setValues(changeValue);
    onChangePrice(changeValue);
  };

  return (
    <Popover placement="top-start">
      <PopoverHandler>
        <Button color="gray" className={clsx(active && 'bg-blue-500')}>
          Filter
        </Button>
      </PopoverHandler>
      <PopoverContent className="w-[420px]">
        <p className="font-semibold text-gray-900 mb-4">Filter by price</p>
        <div className="flex items-center gap-6">
          <span className="text-gray-900 rounded border border-gray-300 w-20 h-8 flex items-center justify-center">
            ${values[0]}
          </span>
          <RangeSlider
            min={0}
            max={1000}
            value={values}
            onInput={handleChangeSlider}
          />
          <span className="text-gray-900 rounded border border-gray-300 w-20 h-8 flex items-center justify-center">
            ${values[1]}
          </span>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
