import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Contacts.module.css'
import Layout from '../components/Layout.js'
import { useState } from 'react';

export default function Page() {
    const [count, setCount] = useState(0);

    return (
        <Layout>
            <Head>
                <title>Use State Page</title>
            </Head>
            <h1>Use State Page</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Click me!</button>
        </Layout>
    )
}
