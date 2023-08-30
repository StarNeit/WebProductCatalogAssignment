import axios, { AxiosResponse } from 'axios';
import { Product } from '@types';

export const fetchCategory = (): Promise<AxiosResponse<string[]>> => {
  return axios.get<string[]>('/products/categories');
};

export const fetchProducts = (
  params: Record<string, string> = {},
  category?: string
): Promise<AxiosResponse<Product[]>> => {
  const url = category ? `/products/category/${category}` : '/products';

  return axios.get<Product[]>(url, {
    params
  });
};
