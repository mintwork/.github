// mintwork brand assets — mark "1a": a leaf from two 260-radius arcs on the 45° diagonal, with a
// negative-space vein that tapers from the stem (26u wide) to a fine point (4u) two-thirds along.
// This file is the single source of truth: edit the geometry here and re-run `node build.mjs`.
import { chromium } from '/Users/ranjan/Workspace/personal/tokenscope/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const MINT = '#7EE2B8', INK = '#0D1714', LIGHT = '#E8F7F0';
const LEAF = 'M126 386 A260 260 0 0 1 386 126 A260 260 0 0 1 126 386 Z';
const k = Math.SQRT1_2;
const wedge = (x0, y0, x1, y1, a, b) => `M${x0 + a * k} ${y0 + a * k} L${x1 + b * k} ${y1 + b * k} A${b} ${b} 0 0 0 ${x1 - b * k} ${y1 - b * k} L${x0 - a * k} ${y0 - a * k} Z`;
const VEIN = wedge(126, 386, 300, 212, 13, 2);

// mark on a solid field (square; GitHub/npm round the corners themselves)
const tile = (fg, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="${bg}"/><path d="${LEAF}" fill="${fg}"/><path d="${VEIN}" fill="${bg}"/></svg>`;
// mark alone on transparency, cropped to the leaf
const mark = (fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="104 104 304 304"><defs><mask id="v"><rect x="0" y="0" width="512" height="512" fill="#000"/><path d="${LEAF}" fill="#fff"/><path d="${VEIN}" fill="#000"/></mask></defs><rect x="0" y="0" width="512" height="512" fill="${fg}" mask="url(#v)"/></svg>`;

const files = {
  'logo/mintwork-mark.svg': mark(INK),
  'logo/mintwork-mark-mint.svg': mark(MINT),
  'logo/mintwork-mark-white.svg': mark('#FFFFFF'),
  'avatar/mintwork-avatar.svg': tile(INK, MINT),
  'avatar/mintwork-avatar-dark.svg': tile(MINT, INK),
  'favicon/favicon.svg': tile(INK, MINT),
};
for (const [f, s] of Object.entries(files)) fs.writeFileSync(f, s);

const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage();
const shot = async (svg, out, size) => {
  await p.setViewportSize({ width: size, height: size });
  await p.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await p.locator('svg').screenshot({ path: out, omitBackground: true });
};
await shot(files['avatar/mintwork-avatar.svg'], 'avatar/mintwork-avatar-1024.png', 1024);
await shot(files['avatar/mintwork-avatar-dark.svg'], 'avatar/mintwork-avatar-dark-1024.png', 1024);
await shot(files['logo/mintwork-mark.svg'], 'logo/mintwork-mark-512.png', 512);
await shot(files['logo/mintwork-mark-mint.svg'], 'logo/mintwork-mark-mint-512.png', 512);
for (const s of [16, 32, 48, 180, 192, 512]) await shot(files['favicon/favicon.svg'], `favicon/favicon-${s}.png`, s);

// Lockups: transparent, tightly cropped, 2x. "leafdot" replaces the dot of the i with the mark.
const lp = await b.newPage({ deviceScaleFactor: 2, viewport: { width: 1200, height: 400 } });
const lockup = async (out, dark, leafdot) => {
  const fg = dark ? LIGHT : INK, m = dark ? mark(MINT) : mark(INK);
  const svgAt = (s, w) => s.replace('<svg ', `<svg width="${w}" height="${w}" `);
  const word = leafdot
    ? `m<span style="position:relative">ı<span style="position:absolute;left:3px;top:-6px;width:40px;height:40px">${svgAt(dark ? mark(MINT) : mark(INK), 40)}</span></span>ntwork`
    : 'mintwork';
  await lp.setContent(`<html><body style="margin:0;background:transparent"><div id="l" style="display:inline-flex;align-items:center;gap:22px;padding:14px 8px 6px">
    <div style="width:132px;height:132px">${svgAt(m, 132)}</div>
    <div style="font:680 128px 'SF Pro Display',Inter,system-ui;letter-spacing:-0.045em;color:${fg};line-height:1;padding-bottom:12px">${word}</div></div></body></html>`);
  await lp.locator('#l').screenshot({ path: out, omitBackground: true });
};
await lockup('lockup/mintwork-lockup-light.png', false, false);
await lockup('lockup/mintwork-lockup-dark.png', true, false);
await lockup('lockup/mintwork-lockup-leafdot-light.png', false, true);
await lockup('lockup/mintwork-lockup-leafdot-dark.png', true, true);
await b.close();
execFileSync('/opt/homebrew/bin/ffmpeg', ['-loglevel', 'error', '-y', '-i', 'favicon/favicon-48.png', '-i', 'favicon/favicon-32.png', '-i', 'favicon/favicon-16.png', '-map', '0', '-map', '1', '-map', '2', 'favicon/favicon.ico']);
