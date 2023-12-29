import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

/**
 * Renders the layout component for the web application.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered within the layout.
 * @param {string} props.title - The title of the web page.
 * @param {string} props.description - The description of the web page.
 * @returns {ReactNode} The rendered layout component.
 */
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
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap" rel="stylesheet" />
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
