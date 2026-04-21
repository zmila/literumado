import React, {useRef, useEffect, useState} from 'react';
import {Vorto} from '@/utils/dinu_kevako/tipoj';
import {DinuKevakoLayout} from '@/utils/dinu_kevako/DinuKevakoLayout';
import {
    SVG_PAD, SVG_CONTENT_H, SVG_H, SVG_PAD_LEFT,
    BASELINE_OFFSET, LINE_STRIDE, F_ZONE_BOTTOM,
    CONSONANT_OFFSET_X, GLYPH_W,
    PARCHMENT, LINE_SOLID, LINE_DOTTED, VERT_COLOR,
} from '@/utils/dinu_kevako/konstantoj';

const layout = new DinuKevakoLayout();

interface Props {
    vortoj: Vorto[];
}

const DinuKevakoSvgComponent: React.FC<Props> = ({vortoj}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [svgWidth, setSvgWidth] = useState(800);

    useEffect(() => {
        if (!svgRef.current) return;
        const obs = new ResizeObserver(entries => setSvgWidth(entries[0].contentRect.width));
        obs.observe(svgRef.current);
        return () => obs.disconnect();
    }, []);

    const glyphs = layout.arangi(vortoj, {
        svgWidth,
        padLeft: SVG_PAD_LEFT,
        padTop: SVG_PAD + BASELINE_OFFSET,
    });

    // ── Horizontal structural lines ──────────────────────────────────────────
    const horizLines: React.ReactElement[] = [];
    let rowTop = SVG_PAD;
    let li = 0;
    const contentBottom = SVG_PAD + SVG_CONTENT_H;
    while (rowTop < contentBottom) {
        const lineX2 = svgWidth - SVG_PAD;
        // top of k zone (dotted)
        horizLines.push(
            <line key={`hl${li++}`} x1={SVG_PAD} y1={rowTop} x2={lineX2} y2={rowTop}
                  stroke={LINE_DOTTED} strokeWidth={0.8} strokeDasharray="4 4"/>
        );
        // baseline / vowel line (solid)
        const baseline = rowTop + BASELINE_OFFSET;
        if (baseline < contentBottom)
            horizLines.push(
                <line key={`hl${li++}`} x1={SVG_PAD} y1={baseline} x2={lineX2} y2={baseline}
                      stroke={LINE_SOLID} strokeWidth={1}/>
            );
        // bottom of f zone (dotted)
        const fBottom = baseline + F_ZONE_BOTTOM;
        if (fBottom < contentBottom)
            horizLines.push(
                <line key={`hl${li++}`} x1={SVG_PAD} y1={fBottom} x2={lineX2} y2={fBottom}
                      stroke={LINE_DOTTED} strokeWidth={0.8} strokeDasharray="4 4"/>
            );

        rowTop += LINE_STRIDE;
    }

    // ── Vertical lines — aligned to consonant cell edges ─────────────────────
    // First line at left edge of first consonant cell; step = GLYPH_W (100)
    // → lines fall on left edge, right edge, left edge… of every consonant
    const vertStart = SVG_PAD_LEFT + CONSONANT_OFFSET_X;
    const vertLines: React.ReactElement[] = [];
    for (let x = vertStart; x < svgWidth - SVG_PAD; x += GLYPH_W) {
        vertLines.push(
            <line key={`vl${x}`} x1={x} y1={SVG_PAD} x2={x} y2={contentBottom}
                  stroke={VERT_COLOR} strokeWidth={0.5}/>
        );
    }

    return (
        <svg ref={svgRef} width="100%" height={SVG_H} xmlns="http://www.w3.org/2000/svg">
            <rect x={SVG_PAD} y={SVG_PAD} width="calc(100% - 20px)" height={SVG_CONTENT_H} fill={PARCHMENT}/>
            {vertLines}
            {horizLines}
            {glyphs}
        </svg>
    );
};

export default DinuKevakoSvgComponent;
