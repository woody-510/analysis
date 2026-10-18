/* 教科書の章立て。sections は記事 id の並び（辞書ページと同じ内容をそのまま使う）。 */
window.BOOK = [
  { no: 1, title: '実数とその性質', grade: '1年前期', glyph: 'ℝ',
    intro: '解析学のすべては実数の性質から始まる。この章では、論理記号の読み方を確認したあと、距離をはかる道具である絶対値と三角不等式、そして実数の連続性（上限公理）を導入する。',
    sections: ['logic-quantifiers', 'abs-triangle', 'supremum'],
    summary: '上限公理は証明する対象ではなく、実数がみたすべき性質として認める出発点である。アルキメデスの原理はその最初の帰結だ。' },
  { no: 2, title: '数列と極限', grade: '1年前期', glyph: 'aₙ',
    intro: '「限りなく近づく」を ε と N で言い直すのがこの章の目標である。定義を正確に読み、使えるようになれば、以後の関数の極限・連続・積分はすべて同じ型の議論になる。',
    sections: ['sequence-convergence', 'monotone-convergence', 'cauchy-sequence'],
    summary: '収束の証明は「ε を任意にとる → N を見つける → n ≥ N で不等式を示す」の型に従う。単調収束定理とコーシー列は、極限の値を知らずに収束を示す二つの方法である。' },
  { no: 3, title: '級数', grade: '1年前期', glyph: 'Σ', sections: [] },
  { no: 4, title: '関数の極限と連続', grade: '1年前期', glyph: 'ε-δ', sections: [] },
  { no: 5, title: '微分', grade: '1年前期', glyph: "f′", sections: [] },
  { no: 6, title: '積分', grade: '1年後期', glyph: '∫', sections: [] },
  { no: 7, title: '関数列とべき級数', grade: '1年後期', glyph: 'fₙ', sections: [] },
  { no: 8, title: '多変数関数の微分', grade: '2年前期', glyph: '∂', sections: [] },
  { no: 9, title: '重積分', grade: '2年後期', glyph: '∬', sections: [] },
];
