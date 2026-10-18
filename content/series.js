/* 第 3 章：級数 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'series',
    title: '級数の収束',
    sub: '部分和・等比級数・コーシーの判定法',
    yomi: 'きゅうすうのしゅうそく',
    aliases: ['級数', 'きゅうすう', '無限級数', 'むげんきゅうすう', '部分和', 'ぶぶんわ', '等比級数', 'とうひきゅうすう', '調和級数', 'ちょうわきゅうすう', '正項級数', 'せいこうきゅうすう', 'Σ'],
    kind: '用語',
    field: '級数',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'cauchy-sequence', 'monotone-convergence', 'sigma-notation'],
    related: ['series-tests', 'absolute-convergence', 'cauchy-sequence'],
    notation: [
      R`実数列 $\{a_n\}_{n\in\mathbb{N}}$：各 $a_n\in\mathbb{R}$。級数の「項」と呼ぶ。`,
      R`部分和 $S_n:=\sum_{k=1}^na_k\in\mathbb{R}$（$n\in\mathbb{N}$）。$\{S_n\}_{n\in\mathbb{N}}$ はまた一つの実数列である。`,
      R`$\sum_{n=1}^\infty a_n$：級数そのもの（形式的な無限和）と、収束するときのその和（実数）の両方をこの記号で表す。`,
      R`添字が $0$ から始まる級数 $\sum_{n=0}^\infty a_n$ では $S_n:=\sum_{k=0}^na_k$（$n\in\mathbb{N}\cup\{0\}$）。`,
      R`$\varepsilon>0$：正の実数。$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon$ に応じて決まる番号。`,
      R`$a_n\ge0$ の級数が収束することを $\sum_{n=1}^\infty a_n<\infty$ と書くことがある。`,
    ],
    synopsis: R`無限個の数の和 $\sum_{n=1}^\infty a_n$ は、有限和 $S_n=a_1+\cdots+a_n$（部分和）の極限として定義する。級数の問題は「部分和という数列の収束」の問題であり、第 2 章の道具（単調収束定理・コーシー列）がそのまま使える。`,
    body: [
      { t: 'h2', id: 'def', text: '定義：無限和は部分和の極限' },
      { t: 'p', text: R`$1+\frac12+\frac14+\frac18+\cdots$ を「無限に足す」とは、どういう意味だろうか。無限回の足し算は実行できない。そこで、<em>途中までの和</em>を並べた数列を作り、その極限を「無限和」と定める。こうすると無限和の問題は、すべて数列の極限の問題に帰着する。` },
      { t: 'def', id: 'def-series', title: '級数の収束と和', yomi: 'きゅうすうのしゅうそくとわ', imp: 3, text: R`実数列 $\{a_n\}_{n\in\mathbb{N}}$ に対し、$n\in\mathbb{N}$ ごとに
$$S_n:=\sum_{k=1}^na_k=a_1+a_2+\cdots+a_n\in\mathbb{R}$$
を第 $n$ <b class="term">部分和</b>という。実数列 $\{S_n\}$ がある $S\in\mathbb{R}$ に収束するとき、<b class="term">級数</b> $\sum_{n=1}^\infty a_n$ は<b class="term">収束する</b>といい、$S$ をその<b class="term">和</b>と呼んで
$$\sum_{n=1}^\infty a_n:=S=\lim_{n\to\infty}S_n$$
と書く。$\{S_n\}$ が収束しないとき、級数は<b class="term">発散する</b>という。特に $S_n\to+\infty$ のとき $\sum_{n=1}^\infty a_n=+\infty$ と書く。` },
      { t: 'note', title: '言い換え：ε-N で書くと', text: R`$\sum_{n=1}^\infty a_n=S$ は、[[sequence-convergence#def-conv|数列の収束の定義]]をそのまま $S_n$ に当てはめたもの：
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall n\in\mathbb{N},\quad n\ge N\Longrightarrow\Bigl|\sum_{k=1}^na_k-S\Bigr|<\varepsilon.$$
「無限に足す」という操作は一度も出てこない。出てくるのは有限和と不等式だけである。` },
      { t: 'fig', type: 'psum', preset: 'geom', editable: true, caption: R`灰色の縦棒が項 $a_k$、赤い点が部分和 $S_k=a_1+\cdots+a_k$。級数の収束とは、赤い点の列（数列 $\{S_k\}$）が水平線 $S$ に近づくことである。プリセットで「Σ 1/n（発散）」を選ぶと、項は $0$ に近づくのに部分和は止まらずに増え続ける。` },

      { t: 'h2', id: 'geom', text: '等比級数' },
      { t: 'lem', id: 'lem-bernoulli', title: 'ベルヌーイの不等式', yomi: 'べるぬーいのふとうしき', imp: 2, text: R`$h\in\mathbb{R}$, $h\ge0$ とする。すべての $n\in\mathbb{N}$ について $(1+h)^n\ge1+nh$。` },
      {
        t: 'proof',
        steps: [
          { text: R`$n$ についての[[proof-methods#thm-induction|数学的帰納法]]で示す。$n=1$ のとき両辺とも $1+h$ で、等号が成り立つ。` },
          {
            text: R`ある $n\in\mathbb{N}$ で $(1+h)^n\ge1+nh$ が成り立つと仮定する。$1+h>0$ なので、両辺に $1+h$ を掛けても不等号の向きは変わらない：`,
            eqs: [
              [R`(1+h)^{n+1}=(1+h)^n(1+h)`, R`指数法則`],
              [R`\phantom{(1+h)^{n+1}}\ge(1+nh)(1+h)`, R`帰納法の仮定と $1+h>0$`],
              [R`\phantom{(1+h)^{n+1}}=1+(n+1)h+nh^2`, R`展開`],
              [R`\phantom{(1+h)^{n+1}}\ge1+(n+1)h.`, R`$nh^2\ge0$`],
            ],
          },
          { text: R`よって $n+1$ でも成り立ち、すべての $n\in\mathbb{N}$ について示された。` },
        ],
      },
      { t: 'lem', id: 'lem-rn', title: '|r| < 1 なら rⁿ → 0', yomi: 'あーるのえぬじょう', imp: 2, text: R`$r\in\mathbb{R}$, $|r|<1$ ならば $\displaystyle\lim_{n\to\infty}r^n=0$。` },
      {
        t: 'proof',
        sketch: R`$\frac1{|r|}=1+h$（$h>0$）と書けば、ベルヌーイの不等式から $|r|^n=\frac1{(1+h)^n}\le\frac1{nh}$。右辺は $\frac1n$ の定数倍なので $0$ に近づく。`,
        steps: [
          { text: R`$r=0$ なら、すべての $n\in\mathbb{N}$ で $r^n=0$ なので明らかに $r^n\to0$。以下 $0<|r|<1$ とする。` },
          { text: R`$h:=\dfrac1{|r|}-1$ とおく。$0<|r|<1$ より $\dfrac1{|r|}>1$ なので $h>0$ であり、$|r|=\dfrac1{1+h}$。` },
          {
            text: R`$\varepsilon>0$ を任意にとる。[[supremum#cor-arch|アルキメデスの原理の系]]より $\dfrac1N<h\varepsilon$ をみたす $N=N(\varepsilon)\in\mathbb{N}$ がとれる（$h\varepsilon>0$ に系を使う）。$n\in\mathbb{N}$, $n\ge N$ のとき、`,
            eqs: [
              [R`|r^n-0|=|r|^n=\frac1{(1+h)^n}`, R`$|r|=\frac1{1+h}$、[[abs-triangle#prop-abs-basic|$|xy|=|x||y|$]]`],
              [R`\phantom{|r^n-0|}\le\frac1{1+nh}<\frac1{nh}`, R`[[series#lem-bernoulli|ベルヌーイ]]で分母を小さくする`],
              [R`\phantom{|r^n-0|}\le\frac1{Nh}<\varepsilon.`, R`$n\ge N$、$N$ の取り方 $\frac1N<h\varepsilon$`],
            ],
          },
          { text: R`よって $r^n\to0\ (n\to\infty)$。` },
        ],
      },
      { t: 'thm', id: 'thm-geom', title: '等比級数', yomi: 'とうひきゅうすう', imp: 3, text: R`$r\in\mathbb{R}$ とする。級数 $\sum_{n=0}^\infty r^n=1+r+r^2+\cdots$ は、$|r|<1$ のとき収束して
$$\sum_{n=0}^\infty r^n=\frac1{1-r}$$
であり、$|r|\ge1$ のとき発散する。` },
      {
        t: 'proof',
        sketch: R`部分和は公式 $S_n=\frac{1-r^{n+1}}{1-r}$ で具体的に書ける。$|r|<1$ なら $r^{n+1}\to0$。$|r|\ge1$ なら項 $r^n$ が $0$ に近づかないので、下の [[series#thm-term|定理]] により発散する。`,
        steps: [
          { text: R`<b>$|r|<1$ の場合。</b>$r\ne1$ なので、[[sigma-notation#ex-geom-sum|等比数列の和の公式]]より $n\in\mathbb{N}\cup\{0\}$ について $S_n=\sum_{k=0}^nr^k=\dfrac{1-r^{n+1}}{1-r}$。` },
          {
            text: R`[[series#lem-rn|補題]]より $r^n\to0$ なので、その一つずらした数列も $r^{n+1}\to0$。[[sequence-convergence#prop-arith|極限の四則演算]]（定数 $\frac1{1-r}$ 倍と定数との差）より`,
            eqs: [[R`S_n=\frac{1}{1-r}-\frac{1}{1-r}\,r^{n+1}\ \longrightarrow\ \frac1{1-r}-\frac1{1-r}\cdot0=\frac1{1-r}\quad(n\to\infty).`, R`四則演算`]],
          },
          { text: R`<b>$|r|\ge1$ の場合。</b>すべての $n$ で $|r^n|=|r|^n\ge1$ なので、$r^n\to0$ ではない（$\varepsilon=1$ に対して、どんな $N$ をとっても $n=N$ で $|r^N-0|\ge1$）。[[series#thm-term|項が 0 に収束することは収束の必要条件]]なので、級数は発散する。` },
        ],
      },
      { t: 'rem', title: '添字の始まりに注意', text: R`$\sum_{n=0}^\infty r^n$ は $r^0=1$ から始まる。$\sum_{n=1}^\infty r^n=r+r^2+\cdots$ は先頭の $1$ がないので、和は $\dfrac1{1-r}-1=\dfrac r{1-r}$ である。たとえば $\sum_{n=1}^\infty\left(\tfrac12\right)^n=1$（上の図のプリセット）。` },
      { t: 'ex', id: 'ex-tele', title: '望遠鏡和：Σ 1/(n(n+1)) = 1', text: R`$a_n=\dfrac1{n(n+1)}$（$n\in\mathbb{N}$）とすると $a_n=\dfrac1n-\dfrac1{n+1}$ なので、[[sigma-notation#prop-sum-rules|望遠鏡和]]より
$$S_n=\sum_{k=1}^n\Bigl(\frac1k-\frac1{k+1}\Bigr)=1-\frac1{n+1}\longrightarrow1\quad(n\to\infty).$$
よって $\sum_{n=1}^\infty\dfrac1{n(n+1)}=1$。（極限は $\frac1{n+1}\to0$ と四則演算による。）` },

      { t: 'h2', id: 'nec', text: '収束の必要条件：項は 0 に近づく' },
      { t: 'thm', id: 'thm-term', title: '収束する級数の項は 0 に収束する', yomi: 'きゅうすうのこうはぜろにしゅうそく', imp: 3, text: R`実数列 $\{a_n\}$ について、級数 $\sum_{n=1}^\infty a_n$ が収束するならば、$\displaystyle\lim_{n\to\infty}a_n=0$。` },
      {
        t: 'proof',
        sketch: R`$a_n=S_n-S_{n-1}$ で、$S_n$ も $S_{n-1}$ も同じ和 $S$ に近づくから、差は $0$ に近づく。`,
        steps: [
          { text: R`和を $S\in\mathbb{R}$ とし、$\varepsilon>0$ を任意にとる。$S_n\to S$ より、ある $N=N(\varepsilon)\in\mathbb{N}$ が存在して、$n\in\mathbb{N}$, $n\ge N$ ならば $|S_n-S|<\dfrac\varepsilon2$。` },
          {
            text: R`$n\in\mathbb{N}$, $n\ge N+1$ とする。このとき $n\ge2$ で $a_n=S_n-S_{n-1}$ であり、$n\ge N$ かつ $n-1\ge N$ なので、`,
            eqs: [
              [R`|a_n-0|=|S_n-S_{n-1}|=|(S_n-S)-(S_{n-1}-S)|`, R`$S$ を引いて足す`],
              [R`\phantom{|a_n-0|}\le|S_n-S|+|S_{n-1}-S|`, R`[[abs-triangle#prop-tri|三角不等式]]と $|-x|=|x|$`],
              [R`\phantom{|a_n-0|}<\frac\varepsilon2+\frac\varepsilon2=\varepsilon.`, R`$n\ge N$ と $n-1\ge N$`],
            ],
          },
          { text: R`番号 $N+1\in\mathbb{N}$ が「$\varepsilon$ に対する番号」になっているので、$a_n\to0$ である。` },
        ],
      },
      { t: 'rem', title: '逆は成り立たない', text: R`$a_n\to0$ でも $\sum a_n$ が収束するとは限らない。次の調和級数がその代表例である。この定理の使い道はもっぱら<em>対偶</em>「$a_n\not\to0$ ならば $\sum a_n$ は発散する」である。` },
      { t: 'thm', id: 'thm-harmonic', title: '調和級数は発散する', yomi: 'ちょうわきゅうすうははっさんする', imp: 3, text: R`$\displaystyle\sum_{n=1}^\infty\frac1n=+\infty$。すなわち部分和 $H_n:=\sum_{k=1}^n\frac1k$ について $H_n\to+\infty$。` },
      {
        t: 'proof',
        sketch: R`$\frac1{n+1}+\cdots+\frac1{2n}$ は $n$ 個の項がどれも $\frac1{2n}$ 以上なので $\frac12$ 以上。したがって $H_{2^m}\ge1+\frac m2$ となり、$H_n$ は上に有界でない。`,
        steps: [
          {
            text: R`<b>ステップ 1.</b> $n\in\mathbb{N}$ について $H_{2n}-H_n\ge\dfrac12$。実際、`,
            eqs: [
              [R`H_{2n}-H_n=\sum_{k=n+1}^{2n}\frac1k`, R`[[sigma-notation#prop-sum-rules|和の分割]]`],
              [R`\phantom{H_{2n}-H_n}\ge\sum_{k=n+1}^{2n}\frac1{2n}=n\cdot\frac1{2n}=\frac12.`, R`$n+1\le k\le2n$ なら $\frac1k\ge\frac1{2n}$。項の数は $n$ 個`],
            ],
          },
          { text: R`<b>ステップ 2.</b> $m\in\mathbb{N}\cup\{0\}$ について $H_{2^m}\ge1+\dfrac m2$ を帰納法で示す。$m=0$ では $H_1=1$。$H_{2^m}\ge1+\frac m2$ と仮定すると、ステップ 1 を $n=2^m$ に使って $H_{2^{m+1}}=H_{2^m}+(H_{2\cdot2^m}-H_{2^m})\ge1+\frac m2+\frac12=1+\frac{m+1}2$。` },
          { text: R`<b>ステップ 3.</b> $M\in\mathbb{R}$ を任意にとる。アルキメデスの原理より $m>2M$ をみたす $m\in\mathbb{N}$ があり、$N:=2^m$ とおく（$N=N(M)$）。$\{H_n\}$ は単調増加（$H_{n+1}-H_n=\frac1{n+1}>0$）なので、$n\ge N$ ならば [[monotone-convergence#prop-mono-ext|単調性]]より $H_n\ge H_N\ge1+\frac m2>1+M>M$。よって $H_n\to+\infty$（[[sequence-convergence#def-div|定義]]）。` },
        ],
      },
      { t: 'fig', type: 'psum', preset: 'harm', caption: R`調和級数 $\sum\frac1n$ の部分和。項（灰色の棒）は $0$ に近づくが、部分和は $\log n$ 程度の速さでゆっくり増え続け、どの水平線も最後には越えていく。` },
      { t: 'qa', q: R`$H_n$ はどのくらいの速さで大きくなる？`, a: R`だいたい $\log n$ の速さである（$\log(n+1)\le H_n\le1+\log n$。[[improper-integral#ex-harmonic-log|積分と比べると示せる]]）。$n=10^6$ でも $H_n\approx14.4$ にすぎない。図で発散が「見えにくい」のはこのためで、数値実験だけで収束・発散を判断してはいけない例になっている。` },

      { t: 'h2', id: 'basic', text: '基本的な性質' },
      { t: 'prop', id: 'prop-linear', title: '級数の線形性', yomi: 'きゅうすうのせんけいせい', imp: 2, text: R`実数列 $\{a_n\},\{b_n\}$ について、$\sum_{n=1}^\infty a_n=A\in\mathbb{R}$、$\sum_{n=1}^\infty b_n=B\in\mathbb{R}$ とする。このとき任意の $c\in\mathbb{R}$ について
$$\sum_{n=1}^\infty(a_n+b_n)=A+B,\qquad\sum_{n=1}^\infty ca_n=cA.$$` },
      { t: 'proof', steps: [{ text: R`それぞれの部分和を $S_n^a,S_n^b$ とすると、[[sigma-notation#prop-sum-rules|和の規則]]より $\sum_{k=1}^n(a_k+b_k)=S_n^a+S_n^b$、$\sum_{k=1}^nca_k=cS_n^a$（有限和なので並べかえてよい）。$S_n^a\to A$、$S_n^b\to B$ と[[sequence-convergence#prop-arith|極限の四則演算]]より、それぞれ $A+B$、$cA$ に収束する。` }] },
      { t: 'rem', title: '積や順序の入れかえには注意', text: R`$\sum(a_nb_n)$ は $\left(\sum a_n\right)\left(\sum b_n\right)$ とは一般に等しくない（$n=1,2$ だけでも $a_1b_1+a_2b_2\ne(a_1+a_2)(b_1+b_2)$）。また、項の順序を並べかえると和が変わることがある（[[absolute-convergence#rearr|並べかえ]]）。有限和で自由にできた操作が、無限和では一つずつ確かめる必要がある。` },
      { t: 'prop', id: 'prop-tail', title: '有限個の項は収束に影響しない', yomi: 'きゅうすうのしっぽ', imp: 2, text: R`実数列 $\{a_n\}$ と $M\in\mathbb{N}$ について、$\sum_{n=1}^\infty a_n$ が収束することと、$\sum_{n=M+1}^\infty a_n$ が収束することは同値である。収束するとき
$$\sum_{n=1}^\infty a_n=\sum_{n=1}^Ma_n+\sum_{n=M+1}^\infty a_n$$
であり、さらに<b class="term">残り</b>（tail）$r_M:=\sum_{n=M+1}^\infty a_n$ は $r_M\to0\ (M\to\infty)$ をみたす。` },
      {
        t: 'proof',
        steps: [
          { text: R`$n>M$ について $T_n:=\sum_{k=M+1}^na_k$ とおくと、[[sigma-notation#prop-sum-rules|和の分割]]より $S_n=S_M+T_n$。$S_M\in\mathbb{R}$ は $n$ によらない定数なので、$\{S_n\}_{n>M}$ が収束することと $\{T_n\}_{n>M}$ が収束することは同値で（四則演算）、そのとき $\lim S_n=S_M+\lim T_n$。（$\{S_n\}$ の収束は、先頭の有限個の項を除いた $\{S_n\}_{n>M}$ の収束と同値である。）` },
          { text: R`収束するとき、和を $S$ とすると $r_M=S-S_M$。$S_M\to S\ (M\to\infty)$ なので $r_M\to0$。` },
        ],
      },
      { t: 'thm', id: 'thm-cauchy-series', title: '級数のコーシーの判定法', yomi: 'きゅうすうのこーしーのはんていほう', imp: 3, text: R`実数列 $\{a_n\}$ について、$\sum_{n=1}^\infty a_n$ が収束するための必要十分条件は、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall m,n\in\mathbb{N},\quad n>m\ge N\Longrightarrow\Bigl|\sum_{k=m+1}^na_k\Bigr|<\varepsilon \tag{#}$$
が成り立つことである。` },
      {
        t: 'proof',
        sketch: R`$\sum_{k=m+1}^na_k=S_n-S_m$ なので、(#) は「部分和 $\{S_n\}$ がコーシー列である」ことそのものである。実数ではコーシー列と収束列は同じものだった。`,
        steps: [
          { text: R`$n>m$ のとき、[[sigma-notation#prop-sum-rules|和の分割]]より $S_n-S_m=\sum_{k=m+1}^na_k$。` },
          { text: R`(#) は「$\{S_n\}$ が[[cauchy-sequence#def-cauchy|コーシー列]]である」ことと同値である。実際、コーシー列の条件 $\forall m,n\ge N,\ |S_m-S_n|<\varepsilon$ のうち、$m=n$ の場合は $|S_m-S_n|=0<\varepsilon$ で自動的に成り立ち、$m>n$ の場合は $|S_m-S_n|=|S_n-S_m|$ により $m$ と $n$ を入れかえた場合に帰着する。したがって $n>m\ge N$ の場合だけを調べればよい。` },
          { text: R`[[cauchy-sequence#thm-conv-cauchy|収束列はコーシー列]]であり、[[cauchy-sequence#thm-cauchy-conv|実数のコーシー列は収束する]]ので、「$\{S_n\}$ が収束する」⇔「$\{S_n\}$ がコーシー列」⇔ (#)。` },
        ],
      },
      { t: 'crux', text: R`コーシーの判定法は、和 $S$ の値を知らなくても収束を判定できる。必要なのは「先のほうのひとかたまり $a_{m+1}+\cdots+a_n$ がいくらでも小さい」ことだけである。この考え方は、[[absolute-convergence|絶対収束]]、[[banach-space|バナッハ空間]]での級数、[[neumann-series|ノイマン級数]]へとそのまま受け継がれる。` },

      { t: 'h2', id: 'positive', text: '正項級数' },
      { t: 'prop', id: 'prop-positive', title: '正項級数の収束は部分和の有界性と同値', yomi: 'せいこうきゅうすうのしゅうそく', imp: 3, text: R`実数列 $\{a_n\}$ がすべての $n\in\mathbb{N}$ で $a_n\ge0$ をみたすとする（このとき $\sum a_n$ を<b class="term">正項級数</b>という）。$\sum_{n=1}^\infty a_n$ が収束するための必要十分条件は、部分和の列 $\{S_n\}$ が上に有界であること、すなわち
$$\exists M\in\mathbb{R}\ \text{ s.t. }\ \forall n\in\mathbb{N},\quad S_n\le M$$
が成り立つことである。収束しないときは $\sum_{n=1}^\infty a_n=+\infty$ である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$S_{n+1}-S_n=a_{n+1}\ge0$ なので、$\{S_n\}$ は[[monotone-convergence#def-mono|単調増加]]である。` },
          { text: R`（十分性）$\{S_n\}$ が上に有界なら、[[monotone-convergence#thm-mct|単調収束定理]]より $\{S_n\}$ は収束する。` },
          { text: R`（必要性）$\{S_n\}$ が収束するなら、[[sequence-convergence#prop-bdd|収束列は有界]]なので、特に上に有界である。` },
          { text: R`（発散する場合）$\{S_n\}$ が上に有界でないとする。$M\in\mathbb{R}$ を任意にとると、$S_N>M$ となる $N=N(M)\in\mathbb{N}$ がある。単調増加なので $n\ge N$ で $S_n\ge S_N>M$。よって $S_n\to+\infty$。` },
        ],
      },
      { t: 'note', title: '正項級数は「収束するか +∞ か」の二択', text: R`項がすべて $0$ 以上なら、部分和は減ることがないので、振動して発散することはない。上限で止まるか、どこまでも大きくなるかのどちらかである。そのため正項級数では $\sum a_n<\infty$（収束）と $\sum a_n=\infty$（発散）という書き方がよく使われる。収束・発散の判定法は [[series-tests]] にまとめる。` },
      { t: 'qa', q: R`正項級数でない級数にも、この命題は使える？`, a: R`そのままでは使えない。たとえば $a_n=(-1)^n$ では $S_n$ は $-1,0,-1,0,\dots$ で有界だが、収束しない。符号が混ざる級数では、まず $\sum|a_n|$（正項級数）を調べる、というのが定石である（[[absolute-convergence]]）。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`級数 $\sum_{n=1}^\infty\dfrac{2}{3^n}$ が収束することを示し、その和を求めよ。`, hint: R`$\frac2{3^n}=\frac23\left(\frac13\right)^{n-1}$。[[series#thm-geom|等比級数]]と[[series#prop-linear|線形性]]。`, answer: R`$\sum_{n=1}^\infty\frac2{3^n}=\frac23\sum_{m=0}^\infty\left(\frac13\right)^m$（$m=n-1$ と添字をずらした）。$\left|\frac13\right|<1$ なので等比級数は収束して $\frac1{1-1/3}=\frac32$。線形性より和は $\frac23\cdot\frac32=1$。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$a_n=\dfrac{n}{n+1}$（$n\in\mathbb{N}$）とする。$\sum_{n=1}^\infty a_n$ が発散することを示せ。`, hint: R`項が $0$ に近づくかを調べる。[[series#thm-term|定理]]の対偶。`, answer: R`$a_n=1-\frac1{n+1}\to1\ne0$。もし $\sum a_n$ が収束すれば[[series#thm-term|定理]]より $a_n\to0$ となるはずだが、[[sequence-convergence#thm-unique|極限の一意性]]より $1=0$ となり矛盾。よって発散する。`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`すべての $n\in\mathbb{N}$ で $a_n\ge0$ とし、$\sum_{n=1}^\infty a_n$ が収束するとする。このとき $\sum_{n=1}^\infty a_n^2$ も収束することを示せ。`, hint: R`$a_n\to0$ なので、十分先では $a_n\le1$、したがって $a_n^2\le a_n$。[[series#prop-tail|有限個の項は無関係]]。`, answer: R`[[series#thm-term|定理]]より $a_n\to0$。$\varepsilon=1$ として、$n\ge N$ で $0\le a_n<1$ となる $N\in\mathbb{N}$ をとる。$n\ge N$ では $0\le a_n^2=a_n\cdot a_n\le a_n$。$n>N$ のとき $\sum_{k=N}^na_k^2\le\sum_{k=N}^na_k\le\sum_{k=1}^\infty a_k$（右側の不等式は正項級数の部分和が和以下であることから）なので、$\sum_{k=N}^\infty a_k^2$ は部分和が上に有界な正項級数で、[[series#prop-positive|命題]]より収束する。[[series#prop-tail|有限個の項を加えても]]収束は変わらないので、$\sum_{n=1}^\infty a_n^2$ は収束する。`, space: 8 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'series-tests',
    title: '正項級数の収束判定法',
    sub: '比較・凝集・比・根',
    yomi: 'せいこうきゅうすうのしゅうそくはんていほう',
    aliases: ['比較判定法', 'ひかくはんていほう', '比判定法', 'ひはんていほう', 'ダランベール', 'だらんべーる', '根判定法', 'こんはんていほう', 'コーシーの凝集判定法', 'ぎょうしゅう', 'p級数', 'ぴーきゅうすう', 'ゼータ'],
    kind: '定理',
    field: '級数',
    grade: '1年前期',
    importance: 3,
    prereq: ['series', 'monotone-convergence'],
    related: ['absolute-convergence', 'power-series'],
    notation: [
      R`この記事の級数はすべて正項級数：すべての $n\in\mathbb{N}$ で $a_n\ge0$（比判定法では $a_n>0$）。`,
      R`$S_n:=\sum_{k=1}^na_k$：部分和。正項級数なので $\{S_n\}$ は単調増加（[[series#prop-positive|命題]]）。`,
      R`$p\in\mathbb{R}$, $n\in\mathbb{N}$ に対して $n^p:=e^{p\log n}$（$p$ が整数なら通常のべき）。$p>0$ なら $n\mapsto n^{-p}$ は単調減少。`,
      R`$r\in\mathbb{R}$：比較に使う公比。$0<r<1$ の等比級数 $\sum r^n$ は収束する（[[series#thm-geom|等比級数]]）。`,
    ],
    synopsis: R`正項級数は「部分和が上に有界か」だけで収束が決まる。そこで、収束がわかっている級数と<em>項どうしを比べる</em>ことで判定する。比べる相手の基本は等比級数 $\sum r^n$ と $p$ 級数 $\sum\frac1{n^p}$ であり、比判定法・根判定法は「等比級数と比べる」ことを自動化したものである。`,
    body: [
      { t: 'h2', id: 'comp', text: '比較判定法' },
      { t: 'thm', id: 'thm-comparison', title: '比較判定法', yomi: 'ひかくはんていほう', imp: 3, text: R`実数列 $\{a_n\},\{b_n\}$ が、すべての $n\in\mathbb{N}$ で $0\le a_n\le b_n$ をみたすとする。
<ol><li>$\sum_{n=1}^\infty b_n$ が収束するならば、$\sum_{n=1}^\infty a_n$ も収束し、$\sum_{n=1}^\infty a_n\le\sum_{n=1}^\infty b_n$。</li><li>$\sum_{n=1}^\infty a_n$ が発散するならば、$\sum_{n=1}^\infty b_n$ も発散する。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`部分和を $S_n:=\sum_{k=1}^na_k$、$T_n:=\sum_{k=1}^nb_k$ とする。仮定 $a_k\le b_k$ を $k=1,\dots,n$ について足すと $S_n\le T_n$（$n\in\mathbb{N}$）。` },
          { text: R`(1) $\sum b_n=:B$ が収束するとする。$\{T_n\}$ は単調増加で $B$ に収束するので、すべての $n$ で $T_n\le B$（単調増加列は極限以下：もし $T_m>B$ となる $m$ があれば、$n\ge m$ で $T_n\ge T_m$ となり、[[sequence-convergence#prop-order|極限と不等式]]より $B\ge T_m>B$ で矛盾）。よって $S_n\le T_n\le B$ で、$\{S_n\}$ は上に有界。[[series#prop-positive|正項級数の命題]]より $\sum a_n$ は収束する。さらに $S_n\le B$ で $n\to\infty$ とすれば、[[sequence-convergence#prop-order|極限と不等式]]より $\sum a_n\le B$。` },
          { text: R`(2) は (1) の対偶である。` },
        ],
      },
      { t: 'rem', title: '「すべての n」は「十分先のすべての n」でよい', text: R`[[series#prop-tail|有限個の項は収束に影響しない]]ので、仮定 $0\le a_n\le b_n$ は「ある $n_0\in\mathbb{N}$ があって $n\ge n_0$ のすべてで」に弱めてよい（ただし (1) の和の不等式は、そのままでは成り立たなくなる）。また、正の定数 $c>0$ について $a_n\le cb_n$ でもよい（$\sum cb_n=c\sum b_n$ は[[series#prop-linear|線形性]]より収束する）。` },
      { t: 'ex', id: 'ex-inv-sq', title: 'Σ 1/n² は収束する', text: R`$n\ge2$ のとき $n^2>n(n-1)>0$ なので $0<\dfrac1{n^2}<\dfrac1{n(n-1)}=\dfrac1{n-1}-\dfrac1n$。したがって $n\ge2$ について
$$S_n=1+\sum_{k=2}^n\frac1{k^2}<1+\sum_{k=2}^n\Bigl(\frac1{k-1}-\frac1k\Bigr)=1+\Bigl(1-\frac1n\Bigr)<2.$$
（望遠鏡和。）$S_1=1<2$ と合わせて部分和は上に有界なので、[[series#prop-positive|命題]]より $\sum\frac1{n^2}$ は収束し、和は $2$ 以下である。（実際の和は $\frac{\pi^2}6\approx1.645$。これは[[fourier-series|フーリエ級数]]で示せる。）` },

      { t: 'h2', id: 'cond', text: 'コーシーの凝集判定法と p 級数' },
      { t: 'thm', id: 'thm-condensation', title: 'コーシーの凝集判定法', yomi: 'こーしーのぎょうしゅうはんていほう', imp: 2, text: R`実数列 $\{a_n\}$ が、すべての $n\in\mathbb{N}$ で $a_n\ge0$ かつ $a_n\ge a_{n+1}$（非負・単調減少）をみたすとする。このとき
$$\sum_{n=1}^\infty a_n\ \text{が収束する}\iff\sum_{k=0}^\infty2^ka_{2^k}\ \text{が収束する}.$$` },
      { t: 'strategy', text: R`番号を $2^k\le n<2^{k+1}$ のかたまりに分ける。かたまりの中には $2^k$ 個の項があり、単調減少なのでどれも先頭の $a_{2^k}$ 以下、末尾の次 $a_{2^{k+1}}$ 以上である。これで二つの級数の部分和を互いに抑え合う。` },
      {
        t: 'proof',
        steps: [
          { text: R`$S_n:=\sum_{k=1}^na_k$、$T_m:=\sum_{k=0}^m2^ka_{2^k}$ とおく。どちらも非負の項の和なので単調増加である。[[series#prop-positive|正項級数の命題]]より、それぞれの収束は部分和の上の有界性と同値なので、「$\{S_n\}$ が上に有界 ⇔ $\{T_m\}$ が上に有界」を示せばよい。` },
          {
            text: R`<b>(⇐) $S_n\le T_m$（$n<2^{m+1}$）。</b> $m\in\mathbb{N}\cup\{0\}$ とし $n:=2^{m+1}-1$ とする。番号 $1,\dots,2^{m+1}-1$ を $k=0,1,\dots,m$ ごとのかたまり $\{2^k,\,2^k+1,\dots,2^{k+1}-1\}$（$2^k$ 個）に分けると、`,
            eqs: [
              [R`S_{2^{m+1}-1}=\sum_{k=0}^m\ \sum_{j=2^k}^{2^{k+1}-1}a_j`, R`[[sigma-notation#prop-sum-rules|和の分割]]`],
              [R`\phantom{S_{2^{m+1}-1}}\le\sum_{k=0}^m\ \sum_{j=2^k}^{2^{k+1}-1}a_{2^k}=\sum_{k=0}^m2^ka_{2^k}=T_m.`, R`$j\ge2^k$ なら単調減少より $a_j\le a_{2^k}$`],
            ],
          },
          { text: R`したがって $\{T_m\}$ が $M$ で上に有界なら、任意の $n\in\mathbb{N}$ について $2^{m+1}-1\ge n$ となる $m$ をとれば（$m=n$ でよい：[[series#lem-bernoulli|ベルヌーイ]]より $2^{n+1}\ge1+(n+1)>n+1$）、$S_n\le S_{2^{m+1}-1}\le T_m\le M$。` },
          {
            text: R`<b>(⇒) $T_m\le2S_{2^m}$。</b> $m\in\mathbb{N}$ とする。番号 $2,\dots,2^m$ を $k=1,\dots,m$ ごとのかたまり $\{2^{k-1}+1,\dots,2^k\}$（$2^{k-1}$ 個）に分けると、`,
            eqs: [
              [R`S_{2^m}=a_1+\sum_{k=1}^m\ \sum_{j=2^{k-1}+1}^{2^k}a_j`, R`和の分割`],
              [R`\phantom{S_{2^m}}\ge a_1+\sum_{k=1}^m2^{k-1}a_{2^k}`, R`$j\le2^k$ なら $a_j\ge a_{2^k}$`],
              [R`\phantom{S_{2^m}}=\frac12a_1+\frac12\sum_{k=0}^m2^ka_{2^k}\ \ge\ \frac12T_m.`, R`$a_1=2^0a_{2^0}$、$a_1\ge0$`],
            ],
          },
          { text: R`したがって $\{S_n\}$ が $M$ で上に有界なら $T_m\le2M$（$m\in\mathbb{N}$。$T_0=a_1\le M$ も成り立つ）。以上で同値性が示された。` },
        ],
      },
      { t: 'thm', id: 'thm-p-series', title: 'p 級数', yomi: 'ぴーきゅうすう', imp: 3, text: R`$p\in\mathbb{R}$ とする。級数 $\displaystyle\sum_{n=1}^\infty\frac1{n^p}$ は、$p>1$ のとき収束し、$p\le1$ のとき発散する。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>$p\le0$ の場合。</b>$n\ge1$ と $-p\ge0$ より $\frac1{n^p}=n^{-p}\ge1$ なので、項は $0$ に収束しない。[[series#thm-term|必要条件]]より発散する。` },
          {
            text: R`<b>$p>0$ の場合。</b>$a_n:=n^{-p}$ は正で単調減少なので、[[series-tests#thm-condensation|凝集判定法]]が使える。$k\in\mathbb{N}\cup\{0\}$ について`,
            eqs: [[R`2^ka_{2^k}=2^k\,(2^k)^{-p}=2^{k(1-p)}=\bigl(2^{1-p}\bigr)^k`, R`指数法則`]],
          },
          { text: R`これは公比 $r:=2^{1-p}>0$ の[[series#thm-geom|等比級数]]で、$r<1\iff1-p<0\iff p>1$。よって $p>1$ なら収束、$0<p\le1$ なら $r\ge1$ で発散する。凝集判定法より、元の級数も同じ結論になる。` },
        ],
      },
      { t: 'fig', type: 'psum', preset: 'p2', editable: true, caption: R`$\sum\frac1{n^2}$ の部分和は $\frac{\pi^2}6\approx1.645$ に近づく。式を 1/n^1.1 や 1/n^0.9 に書きかえて比べてみよう（どちらも図の範囲では区別がつきにくいが、前者は収束、後者は発散する）。` },

      { t: 'h2', id: 'ratio', text: '比判定法と根判定法' },
      { t: 'thm', id: 'thm-ratio', title: '比判定法（ダランベールの判定法）', yomi: 'ひはんていほう', imp: 3, text: R`すべての $n\in\mathbb{N}$ で $a_n>0$ とする。
<ol><li>ある $r\in\mathbb{R}$, $0<r<1$ と $N\in\mathbb{N}$ が存在して、$n\ge N$ のすべてで $\dfrac{a_{n+1}}{a_n}\le r$ ならば、$\sum a_n$ は収束する。</li><li>ある $N\in\mathbb{N}$ が存在して、$n\ge N$ のすべてで $\dfrac{a_{n+1}}{a_n}\ge1$ ならば、$\sum a_n$ は発散する。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $n\ge N$ について $a_n\le a_Nr^{n-N}$ を帰納法で示す。$n=N$ では等号。$a_n\le a_Nr^{n-N}$ なら、仮定より $a_{n+1}\le ra_n\le a_Nr^{n+1-N}$（$a_n>0$ なので $\frac{a_{n+1}}{a_n}\le r$ の両辺に $a_n$ を掛けてよい）。` },
          { text: R`$b_n:=a_Nr^{-N}\cdot r^n$ とおくと、$\sum_{n=N}^\infty b_n$ は公比 $r\in(0,1)$ の等比級数の定数倍なので収束する（[[series#thm-geom|等比級数]]・[[series#prop-linear|線形性]]）。$n\ge N$ で $0<a_n\le b_n$ なので、[[series-tests#thm-comparison|比較判定法]]より $\sum_{n=N}^\infty a_n$ は収束し、[[series#prop-tail|有限個の項は無関係]]なので $\sum_{n=1}^\infty a_n$ も収束する。` },
          { text: R`(2) $n\ge N$ で $a_{n+1}\ge a_n$ なので、帰納法で $a_n\ge a_N>0$（$n\ge N$）。よって $a_n\to0$ ではなく（$\varepsilon=a_N$ がその証拠）、[[series#thm-term|必要条件]]より発散する。` },
        ],
      },
      { t: 'cor', id: 'cor-ratio-lim', title: '比判定法（極限の形）', yomi: 'ひはんていほうきょくげん', imp: 3, text: R`すべての $n\in\mathbb{N}$ で $a_n>0$ とし、極限 $\rho:=\displaystyle\lim_{n\to\infty}\frac{a_{n+1}}{a_n}\in\mathbb{R}$ が存在するとする。$\rho<1$ ならば $\sum a_n$ は収束し、$\rho>1$ ならば発散する。（$\rho=1$ のときは、この判定法では決まらない。）` },
      {
        t: 'proof',
        steps: [
          { text: R`$\rho<1$ のとき：$\rho\ge0$（各比は正なので[[sequence-convergence#prop-order|極限も 0 以上]]）。$r:=\dfrac{1+\rho}2$ とおくと $\rho<r<1$、$r>0$。$\varepsilon:=r-\rho>0$ に対し、$n\ge N$ で $\left|\frac{a_{n+1}}{a_n}-\rho\right|<\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ がとれる。このとき $\frac{a_{n+1}}{a_n}<\rho+\varepsilon=r$ なので、定理 (1) より収束。` },
          { text: R`$\rho>1$ のとき：$\varepsilon:=\rho-1>0$ に対し、$n\ge N$ で $\left|\frac{a_{n+1}}{a_n}-\rho\right|<\varepsilon$ となる $N$ がとれ、$\frac{a_{n+1}}{a_n}>\rho-\varepsilon=1$。定理 (2) より発散。` },
        ],
      },
      { t: 'rem', title: 'ρ = 1 では何も言えない', text: R`$a_n=\frac1n$ も $a_n=\frac1{n^2}$ も $\frac{a_{n+1}}{a_n}\to1$ である（$\frac n{n+1}\to1$、$\frac{n^2}{(n+1)^2}\to1$）。前者は発散し、後者は収束する。比判定法は「等比級数と比べる」方法なので、等比級数より遅く $0$ に近づく項（$p$ 級数など）は判定できない。` },
      { t: 'thm', id: 'thm-root', title: '根判定法（コーシーの判定法）', yomi: 'こんはんていほう', imp: 2, text: R`すべての $n\in\mathbb{N}$ で $a_n\ge0$ とする。
<ol><li>ある $r\in\mathbb{R}$, $0<r<1$ と $N\in\mathbb{N}$ が存在して、$n\ge N$ のすべてで $a_n^{1/n}\le r$ ならば、$\sum a_n$ は収束する。</li><li>無限個の $n\in\mathbb{N}$ について $a_n^{1/n}\ge1$ ならば、$\sum a_n$ は発散する。</li></ol>特に $\displaystyle\lim_{n\to\infty}a_n^{1/n}=\rho\in\mathbb{R}$ が存在するとき、$\rho<1$ なら収束、$\rho>1$ なら発散する。` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $n\ge N$ で $a_n^{1/n}\le r$ の両辺を $n$ 乗すると（$t\mapsto t^n$ は $t\ge0$ で単調増加）$0\le a_n\le r^n$。$\sum r^n$ は収束するので、[[series-tests#thm-comparison|比較判定法]]と[[series#prop-tail|有限個の項の無関係性]]より $\sum a_n$ は収束する。` },
          { text: R`(2) 無限個の $n$ で $a_n\ge1$ なので、どんな $N$ に対しても $n\ge N$ かつ $|a_n-0|\ge1$ となる $n$ がある。よって $a_n\not\to0$ で、[[series#thm-term|必要条件]]より発散する。` },
          { text: R`極限の形：$\rho<1$ なら $r:=\frac{1+\rho}2$、$\varepsilon:=r-\rho$ として、十分先で $a_n^{1/n}<r$。$\rho>1$ なら $\varepsilon:=\rho-1$ として、十分先のすべての $n$ で $a_n^{1/n}>1$。それぞれ (1)、(2) に帰着する。` },
        ],
      },
      { t: 'ex', id: 'ex-ratio', title: '比判定法の使用例', text: R`<ol><li>$\sum_{n=1}^\infty\dfrac n{2^n}$：$\dfrac{a_{n+1}}{a_n}=\dfrac{n+1}{2n}=\dfrac12\Bigl(1+\dfrac1n\Bigr)\to\dfrac12<1$ なので収束する。</li><li>$x\in\mathbb{R}$, $x>0$ について $\sum_{n=0}^\infty\dfrac{x^n}{n!}$：$\dfrac{a_{n+1}}{a_n}=\dfrac x{n+1}\to0<1$ なので収束する（和は $e^x$。[[power-series|べき級数]]で扱う）。</li><li>$\sum_{n=1}^\infty\dfrac{n!}{n^n}$：$\dfrac{a_{n+1}}{a_n}=\Bigl(\dfrac n{n+1}\Bigr)^n=\dfrac1{(1+1/n)^n}\to\dfrac1e<1$ なので収束する（[[monotone-convergence#ex-mct-e|$e$ の定義]]）。</li></ol>` },
      { t: 'qa', q: R`比判定法と根判定法はどちらが強い？`, a: R`根判定法のほうが強い（比の極限が存在すれば根の極限も存在して同じ値になるが、逆は成り立たない）。ただし実際の計算では、階乗 $n!$ を含む項には比判定法、$n$ 乗を含む項には根判定法が使いやすい。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\sum_{n=1}^\infty\dfrac1{n^2+n+1}$ が収束することを示せ。`, hint: R`$n^2+n+1>n^2$。[[series-tests#thm-comparison|比較判定法]]と[[series-tests#ex-inv-sq|Σ 1/n²]]。`, answer: R`$n\in\mathbb{N}$ について $n^2+n+1>n^2>0$ なので $0<\frac1{n^2+n+1}<\frac1{n^2}$。$\sum\frac1{n^2}$ は収束するので、比較判定法より与えられた級数も収束する。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\sum_{n=1}^\infty\dfrac{3^n}{n!}$ の収束・発散を判定せよ。`, hint: R`比 $\frac{a_{n+1}}{a_n}$ を計算する。`, answer: R`$a_n=\frac{3^n}{n!}>0$ で $\frac{a_{n+1}}{a_n}=\frac{3^{n+1}n!}{(n+1)!\,3^n}=\frac3{n+1}\to0<1$。[[series-tests#cor-ratio-lim|比判定法]]より収束する。`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`$\sum_{n=2}^\infty\dfrac1{n\log n}$ が発散することを、凝集判定法を用いて示せ。`, hint: R`$a_n=\frac1{n\log n}$ は $n\ge2$ で正・単調減少。$2^ka_{2^k}=\frac1{k\log2}$。`, answer: R`$n\ge2$ で $n\log n$ は正で単調増加なので、$a_n=\frac1{n\log n}$ は正で単調減少（凝集判定法は $n\ge2$ から始まる級数にも同じ証明で使える）。$k\ge1$ で $2^ka_{2^k}=\frac{2^k}{2^k\cdot k\log2}=\frac1{\log2}\cdot\frac1k$。$\sum\frac1k$ は[[series#thm-harmonic|発散]]するので、凝集判定法より $\sum\frac1{n\log n}$ も発散する。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'absolute-convergence',
    title: '絶対収束と条件収束',
    sub: '交代級数・並べかえ',
    yomi: 'ぜったいしゅうそく',
    aliases: ['絶対収束', 'ぜったいしゅうそく', '条件収束', 'じょうけんしゅうそく', '交代級数', 'こうたいきゅうすう', 'ライプニッツの判定法', 'らいぷにっつ', '並べかえ', 'ならべかえ', '再配列', 'さいはいれつ'],
    kind: '定理',
    field: '級数',
    grade: '1年前期',
    importance: 3,
    prereq: ['series', 'series-tests'],
    related: ['banach-space', 'sequence-spaces', 'power-series'],
    notation: [
      R`実数列 $\{a_n\}$：各 $a_n\in\mathbb{R}$。符号は正負どちらでもよい。`,
      R`$\sum|a_n|$：各項の絶対値をとった正項級数。`,
      R`$\sigma:\mathbb{N}\to\mathbb{N}$：[[maps#def-injsurj|全単射]]（番号の並べかえ）。$\sum a_{\sigma(n)}$ は項の順序を入れかえた級数。`,
      R`$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon>0$ に応じて決まる番号。`,
    ],
    synopsis: R`項の絶対値の和 $\sum|a_n|$ が収束するとき、$\sum a_n$ は<em>絶対収束</em>するという。絶対収束する級数は必ず収束し、項の順序を並べかえても和が変わらない。絶対収束しないが収束する級数（条件収束）は、並べかえで和が変わってしまう。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と基本定理' },
      { t: 'def', id: 'def-abs', title: '絶対収束・条件収束', yomi: 'ぜったいしゅうそく', imp: 3, text: R`実数列 $\{a_n\}$ について、正項級数 $\sum_{n=1}^\infty|a_n|$ が収束するとき、$\sum_{n=1}^\infty a_n$ は<b class="term">絶対収束</b>するという。$\sum a_n$ は収束するが絶対収束しないとき、<b class="term">条件収束</b>するという。` },
      { t: 'thm', id: 'thm-abs-conv', title: '絶対収束する級数は収束する', yomi: 'ぜったいしゅうそくならしゅうそく', imp: 3, text: R`実数列 $\{a_n\}$ について、$\sum_{n=1}^\infty|a_n|$ が収束するならば、$\sum_{n=1}^\infty a_n$ も収束し、
$$\Bigl|\sum_{n=1}^\infty a_n\Bigr|\le\sum_{n=1}^\infty|a_n|.$$` },
      { t: 'strategy', text: R`和の値はわからないので、[[series#thm-cauchy-series|コーシーの判定法]]を使う。ひとかたまりの和 $\bigl|\sum_{k=m+1}^na_k\bigr|$ を、三角不等式で $\sum_{k=m+1}^n|a_k|$ で抑えれば、後者は $\sum|a_n|$ のコーシー条件から小さい。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>有限和の三角不等式。</b>実数 $x_1,\dots,x_l$（$l\in\mathbb{N}$）について $\bigl|\sum_{k=1}^lx_k\bigr|\le\sum_{k=1}^l|x_k|$。$l$ についての帰納法による：$l=1$ は等号。$l$ で成り立てば $\bigl|\sum_{k=1}^{l+1}x_k\bigr|\le\bigl|\sum_{k=1}^lx_k\bigr|+|x_{l+1}|\le\sum_{k=1}^{l+1}|x_k|$（[[abs-triangle#prop-tri|三角不等式]]と帰納法の仮定）。` },
          {
            text: R`<b>収束。</b>$\varepsilon>0$ を任意にとる。$\sum|a_n|$ は収束するので、[[series#thm-cauchy-series|コーシーの判定法]]（必要性）より、ある $N=N(\varepsilon)\in\mathbb{N}$ があって $n>m\ge N$ ならば $\sum_{k=m+1}^n|a_k|<\varepsilon$（絶対値の和は非負なので外側の絶対値は不要）。このとき`,
            eqs: [[R`\Bigl|\sum_{k=m+1}^na_k\Bigr|\le\sum_{k=m+1}^n|a_k|<\varepsilon.`, R`有限和の三角不等式`]],
          },
          { text: R`よって $\sum a_n$ はコーシーの判定法の条件をみたし（十分性）、収束する。` },
          { text: R`<b>不等式。</b>$S_n:=\sum_{k=1}^na_k$ とし、和を $S$ とする。有限和の三角不等式と正項級数の部分和は和以下であることから $|S_n|\le\sum_{k=1}^n|a_k|\le\sum_{k=1}^\infty|a_k|$。[[abs-triangle#cor-rev|逆向きの三角不等式]]より $\bigl||S_n|-|S|\bigr|\le|S_n-S|\to0$ なので $|S_n|\to|S|$。[[sequence-convergence#prop-order|極限と不等式]]より $|S|\le\sum_{k=1}^\infty|a_k|$。` },
        ],
      },
      { t: 'note', title: '別証：正の部分と負の部分に分ける', text: R`$a_n^+:=\max\{a_n,0\}$、$a_n^-:=\max\{-a_n,0\}$ とおくと $0\le a_n^\pm\le|a_n|$、$a_n=a_n^+-a_n^-$。比較判定法より $\sum a_n^+$、$\sum a_n^-$ はどちらも収束し、線形性より $\sum a_n=\sum a_n^+-\sum a_n^-$ も収束する。こちらは「実数の順序」を使う証明で、上の証明は「コーシー列」を使う証明である。後者は[[banach-space#thm-abs-series|バナッハ空間]]にそのまま一般化できる。` },
      { t: 'ex', id: 'ex-abs', title: '絶対収束の例', text: R`$\sum_{n=1}^\infty\dfrac{(-1)^n}{n^2}$ は、$\left|\dfrac{(-1)^n}{n^2}\right|=\dfrac1{n^2}$ で $\sum\frac1{n^2}$ が[[series-tests#ex-inv-sq|収束する]]ので絶対収束し、したがって収束する。同様に、$\theta\in\mathbb{R}$ について $\sum_{n=1}^\infty\dfrac{\sin(n\theta)}{n^2}$ も $\left|\dfrac{\sin(n\theta)}{n^2}\right|\le\dfrac1{n^2}$ より絶対収束する。` },

      { t: 'h2', id: 'leibniz', text: '交代級数' },
      { t: 'thm', id: 'thm-leibniz', title: 'ライプニッツの判定法（交代級数）', yomi: 'らいぷにっつのはんていほう', imp: 3, text: R`実数列 $\{b_n\}$ が、すべての $n\in\mathbb{N}$ で $b_n\ge b_{n+1}$（単調減少）をみたし、$\displaystyle\lim_{n\to\infty}b_n=0$ とする。このとき交代級数
$$\sum_{n=1}^\infty(-1)^{n+1}b_n=b_1-b_2+b_3-b_4+\cdots$$
は収束する。さらに、その和を $S$、部分和を $S_n$ とすると、すべての $n\in\mathbb{N}$ で $|S-S_n|\le b_{n+1}$。` },
      { t: 'strategy', text: R`偶数番目の部分和 $S_{2m}$ は増加し、奇数番目 $S_{2m-1}$ は減少し、つねに $S_{2m}\le S_{2m+1}$。二つの単調な数列が同じ値にはさまれていく様子を、[[monotone-convergence|単調収束定理]]で捉える。` },
      { t: 'fig', type: 'psum', preset: 'alt', caption: R`$\sum\frac{(-1)^{n+1}}n$ の部分和。上下に振れながら、振れ幅 $b_{n+1}=\frac1{n+1}$ を縮めて $\log2\approx0.693$ に近づく。奇数番目の点は上から、偶数番目の点は下から近づいている。` },
      {
        t: 'proof',
        steps: [
          { text: R`まず $b_n\ge0$（$n\in\mathbb{N}$）に注意する。実際、単調減少より $m\ge n$ で $b_n\ge b_m$、$m\to\infty$ とすれば[[sequence-convergence#prop-order|極限と不等式]]より $b_n\ge0$。` },
          {
            text: R`<b>ステップ 1：偶数番目は増加、奇数番目は減少。</b> $m\in\mathbb{N}$ について`,
            eqs: [
              [R`S_{2m+2}-S_{2m}=b_{2m+1}-b_{2m+2}\ge0,`, R`単調減少`],
              [R`S_{2m+1}-S_{2m-1}=-b_{2m}+b_{2m+1}\le0.`, R`単調減少`],
            ],
          },
          { text: R`<b>ステップ 2：はさまれている。</b> $S_{2m+1}-S_{2m}=b_{2m+1}\ge0$ なので $S_{2m}\le S_{2m+1}$。ステップ 1 と合わせて、$m\in\mathbb{N}$ について $S_2\le S_{2m}\le S_{2m+1}\le S_1$。` },
          { text: R`<b>ステップ 3：二つの極限は一致する。</b> $\{S_{2m}\}_m$ は単調増加で $S_1$ で上に有界、$\{S_{2m-1}\}_m$ は単調減少で $S_2$ で下に有界。[[monotone-convergence#thm-mct|単調収束定理]]より、それぞれ $S',S''\in\mathbb{R}$ に収束する。$S_{2m+1}-S_{2m}=b_{2m+1}\to0$ と四則演算より $S''-S'=0$。この値を $S$ とする。` },
          { text: R`<b>ステップ 4：全体が収束する。</b> $\varepsilon>0$ に対し、$m\ge M_1$ で $|S_{2m}-S|<\varepsilon$、$m\ge M_2$ で $|S_{2m-1}-S|<\varepsilon$ となる $M_1,M_2\in\mathbb{N}$ をとる。$N:=2\max\{M_1,M_2\}$ とおけば、$n\ge N$ のとき、$n=2m$ なら $m\ge M_1$、$n=2m-1$ なら $m\ge\max\{M_1,M_2\}\ge M_2$（$2m-1\ge2M_2$ より $m>M_2$）なので、いずれも $|S_n-S|<\varepsilon$。よって $S_n\to S$。` },
          { text: R`<b>ステップ 5：誤差の評価。</b> ステップ 1–3 より、$S_{2m}$ は増加しながら、$S_{2m+1}$ は減少しながら $S$ に収束するので、$S_{2m}\le S\le S_{2m+1}$（単調増加列は極限以下、単調減少列は極限以上）。よって $n$ が偶数でも奇数でも、$S$ は $S_n$ と $S_{n+1}$ の間にあり、$|S-S_n|\le|S_{n+1}-S_n|=b_{n+1}$。` },
        ],
      },
      { t: 'ex', id: 'ex-alt-harm', title: '交代調和級数は条件収束する', text: R`$b_n=\frac1n$ は単調減少で $0$ に収束するので、ライプニッツの判定法より $\sum_{n=1}^\infty\dfrac{(-1)^{n+1}}n$ は収束する（和は $\log2$。$\log(1+x)$ の[[power-series|べき級数展開]]から分かる）。一方 $\sum\left|\frac{(-1)^{n+1}}n\right|=\sum\frac1n$ は[[series#thm-harmonic|発散する]]ので、絶対収束はしない。つまり条件収束する。` },
      { t: 'qa', q: R`単調減少の仮定は外せる？`, a: R`外せない。$b_{2m-1}=\frac1m$、$b_{2m}=\frac1{m^2}$ とおくと $b_n\to0$ だが単調でない。このとき $S_{2m}=\sum_{j=1}^m\left(\frac1j-\frac1{j^2}\right)$ で、$\sum\frac1j$ は発散、$\sum\frac1{j^2}$ は収束するので $S_{2m}\to+\infty$。級数は発散する。` },

      { t: 'h2', id: 'rearr', text: '並べかえ' },
      { t: 'thm', id: 'thm-rearr', title: '絶対収束する級数は並べかえても和が変わらない', yomi: 'ならべかえ', imp: 2, text: R`実数列 $\{a_n\}$ について $\sum_{n=1}^\infty a_n$ が絶対収束し、その和を $S$ とする。任意の全単射 $\sigma:\mathbb{N}\to\mathbb{N}$ について、$\sum_{n=1}^\infty a_{\sigma(n)}$ も絶対収束し、その和は $S$ である。` },
      {
        t: 'proof',
        sketch: R`残り $\sum_{j>M}|a_j|$ が小さくなる $M$ を先に決め、並べかえた和が十分先まで進めば $a_1,\dots,a_M$ をすべて含むようにする。違いは $M$ より大きい番号の項だけなので、残りで抑えられる。`,
        steps: [
          { text: R`$\varepsilon>0$ を任意にとる。[[series#prop-tail|残りは 0 に収束する]]ので、$\sum_{j=M+1}^\infty|a_j|<\dfrac\varepsilon2$ となる $M=M(\varepsilon)\in\mathbb{N}$ がとれる。` },
          { text: R`$K:=\max\{\sigma^{-1}(1),\dots,\sigma^{-1}(M)\}\in\mathbb{N}$ とおく（$\sigma$ は全単射なので逆写像 $\sigma^{-1}$ がある）。$n\ge K$ ならば $\{1,\dots,M\}\subset\{\sigma(1),\dots,\sigma(n)\}$（$j\le M$ なら $j=\sigma(\sigma^{-1}(j))$ で $\sigma^{-1}(j)\le K\le n$）。$K\ge M$ にも注意（$M$ 個の異なる番号 $\sigma^{-1}(1),\dots,\sigma^{-1}(M)$ の最大値は $M$ 以上）。` },
          {
            text: R`$n\ge K$ とし、$T_n:=\sum_{k=1}^na_{\sigma(k)}$ とする。$J_n:=\{\sigma(1),\dots,\sigma(n)\}\setminus\{1,\dots,M\}$ は、$M$ より大きい番号からなる有限集合なので（$\sigma$ は単射なので重複はない）、`,
            eqs: [
              [R`\Bigl|T_n-\sum_{j=1}^Ma_j\Bigr|=\Bigl|\sum_{j\in J_n}a_j\Bigr|\le\sum_{j\in J_n}|a_j|\le\sum_{j=M+1}^\infty|a_j|<\frac\varepsilon2,`, R`有限和の三角不等式・残りの選び方`],
              [R`\Bigl|\sum_{j=1}^Ma_j-S\Bigr|=\Bigl|\sum_{j=M+1}^\infty a_j\Bigr|\le\sum_{j=M+1}^\infty|a_j|<\frac\varepsilon2.`, R`[[absolute-convergence#thm-abs-conv|定理]]を残りの級数に使う`],
            ],
          },
          { text: R`三角不等式より $|T_n-S|<\varepsilon$（$n\ge K$）。よって $T_n\to S$。絶対収束することは、$\{|a_n|\}$ に今の議論を当てはめれば $\sum|a_{\sigma(n)}|=\sum|a_n|<\infty$ となることからわかる。` },
        ],
      },
      { t: 'rem', title: '条件収束する級数は並べかえで和が変わる（リーマンの再配列定理）', text: R`$\sum a_n$ が条件収束するとき、任意の $c\in\mathbb{R}$ に対して、和が $c$ になる並べかえ $\sigma$ が存在する（リーマンの再配列定理。ここでは主張だけを述べる）。たとえば交代調和級数を「正の項 2 つ、負の項 1 つ」の順に並べかえると
$$1+\frac13-\frac12+\frac15+\frac17-\frac14+\cdots=\frac32\log2$$
となり、元の和 $\log2$ と異なる。無限和では「足す順番」が結果に影響しうるのである。` },
      { t: 'crux', text: R`絶対収束は「足す順番によらない、本物の和」を保証する条件である。関数解析では、バナッハ空間の元の級数 $\sum x_n$ について「$\sum\|x_n\|<\infty$ ならば収束する」が[[banach-space#thm-abs-series|完備性の特徴づけ]]になり、[[neumann-series|ノイマン級数]]はその応用である。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\sum_{n=1}^\infty\dfrac{(-1)^n}{\sqrt n}$ は収束するか。絶対収束するか。`, hint: R`$b_n=\frac1{\sqrt n}$ にライプニッツの判定法。絶対値は $p=\frac12$ の $p$ 級数。`, answer: R`$b_n=\frac1{\sqrt n}$ は単調減少で $0$ に収束するので、[[absolute-convergence#thm-leibniz|ライプニッツの判定法]]より $\sum(-1)^{n+1}b_n$ は収束し、その $(-1)$ 倍である与えられた級数も収束する。絶対値の級数 $\sum\frac1{n^{1/2}}$ は $p=\frac12\le1$ の[[series-tests#thm-p-series|p 級数]]なので発散する。よって条件収束である。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`ライプニッツの判定法の誤差評価を使って、$\sum_{n=1}^\infty\dfrac{(-1)^{n+1}}{n^2}$ の和を誤差 $0.01$ 以下で近似するには、何項まで足せば十分か答えよ。`, hint: R`$|S-S_n|\le b_{n+1}=\frac1{(n+1)^2}$。`, answer: R`$|S-S_n|\le\frac1{(n+1)^2}\le0.01\iff(n+1)^2\ge100\iff n\ge9$。よって $9$ 項（$S_9$）まで足せば十分である。`, space: 4 },
    ],
  });
})();
