import Head from "next/head";
import { DekduumaKonvertilo } from "@/utils/DekduumaKonvertilo";
import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {

  const ddk = new DekduumaKonvertilo();

  const hodiaŭ = new Date();
  const d10 = ddk.montruDaton(hodiaŭ);
  const d12 = ddk.montruDaton12(hodiaŭ);
  const kakt = ddk.alKaktovika(d12);

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
          <h1 className="text-4xl font-bold mb-4">Hodiaŭ estas</h1>
          <p className="mb-4"><code className="text-2xl">{d10}</code> --- <code className="text-3xl">{kakt}</code></p>

          <h1 className="text-4xl font-bold mb-4">Konvertiloj</h1>

          <ol className="list-disc list-inside space-y-2">
            <li>
              <Link href="/dekduuma" className="underline text-blue-600">Dekuma-Dekduuma konvertilo</Link>
            </li>
            <li>
              <Link href="/sxava" className="underline text-blue-600">Ŝava konvertilo</Link>
            </li>
            {/* <li>
              <Link href="/route1">a page</Link>
              <br />
              or <Link href="/route1/route11">sub-page</Link>
            </li> */}
          </ol>
        </main>

        {/* <footer className={styles.footer}>
          <p>footer</p>
        </footer> */}
      </div >
    </>
  );
}
