// components/Layout.tsx
import Link from 'next/link';
import styles from './Layout.module.css'; // Assuming you have some styles

import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Link href="/" className={`flex direction-row ${styles.homeLink}`}>
                    {/* {styles.homeLink} */}
                    al indekso
                </Link>
            </header>
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

export default Layout;