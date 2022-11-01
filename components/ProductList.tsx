import { FC, MouseEvent } from 'react';

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

const ProductList: FC = () => {
  const btnStyle = `btn px-4 py-2 w-fit border border-blue-200`;

  const handleFilterClick = (ev: MouseEvent<HTMLElement>) => {
    console.log({ ev });
    ev.preventDefault();
  };

  const handleSortClick = (ev: MouseEvent<HTMLElement>) => {
    console.log({ ev });
    ev.preventDefault();
  };

  return (
    <div className="flex flex-col gap-y-1" data-testid="product-list">
      <div className="toolbar px-2 py-1 flex flex-row gap-x-2 place-content-end mb-3">
        <button className={btnStyle} onClick={handleFilterClick}>Filter</button>
        <button className={btnStyle} onClick={handleSortClick}>Sort</button>
      </div>

      { mockProducts().map((p: Product) => <ProductDetail key={p.name} product={p} />) }
    </div>
  )
};

export default ProductList;
