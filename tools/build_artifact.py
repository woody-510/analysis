"""claude.ai で公開するための版を作る。

使い方: python3 tools/build_artifact.py <出力フォルダ>

手元版との違い
- フォントは同梱ファイルの代わりに Google Fonts から読み込む（公開先が許可する唯一の外部スタイルシート）。
- window.AC_HOSTED を立て、印刷できない公開先では PDF ボタンを案内に切り替える。
- トップページ（index.html）は公開時に骨組みで包まれるので、<html>・<head>・<body> を外す。
"""
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGES = ['index.html', 'article.html', 'book.html', 'sakuin.html', 'search.html', 'problems.html', 'roadmap.html', 'split.html']
GOOGLE_FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400'
    '&family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap">'
)


def build(out: pathlib.Path) -> list[str]:
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    files = []
    sources = (
        sorted((ROOT / 'assets/css').glob('*.css'))
        + sorted((ROOT / 'assets/js').glob('*.js'))
        + sorted((ROOT / 'content').glob('*.js'))
        + [ROOT / 'assets/vendor/katex/katex.min.css', ROOT / 'assets/vendor/katex/katex.min.js']
        + sorted((ROOT / 'assets/vendor/katex/fonts').glob('*.woff2'))
    )
    for src in sources:
        rel = src.relative_to(ROOT)
        dst = out / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        files.append(str(rel))
    for page in PAGES:
        html = (ROOT / page).read_text(encoding='utf-8')
        html = html.replace('<link rel="stylesheet" href="assets/fonts/fonts.css">', GOOGLE_FONTS)
        html = html.replace('<script src="assets/js/app.js"></script>', '<script>window.AC_HOSTED = true;</script>\n<script src="assets/js/app.js"></script>')
        if page == 'index.html':
            html = re.sub(r'<!doctype html>\s*|</?html[^>]*>\s*|</?head>\s*|</?body>\s*|<meta charset="utf-8">\s*|<meta name="viewport"[^>]*>\s*', '', html, flags=re.I)
        (out / page).write_text(html, encoding='utf-8')
        if page != 'index.html':
            files.append(page)
    return files


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit('使い方: python3 tools/build_artifact.py <出力フォルダ>')
    built = build(pathlib.Path(sys.argv[1]).resolve())
    print(len(built) + 1, 'files')
