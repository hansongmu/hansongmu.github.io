// 프로젝트 스크린샷(PNG)의 픽셀 크기를 읽어 src/content/imageDims.ts 로 생성한다.
// ProjectImage가 로드 전에 종횡비를 확보(CLS 0)하는 데 쓰는 크기맵.
// 외부 의존성 없이 node:fs 만 사용. 이미지 추가/교체 시 이 스크립트만 재실행하면 된다.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/**
 * PNG 헤더(IHDR)에서 픽셀 크기를 읽는다.
 * 8바이트 시그니처 뒤 IHDR 청크의 width@offset16, height@offset20 (big-endian uint32).
 * @param {Buffer | Uint8Array} buffer
 * @returns {{ w: number; h: number }}
 */
export function parsePngDimensions(buffer) {
  if (buffer.length < 24) {
    throw new Error('버퍼가 PNG 헤더를 담기에 너무 짧습니다.');
  }
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (buffer[i] !== PNG_SIGNATURE[i]) {
      throw new Error('PNG 시그니처가 아닙니다.');
    }
  }
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  return { w: view.getUint32(16, false), h: view.getUint32(20, false) };
}

/* 디렉터리를 재귀 순회하며 파일 절대경로를 모은다. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function main() {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const projectRoot = join(scriptDir, '..');
  const publicDir = join(projectRoot, 'public');
  const projectsDir = join(publicDir, 'projects');

  const dims = {};
  let skipped = 0;
  for (const file of walk(projectsDir).sort()) {
    if (!file.toLowerCase().endsWith('.png')) {
      console.warn(`건너뜀(비-PNG): ${relative(publicDir, file)}`);
      skipped++;
      continue;
    }
    // 이미지 블록 src 와 동일한 키: /projects/... (public 기준 절대경로, POSIX 구분자)
    const key = '/' + relative(publicDir, file).split(sep).join('/');
    dims[key] = parsePngDimensions(readFileSync(file));
  }

  const keys = Object.keys(dims).sort();
  const body = keys.map((k) => `  '${k}': { w: ${dims[k].w}, h: ${dims[k].h} },`).join('\n');
  const out = `// 이 파일은 scripts/gen-image-dims.mjs 로 생성됩니다. 직접 수정하지 마세요.
// 프로젝트 스크린샷의 픽셀 크기맵 — ProjectImage가 종횡비를 확보해 CLS를 0으로 만드는 데 씁니다.
export const imageDims: Record<string, { w: number; h: number }> = {
${body}
};
`;
  const target = join(projectRoot, 'src', 'content', 'imageDims.ts');
  writeFileSync(target, out);
  console.log(`imageDims.ts 생성: ${keys.length}개 항목${skipped ? `, ${skipped}개 건너뜀` : ''}`);
}

// 직접 실행할 때만 파일 생성(테스트에서 import 시엔 실행하지 않음).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
