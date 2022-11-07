export type UUID = string;

export type Location = {
  city: string;
  province: string;
}

export type Product = {
  id: UUID,
  name: string,
  location: Location,
  price: number,
  size: number,
}

export default Product;
