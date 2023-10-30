
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from "react";


export default function Header(){

    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);

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
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={`/`}>
          <Image src="/ferrari.png" alt="FerrariNews Logo" width={50} height={50} />
          <span>
            FerrariNews
          </span>
        </Link>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link href="/articles">
            Articles
          </Link>
        </li>
        <li>
          <Link href="/about">
            About us
          </Link>
        </li>
        <li>
          <Link href="/contacts">
            Contact us
          </Link>
        </li>
        <li>
          <div>
            {error && <div>{error}</div>}
            <div>
              <Image src={'/profile.png'} alt="profile" width={50} height={50} />
            </div>
            {userProfile && 
            <div><h2>
              {userProfile.firstName} {userProfile.lastName}
              </h2>
              <h3>
              {userProfile.email}
            </h3>
            </div>  
        }
          </div>
        </li>
      </ul>
    </header>
  )
}