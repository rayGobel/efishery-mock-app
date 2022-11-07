import Product, { UUID } from './Product';

type ProductResponse = {
  id: UUID,
  komoditas: string,
  price: string,
  size: string,
  area_kota: string,
  area_provinsi: string
};

const onlyValidProducts = (p: Product) => {
  return p.price
    && p.location.city
    && p.location.province
};

class ProductService {
  private url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list';

  public async getProducts() {
    const result = await fetch(this.url)
      .then((res) => res.json())
      .then((res) => res);

    return result
      .map((product: ProductResponse) => {
        return {
          id: product.id,
          name: product.komoditas,
          price: parseInt(product.price, 10),
          size: parseInt(product.size, 10),
          location: {
            city: product.area_kota,
            province: product.area_provinsi
          }
        } as Product;
      })
      .filter(onlyValidProducts)
  }
}

export default ProductService;
