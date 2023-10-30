import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout.js'

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>WebTech - About us</title>
        <meta name="description" content="Don't be shy, drop us an email" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserContext>
      </UserContext>
      <h1>
        About us
      </h1>
      <p>
        We are a group of students from ECE Paris, a French engineering school. We are currently studying Web Technologies and we have to create a website using Next.js.
      </p>
    </Layout>
  )
}
