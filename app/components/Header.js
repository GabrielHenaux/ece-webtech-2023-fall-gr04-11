
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import UserContext from './UserContext';


export default function Header(){

    const [error, setError] = useState(null);
    const {isLoggedIn} = require('../components/UserContext.js');

    

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
        <UserContext>
        </UserContext>
        </li>
        
        
      </ul>
    </header>
  )
}