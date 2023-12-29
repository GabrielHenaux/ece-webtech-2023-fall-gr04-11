// components/Layout.js
import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

export default function Layout({
  children,
  title,
  description
}) {
  return (
    <>
      <Head>
        <title>{`Webtech ${title && `- ${title}`}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        {<Header />}
        <main className="main">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
