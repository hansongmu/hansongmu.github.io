#!/usr/bin/env python3
# 홈 목록 썸네일 생성. 각 글의 첫 이미지를 480폭 webp 로 줄여 public/thumbs/<slug>.webp 에 둔다.
# 프로젝트를 추가하거나 첫 이미지를 바꾸면 다시 돌린다(Pillow 필요).
import re
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
out = root / 'public/thumbs'
out.mkdir(exist_ok=True)
for name in ['builds.ts', 'ai.ts']:
    text = (root / 'src/content' / name).read_text()
    for slug, src in re.findall(r"slug: '([^']+)'(?:(?!slug: ).)*?type: 'image', src: '([^']+)'", text, re.S):
        im = Image.open(root / 'public' / src.lstrip('/')).convert('RGB')
        im = im.resize((480, round(im.height * 480 / im.width)), Image.LANCZOS)
        im.save(out / f'{slug}.webp', 'WEBP', quality=78)
        print(slug, src)
