import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../shared-scss/globals.css";
import styles from "./style.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "小王妃聚集地 | 乌鲁鲁星工作室",
  description: "《恋与深空》男主之一沈星回Xavier的同人网站",
};

export default function RootLayout({ children, params: { locale } }: any) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/Logo.png" />
        <body className={styles["is-body"]}>{children}</body>
      </head>
    </html>
  );
}
