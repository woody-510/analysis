/* 第 12 章：バナッハ空間と不動点定理 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'banach-space',
    title: 'バナッハ空間',
    sub: 'コーシー列と完備性',
    yomi: 'ばなっはくうかん',
    aliases: ['バナッハ空間', 'ばなっはくうかん', 'Banach', '完備', 'かんび', '完備性', 'かんびせい', 'コーシー列', 'こーしーれつ', '絶対収束級数', 'C1級', 'C^1'],
    kind: '用語',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['normed-space', 'uniform-convergence', 'metric-space'],
    related: ['banach-fixed-point', 'sequence-spaces', 'hilbert-space', 'operator-norm'],
    notation: [
      R`$X$：ノルム空間（[[normed-space|第 11 章]]）。$\{f_k\}\subset X$：$X$ の点列。$f_k,f_l$ の $k,l\in\mathbb{N}$ は番号。`,
      R`$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon>0$ に応じて決まる番号。各点ごとの番号は $N_1=N_1(x)$ のように依存する変数を書く。`,
      R`$\{f_k\}$（関数の列）と $\{f_k(x)\}$（$x$ を固定した数の列）は別物。`,
      R`$C^1(I):=\{f\in C(I)\mid f'\in C(I)\}$（$I=[a,b]$、端点では片側微分）、$\|f\|_{C^1(I)}:=\|f\|_{C(I)}+\|f'\|_{C(I)}$。`,
      R`$\sum_{n=1}^\infty x_n$（$x_n\in X$）：部分和 $s_n:=\sum_{k=1}^nx_k\in X$ のノルム収束の極限。`,
    ],
    synopsis: R`ノルム空間のコーシー列（項どうしが近づき合う点列）が、必ず空間の中に極限をもつとき、その空間を完備といい、完備なノルム空間をバナッハ空間という。$\mathbb{K}^n$ や最大値ノルムの $C([a,b])$ はバナッハ空間だが、同じ $C([a,b])$ でも積分ノルムでは完備でない。完備性は「行き先がわからなくても極限の存在が保証される」性質で、不動点定理やノイマン級数の土台になる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-banach-cauchy', title: 'コーシー列', yomi: 'こーしーれつ', imp: 3, text: R`ノルム空間 $X$ の点列 $\{f_k\}$ が<b class="term">コーシー列</b>であるとは、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall k,l\ge N,\quad\|f_k-f_l\|_X<\varepsilon$$
が成り立つことをいう。` },
      { t: 'note', title: '収束との違い', text: R`[[normed-space#def-norm-conv|収束]]の定義には行き先 $f$ が出てくるが、コーシー列の定義には出てこない。「項どうしが近づき合う」ことだけを言っている。収束列はコーシー列である（$\|f_k-f_l\|\le\|f_k-f\|+\|f-f_l\|$。[[metric-space#prop-conv-cauchy-metric|距離空間の命題]]）が、逆は空間によっては成り立たない。` },
      { t: 'def', id: 'def-banach', title: '完備・バナッハ空間', yomi: 'ばなっはくうかん', imp: 3, text: R`ノルム空間 $X$ の任意のコーシー列が $X$ の中に極限点をもつとき、$X$ は<b class="term">完備</b>であるという。完備なノルム空間を<b class="term">バナッハ空間</b>という。` },
      { t: 'prop', id: 'prop-cauchy-bdd', title: 'コーシー列は有界', yomi: 'こーしーれつはゆうかい', imp: 1, text: R`ノルム空間のコーシー列 $\{f_k\}$ は有界である：ある $K>0$ ですべての $k$ について $\|f_k\|_X\le K$。` },
      { t: 'proof', steps: [{ text: R`$\varepsilon=1$ に対する $N$ をとると、$k\ge N$ で $\|f_k\|\le\|f_k-f_N\|+\|f_N\|<1+\|f_N\|$。$K:=\max\{\|f_1\|,\dots,\|f_{N-1}\|,1+\|f_N\|\}$ とおけばよい。` }] },

      { t: 'h2', id: 'examples', text: 'バナッハ空間の例' },
      { t: 'ex', id: 'ex-kn-banach', title: '𝕂ⁿ はバナッハ空間', text: R`[[cauchy-sequence#thm-cauchy-conv|実数の完備性]]と[[euclidean-space#thm-rn-complete|ℝⁿ の完備性]]より、$\mathbb{R}^n$ と（$\mathbb{R}^{2n}$ と同一視して）$\mathbb{C}^n$ はユークリッドノルムでバナッハ空間である。` },
      { t: 'thm', id: 'thm-fin-complete', title: '有限次元ノルム空間は完備', yomi: 'ゆうげんじげんはかんび', imp: 2, text: R`$\dim X=d<\infty$ のノルム空間 $X$ は完備である。特に、ノルム空間の有限次元部分空間は閉部分空間である。` },
      {
        t: 'proof',
        steps: [
          { text: R`基底 $e_1,\dots,e_d$ をとり、$f=\sum c_je_j$ に対して $\|f\|_0:=\max|c_j|$ とおく。[[normed-space#thm-equiv-fin|ノルムの同値性]]より $m\|f\|_0\le\|f\|_X$（$m>0$）。` },
          { text: R`$\{f_k\}$ をコーシー列とし、$f_k=\sum_jc^{(k)}_je_j$ と書く。$|c^{(k)}_j-c^{(l)}_j|\le\|f_k-f_l\|_0\le\frac1m\|f_k-f_l\|_X$ なので、各 $j$ で $\{c^{(k)}_j\}_k$ は $\mathbb{K}$ のコーシー列で、ある $c_j\in\mathbb{K}$ に収束する。` },
          { text: R`$f:=\sum_jc_je_j\in X$ とおくと、$\|f_k-f\|_X\le M\|f_k-f\|_0=M\max_j|c^{(k)}_j-c_j|\to0$（$M$ は同値性の上の定数。有限個の $j$ の最大値なので $0$ に収束する）。よって $X$ は完備。` },
          { text: R`後半：有限次元部分空間 $M\subset X$ は、$X$ のノルムを制限して完備なノルム空間になる。$M$ の点列が $X$ の $f$ に収束すれば、それは $M$ のコーシー列なので $M$ の中に極限 $g$ をもち、極限の一意性より $f=g\in M$。よって $M$ は閉集合。` },
        ],
      },
      { t: 'thm', id: 'thm-c-complete', title: 'C([a, b]) は最大値ノルムでバナッハ空間', yomi: 'しーえーびーのかんびせい', imp: 3, text: R`$a<b$、$I=[a,b]$ とする。$C(I)$ はノルム $\|f\|_{C(I)}=\max_{x\in I}|f(x)|$ に関してバナッハ空間である。` },
      { t: 'strategy', text: R`完備性の証明は、いつも次の 4 ステップの型で書く。① コーシー列をとる。② 各点（各成分）ごとに数のコーシー列になるので、極限の候補 $f$ を作る。③ コーシー列の不等式で極限をとり、「ノルムの意味で近い」ことを示す。④ 候補 $f$ が空間に属することを確かめる。$\ell^p$、作用素の空間 $L(X,Y)$、$C^1(I)$ でも同じ型が使われる。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>① コーシー列をとる。</b>$\{f_k\}\subset C(I)$ をコーシー列とする。任意の $\varepsilon>0$ に対して $N=N(\varepsilon)\in\mathbb{N}$ があって、$k,l\ge N$ ならば $\max_{x\in I}|f_k(x)-f_l(x)|<\frac\varepsilon2$。` },
          { text: R`<b>② 極限の候補。</b>$x\in I$ を固定すると $|f_k(x)-f_l(x)|\le\|f_k-f_l\|_{C(I)}$ なので、$k,l\ge N$ ならば $|f_k(x)-f_l(x)|<\frac\varepsilon2$ ……(★)。すなわち $\{f_k(x)\}_k$ は $\mathbb{K}$ のコーシー列で、$\mathbb{K}$ の完備性より収束する。その極限を $f(x)$ とおく。これで関数 $f:I\to\mathbb{K}$ が定まる。（この段階の収束は「$x$ ごとに番号 $N_1=N_1(x)$ がある」という各点収束の意味である。）` },
          { text: R`<b>③ ノルムの意味で近い。</b>$k\ge N$、$x\in I$ を固定する。(★) で $l\to\infty$ とすると、$f_l(x)\to f(x)$ と[[sequence-convergence#prop-order|極限と不等式]]より $|f_k(x)-f(x)|\le\frac\varepsilon2<\varepsilon$。この $N$ は $x$ によらないので、$k\ge N$ ならばすべての $x\in I$ で $|f_k(x)-f(x)|<\varepsilon$。` },
          { text: R`<b>④ 空間に属する。</b>③ は「連続関数列 $\{f_k\}$ が $f$ に一様収束する」ことを言っているので、[[uniform-convergence#thm-unif-cont|一様収束の極限は連続]]より $f\in C(I)$。さらに ③ より $k\ge N$ で $\|f_k-f\|_{C(I)}=\max_x|f_k(x)-f(x)|<\varepsilon$（最大値は ③ の不等式をみたす値のどれか）なので、$f_k\to f$ in $C(I)$。` },
        ],
      },
      { t: 'ex', id: 'ex-c-l1', title: '積分ノルムでは C([0, 1]) は完備でない', text: R`$I=[0,1]$、$\|f\|_{R^1(I)}=\int_0^1|f(x)|\,dx$ とする。$k\in\mathbb{N}$ について
$$f_k(x):=\begin{cases}1&(0\le x\le\frac12)\\-2kx+k+1&(\frac12\le x\le\frac12+\frac1{2k})\\0&(\frac12+\frac1{2k}\le x\le1)\end{cases}$$
とおく（$\frac12$ から幅 $\frac1{2k}$ で $1$ から $0$ に直線で下がる連続関数）。<br><b>コーシー列であること：</b>$k>l$ なら $0\le f_k\le f_l$ で、差は $[\frac12,\frac12+\frac1{2l}]$ の上だけにあるので、$\|f_k-f_l\|_{R^1}=\int(f_l-f_k)=\frac1{4l}-\frac1{4k}$（三角形の面積の差）$\le\frac1{4l}\to0$。<br><b>$C(I)$ に極限がないこと：</b>$g\in C(I)$ で $\|f_k-g\|_{R^1}\to0$ とすると、$\int_0^{1/2}|1-g|\le\|f_k-g\|_{R^1}\to0$ なので $\int_0^{1/2}|1-g|=0$、連続性より $[0,\frac12]$ で $g=1$（[[integral-properties#prob-1|非負連続関数の積分が 0 なら 0]]）。また $c\in(\frac12,1)$ について、$\frac12+\frac1{2k}<c$ となる $k$ では $\int_c^1|g|=\int_c^1|f_k-g|\le\|f_k-g\|_{R^1}\to0$ なので $[c,1]$ で $g=0$。$c$ は任意なので $(\frac12,1]$ で $g=0$。すると $g(\frac12)=1$ なのに $\lim_{x\to1/2+0}g(x)=0$ となり、$g$ の連続性に反する。（$f_k$ は不連続関数 $\chi_{[0,1/2]}$ に積分ノルムで近づいている。）` },
      { t: 'fig', type: 'plot', preset: 'ramps', caption: R`$f_1,f_2,f_4$ の模式図（実線・破線・太線）。坂の幅が $\frac1{2k}$ で細くなり、極限は $x=\frac12$ で跳ぶ関数になる。積分ノルムでの差（面積）は小さくなるのに、極限は連続関数の世界の外にある。` },
      { t: 'ex', id: 'ex-c1-banach', title: 'C¹([a, b]) はバナッハ空間', text: R`$\|f\|_{C^1(I)}=\|f\|_{C(I)}+\|f'\|_{C(I)}$ とする（ノルムの公理は各項の公理から）。$\{f_k\}$ を $C^1(I)$ のコーシー列とすると、$\|f_k-f_l\|_{C(I)}\le\|f_k-f_l\|_{C^1}$、$\|f_k'-f_l'\|_{C(I)}\le\|f_k-f_l\|_{C^1}$ より、$\{f_k\}$ と $\{f_k'\}$ はともに $C(I)$ のコーシー列で、[[banach-space#thm-c-complete|定理]]より $f_k\to f$、$f_k'\to g$ in $C(I)$。[[fundamental-theorem#thm-ftc2|微積分の基本定理]]より $f_k(x)=f_k(a)+\int_a^xf_k'$。$\left|\int_a^xf_k'-\int_a^xg\right|\le(b-a)\|f_k'-g\|_{C(I)}\to0$ なので、極限をとって $f(x)=f(a)+\int_a^xg$。$g$ は連続なので[[fundamental-theorem#thm-ftc1|基本定理 (I)]]より $f'=g$、すなわち $f\in C^1(I)$ で $\|f_k-f\|_{C^1}=\|f_k-f\|_C+\|f_k'-g\|_C\to0$。（これは[[uniform-convergence#thm-unif-diff|項別微分の定理]]の言いかえでもある。）` },
      { t: 'qa', q: R`$C^1([a,b])$ に最大値ノルム $\|f\|_{C(I)}$ だけを入れたら完備？`, a: R`完備でない。[[uniform-convergence#diff|例]] $\sqrt{x^2+\frac1k}$ は $C^1([-1,1])$ に属し、最大値ノルムで $|x|$ に収束するのでコーシー列だが、$|x|\notin C^1$。導関数まで測るノルムでないと、微分可能性は極限で保たれない。` },

      { t: 'h2', id: 'sub', text: '閉部分空間と完備性' },
      { t: 'prop', id: 'prop-closed-complete', title: '閉部分空間は完備、完備な部分空間は閉', yomi: 'へいぶぶんくうかんとかんび', imp: 2, text: R`$X$ をノルム空間、$M\subset X$ を部分空間とする（$M$ には $X$ のノルムを制限して入れる）。
<ol><li>$X$ がバナッハ空間で $M$ が閉部分空間ならば、$M$ はバナッハ空間である。</li><li>$M$ が完備ならば、$M$ は $X$ の閉部分空間である。</li></ol>` },
      { t: 'proof', steps: [{ text: R`(1) $M$ のコーシー列は $X$ のコーシー列なので $X$ の中に極限 $f$ をもつ。$M$ は閉集合なので[[closure#cor-closed-seq|点列による特徴づけ]]より $f\in M$。(2) $M$ の点列 $f_k$ が $f\in X$ に収束すれば、$\{f_k\}$ は $M$ のコーシー列なので $M$ の中に極限 $g$ をもつ。$X$ での極限の一意性より $f=g\in M$。よって $M$ は閉集合。` }] },

      { t: 'h2', id: 'series', text: 'バナッハ空間の級数' },
      { t: 'thm', id: 'thm-abs-series', title: '完備性の級数による特徴づけ', yomi: 'きゅうすうによるかんびせいのとくちょうづけ', imp: 3, text: R`ノルム空間 $X$ について、次は同値である。
<ol><li>$X$ はバナッハ空間である。</li><li>$x_n\in X$（$n\in\mathbb{N}$）が $\sum_{n=1}^\infty\|x_n\|_X<\infty$ をみたすならば、$\sum_{n=1}^\infty x_n$ は $X$ で収束し、$\bigl\|\sum_{n=1}^\infty x_n\bigr\|_X\le\sum_{n=1}^\infty\|x_n\|_X$。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1)⇒(2)：部分和 $s_n:=\sum_{k=1}^nx_k$ について、$n>m$ なら $\|s_n-s_m\|=\bigl\|\sum_{k=m+1}^nx_k\bigr\|\le\sum_{k=m+1}^n\|x_k\|$（三角不等式を帰納的に）。右辺は実数の収束級数 $\sum\|x_k\|$ の[[series#thm-cauchy-series|コーシー条件]]によりいくらでも小さくなるので、$\{s_n\}$ はコーシー列で、$X$ の完備性より収束する。不等式は $\|s_n\|\le\sum_{k=1}^n\|x_k\|\le\sum_{k=1}^\infty\|x_k\|$ で $n\to\infty$ とし、[[normed-space#prop-norm-rev|ノルムの連続性]]を使う。` },
          { text: R`(2)⇒(1)：$\{f_k\}$ をコーシー列とする。$\varepsilon=2^{-j}$（$j\in\mathbb{N}$）に対する番号を順に大きくとって、狭義単調増加な $k_1<k_2<\cdots$ で、$l,l'\ge k_j$ なら $\|f_l-f_{l'}\|<2^{-j}$ となるものを選ぶ。特に $\|f_{k_{j+1}}-f_{k_j}\|<2^{-j}$。` },
          { text: R`$x_j:=f_{k_{j+1}}-f_{k_j}$ とおくと $\sum_j\|x_j\|<\sum_j2^{-j}=1<\infty$ なので、(2) より $\sum_jx_j$ は収束する。部分和は望遠鏡和 $\sum_{j=1}^{J}x_j=f_{k_{J+1}}-f_{k_1}$ なので、部分列 $\{f_{k_J}\}_J$ はある $f\in X$ に収束する。` },
          { text: R`<b>コーシー列が収束部分列をもてば、全体が収束する。</b>$\varepsilon>0$ に対し、$k,l\ge N$ で $\|f_k-f_l\|<\frac\varepsilon2$ となる $N$ と、$\|f_{k_J}-f\|<\frac\varepsilon2$ かつ $k_J\ge N$ となる $J$ をとる。$k\ge N$ なら $\|f_k-f\|\le\|f_k-f_{k_J}\|+\|f_{k_J}-f\|<\varepsilon$。よって $f_k\to f$ で、$X$ は完備。` },
        ],
      },
      { t: 'crux', text: R`(2) は[[absolute-convergence#thm-abs-conv|「絶対収束する級数は収束する」]]のバナッハ空間版であり、完備性と同値である。[[neumann-series|ノイマン級数]] $\sum T^k$ が作用素の空間で収束するのは、この定理による（$\sum\|T\|^k<\infty$）。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$C([a,b])$（最大値ノルム）の点列が $f$ に収束するならば、各点 $x\in[a,b]$ で $f_k(x)\to f(x)$ であることを示せ。`, hint: R`$|f_k(x)-f(x)|\le\|f_k-f\|_{C}$。`, answer: R`$x\in[a,b]$ を固定すると、最大値の定義より $|f_k(x)-f(x)|\le\max_y|f_k(y)-f(y)|=\|f_k-f\|_C\to0$。はさみうちより $f_k(x)\to f(x)$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$C([0,1])$（最大値ノルム）の部分集合 $M:=\{f\in C([0,1])\mid f(0)=0\}$ はバナッハ空間であることを示せ。`, hint: R`$M$ が閉部分空間であることを示し、[[banach-space#prop-closed-complete|命題]]を使う。`, answer: R`$M$ は部分空間（[[vector-space#ex-subspace|例]]）。$f_k\in M$, $f_k\to f$ in $C([0,1])$ なら $|f(0)|=|f(0)-f_k(0)|\le\|f-f_k\|_C\to0$ で $f(0)=0$、$f\in M$。よって閉部分空間。$C([0,1])$ はバナッハ空間なので、命題 (1) より $M$ もバナッハ空間。`, space: 6 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`有界区間 $[0,\infty)$ ではなく無限区間 $I=[0,\infty)$ 上の有界連続関数全体 $C_b(I)$ に $\|u\|:=\sup_{t\ge0}|u(t)|$ を入れると、バナッハ空間になることを示せ。`, hint: R`$C([a,b])$ と同じ 4 ステップ。④ では各点の連続性と有界性を示す。`, answer: R`①② は $C([a,b])$ と同じで、各点極限 $u(t)$ が定まり、③ より $k\ge N$ で $\sup_t|u_k(t)-u(t)|\le\frac\varepsilon2$。④：有界性は $|u(t)|\le|u(t)-u_N(t)|+|u_N(t)|\le\frac\varepsilon2+\|u_N\|$。連続性は、$u_k\to u$ が $I$ 上で一様収束しているので[[uniform-convergence#thm-unif-cont|定理]]（区間 $I$ は無限区間でもよい）より $u\in C(I)$。よって $u\in C_b(I)$ で $\|u_k-u\|\to0$。`, space: 8 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'banach-fixed-point',
    title: 'バナッハの不動点定理',
    sub: '縮小写像の原理',
    yomi: 'ばなっはのふどうてんていり',
    aliases: ['不動点定理', 'ふどうてんていり', '縮小写像', 'しゅくしょうしゃぞう', '縮小写像の原理', 'しゅくしょうしゃぞうのげんり', '不動点', 'ふどうてん', '逐次近似', 'ちくじきんじ', '縮小定数'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['banach-space', 'metric-space', 'series'],
    related: ['ode-application', 'neumann-series', 'local-wellposedness'],
    notation: [
      R`$(X,d)$：距離空間。$\Phi:X\to X$：写像（自分自身への写像であることが大事）。$\Phi(f)$ を $\Phi f$ とも書く。`,
      R`$r$：縮小定数。$0<r<1$ の実数。`,
      R`$f_0\in X$：出発点。$f_k:=\Phi(f_{k-1})$（$k\in\mathbb{N}$）：反復（逐次近似）。`,
      R`$f'$：ここでは「もう一つの元」の意味で、微分ではない。`,
    ],
    synopsis: R`完備距離空間 $X$ から自分自身への写像 $\Phi$ が、2 点の距離を一定の割合 $r<1$ 以下に縮めるならば、$\Phi(f)=f$ となる点（不動点）がただ一つ存在する。しかもどこから出発しても、反復 $f_{k+1}=\Phi(f_k)$ がその不動点に収束する。方程式の解の存在と一意性を示す最も基本的な道具であり、微分方程式の解の存在定理や、偏微分方程式の局所適切性の証明に使われる。`,
    body: [
      { t: 'h2', id: 'def', text: '縮小写像' },
      { t: 'prop', id: 'prop-banach-metric', title: 'バナッハ空間は完備距離空間', yomi: 'ばなっはくうかんはかんびきょりくうかん', imp: 2, text: R`バナッハ空間 $X$ に $d(f,g):=\|f-g\|_X$ を入れると、$(X,d)$ は[[metric-space#def-complete|完備距離空間]]になる。また、完備距離空間の閉部分集合（距離を制限したもの）も完備距離空間である。` },
      { t: 'proof', steps: [{ text: R`距離になることは[[normed-space#prop-norm-metric|命題]]。この距離での基本列はノルムのコーシー列と同じで、極限も同じなので完備。後半：閉部分集合 $F$ の基本列は $X$ の中で極限をもち、$F$ が閉なので[[closure#cor-closed-seq|極限は $F$ に属する]]。` }] },
      { t: 'def', id: 'def-contraction', title: '縮小写像', yomi: 'しゅくしょうしゃぞう', imp: 3, text: R`距離空間 $(X,d)$ からそれ自身への写像 $\Phi:X\to X$ が<b class="term">縮小写像</b>であるとは、定数 $0<r<1$ が存在して
$$d(\Phi(f),\Phi(g))\le r\,d(f,g)\qquad(f,g\in X)$$
が成り立つことをいう。$r$ を<b class="term">縮小定数</b>という。$\Phi(f)=f$ をみたす $f\in X$ を $\Phi$ の<b class="term">不動点</b>という。` },
      { t: 'note', title: '言い換え', text: R`縮小写像は「どの 2 点も、写すと距離が $r$ 倍以下に縮む」写像であり、リプシッツ定数が $1$ より小さい[[uniform-continuity#def-lip|リプシッツ連続]]写像である。特に連続である。` },

      { t: 'h2', id: 'thm', text: '定理と証明' },
      { t: 'thm', id: 'thm-banach-fp', title: 'バナッハの不動点定理', yomi: 'ばなっはのふどうてんていり', imp: 3, text: R`$(X,d)$ を完備距離空間、$\Phi:X\to X$ を縮小定数 $0<r<1$ の縮小写像とする。このとき $\Phi$ の不動点 $f\in X$（$f=\Phi(f)$）がただ一つ存在する。さらに、任意の $f_0\in X$ から $f_k:=\Phi(f_{k-1})$ で作った点列は $f$ に収束し、
$$d(f_k,f)\le\frac{r^k}{1-r}\,d(f_1,f_0)\qquad(k\in\mathbb{N}\cup\{0\}).$$` },
      { t: 'strategy', text: R`反復で作った点列が基本列であることを、隣どうしの距離が等比数列 $r^kd(f_1,f_0)$ で抑えられることから示す。完備性で極限 $f$ をとり、$\Phi$ の連続性から $f=\Phi(f)$。一意性は「二つの不動点の距離は $r$ 倍以下になる」ことから。` },
      { t: 'fig', type: 'cobweb', preset: 'cos', editable: true, caption: R`$x_{k+1}=\Phi(x_k)$ の反復（クモの巣図）。$y=\Phi(x)$ のグラフ（黒）と $y=x$（点線）の交点が不動点。縮小写像 $\cos x$（$[0,1.2]$ で $|\Phi'|\le\sin1.2<1$）ではどこから出発しても交点に吸い込まれる。プリセット「$2x-1$」は縮小でなく、反復が不動点 $x=1$ から離れていく。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>ステップ 1：隣どうしの距離。</b>$f_0\in X$ を任意に選んで固定し、$f_k:=\Phi(f_{k-1})$ とする。$k\ge1$ について $d(f_{k+1},f_k)\le r^kd(f_1,f_0)$ を帰納法で示す。$k=0$ では等号。$k$ で成り立てば $d(f_{k+2},f_{k+1})=d(\Phi(f_{k+1}),\Phi(f_k))\le r\,d(f_{k+1},f_k)\le r^{k+1}d(f_1,f_0)$。` },
          {
            text: R`<b>ステップ 2：基本列。</b>$k>l\ge0$ とすると、三角不等式を繰り返して`,
            eqs: [
              [R`d(f_k,f_l)\le d(f_k,f_{k-1})+d(f_{k-1},f_{k-2})+\cdots+d(f_{l+1},f_l)`, R`三角不等式（$k-l-1$ 回）`],
              [R`\phantom{d(f_k,f_l)}\le(r^{k-1}+r^{k-2}+\cdots+r^l)\,d(f_1,f_0)`, R`ステップ 1`],
              [R`\phantom{d(f_k,f_l)}=\frac{r^l(1-r^{k-l})}{1-r}\,d(f_1,f_0)\le\frac{r^l}{1-r}\,d(f_1,f_0).`, R`[[sigma-notation#ex-geom-sum|等比数列の和]]・$0<1-r^{k-l}<1$`],
            ],
          },
          { text: R`$0<r<1$ なので $r^l\to0$（[[series#lem-rn|補題]]）。$\varepsilon>0$ に対し、$\frac{r^N}{1-r}d(f_1,f_0)<\varepsilon$ となる $N$ をとれば、$k>l\ge N$ で $d(f_k,f_l)<\varepsilon$。よって $\{f_k\}$ は基本列で、$X$ は完備なので極限 $f\in X$ をもつ。` },
          {
            text: R`<b>ステップ 3：不動点であること。</b>$d(\Phi(f_k),\Phi(f))\le r\,d(f_k,f)\to0$ なので $\Phi(f_k)\to\Phi(f)$。したがって`,
            eqs: [[R`0\le d(\Phi(f),f)\le d(\Phi(f),f_{k+1})+d(f_{k+1},f)=d(\Phi(f),\Phi(f_k))+d(f_{k+1},f)\le r\,d(f,f_k)+d(f_{k+1},f)\xrightarrow[k\to\infty]{}0.`, R`三角不等式・$f_{k+1}=\Phi(f_k)$・縮小性`]],
          },
          { text: R`よって $d(\Phi(f),f)=0$、すなわち $f=\Phi(f)$。` },
          { text: R`<b>ステップ 4：一意性。</b>$f'\in X$ も $f'=\Phi(f')$ をみたすとすると、$d(f,f')=d(\Phi(f),\Phi(f'))\le r\,d(f,f')$。移項して $(1-r)d(f,f')\le0$、$1-r>0$ なので $d(f,f')\le0$、すなわち $d(f,f')=0$ で $f=f'$。` },
          { text: R`<b>ステップ 5：誤差評価。</b>ステップ 2 の不等式 $d(f_k,f_l)\le\frac{r^l}{1-r}d(f_1,f_0)$ で、$l$ を固定して $k\to\infty$ とすると、$d(f_k,f_l)\to d(f,f_l)$（[[metric-continuity#ex-dist-cont|距離の連続性]]）なので $d(f,f_l)\le\frac{r^l}{1-r}d(f_1,f_0)$。文字 $l$ を $k$ に書きかえれば主張の評価。` },
        ],
      },
      { t: 'rem', title: 'どの仮定も外せない', text: R`<ul><li><b>完備性：</b>$X=(0,1]$（$|x-y|$）、$\Phi(x)=\frac x2$ は縮小写像（$r=\frac12$）だが、不動点 $0$ は $X$ に入っていない。</li><li><b>$r<1$ が一様にとれること：</b>$X=[1,\infty)$、$\Phi(x)=x+\frac1x$ は、$x\ne y$ で $|\Phi(x)-\Phi(y)|=|x-y|\left(1-\frac1{xy}\right)<|x-y|$ をみたすが、$\Phi(x)=x$ となる点はない（$\frac1x\ne0$）。縮む割合が $1$ にいくらでも近づくと失敗する。</li><li><b>$\Phi(X)\subset X$：</b>$X=[0,1]$、$\Phi(x)=\frac x2+1$ は縮小的だが $\Phi(1)=\frac32\notin X$。不動点 $2$ は $X$ の外にある。実際に使うときは、まず「$\Phi$ が $X$ を $X$ に写す」ことを確かめる。</li></ul>` },

      { t: 'h2', id: 'ex', text: '使用例' },
      { t: 'ex', id: 'ex-cosx', title: 'x = cos x はただ一つの解をもつ', text: R`$X=[0,1]$、$d(x,y)=|x-y|$ とすると、$X$ は $\mathbb{R}$ の閉集合なので完備距離空間である（[[banach-fixed-point#prop-banach-metric|命題]]）。$\Phi(x):=\cos x$ とおく。<br>① $\Phi(X)\subset X$：$x\in[0,1]$ なら $0<\cos1\le\cos x\le1$。<br>② 縮小性：$0\le y<x\le1$ について、[[mean-value#thm-mvt|平均値の定理]]より $\cos x-\cos y=-\sin c\,(x-y)$ となる $c\in(y,x)$ がある。$0<c<1$ なので $0<\sin c\le\sin1=:r<1$（$\sin$ は $[0,\frac\pi2]$ で増加）。よって $|\Phi(x)-\Phi(y)|\le r|x-y|$（$x=y$ でも成り立つ）。<br>不動点定理より、$x=\cos x$ をみたす $x\in[0,1]$ がただ一つ存在する（$x\approx0.739$）。図の反復で $x_k$ がこの値に近づく様子が見られる。` },
      { t: 'ex', id: 'ex-int-eq', title: '積分方程式の例', text: R`$X=C([0,1])$（最大値ノルム、バナッハ空間）で、方程式 $u(x)=1+\frac12\int_0^xu(t)\,dt$ を考える。$(\Phi u)(x):=1+\frac12\int_0^xu(t)\,dt$ とおくと、[[fundamental-theorem#thm-ftc1|基本定理 (I)]]より $\Phi u\in C([0,1])$。$|(\Phi u)(x)-(\Phi v)(x)|\le\frac12\int_0^x|u-v|\le\frac12\|u-v\|$ なので縮小定数 $\frac12$ の縮小写像。不動点 $u$ がただ一つ存在し、$u'=\frac12u$、$u(0)=1$ から $u(x)=e^{x/2}$ とわかる。$u_0=1$ から反復すると $u_k(x)=\sum_{j=0}^k\frac{(x/2)^j}{j!}$（指数関数の部分和）になる。` },
      { t: 'qa', q: R`不動点定理で得られる解は、どのくらい速く近似できる？`, a: R`誤差は $\frac{r^k}{1-r}d(f_1,f_0)$ 以下なので、$k$ に関して等比的（指数的）に小さくなる。$r=\frac12$ なら 1 回の反復で誤差の上限が半分になる。また $d(f_k,f)\le\frac r{1-r}d(f_k,f_{k-1})$（直前の 2 項の差だけで誤差がわかる）も成り立つ（問題 2）。` },
      { t: 'crux', text: R`不動点定理は「方程式を $u=\Phi(u)$ の形に書きかえ、$\Phi$ が適切な完備距離空間で縮小写像になることを示せば、解がただ一つ存在する」という使い方をする。[[ode-application|微分方程式の初期値問題]]では積分方程式に書きかえて $C(I)$ で使い、[[local-wellposedness|非線形シュレディンガー方程式の局所適切性]]ではデュアメルの公式に書きかえて関数空間の閉球で使う。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\Phi:\mathbb{R}\to\mathbb{R}$, $\Phi(x)=\frac13x+2$ は縮小写像であることを示し、不動点を求めよ。`, hint: R`$|\Phi(x)-\Phi(y)|=\frac13|x-y|$。`, answer: R`$|\Phi(x)-\Phi(y)|=\frac13|x-y|$ なので縮小定数 $\frac13$ の縮小写像。$\mathbb{R}$ は完備なので不動点がただ一つあり、$x=\frac13x+2$ を解いて $x=3$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`不動点定理の記号で、$d(f_k,f)\le\dfrac r{1-r}\,d(f_k,f_{k-1})$（$k\in\mathbb{N}$）を示せ。`, hint: R`$d(f_k,f)\le d(f_k,f_{k+1})+d(f_{k+1},f)$、$d(f_{k+1},f)=d(\Phi f_k,\Phi f)\le r\,d(f_k,f)$。`, answer: R`$d(f_k,f)\le d(f_k,f_{k+1})+d(f_{k+1},f)\le r\,d(f_{k-1},f_k)+r\,d(f_k,f)$（縮小性を 2 回）。移項して $(1-r)d(f_k,f)\le r\,d(f_k,f_{k-1})$。`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`$X$ を完備距離空間、$\Phi:X\to X$ とし、ある $m\in\mathbb{N}$ で $\Phi^m=\Phi\circ\cdots\circ\Phi$（$m$ 回）が縮小写像であるとする。このとき $\Phi$ はただ一つの不動点をもつことを示せ。`, hint: R`$\Phi^m$ の不動点 $f$ について、$\Phi(f)$ も $\Phi^m$ の不動点。`, answer: R`不動点定理より $\Phi^m$ はただ一つの不動点 $f$ をもつ。$\Phi^m(\Phi(f))=\Phi(\Phi^m(f))=\Phi(f)$ なので $\Phi(f)$ も $\Phi^m$ の不動点で、一意性より $\Phi(f)=f$。$\Phi$ の不動点は $\Phi^m$ の不動点でもあるので、$\Phi$ の不動点も $f$ ただ一つ。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'ode-application',
    title: '不動点定理の微分方程式への応用',
    sub: 'デュアメルの原理・グロンウォールの不等式・時間大域解',
    yomi: 'ふどうてんていりのびぶんほうていしきへのおうよう',
    aliases: ['常微分方程式', 'じょうびぶんほうていしき', '初期値問題', 'しょきちもんだい', '積分方程式', 'せきぶんほうていしき', 'デュアメルの原理', 'でゅあめる', 'グロンウォールの不等式', 'ぐろんうぉーる', 'Gronwall', 'リプシッツ条件', '時間大域解', 'じかんたいいきかい', 'ピカール', 'ぴかーる', '逐次近似法'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['banach-fixed-point', 'banach-space', 'fundamental-theorem', 'power-series'],
    related: ['local-wellposedness', 'nls', 'heat-equation'],
    notation: [
      R`$I=[0,\infty)$：時間の区間。$t\in I$ は時刻。$u:I\to\mathbb{R}$ は未知関数、$\frac{du}{dt}=u'$。`,
      R`$f\in C(\mathbb{R})$：非線形項。<b>リプシッツ条件</b>：ある $L>0$ ですべての $x,y\in\mathbb{R}$ について $|f(x)-f(y)|\le L|x-y|$。$f(u)$ は合成関数 $t\mapsto f(u(t))$ を表す。`,
      R`$u_0\in\mathbb{R}$：初期値。$C^1(I)$：$I$ 上で微分可能（$t=0$ では右側微分）で導関数が連続な関数全体。`,
      R`$C_b(I):=\{u\in C(I)\mid\|u\|_{C_b}:=\sup_{t\ge0}|u(t)|<\infty\}$：有界連続関数の空間（[[banach-space#prob-3|バナッハ空間]]）。`,
      R`$k>0$：重みの定数。$X_k:=\{u\in C(I)\mid\|u\|_X:=\sup_{t\ge0}e^{-kt}|u(t)|<\infty\}$：重み付きの空間。`,
    ],
    synopsis: R`常微分方程式の初期値問題 $u'=f(u)$、$u(0)=u_0$ を、積分方程式 $u(t)=u_0+\int_0^tf(u(s))\,ds$ に書きかえる（デュアメルの原理）。右辺を写像 $\Phi u$ とみて、$f$ がリプシッツ連続なら、重み $e^{-kt}$ 付きの最大値ノルムで $\Phi$ が縮小写像になる。不動点定理により、すべての時刻で定義された解（時間大域解）がただ一つ得られる。一意性はグロンウォールの不等式でも示せる。`,
    body: [
      { t: 'h2', id: 'setting', text: '問題設定' },
      { t: 'p', text: R`$I=[0,\infty)$ とし、初期値問題
$$\begin{cases}\dfrac{du}{dt}=f(u)&(t\in I),\\[4pt]u(0)=u_0\in\mathbb{R}\end{cases}\tag{IVP}$$
を考える。$f\in C(\mathbb{R})$ はリプシッツ条件 $|f(x)-f(y)|\le L|x-y|$（$L>0$）をみたすとする。(IVP) の<b>解</b>とは、$u\in C^1(I)$ で、すべての $t\in I$ について $u'(t)=f(u(t))$ をみたし、$u(0)=u_0$ となるものをいう。` },
      { t: 'def', id: 'def-int-eq', title: '積分方程式', yomi: 'せきぶんほうていしき', imp: 3, text: R`(IVP) に伴う<b class="term">積分方程式</b>を
$$u(t)=u_0+\int_0^tf(u(s))\,ds\qquad(t\in I)\tag{IE}$$
と定める。` },
      { t: 'thm', id: 'thm-duhamel', title: 'デュアメルの原理（微分方程式と積分方程式の同値性）', yomi: 'でゅあめるのげんり', imp: 3, text: R`$u\in C(I)$ について、$u$ が (IVP) の解（特に $u\in C^1(I)$）であることと、$u$ が (IE) をみたすことは同値である。` },
      {
        t: 'proof',
        steps: [
          { text: R`(⇒) $u$ を (IVP) の解とし、$t>0$ を固定する。$u'=f(u)$ は連続（連続関数の合成）なので $[0,t]$ 上で積分可能で、[[fundamental-theorem#thm-ftc2|基本定理 (II)]]より $u(t)-u(0)=\int_0^tu'(s)\,ds=\int_0^tf(u(s))\,ds$。$u(0)=u_0$ を代入すれば (IE)。$t=0$ では両辺とも $u_0$。` },
          { text: R`(⇐) $u\in C(I)$ が (IE) をみたすとする。$s\mapsto f(u(s))$ は連続なので、[[fundamental-theorem#thm-ftc1|基本定理 (I)]]より右辺は $t$ について微分可能（$t=0$ では右側微分）で、導関数は $f(u(t))$、これは連続。よって $u\in C^1(I)$、$u'(t)=f(u(t))$。$t=0$ を代入して $u(0)=u_0$。` },
        ],
      },
      { t: 'note', title: '書きかえの意味', text: R`微分方程式は「微分可能な関数」を探す問題だが、積分方程式は「連続関数」を探す問題になる。連続関数の空間 $C(I)$ は（適切なノルムで）完備なので、不動点定理が使える。線形の発展方程式 $u'=Au+F$ では $u(t)=e^{tA}u_0+\int_0^te^{(t-s)A}F(s)\,ds$ という形になり、これが[[nls|シュレディンガー方程式]]で使うデュアメルの公式の原型である。` },

      { t: 'h2', id: 'gronwall', text: 'グロンウォールの不等式' },
      { t: 'thm', id: 'thm-gronwall', title: 'グロンウォールの不等式', yomi: 'ぐろんうぉーるのふとうしき', imp: 3, text: R`$\alpha\in\mathbb{R}$、$a<b$、$I=[a,b]$ とし、$g,h\in C(I)$、すべての $t\in I$ で $g(t)\ge0$ とする。
$$h(t)\le\alpha+\int_a^tg(s)h(s)\,ds\quad(t\in I)\qquad\Longrightarrow\qquad h(t)\le\alpha\exp\Bigl(\int_a^tg(s)\,ds\Bigr)\quad(t\in I).$$` },
      {
        t: 'proof',
        steps: [
          { text: R`$H(t):=\alpha+\int_a^tg(s)h(s)\,ds$、$G(t):=\int_a^tg(s)\,ds$ とおく。$gh,g$ は連続なので、[[fundamental-theorem#thm-ftc1|基本定理 (I)]]より $H,G\in C^1(I)$ で $H'=gh$、$G'=g$。仮定は $h\le H$ のことである。` },
          { text: R`$g\ge0$ と $h\le H$ より $H'(t)=g(t)h(t)\le g(t)H(t)$。` },
          {
            text: R`$e^{-G(t)}>0$ を掛けて、積と合成の微分を使うと`,
            eqs: [[R`\bigl(H(t)e^{-G(t)}\bigr)'=\bigl(H'(t)-g(t)H(t)\bigr)e^{-G(t)}\le0.`, R`$(e^{-G})'=-ge^{-G}$（[[power-series#thm-exp|$\exp'=\exp$]] と合成関数の微分）`]],
          },
          { text: R`[[mean-value#cor-incr|平均値の定理の系]]より $H e^{-G}$ は単調減少なので、$H(t)e^{-G(t)}\le H(a)e^{-G(a)}=\alpha$（$G(a)=0$）。両辺に $e^{G(t)}>0$ を掛けて $h(t)\le H(t)\le\alpha e^{G(t)}$。` },
        ],
      },
      { t: 'cor', id: 'cor-gronwall-zero', title: 'α = 0 の場合', yomi: 'ぐろんうぉーるのけい', imp: 2, text: R`$h\in C(I)$, $h\ge0$, $L\ge0$ で $h(t)\le L\int_a^th(s)\,ds$（$t\in I$）ならば、$I$ 上で $h\equiv0$。` },
      { t: 'proof', steps: [{ text: R`定理を $\alpha=0$、$g\equiv L$ に使うと $h(t)\le0\cdot e^{L(t-a)}=0$。$h\ge0$ と合わせて $h\equiv0$。` }] },

      { t: 'h2', id: 'global', text: '時間大域解の存在と一意性' },
      { t: 'prop', id: 'prop-xk-banach', title: '重み付きの空間 X_k はバナッハ空間', yomi: 'おもみつきのくうかん', imp: 2, text: R`$k>0$ とする。$X_k=\{u\in C(I)\mid\sup_{t\ge0}e^{-kt}|u(t)|<\infty\}$ はノルム $\|u\|_X:=\sup_{t\ge0}e^{-kt}|u(t)|$ に関してバナッハ空間である。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>ノルム。</b>$e^{-kt}>0$ なので、ノルムの公理は $C_b$ の上限ノルムと同じく各点の不等式の上限から確かめられる（$\|u\|_X=0$ なら各 $t$ で $e^{-kt}|u(t)|=0$、すなわち $u(t)=0$）。` },
          { text: R`<b>完備性。</b>写像 $J:X_k\to C_b(I)$, $(Ju)(t):=e^{-kt}u(t)$ を考える。$Ju$ は連続で有界、$\|Ju\|_{C_b}=\|u\|_X$。逆に $v\in C_b(I)$ なら $u(t):=e^{kt}v(t)$ は $X_k$ に属し $Ju=v$。$\{u_l\}$ を $X_k$ のコーシー列とすると、$\|Ju_l-Ju_m\|_{C_b}=\|u_l-u_m\|_X$ なので $\{Ju_l\}$ は $C_b(I)$ のコーシー列で、[[banach-space#prob-3|$C_b(I)$ の完備性]]より $v\in C_b(I)$ に収束する。$u:=e^{kt}v\in X_k$ とおくと $\|u_l-u\|_X=\|Ju_l-v\|_{C_b}\to0$。` },
        ],
      },
      { t: 'thm', id: 'thm-global', title: '時間大域解の一意存在', yomi: 'じかんたいいきかいのいちいそんざい', imp: 3, text: R`$f\in C(\mathbb{R})$ がリプシッツ定数 $L>0$ のリプシッツ条件をみたすとし、$k>L$ とする。このとき任意の初期値 $u_0\in\mathbb{R}$ について、積分方程式 (IE) は $X_k$ の中にただ一つの解 $u$ をもつ。$u\in C^1(I)$ であり、$u$ は (IVP) の解である。さらに (IVP) の解は $C^1(I)$ の中でただ一つである。` },
      { t: 'strategy', text: R`$(\Phi u)(t):=u_0+\int_0^tf(u(s))\,ds$ とおき、(1) $\Phi$ が $X_k$ を $X_k$ に写すこと、(2) $\Phi$ が縮小定数 $\frac Lk<1$ の縮小写像であること、を示す。重み $e^{-kt}$ は、積分 $\int_0^te^{ks}ds=\frac{e^{kt}-1}k$ から因子 $\frac1k$ を取り出すためのものである。重みなしの $C([0,T])$ でも、$T$ が小さければ（$LT<1$）同じ議論ができる（局所解）。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>準備：$|f(x)|\le L|x|+|f(0)|$。</b>リプシッツ条件で $y=0$ とすると $|f(x)|\le|f(x)-f(0)|+|f(0)|\le L|x|+|f(0)|$。` },
          {
            text: R`<b>ステップ 1：$\Phi(X_k)\subset X_k$。</b>$u\in X_k$ とする。$s\mapsto f(u(s))$ は連続なので $\Phi u\in C(I)$（基本定理 (I)）。$|u(s)|\le e^{ks}\|u\|_X$ に注意して、$t\ge0$ について`,
            eqs: [
              [R`e^{-kt}|(\Phi u)(t)|\le e^{-kt}|u_0|+e^{-kt}\int_0^t\bigl(L|u(s)|+|f(0)|\bigr)ds`, R`三角不等式・積分の三角不等式・準備`],
              [R`\phantom{e^{-kt}|(\Phi u)(t)|}\le|u_0|+e^{-kt}\Bigl(L\|u\|_X\int_0^te^{ks}ds+|f(0)|\,t\Bigr)`, R`$e^{-kt}\le1$・$|u(s)|\le e^{ks}\|u\|_X$`],
              [R`\phantom{e^{-kt}|(\Phi u)(t)|}=|u_0|+\frac Lk(1-e^{-kt})\|u\|_X+|f(0)|\,te^{-kt}\le|u_0|+\frac Lk\|u\|_X+\frac{|f(0)|}{ek}.`, R`$\int_0^te^{ks}ds=\frac{e^{kt}-1}k$、$te^{-kt}\le\frac1{ek}$`],
            ],
          },
          { text: R`（$te^{-kt}\le\frac1{ek}$ は、$\phi(t)=te^{-kt}$ が $\phi'(t)=(1-kt)e^{-kt}$ より $t=\frac1k$ で最大値 $\frac1{ek}$ をとることから。）右辺は $t$ によらない有限の値なので $\|\Phi u\|_X<\infty$、すなわち $\Phi u\in X_k$。` },
          {
            text: R`<b>ステップ 2：縮小写像。</b>$u,v\in X_k$、$t\ge0$ について`,
            eqs: [
              [R`e^{-kt}|(\Phi u)(t)-(\Phi v)(t)|\le e^{-kt}\int_0^t|f(u(s))-f(v(s))|\,ds\le e^{-kt}\int_0^tL|u(s)-v(s)|\,ds`, R`$u_0$ が打ち消し合う・リプシッツ条件`],
              [R`\phantom{e^{-kt}|(\Phi u)(t)-(\Phi v)(t)|}\le e^{-kt}\int_0^tLe^{ks}\|u-v\|_X\,ds=\frac Lk(1-e^{-kt})\|u-v\|_X\le\frac Lk\|u-v\|_X.`, R`$|u(s)-v(s)|\le e^{ks}\|u-v\|_X$`],
            ],
          },
          { text: R`上限をとって $\|\Phi u-\Phi v\|_X\le\frac Lk\|u-v\|_X$。$k>L$ より $r:=\frac Lk\in(0,1)$ なので、$\Phi$ は縮小写像である。` },
          { text: R`<b>ステップ 3：不動点。</b>$X_k$ は[[ode-application#prop-xk-banach|バナッハ空間]]なので、[[banach-fixed-point#thm-banach-fp|不動点定理]]より $u=\Phi u$ をみたす $u\in X_k$ がただ一つ存在する。これは (IE) の解で、[[ode-application#thm-duhamel|デュアメルの原理]]より $u\in C^1(I)$ かつ (IVP) の解である。` },
          { text: R`<b>ステップ 4：$C^1(I)$ での一意性。</b>$u,\tilde u\in C^1(I)$ をともに (IVP) の解とし、$T>0$ を任意に固定する。デュアメルの原理より両方 (IE) をみたすので、$t\in[0,T]$ で $|u(t)-\tilde u(t)|\le\int_0^t|f(u(s))-f(\tilde u(s))|\,ds\le L\int_0^t|u(s)-\tilde u(s)|\,ds$。$h:=|u-\tilde u|\in C([0,T])$ に[[ode-application#cor-gronwall-zero|グロンウォールの系]]を使うと $h\equiv0$。$T$ は任意なので $I$ 上で $u=\tilde u$。` },
        ],
      },
      { t: 'rem', title: '「一意性はもっと広い集合でいえている」', text: R`不動点定理から得られる一意性は「$X_k$ の中で」だけである。ステップ 4 のグロンウォールの議論は、$X_k$ に属するかどうかを問わず「$C^1(I)$ の解はただ一つ」と言っている。したがって、もし他の方法で $C^1$ 級の解が見つかれば、それは上で構成した解と同じものである。` },
      { t: 'ex', id: 'ex-picard', title: '逐次近似の様子：u′ = u, u(0) = 1', text: R`$f(u)=u$（$L=1$）とする。$u_0(t)\equiv1$ から $u_{j+1}(t)=1+\int_0^tu_j(s)\,ds$ と反復すると、$u_1=1+t$、$u_2=1+t+\frac{t^2}2$、…、$u_j(t)=\sum_{m=0}^j\frac{t^m}{m!}$ となり、[[power-series#def-exp|指数関数]] $e^t$ の部分和が現れる。解は $u(t)=e^t$ である。` },
      { t: 'fig', type: 'plot', preset: 'picard', caption: R`$u'=u$, $u(0)=1$ の逐次近似 $u_1=1+t$、$u_2$、$u_3$（色・線種の違い）と、解 $e^t$。反復のたびに、より長い時間まで解に近くなる。` },
      { t: 'rem', title: 'リプシッツ条件がないとき', text: R`<ul><li><b>一意性が崩れる：</b>$f(u)=2\sqrt{|u|}$、$u_0=0$ とすると、$u\equiv0$ と $u(t)=t^2$ がどちらも解になる（$(t^2)'=2t=2\sqrt{t^2}$）。$f$ は $u=0$ の近くでリプシッツ条件をみたさない（$\frac{2\sqrt{|u|}}{|u|}\to\infty$）。</li><li><b>大域的に存在しない：</b>$f(u)=u^2$ は各有界区間ではリプシッツだが $\mathbb{R}$ 全体ではリプシッツでない。$u_0=1$ の解は $u(t)=\frac1{1-t}$ で、$t\to1$ で無限大に発散する（爆発）。このような場合は、短い時間区間での局所解を不動点定理で作り、それをどこまで延ばせるか（大域可解性）を別に調べる。これは非線形偏微分方程式の研究の基本的な問題設定である（[[local-wellposedness|局所適切性]]）。</li></ul>` },
      { t: 'crux', text: R`「微分方程式 → 積分方程式 → 適切な関数空間での縮小写像 → 不動点」という流れは、関数解析を偏微分方程式に使うときの原型である。空間の選び方（ここでは重み $e^{-kt}$ のノルム）が縮小性を生み出すカギになる。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`初期値問題 $u'=-2u$、$u(0)=3$ に伴う積分方程式を書き、$u(t)=3e^{-2t}$ がそれをみたすことを確かめよ。`, hint: R`$\int_0^t(-2)\cdot3e^{-2s}ds=3e^{-2t}-3$。`, answer: R`積分方程式は $u(t)=3+\int_0^t(-2u(s))\,ds$。$u(t)=3e^{-2t}$ を代入すると右辺は $3+\int_0^t(-6e^{-2s})\,ds=3+\bigl[3e^{-2s}\bigr]_0^t=3e^{-2t}$ で、左辺に等しい。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$T>0$, $X=C([0,T])$（最大値ノルム）とし、$f$ をリプシッツ定数 $L$ のリプシッツ関数とする。$LT<1$ ならば $(\Phi u)(t)=u_0+\int_0^tf(u(s))\,ds$ が $X$ 上の縮小写像であることを示せ。`, hint: R`$|(\Phi u)(t)-(\Phi v)(t)|\le Lt\|u-v\|\le LT\|u-v\|$。`, answer: R`$\Phi u\in C([0,T])$ は基本定理 (I) より。$t\in[0,T]$ で $|(\Phi u)(t)-(\Phi v)(t)|\le\int_0^tL|u(s)-v(s)|ds\le Lt\|u-v\|\le LT\|u-v\|$。最大値をとって $\|\Phi u-\Phi v\|\le LT\|u-v\|$、$LT<1$ なので縮小写像。これより $[0,T]$ 上の局所解が得られる。`, space: 6 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`$u\in C^1([0,T])$ が $|u'(t)|\le L|u(t)|$（$t\in[0,T]$）、$u(0)=0$ をみたすならば、$u\equiv0$ であることを示せ。`, hint: R`$|u(t)|=\left|\int_0^tu'\right|\le L\int_0^t|u|$。グロンウォールの系。`, answer: R`基本定理 (II) より $u(t)=u(0)+\int_0^tu'(s)ds=\int_0^tu'(s)ds$。よって $|u(t)|\le\int_0^t|u'(s)|ds\le L\int_0^t|u(s)|ds$。$h=|u|\ge0$ は連続なので、[[ode-application#cor-gronwall-zero|グロンウォールの系]]より $h\equiv0$。`, space: 6 },
    ],
  });
})();
