import { FC } from 'react';

type Location = {
  city: string;
  province: string;
}

export type Product = {
  name: string,
  location: Location,
  price: number,
  size: number,
}

type ProductComponent = {
  product: Product,
  onClick?: (p: Product) => void
}

const idnLocale = new Intl.NumberFormat('id-ID');

const ProductDetail: FC<ProductComponent> = (props) => {
  const { product, onClick } = props;
  const { location: productLocation } = product;

  const handleClickEvent = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const formattedPrice = idnLocale.format(product.price);

  const style = `px-4 py-2 text-slate-900 flex flex-row justify-between`;

  return (
    <div className={style} onClick={handleClickEvent} data-testid='product-detail'>
      <div>
        <p className='text-lg' data-testid='product-name'>{product.name} ({product.size})</p>
        <p className='text-xs'>{productLocation.city}, {productLocation.province}</p>
      </div>
      <p className='text-lg self-start' data-testid='product-price'>Rp{formattedPrice},-</p>
    </div>
  )
}

export default ProductDetail;
