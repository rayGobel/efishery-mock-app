import React, { FC, Fragment, MouseEvent, useState, useEffect } from 'react';

import Toolbar, { SortDirection } from './Toolbar';
import ProductDetail from './ProductDetail';
import Product from '../domain/Product';

type ProductListComponent = FC<{
  products?: Product[]
}>

const NoProductFound = () => {
  return (
    <p className="place-self-center font-light italic md:text-lg">No product(s) found</p>
  );
};

const ProductList: ProductListComponent = ({ products = [] }) => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

  const handleSortByPrice = (sortDirection: SortDirection) => {

    if (sortDirection == '') {
      setSortedProducts(products);
      return;
    }

    const sortedProducts = [...products];
    sortedProducts.sort((pA: Product, pB: Product) => {
      if (sortDirection == 'Highest') {
        return pB.price - pA.price;
      }

      if (sortDirection == 'Lowest') {
        return pA.price - pB.price;
      }

      return 0;
    });

    setSortedProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Toolbar onSortByPrice={handleSortByPrice} />

      <div className="flex flex-col gap-y-1 md:w-8/12 md:place-self-center" data-testid="product-list">
        {
          sortedProducts.length
          ? sortedProducts.map((p: Product) => <ProductDetail key={p.id} product={p} />)
          : <NoProductFound />
        }
      </div>
    </div>
  )
};

export default ProductList;
