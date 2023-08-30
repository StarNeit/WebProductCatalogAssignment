import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Product, SortOption } from '@types';
import { fetchProducts } from '@services/product';

interface ProductStoreState {
  filterOption: {
    sortByPrice: SortOption;
    sortByRate: SortOption;
    category: string;
  };
  products: Product[];
  initialProducts: Product[];
  isLoading: boolean;

  changeCategory: (category: string) => void;
  changeSortByPrice: (option: SortOption) => void;
  changeSortByRate: (option: SortOption) => void;
  changePrice: (prices: number[]) => void;
  getAllProducts: () => void;
}

export const useProductStore = create<ProductStoreState>()(
  devtools(
    (set, get) => ({
      filterOption: {
        sortByPrice: 'desc',
        sortByRate: 'desc',
        category: 'all'
      },
      products: [],
      initialProducts: [],
      isLoading: false,

      changeCategory: async (category: string) => {
        const {
          filterOption: { sortByPrice }
        } = get();

        set({
          filterOption: {
            sortByPrice: 'desc',
            sortByRate: 'desc',
            category
          },
          isLoading: true
        });

        try {
          const response = await fetchProducts(
            { sort: sortByPrice },
            category !== 'all' ? category : undefined
          );

          if (response.data) {
            set({
              products: response.data,
              initialProducts: response.data
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          set({ isLoading: false });
        }
      },
      changeSortByPrice: async (option: SortOption) => {
        const {
          filterOption: { category }
        } = get();

        set({
          filterOption: {
            category,
            sortByRate: 'desc',
            sortByPrice: option
          },
          isLoading: true
        });

        try {
          const response = await fetchProducts(
            { sort: option },
            category !== 'all' ? category : undefined
          );

          if (response.data) {
            set({
              products: response.data,
              initialProducts: response.data
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          set({ isLoading: false });
        }
      },
      changeSortByRate: (option: SortOption) => {
        const {
          filterOption: { category },
          initialProducts
        } = get();

        set({
          filterOption: {
            category,
            sortByRate: option,
            sortByPrice: 'desc'
          }
        });

        const sortedProducts = initialProducts.sort((prev, next) => {
          if (option === 'asc') return prev.rating.rate - next.rating.rate;
          else return next.rating.rate - prev.rating.rate;
        });

        set({ products: sortedProducts });
      },
      changePrice: (prices: number[]) => {
        const {
          initialProducts,
          filterOption: { category, sortByRate }
        } = get();
        const productsByPrice = initialProducts.filter(
          (product) => product.price >= prices[0] && product.price <= prices[1]
        );

        set({
          products: productsByPrice,
          filterOption: {
            category,
            sortByRate,
            sortByPrice: 'desc'
          }
        });
      },
      getAllProducts: async () => {
        try {
          const response = await fetchProducts();

          if (response.data) {
            set({
              products: response.data,
              initialProducts: response.data
            });
          }
        } catch (e) {
          console.error(e);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'product'
    }
  )
);
