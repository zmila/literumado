import React, { useState } from 'react';
import Krado from '@/components/krado/Krado';

interface KradoDemoProps {
    showCode: boolean;
}

const KradoDemo: React.FC<KradoDemoProps> = ({ showCode }) => {

    const [userCode, setUserCode] = useState<string>('');
    const label = "{a, e, i, o, n, m, u, w, b, p, q, d}";

    return (
        <div className="m-1 border">
            <label htmlFor="enter-code">{label}</label>:
            <input id="enter-code" type="text" className="border mt-3 ml-2 mb-0" onChange={(e) => setUserCode(e.target.value)} />
            <Krado code={userCode} showCode={showCode} />
        </div>
    );
}

export default KradoDemo;