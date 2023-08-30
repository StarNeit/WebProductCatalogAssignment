import React, { useState, useEffect } from 'react';
import { HeaderOption, SortOption } from '@types';
import { useProductStore } from '@stores/product';
import SortMenu from '@components/widgets/SortMenu';
import FilterPopover from '@components/widgets/FilterPopover';

const Header = () => {
  const {
    filterOption: { category, sortByRate, sortByPrice },
    changeSortByPrice,
    changeSortByRate,
    changePrice
  } = useProductStore();

  const [activeHeaderOption, setActiveHeaderOption] = useState<HeaderOption>(
    HeaderOption.Sort
  );

  useEffect(() => {
    setActiveHeaderOption(HeaderOption.Sort);
  }, [category]);

  const handleChangeSortByPrice = (option: SortOption) => {
    setActiveHeaderOption(HeaderOption.Sort);
    changeSortByPrice(option);
  };

  const handleChangeSortByRate = (option: SortOption) => {
    setActiveHeaderOption(HeaderOption.Sort);
    changeSortByRate(option);
  };

  const handleChangeFilterByPrice = (prices: number[]) => {
    setActiveHeaderOption(HeaderOption.Filter);
    changePrice(prices);
  };

  return (
    <div className="w-full px-8 py-6 bg-gray-200 flex items-center gap-8">
      <SortMenu
        active={activeHeaderOption === HeaderOption.Sort}
        sortableByRate={category === 'all'}
        onSortByPrice={handleChangeSortByPrice}
        onSortByRate={handleChangeSortByRate}
        sortOption={{
          rate: sortByRate,
          price: sortByPrice
        }}
      />
      <FilterPopover
        active={activeHeaderOption === HeaderOption.Filter}
        onChangePrice={handleChangeFilterByPrice}
      />
    </div>
  );
};

export default Header;
