import Head from 'next/head'

export default function Home() {
  const headerClass = `app-header bg-red-50`;
  const sidebarClass = `app-sidebar bg-green-50 w-2/12`;
  const contentClass = `app-content bg-cyan-50 w-full`;
  const footerClass = `app-footer bg-orange-50`;

  return (
    <div className="app-root grid grid-rows-[auto_1fr_auto] grid-cols-[100%] min-h-full">
      <Head>
        <title>EFishery Crud App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={headerClass}>
        <h1>Header Title</h1>
      </header>

      <main className="main-content flex flex-row justify-between">
        <section className={sidebarClass}>
          <h2>Sidebar Title</h2>
        </section>

        <section className={contentClass}>
          <h2>Content Title</h2>
        </section>
      </main>

      <footer className={footerClass}>
        <p>Footer text</p>
      </footer>
    </div>
  )
}