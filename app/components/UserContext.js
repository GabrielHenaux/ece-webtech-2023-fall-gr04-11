import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import styles from '../styles/Layout.module.css'
import React, { useEffect, useState } from "react";



export default function UserContext({children}){
    const [userProfile, setUserProfile] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState();

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/profile');
                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data);
                } else if (response.status === 401) {
                    setError('You are not logged in');
                } else {
                    throw new Error('Failed to fetch profile');
                }
            } catch (error) {
                console.error(error);
            }
        };
 
        fetchProfile();
    }, []);

    return (
        <div>
            {isLoggedIn && (
                <div>
                    <div>
                        <Image src={'/profile.png'} alt="profile" width={50} height={50} />
                    </div>
                    <div>
                        <h2>
                            {userProfile.firstName} {userProfile.lastName}
                        </h2>
                        <h3>{userProfile.email}</h3>
                    </div>
                </div>
            )}
            <div className={styles.container}>
                {isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <button onClick={handleLogin}>Login</button>
                )}
            </div>
        </div>
    );
}