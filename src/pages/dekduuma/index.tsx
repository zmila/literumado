// Dekduuma component is a simple form that converts decimal numbers to duodecimal numbers.
import { DekduumaKonvertilo } from "@/utils/DekduumaKonvertilo";
import React, { useState } from "react";
import Layout from '@/components/Layout';

const Dekduuma = () => {

    const ddk = new DekduumaKonvertilo();

    const [dekuma, setDekuma] = useState<number | string>("");
    const [dekduuma, setDekduuma] = useState<string>("");
    const [kaktovika, setKaktovika] = useState<string>("");

    const dekumaŜanĝita = (event: React.ChangeEvent<HTMLInputElement>) => {
        const d10 = Number.parseInt(event.target.value);
        const d12 = ddk.alDekduuma(d10);
        const kakt = ddk.alKaktovika(d12);
        setDekuma(d10);
        setDekduuma(d12);
        setKaktovika(kakt);
    };

    const dekduumaŜanĝita = (event: React.ChangeEvent<HTMLInputElement>) => {
        const d12 = event.target.value;
        const d10 = ddk.alDekuma(d12);
        const kakt = ddk.alKaktovika(d12);
        setDekuma(d10);
        setDekduuma(d12);
        setKaktovika(kakt);
    };

    const kaktovikaŜanĝita = (event: React.ChangeEvent<HTMLInputElement>) => {
        const kakt = event.target.value;
        const d12 = ddk.elKaktovika(kakt);
        const d10 = ddk.alDekuma(d12);
        setDekuma(d10);
        setDekduuma(d12);
        setKaktovika(kakt);
    };

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-4">Dekuma-Dekduuma konvertilo</h1>
            <p className="text-lg mb-6">Konvertilo inter la dekuma (bazo 10), dekduuma (dozena, bazo 12) kaj kaktovikaj nombrosistemoj. <br />
                En la dekduuma sistemo uzu <kbd>A</kbd> kaj <kbd>B</kbd> por la dekumaj <code>10</code> kaj <code>11</code>.</p>

            <div>
                <div className="flex flex-row gap-4">
                    <input type="number" placeholder="Dekuma nombro" className="p-2 border rounded"
                        name="dekuma"
                        value={dekuma}
                        onChange={dekumaŜanĝita}
                    />
                    <input type="text" placeholder="Dekduuma nombro" className="p-2 border rounded"
                        name="dekduuma"
                        value={dekduuma}
                        onChange={dekduumaŜanĝita}
                    />
                    <input type="text" placeholder="Kaktovika nombro" className="p-2 border rounded text-xl"
                        name="kaktovika"
                        value={kaktovika}
                        onChange={kaktovikaŜanĝita}
                    />
                </div>

                <div className="info_area">
                    <table className="table-auto border border-collapse max-w-full my-4">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">dekuma</th>
                                <th className="py-3 px-6 text-left">dekduuma</th>
                                <th className="py-3 px-6 text-left">kaktovika</th>
                                <th className="py-3 px-6 text-left">prononco</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr> <td>0</td> <td>0</td> <td>𝋀</td> <td>nul</td> </tr>
                            <tr> <td>1</td> <td>1</td> <td>𝋁</td> <td>unu</td> </tr>
                            <tr> <td>2</td> <td>2</td> <td>𝋂</td> <td>du</td> </tr>
                            <tr> <td>3</td> <td>3</td> <td>𝋃</td> <td>tri</td> </tr>
                            <tr> <td>4</td> <td>4</td> <td>𝋅</td> <td>kvar</td> </tr>
                            <tr> <td>5</td> <td>5</td> <td>𝋆</td> <td>kvin</td> </tr>
                            <tr> <td>6</td> <td>6</td> <td>𝋇</td> <td>ses</td> </tr>
                            <tr> <td>7</td> <td>7</td> <td>𝋈</td> <td>sep</td> </tr>
                            <tr> <td>8</td> <td>8</td> <td>𝋊</td> <td>ok</td> </tr>
                            <tr> <td>9</td> <td>9</td> <td>𝋋</td> <td>naŭ</td> </tr>
                            <tr> <td>10</td> <td>A</td> <td>𝋌</td> <td>dek</td> </tr>
                            <tr> <td>11</td> <td>B</td> <td>𝋍</td> <td>elv</td> </tr>
                            <tr> <td>12</td> <td>10</td> <td>𝋁𝋀</td> <td>tuz</td> </tr>
                            <tr> <td>144</td> <td>100</td> <td>𝋁𝋀𝋀</td> <td>groc</td> </tr>
                            <tr> <td>1728</td> <td>1000</td> <td>𝋁𝋀𝋀𝋀</td> <td>mas</td> </tr>
                        </tbody>
                    </table>

                    <blockquote className="m-4">
                        <span className="text-xl"><code>15251</code><sub>10</sub> = <code>89ab</code><sub>12</sub> = <code>𝋊𝋋𝋌𝋍</code></span>
                        <br />
                        = ok mas naŭgroc dektuz elv
                    </blockquote>
                    {/* 2345 + 7896 = A01B (𝋂𝋃𝋅𝋆 + 𝋈𝋊𝋋𝋇 = 𝋌𝋀𝋁𝋍)
                    572 + BA96 = 10348 (𝋆𝋈𝋂 + 𝋍𝋌𝋋𝋇 = 𝋁𝋀𝋃𝋅𝋊) */}
                </div>

            </div >
        </Layout>
    );
}
export default Dekduuma;
