import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import UserContext from '@/components/UserContext.js'

export default function Page({articles}) {
  return (
    <Layout>
      <Head>
        <title>WebTech - articles</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/ferrari.png" />
      </Head>

      <h1>
        Ferrari Articles
      </h1>
      <p className="italic font-bold">CEO true story about the best world car manufacturer</p>
      <ul>
        { articles.map( article => (
          <li key={article.slug}>
            <h2><Link href={`/articles/${article.slug}`}>{article.title}</Link></h2>
            <Image src={`/articles/${article.image}`} alt="Ferrari picture" width={300} height={300} />
            <p>{article.message}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3000/api/articles');
  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
}
