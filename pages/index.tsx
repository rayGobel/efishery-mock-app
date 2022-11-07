import Head from 'next/head';
import React, { FC, Fragment, useEffect, useState } from 'react';
import Product from '../domain/Product';
import ProductService from '../domain/ProductService';
import ProductDetail from '../components/ProductDetail';
import ProductList from '../components/ProductList';

const productService = new ProductService();

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const initProducts = async () => {
      const products = await productService.getProducts();

      setProducts(products);
    };

    initProducts();
  }, []);

  const borderBtm = `border-b-2 border-black`;

  const headerClass = `app-header flex flex-col gap-y-2 py-2 px-4 ${borderBtm}`;
  const sidebarClass = `app-sidebar hidden w-2/12`;
  const contentClass = `app-content w-full py-3 relative`;
  const footerClass = `app-footer flex p-4 md:py-6 md:px-4 border-t-2 font-sans`;

  return (
    <>
      <div className="app-root grid grid-rows-[auto_1fr_auto] grid-cols-[100%] min-h-full">
        <Head>
          <title>EFishery Crud App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={headerClass}>
          <h1 className="logo text-2xl font-semibold">EFishery</h1>
          <h2 className="title text-lg ">Price Lookup</h2>
        </header>

        <main className="main-content flex flex-row justify-between">
          <section className={sidebarClass}>
            <h2>Sidebar Title</h2>
          </section>

          <section className={contentClass}>
            <ProductList products={products} />
          </section>
        </main>

        <footer className={footerClass}>
          <p>EFishery Mock App - 2022</p>
        </footer>
      </div>
    </>
  )
}
