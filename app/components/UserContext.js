import { useState } from 'react';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import styles from '../styles/Layout.module.css'

export default function UserContext({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <div className={styles.container}>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    )
}