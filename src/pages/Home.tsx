import React, { ReactElement, useEffect } from 'react';
import Layout from '@components/layout';
import ProductCard from '@components/widgets/ProductCard';
import { useProductStore } from '@stores/product';

const Home = (): ReactElement => {
  const { getAllProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
