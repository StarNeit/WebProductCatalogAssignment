declare module 'react-range-slider-input' {
  import * as React from 'react';

  interface RangeSliderInputProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number[];
    onInput?: (value: number[]) => void;
    formatLabel?: (value: number) => React.ReactNode;
    label?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    rangeSlideDisabled?: boolean;
    defaultValue?: number[];
    thumbsDisabled?: boolean[];
  }

  const RangeSliderInput: React.FC<RangeSliderInputProps>;

  export default RangeSliderInput;
}
