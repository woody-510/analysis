/* 第 6 章：積分 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  const NOTE_PART = [
    R`$a,b\in\mathbb{R}$, $a<b$。$f:[a,b]\to\mathbb{R}$ は<b>有界</b>：ある $K\in\mathbb{R}$, $K>0$ があって、すべての $x\in[a,b]$ で $|f(x)|\le K$。`,
    R`分割 $\Delta:\ a=x_0<x_1<\cdots<x_n=b$（$n\in\mathbb{N}$、各 $x_k\in\mathbb{R}$）。小区間 $I_k:=[x_{k-1},x_k]$、その幅 $\Delta x_k:=x_k-x_{k-1}>0$（$k=1,\dots,n$）。`,
    R`$|\Delta|:=\max_{1\le k\le n}\Delta x_k$：分割の幅（目の粗さ）。`,
    R`$M_k:=\sup_{x\in I_k}f(x)$、$m_k:=\inf_{x\in I_k}f(x)$：小区間での上限・下限（$f$ が有界なので実数として存在する。[[supremum#ax-sup|上限公理]]）。`,
    R`$S(f,\Delta):=\sum_{k=1}^nM_k\Delta x_k$（上和）、$s(f,\Delta):=\sum_{k=1}^nm_k\Delta x_k$（下和）。`,
    R`$\mathcal{R}([a,b])$：$[a,b]$ 上でリーマン積分可能な関数全体の集合（このサイトでの記号）。`,
  ];

  /* ------------------------------------------------------------ */
  A.push({
    id: 'riemann-integral',
    title: 'リーマン積分',
    sub: '上和・下和による定義',
    yomi: 'りーまんせきぶん',
    aliases: ['積分', 'せきぶん', '定積分', 'ていせきぶん', 'リーマン和', 'りーまんわ', 'ダルブー和', 'だるぶー', '上和', 'じょうわ', '下和', 'かわ', '上積分', '下積分', '積分可能', 'せきぶんかのう', '可積分'],
    kind: '用語',
    field: '積分',
    grade: '1年後期',
    importance: 3,
    prereq: ['supremum', 'uniform-continuity', 'extreme-value'],
    related: ['integral-properties', 'fundamental-theorem', 'improper-integral', 'lebesgue-lp'],
    notation: NOTE_PART,
    synopsis: R`区間を細かく分け、各小区間で関数の上限・下限を高さとする長方形の面積の和（上和・下和）を作る。分割をどう細かくしても、上和と下和の間の隙間をいくらでも小さくできるとき、関数は積分可能であり、その共通の値を積分と呼ぶ。有界閉区間上の連続関数と単調関数は積分可能である。`,
    body: [
      { t: 'h2', id: 'idea', text: '発想：面積を上下からはさむ' },
      { t: 'p', text: R`グラフの下の面積を、長方形で<em>上から</em>と<em>下から</em>はさむ。上からの近似（上和）は真の面積以上、下からの近似（下和）は真の面積以下のはずである。分割を細かくして二つの差が $0$ に近づくなら、その間にある数がただ一つに決まる。それを積分と定義する。` },
      { t: 'fig', type: 'riemann', preset: 'sq', editable: true, caption: R`赤枠の長方形が上和 $S(f,\Delta)$、紺の破線の長方形が下和 $s(f,\Delta)$（等分割）。分割数 $n$ を増やすと、両者の差（赤い部分）が小さくなる。プリセット「階段関数」では、跳びのある小区間の分だけ差が残るが、その幅も $n$ とともに小さくなる。（図の上限・下限は各小区間の有限個の点から近似している。）` },

      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-darboux', title: '上和・下和', yomi: 'じょうわ・かわ', imp: 2, text: R`有界な $f:[a,b]\to\mathbb{R}$ と分割 $\Delta:\ a=x_0<x_1<\cdots<x_n=b$ に対し、$M_k:=\sup_{x\in[x_{k-1},x_k]}f(x)$、$m_k:=\inf_{x\in[x_{k-1},x_k]}f(x)$ とおいて
$$S(f,\Delta):=\sum_{k=1}^nM_k(x_k-x_{k-1}),\qquad s(f,\Delta):=\sum_{k=1}^nm_k(x_k-x_{k-1})$$
をそれぞれ<b class="term">上和</b>、<b class="term">下和</b>（ダルブー和）という。` },
      { t: 'def', id: 'def-refine', title: '細分', yomi: 'さいぶん', imp: 1, text: R`$[a,b]$ の分割 $\Delta,\Delta'$ について、$\Delta$ の分点がすべて $\Delta'$ の分点でもあるとき、$\Delta'$ は $\Delta$ の<b class="term">細分</b>であるという。二つの分割 $\Delta_1,\Delta_2$ の分点を合わせて小さい順に並べた分割 $\Delta_1\cup\Delta_2$ は、両方の細分である。` },
      { t: 'lem', id: 'lem-refine', title: '細分すると上和は減り、下和は増える', yomi: 'さいぶんのほだい', imp: 2, text: R`有界な $f:[a,b]\to\mathbb{R}$ と分割 $\Delta$ について $s(f,\Delta)\le S(f,\Delta)$。さらに $\Delta'$ が $\Delta$ の細分ならば
$$s(f,\Delta)\le s(f,\Delta')\le S(f,\Delta')\le S(f,\Delta).$$` },
      {
        t: 'proof',
        sketch: R`分点を一つ増やす場合を示せば、あとは帰納法。小区間を二つに割ると、それぞれの上の部分の上限はもとの上限以下になる。`,
        steps: [
          { text: R`各 $k$ で $m_k\le M_k$（下限は上限以下）かつ $\Delta x_k>0$ なので、足し合わせて $s(f,\Delta)\le S(f,\Delta)$。` },
          {
            text: R`<b>分点を一つ増やす場合。</b>$\Delta'$ が $\Delta$ に一点 $y\in(x_{j-1},x_j)$ を加えたものとする。$M':=\sup_{[x_{j-1},y]}f$、$M'':=\sup_{[y,x_j]}f$ とおくと、$[x_{j-1},y]$ も $[y,x_j]$ も $I_j$ の部分集合なので $M'\le M_j$、$M''\le M_j$（部分集合の上限はもとの集合の上限以下：$M_j$ は部分集合の上界でもあるから）。よって`,
            eqs: [
              [R`S(f,\Delta)-S(f,\Delta')=M_j(x_j-x_{j-1})-M'(y-x_{j-1})-M''(x_j-y)`, R`$j$ 番目以外の項は共通`],
              [R`\phantom{S(f,\Delta)-S(f,\Delta')}=(M_j-M')(y-x_{j-1})+(M_j-M'')(x_j-y)\ \ge\ 0.`, R`$x_j-x_{j-1}=(y-x_{j-1})+(x_j-y)$`],
            ],
          },
          { text: R`下和についても同様に、$\inf_{[x_{j-1},y]}f\ge m_j$、$\inf_{[y,x_j]}f\ge m_j$（部分集合の下限はもとの集合の下限以上）から $s(f,\Delta')-s(f,\Delta)\ge0$。` },
          { text: R`<b>一般の場合。</b>$\Delta'$ は $\Delta$ に有限個（$p$ 個とする）の点を一つずつ加えて得られるので、$p$ についての帰納法で、一つ加えるごとに上和は増えず下和は減らないことから結論が従う。` },
        ],
      },
      { t: 'cor', id: 'cor-ls-le-us', title: 'どの下和もどの上和以下', yomi: 'かわはじょうわいか', imp: 2, text: R`有界な $f:[a,b]\to\mathbb{R}$ と、$[a,b]$ の任意の分割 $\Delta_1,\Delta_2$ について $s(f,\Delta_1)\le S(f,\Delta_2)$。` },
      { t: 'proof', steps: [{ text: R`$\Delta:=\Delta_1\cup\Delta_2$ は $\Delta_1$ と $\Delta_2$ の両方の細分なので、[[riemann-integral#lem-refine|補題]]より $s(f,\Delta_1)\le s(f,\Delta)\le S(f,\Delta)\le S(f,\Delta_2)$。` }] },
      { t: 'def', id: 'def-riemann', title: 'リーマン積分', yomi: 'りーまんせきぶん', imp: 3, text: R`有界な $f:[a,b]\to\mathbb{R}$ に対し、
$$\overline{\int_a^b}f:=\inf_{\Delta}S(f,\Delta),\qquad\underline{\int_a^b}f:=\sup_{\Delta}s(f,\Delta)$$
（$\Delta$ は $[a,b]$ のすべての分割を動く）をそれぞれ<b class="term">上積分</b>、<b class="term">下積分</b>という。$\overline{\int_a^b}f=\underline{\int_a^b}f$ のとき、$f$ は $[a,b]$ 上で<b class="term">リーマン積分可能</b>（積分可能）であるといい、この共通の値を
$$\int_a^bf(x)\,dx$$
と書いて $f$ の $[a,b]$ 上の<b class="term">積分</b>という。積分可能な関数全体を $\mathcal{R}([a,b])$ と書く。` },
      { t: 'note', title: '上積分・下積分がちゃんと実数であること', text: R`$|f|\le K$ なら、どの分割でも $-K(b-a)\le s(f,\Delta)\le S(f,\Delta)\le K(b-a)$（$-K\le m_k\le M_k\le K$ を $\Delta x_k$ 倍して足す）。上和全体の集合は空でなく下に有界なので下限があり、下和全体は空でなく上に有界なので上限がある（[[supremum#ax-sup|上限公理]]・[[supremum#cor-inf|下限]]）。さらに[[riemann-integral#cor-ls-le-us|系]]より、任意の下和は任意の上和以下なので $\underline{\int_a^b}f\le\overline{\int_a^b}f$ である（下和の上限は各上和以下、その下限をとっても以下）。` },
      { t: 'rem', title: '積分の文字 x は仮の文字', text: R`$\int_a^bf(x)\,dx$ の $x$ は和の添字と同じ束縛変数で、$\int_a^bf(t)\,dt$ と書いても同じ数である。また $dx$ は「どの文字について積分するか」を示す記号で、ここでは独立した意味をもたない。` },

      { t: 'h2', id: 'criterion', text: 'リーマンの可積分条件' },
      { t: 'thm', id: 'thm-riemann-crit', title: 'リーマンの可積分条件', yomi: 'りーまんのかせきぶんじょうけん', imp: 3, text: R`有界な $f:[a,b]\to\mathbb{R}$ について、次は同値である。
<ol><li>$f\in\mathcal{R}([a,b])$。</li><li>$\forall\varepsilon>0,\ \exists\Delta=\Delta(\varepsilon)$（$[a,b]$ の分割）s.t. $S(f,\Delta)-s(f,\Delta)<\varepsilon$。</li></ol>さらにこのとき、どの分割 $\Delta$ についても $s(f,\Delta)\le\int_a^bf\le S(f,\Delta)$。` },
      {
        t: 'proof',
        steps: [
          { text: R`(1)⇒(2)：$I:=\int_a^bf$ とし、$\varepsilon>0$ をとる。$I=\inf_\Delta S(f,\Delta)$ なので、[[supremum#cor-inf|下限の特徴づけ]]より $S(f,\Delta_1)<I+\frac\varepsilon2$ となる分割 $\Delta_1$ がある。同様に $I=\sup_\Delta s(f,\Delta)$ より $s(f,\Delta_2)>I-\frac\varepsilon2$ となる $\Delta_2$ がある。$\Delta:=\Delta_1\cup\Delta_2$ とすると、[[riemann-integral#lem-refine|補題]]より $S(f,\Delta)-s(f,\Delta)\le S(f,\Delta_1)-s(f,\Delta_2)<\varepsilon$。` },
          {
            text: R`(2)⇒(1)：$\varepsilon>0$ を任意にとり、(2) の $\Delta$ をとる。上積分は上和の下限、下積分は下和の上限なので`,
            eqs: [[R`0\le\overline{\int_a^b}f-\underline{\int_a^b}f\le S(f,\Delta)-s(f,\Delta)<\varepsilon.`, R`左の不等号は上の注意`]],
          },
          { text: R`$\varepsilon>0$ は任意なので、[[inequalities#prop-le-eps|任意の正の数より小さい非負の数は 0]] より上積分と下積分は等しい。` },
          { text: R`最後の主張：$s(f,\Delta)\le\underline{\int_a^b}f=\int_a^bf=\overline{\int_a^b}f\le S(f,\Delta)$（下和は下積分以下、上和は上積分以上）。` },
        ],
      },
      { t: 'ex', id: 'ex-int-x', title: '∫₀¹ x dx = 1/2', text: R`$f:[0,1]\to\mathbb{R}$, $f(x)=x$、$n\in\mathbb{N}$ として等分割 $\Delta_n:\ x_k=\frac kn$（$k=0,\dots,n$）をとる。$f$ は単調増加なので $M_k=f(x_k)=\frac kn$、$m_k=f(x_{k-1})=\frac{k-1}n$。$\sum_{k=1}^nk=\frac{n(n+1)}2$ を使うと
$$S(f,\Delta_n)=\sum_{k=1}^n\frac kn\cdot\frac1n=\frac{n+1}{2n},\qquad s(f,\Delta_n)=\sum_{k=1}^n\frac{k-1}n\cdot\frac1n=\frac{n-1}{2n}.$$
$S-s=\frac1n$ は（アルキメデスの原理より）いくらでも小さくできるので $f\in\mathcal{R}([0,1])$。定理の最後の主張より $\frac{n-1}{2n}\le\int_0^1x\,dx\le\frac{n+1}{2n}$ がすべての $n$ で成り立ち、両端は $\frac12$ に収束するので、はさみうちで $\int_0^1x\,dx=\frac12$。` },
      { t: 'ex', id: 'ex-dirichlet-int', title: 'ディリクレ関数は積分可能でない', text: R`$D:[0,1]\to\mathbb{R}$, $D(x)=1\ (x\in\mathbb{Q})$, $D(x)=0\ (x\notin\mathbb{Q})$ とする。どの小区間 $I_k$（幅 $>0$）にも有理数と無理数が含まれる（[[supremum#prop-dense|稠密性]]）ので $M_k=1$、$m_k=0$。よってどの分割でも $S(D,\Delta)=1$、$s(D,\Delta)=0$ で、上積分 $1$ $\ne$ 下積分 $0$。$D$ はリーマン積分可能でない。（$D$ は[[lebesgue-lp|ルベーグ積分]]では積分可能で、その値は $0$ である。）` },

      { t: 'h2', id: 'classes', text: '積分可能な関数' },
      { t: 'thm', id: 'thm-cont-int', title: '連続関数は積分可能', yomi: 'れんぞくかんすうはせきぶんかのう', imp: 3, text: R`$f\in C([a,b])$ ならば $f\in\mathcal{R}([a,b])$。さらに、任意の $\varepsilon>0$ に対してある $\delta=\delta(\varepsilon)>0$ が存在し、$|\Delta|<\delta$ をみたすすべての分割 $\Delta$ で $S(f,\Delta)-s(f,\Delta)<\varepsilon$ となる。` },
      { t: 'strategy', text: R`各小区間での「上限 − 下限」を小さくしたい。[[uniform-continuity#thm-heine|ハイネ＝カントールの定理]]により、幅が $\delta$ 未満の区間ではどこでも値の差が小さい。これは一様連続でなければ言えない（点ごとの $\delta$ では、全区間で同時に使える幅が決まらない）。` },
      {
        t: 'proof',
        steps: [
          { text: R`$f$ は $[a,b]$ 上連続なので[[extreme-value#lem-bdd|有界]]であり、上和・下和が定義できる。` },
          { text: R`$\varepsilon>0$ を任意にとる。$f$ は[[uniform-continuity#thm-heine|ハイネ＝カントールの定理]]より $[a,b]$ 上で一様連続なので、ある $\delta=\delta(\varepsilon)>0$ があって、$x,y\in[a,b]$, $|x-y|<\delta$ ならば $|f(x)-f(y)|<\dfrac{\varepsilon}{2(b-a)}$。` },
          { text: R`$\Delta$ を $|\Delta|<\delta$ の分割とする。各小区間 $I_k$ は閉区間なので、[[extreme-value#thm-evt|最大値・最小値の定理]]より $M_k=f(\xi_k)$、$m_k=f(\eta_k)$ となる $\xi_k,\eta_k\in I_k$ がある。$|\xi_k-\eta_k|\le\Delta x_k<\delta$ なので $M_k-m_k=|f(\xi_k)-f(\eta_k)|<\dfrac\varepsilon{2(b-a)}$。` },
          {
            text: R`したがって`,
            eqs: [[R`S(f,\Delta)-s(f,\Delta)=\sum_{k=1}^n(M_k-m_k)\Delta x_k\le\frac\varepsilon{2(b-a)}\sum_{k=1}^n\Delta x_k=\frac\varepsilon2<\varepsilon.`, R`$\sum\Delta x_k=b-a$（望遠鏡和）`]],
          },
          { text: R`$|\Delta|<\delta$ の分割は存在する（たとえば $n>\frac{b-a}\delta$ として $n$ 等分）ので、[[riemann-integral#thm-riemann-crit|リーマンの可積分条件]]より $f\in\mathcal{R}([a,b])$。` },
        ],
      },
      { t: 'thm', id: 'thm-mono-int', title: '単調関数は積分可能', yomi: 'たんちょうかんすうはせきぶんかのう', imp: 2, text: R`$f:[a,b]\to\mathbb{R}$ が単調増加（$x\le y\Rightarrow f(x)\le f(y)$）または単調減少ならば、$f\in\mathcal{R}([a,b])$。` },
      {
        t: 'proof',
        steps: [
          { text: R`単調増加の場合を示す（減少なら $-f$ を考える：$S(-f,\Delta)=-s(f,\Delta)$ に注意）。$f(a)\le f(x)\le f(b)$ なので $f$ は有界。$n\in\mathbb{N}$ について $n$ 等分割 $\Delta_n$ をとると、単調増加より $M_k=f(x_k)$、$m_k=f(x_{k-1})$。` },
          {
            text: R`よって`,
            eqs: [[R`S(f,\Delta_n)-s(f,\Delta_n)=\sum_{k=1}^n\bigl(f(x_k)-f(x_{k-1})\bigr)\frac{b-a}n=\frac{(f(b)-f(a))(b-a)}n.`, R`望遠鏡和`]],
          },
          { text: R`右辺は $n$ を大きくすればいくらでも小さくできる（アルキメデスの原理）ので、可積分条件より $f\in\mathcal{R}([a,b])$。` },
        ],
      },
      { t: 'rem', title: '連続でなくても積分できる', text: R`単調関数は不連続点をもちうる（たとえば階段関数）。それでも積分可能である。積分可能性は「不連続点が少ない」ことと関係しており、正確には「有界な $f$ が積分可能 ⇔ 不連続点全体が測度 $0$ の集合」である（ルベーグの判定条件。証明は[[lebesgue-lp|ルベーグ積分]]の参考文献に譲る）。` },

      { t: 'h2', id: 'riemann-sum', text: 'リーマン和' },
      { t: 'prop', id: 'prop-riemann-sum', title: 'リーマン和は積分に近づく（連続関数の場合）', yomi: 'りーまんわ', imp: 2, text: R`$f\in C([a,b])$ とする。分割 $\Delta$ と代表点 $\xi_k\in I_k$（$k=1,\dots,n$）に対し、<b class="term">リーマン和</b>を $R(f,\Delta,\xi):=\sum_{k=1}^nf(\xi_k)\Delta x_k$ と定める。このとき
$$\forall\varepsilon>0,\ \exists\delta=\delta(\varepsilon)>0\ \text{ s.t. }\ |\Delta|<\delta\Longrightarrow\Bigl|R(f,\Delta,\xi)-\int_a^bf\Bigr|<\varepsilon\quad(\text{代表点 }\xi\text{ の選び方によらない}).$$` },
      { t: 'proof', steps: [{ text: R`$m_k\le f(\xi_k)\le M_k$ より $s(f,\Delta)\le R(f,\Delta,\xi)\le S(f,\Delta)$。また[[riemann-integral#thm-riemann-crit|定理]]より $s(f,\Delta)\le\int_a^bf\le S(f,\Delta)$。二つの数が同じ区間 $[s,S]$ に入るので、その差は $S(f,\Delta)-s(f,\Delta)$ 以下である。[[riemann-integral#thm-cont-int|前の定理]]の $\delta$ をとれば、$|\Delta|<\delta$ で差は $\varepsilon$ 未満になる。` }] },
      { t: 'note', title: '高校の区分求積法との関係', text: R`等分割と右端の代表点 $\xi_k=a+\frac{k(b-a)}n$ をとれば、$\displaystyle\int_a^bf=\lim_{n\to\infty}\frac{b-a}n\sum_{k=1}^nf\Bigl(a+\frac{k(b-a)}n\Bigr)$ となる（$|\Delta_n|=\frac{b-a}n\to0$）。これが高校の区分求積法の正当化である。一般の $f\in\mathcal{R}([a,b])$ でも同じことが成り立つ（ダルブーの定理）が、ここでは連続関数の場合だけを示した。` },
      { t: 'qa', q: R`$[a,b]$ が有界閉区間でないとき（たとえば $[0,\infty)$ や $(0,1]$ で非有界な関数）は？`, a: R`リーマン積分は「有界閉区間上の有界関数」に対してだけ定義される。それ以外は、閉区間上の積分の極限として[[improper-integral|広義積分]]で扱う。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`等分割の上和・下和を計算して、$\int_0^1x^2\,dx=\frac13$ を示せ。$\sum_{k=1}^nk^2=\frac{n(n+1)(2n+1)}6$ を用いてよい。`, hint: R`$x^2$ は $[0,1]$ で単調増加なので、$M_k=\left(\frac kn\right)^2$、$m_k=\left(\frac{k-1}n\right)^2$。`, answer: R`$S(f,\Delta_n)=\frac1{n^3}\sum_{k=1}^nk^2=\frac{(n+1)(2n+1)}{6n^2}$、$s(f,\Delta_n)=\frac1{n^3}\sum_{k=0}^{n-1}k^2=\frac{(n-1)(2n-1)}{6n^2}$。$S-s=\frac1n\to0$ なので可積分で、$s\le\int_0^1x^2\le S$ の両端はともに $\frac13$ に収束するので $\int_0^1x^2\,dx=\frac13$。`, space: 7 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$f:[0,2]\to\mathbb{R}$ を $f(x)=0\ (x\ne1)$、$f(1)=1$ と定める。$f\in\mathcal{R}([0,2])$ と $\int_0^2f=0$ を示せ。`, hint: R`$1$ を含む小区間の幅を小さくする。$s(f,\Delta)=0$ はいつも成り立つ。`, answer: R`どの小区間にも $1$ 以外の点があるので $m_k=0$、よって $s(f,\Delta)=0$。$0<\eta<1$ として分割 $0<1-\eta<1+\eta<2$ をとると、$M_k$ は $[1-\eta,1+\eta]$ で $1$、他で $0$ なので $S(f,\Delta)=2\eta$。$\eta$ はいくらでも小さくとれるので可積分条件をみたし、$0=s\le\int_0^2f\le S=2\eta$ がすべての $\eta\in(0,1)$ で成り立つので $\int_0^2f=0$。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'integral-properties',
    title: '積分の基本性質',
    sub: '線形性・単調性・区間加法性・平均値の定理',
    yomi: 'せきぶんのきほんせいしつ',
    aliases: ['積分の線形性', 'せきぶんのせんけいせい', '区間加法性', 'くかんかほうせい', '積分の平均値の定理', 'せきぶんのへいきんちのていり', '積分の三角不等式'],
    kind: '定理',
    field: '積分',
    grade: '1年後期',
    importance: 3,
    prereq: ['riemann-integral'],
    related: ['fundamental-theorem', 'normed-space'],
    notation: NOTE_PART.concat([R`$\operatorname{osc}_Jf:=\sup_Jf-\inf_Jf$：区間 $J$ での $f$ の振幅（このページだけの記号）。`]),
    synopsis: R`積分は和の極限なので、和のもつ性質（線形性・単調性・三角不等式・分割）をそのまま受け継ぐ。ただし上限・下限を経由して定義したので、一つずつ不等式で確かめる必要がある。連続関数については、積分は平均値 $f(\xi)$ に区間の幅を掛けたものになる。`,
    body: [
      { t: 'h2', id: 'osc', text: '準備：振幅' },
      { t: 'lem', id: 'lem-osc', title: '振幅は値の差の上限', yomi: 'しんぷく', imp: 1, text: R`$J\subset\mathbb{R}$ を空でない集合、$f:J\to\mathbb{R}$ を有界とする。このとき
$$\sup_Jf-\inf_Jf=\sup\{f(x)-f(y)\mid x,y\in J\}.$$` },
      {
        t: 'proof',
        steps: [
          { text: R`$M:=\sup_Jf$、$m:=\inf_Jf$ とおく。任意の $x,y\in J$ で $f(x)\le M$、$f(y)\ge m$ なので $f(x)-f(y)\le M-m$。よって右辺の集合は $M-m$ を上界にもつ。` },
          { text: R`$\varepsilon>0$ をとる。上限・下限の特徴づけより $f(x)>M-\frac\varepsilon2$、$f(y)<m+\frac\varepsilon2$ となる $x,y\in J$ があり、$f(x)-f(y)>M-m-\varepsilon$。よって $M-m$ は右辺の集合の上限である（[[supremum#prop-sup-eps|上限の ε 特徴づけ]]）。` },
        ],
      },

      { t: 'h2', id: 'linear', text: '線形性と単調性' },
      { t: 'thm', id: 'thm-int-linear', title: '積分の線形性', yomi: 'せきぶんのせんけいせい', imp: 3, text: R`$f,g\in\mathcal{R}([a,b])$、$c\in\mathbb{R}$ ならば、$f+g,\ cf\in\mathcal{R}([a,b])$ であり
$$\int_a^b(f+g)=\int_a^bf+\int_a^bg,\qquad\int_a^bcf=c\int_a^bf.$$` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>和。</b>区間 $J$ 上で、任意の $x\in J$ について $f(x)+g(x)\le\sup_Jf+\sup_Jg$ なので $\sup_J(f+g)\le\sup_Jf+\sup_Jg$。同様に $\inf_J(f+g)\ge\inf_Jf+\inf_Jg$。各小区間でこれを使うと、任意の分割 $\Delta$ について` , eqs: [[R`s(f,\Delta)+s(g,\Delta)\le s(f+g,\Delta)\le S(f+g,\Delta)\le S(f,\Delta)+S(g,\Delta).`, R`小区間ごとの不等式を $\Delta x_k$ 倍して足す`]] },
          { text: R`$\varepsilon>0$ をとり、可積分条件から $S(f,\Delta_1)-s(f,\Delta_1)<\frac\varepsilon2$、$S(g,\Delta_2)-s(g,\Delta_2)<\frac\varepsilon2$ となる分割をとって $\Delta:=\Delta_1\cup\Delta_2$ とする。細分しても差は増えない（[[riemann-integral#lem-refine|補題]]）ので、上の不等式より $S(f+g,\Delta)-s(f+g,\Delta)<\varepsilon$。よって $f+g\in\mathcal{R}([a,b])$。` },
          { text: R`値について：上の不等式の両端と $\int_a^b(f+g)$、$\int_a^bf+\int_a^bg$ はすべて区間 $[s(f,\Delta)+s(g,\Delta),\ S(f,\Delta)+S(g,\Delta)]$（幅 $<\varepsilon$）に入るので、$\bigl|\int(f+g)-\int f-\int g\bigr|<\varepsilon$。$\varepsilon$ は任意なので等しい。` },
          { text: R`<b>定数倍。</b>$c\ge0$ なら $\sup_J(cf)=c\sup_Jf$、$\inf_J(cf)=c\inf_Jf$ なので $S(cf,\Delta)=cS(f,\Delta)$、$s(cf,\Delta)=cs(f,\Delta)$。$c<0$ なら $\sup_J(cf)=c\inf_Jf$、$\inf_J(cf)=c\sup_Jf$（負の数を掛けると上限と下限が入れかわる）なので $S(cf,\Delta)=cs(f,\Delta)$、$s(cf,\Delta)=cS(f,\Delta)$。どちらの場合も $S(cf,\Delta)-s(cf,\Delta)=|c|(S(f,\Delta)-s(f,\Delta))$ となり、可積分性と $\int cf=c\int f$ が上積分・下積分の定義から従う。` },
        ],
      },
      { t: 'thm', id: 'thm-int-mono', title: '積分の単調性', yomi: 'せきぶんのたんちょうせい', imp: 3, text: R`$f,g\in\mathcal{R}([a,b])$ が、すべての $x\in[a,b]$ で $f(x)\le g(x)$ をみたすならば、$\int_a^bf\le\int_a^bg$。特に、$m\le f(x)\le M$（$m,M\in\mathbb{R}$）ならば $m(b-a)\le\int_a^bf\le M(b-a)$。` },
      { t: 'proof', steps: [{ text: R`$h:=g-f\in\mathcal{R}([a,b])$（線形性）で $h\ge0$ なので、どの小区間でも $\inf h\ge0$、よって $s(h,\Delta)\ge0$。[[riemann-integral#thm-riemann-crit|定理]]より $\int h\ge s(h,\Delta)\ge0$。線形性より $\int g-\int f=\int h\ge0$。後半は定数関数 $m$、$M$（積分はそれぞれ $m(b-a)$、$M(b-a)$：どの分割でも上和＝下和）と比べればよい。` }] },
      { t: 'thm', id: 'thm-int-abs', title: '積分の三角不等式', yomi: 'せきぶんのさんかくふとうしき', imp: 3, text: R`$f\in\mathcal{R}([a,b])$ ならば $|f|\in\mathcal{R}([a,b])$ であり、
$$\Bigl|\int_a^bf\Bigr|\le\int_a^b|f|\le K(b-a)\qquad(K:=\sup_{[a,b]}|f|).$$` },
      {
        t: 'proof',
        steps: [
          { text: R`小区間 $J$ 上の任意の $x,y$ について、[[abs-triangle#cor-rev|逆向きの三角不等式]]より $|f(x)|-|f(y)|\le\bigl||f(x)|-|f(y)|\bigr|\le|f(x)-f(y)|$。右辺は（$x,y$ を入れかえたものも含めて）$\sup\{f(x')-f(y')\}$ 以下なので、[[integral-properties#lem-osc|振幅の補題]]より $\operatorname{osc}_J|f|\le\operatorname{osc}_Jf$。` },
          { text: R`したがって $S(|f|,\Delta)-s(|f|,\Delta)\le S(f,\Delta)-s(f,\Delta)$ で、可積分条件より $|f|\in\mathcal{R}([a,b])$。` },
          { text: R`$-|f(x)|\le f(x)\le|f(x)|$ と[[integral-properties#thm-int-mono|単調性]]・線形性より $-\int|f|\le\int f\le\int|f|$、すなわち $\left|\int f\right|\le\int|f|$。$|f|\le K$ と単調性より $\int|f|\le K(b-a)$。` },
        ],
      },
      { t: 'cor', id: 'cor-int-prod', title: '積も積分可能', yomi: 'せきもせきぶんかのう', imp: 1, text: R`$f,g\in\mathcal{R}([a,b])$ ならば $fg\in\mathcal{R}([a,b])$。` },
      { t: 'proof', steps: [{ text: R`$|f|,|g|\le K$ とする。小区間 $J$ 上の $x,y$ について $|f(x)g(x)-f(y)g(y)|\le|f(x)||g(x)-g(y)|+|g(y)||f(x)-f(y)|\le K(\operatorname{osc}_Jg+\operatorname{osc}_Jf)$。振幅の補題より $\operatorname{osc}_J(fg)\le K(\operatorname{osc}_Jf+\operatorname{osc}_Jg)$ なので、$S(fg,\Delta)-s(fg,\Delta)\le K\{(S-s)(f,\Delta)+(S-s)(g,\Delta)\}$。共通細分をとれば右辺はいくらでも小さくできる。` }] },
      { t: 'rem', title: '積の積分は積分の積ではない', text: R`$\int_a^bfg\ne\left(\int_a^bf\right)\left(\int_a^bg\right)$ が一般的である（$f=g=x$ on $[0,1]$ なら左辺 $\frac13$、右辺 $\frac14$）。成り立つのは不等式のほうで、[[hilbert-space#thm-cs|コーシー＝シュワルツの不等式]] $\left|\int fg\right|\le\left(\int f^2\right)^{1/2}\left(\int g^2\right)^{1/2}$ がその代表である。` },

      { t: 'h2', id: 'additive', text: '区間加法性' },
      { t: 'thm', id: 'thm-int-add', title: '区間加法性', yomi: 'くかんかほうせい', imp: 3, text: R`$a<c<b$ とし、$f:[a,b]\to\mathbb{R}$ を有界とする。$f\in\mathcal{R}([a,b])$ であることと、$f|_{[a,c]}\in\mathcal{R}([a,c])$ かつ $f|_{[c,b]}\in\mathcal{R}([c,b])$ であることは同値で、このとき
$$\int_a^bf=\int_a^cf+\int_c^bf.$$` },
      {
        t: 'proof',
        steps: [
          { text: R`$[a,b]$ の分割 $\Delta$ が分点 $c$ を含むとき、$\Delta$ は $[a,c]$ の分割 $\Delta_1$ と $[c,b]$ の分割 $\Delta_2$ に分かれ、$S(f,\Delta)=S(f,\Delta_1)+S(f,\Delta_2)$、$s(f,\Delta)=s(f,\Delta_1)+s(f,\Delta_2)$（和を分けただけ）。` },
          { text: R`(⇒) $\varepsilon>0$ に対し $S(f,\Delta)-s(f,\Delta)<\varepsilon$ となる分割をとり、必要なら $c$ を分点に加える（細分なので差は増えない）。すると $(S-s)(f,\Delta_1)+(S-s)(f,\Delta_2)<\varepsilon$ で、どちらの項も $0$ 以上なので、それぞれ $<\varepsilon$。よって両方の区間で可積分。` },
          { text: R`(⇐) $\varepsilon>0$ に対し、$[a,c]$ で差 $<\frac\varepsilon2$ の $\Delta_1$、$[c,b]$ で差 $<\frac\varepsilon2$ の $\Delta_2$ をとり、つなげた分割 $\Delta$ では差 $<\varepsilon$。` },
          { text: R`値：$\Delta$（$c$ を含む）について、$\int_a^cf+\int_c^bf$ も $\int_a^bf$ も区間 $[s(f,\Delta_1)+s(f,\Delta_2),\ S(f,\Delta_1)+S(f,\Delta_2)]=[s(f,\Delta),S(f,\Delta)]$ に入る。この幅はいくらでも小さくできるので、二つは等しい。` },
        ],
      },
      { t: 'def', id: 'def-int-orient', title: '向きのついた積分', yomi: 'むきのついたせきぶん', imp: 2, text: R`$f\in\mathcal{R}([a,b])$ のとき、$\int_b^af:=-\int_a^bf$、また $p\in[a,b]$ について $\int_p^pf:=0$ と定める。` },
      { t: 'prop', id: 'prop-int-add-any', title: '区間加法性（順序によらない形）', yomi: 'くかんかほうせい', imp: 2, text: R`$I$ を有界閉区間、$f\in\mathcal{R}(I)$ とする。任意の $p,q,r\in I$ について $\int_p^rf=\int_p^qf+\int_q^rf$。` },
      { t: 'proof', steps: [{ text: R`3 点のうち 2 点以上が一致する場合は、定義 $\int_p^pf=0$ と $\int_q^pf=-\int_p^qf$ から直ちに成り立つ。3 点が相異なる場合は $3!=6$ 通りの大小関係がある。$p<q<r$ は[[integral-properties#thm-int-add|定理]]そのもの。それ以外はすべて、小さい順に並べた 3 点に定理を使い、向きの定義で符号を移せば得られる。たとえば $q<p<r$ なら、定理より $\int_q^rf=\int_q^pf+\int_p^rf$、よって $\int_p^rf=\int_q^rf-\int_q^pf=\int_q^rf+\int_p^qf$。残りの 4 通りも同じ計算である。（区間 $[\min,\max]$ への制限が可積分であることは、定理の (⇒) を 2 回使えばわかる。）` }] },

      { t: 'h2', id: 'mvt', text: '積分の平均値の定理' },
      { t: 'thm', id: 'thm-int-mvt', title: '積分の平均値の定理', yomi: 'せきぶんのへいきんちのていり', imp: 3, text: R`$f\in C([a,b])$ ならば、ある $\xi\in[a,b]$ が存在して
$$\int_a^bf(x)\,dx=f(\xi)(b-a).$$` },
      {
        t: 'proof',
        steps: [
          { text: R`[[extreme-value#thm-evt|最大値・最小値の定理]]より、$f(x_m)=\min f$、$f(x_M)=\max f$ となる $x_m,x_M\in[a,b]$ がある。[[integral-properties#thm-int-mono|単調性]]より $f(x_m)(b-a)\le\int_a^bf\le f(x_M)(b-a)$。` },
          { text: R`$\mu:=\frac1{b-a}\int_a^bf$ とおくと $f(x_m)\le\mu\le f(x_M)$。$\mu=f(x_m)$ なら $\xi=x_m$、$\mu=f(x_M)$ なら $\xi=x_M$ でよい。そうでなければ $f(x_m)<\mu<f(x_M)$ で、$x_m\ne x_M$。$x_m$ と $x_M$ を端点とする閉区間に[[intermediate-value#thm-ivt|中間値の定理]]を使うと、$f(\xi)=\mu$ となる $\xi$（$x_m$ と $x_M$ の間、したがって $[a,b]$ の点）がある。` },
        ],
      },
      { t: 'qa', q: R`連続でないと平均値の定理は成り立たない？`, a: R`成り立たないことがある。$f=\chi_{[1,2]}$（$[1,2]$ で $1$、$[0,1)$ で $0$）を $[0,2]$ で考えると $\frac12\int_0^2f=\frac12$ だが、$f$ は値 $\frac12$ をとらない。中間値の定理が使えないからである。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$f\in C([a,b])$ が、すべての $x\in[a,b]$ で $f(x)\ge0$、かつ $\int_a^bf=0$ をみたすならば、$f$ は恒等的に $0$ であることを示せ。`, hint: R`$f(c)>0$ となる $c$ があると仮定し、連続性から $c$ の近くの小区間で $f>\frac{f(c)}2$。`, answer: R`$f(c)>0$ となる $c\in[a,b]$ があると仮定する。連続性より、$\varepsilon=\frac{f(c)}2$ に対して $\delta>0$ があり、$|x-c|<\delta$, $x\in[a,b]$ なら $f(x)>\frac{f(c)}2$。$c$ を含む長さ $\ell>0$ の閉区間 $J\subset[a,b]\cap(c-\delta,c+\delta)$ をとると、区間加法性と単調性より $\int_a^bf\ge\int_Jf\ge\frac{f(c)}2\ell>0$（$J$ の外では $f\ge0$）。これは $\int_a^bf=0$ に反する。`, space: 7 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$f\in C([a,b])$ とする。$\displaystyle\Bigl|\int_a^bf\Bigr|=\int_a^b|f|$ となるのはどんなときか。`, hint: R`$\int f\ge0$ の場合、$\int(|f|-f)=0$ に前問を使う。`, answer: R`$\int f\ge0$ なら条件は $\int(|f|-f)=0$ と同値で、$|f|-f\ge0$ は連続なので前問より $|f|=f$、すなわち $f\ge0$。$\int f<0$ なら同様に $f\le0$。よって答えは「$f$ が $[a,b]$ 全体で符号を変えない（$f\ge0$ または $f\le0$）とき」。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'fundamental-theorem',
    title: '微分積分学の基本定理',
    sub: '積分と微分は逆の操作',
    yomi: 'びぶんせきぶんがくのきほんていり',
    aliases: ['微積分学の基本定理', 'びせきぶんがくのきほんていり', '基本定理', '原始関数', 'げんしかんすう', '不定積分', 'ふていせきぶん'],
    kind: '定理',
    field: '積分',
    grade: '1年後期',
    importance: 3,
    prereq: ['integral-properties', 'mean-value', 'differentiability'],
    related: ['integration-techniques', 'improper-integral', 'ode-application'],
    notation: [
      R`$a,b\in\mathbb{R}$, $a<b$。$f\in\mathcal{R}([a,b])$（[[riemann-integral#def-riemann|リーマン積分可能]]）。`,
      R`$F(x):=\int_a^xf(t)\,dt$（$x\in[a,b]$）：上端を動かした積分。$F:[a,b]\to\mathbb{R}$。`,
      R`$C^1([a,b])$：$[a,b]$ 上で微分可能（端点では[[differentiability#def-closed-diff|片側微分]]）で、導関数が $C([a,b])$ に属する関数全体。`,
      R`$\bigl[G(x)\bigr]_a^b:=G(b)-G(a)$。`,
    ],
    synopsis: R`連続関数 $f$ について、積分の上端を動かした関数 $F(x)=\int_a^xf$ を微分すると $f$ に戻る。逆に、導関数 $G'$ を積分すると $G(b)-G(a)$ になる。積分（面積）と微分（傾き）という別々に定義した操作が、互いに逆であることを主張する、解析学でもっとも重要な定理の一つである。`,
    body: [
      { t: 'h2', id: 'first', text: '第一の形：積分してから微分する' },
      { t: 'thm', id: 'thm-ftc1', title: '微分積分学の基本定理（I）', yomi: 'びぶんせきぶんがくのきほんていり', imp: 3, text: R`$f\in\mathcal{R}([a,b])$ とし、$F(x):=\int_a^xf(t)\,dt$（$x\in[a,b]$）とおく。
<ol><li>$K:=\sup_{[a,b]}|f|$ とすると、すべての $x,y\in[a,b]$ で $|F(x)-F(y)|\le K|x-y|$。特に $F\in C([a,b])$。</li><li>$f$ が点 $c\in[a,b]$ で連続ならば、$F$ は $c$ で微分可能で $F'(c)=f(c)$（$c$ が端点なら片側微分）。</li></ol>特に $f\in C([a,b])$ ならば $F\in C^1([a,b])$ で $F'=f$。` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $x,y\in[a,b]$ とする。[[integral-properties#prop-int-add-any|区間加法性]]より $F(y)-F(x)=\int_x^yf$。$x\le y$ なら[[integral-properties#thm-int-abs|三角不等式]]より $|F(y)-F(x)|\le\int_x^y|f|\le K(y-x)$。$x>y$ なら $\int_x^yf=-\int_y^xf$ で同様。よって $F$ は[[uniform-continuity#def-lip|リプシッツ連続]]で、特に連続。` },
          {
            text: R`(2) $h\ne0$ を $c+h\in[a,b]$ となる実数とする。$\int_c^{c+h}f(c)\,dt=f(c)h$（定数関数の積分。$h<0$ でも向きの定義から成り立つ）なので、`,
            eqs: [[R`\frac{F(c+h)-F(c)}h-f(c)=\frac1h\int_c^{c+h}\bigl(f(t)-f(c)\bigr)\,dt.`, R`区間加法性・線形性`]],
          },
          { text: R`$\varepsilon>0$ を任意にとる。$f$ は $c$ で連続なので、ある $\delta=\delta(\varepsilon)>0$ があって、$t\in[a,b]$, $|t-c|<\delta$ ならば $|f(t)-f(c)|<\varepsilon$。` },
          { text: R`$0<|h|<\delta$ のとき、$c$ と $c+h$ の間の $t$ はすべて $|t-c|\le|h|<\delta$ をみたすので、積分の三角不等式（区間 $[\min\{c,c+h\},\max\{c,c+h\}]$ 上）より $\left|\int_c^{c+h}(f(t)-f(c))\,dt\right|\le\varepsilon|h|$。両辺を $|h|$ で割って $\left|\frac{F(c+h)-F(c)}h-f(c)\right|\le\varepsilon$。` },
          { text: R`よって[[function-limit#def-flim|極限の定義]]（不等号が $\le\varepsilon$ でも、$\varepsilon$ を $\frac\varepsilon2$ に取りかえれば $<\varepsilon$ にできる）により $\displaystyle\lim_{h\to0}\frac{F(c+h)-F(c)}h=f(c)$、すなわち $F'(c)=f(c)$。` },
        ],
      },
      { t: 'fig', type: 'plot', preset: 'ftc', caption: R`$f$ が $x=1$ で跳ぶ階段関数のとき、$F(x)=\int_0^xf$ は連続だが $x=1$ で折れ曲がる（微分できない）。定理 (2) で「$f$ が $c$ で連続」という仮定が必要な理由がわかる。` },
      { t: 'def', id: 'def-primitive', title: '原始関数', yomi: 'げんしかんすう', imp: 2, text: R`区間 $I$ 上の関数 $f:I\to\mathbb{R}$ に対し、$I$ 上で微分可能な $G:I\to\mathbb{R}$ で $G'=f$ をみたすものを、$f$ の<b class="term">原始関数</b>という。` },
      { t: 'prop', id: 'prop-prim-const', title: '原始関数は定数の差を除いて一つ', yomi: 'げんしかんすうのいちいせい', imp: 2, text: R`$G_1,G_2$ がともに区間 $I$ 上の $f$ の原始関数ならば、ある定数 $C\in\mathbb{R}$ があって、すべての $x\in I$ で $G_1(x)-G_2(x)=C$。` },
      { t: 'proof', steps: [{ text: R`$H:=G_1-G_2$ は $I$ 上微分可能で $H'=f-f=0$。[[mean-value#cor-const|平均値の定理の系]]より $H$ は $I$ 上で定数である。` }] },

      { t: 'h2', id: 'second', text: '第二の形：微分してから積分する' },
      { t: 'thm', id: 'thm-ftc2', title: '微分積分学の基本定理（II）', yomi: 'びぶんせきぶんがくのきほんていり', imp: 3, text: R`$G\in C([a,b])$ が $(a,b)$ で微分可能であり、$g\in\mathcal{R}([a,b])$ が $(a,b)$ 上で $G'=g$ をみたすとする（端点での $g$ の値は何でもよい）。このとき
$$\int_a^bg(x)\,dx=G(b)-G(a)=\bigl[G(x)\bigr]_a^b.$$` },
      { t: 'strategy', text: R`任意の分割で、各小区間に[[mean-value#thm-mvt|平均値の定理]]を使うと、$G(b)-G(a)$ がちょうど一つのリーマン和 $\sum g(\xi_k)\Delta x_k$ に等しくなる。リーマン和は下和と上和の間にあるので、$G(b)-G(a)$ はすべての下和以上・すべての上和以下になり、積分と一致するしかない。` },
      {
        t: 'proof',
        steps: [
          { text: R`$\Delta:\ a=x_0<\cdots<x_n=b$ を任意の分割とする。各 $k$ で $G$ は $[x_{k-1},x_k]$ 上連続、$(x_{k-1},x_k)$ で微分可能なので、[[mean-value#thm-mvt|平均値の定理]]より $G(x_k)-G(x_{k-1})=G'(\xi_k)\Delta x_k=g(\xi_k)\Delta x_k$ となる $\xi_k\in(x_{k-1},x_k)$ がある。` },
          {
            text: R`足し合わせると望遠鏡和になり、`,
            eqs: [
              [R`G(b)-G(a)=\sum_{k=1}^n\bigl(G(x_k)-G(x_{k-1})\bigr)=\sum_{k=1}^ng(\xi_k)\Delta x_k.`, R`[[sigma-notation#prop-sum-rules|望遠鏡和]]`],
              [R`s(g,\Delta)\le G(b)-G(a)\le S(g,\Delta).`, R`$m_k\le g(\xi_k)\le M_k$`],
            ],
          },
          { text: R`$\Delta$ は任意なので、$G(b)-G(a)$ は下和全体の上界であり、上和全体の下界である。よって $\underline{\int_a^b}g\le G(b)-G(a)\le\overline{\int_a^b}g$。$g$ は積分可能なので両端は $\int_a^bg$ に等しく、$G(b)-G(a)=\int_a^bg$。` },
        ],
      },
      { t: 'cor', id: 'cor-ftc-cont', title: '連続関数の積分は原始関数で計算できる', yomi: 'げんしかんすうによるけいさん', imp: 3, text: R`$f\in C([a,b])$ とし、$G$ を $[a,b]$ 上の $f$ の任意の原始関数とすると、$\int_a^bf=G(b)-G(a)$。` },
      { t: 'proof', steps: [{ text: R`$G$ は $[a,b]$ 上微分可能なので連続（[[differentiability#thm-diff-cont|微分可能なら連続]]）で、$(a,b)$ 上 $G'=f$。$f\in\mathcal{R}([a,b])$（[[riemann-integral#thm-cont-int|連続関数は積分可能]]）なので、定理 (II) がそのまま使える。` }] },
      { t: 'ex', id: 'ex-ftc', title: '計算例', text: R`<ol><li>$G(x)=\frac{x^3}3$ は $G'(x)=x^2$（[[derivative-rules#ex-power|べきの微分]]）なので $\int_0^1x^2\,dx=\frac13-0=\frac13$（[[riemann-integral#prob-1|上和・下和の計算]]と一致する）。</li><li>$n\in\mathbb{N}\cup\{0\}$ について $\int_a^bx^n\,dx=\dfrac{b^{n+1}-a^{n+1}}{n+1}$。</li><li>$\int_0^\pi\sin x\,dx=\bigl[-\cos x\bigr]_0^\pi=1-(-1)=2$（$(\cos x)'=-\sin x$ は既知とする）。</li></ol>` },
      { t: 'rem', title: '仮定「g は積分可能」は外せない', text: R`微分可能な関数の導関数が積分可能とは限らない。たとえば $G(x)=x^2\sin\frac1{x^2}$（$x\ne0$）、$G(0)=0$ は $[-1,1]$ 上で微分可能だが、$G'$ は $0$ の近くで有界でないので、リーマン積分の対象にならない。定理 (II) で $g\in\mathcal{R}([a,b])$ を仮定しているのはこのためである。` },
      { t: 'qa', q: R`「積分可能な関数には必ず原始関数がある」は正しい？`, a: R`正しくない。上の図の階段関数 $f$ は積分可能だが、$[0,2]$ 上の原始関数をもたない（導関数は中間値の性質をもつ——ダルブーの定理——ので、跳びのある関数は導関数になれない）。原始関数の存在が保証されるのは、$f$ が連続な場合（定理 (I)）である。` },
      { t: 'crux', text: R`定理 (I) は「連続関数には原始関数がある」こと、定理 (II) は「原始関数がわかれば積分が計算できる」ことを言う。(I) の証明の核心は「$f$ の連続性から $\frac1h\int_c^{c+h}f\approx f(c)$」、(II) の核心は「平均値の定理で $G(b)-G(a)$ をリーマン和として書く」ことである。[[ode-application|微分方程式]]を積分方程式に書きかえるときに使うのは (I) と (II) の両方である。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$f\in C(\mathbb{R})$ とし、$H(x):=\int_0^{x^2}f(t)\,dt$（$x\in\mathbb{R}$）とおく。$H'(x)$ を求めよ。`, hint: R`$F(y):=\int_0^yf$ とおくと $H=F\circ\phi$、$\phi(x)=x^2$。[[derivative-rules#thm-chain|合成関数の微分]]。`, answer: R`$F(y):=\int_0^yf(t)\,dt$ は定理 (I) より $F'=f$（任意の有界閉区間上で考えればよい）。$H(x)=F(x^2)$ なので、合成関数の微分より $H'(x)=F'(x^2)\cdot2x=2xf(x^2)$。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$f\in C([a,b])$ が、すべての $x\in[a,b]$ で $\int_a^xf=\int_x^bf$ をみたすならば、$f$ は恒等的に $0$ であることを示せ。`, hint: R`$\int_a^xf=\frac12\int_a^bf$ が定数になる。両辺を微分。`, answer: R`区間加法性より $\int_x^bf=\int_a^bf-\int_a^xf$ なので、条件は $2\int_a^xf=\int_a^bf$（定数）。$F(x):=\int_a^xf$ は定数 $\frac12\int_a^bf$ に等しく、定理 (I) より $f(x)=F'(x)=0$（$x\in[a,b]$）。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'integration-techniques',
    title: '部分積分と置換積分',
    sub: '積分の計算法則',
    yomi: 'ぶぶんせきぶんとちかんせきぶん',
    aliases: ['部分積分', 'ぶぶんせきぶん', '置換積分', 'ちかんせきぶん', '変数変換', 'へんすうへんかん'],
    kind: '定理',
    field: '積分',
    grade: '1年後期',
    importance: 3,
    prereq: ['fundamental-theorem', 'derivative-rules'],
    related: ['improper-integral', 'fourier-series'],
    notation: [
      R`$C^1([a,b])$：$[a,b]$ 上で微分可能で導関数が連続な関数全体（[[fundamental-theorem|基本定理]]の記号メモ参照）。`,
      R`$I\subset\mathbb{R}$：有界閉区間。$\varphi:[\alpha,\beta]\to\mathbb{R}$（$\alpha<\beta$）は変数変換を表す関数。`,
      R`$\bigl[G(x)\bigr]_a^b:=G(b)-G(a)$。`,
    ],
    synopsis: R`積の微分公式を積分すると部分積分、合成関数の微分公式を積分すると置換積分が得られる。どちらも[[fundamental-theorem#thm-ftc2|微分積分学の基本定理]]の直接の帰結であり、仮定（$C^1$ 級・連続性）はそこから来ている。`,
    body: [
      { t: 'h2', id: 'parts', text: '部分積分' },
      { t: 'thm', id: 'thm-parts', title: '部分積分', yomi: 'ぶぶんせきぶん', imp: 3, text: R`$f,g\in C^1([a,b])$ ならば
$$\int_a^bf(x)g'(x)\,dx=\bigl[f(x)g(x)\bigr]_a^b-\int_a^bf'(x)g(x)\,dx.$$` },
      { t: 'proof', steps: [{ text: R`[[derivative-rules#thm-arith-diff|積の微分]]より $fg$ は $[a,b]$ 上で微分可能で $(fg)'=f'g+fg'$。右辺は連続関数の積と和なので $C([a,b])$ に属し、特に積分可能。[[fundamental-theorem#thm-ftc2|基本定理 (II)]]より $\int_a^b(f'g+fg')=\bigl[fg\bigr]_a^b$。[[integral-properties#thm-int-linear|線形性]]で左辺を二つの積分に分ければ（$f'g$、$fg'$ はどちらも連続なので積分可能）結論を得る。` }] },
      { t: 'ex', id: 'ex-parts', title: '例', text: R`<ol><li>$\int_0^1xe^x\,dx$：$f(x)=x$、$g(x)=e^x$ とすると $=\bigl[xe^x\bigr]_0^1-\int_0^1e^x\,dx=e-(e-1)=1$。</li><li>$n\in\mathbb{N}$ について $\int_{-\pi}^\pi x\sin(nx)\,dx$：$f(x)=x$、$g(x)=-\frac{\cos(nx)}n$ とすると $=\Bigl[-\frac{x\cos(nx)}n\Bigr]_{-\pi}^\pi+\frac1n\int_{-\pi}^\pi\cos(nx)\,dx=-\frac{2\pi(-1)^n}n+0=\frac{2\pi(-1)^{n+1}}n$。（[[fourier-series|フーリエ係数]]の計算で使う。）</li></ol>` },

      { t: 'h2', id: 'subst', text: '置換積分' },
      { t: 'thm', id: 'thm-subst', title: '置換積分', yomi: 'ちかんせきぶん', imp: 3, text: R`$\alpha<\beta$、$\varphi\in C^1([\alpha,\beta])$ とし、有界閉区間 $I$ が $\varphi([\alpha,\beta])\subset I$ をみたすとする。$f\in C(I)$ ならば
$$\int_{\varphi(\alpha)}^{\varphi(\beta)}f(x)\,dx=\int_\alpha^\beta f(\varphi(t))\,\varphi'(t)\,dt.$$
（左辺は向きのついた積分。$\varphi(\alpha)>\varphi(\beta)$ でもよい。）` },
      {
        t: 'proof',
        steps: [
          { text: R`$p\in I$ を一つ固定し $F(x):=\int_p^xf$（$x\in I$）とおく。$f\in C(I)$ なので、[[fundamental-theorem#thm-ftc1|基本定理 (I)]]より $F$ は $I$ 上微分可能で $F'=f$。` },
          { text: R`$H:=F\circ\varphi:[\alpha,\beta]\to\mathbb{R}$ は、[[derivative-rules#thm-chain|合成関数の微分]]より微分可能で $H'(t)=F'(\varphi(t))\varphi'(t)=f(\varphi(t))\varphi'(t)$。右辺は連続関数の合成と積なので連続、特に積分可能。` },
          {
            text: R`[[fundamental-theorem#thm-ftc2|基本定理 (II)]]と[[integral-properties#prop-int-add-any|区間加法性]]より`,
            eqs: [[R`\int_\alpha^\beta f(\varphi(t))\varphi'(t)\,dt=H(\beta)-H(\alpha)=F(\varphi(\beta))-F(\varphi(\alpha))=\int_{\varphi(\alpha)}^{\varphi(\beta)}f(x)\,dx.`, R`$F(v)-F(u)=\int_u^vf$`]],
          },
        ],
      },
      { t: 'note', title: '形式的な覚え方', text: R`$x=\varphi(t)$ とおくと「$dx=\varphi'(t)\,dt$」、$x$ が $\varphi(\alpha)$ から $\varphi(\beta)$ まで動くとき $t$ は $\alpha$ から $\beta$ まで動く。$dx$ を「微小な長さ」と思うとこの書きかえは自然だが、正当化は上の証明（基本定理と合成関数の微分）である。` },
      { t: 'ex', id: 'ex-subst', title: '例', text: R`<ol><li>$\int_0^1\dfrac{x}{1+x^2}\,dx$：定理を文字 $t\to x$、$x\to u$ と読みかえて使う。$\varphi(x)=1+x^2$（$[0,1]\to[1,2]$）、$f(u)=\frac1{2u}$（$u\in[1,2]$）とすると $f(\varphi(x))\varphi'(x)=\frac{2x}{2(1+x^2)}=\frac x{1+x^2}$ なので、$=\int_{\varphi(0)}^{\varphi(1)}\frac{du}{2u}=\frac12\bigl[\log u\bigr]_1^2=\frac12\log2$。</li><li>$\int_0^1\sqrt{1-x^2}\,dx$：$x=\varphi(t)=\sin t$、$t\in[0,\frac\pi2]$ とすると $\sqrt{1-\sin^2t}=\cos t$（$\cos t\ge0$）なので $=\int_0^{\pi/2}\cos^2t\,dt=\int_0^{\pi/2}\frac{1+\cos2t}2\,dt=\frac\pi4$。単位円の $\frac14$ の面積である。</li></ol>` },
      { t: 'qa', q: R`$\varphi$ が単調でなくてもよい？`, a: R`よい。定理は $\varphi$ の単調性を仮定していない。$\varphi$ が行って戻る場合は、行きと帰りの積分が打ち消し合って、結局 $\varphi(\alpha)$ から $\varphi(\beta)$ までの積分になる。必要なのは、$f$ が $\varphi$ の値域全体（$I$）で連続であることである。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\int_1^e\log x\,dx$ を求めよ。`, hint: R`$\log x=1\cdot\log x$ とみて、$g'(x)=1$、$f(x)=\log x$ で部分積分。`, answer: R`$f(x)=\log x$、$g(x)=x$ とすると $\int_1^e\log x\,dx=\bigl[x\log x\bigr]_1^e-\int_1^ex\cdot\frac1x\,dx=e-(e-1)=1$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$m,n\in\mathbb{N}$ について $\displaystyle\int_{-\pi}^\pi\sin(mx)\sin(nx)\,dx=\pi\delta_{mn}$ を示せ（$\delta_{mn}$ は[[sigma-notation#def-kronecker|クロネッカーのデルタ]]）。`, hint: R`積和公式 $\sin A\sin B=\frac12\{\cos(A-B)-\cos(A+B)\}$。$k\in\mathbb{Z}\setminus\{0\}$ なら $\int_{-\pi}^\pi\cos(kx)\,dx=0$。`, answer: R`積和公式より被積分関数は $\frac12\{\cos((m-n)x)-\cos((m+n)x)\}$。$k\ne0$ の整数について $\int_{-\pi}^\pi\cos(kx)\,dx=\bigl[\frac{\sin(kx)}k\bigr]_{-\pi}^\pi=0$。$m+n\ne0$ なので第 2 項の積分は $0$。$m\ne n$ なら第 1 項も $0$、$m=n$ なら第 1 項は $\frac12\int_{-\pi}^\pi1\,dx=\pi$。これは[[orthonormal-system|正規直交系]]の典型例である。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'improper-integral',
    title: '広義積分',
    sub: '無限区間・非有界な関数の積分',
    yomi: 'こうぎせきぶん',
    aliases: ['広義積分', 'こうぎせきぶん', '異常積分', 'いじょうせきぶん', '積分判定法', 'せきぶんはんていほう', 'ガウス積分', 'がうすせきぶん'],
    kind: '用語',
    field: '積分',
    grade: '1年後期',
    importance: 3,
    prereq: ['fundamental-theorem', 'series-tests'],
    related: ['series', 'lebesgue-lp', 'fourier-transform'],
    notation: [
      R`$a\in\mathbb{R}$。$f:[a,\infty)\to\mathbb{R}$ は、すべての $b>a$ で $f|_{[a,b]}\in\mathcal{R}([a,b])$ をみたすとする（<b>局所可積分</b>と呼ぶことにする）。`,
      R`$\displaystyle\lim_{b\to\infty}F(b)=L$：$\forall\varepsilon>0\ \exists B=B(\varepsilon)\in\mathbb{R}\ \forall b\ge B,\ |F(b)-L|<\varepsilon$。`,
      R`$\displaystyle\lim_{c\to a+0}F(c)=L$：[[function-limit#def-onesided-lim|右側極限]]。`,
      R`$p\in\mathbb{R}$。$x>0$ について $x^p:=e^{p\log x}$。$\log$ と $e^x$ の微分公式 $(\log x)'=\frac1x$、$(x^p)'=px^{p-1}$ は既知とする（[[power-series|べき級数]]の記事で定義から示す）。`,
    ],
    synopsis: R`リーマン積分は有界閉区間上の有界関数にしか使えない。区間が無限に伸びている場合や、関数が端点で発散する場合は、閉区間上の積分を作ってから極限をとる。これが広義積分である。$\int_1^\infty\frac{dx}{x^p}$ と $\int_0^1\frac{dx}{x^p}$ が比較の基準になり、級数の $p$ 級数と同じ役割を果たす。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-improper', title: '広義積分', yomi: 'こうぎせきぶん', imp: 3, text: R`<ol><li>$f:[a,\infty)\to\mathbb{R}$ が局所可積分であるとき、極限 $\displaystyle\lim_{b\to\infty}\int_a^bf(x)\,dx$ が実数として存在するならば、広義積分 $\int_a^\infty f$ は<b class="term">収束する</b>といい、その値を $\displaystyle\int_a^\infty f(x)\,dx$ と書く。</li><li>$a<b$、$f:(a,b]\to\mathbb{R}$ がすべての $c\in(a,b)$ で $f|_{[c,b]}\in\mathcal{R}([c,b])$ をみたすとき、$\displaystyle\lim_{c\to a+0}\int_c^bf(x)\,dx$ が実数として存在するならば、$\int_a^bf$ は収束するといい、その値を $\displaystyle\int_a^bf(x)\,dx$ と書く。</li></ol>どちらも、極限が存在しないとき<b class="term">発散する</b>という。両端が問題になる場合（$\int_{-\infty}^\infty$ など）は、途中の点で分けて、両方が収束するときに収束すると定める。` },
      { t: 'ex', id: 'ex-xp-inf', title: '∫₁^∞ x⁻ᵖ dx', text: R`$p\in\mathbb{R}$、$b>1$ とする。$p\ne1$ なら $\int_1^bx^{-p}\,dx=\dfrac{b^{1-p}-1}{1-p}$、$p=1$ なら $\int_1^bx^{-1}\,dx=\log b$（[[fundamental-theorem#cor-ftc-cont|原始関数で計算]]）。$b\to\infty$ とすると、$p>1$ なら $b^{1-p}\to0$ なので収束して $\displaystyle\int_1^\infty\frac{dx}{x^p}=\frac1{p-1}$。$p<1$ なら $b^{1-p}\to\infty$、$p=1$ なら $\log b\to\infty$ で発散する。` },
      { t: 'ex', id: 'ex-xp-0', title: '∫₀¹ x⁻ᵖ dx', text: R`$p\in\mathbb{R}$、$0<c<1$ とする。$p\ne1$ なら $\int_c^1x^{-p}\,dx=\dfrac{1-c^{1-p}}{1-p}$、$p=1$ なら $-\log c$。$c\to+0$ とすると、$p<1$ なら $c^{1-p}\to0$ なので収束して $\displaystyle\int_0^1\frac{dx}{x^p}=\frac1{1-p}$。$p\ge1$ なら発散する。<br>無限遠では「$p>1$（速く減る）」、$0$ の近くでは「$p<1$（ゆるく発散する）」が収束の条件で、向きが逆になることに注意。` },
      { t: 'table', html: R`<table class="tbl"><tr><th></th><th>$\int_1^\infty x^{-p}\,dx$</th><th>$\int_0^1x^{-p}\,dx$</th><th>$\sum_{n=1}^\infty n^{-p}$</th></tr><tr><td>$p<1$</td><td>発散</td><td>収束 $=\frac1{1-p}$</td><td>発散</td></tr><tr><td>$p=1$</td><td>発散</td><td>発散</td><td>発散</td></tr><tr><td>$p>1$</td><td>収束 $=\frac1{p-1}$</td><td>発散</td><td>収束</td></tr></table>`, caption: R`比較の基準になる三つの積分・級数。` },

      { t: 'h2', id: 'tests', text: '収束の判定' },
      { t: 'lem', id: 'lem-mono-lim', title: '単調増加で有界な関数は極限をもつ', yomi: 'たんちょうかんすうのきょくげん', imp: 2, text: R`$F:[a,\infty)\to\mathbb{R}$ が単調増加（$a\le b\le b'\Rightarrow F(b)\le F(b')$）で上に有界ならば、$\displaystyle\lim_{b\to\infty}F(b)=\sup_{b\ge a}F(b)$。` },
      { t: 'proof', steps: [{ text: R`$s:=\sup\{F(b)\mid b\ge a\}$（上限公理）とする。$\varepsilon>0$ に対し、[[supremum#prop-sup-eps|上限の特徴づけ]]より $F(B)>s-\varepsilon$ となる $B=B(\varepsilon)\ge a$ がある。$b\ge B$ なら単調性より $s-\varepsilon<F(B)\le F(b)\le s$ なので $|F(b)-s|<\varepsilon$。（[[monotone-convergence#thm-mct|単調収束定理]]と同じ証明である。）` }] },
      { t: 'thm', id: 'thm-improper-comp', title: '比較判定法（広義積分）', yomi: 'ひかくはんていほう', imp: 3, text: R`$f,g:[a,\infty)\to\mathbb{R}$ を局所可積分とし、すべての $x\ge a$ で $0\le f(x)\le g(x)$ とする。$\int_a^\infty g$ が収束するならば $\int_a^\infty f$ も収束し、$\int_a^\infty f\le\int_a^\infty g$。（$(a,b]$ 上の広義積分でも同様。）` },
      { t: 'proof', steps: [{ text: R`$F(b):=\int_a^bf$、$G(b):=\int_a^bg$ とおく。$f\ge0$ と区間加法性・単調性より $F$ は単調増加（$b\le b'$ なら $F(b')-F(b)=\int_b^{b'}f\ge0$）。同様に $G$ も単調増加で、$G(b)\to\int_a^\infty g=:L$ なので $G(b)\le L$（単調増加関数は極限以下）。$F(b)\le G(b)\le L$ より $F$ は上に有界で、[[improper-integral#lem-mono-lim|補題]]より収束し、極限は $L$ 以下。` }] },
      { t: 'thm', id: 'thm-improper-abs', title: '絶対収束する広義積分は収束する', yomi: 'ぜったいしゅうそく', imp: 2, text: R`$f:[a,\infty)\to\mathbb{R}$ を局所可積分とする。$\int_a^\infty|f|$ が収束するならば $\int_a^\infty f$ も収束し、$\left|\int_a^\infty f\right|\le\int_a^\infty|f|$。` },
      { t: 'proof', steps: [{ text: R`$f^+:=\frac{|f|+f}2$、$f^-:=\frac{|f|-f}2$ とおくと、どちらも局所可積分（[[integral-properties#thm-int-abs|$|f|$ の可積分性]]と線形性）で $0\le f^\pm\le|f|$、$f=f^+-f^-$。比較判定法より $\int_a^\infty f^\pm$ はどちらも収束し、極限の四則演算より $\int_a^bf=\int_a^bf^+-\int_a^bf^-$ も $b\to\infty$ で収束する。不等式は $\left|\int_a^bf\right|\le\int_a^b|f|\le\int_a^\infty|f|$ で $b\to\infty$ とすればよい。（[[absolute-convergence#thm-abs-conv|級数の場合]]の別証と同じ考え方である。）` }] },
      { t: 'ex', id: 'ex-gauss', title: 'ガウス積分 ∫ e^{−x²} dx は収束する', text: R`$x\ge1$ なら $x^2\ge x$ なので $0<e^{-x^2}\le e^{-x}$。$\int_1^be^{-x}\,dx=e^{-1}-e^{-b}\to e^{-1}$ なので、比較判定法より $\int_1^\infty e^{-x^2}\,dx$ は収束する。$[0,1]$ では連続関数のリーマン積分なので、$\int_0^\infty e^{-x^2}\,dx$ は収束する。偶関数なので $\int_{-\infty}^\infty e^{-x^2}\,dx$ も収束し、その値は $\sqrt\pi$ である（値の計算には重積分の極座標変換を使う）。この積分は[[heat-equation|熱方程式]]の基本解と[[fourier-transform|フーリエ変換]]で中心的な役割を果たす。` },

      { t: 'h2', id: 'test-series', text: '積分判定法：級数との比較' },
      { t: 'thm', id: 'thm-integral-test', title: '積分判定法', yomi: 'せきぶんはんていほう', imp: 2, text: R`$f:[1,\infty)\to\mathbb{R}$ が非負かつ単調減少ならば、すべての $n\in\mathbb{N}$ について
$$\int_1^{n+1}f(x)\,dx\le\sum_{k=1}^nf(k)\le f(1)+\int_1^nf(x)\,dx.$$
特に、$\sum_{n=1}^\infty f(n)$ が収束することと $\int_1^\infty f$ が収束することは同値である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$f$ は単調なので各 $[1,b]$ で積分可能（[[riemann-integral#thm-mono-int|単調関数は積分可能]]）。$k\in\mathbb{N}$ と $x\in[k,k+1]$ について、単調減少より $f(k+1)\le f(x)\le f(k)$。[[integral-properties#thm-int-mono|単調性]]より $f(k+1)\le\int_k^{k+1}f\le f(k)$。` },
          { text: R`右の不等式を $k=1,\dots,n$ で足すと $\int_1^{n+1}f\le\sum_{k=1}^nf(k)$。左の不等式を $k=1,\dots,n-1$ で足すと $\sum_{k=2}^nf(k)\le\int_1^nf$、両辺に $f(1)$ を足して右側の評価を得る（区間加法性）。` },
          { text: R`同値性：部分和 $\sum_{k=1}^nf(k)$ と $F(b):=\int_1^bf$ はどちらも単調増加なので、どちらの収束も上の有界性と同値（[[series#prop-positive|正項級数]]・[[improper-integral#lem-mono-lim|補題]]）。上の不等式より、一方が有界なら他方も有界である（$F$ は単調なので、$b\le n+1$ なら $F(b)\le F(n+1)$）。` },
        ],
      },
      { t: 'ex', id: 'ex-harmonic-log', title: '調和級数の増え方', text: R`$f(x)=\frac1x$ に積分判定法の不等式を使うと、$H_n=\sum_{k=1}^n\frac1k$ について
$$\log(n+1)\le H_n\le1+\log n\qquad(n\in\mathbb{N}).$$
$H_n$ は $\log n$ と同じ速さで $\infty$ に発散する（[[series#thm-harmonic|調和級数の発散]]の別証にもなっている）。さらに $H_n-\log n$ は単調減少で下に有界なので収束し、その極限 $\gamma\approx0.5772$ をオイラーの定数という。` },
      { t: 'qa', q: R`$\int_1^\infty f$ が収束すれば $f(x)\to0$（$x\to\infty$）？`, a: R`そうとは限らない（級数の[[series#thm-term|項が 0 に近づく]]こととの大きな違い）。たとえば、各整数 $n\ge2$ のまわりの幅 $\frac1{n^3}$ の区間で高さ $n$ の三角形の山をもち、それ以外で $0$ の連続関数は、山の面積の和 $\sum\frac{n}{2n^3}$ が有限なので積分は収束するが、$f(n)=n\to\infty$ である。単調減少など、追加の仮定があれば $f(x)\to0$ が言える。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\int_0^\infty\dfrac{dx}{1+x^2}$ が収束することを示し、値を求めよ。`, hint: R`$(\arctan x)'=\frac1{1+x^2}$。$\arctan b\to\frac\pi2$。`, answer: R`$\int_0^b\frac{dx}{1+x^2}=\arctan b\to\frac\pi2\ (b\to\infty)$。よって収束し、値は $\frac\pi2$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\int_1^\infty\dfrac{\sin x}{x^2}\,dx$ が収束することを示せ。`, hint: R`絶対値をとって $\left|\frac{\sin x}{x^2}\right|\le\frac1{x^2}$。`, answer: R`$x\ge1$ で $\left|\frac{\sin x}{x^2}\right|\le\frac1{x^2}$、$\int_1^\infty\frac{dx}{x^2}=1$ は収束するので、比較判定法より $\int_1^\infty\left|\frac{\sin x}{x^2}\right|dx$ は収束する。[[improper-integral#thm-improper-abs|絶対収束すれば収束]]するので、与えられた積分も収束する。`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`$s>0$ とする。ガンマ関数 $\Gamma(s):=\int_0^\infty x^{s-1}e^{-x}\,dx$ が収束することを示せ。$e^x\ge\frac{x^m}{m!}$（$x\ge0$, $m\in\mathbb{N}$）を用いてよい。`, hint: R`$(0,1]$ と $[1,\infty)$ に分ける。$(0,1]$ では $x^{s-1}e^{-x}\le x^{s-1}$、$[1,\infty)$ では $m>s+1$ をとって $e^{-x}\le m!\,x^{-m}$。`, answer: R`$(0,1]$：$0<x^{s-1}e^{-x}\le x^{s-1}=x^{-(1-s)}$ で、$1-s<1$ なので $\int_0^1x^{-(1-s)}dx$ は収束する。比較判定法より $\int_0^1x^{s-1}e^{-x}dx$ は収束。$[1,\infty)$：$m\in\mathbb{N}$ を $m>s+1$ にとると $e^{-x}\le m!\,x^{-m}$ なので $0<x^{s-1}e^{-x}\le m!\,x^{-(m-s+1)}$、$m-s+1>2>1$ なので右辺の積分は収束する。両方収束するので $\Gamma(s)$ は収束する。`, space: 8 },
    ],
  });
})();
