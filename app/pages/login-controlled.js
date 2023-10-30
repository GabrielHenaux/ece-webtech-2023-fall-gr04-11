import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Contacts.module.css'
import Layout from '../components/Layout.js'
import { useState } from 'react';


export default function LoginPage() {

    const [data, setData] = useState({});

    const onSubmit = function (event) {
        event.preventDefault()
        const data = new FormData(event.target)

    }

    return (
        <Layout>
            <Head>
                <title>Login Page</title>
            </Head>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit}>
                <label>
                    Username:
                    <input type="text" name='username' value={data.username} onChange={event => setData({username: event.target.value})}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name='password' value={data.password} onChange={event => setData({password: event.target.value})}/>
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <p>Username: {data.username}</p>
            <p>Password: {data.password}</p>
        </Layout>

    );        setUsername(data.get('username'));
    setPassword(data.get('password'));

}

