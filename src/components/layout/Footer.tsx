import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <div className={styles.brandTitle}>Forge</div>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            An open learning coding platform for everyone.
            Engineered from first principles: explain simply, build progressively, and master problem solving without barriers.
          </p>
        </div>

        <div>
          <div className={styles.colTitle}>Languages</div>
          <ul className={styles.list}>
            <li><Link href="/languages/java">Java Track</Link></li>
            <li><Link href="/languages/cpp">C++ Track</Link></li>
            <li><Link href="/languages/python">Python Track</Link></li>
            <li><Link href="/languages/javascript">JavaScript Track</Link></li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>DSA & Practice</div>
          <ul className={styles.list}>
            <li><Link href="/dsa">20-Topic Roadmap</Link></li>
            <li><Link href="/problems">Curated Problem Bank (33 Problems)</Link></li>
            <li><Link href="/revision">Revision Cards</Link></li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Placement</div>
          <ul className={styles.list}>
            <li><Link href="/roadmap">Progression Roadmap</Link></li>
            <li><Link href="/interview">Interview Round Guide</Link></li>
            <li><Link href="/profile">My Dashboard</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span>Free and open learning for everyone &bull; Fast &bull; Calm &bull; Technical</span>
        <span>Zero marketing hype &bull; Zero paywalls &bull; Community-driven</span>
      </div>
    </footer>
  );
};
