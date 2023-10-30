import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Contacts.module.css'
import Layout from '../components/Layout.js'
import { useState } from 'react';


export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = function (event) {
        event.preventDefault()
        const data = new FormData(event.target)
        setUsername(data.get('username'));
        setPassword(data.get('password'));
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
                    <input type="text" name='username' />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name='password' />
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
            <p>Username: {username}</p>
            <p>Password: {password}</p>
        </Layout>

    );

}

