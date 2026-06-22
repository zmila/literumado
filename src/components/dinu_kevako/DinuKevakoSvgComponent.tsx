import React, { useRef, useEffect, useState } from 'react';
import { Vorto } from '@/utils/dinu_kevako/tipoj';
import { DinuKevakoLayout } from '@/utils/dinu_kevako/DinuKevakoLayout';
import {
    SVG_PAD, SVG_H, SVG_PAD_LEFT,
    BASELINE_OFFSET, LINE_STRIDE, F_ZONE_BOTTOM, GAP_LINE,
    CONSONANT_OFFSET_X, GLYPH_W,
    PARCHMENT, LINE_SOLID, LINE_DOTTED, VERT_COLOR,
} from '@/utils/dinu_kevako/konstantoj';

const layout = new DinuKevakoLayout();

interface Props {
    vortoj: Vorto[];
    vicoj: number;
}

const DinuKevakoSvgComponent: React.FC<Props> = ({ vortoj, vicoj }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [containerW, setContainerW] = useState(800);

    useEffect(() => {
        if (!svgRef.current) return;
        const obs = new ResizeObserver(entries => setContainerW(entries[0].contentRect.width));
        obs.observe(svgRef.current);
        return () => obs.disconnect();
    }, []);

    const naturalContentH = BASELINE_OFFSET + (vicoj - 1) * LINE_STRIDE + F_ZONE_BOTTOM + GAP_LINE / 2;
    const naturalH = naturalContentH + SVG_PAD * 2;
    const scale = SVG_H / naturalH;
    const viewBoxW = containerW / scale;

    const glyphs = layout.arangi(vortoj, {
        svgWidth: viewBoxW,
        padLeft: SVG_PAD_LEFT,
        padTop: SVG_PAD + BASELINE_OFFSET,
    });

    // ── Horizontal structural lines ──────────────────────────────────────────
    const horizLines: React.ReactElement[] = [];
    let rowTop = SVG_PAD;
    let li = 0;
    const contentBottom = SVG_PAD + naturalContentH;
    while (rowTop < contentBottom) {
        const lineX2 = viewBoxW - SVG_PAD;
        horizLines.push(
            <line key={`hl${li++}`} x1={SVG_PAD} y1={rowTop} x2={lineX2} y2={rowTop}
                stroke={LINE_DOTTED} strokeWidth={0.8} strokeDasharray="4 4" />
        );
        const baseline = rowTop + BASELINE_OFFSET;
        if (baseline < contentBottom)
            horizLines.push(
                <line key={`hl${li++}`} x1={SVG_PAD} y1={baseline} x2={lineX2} y2={baseline}
                    stroke={LINE_SOLID} strokeWidth={1} />
            );
        const fBottom = baseline + F_ZONE_BOTTOM;
        if (fBottom < contentBottom)
            horizLines.push(
                <line key={`hl${li++}`} x1={SVG_PAD} y1={fBottom} x2={lineX2} y2={fBottom}
                    stroke={LINE_DOTTED} strokeWidth={0.8} strokeDasharray="4 4" />
            );
        rowTop += LINE_STRIDE;
    }

    // ── Vertical lines — aligned to consonant cell edges ─────────────────────
    const vertStart = SVG_PAD_LEFT + CONSONANT_OFFSET_X;
    const vertLines: React.ReactElement[] = [];
    for (let x = vertStart; x < viewBoxW - SVG_PAD; x += GLYPH_W) {
        vertLines.push(
            <line key={`vl${x}`} x1={x} y1={SVG_PAD} x2={x} y2={contentBottom}
                stroke={VERT_COLOR} strokeWidth={0.5} />
        );
    }

    return (
        <svg ref={svgRef} width="100%" height={SVG_H}
            viewBox={`0 0 ${viewBoxW} ${naturalH}`}
            xmlns="http://www.w3.org/2000/svg">
            <rect x={SVG_PAD} y={SVG_PAD} width={viewBoxW - SVG_PAD * 2} height={naturalContentH} fill={PARCHMENT} />
            {vertLines}
            {horizLines}
            {glyphs}
        </svg>
    );
};

export default DinuKevakoSvgComponent;
