import { GLYPH_W, GLYPH_K_H } from './konstantoj';

const W = GLYPH_W, KH = GLYPH_K_H;

/** Joins SVG path segments with spaces. */
export const seg = (...parts: string[]) => parts.join(' ');

/**
 * Horizontal semicircle arc, r = W/2. Always drawn left→right (x increases by W).
 * Assumes the current point is at (x2 - W, y).
 * bulge='up'  → sweep=1 (CW, arc passes through top)
 * bulge='down' → sweep=0 (CCW, arc passes through bottom)
 */
export function aH(x2: number, y: number, bulge: 'up' | 'down'): string {
    return `A ${W/2},${W/2} 0 0,${bulge === 'up' ? 1 : 0} ${x2},${y}`;
}

/**
 * Vertical semicircle arc, r = KH/2. Always spans full height (0 ↔ KH).
 * Assumes the current point is at (x, dir=down ? 0 : KH).
 * sweep = (bulge==='right') === (dir==='down') ? 1 : 0
 */
export function aV(x: number, dir: 'down' | 'up', bulge: 'left' | 'right'): string {
    const y2 = dir === 'down' ? KH : 0;
    const sweep = (bulge === 'right') === (dir === 'down') ? 1 : 0;
    return `A ${KH/2},${KH/2} 0 0,${sweep} ${x},${y2}`;
}

/**
 * J/b sweep: cubic bezier from (startX, KH) to (2W, 0).
 * Control points: cp1=(W, KH), cp2=(5W/3, 2KH/3).
 * curveB(0)   = j-shape
 * curveB(W/2) = b connecting curve
 */
export function curveB(startX: number): string {
    return `M ${startX},${KH} C ${W},${KH} ${5*W/3},${2*KH/3} ${2*W},0`;
}

/**
 * Tail sweep: cubic bezier from (startX, 0) to (2W, KH). Vertical mirror of curveB.
 * Control points: cp1=(W, 0), cp2=(5W/3, KH/3) — bulges upward.
 * curveD(W/2) = jn ligature tail
 */
export function curveD(startX: number): string {
    return `M ${startX},0 C ${W},0 ${5*W/3},${KH/3} ${2*W},${KH}`;
}
