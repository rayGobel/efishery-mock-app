import { FC, Fragment, MouseEvent, useState, useEffect } from 'react';

import Toolbar, { SortDirection } from './Toolbar';
import ProductDetail from './ProductDetail';
import Product from '../domain/Product';

function mockProducts (): Product[] {
  return [
    {
      name: 'SARDEN 22',
      location: {
        city: 'SITUBONDO',
        province: 'JAWA TIMUR',
      },
      price: 200000,
      size: 30
    },
    {
      name: 'Nila',
      location: {
        city: 'BANDUNG',
        province: 'JAWA BARAT',
      },
      price: 10000,
      size: 60
    },
    {
      name: 'Lele',
      location: {
        city: 'KOTA TUA',
        province: 'DKI JAKARTA',
      },
      price: 300000,
      size: 110
    },
    {
      name: 'Udang',
      location: {
        city: 'PANDEGLANG',
        province: 'BANTEN',
      },
      price: 300000,
      size: 50
    },
  ];
};

type SortFacet = 'Price' | 'Name' | null;

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockProducts());
  }, []);

  const btnStyle = `btn px-4 py-2 w-fit border border-blue-200`;
  const handleSortByPrice = (sortDirection: SortDirection) => {

    if (sortDirection == '') {
      setProducts(mockProducts());
      return;
    }

    const sortedProducts = [...products];
    sortedProducts.sort((pA, pB) => {
      if (sortDirection == 'Highest') {
        return pB.price - pA.price;
      }

      if (sortDirection == 'Lowest') {
        return pA.price - pB.price;
      }

      return 0;
    });

    setProducts(sortedProducts);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Toolbar onSortByPrice={handleSortByPrice} />

      <div className="flex flex-col gap-y-1 md:w-8/12 md:place-self-center" data-testid="product-list">
        { products.map((p: Product) => <ProductDetail key={p.name} product={p} />) }
      </div>
    </div>
  )
};

export default ProductList;
