import Head from "next/head";
import { useEffect, useState } from "react";
import { DekduumaKonvertilo } from "@/utils/DekduumaKonvertilo";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

type HistoryItem = {
  versio: string;
  dato: string;
  komento: string;
};
export default function Home() {

  const ddk = new DekduumaKonvertilo();

  const hodiaŭ = new Date();
  const d10 = ddk.montruDaton(hodiaŭ);
  const d12 = ddk.montruDaton12(hodiaŭ);
  const kakt = ddk.alKaktovika(d12);

  const eoTagoj = ["dimanĉo", "lundo", "mardo", "merkredo", "ĵaŭdo", "vendredo", "sabato"];
  const dayOfWeek = eoTagoj[hodiaŭ.getDay()];

  const [version, setVersion] = useState(null);

  useEffect(() => {
    const fetchHistorio = async () => {
      try {
        const response = await fetch("/api/historio");
        const data = await response.json();

        const history = data.map((item: HistoryItem) => item.versio.split(".").map(part => Number.parseInt(part)));
        const sorted = history.sort((a: number[], b: number[]) => {
          for (let i = 0; i < Math.min(a.length, b.length); i++) {
            if (a[i] !== b[i]) {
              return b[i] - a[i];
            }
          }
          return a.length - b.length;
        });
        setVersion(sorted && sorted.length > 0 && sorted[0].join("."));
      } catch (error) {
        console.error("Error fetching /api/historio:", error);
      }
    };

    fetchHistorio();
  }, []);

  return (
    <>
      <Head>
        <title>Literumado</title>
        <meta name="lang" content="eo" />
        <meta name="description" content="iloj por literoj, silaboj, vortoj, nombroj." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <h1 className="text-4xl font-bold mb-4">Hodiaŭ estas <code>{dayOfWeek}</code></h1>
          <p className="mb-4"><code className="text-2xl">{d10}</code> --- <code className="text-3xl">{kakt}</code></p>

          <h1 className="text-4xl font-bold mb-4">Konvertiloj</h1>

          <ol className="list-disc list-inside space-y-2">
            <li>
              <Link href="/dekduuma" className="underline text-blue-600">Dekuma-Dekduuma konvertilo</Link>
            </li>
            <li>
              <Link href="/ekvilibra" className="underline text-blue-600">Dekuma-Ekvilibra konvertilo</Link>
            </li>
            <li>
              <Link href="/sxava" className="underline text-blue-600">Ŝava konvertilo</Link>
            </li>
            <li>
              <Link href="/dinu_kevako" className="underline text-blue-600">Dinu Kevako</Link>
            </li>
            {/* <li>
              <Link href="/route1">a page</Link>
              <br />
              or <Link href="/route1/route11">sub-page</Link>
            </li> */}
          </ol>

          <h1 className="text-4xl font-bold mt-4 mb-4">aliaj iloj</h1>
          <ol className="list-disc list-inside space-y-2">
            <li>
              <Link href="/krado33" className="underline text-blue-600">krado33</Link>
            </li>
            <li>
              <Link href="/hextruchet" className="underline text-blue-600">Hex Truchet</Link>
            </li>
            <li>
              <Link href="/vojago" className="underline text-blue-600">Vojago game</Link>
            </li>
          </ol>
        </main>

        <footer className="mt-4 bg-light text-lg-start" style={{ position: "fixed", bottom: 0, width: "100%" }}>
          <p>versio {version}</p>
        </footer>
      </div >
    </>
  );
}
