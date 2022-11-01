import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import ProductDetail, { Product } from './ProductDetail';

let mockProduct = {
  name: 'Fish',
  price: 10000,
  location: {
    city: 'Bandung',
    province: 'Jakarta'
  },
  size: 60
};

describe('<ProductDetail /> Renders', () => {
  it('should have the name and price of product', () => {
    render(
      <ProductDetail product={mockProduct} />
    )

    const productName = screen.getByTestId('product-name');
    const productPrice = screen.getByTestId('product-price');
    const priceString = within(productPrice).getByText('Rp10.000,-');

    expect(productName).toBeVisible();
    expect(productPrice).toBeVisible();
    expect(priceString).toBeVisible();
  });

  it('should call "click" event when product detail is clicked', async () => {
    let callbackFn = jest.fn();
    let user = userEvent.setup();

    render(
      <ProductDetail product={mockProduct} onClick={callbackFn} />
    )

    await user.click(screen.getByTestId('product-detail'));

    expect(callbackFn).toBeCalledWith(expect.objectContaining({ name: expect.any(String) }));

  });
});
