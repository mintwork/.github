// mintwork brand assets. Mark: a leaf built from two 290-radius arcs on the 45° diagonal,
// with a negative-space midrib running from the stem two-thirds of the way to the tip.
import { chromium } from '/Users/ranjan/Workspace/personal/tokenscope/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const MINT = '#7EE2B8', INK = '#0D1714', PAPER = '#F4FBF8';
const LEAF = 'M111 401 A290 290 0 0 1 401 111 A290 290 0 0 1 111 401 Z';
// midrib: 20u in the full mark; 34u in the favicon so it survives 16px
const rib = (w) => `M${w > 24 ? 166 : 156} ${w > 24 ? 346 : 356} L${w > 24 ? 290 : 301} ${w > 24 ? 222 : 211}`;
const markOnly = (fill, w = 20) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><mask id="m"><rect width="512" height="512" fill="#fff"/><path d="${rib(w)}" stroke="#000" stroke-width="${w}" stroke-linecap="round"/></mask></defs><path d="${LEAF}" fill="${fill}" mask="url(#m)"/></svg>`;
const tile = (fg, bg, w = 20, rx = 0) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="${rx}" fill="${bg}"/><path d="${LEAF}" fill="${fg}"/><path d="${rib(w)}" stroke="${bg}" stroke-width="${w}" stroke-linecap="round"/></svg>`;

const files = {
  'logo/mintwork-mark.svg': markOnly(INK),            // transparent, ink — for light backgrounds
  'logo/mintwork-mark-mint.svg': markOnly(MINT),      // transparent, mint — for dark backgrounds
  'logo/mintwork-mark-white.svg': markOnly('#FFFFFF'),
  'avatar/mintwork-avatar.svg': tile(INK, MINT),       // square; GitHub/npm round the corners
  'avatar/mintwork-avatar-dark.svg': tile(MINT, INK),
  'favicon/favicon.svg': tile(INK, MINT, 34, 112),
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

// Lockups: mark + wordmark, rendered at 2x for READMEs and social cards.
const lockup = async (out, dark) => {
  await p.setViewportSize({ width: 1200, height: 360 });
  const fg = dark ? '#E8F7F0' : INK, bg = dark ? INK : PAPER;
  await p.setContent(`<html><body style="margin:0;background:${bg};width:1200px;height:360px;display:flex;align-items:center;justify-content:center;gap:26px">
    <div style="width:132px;height:132px;margin-right:-6px">${(dark ? files['logo/mintwork-mark-mint.svg'] : files['logo/mintwork-mark.svg']).replace('viewBox="0 0 512 512"', 'viewBox="104 104 304 304"').replace('<svg ', '<svg width="132" height="132" ')}</div>
    <div style="font:680 128px 'SF Pro Display',Inter,system-ui;letter-spacing:-0.045em;color:${fg};line-height:1;padding-bottom:10px">mintwork</div></body></html>`);
  await p.screenshot({ path: out });
};
await lockup('lockup/mintwork-lockup-light.png', false);
await lockup('lockup/mintwork-lockup-dark.png', true);
await b.close();
execFileSync('/opt/homebrew/bin/ffmpeg', ['-loglevel', 'error', '-y', '-i', 'favicon/favicon-48.png', '-i', 'favicon/favicon-32.png', '-i', 'favicon/favicon-16.png', '-map', '0', '-map', '1', '-map', '2', 'favicon/favicon.ico']);
