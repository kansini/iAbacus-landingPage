"""Build the website subset and complete fallback from the App's original font.
Requires fonttools[woff] and brotli; does not run as part of the Vite build.
"""
import argparse
import hashlib
import json
import shutil
from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

project = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--source', type=Path, default=project.parents[1] / 'iAbacus/iAbacus-ios/iAbacus/Fonts/NotoSerifSC.ttf')
args = parser.parse_args()
source = args.source.resolve()
out = project / 'public/fonts'
out.mkdir(parents=True, exist_ok=True)
text = ''.join(p.read_text() for folder in ['src', 'public'] for p in (project / folder).rglob('*') if p.suffix in {'.vue', '.ts', '.scss', '.css', '.html', '.js'})
font = TTFont(source)
available = set(font.getBestCmap())
requested = {ord(c) for c in text} | set(range(0x20, 0x7F)) | set(range(0x2000, 0x2070)) | set(range(0x3000, 0x3040)) | set(range(0xFF00, 0xFFF0))
used = sorted(requested & available)
options = subset.Options()
options.flavor = 'woff2'
options.layout_features = ['*']
options.recalc_timestamp = False
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=used)
subsetter.subset(font)
font.flavor = 'woff2'
font.save(out / 'noto-serif-sc-web.woff2')
source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
try:
    previous = json.loads((out / 'noto-serif-sc-manifest.json').read_text())
except (FileNotFoundError, ValueError):
    previous = {}
if previous.get('sha256') != source_hash or not (out / 'noto-serif-sc-complete.woff2').exists():
    complete = TTFont(source, recalcTimestamp=False)
    complete.flavor = 'woff2'
    complete.save(out / 'noto-serif-sc-complete.woff2')
shutil.copyfile(source.with_name('NotoSerifSC-License.txt'), out / 'NotoSerifSC-OFL.txt')
(out / 'app-fonts.css').write_text('''/* Same original regular face as the native App; no variable weight axis. */
@font-face {
  font-family: "Noto Serif SC";
  src: url("./noto-serif-sc-web.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
/* Same font, full coverage: fetched only if a glyph is absent above. */
@font-face {
  font-family: "Noto Serif SC Complete";
  src: url("./noto-serif-sc-complete.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
''')
manifest = {'source': 'iAbacus-ios/iAbacus/Fonts/NotoSerifSC.ttf', 'sha256': source_hash, 'postscript_name': 'NotoSerifSC-Regular', 'weight': 400, 'variable': False, 'subset_codepoints': used, 'source_glyph_coverage': len(available), 'subset_bytes': (out/'noto-serif-sc-web.woff2').stat().st_size, 'complete_bytes': (out/'noto-serif-sc-complete.woff2').stat().st_size}
(out / 'noto-serif-sc-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({k:v for k,v in manifest.items() if k != 'subset_codepoints'}, ensure_ascii=False))
print('subset glyph coverage:', len(used))
print('fallback probe:', next(chr(c) for c in sorted(available - requested) if 0x4E00 <= c <= 0x9FFF))
