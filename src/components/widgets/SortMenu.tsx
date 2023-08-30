import React from 'react';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList
} from '@material-tailwind/react';
import clsx from 'clsx';
import { SortOption } from '@types';

type Props = {
  active: boolean;
  onSortByPrice: (sort: SortOption) => void;
  onSortByRate: (sort: SortOption) => void;
  sortOption: {
    price: SortOption;
    rate: SortOption;
  };
  sortableByRate: boolean;
};

const SortMenu: React.FC<Props> = ({
  active,
  onSortByPrice,
  onSortByRate,
  sortOption,
  sortableByRate
}) => {
  const displaySortSymbol = (option: SortOption): string => {
    return option === 'desc' ? '(⇩)' : '(⇧)';
  };

  const handleChangeSortBySort = (): void => {
    onSortByPrice(sortOption.price === 'desc' ? 'asc' : 'desc');
  };

  const handleChangeSortByRate = (): void => {
    onSortByRate(sortOption.rate === 'desc' ? 'asc' : 'desc');
  };

  return (
    <Menu placement="top-start">
      <MenuHandler>
        <Button className={clsx(active && 'bg-blue-500')} color="gray">
          Sort
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={handleChangeSortBySort}>
          Sort by price{' '}
          <span className="font-semibold">
            {displaySortSymbol(sortOption.price)}
          </span>
        </MenuItem>
        <MenuItem onClick={handleChangeSortByRate} disabled={!sortableByRate}>
          Sort by rate{' '}
          <span className="font-semibold">
            {displaySortSymbol(sortOption.rate)}
          </span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SortMenu;
