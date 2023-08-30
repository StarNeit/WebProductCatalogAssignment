import React, { useState } from 'react';
import { List, ListItem } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { fetchCategory } from '@services/product';
import { useProductStore } from '@stores/product';
import clsx from 'clsx';

const Sidebar = () => {
  const { changeCategory } = useProductStore();

  const [category, setCategory] = useState<string>('all');
  const { data } = useQuery({
    queryKey: ['fetchCategory'],
    queryFn: fetchCategory
  });

  const handleChangeCategory = (value: string) => {
    setCategory(value);
    changeCategory(value);
  };

  return (
    <div className="min-w-[320px] bg-gray-200 p-8 pt-20 border-r border-r-gray-300">
      <List>
        <ListItem
          className={clsx(category === 'all' && 'text-black font-bold')}
          onClick={() => handleChangeCategory('all')}>
          All Categories
        </ListItem>
        {data?.data?.map((label, index) => (
          <ListItem
            key={index}
            className={clsx(
              'capitalize',
              category === label && 'text-black font-bold'
            )}
            onClick={() => handleChangeCategory(label)}>
            {label}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
