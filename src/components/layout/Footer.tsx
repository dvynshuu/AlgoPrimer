import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import {
  getLanguagePath,
  getDsaPath,
  getProblemsPath,
  getRevisionPath,
  getRoadmapPath,
  getInterviewPath,
  getProfilePath,
} from "@/lib/routes";
import {
  getProblemCount,
  getDsaTopicCount,
  getRevisionCount,
} from "@/lib/contentCounts";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <div className={styles.brandTitle}>AlgoPrimer</div>
          <p style={{ margin: 0, lineHeight: 1.5 }}>
            Programming, DSA &amp; Coding Interview Preparation.
            Teach programming and problem solving from first principles, then progressively move users toward technical interview readiness.
          </p>
        </div>

        <div>
          <div className={styles.colTitle}>Languages</div>
          <ul className={styles.list}>
            <li><Link href={getLanguagePath("java")}>Java Track</Link></li>
            <li><Link href={getLanguagePath("cpp")}>C++ Track</Link></li>
            <li><Link href={getLanguagePath("python")}>Python Track</Link></li>
            <li><Link href={getLanguagePath("javascript")}>JavaScript Track</Link></li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>DSA &amp; Practice</div>
          <ul className={styles.list}>
            <li><Link href={getDsaPath()}>{getDsaTopicCount()}-Topic DSA Curriculum</Link></li>
            <li><Link href={getProblemsPath()}>Curated Problems ({getProblemCount()} Problems)</Link></li>
            <li><Link href={getRevisionPath()}>Revision Cards ({getRevisionCount()} Cards)</Link></li>
          </ul>
        </div>

        <div>
          <div className={styles.colTitle}>Placement</div>
          <ul className={styles.list}>
            <li><Link href={getRoadmapPath()}>Progression Roadmap</Link></li>
            <li><Link href={getInterviewPath()}>Interview Round Guide</Link></li>
            <li><Link href={getProfilePath()}>My Dashboard</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <span>AlgoPrimer &bull; Developer-native &bull; Fast &bull; Built from first principles</span>
        <span>Zero marketing noise &bull; Structured curriculum</span>
      </div>
    </footer>
  );
};
