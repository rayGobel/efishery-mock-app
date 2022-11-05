export type Location = {
  city: string;
  province: string;
}

export type Product = {
  name: string,
  location: Location,
  price: number,
  size: number,
}

export default Product;
