
import styles from '../styles/Layout.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href={`/`}>
          <Image src="/ferrari.png" alt="Adaltas Logo" width={50} height={50} />
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
      </ul>
    </header>
  )
}
