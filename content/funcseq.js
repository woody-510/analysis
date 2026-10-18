/* 第 7 章：関数列とべき級数 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'uniform-convergence',
    title: '関数列の一様収束',
    sub: '各点収束との違い・極限の交換',
    yomi: 'かんすうれつのいちようしゅうそく',
    aliases: ['一様収束', 'いちようしゅうそく', '各点収束', 'かくてんしゅうそく', '関数列', 'かんすうれつ', '項別積分', 'こうべつせきぶん', '項別微分', 'こうべつびぶん', '極限の交換', 'きょくげんのこうかん', '一様コーシー'],
    kind: '用語',
    field: '関数列',
    grade: '1年後期',
    importance: 3,
    prereq: ['sequence-convergence', 'continuity', 'fundamental-theorem', 'cauchy-sequence'],
    related: ['function-series', 'power-series', 'banach-space'],
    notation: [
      R`$I\subset\mathbb{R}$：区間。<b>関数列</b> $\{f_n\}_{n\in\mathbb{N}}$：各 $n\in\mathbb{N}$ に関数 $f_n:I\to\mathbb{R}$ を一つずつ対応させたもの。`,
      R`$f:I\to\mathbb{R}$：極限の候補となる関数。`,
      R`$N=N(\varepsilon,x)$：各点収束の番号。$\varepsilon>0$ と点 $x\in I$ の両方に依存してよい。$N=N(\varepsilon)$：一様収束の番号。$x$ によらない。`,
      R`$\|g\|_\infty:=\sup_{x\in I}|g(x)|\in[0,\infty]$：$g:I\to\mathbb{R}$ の<b>上限ノルム</b>（$g$ が有界でなければ $+\infty$）。のちに[[normed-space|ノルム空間]]の代表例になる。`,
    ],
    synopsis: R`関数列 $f_n$ が $f$ に近づく、には二つの意味がある。各点 $x$ ごとに $f_n(x)\to f(x)$ となる「各点収束」と、区間全体で一斉に $\sup_x|f_n(x)-f(x)|\to0$ となる「一様収束」である。連続性・積分・微分といった極限操作を入れかえてよいのは、一様収束のときである。`,
    body: [
      { t: 'h2', id: 'def', text: '各点収束と一様収束' },
      { t: 'def', id: 'def-pointwise', title: '各点収束', yomi: 'かくてんしゅうそく', imp: 3, text: R`関数列 $f_n:I\to\mathbb{R}$（$n\in\mathbb{N}$）が $f:I\to\mathbb{R}$ に<b class="term">各点収束</b>するとは、各 $x\in I$ について実数列 $\{f_n(x)\}_n$ が $f(x)$ に収束すること、すなわち
$$\forall x\in I,\ \forall\varepsilon>0,\ \exists N=N(\varepsilon,x)\in\mathbb{N}\ \text{ s.t. }\ \forall n\ge N,\quad|f_n(x)-f(x)|<\varepsilon.$$` },
      { t: 'def', id: 'def-uniform', title: '一様収束', yomi: 'いちようしゅうそく', imp: 3, text: R`関数列 $f_n:I\to\mathbb{R}$ が $f:I\to\mathbb{R}$ に $I$ 上で<b class="term">一様収束</b>するとは、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall n\ge N,\ \forall x\in I,\quad|f_n(x)-f(x)|<\varepsilon \tag{#}$$
が成り立つことをいう。` },
      { t: 'note', title: '違いは「N が x によるかどうか」', text: R`各点収束では、点 $x$ を決めてから $N$ を選ぶので $N=N(\varepsilon,x)$。一様収束では、$N$ を選んでから $x$ が動くので、一つの $N=N(\varepsilon)$ が区間のすべての点で同時に使えなければならない。[[uniform-continuity|一様連続]]と連続の関係と同じ構造である。一様収束すれば各点収束する（(#) で $x$ を固定すればよい）。` },
      { t: 'prop', id: 'prop-unif-sup', title: '一様収束は上限ノルムの収束', yomi: 'いちようしゅうそくとじょうげんのるむ', imp: 3, text: R`$f_n,f:I\to\mathbb{R}$ について、$f_n\to f$ が $I$ 上で一様収束であることと、
$$\lim_{n\to\infty}\|f_n-f\|_\infty=\lim_{n\to\infty}\sup_{x\in I}|f_n(x)-f(x)|=0$$
（十分大きい $n$ で $\|f_n-f\|_\infty<\infty$ であることも含めて）は同値である。` },
      {
        t: 'proof',
        steps: [
          { text: R`(⇒) $\varepsilon>0$ をとり、(#) を $\frac\varepsilon2$ に対して使うと、$n\ge N$ ならすべての $x\in I$ で $|f_n(x)-f(x)|<\frac\varepsilon2$。$\frac\varepsilon2$ は集合 $\{|f_n(x)-f(x)|\mid x\in I\}$ の上界なので、上限はそれ以下：$\|f_n-f\|_\infty\le\frac\varepsilon2<\varepsilon$。` },
          { text: R`(⇐) $\varepsilon>0$ に対し、$n\ge N$ で $\|f_n-f\|_\infty<\varepsilon$ となる $N$ をとる。上限は各値以上なので、すべての $x\in I$ で $|f_n(x)-f(x)|\le\|f_n-f\|_\infty<\varepsilon$。` },
        ],
      },
      { t: 'fig', type: 'unif', preset: 'pow', editable: true, caption: R`黒い線が極限 $f$、紺の線が $f_n$、黄色の帯が $f\pm\varepsilon$。一様収束とは「十分大きい $n$ で $f_n$ のグラフ全体が帯に収まる」ことである。$x^n$ on $[0,1]$ では、$n$ をいくら大きくしても $x=1$ の近くで帯からはみ出す（赤い線が最大のずれ）。プリセットを $[0,0.9]$ に変えると、帯に収まるようになる。` },
      { t: 'ex', id: 'ex-xn', title: 'xⁿ：[0, 1] では一様収束しない', text: R`$f_n(x)=x^n$（$x\in[0,1]$）とすると、$0\le x<1$ では $x^n\to0$（[[series#lem-rn|補題]]）、$x=1$ では $1^n=1\to1$。よって各点収束の極限は $f(x)=0\ (0\le x<1)$、$f(1)=1$ である。
<br>一様収束しないこと：$x_n:=2^{-1/n}\in[0,1)$ とすると $f_n(x_n)-f(x_n)=\frac12$ なので $\|f_n-f\|_\infty\ge\frac12$。これは $0$ に収束しない。
<br>一方 $0<r<1$ として $[0,r]$ 上で考えると、$\|f_n-0\|_\infty=r^n\to0$ なので一様収束する。` },
      { t: 'ex', id: 'ex-bump', title: '山が動く例', text: R`$f_n(x)=\dfrac{nx}{1+n^2x^2}$（$x\in[0,1]$）とする。$x=0$ では $f_n(0)=0$、$x>0$ では $0\le f_n(x)\le\frac{nx}{n^2x^2}=\frac1{nx}\to0$ なので、$f_n\to0$ に各点収束する。しかし $f_n(\frac1n)=\frac12$ なので $\|f_n\|_\infty\ge\frac12$ で、一様収束しない。高さ $\frac12$ の山が $x=0$ に向かって動いていき、各点では山がいずれ通り過ぎるが、区間全体では山が消えない。` },

      { t: 'h2', id: 'cauchy', text: '一様コーシー条件' },
      { t: 'thm', id: 'thm-unif-cauchy', title: '一様収束のコーシーの判定法', yomi: 'いちようこーしー', imp: 3, text: R`関数列 $f_n:I\to\mathbb{R}$ について、次は同値である。
<ol><li>ある $f:I\to\mathbb{R}$ に $I$ 上で一様収束する。</li><li>（<b class="term">一様コーシー条件</b>）$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{s.t.}\ \forall m,n\ge N,\ \forall x\in I,\ |f_n(x)-f_m(x)|<\varepsilon$。</li></ol>` },
      {
        t: 'proof',
        sketch: R`(2)⇒(1) では、まず各点ごとに実数のコーシー列なので極限 $f(x)$ が決まる。次に、不等式 $|f_n(x)-f_m(x)|<\varepsilon$ で $m\to\infty$ とすれば、$|f_n(x)-f(x)|\le\varepsilon$ が<em>すべての $x$ で同じ $N$ について</em>得られる。この「極限をとってから一様性を確かめる」手順は、[[banach-space|バナッハ空間]]の完備性の証明の型そのものである。`,
        steps: [
          { text: R`(1)⇒(2)：$\varepsilon>0$ に対し、$n\ge N$ ですべての $x$ について $|f_n(x)-f(x)|<\frac\varepsilon2$ となる $N=N(\varepsilon)$ をとる。$m,n\ge N$ なら $|f_n(x)-f_m(x)|\le|f_n(x)-f(x)|+|f(x)-f_m(x)|<\varepsilon$。` },
          { text: R`(2)⇒(1)，<b>ステップ 1（極限の候補）</b>：各 $x\in I$ を固定すると、(2) より実数列 $\{f_n(x)\}_n$ は[[cauchy-sequence#def-cauchy|コーシー列]]なので、[[cauchy-sequence#thm-cauchy-conv|実数の完備性]]より収束する。その極限を $f(x)$ とおくと、関数 $f:I\to\mathbb{R}$ が定まり、$f_n\to f$ は各点収束である。` },
          { text: R`<b>ステップ 2（一様性）</b>：$\varepsilon>0$ をとり、(2) を $\frac\varepsilon2$ に対して使って $N=N(\varepsilon)$ を決める。$n\ge N$ と $x\in I$ を固定する。すべての $m\ge N$ で $|f_n(x)-f_m(x)|<\frac\varepsilon2$ であり、$m\to\infty$ とすると $f_m(x)\to f(x)$ なので、[[sequence-convergence#prop-order|極限と不等式]]（と絶対値の連続性）より $|f_n(x)-f(x)|\le\frac\varepsilon2<\varepsilon$。` },
          { text: R`$N$ は $\varepsilon$ だけで決めたもので、$x$ は任意だったので、$f_n\to f$ は $I$ 上で一様収束である。` },
        ],
      },
      { t: 'rem', title: '「m → ∞ で < が ≤ になる」', text: R`ステップ 2 で $|f_n(x)-f_m(x)|<\frac\varepsilon2$ から極限をとると、厳密な不等号は $\le$ に弱まる（[[sequence-convergence#prop-order|極限は等号を含む不等式しか保たない]]）。それを見越して、最初に $\frac\varepsilon2$ を使っておくのが定石である。` },

      { t: 'h2', id: 'cont', text: '極限関数の連続性' },
      { t: 'thm', id: 'thm-unif-cont', title: '一様収束の極限は連続', yomi: 'いちようしゅうそくのきょくげんはれんぞく', imp: 3, text: R`各 $n\in\mathbb{N}$ で $f_n\in C(I)$ とし、$f_n\to f$ が $I$ 上で一様収束するならば、$f\in C(I)$。` },
      { t: 'strategy', text: R`「$\varepsilon/3$ 論法」。$|f(x)-f(a)|$ を、$f$ と $f_N$ のずれ（一様収束で小さい）、$f_N$ の変化（$f_N$ の連続性で小さい）、$f_N$ と $f$ のずれ（一様収束で小さい）の三つに分ける。最初と最後のずれを、点 $x$ によらず同時に小さくできるのが一様収束の力である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$a\in I$、$\varepsilon>0$ を任意にとる。一様収束より、ある $N\in\mathbb{N}$ があって、すべての $x\in I$ で $|f_N(x)-f(x)|<\frac\varepsilon3$（$n=N$ の場合だけ使う）。` },
          { text: R`$f_N$ は $a$ で連続なので、ある $\delta=\delta(\varepsilon,a)>0$ があって、$x\in I$, $|x-a|<\delta$ ならば $|f_N(x)-f_N(a)|<\frac\varepsilon3$。` },
          {
            text: R`$x\in I$, $|x-a|<\delta$ のとき、`,
            eqs: [
              [R`|f(x)-f(a)|\le|f(x)-f_N(x)|+|f_N(x)-f_N(a)|+|f_N(a)-f(a)|`, R`三角不等式（2 回）`],
              [R`\phantom{|f(x)-f(a)|}<\frac\varepsilon3+\frac\varepsilon3+\frac\varepsilon3=\varepsilon.`, R`一様収束（$x$ と $a$ の両方で）・$f_N$ の連続性`],
            ],
          },
          { text: R`よって $f$ は $a$ で連続。$a\in I$ は任意なので $f\in C(I)$。` },
        ],
      },
      { t: 'cor', id: 'cor-xn-not-unif', title: 'xⁿ が [0, 1] で一様収束しないことの別証', yomi: 'xのnじょう', imp: 1, text: R`$f_n(x)=x^n$ はすべて $C([0,1])$ に属するが、各点極限 $f$ は $x=1$ で不連続である。もし一様収束すれば定理より $f$ は連続になるはずなので、一様収束しない。` },
      { t: 'qa', q: R`各点収束の極限が連続なら、一様収束している？`, a: R`そうとは限らない。[[uniform-convergence#ex-bump|山が動く例]]では、極限 $0$ は連続だが一様収束しない。ただし $I$ が有界閉区間で、$f_n$ が単調（各 $x$ で $n$ について増加）かつ $f_n,f$ が連続なら一様収束する（ディニの定理）。` },

      { t: 'h2', id: 'int', text: '項別積分' },
      { t: 'thm', id: 'thm-unif-int', title: '一様収束なら積分と極限を交換できる', yomi: 'こうべつせきぶん', imp: 3, text: R`$a<b$ とし、各 $n$ で $f_n\in C([a,b])$、$f_n\to f$ が $[a,b]$ 上で一様収束するならば、$f\in C([a,b])$ であり
$$\lim_{n\to\infty}\int_a^bf_n(x)\,dx=\int_a^b\lim_{n\to\infty}f_n(x)\,dx=\int_a^bf(x)\,dx.$$
さらに、$x\in[a,b]$ について $\int_a^xf_n\to\int_a^xf$ は $[a,b]$ 上で一様収束である。` },
      {
        t: 'proof',
        steps: [
          { text: R`[[uniform-convergence#thm-unif-cont|前の定理]]より $f\in C([a,b])$ なので、$f$ も $f_n-f$ も積分可能。` },
          {
            text: R`$x\in[a,b]$ について、[[integral-properties#thm-int-abs|積分の三角不等式]]より`,
            eqs: [[R`\Bigl|\int_a^xf_n-\int_a^xf\Bigr|=\Bigl|\int_a^x(f_n-f)\Bigr|\le\int_a^x|f_n-f|\le(x-a)\|f_n-f\|_\infty\le(b-a)\|f_n-f\|_\infty.`, R`線形性・三角不等式・$|f_n-f|\le\|f_n-f\|_\infty$`]],
          },
          { text: R`右辺は $x$ によらず、[[uniform-convergence#prop-unif-sup|命題]]より $n\to\infty$ で $0$ に収束する。よって $\int_a^xf_n\to\int_a^xf$ は一様収束であり、特に $x=b$ とすれば主張の等式を得る。` },
        ],
      },
      { t: 'ex', id: 'ex-tent', title: '各点収束だけでは積分と極限を交換できない', text: R`$n\ge2$ について、$f_n:[0,1]\to\mathbb{R}$ を、点 $(0,0)$, $(\frac1n,n)$, $(\frac2n,0)$ を結ぶ折れ線、$[\frac2n,1]$ では $0$ とする（高さ $n$、底辺 $\frac2n$ の三角形の山）。各 $x\in[0,1]$ で $f_n(x)\to0$（$x>0$ なら $\frac2n<x$ となる $n$ から先は $0$、$x=0$ ではつねに $0$）。しかし $\int_0^1f_n=\frac12\cdot\frac2n\cdot n=1$ なので
$$\lim_{n\to\infty}\int_0^1f_n=1\ne0=\int_0^1\lim_{n\to\infty}f_n.$$
$\|f_n\|_\infty=n\to\infty$ なので、もちろん一様収束していない。` },
      { t: 'fig', type: 'unif', preset: 'tent', caption: R`面積 $1$ の山が、細く高くなりながら $x=0$ に押しつぶされていく。各点では $0$ に収束するが、面積は $1$ のまま消えない。` },

      { t: 'h2', id: 'diff', text: '項別微分' },
      { t: 'thm', id: 'thm-unif-diff', title: '導関数が一様収束すれば微分と極限を交換できる', yomi: 'こうべつびぶん', imp: 3, text: R`$a<b$ とし、各 $n$ で $f_n\in C^1([a,b])$ とする。次の 2 条件を仮定する。
<ol><li>ある $x_0\in[a,b]$ で、実数列 $\{f_n(x_0)\}$ が収束する。</li><li>導関数の列 $\{f_n'\}$ がある $g:[a,b]\to\mathbb{R}$ に $[a,b]$ 上で一様収束する。</li></ol>このとき $\{f_n\}$ はある $f\in C^1([a,b])$ に $[a,b]$ 上で一様収束し、$f'=g$。すなわち $\displaystyle\Bigl(\lim_{n\to\infty}f_n\Bigr)'=\lim_{n\to\infty}f_n'$。` },
      {
        t: 'proof',
        steps: [
          { text: R`$c:=\lim f_n(x_0)$ とおく。[[uniform-convergence#thm-unif-cont|定理]]より $g\in C([a,b])$。[[fundamental-theorem#thm-ftc2|基本定理 (II)]]より、各 $n$ と $x\in[a,b]$ で $f_n(x)=f_n(x_0)+\int_{x_0}^xf_n'$。` },
          { text: R`$f(x):=c+\int_{x_0}^xg$ とおく。$x\in[a,b]$ について $|f_n(x)-f(x)|\le|f_n(x_0)-c|+\left|\int_{x_0}^x(f_n'-g)\right|\le|f_n(x_0)-c|+(b-a)\|f_n'-g\|_\infty$。右辺は $x$ によらず $0$ に収束するので、$f_n\to f$ は一様収束。` },
          { text: R`$g$ は連続なので、[[fundamental-theorem#thm-ftc1|基本定理 (I)]]より $f$ は微分可能で $f'=g\in C([a,b])$。よって $f\in C^1([a,b])$。` },
        ],
      },
      { t: 'rem', title: 'f_n の一様収束だけでは足りない', text: R`$f_n(x)=\dfrac{\sin(nx)}n$ は $\|f_n\|_\infty\le\frac1n\to0$ で $\mathbb{R}$ 上 $0$ に一様収束するが、$f_n'(x)=\cos(nx)$ は（$x=0$ を除いて）収束しない。また $f_n(x)=\sqrt{x^2+\frac1n}$ は $C^1$ 級で $|x|$ に一様収束する（$0\le f_n(x)-|x|=\frac{1/n}{f_n(x)+|x|}\le\frac1{\sqrt n}$）が、極限 $|x|$ は $x=0$ で微分可能でない。微分は「関数の細かい振動」に敏感なので、導関数の側の一様収束が必要になる。` },
      { t: 'fig', type: 'unif', preset: 'absx', caption: R`$\sqrt{x^2+1/n}$ はなめらかな関数だが、一様収束の極限 $|x|$ は角をもつ。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$f_n(x)=\dfrac{x}{1+nx^2}$（$x\in\mathbb{R}$）は $\mathbb{R}$ 上で $0$ に一様収束することを示せ。`, hint: R`相加相乗平均 $1+nx^2\ge2\sqrt n\,|x|$。`, answer: R`$1+nx^2\ge2\sqrt n|x|$（相加相乗平均、または $(1-\sqrt n|x|)^2\ge0$）より、$x\ne0$ で $|f_n(x)|\le\frac{|x|}{2\sqrt n|x|}=\frac1{2\sqrt n}$、$x=0$ でも成り立つ。よって $\|f_n\|_\infty\le\frac1{2\sqrt n}\to0$ で、一様収束する。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$f_n(x)=nx(1-x)^n$（$x\in[0,1]$）の各点極限を求め、$[0,1]$ 上で一様収束するか判定せよ。`, hint: R`$f_n(\frac1{n+1})$ を調べる。$(1-\frac1{n+1})^n\to\frac1e$。`, answer: R`$x=0,1$ では $f_n(x)=0$。$0<x<1$ では $r=1-x\in(0,1)$ について $nr^n\to0$（比判定法の考え：$\frac{(n+1)r^{n+1}}{nr^n}\to r<1$ より $\sum nr^n$ は収束し、項は $0$ に収束する）。よって各点極限は $0$。一方 $f_n(\frac1{n+1})=\frac n{n+1}\left(\frac n{n+1}\right)^n=\left(1-\frac1{n+1}\right)^{n+1}\to\frac1e$ なので $\|f_n\|_\infty\not\to0$、一様収束しない。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'function-series',
    title: '関数項級数とワイエルシュトラスの M 判定法',
    sub: '関数の無限和',
    yomi: 'かんすうこうきゅうすう',
    aliases: ['関数項級数', 'かんすうこうきゅうすう', 'M判定法', 'えむはんていほう', 'ワイエルシュトラスのM判定法', 'わいえるしゅとらす', '優級数', 'ゆうきゅうすう'],
    kind: '定理',
    field: '関数列',
    grade: '1年後期',
    importance: 3,
    prereq: ['uniform-convergence', 'series', 'absolute-convergence'],
    related: ['power-series', 'fourier-series', 'banach-space'],
    notation: [
      R`$I\subset\mathbb{R}$：区間。$u_k:I\to\mathbb{R}$（$k\in\mathbb{N}$）：関数の列。`,
      R`部分和 $s_n(x):=\sum_{k=1}^nu_k(x)$（$n\in\mathbb{N}$, $x\in I$）。$s_n:I\to\mathbb{R}$ は関数列。`,
      R`$\sum_{k=1}^\infty u_k$ が $I$ 上で一様収束する $:\Longleftrightarrow$ 部分和 $\{s_n\}$ が $I$ 上で一様収束する。`,
      R`$M_k\ge0$：実数の列（優級数）。`,
    ],
    synopsis: R`関数の無限和 $\sum u_k(x)$ は、部分和という関数列の極限として扱う。各項が $|u_k(x)|\le M_k$ と $x$ によらない数で抑えられ、$\sum M_k<\infty$ ならば、級数は一様に（しかも絶対に）収束する。これがワイエルシュトラスの M 判定法で、べき級数・フーリエ級数の扱いの基本道具である。`,
    body: [
      { t: 'h2', id: 'mtest', text: 'M 判定法' },
      { t: 'thm', id: 'thm-mtest', title: 'ワイエルシュトラスの M 判定法', yomi: 'わいえるしゅとらすのえむはんていほう', imp: 3, text: R`$u_k:I\to\mathbb{R}$（$k\in\mathbb{N}$）と、実数列 $\{M_k\}$ が、すべての $k\in\mathbb{N}$ と $x\in I$ について $|u_k(x)|\le M_k$ をみたし、$\sum_{k=1}^\infty M_k<\infty$ とする。このとき $\sum_{k=1}^\infty u_k$ は $I$ 上で一様収束し、各 $x\in I$ で絶対収束する。` },
      {
        t: 'proof',
        steps: [
          { text: R`各 $x$ での絶対収束：$|u_k(x)|\le M_k$ と[[series-tests#thm-comparison|比較判定法]]より $\sum_k|u_k(x)|$ は収束する。` },
          { text: R`一様収束：[[uniform-convergence#thm-unif-cauchy|一様コーシー条件]]を確かめる。$\varepsilon>0$ をとる。$\sum M_k$ は収束するので、[[series#thm-cauchy-series|級数のコーシーの判定法]]より、ある $N=N(\varepsilon)\in\mathbb{N}$ があって $n>m\ge N$ なら $\sum_{k=m+1}^nM_k<\varepsilon$。` },
          {
            text: R`このとき、すべての $x\in I$ について`,
            eqs: [[R`|s_n(x)-s_m(x)|=\Bigl|\sum_{k=m+1}^nu_k(x)\Bigr|\le\sum_{k=m+1}^n|u_k(x)|\le\sum_{k=m+1}^nM_k<\varepsilon.`, R`有限和の三角不等式・仮定`]],
          },
          { text: R`$N$ は $x$ によらないので、部分和 $\{s_n\}$ は一様コーシー条件をみたし、一様収束する。` },
        ],
      },
      { t: 'cor', id: 'cor-series-cont', title: '一様収束する級数の和の連続性と項別積分', yomi: 'きゅうすうのわのれんぞくせい', imp: 3, text: R`各 $u_k\in C([a,b])$ で、$\sum u_k$ が $[a,b]$ 上で一様収束するならば、和 $s(x):=\sum_{k=1}^\infty u_k(x)$ は $C([a,b])$ に属し、
$$\int_a^b\sum_{k=1}^\infty u_k(x)\,dx=\sum_{k=1}^\infty\int_a^bu_k(x)\,dx.$$` },
      { t: 'proof', steps: [{ text: R`部分和 $s_n$ は連続関数の有限和なので $C([a,b])$ に属し、$s_n\to s$ は一様収束。[[uniform-convergence#thm-unif-cont|連続性の定理]]より $s\in C([a,b])$。[[uniform-convergence#thm-unif-int|項別積分の定理]]より $\int s_n\to\int s$。左辺は線形性より $\sum_{k=1}^n\int u_k$ なので、右辺の級数が収束してその和が $\int s$ に等しい。` }] },
      { t: 'ex', id: 'ex-mtest', title: 'Σ sin(kx)/k² は連続関数', text: R`$u_k(x)=\dfrac{\sin(kx)}{k^2}$（$x\in\mathbb{R}$）とすると $|u_k(x)|\le\frac1{k^2}=:M_k$ で、$\sum\frac1{k^2}<\infty$（[[series-tests#ex-inv-sq|例]]）。M 判定法より $\sum u_k$ は $\mathbb{R}$ 上（どの有界閉区間上でも）一様収束し、その和は連続関数である。一方、項別に微分した $\sum\frac{\cos(kx)}k$ は $x=0$ で調和級数になり発散する。` },
      { t: 'rem', title: 'いたるところ微分できない連続関数', text: R`$0<a<1$、$b$ を正の奇数で $ab>1+\frac32\pi$ とすると、$W(x):=\sum_{k=0}^\infty a^k\cos(b^k\pi x)$ は M 判定法（$M_k=a^k$）より $\mathbb{R}$ 上の連続関数だが、どの点でも微分可能でない（ワイエルシュトラス関数。証明は長いのでここでは主張のみ）。「連続」と「微分可能」の差がいかに大きいかを示す例である。` },
      { t: 'qa', q: R`M 判定法が使えなければ、一様収束しない？`, a: R`そうとは限らない。M 判定法は十分条件にすぎない。たとえば $\sum_{k=1}^\infty\frac{(-1)^{k+1}}k\cdot\frac1{1+x^2}$ は $|u_k|$ の上限が $\frac1k$ で $\sum\frac1k=\infty$ だが、$\frac1{1+x^2}\cdot\log2$ に一様収束する（[[absolute-convergence#thm-leibniz|ライプニッツの誤差評価]]から $|s(x)-s_n(x)|\le\frac1{n+1}$）。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\sum_{k=1}^\infty\dfrac{x^k}{k^2}$ は $[-1,1]$ 上で一様収束することを示せ。`, hint: R`$|x|\le1$ なら $\left|\frac{x^k}{k^2}\right|\le\frac1{k^2}$。`, answer: R`$x\in[-1,1]$ なら $\left|\frac{x^k}{k^2}\right|\le\frac1{k^2}=:M_k$、$\sum M_k<\infty$。M 判定法より一様収束する。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\displaystyle\int_0^\pi\sum_{k=1}^\infty\frac{\sin(kx)}{k^3}\,dx$ を級数で表せ。`, hint: R`M 判定法で一様収束を確かめてから項別積分。$\int_0^\pi\sin(kx)\,dx=\frac{1-(-1)^k}k$。`, answer: R`$\left|\frac{\sin(kx)}{k^3}\right|\le\frac1{k^3}$ で $\sum\frac1{k^3}<\infty$ なので一様収束し、項別積分できる。$\int_0^\pi\sin(kx)dx=\frac{1-(-1)^k}k$ なので、値は $\sum_{k=1}^\infty\frac{1-(-1)^k}{k^4}=\sum_{j=1}^\infty\frac2{(2j-1)^4}$（奇数の $k=2j-1$ だけが残る）。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'power-series',
    title: 'べき級数と収束半径',
    sub: '指数関数の定義まで',
    yomi: 'べききゅうすう',
    aliases: ['べき級数', 'べききゅうすう', '冪級数', '整級数', 'せいきゅうすう', '収束半径', 'しゅうそくはんけい', 'アーベルの補題', 'あーべる', '指数関数', 'しすうかんすう', 'exp', '対数関数', 'たいすうかんすう', 'テイラー展開', 'ていらーてんかい'],
    kind: '定理',
    field: '関数列',
    grade: '1年後期',
    importance: 3,
    prereq: ['function-series', 'uniform-convergence', 'series-tests'],
    related: ['fourier-series', 'improper-integral', 'neumann-series'],
    notation: [
      R`$\{a_n\}_{n\ge0}$：実数列（係数）。<b>べき級数</b> $\sum_{n=0}^\infty a_nx^n$（$x\in\mathbb{R}$）。$x^0:=1$（$x=0$ でも）。`,
      R`$R\in[0,\infty]$：収束半径。$[0,\infty]=[0,\infty)\cup\{\infty\}$ で、$\infty$ は「どんな実数よりも大きい」という記号（実数ではない）。$\frac1\infty:=0$、$\frac10:=\infty$ と約束する。`,
      R`$(-R,R)$：$R=\infty$ なら $\mathbb{R}$ 全体、$R=0$ なら空集合。`,
      R`$n!:=1\cdot2\cdots n$、$0!:=1$。`,
    ],
    synopsis: R`べき級数 $\sum a_nx^n$ は、ある数 $R$（収束半径）を境に、$|x|<R$ では絶対収束し、$|x|>R$ では発散する。$|x|<R$ では項別に微分・積分でき、和はなめらかな関数になる。この性質を使って、指数関数 $\exp x=\sum\frac{x^n}{n!}$ を定義し、$\exp'=\exp$ や指数法則を証明する。`,
    body: [
      { t: 'h2', id: 'radius', text: '収束半径' },
      { t: 'lem', id: 'lem-abel', title: 'アーベルの補題', yomi: 'あーべるのほだい', imp: 3, text: R`$x_0\in\mathbb{R}$, $x_0\ne0$ で $\sum_{n=0}^\infty a_nx_0^n$ が収束するとする。このとき $0<r<|x_0|$ をみたす任意の $r$ について、$\sum a_nx^n$ は $[-r,r]$ 上で一様かつ絶対収束する。特に $|x|<|x_0|$ をみたす任意の $x$ で絶対収束する。` },
      {
        t: 'proof',
        steps: [
          { text: R`$\sum a_nx_0^n$ が収束するので[[series#thm-term|項は 0 に収束]]し、[[sequence-convergence#prop-bdd|収束列は有界]]なので、ある $K>0$ があってすべての $n$ で $|a_nx_0^n|\le K$。` },
          {
            text: R`$q:=\dfrac r{|x_0|}\in(0,1)$ とおく。$x\in[-r,r]$ なら`,
            eqs: [[R`|a_nx^n|=|a_nx_0^n|\Bigl|\frac x{x_0}\Bigr|^n\le Kq^n=:M_n.`, R`$|x|\le r$`]],
          },
          { text: R`$\sum Kq^n$ は収束する等比級数（$0<q<1$）なので、[[function-series#thm-mtest|M 判定法]]より $[-r,r]$ 上で一様かつ絶対収束する。$|x|<|x_0|$ なら $|x|<r<|x_0|$ となる $r$（たとえば $r=\frac{|x|+|x_0|}2$）をとればよい。` },
        ],
      },
      { t: 'def', id: 'def-radius', title: '収束半径', yomi: 'しゅうそくはんけい', imp: 3, text: R`べき級数 $\sum_{n=0}^\infty a_nx^n$ の<b class="term">収束半径</b>を
$$R:=\sup\Bigl\{|x|\ \Bigm|\ x\in\mathbb{R},\ \sum_{n=0}^\infty a_nx^n\ \text{が収束する}\Bigr\}\in[0,\infty]$$
と定める（集合が上に有界でなければ $R:=\infty$）。$x=0$ ではつねに収束するので、この集合は空でない。` },
      { t: 'thm', id: 'thm-radius', title: '収束半径の意味', yomi: 'しゅうそくはんけいのいみ', imp: 3, text: R`べき級数 $\sum a_nx^n$ の収束半径を $R$ とする。
<ol><li>$|x|<R$ ならば $\sum a_nx^n$ は絶対収束する。さらに $0<r<R$ なら $[-r,r]$ 上で一様収束する。</li><li>$|x|>R$ ならば $\sum a_nx^n$ は発散する。</li></ol>（$|x|=R$ では、収束も発散もありうる。）` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $0<r<R$ とする（$|x|<R$ なら $|x|<r<R$ となる $r$ がとれる）。$R$ は上限なので、[[supremum#prop-sup-eps|上限の特徴づけ]]（$R=\infty$ なら非有界性）より、$\sum a_nx_0^n$ が収束して $|x_0|>r$ となる $x_0$ がある。[[power-series#lem-abel|アーベルの補題]]より $[-r,r]$ 上で一様かつ絶対収束する。` },
          { text: R`(2) $|x|>R$ で $\sum a_nx^n$ が収束したとすると、$|x|$ は収束半径の定義の集合に属するので $|x|\le R$ となり矛盾する。` },
        ],
      },
      { t: 'prop', id: 'prop-ratio-radius', title: '比による収束半径の計算', yomi: 'ひによるしゅうそくはんけい', imp: 2, text: R`すべての $n$ で $a_n\ne0$ とし、$\displaystyle L:=\lim_{n\to\infty}\Bigl|\frac{a_{n+1}}{a_n}\Bigr|$ が $[0,\infty)$ に存在するか、$+\infty$ に発散するとする。このとき収束半径は $R=\frac1L$（$L=0$ なら $R=\infty$、$L=\infty$ なら $R=0$）。` },
      { t: 'proof', steps: [{ text: R`$x\ne0$ を固定すると $\left|\frac{a_{n+1}x^{n+1}}{a_nx^n}\right|\to L|x|$。$L|x|<1$ なら[[series-tests#cor-ratio-lim|比判定法]]より $\sum|a_nx^n|$ は収束（したがって $\sum a_nx^n$ も収束）。$L|x|>1$ なら、十分先で $|a_{n+1}x^{n+1}|>|a_nx^n|$ となり項が $0$ に収束しないので発散。よって $|x|<\frac1L$ では収束、$|x|>\frac1L$ では発散し、$R=\frac1L$。（$L=\infty$ なら $x\ne0$ でつねに発散。）` }] },
      { t: 'ex', id: 'ex-radius', title: '収束半径の例', text: R`<ol><li>$\sum_{n=0}^\infty x^n$：$R=1$。$x=\pm1$ ではどちらも発散。</li><li>$\sum_{n=1}^\infty\frac{x^n}n$：$\left|\frac{a_{n+1}}{a_n}\right|=\frac n{n+1}\to1$ で $R=1$。$x=1$ では調和級数で発散、$x=-1$ では交代級数で収束。</li><li>$\sum_{n=0}^\infty\frac{x^n}{n!}$：$\frac{n!}{(n+1)!}=\frac1{n+1}\to0$ で $R=\infty$。</li><li>$\sum_{n=0}^\infty n!\,x^n$：$\frac{(n+1)!}{n!}=n+1\to\infty$ で $R=0$（$x=0$ でしか収束しない）。</li></ol>` },

      { t: 'h2', id: 'termwise', text: '項別微分・項別積分' },
      { t: 'lem', id: 'lem-deriv-radius', title: '項別微分した級数も同じ範囲で収束する', yomi: 'こうべつびぶんのしゅうそくはんけい', imp: 2, text: R`$\sum_{n=0}^\infty a_nx^n$ の収束半径を $R$ とすると、$|x|<R$ をみたす任意の $x$ で $\sum_{n=1}^\infty na_nx^{n-1}$ は絶対収束し、さらに $0<r<R$ なら $[-r,r]$ 上で一様収束する。` },
      {
        t: 'proof',
        steps: [
          { text: R`$0<r<R$ とし、$r<\rho<R$ をみたす $\rho$ をとる。$\sum a_n\rho^n$ は（$\rho<R$ より）収束するので、項は有界：$|a_n\rho^n|\le K$（$n\ge0$）。` },
          {
            text: R`$x\in[-r,r]$ と $n\ge1$ について、$q:=\frac r\rho\in(0,1)$ とおくと`,
            eqs: [[R`|na_nx^{n-1}|\le n|a_n|r^{n-1}=\frac n\rho\,|a_n\rho^n|\,q^{n-1}\le\frac K\rho\,nq^{n-1}=:M_n.`, R`$r^{n-1}=\rho^{n-1}q^{n-1}$`]],
          },
          { text: R`$\sum nq^{n-1}$ は、$\frac{(n+1)q^n}{nq^{n-1}}=\frac{n+1}nq\to q<1$ より[[series-tests#cor-ratio-lim|比判定法]]で収束する。[[function-series#thm-mtest|M 判定法]]より結論を得る。` },
        ],
      },
      { t: 'thm', id: 'thm-ps-diff', title: 'べき級数は収束円の内部で項別微分できる', yomi: 'べききゅうすうのこうべつびぶん', imp: 3, text: R`$\sum_{n=0}^\infty a_nx^n$ の収束半径を $R>0$ とし、$f(x):=\sum_{n=0}^\infty a_nx^n$（$|x|<R$）とおく。このとき $f$ は $(-R,R)$ 上で微分可能で
$$f'(x)=\sum_{n=1}^\infty na_nx^{n-1}\qquad(|x|<R).$$
これを繰り返せば $f$ は $(-R,R)$ 上で何回でも微分可能で、$a_n=\dfrac{f^{(n)}(0)}{n!}$。また $\int_0^xf=\sum_{n=0}^\infty\frac{a_n}{n+1}x^{n+1}$（$|x|<R$）。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x\in(-R,R)$ を固定し、$|x|<r<R$ となる $r$ をとる。$[-r,r]$ 上で部分和 $f_N(y):=\sum_{n=0}^Na_ny^n$ を考える。$f_N$ は多項式なので $C^1([-r,r])$ に属し、$f_N'(y)=\sum_{n=1}^Nna_ny^{n-1}$。` },
          { text: R`[[power-series#thm-radius|定理]]より $f_N\to f$ は $[-r,r]$ 上で各点収束（特に $y=0$ で収束）し、[[power-series#lem-deriv-radius|補題]]より $f_N'\to g:=\sum na_ny^{n-1}$ は $[-r,r]$ 上で一様収束する。[[uniform-convergence#thm-unif-diff|項別微分の定理]]より $f$ は $[-r,r]$ 上で微分可能で $f'=g$。$x$ は $(-r,r)$ の内点なので、$f'(x)=g(x)$ は通常の（両側の）微分係数である。` },
          { text: R`$f'$ もまた収束半径が $R$ 以上のべき級数なので、同じ議論を繰り返せる。$k$ 回微分すると $f^{(k)}(x)=\sum_{n\ge k}n(n-1)\cdots(n-k+1)a_nx^{n-k}$ で、$x=0$ を代入すると $n=k$ の項だけが残り $f^{(k)}(0)=k!\,a_k$。` },
          { text: R`積分：$[-r,r]$ 上の一様収束と[[uniform-convergence#thm-unif-int|項別積分]]より $\int_0^xf=\lim_N\sum_{n=0}^N\frac{a_n}{n+1}x^{n+1}$。` },
        ],
      },
      { t: 'crux', text: R`べき級数のよさは「収束円の内側のどんな閉区間 $[-r,r]$ でも一様収束する」ことにある。$(-R,R)$ 全体での一様収束は一般に成り立たない（$\sum x^n$ は $(-1,1)$ 上で一様収束しない）が、微分可能性は各点の近くだけの性質なので、各点を含む小さな閉区間で一様収束すれば十分なのである。` },

      { t: 'h2', id: 'exp', text: '指数関数の定義' },
      { t: 'def', id: 'def-exp', title: '指数関数', yomi: 'しすうかんすう', imp: 3, text: R`$x\in\mathbb{R}$ について
$$\exp x:=\sum_{n=0}^\infty\frac{x^n}{n!}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots$$
と定める（収束半径は $\infty$：[[power-series#ex-radius|例]] (3)）。$e:=\exp1$ とおく。` },
      { t: 'thm', id: 'thm-exp', title: '指数関数の基本性質', yomi: 'しすうかんすうのせいしつ', imp: 3, text: R`<ol><li>$\exp$ は $\mathbb{R}$ 上で微分可能で $\exp'=\exp$、$\exp0=1$。</li><li>（指数法則）すべての $x,y\in\mathbb{R}$ で $\exp(x+y)=\exp x\cdot\exp y$。</li><li>すべての $x$ で $\exp x>0$、$\exp(-x)=\dfrac1{\exp x}$。$\exp$ は狭義単調増加。</li><li>$n\in\mathbb{Z}$ について $\exp n=e^n$。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) [[power-series#thm-ps-diff|項別微分]]より $\exp'x=\sum_{n=1}^\infty\frac{nx^{n-1}}{n!}=\sum_{n=1}^\infty\frac{x^{n-1}}{(n-1)!}=\sum_{m=0}^\infty\frac{x^m}{m!}=\exp x$（$m=n-1$）。$\exp0=1$ は $x^0=1$ の項だけが残るから。` },
          { text: R`(2) $y$ を固定し、$g(x):=\exp(x+y)\exp(-x)$ とおく。積と合成の微分より $g'(x)=\exp(x+y)\exp(-x)-\exp(x+y)\exp(-x)=0$。[[mean-value#cor-const|平均値の定理の系]]より $g$ は定数で、$g(x)=g(0)=\exp y$。よって $\exp(x+y)\exp(-x)=\exp y$ ……(★)。` },
          { text: R`(★) で $y=0$ とすると $\exp x\cdot\exp(-x)=1$。よって $\exp x\ne0$ で $\exp(-x)=\frac1{\exp x}$。(★) の両辺に $\exp x$ を掛ければ $\exp(x+y)=\exp x\exp y$。` },
          { text: R`(3) $\exp$ は連続で $0$ にならず $\exp0=1>0$ なので、[[intermediate-value#thm-ivt|中間値の定理]]より $\exp x>0$ がすべての $x$ で成り立つ（負の値をとれば、その間で $0$ をとるはず）。$\exp'=\exp>0$ なので、[[mean-value#cor-incr|平均値の定理の系]]より狭義単調増加。` },
          { text: R`(4) 指数法則と帰納法で、$n\in\mathbb{N}$ について $\exp n=\exp(1)^n=e^n$。$\exp(-n)=\frac1{e^n}=e^{-n}$、$\exp0=1=e^0$。` },
        ],
      },
      { t: 'def', id: 'def-log', title: '対数関数と実数べき', yomi: 'たいすうかんすう', imp: 2, text: R`$\exp:\mathbb{R}\to(0,\infty)$ は狭義単調増加・連続で、値域は $(0,\infty)$ 全体である（$\exp n=e^n\to\infty$、$\exp(-n)\to0$ と中間値の定理）。その逆関数を $\log:(0,\infty)\to\mathbb{R}$ と書く。$a>0$, $p\in\mathbb{R}$ について $a^p:=\exp(p\log a)$ と定め、$e^x:=\exp x$ とも書く。` },
      { t: 'prop', id: 'prop-log-diff', title: '対数とべきの微分', yomi: 'たいすうのびぶん', imp: 2, text: R`$x>0$ について $(\log x)'=\dfrac1x$、$p\in\mathbb{R}$ について $(x^p)'=px^{p-1}$。` },
      { t: 'proof', steps: [{ text: R`[[derivative-rules#thm-inv-diff|逆関数の微分]]より、$y=\log x$（$x=\exp y$）で $(\log x)'=\frac1{\exp'y}=\frac1{\exp y}=\frac1x$（$\exp'=\exp>0$）。$x^p=\exp(p\log x)$ を合成関数の微分で微分すると $\exp(p\log x)\cdot\frac px=x^p\cdot\frac px=px^{p-1}$（$\frac1x=x^{-1}$ と指数法則 $x^px^{-1}=x^{p-1}$ を使った）。` }] },
      { t: 'rem', title: '三角関数も同じように定義できる', text: R`$\sin x:=\sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!}$、$\cos x:=\sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}$（収束半径 $\infty$）と定めると、項別微分から $\sin'=\cos$、$\cos'=-\sin$、そして $\sin^2+\cos^2=1$（微分すると $0$）が示せる。$\pi$ は「$\cos$ の最小の正の零点の 2 倍」として定義される。複素数 $z$ に対して $\exp z$ を同じ級数で定めると $e^{i\theta}=\cos\theta+i\sin\theta$（オイラーの公式）が得られ、これは[[fourier-series|フーリエ解析]]の出発点になる。` },
      { t: 'ex', id: 'ex-log-series', title: 'log(1 + x) と交代調和級数', text: R`$|x|<1$ について $\frac1{1+x}=\sum_{n=0}^\infty(-1)^nx^n$（等比級数）。両辺を $0$ から $x$ まで積分すると、項別積分より $\log(1+x)=\sum_{n=1}^\infty\frac{(-1)^{n+1}}nx^n$（$|x|<1$）。右辺は $x=1$ でも（交代級数として）収束し、その値が $\log2$ であること（アーベルの連続性定理）から、[[absolute-convergence#ex-alt-harm|交代調和級数]]の和が $\log2$ であることがわかる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\sum_{n=1}^\infty\dfrac{x^n}{n\,2^n}$ の収束半径を求めよ。`, hint: R`比 $\left|\frac{a_{n+1}}{a_n}\right|$。`, answer: R`$a_n=\frac1{n2^n}$ で $\left|\frac{a_{n+1}}{a_n}\right|=\frac{n}{2(n+1)}\to\frac12$。よって $R=2$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$|x|<1$ について $\displaystyle\sum_{n=1}^\infty nx^n=\frac{x}{(1-x)^2}$ を示せ。`, hint: R`$\sum_{n=0}^\infty x^n=\frac1{1-x}$ を項別微分して $x$ を掛ける。`, answer: R`$f(x)=\sum_{n=0}^\infty x^n=\frac1{1-x}$（$R=1$）。項別微分より $|x|<1$ で $\sum_{n=1}^\infty nx^{n-1}=f'(x)=\frac1{(1-x)^2}$。両辺に $x$ を掛ければよい。`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`$e$ は無理数であることを示せ。`, hint: R`$e=\frac pq$ と仮定し、$q!\left(e-\sum_{n=0}^q\frac1{n!}\right)$ を考える。これは正の整数のはずだが、$1$ より小さい。`, answer: R`$e=\frac pq$（$p,q\in\mathbb{N}$）と仮定する。$x:=q!\left(e-\sum_{n=0}^q\frac1{n!}\right)$ は、$q!e=(q-1)!p$ と $\frac{q!}{n!}$（$n\le q$）がすべて整数なので整数。一方 $x=\sum_{n=q+1}^\infty\frac{q!}{n!}$ は正で、$\frac{q!}{n!}\le\frac1{(q+1)^{n-q}}$ より $x\le\sum_{k=1}^\infty\frac1{(q+1)^k}=\frac1q\le1$、しかも $n=q+2$ の項で真の不等号になるので $0<x<1$。$0$ と $1$ の間に整数はないので矛盾。`, space: 9 },
    ],
  });
})();
