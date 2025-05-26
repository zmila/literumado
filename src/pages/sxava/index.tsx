import React, { useState } from 'react';
import { ŜavaKonvertilo } from '@/utils/SxavaKonvertilo';
import Layout from '@/components/Layout';

const SxavaKonvertiloComponent: React.FC = () => {
    const [ŝava, setŜava] = useState('');
    const [espa, setEspa] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('pokr');
    const [focusedElement, setFocusedElement] = useState('taEspa');

    const sk = new ŜavaKonvertilo();

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocusedElement(event.target.id);
    };

    const handleBlur = () => {
        setFocusedElement('');
    };

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVariant(event.target.value);
        handleInput();
    };

    const handleInput = () => {
        const isFromŜava = focusedElement === 'taŜava';
        const input = isFromŜava ? ŝava : espa;

        if (!input || !input.trim()) {
            return;
        }

        if (isFromŜava) {
            setEspa(sk.alEspa(input));
        } else {
            const text = input; //.toLocaleLowerCase("eo");
            const converted = selectedVariant === 'pokr' ? sk.alŜavaPokr(text) : sk.alŜavaStar(text);
            setŜava(converted);
        }
    };

    return (
        <Layout>
            <h1 className="text-4xl font-bold mb-4">Konvertilo inter la Ŝava kaj Esperanto</h1>

            <div className="ŝava">
                <div className="flex items-center mb-4">
                    <span className="mr-8">Varianto:</span>
                    <label className="mr-8">
                        <input
                            type="radio"
                            value="star"
                            checked={selectedVariant === 'star'}
                            onChange={handleChangeRadio}
                            className="mr-4"
                        />
                        laŭ Starling (j = <kbd>𐑢</kbd>, ŭ = <kbd>𐑘</kbd>)
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="pokr"
                            checked={selectedVariant === 'pokr'}
                            onChange={handleChangeRadio}
                            className="mr-4"
                        />
                        laŭ Pokrovskij (aŭ = <kbd>𐑲</kbd>, eŭ = <kbd>𐑱</kbd>, j = <kbd>𐑰</kbd> kaj dz = <kbd>𐑞</kbd>)
                    </label>
                </div>

                <textarea
                    className="p-2 w-4/5 m-2 border rounded"
                    id="taEspa"
                    rows={5}
                    value={espa}
                    onChange={(e) => setEspa(e.target.value)}
                    onKeyUp={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                <textarea
                    className="p-2 w-4/5 m-2 border rounded"
                    id="taŜava"
                    rows={5}
                    value={ŝava}
                    onChange={(e) => setŜava(e.target.value)}
                    onKeyUp={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            <footer>
                <p>Legu pri la ŝava en <a href="http://eo.wikipedia.org/wiki/%C5%9Cava_alfabeto">Vikipedio</a>
                    aŭ en studaĵo de Sergio Pokrovskij:
                    <a href="https://kovro.heliohost.org/eo/tools/Sxava/sxava.html">La Ŝava alfabeto por Esperanto</a></p>
            </footer>
            <style jsx>{`
                .ŝava {
                    @apply font-sans;
                }
            `}</style>
        </Layout>
    );
};

export default SxavaKonvertiloComponent;