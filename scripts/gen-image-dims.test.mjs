import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { parsePngDimensions } from './gen-image-dims.mjs';

/* IHDR: 8바이트 시그니처 뒤로 length(4)+"IHDR"(4)+width(4)+height(4).
   width는 offset 16, height는 offset 20에 big-endian uint32로 들어간다. */
function makePngHeader(w, h) {
  const buf = Buffer.alloc(24);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(buf, 0);
  buf.write('IHDR', 12, 'ascii');
  buf.writeUInt32BE(w, 16);
  buf.writeUInt32BE(h, 20);
  return buf;
}

describe('parsePngDimensions', () => {
  it('reads width and height from the PNG IHDR header', () => {
    expect(parsePngDimensions(makePngHeader(1280, 720))).toEqual({ w: 1280, h: 720 });
  });

  it('reads the true dimensions of a real project screenshot', () => {
    const png = readFileSync(new URL('../public/projects/ai-platform/02.png', import.meta.url));
    expect(parsePngDimensions(png)).toEqual({ w: 492, h: 910 });
  });

  it('throws on a buffer without a PNG signature', () => {
    const notPng = Buffer.from('this is not a png file at all', 'ascii');
    expect(() => parsePngDimensions(notPng)).toThrow();
  });
});
