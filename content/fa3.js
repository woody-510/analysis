/* 第 13 章：数列空間とヒルベルト空間（参考資料 解析学 IV 第 6〜9 章） */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* 図：直交射影（白黒でも読めるよう線種で区別） */
  const projSvg = `<svg viewBox="0 0 640 240" role="img" aria-label="直交射影の図">
    <line x1="40" y1="200" x2="600" y2="120" stroke="#222" stroke-width="1.6"/>
    <text x="560" y="112">L</text>
    <circle cx="120" cy="188.6" r="3.5" fill="#222"/><text x="104" y="212">0</text>
    <line x1="120" y1="188.6" x2="360" y2="40" stroke="#8c1c13" stroke-width="2"/>
    <text x="350" y="32">f</text>
    <line x1="120" y1="188.6" x2="376" y2="152" stroke="#233d6b" stroke-width="3"/>
    <text x="300" y="192">g = P_L f ∈ L</text>
    <line x1="376" y1="152" x2="360" y2="40" stroke="#222" stroke-width="1.4" stroke-dasharray="6 4"/>
    <text x="384" y="100">h = f − g ∈ L⊥</text>
    <path d="M366.1,153.4 L364.7,143.5 L374.6,142.1" fill="none" stroke="#222"/>
    <circle cx="470" cy="138.6" r="3.5" fill="#fff" stroke="#222"/><text x="462" y="164">ξ ∈ L</text>
    <line x1="470" y1="138.6" x2="360" y2="40" stroke="#6d665a" stroke-dasharray="2 3"/>
    <text x="440" y="70">‖f − ξ‖ ≥ ‖f − g‖</text>
  </svg>`;

  const NOTE_CONJ = R`$\overline{\alpha}$：複素数 $\alpha=x+iy$ の共役 $x-iy$。$\alpha\overline\alpha=|\alpha|^2$、$\alpha+\overline\alpha=2\operatorname{Re}\alpha$。$\mathbb{K}=\mathbb{R}$ なら $\overline\alpha=\alpha$（何も変わらない）。<b>閉包の横線と混同しないこと</b>（共役は数の上、閉包は集合の上）。`;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'sequence-spaces',
    title: '数列空間 ℓᵖ',
    sub: 'ヤング・ヘルダー・ミンコフスキーの不等式（資料 第 6 章）',
    yomi: 'すうれつくうかん',
    aliases: ['数列空間', 'すうれつくうかん', 'lp', 'ℓp', 'エルピー', 'える', 'ヤングの不等式', 'やんぐ', 'ヘルダーの不等式', 'へるだー', 'Hölder', 'ミンコフスキーの不等式', 'みんこふすきー', '共役指数', 'きょうやくしすう', 'l∞'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['banach-space', 'series-tests', 'mean-value', 'power-series'],
    related: ['hilbert-space', 'lebesgue-lp', 'operator-norm'],
    notation: [
      R`$1\le p\le\infty$。<b>共役指数</b> $q$：$\frac1p+\frac1q=1$ をみたす $q$。$p=1$ なら $q=\infty$、$p=\infty$ なら $q=1$（$\frac1\infty:=0$）、$p=2$ なら $q=2$。`,
      R`数列 $a=\{a_k\}_{k=1}^\infty$（$a_k\in\mathbb{K}$）。$a^{(j)}=\{a^{(j)}_k\}_{k=1}^\infty$：番号 $j$ の数列（$j$ は「何本目の数列か」、$k$ は「その中の何項目か」）。`,
      R`$\|a\|_{\ell^p}:=\bigl(\sum_{k=1}^\infty|a_k|^p\bigr)^{1/p}$（$1\le p<\infty$）、$\|a\|_{\ell^\infty}:=\sup_{k\ge1}|a_k|$。`,
      R`$t>0$, $s\in\mathbb{R}$ について $t^s:=e^{s\log t}$（[[power-series#def-log|実数べき]]）、$0^s:=0$（$s>0$）。`,
    ],
    synopsis: R`$p$ 乗が足し合わせられる数列全体 $\ell^p$ は、ノルム $\|a\|_{\ell^p}=(\sum|a_k|^p)^{1/p}$ でバナッハ空間になる。三角不等式（ミンコフスキーの不等式）の証明には、ヤングの不等式 $ab\le\frac{a^p}p+\frac{b^q}q$ から出るヘルダーの不等式 $\sum|a_kb_k|\le\|a\|_{\ell^p}\|b\|_{\ell^q}$ を使う。$p=2$ のとき $\ell^2$ は内積をもち、ヒルベルト空間になる。関数の $L^p$ 空間の数列版であり、証明の型はそのまま $L^p$ に移る。`,
    body: [
      { t: 'h2', id: 'young', text: 'ヤングの不等式' },
      { t: 'lem', id: 'lem-young', title: 'ヤングの不等式', yomi: 'やんぐのふとうしき', imp: 3, text: R`$a,b\ge0$ とし、$1<p,q<\infty$ は $\frac1p+\frac1q=1$ をみたすとする。このとき
$$ab\le\frac1pa^p+\frac1qb^q.$$
等号は $a^p=b^q$ のときに限り成り立つ。` },
      { t: 'fig', type: 'young', preset: 'p3', editable: true, caption: R`資料の証明のアイデア：曲線 $y=x^{p-1}$（すなわち $x=y^{q-1}$）の下側の面積 $S_1=\int_0^ax^{p-1}dx=\frac{a^p}p$（黄の斜線）と、左側の面積 $S_2=\int_0^by^{q-1}dy=\frac{b^q}q$（紺の斜線）を合わせると、長方形 $[0,a]\times[0,b]$（赤の破線）を覆う。$b=a^{p-1}$ のとき、ちょうど隙間なく覆う（等号）。` },
      {
        t: 'proof',
        sketch: R`図の面積比較が資料の証明である。ここでは、面積の議論を厳密にする代わりに、$b$ を固定した 1 変数関数の最小値を微分で求める。`,
        steps: [
          { text: R`<b>準備。</b>$\frac1p+\frac1q=1$ から $\frac1q=\frac{p-1}p$、すなわち $q=\frac p{p-1}$ で、$(p-1)(q-1)=(p-1)\cdot\frac1{p-1}=1$、また $p(q-1)=q$。` },
          { text: R`$a=0$ または $b=0$ なら左辺は $0$、右辺は $0$ 以上なので成り立つ（等号は $a=b=0$、すなわち $a^p=b^q=0$ のとき）。以下 $b>0$ を固定し、$\varphi(x):=\frac{x^p}p+\frac{b^q}q-bx$（$x\ge0$）とおく。` },
          {
            text: R`$\varphi$ は $(0,\infty)$ で微分可能で（[[power-series#prop-log-diff|べきの微分]]）、`,
            eqs: [[R`\varphi'(x)=x^{p-1}-b\quad\begin{cases}<0&(0<x<x_0)\\=0&(x=x_0)\\>0&(x>x_0)\end{cases},\qquad x_0:=b^{q-1}.`, R`$x\mapsto x^{p-1}$ は狭義増加、$x_0^{p-1}=b^{(q-1)(p-1)}=b$`]],
          },
          { text: R`[[mean-value#cor-incr|平均値の定理の系]]より $\varphi$ は $[0,x_0]$ で狭義減少、$[x_0,\infty)$ で狭義増加なので、$x_0$ で最小値をとり、$x\ne x_0$ では $\varphi(x)>\varphi(x_0)$。` },
          {
            text: R`最小値は`,
            eqs: [[R`\varphi(x_0)=\frac{b^{(q-1)p}}p+\frac{b^q}q-b\cdot b^{q-1}=\frac{b^q}p+\frac{b^q}q-b^q=b^q\Bigl(\frac1p+\frac1q-1\Bigr)=0.`, R`$p(q-1)=q$`]],
          },
          { text: R`よって $\varphi(a)\ge0$、すなわち $ab\le\frac{a^p}p+\frac{b^q}q$。等号は $a=x_0=b^{q-1}$、両辺を $p$ 乗して $a^p=b^{(q-1)p}=b^q$ のときに限る。` },
        ],
      },

      { t: 'h2', id: 'def', text: '数列空間' },
      { t: 'def', id: 'def-lp', title: '数列空間 ℓᵖ', yomi: 'すうれつくうかん', imp: 3, text: R`$1\le p<\infty$ について
$$\ell^p:=\Bigl\{a=\{a_k\}_{k=1}^\infty\ \Bigm|\ \|a\|_{\ell^p}:=\Bigl(\sum_{k=1}^\infty|a_k|^p\Bigr)^{1/p}<\infty\Bigr\},$$
$p=\infty$ について $\ell^\infty:=\{a\mid\|a\|_{\ell^\infty}:=\sup_{k\ge1}|a_k|<\infty\}$ と定め、これらを<b class="term">数列空間</b>という。和とスカラー倍は成分ごとに定める。` },
      { t: 'ex', id: 'ex-lp', title: '例', text: R`$a_k=\frac1k$ は $\ell^2$ に属する（$\sum\frac1{k^2}<\infty$）が $\ell^1$ には属さない（[[series#thm-harmonic|調和級数]]）。$a_k=(-1)^k$ は $\ell^\infty$ に属するが、どの $p<\infty$ の $\ell^p$ にも属さない（$\sum1=\infty$）。$a_k=\frac1{k^{1/p}}$ は $\ell^r$（$r>p$）に属するが $\ell^p$ に属さない（[[series-tests#thm-p-series|p 級数]]）。` },
      { t: 'prop', id: 'prop-lp-vs', title: 'ℓᵖ は線形空間', yomi: 'えるぴーはせんけいくうかん', imp: 2, text: R`$1\le p\le\infty$、$a,b\in\ell^p$、$\alpha\in\mathbb{K}$ ならば $a+b,\ \alpha a\in\ell^p$。` },
      {
        t: 'proof',
        steps: [
          { text: R`$\alpha a$：$\sum|\alpha a_k|^p=|\alpha|^p\sum|a_k|^p<\infty$（$p=\infty$ なら $\sup|\alpha a_k|=|\alpha|\sup|a_k|$）。` },
          {
            text: R`$a+b$（$1\le p<\infty$）：各 $k$ で`,
            eqs: [
              [R`|a_k+b_k|^p\le(|a_k|+|b_k|)^p\le\bigl(2\max\{|a_k|,|b_k|\}\bigr)^p`, R`三角不等式・$t\mapsto t^p$ は増加`],
              [R`\phantom{|a_k+b_k|^p}=2^p\max\{|a_k|^p,|b_k|^p\}\le2^p\bigl(|a_k|^p+|b_k|^p\bigr).`, R`最大値は和以下`],
            ],
          },
          { text: R`右辺は収束級数の定数倍の和なので、[[series-tests#thm-comparison|比較判定法]]より $\sum|a_k+b_k|^p<\infty$。$p=\infty$ なら $|a_k+b_k|\le\sup|a_k|+\sup|b_k|$。線形空間の公理は成分ごとの計算なので $\ell^1$ の場合（[[vector-space#prop-l1-vs|命題]]）と同じ。` },
        ],
      },

      { t: 'h2', id: 'holder', text: 'ヘルダーの不等式とミンコフスキーの不等式' },
      { t: 'thm', id: 'thm-holder', title: 'ヘルダーの不等式', yomi: 'へるだーのふとうしき', imp: 3, text: R`$1\le p,q\le\infty$ は $\frac1p+\frac1q=1$ をみたすとする。$a\in\ell^p$, $b\in\ell^q$ ならば $\{a_kb_k\}\in\ell^1$ で
$$\sum_{k=1}^\infty|a_kb_k|\le\|a\|_{\ell^p}\|b\|_{\ell^q}.$$
特に $p=q=2$ のとき $\sum|a_kb_k|\le\bigl(\sum|a_k|^2\bigr)^{1/2}\bigl(\sum|b_k|^2\bigr)^{1/2}$（コーシー＝シュワルツの不等式の無限版）。` },
      { t: 'strategy', text: R`「正規化」の技：両辺を $\|a\|\|b\|$ で割れば、$\|a\|=\|b\|=1$ の場合に示せばよい。そのときヤングの不等式を各項に使って足すと、右辺は $\frac1p+\frac1q=1$ になる。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>$p=1$, $q=\infty$ の場合。</b>各 $k$ で $|a_kb_k|\le|a_k|\,\|b\|_{\ell^\infty}$。$k=1,\dots,n$ で足すと $\sum_{k=1}^n|a_kb_k|\le\|b\|_{\ell^\infty}\sum_{k=1}^n|a_k|\le\|a\|_{\ell^1}\|b\|_{\ell^\infty}$。正項級数の部分和が有界なので収束し（[[series#prop-positive|命題]]）、和も同じ値以下。$p=\infty$, $q=1$ は $a,b$ の役割を入れかえればよい。（資料では「明らか」とされている部分。）` },
          { text: R`<b>$1<p<\infty$ の場合。</b>$\|a\|_{\ell^p}=0$ なら $a=0$ で両辺 $0$。$\|b\|_{\ell^q}=0$ も同様。以下どちらも正とする。` },
          {
            text: R`各 $k$ で、[[sequence-spaces#lem-young|ヤングの不等式]]を $\frac{|a_k|}{\|a\|_{\ell^p}},\ \frac{|b_k|}{\|b\|_{\ell^q}}\ (\ge0)$ に使うと`,
            eqs: [[R`\frac{|a_k|\,|b_k|}{\|a\|_{\ell^p}\|b\|_{\ell^q}}\le\frac1p\frac{|a_k|^p}{\|a\|_{\ell^p}^p}+\frac1q\frac{|b_k|^q}{\|b\|_{\ell^q}^q}.`, R`ヤングの不等式`]],
          },
          {
            text: R`$k=1,\dots,n$ で足して、右辺を無限和で上から抑えると`,
            eqs: [[R`\frac1{\|a\|_{\ell^p}\|b\|_{\ell^q}}\sum_{k=1}^n|a_kb_k|\le\frac1p\frac{\sum_{k=1}^\infty|a_k|^p}{\|a\|_{\ell^p}^p}+\frac1q\frac{\sum_{k=1}^\infty|b_k|^q}{\|b\|_{\ell^q}^q}=\frac1p+\frac1q=1.`, R`$\|a\|_{\ell^p}^p=\sum|a_k|^p$`]],
          },
          { text: R`両辺に $\|a\|_{\ell^p}\|b\|_{\ell^q}$ を掛けると $\sum_{k=1}^n|a_kb_k|\le\|a\|_{\ell^p}\|b\|_{\ell^q}$。部分和が上に有界なので級数は収束し、和も同じ値以下である。` },
        ],
      },
      { t: 'rem', title: '有限和でも同じ', text: R`有限個の数 $a_1,\dots,a_n$, $b_1,\dots,b_n$ についても $\sum_{k=1}^n|a_kb_k|\le\bigl(\sum_{k=1}^n|a_k|^p\bigr)^{1/p}\bigl(\sum_{k=1}^n|b_k|^q\bigr)^{1/q}$（$n+1$ 項目以降を $0$ とした数列に定理を使えばよい）。次のミンコフスキーの不等式の証明ではこの有限和の形を使う。` },
      { t: 'thm', id: 'thm-minkowski', title: 'ミンコフスキーの不等式（ℓᵖ の三角不等式）', yomi: 'みんこふすきーのふとうしき', imp: 3, text: R`$1\le p\le\infty$、$a,b\in\ell^p$ ならば $\|a+b\|_{\ell^p}\le\|a\|_{\ell^p}+\|b\|_{\ell^p}$。したがって $\|\cdot\|_{\ell^p}$ は $\ell^p$ のノルムであり、$\ell^p$ はノルム空間である。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>$p=1$, $p=\infty$。</b>$p=1$ は[[normed-space#ex-norm-l1|ℓ¹ の例]]。$p=\infty$：各 $k$ で $|a_k+b_k|\le|a_k|+|b_k|\le\sup|a_k|+\sup|b_k|$ で、右辺は $k$ によらないので上限をとる。` },
          {
            text: R`<b>$1<p<\infty$。</b>$q=\frac p{p-1}$ を共役指数とし、$n\in\mathbb{N}$ を固定して $T_n:=\sum_{k=1}^n|a_k+b_k|^p$ とおく。`,
            eqs: [
              [R`T_n=\sum_{k=1}^n|a_k+b_k|\,|a_k+b_k|^{p-1}\le\sum_{k=1}^n|a_k|\,|a_k+b_k|^{p-1}+\sum_{k=1}^n|b_k|\,|a_k+b_k|^{p-1}`, R`三角不等式`],
              [R`\phantom{T_n}\le\Bigl(\sum_{k=1}^n|a_k|^p\Bigr)^{1/p}\Bigl(\sum_{k=1}^n|a_k+b_k|^{(p-1)q}\Bigr)^{1/q}+\Bigl(\sum_{k=1}^n|b_k|^p\Bigr)^{1/p}\Bigl(\sum_{k=1}^n|a_k+b_k|^{(p-1)q}\Bigr)^{1/q}`, R`有限和のヘルダー（2 回）`],
              [R`\phantom{T_n}\le\bigl(\|a\|_{\ell^p}+\|b\|_{\ell^p}\bigr)\,T_n^{1/q}.`, R`$(p-1)q=p$、有限和は無限和以下`],
            ],
          },
          { text: R`$T_n=0$ なら $T_n^{1/p}=0\le\|a\|+\|b\|$。$T_n>0$ なら両辺を $T_n^{1/q}$ で割って $T_n^{1-1/q}=T_n^{1/p}\le\|a\|_{\ell^p}+\|b\|_{\ell^p}$。$n$ は任意で、右辺は $n$ によらないので、$n\to\infty$ として $\|a+b\|_{\ell^p}\le\|a\|_{\ell^p}+\|b\|_{\ell^p}$。` },
          { text: R`ノルムの (i)：$\|a\|_{\ell^p}=0\iff$ すべての $a_k=0$。(ii)：$\|\alpha a\|_{\ell^p}=(|\alpha|^p\sum|a_k|^p)^{1/p}=|\alpha|\|a\|_{\ell^p}$。(iii) が今示した不等式。` },
        ],
      },
      { t: 'rem', title: '資料の証明との違い', text: R`資料は無限和のまま $\|a+b\|^p\le(\|a\|+\|b\|)\|a+b\|^{p-1}$ と計算し、両辺を $\|a+b\|^{p-1}$ で割っている。これは $\|a+b\|_{\ell^p}<\infty$（[[sequence-spaces#prop-lp-vs|$\ell^p$ が線形空間であること]]）を先に示してあるから正当化される。上の証明は有限和 $T_n$ で計算してから極限をとることで、その確認を不要にしている。` },
      { t: 'fig', type: 'lpball', preset: 'p4', caption: R`$\mathbb{R}^2$ での $\|x\|_p=(|x_1|^p+|x_2|^p)^{1/p}$ の単位球。$p\ge1$ ならつねに凸で、これがミンコフスキーの不等式（三角不等式）の幾何的な意味である。$p<1$ ではへこんで凸でなくなり、ノルムにならない。` },

      { t: 'h2', id: 'complete', text: 'ℓᵖ の完備性' },
      { t: 'thm', id: 'thm-lp-complete', title: 'ℓᵖ はバナッハ空間', yomi: 'えるぴーはばなっはくうかん', imp: 3, text: R`$1\le p\le\infty$ について、$\ell^p$ はバナッハ空間である。` },
      { t: 'strategy', text: R`[[banach-space#thm-c-complete|C(I) の完備性]]と同じ 4 ステップ。数列の列 $\{a^{(j)}\}_j$ は「各行が一本の数列」の無限の表で、各列（各成分 $k$）ごとに極限 $c_k$ をとる。無限和のままでは極限と和を入れかえられないので、<em>有限和</em> $\sum_{k=1}^m$ で不等式を作ってから $j$ や $l$ の極限をとり、最後に $m\to\infty$ とする。` },
      {
        t: 'proof',
        steps: [
          { text: R`$1\le p<\infty$ とする。<b>①</b> $\{a^{(j)}\}_{j\in\mathbb{N}}\subset\ell^p$ をコーシー列とする。$\varepsilon>0$ に対して $N=N(\varepsilon)$ があり、$j,l\ge N$ ならば $\|a^{(j)}-a^{(l)}\|_{\ell^p}<\frac\varepsilon2$。` },
          { text: R`<b>②</b> 各 $k$ で $|a^{(j)}_k-a^{(l)}_k|\le\|a^{(j)}-a^{(l)}\|_{\ell^p}$（一つの項は和以下）なので、$\{a^{(j)}_k\}_j$ は $\mathbb{K}$ のコーシー列で、ある $c_k\in\mathbb{K}$ に収束する。$c:=\{c_k\}_{k=1}^\infty$ とおく。` },
          {
            text: R`<b>③</b> $j,l\ge N$、$m\in\mathbb{N}$ を固定すると、有限和は無限和以下なので`,
            eqs: [[R`\Bigl(\sum_{k=1}^m\bigl|a^{(j)}_k-a^{(l)}_k\bigr|^p\Bigr)^{1/p}\le\|a^{(j)}-a^{(l)}\|_{\ell^p}<\frac\varepsilon2.`, R`各項は非負`]],
          },
          { text: R`左辺は有限個の項なので、$l\to\infty$ とすると（各 $k$ で $a^{(l)}_k\to c_k$、有限和・べき・絶対値は連続）$\bigl(\sum_{k=1}^m|a^{(j)}_k-c_k|^p\bigr)^{1/p}\le\frac\varepsilon2$。この右辺は $m$ によらないので、正項級数 $\sum_k|a^{(j)}_k-c_k|^p$ の部分和は $(\frac\varepsilon2)^p$ で上に有界で、収束して $\|a^{(j)}-c\|_{\ell^p}\le\frac\varepsilon2<\varepsilon$（$j\ge N$）。` },
          { text: R`<b>④</b> ③ より $a^{(N)}-c\in\ell^p$ なので、$\ell^p$ は線形空間であることから $c=a^{(N)}-(a^{(N)}-c)\in\ell^p$。そして ③ は $a^{(j)}\to c$ in $\ell^p$ を意味する。` },
          { text: R`$p=\infty$ の場合も同じで、③ では $\sup$ の代わりに各 $k$ で $|a^{(j)}_k-a^{(l)}_k|<\frac\varepsilon2$ から $l\to\infty$ として $|a^{(j)}_k-c_k|\le\frac\varepsilon2$、$k$ について上限をとる。` },
        ],
      },
      { t: 'prop', id: 'prop-lp-incl', title: 'ℓᵖ の包含関係', yomi: 'えるぴーのほうがん', imp: 2, text: R`$1\le p\le r\le\infty$ ならば $\ell^p\subset\ell^r$ で、$\|a\|_{\ell^r}\le\|a\|_{\ell^p}$（$a\in\ell^p$）。` },
      { t: 'proof', steps: [{ text: R`$a=0$ なら明らか。$a\ne0$ のとき $b:=\frac a{\|a\|_{\ell^p}}$ とおくと $\|b\|_{\ell^p}=1$ なので各 $|b_k|\le1$。$r=\infty$ なら $\sup|b_k|\le1$。$r<\infty$ なら $|b_k|^r\le|b_k|^p$（$0\le t\le1$、$r\ge p$ で $t^r\le t^p$）なので $\sum|b_k|^r\le\sum|b_k|^p=1$、すなわち $\|b\|_{\ell^r}\le1$。斉次性で戻して $\|a\|_{\ell^r}\le\|a\|_{\ell^p}$。` }] },
      { t: 'rem', title: '関数の Lᵖ では向きが逆になることがある', text: R`数列では「項は $0$ に近づくしかない（遠くで小さい）」ので、$p$ が大きいほど条件がゆるく、$\ell^p$ は大きくなる。関数の $L^p(0,1)$（有限区間）では逆に $L^r\subset L^p$（$p\le r$）となる。$\mathbb{R}$ 全体の $L^p(\mathbb{R})$ ではどちらの包含も成り立たない（[[lebesgue-lp|ルベーグ空間]]）。` },
      { t: 'qa', q: R`なぜ $p<1$ は考えない？`, a: R`$p<1$ では三角不等式が成り立たない。$a=(1,0,0,\dots)$、$b=(0,1,0,\dots)$ とすると $\|a\|=\|b\|=1$ だが $\|a+b\|=2^{1/p}>2$。単位球が凸でなくなることに対応する（上の図）。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$a=\{2^{-k}\}_{k=1}^\infty$ について $\|a\|_{\ell^1}$, $\|a\|_{\ell^2}$, $\|a\|_{\ell^\infty}$ を求めよ。`, hint: R`等比級数。`, answer: R`$\|a\|_{\ell^1}=\sum2^{-k}=1$。$\|a\|_{\ell^2}^2=\sum4^{-k}=\frac{1/4}{1-1/4}=\frac13$ より $\|a\|_{\ell^2}=\frac1{\sqrt3}$。$\|a\|_{\ell^\infty}=\frac12$。$\|a\|_\infty\le\|a\|_2\le\|a\|_1$ と包含関係の不等式に合っている。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`ヘルダーの不等式を使って、$a\in\ell^2$ ならば $\sum_{k=1}^\infty\dfrac{|a_k|}k<\infty$ であることを示せ。`, hint: R`$b_k=\frac1k\in\ell^2$。`, answer: R`$b_k:=\frac1k$ とすると $\sum b_k^2=\sum\frac1{k^2}<\infty$ なので $b\in\ell^2$。$p=q=2$ のヘルダーの不等式より $\sum\frac{|a_k|}k=\sum|a_kb_k|\le\|a\|_{\ell^2}\|b\|_{\ell^2}<\infty$。`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`$c_0:=\{a\in\ell^\infty\mid a_k\to0\}$ は $\ell^\infty$ の閉部分空間であることを示せ。`, hint: R`$a^{(j)}\to a$ in $\ell^\infty$、各 $a^{(j)}\in c_0$。$|a_k|\le|a_k-a^{(j)}_k|+|a^{(j)}_k|$。`, answer: R`部分空間であることは極限の四則演算から。$a^{(j)}\in c_0$、$\|a^{(j)}-a\|_{\ell^\infty}\to0$ とする。$\varepsilon>0$ に対し $\|a^{(J)}-a\|_\infty<\frac\varepsilon2$ となる $J$ をとり、$a^{(J)}_k\to0$ より $k\ge K$ で $|a^{(J)}_k|<\frac\varepsilon2$ となる $K$ をとる。$k\ge K$ なら $|a_k|\le|a_k-a^{(J)}_k|+|a^{(J)}_k|<\varepsilon$。よって $a\in c_0$ で、点列による特徴づけより閉集合。`, space: 8 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'hilbert-space',
    title: 'ヒルベルト空間',
    sub: '内積・コーシー＝シュワルツ・中線定理（資料 第 7 章）',
    yomi: 'ひるべるとくうかん',
    aliases: ['ヒルベルト空間', 'ひるべるとくうかん', 'Hilbert', '内積空間', 'ないせきくうかん', '内積', 'ないせき', 'コーシー・シュワルツの不等式', 'しゅわるつ', '中線定理', 'ちゅうせんていり', '平行四辺形の法則', 'l2', 'ℓ2'],
    kind: '用語',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['normed-space', 'banach-space', 'sequence-spaces', 'euclidean-space'],
    related: ['projection-theorem', 'orthonormal-system', 'fourier-series', 'sobolev'],
    notation: [
      R`$\mathbb{K}=\mathbb{R}$ または $\mathbb{C}$。$X$：$\mathbb{K}$ 上の線形空間。`,
      R`$(\cdot,\cdot)_X:X\times X\to\mathbb{K}$：内積。$(f,g)_X$ を $(f,g)$ とも書く。本によっては $\langle f,g\rangle$。`,
      NOTE_CONJ,
      R`$\operatorname{Re}z$：複素数 $z$ の実部。$|\operatorname{Re}z|\le|z|$。`,
    ],
    synopsis: R`内積は、ベクトルの「長さ」だけでなく「角度」（直交）まで測る道具である。内積から $\|f\|=\sqrt{(f,f)}$ でノルムが定まり、その三角不等式はコーシー＝シュワルツの不等式から出る。このノルムで完備な内積空間をヒルベルト空間という。$\mathbb{K}^n$、$\ell^2$、そして $L^2$ が代表例である。内積から来るノルムは中線定理をみたし、$\ell^p$（$p\ne2$）や最大値ノルムはこれをみたさない。`,
    body: [
      { t: 'h2', id: 'def', text: '内積空間' },
      { t: 'p', text: R`$\mathbb{R}^n$ の任意のベクトルは、正規直交基底 $e_1,\dots,e_n$ を使って $x=\sum_{j=1}^n(x,e_j)e_j$ と書ける。内積があると、こうした「向き」に関する幾何学的な性質を表現できる。無限次元の空間にも内積という構造を入れると都合がよい、というのがヒルベルト空間を考える動機である。` },
      { t: 'def', id: 'def-inner', title: '内積・内積空間', yomi: 'ないせき', imp: 3, text: R`$\mathbb{K}$ 上の線形空間 $X$ について、次の (i)〜(iv) をみたす写像 $(\cdot,\cdot)_X:X\times X\to\mathbb{K}$ を<b class="term">内積</b>という。
<ol type="i"><li>$(f,f)_X\ge0$（特に実数）、かつ $(f,f)_X=0\iff f=0$（$f\in X$）。</li><li>$(f,g)_X=\overline{(g,f)_X}$（$f,g\in X$）。</li><li>$(f_1+f_2,g)_X=(f_1,g)_X+(f_2,g)_X$（$f_1,f_2,g\in X$）。</li><li>$(\alpha f,g)_X=\alpha(f,g)_X$（$\alpha\in\mathbb{K}$, $f,g\in X$）。</li></ol>内積の定義された線形空間を<b class="term">内積空間</b>という。` },
      { t: 'rem', title: '資料の (ii) の横線について', text: R`資料の PDF では (ii) が $(f,g)_X=(g,f)_X$ と表示されることがあるが、複素数の場合は右辺に複素共役の横線が付く（$\overline{(g,f)}$）。横線がないと、$\mathbb{K}=\mathbb{C}$ で (i)(iv) と矛盾する：$(if,if)=i(f,if)=i\,\overline{(if,f)}=i\cdot\overline{i(f,f)}=i\cdot(-i)(f,f)=(f,f)$ となるのは共役を付けたときで、付けないと $(if,if)=i^2(f,f)=-(f,f)\le0$ になってしまう。` },
      { t: 'prop', id: 'prop-inner-conj', title: '第 2 変数については共役線形', yomi: 'きょうやくせんけい', imp: 2, text: R`内積空間で、$f,g,g_1,g_2\in X$、$\alpha\in\mathbb{K}$ について $(f,g_1+g_2)=(f,g_1)+(f,g_2)$、$(f,\alpha g)=\overline\alpha(f,g)$、$(f,0)=(0,f)=0$。` },
      { t: 'proof', steps: [{ text: R`(ii)(iii)(ii) の順に使って $(f,g_1+g_2)=\overline{(g_1+g_2,f)}=\overline{(g_1,f)+(g_2,f)}=\overline{(g_1,f)}+\overline{(g_2,f)}=(f,g_1)+(f,g_2)$。同様に $(f,\alpha g)=\overline{(\alpha g,f)}=\overline{\alpha(g,f)}=\overline\alpha\,\overline{(g,f)}=\overline\alpha(f,g)$。$(0,f)=(0\cdot0,f)=0\cdot(0,f)=0$（(iv)）、$(f,0)=\overline{(0,f)}=0$。` }] },
      { t: 'def', id: 'def-inner-norm', title: '内積から定まるノルム', yomi: 'ないせきからさだまるのるむ', imp: 2, text: R`内積空間 $X$ において $\|f\|_X:=\sqrt{(f,f)_X}$（$f\in X$）と定める。（これがノルムであることは、次の不等式のあとで示す。）` },
      { t: 'thm', id: 'thm-cs', title: 'コーシー＝シュワルツの不等式', yomi: 'こーしー・しゅわるつのふとうしき', imp: 3, text: R`内積空間 $X$ の任意の $f,g$ について $|(f,g)_X|\le\|f\|_X\|g\|_X$。等号は $f,g$ の一方が他方のスカラー倍のときに限る。` },
      {
        t: 'proof',
        steps: [
          { text: R`$g=0$ なら両辺 $0$。$g\ne0$ なら $\|g\|^2>0$。$\alpha:=-\dfrac{(f,g)}{\|g\|^2}\in\mathbb{K}$ とおく（[[euclidean-space#thm-cs-rn|ℝⁿ の場合]]と同じ選び方）。` },
          {
            text: R`内積の性質と[[hilbert-space#prop-inner-conj|共役線形性]]で展開すると`,
            eqs: [
              [R`0\le(f+\alpha g,f+\alpha g)=\|f\|^2+\overline\alpha(f,g)+\alpha(g,f)+\alpha\overline\alpha\|g\|^2`, R`(i)(iii)(iv) と共役線形性`],
              [R`\phantom{0}=\|f\|^2-\frac{|(f,g)|^2}{\|g\|^2}-\frac{|(f,g)|^2}{\|g\|^2}+\frac{|(f,g)|^2}{\|g\|^2}=\|f\|^2-\frac{|(f,g)|^2}{\|g\|^2}.`, R`$\overline\alpha(f,g)=-\frac{\overline{(f,g)}(f,g)}{\|g\|^2}$、$(g,f)=\overline{(f,g)}$`],
            ],
          },
          { text: R`よって $|(f,g)|^2\le\|f\|^2\|g\|^2$、平方根をとって結論。等号なら $\|f+\alpha g\|^2=0$ で $f=-\alpha g$。逆に $f=\beta g$ なら $|(f,g)|=|\beta|\|g\|^2=\|f\|\|g\|$。` },
        ],
      },
      { t: 'thm', id: 'thm-inner-norm', title: '内積から定まるノルムはノルム', yomi: 'ないせきのるむ', imp: 3, text: R`内積空間 $X$ において $\|f\|_X=\sqrt{(f,f)_X}$ はノルムである。` },
      {
        t: 'proof',
        steps: [
          { text: R`(i) は内積の (i)。(ii)：$\|\alpha f\|^2=(\alpha f,\alpha f)=\alpha\overline\alpha(f,f)=|\alpha|^2\|f\|^2$。` },
          {
            text: R`(iii)：`,
            eqs: [
              [R`\|f+g\|^2=(f+g,f+g)=\|f\|^2+(f,g)+(g,f)+\|g\|^2=\|f\|^2+2\operatorname{Re}(f,g)+\|g\|^2`, R`展開・$(g,f)=\overline{(f,g)}$`],
              [R`\phantom{\|f+g\|^2}\le\|f\|^2+2|(f,g)|+\|g\|^2\le\|f\|^2+2\|f\|\|g\|+\|g\|^2=(\|f\|+\|g\|)^2.`, R`$\operatorname{Re}z\le|z|$・コーシー＝シュワルツ`],
            ],
          },
          { text: R`両辺の非負の平方根をとって $\|f+g\|\le\|f\|+\|g\|$。` },
        ],
      },
      { t: 'prop', id: 'prop-inner-cont', title: '内積の連続性', yomi: 'ないせきのれんぞくせい', imp: 2, text: R`内積空間で $f_k\to f$、$g_k\to g$ ならば $(f_k,g_k)\to(f,g)$。特に、$g$ を固定すると $(f_k,g)\to(f,g)$。` },
      { t: 'proof', steps: [{ text: R`$(f_k,g_k)-(f,g)=(f_k-f,g_k)+(f,g_k-g)$ なので、コーシー＝シュワルツより $|(f_k,g_k)-(f,g)|\le\|f_k-f\|\|g_k\|+\|f\|\|g_k-g\|$。$\{g_k\}$ は収束列なので $\|g_k\|$ は有界（$\|g_k\|\le\|g_k-g\|+\|g\|$）で、右辺は $0$ に収束する。` }] },
      { t: 'note', title: '「極限と内積は入れかえてよい」', text: R`この命題は、後の章で何度も使う：$\left(\sum_{j=1}^\infty\alpha_jf_j,\ g\right)=\sum_{j=1}^\infty\alpha_j(f_j,g)$（部分和の極限と内積の交換）。資料の脚注「内積の連続性を用いた」はこれのことである。` },

      { t: 'h2', id: 'hilbert', text: 'ヒルベルト空間' },
      { t: 'def', id: 'def-hilbert', title: 'ヒルベルト空間', yomi: 'ひるべるとくうかん', imp: 3, text: R`内積空間 $X$ が、ノルム $\|f\|_X=\sqrt{(f,f)_X}$ に関して完備であるとき、$X$ を<b class="term">ヒルベルト空間</b>という。ヒルベルト空間は特にバナッハ空間である。` },
      { t: 'ex', id: 'ex-hilbert', title: 'ヒルベルト空間の例', text: R`<ol><li>$\mathbb{R}^n$：$(x,y)=x\cdot y=\sum x_jy_j$。完備性は[[euclidean-space#thm-rn-complete|ℝⁿ の完備性]]。</li><li>$\mathbb{C}^n$：$(z,w)=\sum_{j=1}^nz_j\overline{w_j}$。$z=x+iy$、$w=u+iv$（$x,y,u,v\in\mathbb{R}^n$）と書くと、$(z,w)=x\cdot u+y\cdot v+i(y\cdot u-x\cdot v)$ で、$\|z\|^2=\|x\|^2+\|y\|^2$。</li><li>$\ell^2$：$(a,b)_{\ell^2}=\sum_{k=1}^\infty a_k\overline{b_k}$。級数は $p=q=2$ の[[sequence-spaces#thm-holder|ヘルダーの不等式]]より絶対収束し、内積の公理は有限和の計算と極限から従う。$\|a\|_{\ell^2}=\sqrt{(a,a)}$ で、完備性は[[sequence-spaces#thm-lp-complete|ℓᵖ の完備性]]。</li><li>$L^2(\Omega)$：$(f,g)=\int_\Omega f\overline g\,dx$。ルベーグ積分で定義され、完備（[[lebesgue-lp|ルベーグ空間]]）。偏微分方程式の研究でもっとも基本的なヒルベルト空間である。</li></ol>` },
      { t: 'ex', id: 'ex-c-l2', title: 'C([a, b]) に積分の内積を入れても完備でない', text: R`$f,g\in C([a,b])$ について $(f,g):=\int_a^bf(x)\overline{g(x)}\,dx$ は内積で、$C([a,b])$ は内積空間になる（(i) の「$=0\Rightarrow f=0$」に連続性を使う）。しかしヒルベルト空間ではない。実際、コーシー＝シュワルツ（$|f|$ と $1$ に使う）より $\|f\|_{R^1}=\int_a^b|f|\cdot1\le\|f\|_2\sqrt{b-a}$ なので、[[banach-space#ex-c-l1|坂の関数列]] $f_k$ は $\|\cdot\|_2$ でもコーシー列であり（$\|f_k-f_l\|_2^2\le\int|f_k-f_l|\le\frac1{4l}$、差は $0$ と $1$ の間にあるから）、もし $\|\cdot\|_2$ で連続関数 $g$ に収束すれば $\|\cdot\|_{R^1}$ でも $g$ に収束することになって、例の結論に矛盾する。この空間を完備にしたもの（完備化）が $L^2(a,b)$ である。` },

      { t: 'h2', id: 'parallelogram', text: '中線定理' },
      { t: 'thm', id: 'thm-parallelogram', title: '中線定理（平行四辺形の法則）', yomi: 'ちゅうせんていり', imp: 3, text: R`内積空間 $X$ の任意の $f,g$ について
$$\|f+g\|_X^2+\|f-g\|_X^2=2\bigl(\|f\|_X^2+\|g\|_X^2\bigr).$$` },
      { t: 'proof', steps: [{ text: R`$\|f\pm g\|^2=\|f\|^2\pm(f,g)\pm(g,f)+\|g\|^2$（複号同順）を足すと、$(f,g)$ と $(g,f)$ の項が打ち消し合って $2\|f\|^2+2\|g\|^2$。` }] },
      { t: 'note', title: '言い換え', text: R`平行四辺形の 2 本の対角線の長さの 2 乗の和は、4 辺の長さの 2 乗の和に等しい。[[projection-theorem|射影定理]]の証明で、最小化列がコーシー列になることを示すのに使う。` },
      { t: 'rem', title: '内積から来ないノルム', text: R`ノルムが内積から来るなら中線定理が成り立つので、成り立たないノルムは内積から来ない。$\ell^p$ で $f=e^{(1)}$、$g=e^{(2)}$ とすると左辺は $2\cdot2^{2/p}$、右辺は $4$ で、等しいのは $p=2$ のときだけ。$C([0,1])$ の最大値ノルムでは $f=1$、$g=x$ とすると $\|f+g\|^2+\|f-g\|^2=4+1=5\ne4=2(1+1)$。したがって $\ell^p$（$p\ne2$）や最大値ノルムの $C([0,1])$ はヒルベルト空間ではない（逆に、中線定理をみたすノルムは内積から来ることが知られている：ジョルダン＝フォン・ノイマンの定理）。` },
      { t: 'qa', q: R`ヒルベルト空間とバナッハ空間の違いは？`, a: R`ヒルベルト空間はバナッハ空間のうち、ノルムが内積から来る特別なもの。内積があると「直交」が定義でき、[[projection-theorem|射影定理]]（最も近い点の存在と直交分解）や[[orthonormal-system|正規直交系による展開]]が使える。一般のバナッハ空間にはこうした幾何学的な道具がない。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\mathbb{K}=\mathbb{R}$ の内積空間で、$(f,g)=\frac14\bigl(\|f+g\|^2-\|f-g\|^2\bigr)$（偏極恒等式）を示せ。`, hint: R`展開して引く。`, answer: R`$\|f\pm g\|^2=\|f\|^2\pm2(f,g)+\|g\|^2$（実数なので $(g,f)=(f,g)$）。引くと $\|f+g\|^2-\|f-g\|^2=4(f,g)$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\ell^2$ において $(a,b)_{\ell^2}=\sum a_k\overline{b_k}$ が内積の公理 (i)〜(iv) をみたすことを確かめよ。`, hint: R`級数の絶対収束はヘルダー。各公理は有限和で確かめて極限。`, answer: R`ヘルダーより $\sum|a_k\overline{b_k}|\le\|a\|_{\ell^2}\|b\|_{\ell^2}<\infty$ なので級数は絶対収束する。(i) $(a,a)=\sum|a_k|^2\ge0$、$=0$ なら各 $a_k=0$。(ii) 部分和で $\sum_{k\le n}a_k\overline{b_k}=\overline{\sum_{k\le n}b_k\overline{a_k}}$、共役は連続なので極限でも成り立つ。(iii)(iv) は部分和の線形性と[[series#prop-linear|級数の線形性]]。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'projection-theorem',
    title: '射影定理',
    sub: '直交補空間・最近点・直交分解（資料 第 8 章）',
    yomi: 'しゃえいていり',
    aliases: ['射影定理', 'しゃえいていり', '直交', 'ちょっこう', '直交補空間', 'ちょっこうほくうかん', '直和', 'ちょくわ', '正射影', 'せいしゃえい', '直交射影', 'ちょっこうしゃえい', '最近点', 'さいきんてん', 'ピタゴラスの定理'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['hilbert-space', 'closure', 'banach-space'],
    related: ['orthonormal-system', 'operator-norm'],
    notation: [
      R`$X$：内積空間（射影定理ではヒルベルト空間）。$f\perp g$ $:\Longleftrightarrow$ $(f,g)_X=0$（$\perp$ は垂直記号）。`,
      R`$L\subset X$：部分空間。$L^\perp:=\{f\in X\mid f\perp L\}$：直交補空間。$f\perp L$ は「すべての $g\in L$ で $(f,g)=0$」。`,
      R`$\delta:=\inf_{\xi\in L}\|f-\xi\|_X$：$f$ と $L$ の距離（下限なので存在する。[[supremum#cor-inf|下限]]）。`,
      R`$L_1\oplus L_2$：直交する閉部分空間の直和。$P_L$：$L$ への正射影作用素。`,
    ],
    synopsis: R`ヒルベルト空間 $X$ の閉部分空間 $L$ について、任意の $f\in X$ は「$L$ の元」と「$L$ に直交する元」の和に一意に分解される：$f=g+h$、$g\in L$、$h\in L^\perp$。$g$ は $L$ の中で $f$ に最も近い点であり、$f$ から $L$ に「真上から影を落とした」点である。証明では中線定理と完備性が本質的に使われる。`,
    body: [
      { t: 'h2', id: 'orth', text: '直交と直交補空間' },
      { t: 'def', id: 'def-orth', title: '直交', yomi: 'ちょっこう', imp: 3, text: R`内積空間 $X$ の元 $f,g$ が $(f,g)_X=0$ をみたすとき、$f$ と $g$ は<b class="term">直交する</b>といい $f\perp g$ と書く。部分空間 $A,B\subset X$ が互いに直交するとは、すべての $f\in A$, $g\in B$ で $(f,g)_X=0$ となることをいい $A\perp B$ と書く。$\{f\}\perp B$ を $f\perp B$ と書く。` },
      { t: 'prop', id: 'prop-perp-x', title: 'X 全体と直交する元は 0', yomi: 'ぜんたいとちょっこう', imp: 2, text: R`$f\in X$ が $f\perp X$ ならば $f=0$。` },
      { t: 'proof', steps: [{ text: R`仮定より任意の $g\in X$ で $(f,g)=0$。特に $g=f$ として $\|f\|^2=(f,f)=0$、内積の (i) より $f=0$。` }] },
      { t: 'def', id: 'def-orth-comp', title: '直交補空間', yomi: 'ちょっこうほくうかん', imp: 3, text: R`内積空間 $X$ の部分空間 $L$ に対して $L^\perp:=\{f\in X\mid f\perp L\}$ を $L$ の<b class="term">直交補空間</b>という。` },
      { t: 'thm', id: 'thm-perp-closed', title: '直交補空間は閉部分空間', yomi: 'ちょっこうほくうかんはへいぶぶんくうかん', imp: 3, text: R`$L^\perp$ は $X$ の閉部分空間である。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>部分空間。</b>$0\in L^\perp$（$(0,g)=0$）。$f_1,f_2\in L^\perp$、$\alpha,\beta\in\mathbb{K}$ なら、任意の $g\in L$ で $(\alpha f_1+\beta f_2,g)=\alpha(f_1,g)+\beta(f_2,g)=0$。` },
          { text: R`<b>閉集合。</b>$\{f_k\}\subset L^\perp$ が $f\in X$ に収束するとする。$g\in L$ を任意にとると、コーシー＝シュワルツより $|(f_k,g)-(f,g)|=|(f_k-f,g)|\le\|f_k-f\|\|g\|\to0$。左辺の $(f_k,g)=0$ なので $(f,g)=0$。$g$ は任意なので $f\in L^\perp$。[[closure#cor-closed-seq|点列による特徴づけ]]より閉集合。` },
        ],
      },
      { t: 'thm', id: 'thm-pythagoras', title: 'ピタゴラスの定理', yomi: 'ぴたごらすのていり', imp: 2, text: R`$f\perp g$ ならば $\|f+g\|_X^2=\|f\|_X^2+\|g\|_X^2$。` },
      { t: 'proof', steps: [{ text: R`$\|f+g\|^2=\|f\|^2+(f,g)+(g,f)+\|g\|^2$ で、$(f,g)=0$、$(g,f)=\overline{(f,g)}=0$。` }] },

      { t: 'h2', id: 'proj', text: '射影定理' },
      { t: 'thm', id: 'thm-projection', title: '射影定理', yomi: 'しゃえいていり', imp: 3, text: R`$X$ をヒルベルト空間、$L\subset X$ を閉部分空間とする。任意の $f\in X$ は
$$f=g+h\qquad(g\in L,\ h\in L^\perp)$$
と一意的に分解される。さらに $g$ は $\|f-g\|_X=\inf_{\xi\in L}\|f-\xi\|_X$ をみたす（$g$ は $L$ の中で $f$ に最も近い点）。` },
      { t: 'html', html: projSvg, caption: R`$f$ を $L$ に「真上から」射影した点が $g=P_Lf$。差 $h=f-g$ は $L$ に直交し、$L$ の他の点 $\xi$ は $g$ より $f$ から遠い（ピタゴラスの定理：$\|f-\xi\|^2=\|h\|^2+\|g-\xi\|^2$）。` },
      { t: 'strategy', text: R`一意性は直交性から簡単に出る。存在が本題で、3 段階に分ける。① 距離 $\delta=\inf_{\xi\in L}\|f-\xi\|$ に近づく点列 $\xi_k\in L$ をとる。② 中線定理で $\{\xi_k\}$ がコーシー列であることを示し、完備性と $L$ の閉性から極限 $g\in L$ をとる。③ $h=f-g$ が $L$ に直交することを、$g$ が最小であることから示す。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>一意性。</b>$f=g+h=g'+h'$（$g,g'\in L$、$h,h'\in L^\perp$）とする。$g-g'=h'-h$ で、左辺は $L$ に、右辺は $L^\perp$ に属する（どちらも部分空間）。よって $\|g-g'\|^2=(g-g',h'-h)=0$（$L$ の元と $L^\perp$ の元の内積）。すなわち $g=g'$、したがって $h=h'$。` },
          { text: R`<b>① 最小化列。</b>$\delta:=\inf_{\xi\in L}\|f-\xi\|$ とおく（集合 $\{\|f-\xi\|\mid\xi\in L\}$ は空でなく $0$ で下に有界）。[[supremum#cor-inf|下限の特徴づけ]]より、各 $k\in\mathbb{N}$ で $\delta\le\|f-\xi_k\|<\delta+\frac1k$ となる $\xi_k\in L$ がある。したがって $\|f-\xi_k\|\to\delta$。` },
          {
            text: R`<b>② コーシー列。</b>中線定理を $f-\xi_k$ と $f-\xi_j$ に使うと`,
            eqs: [
              [R`\|\xi_k-\xi_j\|^2=\|(f-\xi_j)-(f-\xi_k)\|^2=2\|f-\xi_k\|^2+2\|f-\xi_j\|^2-\|2f-(\xi_k+\xi_j)\|^2`, R`[[hilbert-space#thm-parallelogram|中線定理]]`],
              [R`\phantom{\|\xi_k-\xi_j\|^2}=2\|f-\xi_k\|^2+2\|f-\xi_j\|^2-4\Bigl\|f-\frac{\xi_k+\xi_j}2\Bigr\|^2`, R`斉次性 $\|2u\|^2=4\|u\|^2$`],
              [R`\phantom{\|\xi_k-\xi_j\|^2}\le2\|f-\xi_k\|^2+2\|f-\xi_j\|^2-4\delta^2\ \xrightarrow[k,j\to\infty]{}\ 2\delta^2+2\delta^2-4\delta^2=0.`, R`$\frac{\xi_k+\xi_j}2\in L$（部分空間）なので $\|f-\frac{\xi_k+\xi_j}2\|\ge\delta$`],
            ],
          },
          { text: R`（「$\to0$」の意味：$\varepsilon>0$ に対し、$k\ge N$ で $\|f-\xi_k\|^2<\delta^2+\frac{\varepsilon}4$ となる $N$ をとれば、$k,j\ge N$ で右辺 $<\varepsilon$。）よって $\{\xi_k\}$ は $X$ のコーシー列で、$X$ は完備なので収束し、$L$ は閉集合なので極限 $g$ は $L$ に属する。` },
          { text: R`<b>距離の実現。</b>$\|f-g\|\le\|f-\xi_k\|+\|\xi_k-g\|$ より $0\le\|f-g\|-\delta\le(\|f-\xi_k\|-\delta)+\|\xi_k-g\|\to0$（左の不等号は $g\in L$ と $\delta$ の定義）。よって $\|f-g\|=\delta$。` },
          { text: R`<b>③ 直交性。</b>$h:=f-g$ とし、$\xi\in L$ を任意に固定する。$\gamma:=(h,\xi)\in\mathbb{K}$ とおき、$t\in\mathbb{R}$ について $\varphi(t):=\|h-\gamma t\xi\|^2$ とする。$h-\gamma t\xi=f-(g+\gamma t\xi)$ で $g+\gamma t\xi\in L$ なので、$\varphi(t)\ge\delta^2=\|h\|^2=\varphi(0)$。` },
          {
            text: R`内積を展開すると（$t$ は実数なので $\overline t=t$）`,
            eqs: [[R`\varphi(t)=\|h\|^2-\overline\gamma t(h,\xi)-\gamma t(\xi,h)+|\gamma|^2t^2\|\xi\|^2=\varphi(0)+|\gamma|^2t\bigl(t\|\xi\|^2-2\bigr).`, R`$(h,\xi)=\gamma$、$(\xi,h)=\overline\gamma$`]],
          },
          { text: R`もし $\gamma\ne0$ なら、$\xi\ne0$（$\xi=0$ なら $\gamma=0$）なので $0<t<\frac2{\|\xi\|^2}$ をとると $t\|\xi\|^2-2<0$ で $\varphi(t)<\varphi(0)$ となり矛盾。よって $(h,\xi)=\gamma=0$。$\xi\in L$ は任意なので $h\in L^\perp$。以上で $f=g+h$ と分解できた。` },
        ],
      },
      { t: 'rem', title: '仮定がどこで効いたか', text: R`<ul><li><b>完備性：</b>② でコーシー列の極限をとるところ。完備でない内積空間では、最も近い点が存在しないことがある。</li><li><b>$L$ が閉：</b>② で極限 $g$ が $L$ に残るところ。閉でない部分空間（たとえば $\ell^2$ の $c_{00}$）では、$f$ に限りなく近い点はあっても、最も近い点はないことがある。</li><li><b>$L$ が部分空間：</b>② で中点 $\frac{\xi_k+\xi_j}2\in L$ を使うところ（凸集合でもよい）と、③ で $g+\gamma t\xi\in L$ を使うところ。</li></ul>` },

      { t: 'h2', id: 'sum', text: '直和と正射影作用素' },
      { t: 'def', id: 'def-direct-sum', title: '直和', yomi: 'ちょくわ', imp: 2, text: R`内積空間 $X$ の閉部分空間 $L_1,L_2$ が $L_1\perp L_2$ をみたすとき、$L_1\oplus L_2:=\{f_1+f_2\mid f_1\in L_1,\ f_2\in L_2\}$ を $L_1$ と $L_2$ の<b class="term">直和</b>という。` },
      { t: 'note', title: '射影定理の言い換え', text: R`射影定理は、ヒルベルト空間 $X$ の閉部分空間 $L$ について $X=L\oplus L^\perp$ が成り立ち、しかも分解が一意的である、と言っている。$\mathbb{R}^3$ で $L$ を平面とすれば、$L^\perp$ はその法線方向の直線で、任意のベクトルは「平面上の成分」と「法線方向の成分」に一意に分かれる。` },
      { t: 'def', id: 'def-proj-op', title: '正射影作用素', yomi: 'せいしゃえいさようそ', imp: 2, text: R`ヒルベルト空間 $X$ の閉部分空間 $L$ について、射影定理の分解 $f=g+h$（$g\in L$, $h\in L^\perp$）に対して $P_Lf:=g$ と定めた写像 $P_L:X\to L$ を、$L$ への<b class="term">正射影作用素</b>という。` },
      { t: 'prop', id: 'prop-proj-op', title: '正射影作用素の性質', yomi: 'せいしゃえいのせいしつ', imp: 2, text: R`<ol><li>$P_L$ は線形：$P_L(\alpha f+\beta f')=\alpha P_Lf+\beta P_Lf'$。</li><li>$\|P_Lf\|^2+\|f-P_Lf\|^2=\|f\|^2$、特に $\|P_Lf\|\le\|f\|$。</li><li>$f\in L$ なら $P_Lf=f$、$f\in L^\perp$ なら $P_Lf=0$。特に $P_L^2=P_L$。</li></ol>` },
      { t: 'proof', steps: [{ text: R`(1) $f=g+h$、$f'=g'+h'$ なら $\alpha f+\beta f'=(\alpha g+\beta g')+(\alpha h+\beta h')$ で、第 1 項は $L$、第 2 項は $L^\perp$（どちらも部分空間）に属する。分解の一意性より $P_L(\alpha f+\beta f')=\alpha g+\beta g'$。(2) $g\perp h$ なので[[projection-theorem#thm-pythagoras|ピタゴラス]]。(3) $f\in L$ なら $f=f+0$ が分解、$f\in L^\perp$ なら $f=0+f$。$P_Lf\in L$ なので $P_L(P_Lf)=P_Lf$。` }] },
      { t: 'cor', id: 'cor-perp-zero', title: 'L⊥ = {0} なら L = X', yomi: 'ちょっこうほくうかんがぜろ', imp: 3, text: R`ヒルベルト空間 $X$ の閉部分空間 $L$ について、$L^\perp=\{0\}$ ならば $L=X$。また、部分空間 $M$（閉とは限らない）について、$M^\perp=\{0\}$ ならば $M$ は $X$ で稠密である。` },
      { t: 'proof', steps: [{ text: R`任意の $f\in X$ を $f=g+h$（$g\in L$, $h\in L^\perp=\{0\}$）と分解すると $h=0$ で $f=g\in L$。後半：$L:=\overline M$ は閉部分空間で、$h\perp\overline M$ なら特に $h\perp M$ なので $\overline M^\perp\subset M^\perp=\{0\}$。前半より $\overline M=X$。` }] },
      { t: 'qa', q: R`ヒルベルト空間でなくバナッハ空間だったら？`, a: R`一般のバナッハ空間には直交の概念がないので、射影定理そのものが述べられない。閉部分空間 $L$ に対して「$X=L\oplus M$ となる閉部分空間 $M$（補空間）」が存在するとも限らない。ヒルベルト空間ではつねに $M=L^\perp$ がとれる。これがヒルベルト空間を扱いやすくしている最大の理由である。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$X=\mathbb{R}^3$、$L=\{(x_1,x_2,0)\mid x_1,x_2\in\mathbb{R}\}$ とする。$L^\perp$ を求め、$f=(1,2,3)$ の射影定理による分解を書け。`, hint: R`$L^\perp$ は第 3 軸。`, answer: R`$(y,(x_1,x_2,0))=y_1x_1+y_2x_2=0$ がすべての $x_1,x_2$ で成り立つのは $y_1=y_2=0$ のときなので、$L^\perp=\{(0,0,y_3)\}$。分解は $f=(1,2,0)+(0,0,3)$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`ヒルベルト空間 $X$ の閉部分空間 $L$ について $(L^\perp)^\perp=L$ を示せ。`, hint: R`$L\subset(L^\perp)^\perp$ は定義から。逆は $f\in(L^\perp)^\perp$ を $f=g+h$ と分解して $h=0$ を示す。`, answer: R`$f\in L$ なら任意の $h\in L^\perp$ で $(f,h)=0$ なので $f\in(L^\perp)^\perp$。逆に $f\in(L^\perp)^\perp$ を $f=g+h$（$g\in L$, $h\in L^\perp$）と分解すると、$(f,h)=0$ かつ $(g,h)=0$ なので $\|h\|^2=(f-g,h)=0$。よって $f=g\in L$。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'orthonormal-system',
    title: '正規直交系と完全正規直交系',
    sub: 'ベッセルの不等式・パーセバルの等式（資料 第 9 章）',
    yomi: 'せいきちょっこうけい',
    aliases: ['正規直交系', 'せいきちょっこうけい', '完全正規直交系', 'かんぜんせいきちょっこうけい', 'CONS', 'ONS', '正規直交基底', 'ベッセルの不等式', 'べっせる', 'パーセバルの等式', 'ぱーせばる', 'フーリエ係数', 'ふーりえけいすう', 'グラム・シュミット', 'ぐらむしゅみっと', '直交化'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['projection-theorem', 'hilbert-space', 'series'],
    related: ['fourier-series', 'sobolev'],
    notation: [
      R`$X$：内積空間（多くの定理ではヒルベルト空間）。$\{f_k\}_{k=1}^\infty\subset X$：番号の付いた元の列（資料と同じく可算個の系を扱う）。`,
      R`$\delta_{jm}$：[[sigma-notation#def-kronecker|クロネッカーのデルタ]]。正規直交系は $(f_j,f_m)=\delta_{jm}$ と書ける。`,
      R`$(f,f_k)_X$：$f$ の $f_k$ 方向の<b>フーリエ係数</b>。$\alpha_j:=(f,f_j)$ と略記することがある。`,
      NOTE_CONJ,
      R`$L_0:=\operatorname{span}\{f_k\}$（有限個の線形結合全体）、$L:=\overline{L_0}$（生成する閉部分空間）。$P_L$：$L$ への正射影作用素。`,
    ],
    synopsis: R`互いに直交する長さ $1$ の元の列 $\{f_k\}$ を正規直交系という。$f$ のフーリエ係数 $(f,f_k)$ の 2 乗和は $\|f\|^2$ を超えない（ベッセルの不等式）。どの $f$ も $f=\sum(f,f_k)f_k$ と展開できるとき完全正規直交系といい、それは「パーセバルの等式」「$f_k$ のすべてと直交するのは $0$ だけ」などと同値になる。フーリエ級数はこの一般論の典型例である。`,
    body: [
      { t: 'h2', id: 'def', text: '正規直交系' },
      { t: 'def', id: 'def-ons', title: '正規直交系', yomi: 'せいきちょっこうけい', imp: 3, text: R`内積空間 $X$ の部分集合 $A$ が<b class="term">正規直交系</b>であるとは、任意の $f,g\in A$ について
$$(f,g)_X=\begin{cases}1&(f=g)\\0&(f\ne g)\end{cases}$$
が成り立つことをいう。番号付きの列 $\{f_k\}$ なら $(f_j,f_m)=\delta_{jm}$。` },
      { t: 'ex', id: 'ex-ons', title: '例', text: R`<ol><li>$\mathbb{R}^3$ の $e_1=(1,0,0)$, $e_2=(0,1,0)$, $e_3=(0,0,1)$。</li><li>$\ell^2$ の $e^{(j)}$（$j$ 番目だけ $1$）：$(e^{(j)},e^{(m)})=\sum_ke^{(j)}_ke^{(m)}_k=\delta_{jm}$。</li><li>$C([-\pi,\pi])$（複素数値）に内積 $(f,g)=\int_{-\pi}^\pi f\overline g\,dx$ を入れると、$e_k(x):=\frac1{\sqrt{2\pi}}e^{ikx}$（$k\in\mathbb{Z}$）は正規直交系：$(e_k,e_m)=\frac1{2\pi}\int_{-\pi}^\pi e^{i(k-m)x}dx=\delta_{km}$（$k\ne m$ なら $\bigl[\frac{e^{i(k-m)x}}{i(k-m)}\bigr]_{-\pi}^\pi=0$）。これが[[fourier-series|フーリエ級数]]の正規直交系である。</li></ol>` },
      { t: 'prop', id: 'prop-ons-inner', title: '有限和の内積', yomi: 'ゆうげんわのないせき', imp: 2, text: R`$\{f_k\}$ を正規直交系、$\alpha_j,\beta_m\in\mathbb{K}$ とすると、$n\in\mathbb{N}$ について
$$\Bigl(\sum_{j=1}^n\alpha_jf_j,\ \sum_{m=1}^n\beta_mf_m\Bigr)_X=\sum_{j=1}^n\alpha_j\overline{\beta_j},\qquad\Bigl\|\sum_{j=1}^n\alpha_jf_j\Bigr\|_X^2=\sum_{j=1}^n|\alpha_j|^2.$$` },
      {
        t: 'proof',
        steps: [
          {
            text: R`内積の第 1 変数の線形性と第 2 変数の[[hilbert-space#prop-inner-conj|共役線形性]]より`,
            eqs: [
              [R`\Bigl(\sum_{j=1}^n\alpha_jf_j,\sum_{m=1}^n\beta_mf_m\Bigr)=\sum_{j=1}^n\sum_{m=1}^n\alpha_j\overline{\beta_m}(f_j,f_m)`, R`線形性・共役線形性`],
              [R`\phantom{\Bigl(\sum\alpha_jf_j,\sum\beta_mf_m\Bigr)}=\sum_{j=1}^n\alpha_j\sum_{m=1}^n\overline{\beta_m}\delta_{jm}=\sum_{j=1}^n\alpha_j\overline{\beta_j}.`, R`正規直交性・$\sum_m\overline{\beta_m}\delta_{jm}=\overline{\beta_j}$`],
            ],
          },
          { text: R`$\beta_j=\alpha_j$ とすれば $\alpha_j\overline{\alpha_j}=|\alpha_j|^2$ より後半。（資料の式では共役の横線が表示されていないことがあるが、$\mathbb{K}=\mathbb{C}$ では必要である。）` },
        ],
      },

      { t: 'h2', id: 'bessel', text: 'ベッセルの不等式' },
      { t: 'thm', id: 'thm-bessel', title: 'ベッセルの不等式', yomi: 'べっせるのふとうしき', imp: 3, text: R`$X$ を内積空間、$\{f_k\}$ を正規直交系とする。任意の $f\in X$ について $\sum_{k=1}^\infty|(f,f_k)_X|^2$ は収束し、
$$\sum_{k=1}^\infty|(f,f_k)_X|^2\le\|f\|_X^2.$$` },
      {
        t: 'proof',
        steps: [
          {
            text: R`$\alpha_j:=(f,f_j)$ とおく。$n\in\mathbb{N}$ について`,
            eqs: [
              [R`0\le\Bigl\|f-\sum_{j=1}^n\alpha_jf_j\Bigr\|^2=\|f\|^2-\sum_{j=1}^n\overline{\alpha_j}(f,f_j)-\sum_{j=1}^n\alpha_j(f_j,f)+\sum_{j=1}^n|\alpha_j|^2`, R`展開と[[orthonormal-system#prop-ons-inner|命題]]`],
              [R`\phantom{0}=\|f\|^2-\sum_{j=1}^n|\alpha_j|^2-\sum_{j=1}^n|\alpha_j|^2+\sum_{j=1}^n|\alpha_j|^2=\|f\|^2-\sum_{j=1}^n|\alpha_j|^2.`, R`$(f,f_j)=\alpha_j$、$(f_j,f)=\overline{\alpha_j}$`],
            ],
          },
          { text: R`よって $\sum_{j=1}^n|\alpha_j|^2\le\|f\|^2$。左辺は正項級数の部分和で、上に有界なので収束し（資料の脚注：上に有界な単調増加列は収束する。[[monotone-convergence#thm-mct|単調収束定理]]）、和も $\|f\|^2$ 以下。` },
        ],
      },
      { t: 'note', title: '意味', text: R`$\sum_{j=1}^n\alpha_jf_j$ は $f$ を $f_1,\dots,f_n$ の方向に分解した成分の和で、計算の途中で $\|f-\sum\alpha_jf_j\|^2=\|f\|^2-\sum|\alpha_j|^2$ を得た。「影の長さの 2 乗の合計は、元の長さの 2 乗を超えない」。等号（パーセバルの等式）が成り立つかどうかが、正規直交系が「十分たくさんあるか（完全か）」の判定になる。` },

      { t: 'h2', id: 'proj', text: '正射影の展開' },
      { t: 'thm', id: 'thm-proj-expansion', title: '正射影の正規直交展開', yomi: 'せいしゃえいのてんかい', imp: 3, text: R`$X$ をヒルベルト空間、$\{f_k\}$ を正規直交系、$L:=\overline{\operatorname{span}\{f_k\}}$ とする。任意の $f\in X$ について、級数 $\sum_{k=1}^\infty(f,f_k)f_k$ は $X$ で収束し
$$P_Lf=\sum_{k=1}^\infty(f,f_k)_Xf_k.$$
さらに任意の $f,f'\in X$ について $(P_Lf,P_Lf')_X=\sum_{k=1}^\infty(f,f_k)_X\overline{(f',f_k)_X}$（右辺は絶対収束する）。` },
      {
        t: 'proof',
        steps: [
          {
            text: R`<b>収束。</b>$\alpha_j:=(f,f_j)$、$s_k:=\sum_{j=1}^k\alpha_jf_j$ とおく。$k>l$ なら`,
            eqs: [[R`\|s_k-s_l\|^2=\Bigl\|\sum_{j=l+1}^k\alpha_jf_j\Bigr\|^2=\sum_{j=l+1}^k|\alpha_j|^2=\sum_{j=1}^k|\alpha_j|^2-\sum_{j=1}^l|\alpha_j|^2\xrightarrow[k>l\to\infty]{}0.`, R`[[orthonormal-system#prop-ons-inner|命題]]・ベッセルより $\sum|\alpha_j|^2$ は収束（コーシー条件）`]],
          },
          { text: R`よって $\{s_k\}$ はコーシー列で、$X$ は完備なので極限 $g:=\sum_{j=1}^\infty\alpha_jf_j$ をもつ。各 $s_k\in\operatorname{span}\{f_j\}\subset L$ で $L$ は閉なので $g\in L$。` },
          { text: R`<b>$f-g\perp L$。</b>$m\in\mathbb{N}$ を固定する。$k\ge m$ なら $(f-s_k,f_m)=(f,f_m)-\sum_{j=1}^k\alpha_j(f_j,f_m)=\alpha_m-\alpha_m=0$。[[hilbert-space#prop-inner-cont|内積の連続性]]より $(f-g,f_m)=\lim_k(f-s_k,f_m)=0$。よって $f-g$ は各 $f_m$ と直交し、線形性より $\operatorname{span}\{f_k\}$ の元とも直交する。$\xi\in L$ には $\xi_q\to\xi$ となる $\xi_q\in\operatorname{span}\{f_k\}$ があり、$(f-g,\xi)=\lim_q(f-g,\xi_q)=0$（内積の連続性）。よって $f-g\in L^\perp$。` },
          { text: R`<b>結論。</b>$f=g+(f-g)$ は $g\in L$、$f-g\in L^\perp$ の分解なので、[[projection-theorem#thm-projection|射影定理]]の一意性より $P_Lf=g$。` },
          { text: R`<b>内積。</b>$\alpha_j'=(f',f_j)$ とおくと、有限和のコーシー＝シュワルツとベッセルより $\sum_{j=1}^k|\alpha_j\overline{\alpha_j'}|\le\bigl(\sum|\alpha_j|^2\bigr)^{1/2}\bigl(\sum|\alpha_j'|^2\bigr)^{1/2}\le\|f\|\|f'\|$ なので絶対収束。$(P_Lf,P_Lf')=\lim_k(s_k,s_k')=\lim_k\sum_{j=1}^k\alpha_j\overline{\alpha_j'}$（内積の連続性と命題）。` },
        ],
      },

      { t: 'h2', id: 'cons', text: '完全正規直交系' },
      { t: 'def', id: 'def-cons', title: '完全正規直交系', yomi: 'かんぜんせいきちょっこうけい', imp: 3, text: R`ヒルベルト空間 $X$ の正規直交系 $\{f_k\}$ が<b class="term">完全正規直交系</b>であるとは、任意の $f\in X$ について
$$f=\sum_{k=1}^\infty(f,f_k)_Xf_k\qquad(X\text{ のノルムで収束})$$
が成り立つことをいう。` },
      { t: 'thm', id: 'thm-cons', title: '完全正規直交系の特徴づけ', yomi: 'かんぜんせいきちょっこうけいのとくちょうづけ', imp: 3, text: R`ヒルベルト空間 $X$ の正規直交系 $\{f_k\}$ と $L=\overline{\operatorname{span}\{f_k\}}$ について、次の (i)〜(v) は同値である。
<ol type="i"><li>$\{f_k\}$ は完全正規直交系である。</li><li>$L=X$（$\operatorname{span}\{f_k\}$ は $X$ で稠密）。</li><li>（パーセバルの等式）任意の $f\in X$ で $\|f\|_X^2=\sum_{k=1}^\infty|(f,f_k)_X|^2$。</li><li>任意の $f,f'\in X$ で $(f,f')_X=\sum_{k=1}^\infty(f,f_k)_X\overline{(f',f_k)_X}$。</li><li>すべての $k\in\mathbb{N}$ で $(f,f_k)_X=0$ ならば $f=0$。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>(ii)⇒(i)</b>：$L=X$ なら $L^\perp=X^\perp=\{0\}$（[[projection-theorem#prop-perp-x|命題]]）で、$f=P_Lf+0$。[[orthonormal-system#thm-proj-expansion|展開定理]]より $f=P_Lf=\sum(f,f_k)f_k$。` },
          { text: R`<b>(i)⇒(iv)</b>：(i) より $f=\sum(f,f_k)f_k$ はある元の部分和の極限なので $f\in L$、したがって $f=P_Lf$（$L$ の元の射影は自分自身）。同様に $f'=P_Lf'$。展開定理の後半より $(f,f')=(P_Lf,P_Lf')=\sum(f,f_k)\overline{(f',f_k)}$。` },
          { text: R`<b>(iv)⇒(iii)</b>：(iv) で $f'=f$ とすれば $\|f\|^2=(f,f)=\sum(f,f_k)\overline{(f,f_k)}=\sum|(f,f_k)|^2$。` },
          { text: R`<b>(iii)⇒(v)</b>：すべての $k$ で $(f,f_k)=0$ なら、(iii) より $\|f\|^2=\sum0=0$、すなわち $f=0$。` },
          { text: R`<b>(v)⇒(ii)</b>：$f\in L^\perp$ なら、特に $f_k\in L$ と直交するので $(f,f_k)=0$（すべての $k$）。(v) より $f=0$。よって $L^\perp=\{0\}$ で、[[projection-theorem#cor-perp-zero|射影定理の系]]より $L=X$。` },
        ],
      },
      { t: 'note', title: '資料の「明らか」の中身', text: R`資料は (iv)⇒(iii) と (iii)⇒(v) を「明らか」としている。上のとおり、前者は $f'=f$ を代入すること、後者はノルムが $0$ なら元が $0$（内積の公理 (i)）であることだけを使っている。` },
      { t: 'ex', id: 'ex-cons-l2', title: 'ℓ² の標準的な完全正規直交系', text: R`$\ell^2$ の $\{e^{(j)}\}$ は完全正規直交系である。$a\in\ell^2$ について $(a,e^{(j)})=a_j$ なので、(v) の「すべての $j$ で $a_j=0$ なら $a=0$」は明らか。展開 $a=\sum_ja_je^{(j)}$ は、$\|a-\sum_{j\le n}a_je^{(j)}\|_{\ell^2}^2=\sum_{j>n}|a_j|^2\to0$（[[series#prop-tail|残りは 0 に収束]]）という意味である。` },
      { t: 'ex', id: 'ex-cons-fourier', title: '三角関数系', text: R`$\{\frac1{\sqrt{2\pi}}e^{ikx}\}_{k\in\mathbb{Z}}$ は $L^2(-\pi,\pi)$ の完全正規直交系である（証明には[[closure#ex-dense|稠密性]]の議論が必要。[[fourier-series|フーリエ級数]]の記事を参照）。パーセバルの等式を $f(x)=x$ に使うと $\sum_{n=1}^\infty\frac1{n^2}=\frac{\pi^2}6$ が得られる。` },
      { t: 'fig', type: 'fourier', preset: 'sq', editable: true, caption: R`矩形波 $\operatorname{sign}x$ のフーリエ部分和 $S_N$。$N$ を増やすと、誤差 $\|f-S_N\|_2^2=\|f\|^2-\sum_{|k|\le N}|(f,e_k)|^2$（ベッセルの計算）が $0$ に近づく。これがパーセバルの等式の意味である。跳びの近くの「はみ出し」（ギブズ現象）は消えないが、その幅が細くなるので $L^2$ ノルムでは $0$ に近づく。` },

      { t: 'h2', id: 'gs', text: 'グラム＝シュミットの直交化' },
      { t: 'thm', id: 'thm-gram-schmidt', title: 'グラム＝シュミットの直交化', yomi: 'ぐらむ・しゅみっとのちょっこうか', imp: 2, text: R`内積空間 $X$ の列 $\{u_k\}_{k=1}^\infty$ が、どの $n$ についても $u_1,\dots,u_n$ が線形独立であるとする。このとき正規直交系 $\{e_k\}$ で、各 $n$ について $\operatorname{span}\{e_1,\dots,e_n\}=\operatorname{span}\{u_1,\dots,u_n\}$ となるものが存在する。` },
      {
        t: 'proof',
        steps: [
          { text: R`帰納的に作る。$u_1\ne0$（線形独立なので）だから $e_1:=\frac{u_1}{\|u_1\|}$。` },
          { text: R`$e_1,\dots,e_{n}$ が正規直交で $\operatorname{span}\{e_1..e_n\}=\operatorname{span}\{u_1..u_n\}$ とする。$v:=u_{n+1}-\sum_{j=1}^n(u_{n+1},e_j)e_j$ とおくと、$m\le n$ について $(v,e_m)=(u_{n+1},e_m)-(u_{n+1},e_m)=0$。$v=0$ なら $u_{n+1}\in\operatorname{span}\{u_1..u_n\}$ となり線形独立性に反するので $v\ne0$。$e_{n+1}:=\frac v{\|v\|}$ とおけば $e_1,\dots,e_{n+1}$ は正規直交。` },
          { text: R`$e_{n+1}$ は $u_{n+1}$ と $e_1..e_n$ の線形結合、逆に $u_{n+1}=\|v\|e_{n+1}+\sum_{j\le n}(u_{n+1},e_j)e_j$ なので、張る部分空間は一致する。` },
        ],
      },
      { t: 'ex', id: 'ex-legendre', title: 'ルジャンドル多項式', text: R`$C([-1,1])$ に内積 $(f,g)=\int_{-1}^1fg\,dx$ を入れ、$1,x,x^2,\dots$（[[vector-space#prop-ci-inf|線形独立]]）を直交化すると、$e_1=\frac1{\sqrt2}$、$e_2=\sqrt{\frac32}x$、$e_3=\sqrt{\frac58}(3x^2-1)$、… が得られる。これらは（定数倍を除いて）ルジャンドル多項式である。` },
      { t: 'crux', text: R`完全正規直交系があれば、$f\mapsto\{(f,f_k)\}_k$ は $X$ から $\ell^2$ への「長さと内積を保つ」全単射になる（パーセバルの等式と、$\ell^2$ の元からの級数の収束）。つまり、可算な完全正規直交系をもつヒルベルト空間は、本質的に $\ell^2$ と同じものである（リース＝フィッシャーの定理）。フーリエ級数の理論は、この一般論を $L^2(-\pi,\pi)$ に当てはめたものと見ることができる。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\mathbb{R}^2$ で $f_1=\frac1{\sqrt2}(1,1)$, $f_2=\frac1{\sqrt2}(1,-1)$ は正規直交系であることを確かめ、$f=(3,1)$ を $f=\sum(f,f_k)f_k$ と展開せよ。`, hint: R`$(f,f_1)=\frac4{\sqrt2}$、$(f,f_2)=\frac2{\sqrt2}$。`, answer: R`$(f_1,f_1)=\frac12(1+1)=1$、$(f_2,f_2)=1$、$(f_1,f_2)=\frac12(1-1)=0$。$(f,f_1)=\frac{3+1}{\sqrt2}=2\sqrt2$、$(f,f_2)=\frac{3-1}{\sqrt2}=\sqrt2$。$2\sqrt2f_1+\sqrt2f_2=(2,2)+(1,-1)=(3,1)=f$。パーセバル：$8+2=10=\|f\|^2$。`, space: 6 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`ヒルベルト空間の正規直交系 $\{f_k\}$ について、$\{\alpha_k\}\in\ell^2$ ならば $\sum_{k=1}^\infty\alpha_kf_k$ は収束し、$\bigl\|\sum\alpha_kf_k\bigr\|^2=\sum|\alpha_k|^2$ であることを示せ。`, hint: R`部分和のコーシー性は展開定理の証明と同じ。`, answer: R`$s_n=\sum_{k\le n}\alpha_kf_k$ とすると、$n>m$ で $\|s_n-s_m\|^2=\sum_{k=m+1}^n|\alpha_k|^2\to0$（$\sum|\alpha_k|^2$ のコーシー条件）。完備性より $s_n\to s$。ノルムの連続性より $\|s\|^2=\lim\|s_n\|^2=\lim\sum_{k\le n}|\alpha_k|^2=\sum|\alpha_k|^2$。`, space: 6 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`正規直交系 $\{f_k\}$ は $f_k\to0$ には収束しないが、任意の $g\in X$ について $(f_k,g)\to0$ であることを示せ。`, hint: R`$\|f_k-f_l\|^2=2$。ベッセルの不等式で $\sum|(g,f_k)|^2<\infty$。`, answer: R`$k\ne l$ で $\|f_k-f_l\|^2=\|f_k\|^2+\|f_l\|^2=2$（ピタゴラス）なのでコーシー列でなく、収束しない。一方ベッセルの不等式より $\sum_k|(g,f_k)|^2\le\|g\|^2<\infty$ なので[[series#thm-term|項は 0 に収束]]し、$|(f_k,g)|=|(g,f_k)|\to0$。（ノルムでは収束しないが「弱く」$0$ に収束する例。）`, space: 7 },
    ],
  });
})();
