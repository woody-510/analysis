/* 第 9 章：重積分 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  const sqDiscSvg = `<svg viewBox="0 0 640 240" role="img" aria-label="円板・正方形・大きい円板の包含">
    <circle cx="320" cy="120" r="104" fill="rgba(35,61,107,.06)" stroke="#233d6b" stroke-width="1.4" stroke-dasharray="6 4"/>
    <rect x="246.5" y="46.5" width="147" height="147" fill="rgba(242,194,48,.22)" stroke="#222" stroke-width="1.5"/>
    <circle cx="320" cy="120" r="73.5" fill="rgba(168,38,27,.12)" stroke="#8c1c13" stroke-width="1.6"/>
    <circle cx="320" cy="120" r="3" fill="#222"/>
    <line x1="320" y1="120" x2="393.5" y2="120" stroke="#8c1c13"/><text x="350" y="114">R</text>
    <line x1="320" y1="120" x2="393.5" y2="46.5" stroke="#233d6b" stroke-dasharray="3 3"/><text x="362" y="74">√2 R</text>
    <text x="440" y="70">D(√2 R)：大きい円板（破線）</text>
    <text x="440" y="120">Q_R = [−R, R]²：正方形</text>
    <text x="440" y="170">D(R)：小さい円板（赤）</text>
  </svg>`;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'double-integral',
    title: '重積分とフビニの定理',
    sub: '長方形上の積分と累次積分',
    yomi: 'じゅうせきぶん',
    aliases: ['重積分', 'じゅうせきぶん', '二重積分', 'にじゅうせきぶん', 'フビニの定理', 'ふびに', '累次積分', 'るいじせきぶん', '積分の順序交換'],
    kind: '定理',
    field: '重積分',
    grade: '2年後期',
    importance: 3,
    prereq: ['riemann-integral', 'integral-properties', 'compactness'],
    related: ['change-of-variables', 'lebesgue-lp'],
    notation: [
      R`$Q=[a,b]\times[c,d]$（$a<b$, $c<d$）：長方形。$|Q|=(b-a)(d-c)$：面積。`,
      R`分割 $\Delta=\Delta_1\times\Delta_2$：$\Delta_1:a=x_0<\cdots<x_m=b$、$\Delta_2:c=y_0<\cdots<y_n=d$。小長方形 $Q_{ij}:=[x_{i-1},x_i]\times[y_{j-1},y_j]$、面積 $|Q_{ij}|=\Delta x_i\,\Delta y_j$。`,
      R`$M_{ij}:=\sup_{Q_{ij}}f$、$m_{ij}:=\inf_{Q_{ij}}f$、$S(f,\Delta):=\sum_{i,j}M_{ij}|Q_{ij}|$、$s(f,\Delta):=\sum_{i,j}m_{ij}|Q_{ij}|$。`,
      R`$\iint_Qf\,dx\,dy$：重積分。$\int_a^b\Bigl(\int_c^df(x,y)\,dy\Bigr)dx$：累次積分（内側を先に計算する）。`,
    ],
    synopsis: R`長方形を小さな長方形に分け、1 変数のリーマン積分と同じく上和・下和ではさむことで重積分を定義する。連続関数は積分可能で、重積分は「1 変数ずつ順に積分する」累次積分に等しい（フビニの定理）。積分の順序は、連続関数なら入れかえてよいが、そうでないと結果が変わることがある。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-double', title: '長方形上の重積分', yomi: 'じゅうせきぶん', imp: 3, text: R`有界な $f:Q\to\mathbb{R}$ について、上積分 $\overline{\iint_Q}f:=\inf_\Delta S(f,\Delta)$ と下積分 $\underline{\iint_Q}f:=\sup_\Delta s(f,\Delta)$ が等しいとき、$f$ は $Q$ 上で<b class="term">積分可能</b>であるといい、その値を $\iint_Qf\,dx\,dy$ と書く。` },
      { t: 'note', title: '1 変数と同じ性質', text: R`[[riemann-integral#lem-refine|細分の補題]]、[[riemann-integral#cor-ls-le-us|どの下和もどの上和以下]]、[[riemann-integral#thm-riemann-crit|リーマンの可積分条件]]（$S-s$ をいくらでも小さくできる ⇔ 可積分、そのとき $s\le\iint f\le S$）、[[integral-properties|線形性・単調性]]は、1 変数のときと全く同じ証明で成り立つ（小区間を小長方形に、長さを面積に置きかえるだけ）。` },
      { t: 'thm', id: 'thm-double-cont', title: '連続関数は積分可能', yomi: 'れんぞくかんすうはせきぶんかのう', imp: 3, text: R`$f\in C(Q)$ ならば、$f$ は $Q$ 上で積分可能である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$Q$ は $\mathbb{R}^2$ の有界閉集合なので[[compactness#thm-heine-borel|点列コンパクト]]であり、$f$ は有界で（[[compactness#thm-compact-max|最大値の定理]]）、[[compactness#thm-compact-uc|一様連続]]である。` },
          { text: R`$\varepsilon>0$ に対し、$\|p-q\|<\delta$（$p,q\in Q$）なら $|f(p)-f(q)|<\frac\varepsilon{|Q|}$ となる $\delta>0$ をとる。分割を細かくして、各小長方形の対角線の長さが $\delta$ 未満になるようにする。各 $Q_{ij}$ も有界閉集合なので、$M_{ij}=f(p_{ij})$、$m_{ij}=f(q_{ij})$ となる $p_{ij},q_{ij}\in Q_{ij}$ があり、$\|p_{ij}-q_{ij}\|<\delta$ より $M_{ij}-m_{ij}<\frac\varepsilon{|Q|}$。` },
          { text: R`よって $S(f,\Delta)-s(f,\Delta)=\sum(M_{ij}-m_{ij})|Q_{ij}|<\frac\varepsilon{|Q|}\sum|Q_{ij}|=\varepsilon$。可積分条件より積分可能。` },
        ],
      },

      { t: 'h2', id: 'fubini', text: 'フビニの定理' },
      { t: 'thm', id: 'thm-fubini', title: 'フビニの定理（連続関数）', yomi: 'ふびにのていり', imp: 3, text: R`$f\in C(Q)$ とし、$F(x):=\int_c^df(x,y)\,dy$（$x\in[a,b]$）とおく。このとき $F\in C([a,b])$ で
$$\iint_Qf\,dx\,dy=\int_a^b\Bigl(\int_c^df(x,y)\,dy\Bigr)dx=\int_c^d\Bigl(\int_a^bf(x,y)\,dx\Bigr)dy.$$` },
      { t: 'strategy', text: R`$F$ の積分が、どんな分割についても重積分の下和と上和の間にあることを示す。下和と上和の両方の間にある数は、重積分ただ一つである。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>$F$ の連続性。</b>$y\mapsto f(x,y)$ は連続なので $F(x)$ は定義される。$f$ は一様連続なので、$\varepsilon>0$ に対し $|x-x'|<\delta$ なら（すべての $y$ で）$|f(x,y)-f(x',y)|<\frac\varepsilon{d-c}$ となる $\delta$ があり、$|F(x)-F(x')|\le\int_c^d|f(x,y)-f(x',y)|dy<\varepsilon$。` },
          {
            text: R`<b>はさみうち。</b>分割 $\Delta$ をとる。$x\in[x_{i-1},x_i]$、$y\in[y_{j-1},y_j]$ なら $m_{ij}\le f(x,y)\le M_{ij}$。$y$ について $[y_{j-1},y_j]$ で積分し、$j$ について足すと（[[integral-properties#thm-int-mono|単調性]]・[[integral-properties#thm-int-add|区間加法性]]）`,
            eqs: [[R`\sum_{j=1}^nm_{ij}\Delta y_j\le F(x)\le\sum_{j=1}^nM_{ij}\Delta y_j\qquad(x\in[x_{i-1},x_i]).`, R`単調性・区間加法性`]],
          },
          { text: R`さらに $x$ について $[x_{i-1},x_i]$ で積分し、$i$ について足すと $s(f,\Delta)\le\int_a^bF(x)\,dx\le S(f,\Delta)$。` },
          { text: R`$\Delta$ は任意なので、$\int_a^bF$ は下和全体の上界かつ上和全体の下界で、$\underline{\iint}f\le\int_a^bF\le\overline{\iint}f$。$f$ は積分可能なので両端は等しく、$\int_a^bF=\iint_Qf$。もう一方の順序も $x$ と $y$ の役割を入れかえれば同じ。` },
        ],
      },
      { t: 'ex', id: 'ex-fubini', title: '計算例', text: R`<ol><li>$\iint_{[0,1]^2}xy\,dx\,dy=\int_0^1\Bigl(\int_0^1xy\,dy\Bigr)dx=\int_0^1\frac x2dx=\frac14$。</li><li>$f(x,y)=g(x)h(y)$（$g,h$ 連続）なら $\iint_Qf=\Bigl(\int_a^bg\Bigr)\Bigl(\int_c^dh\Bigr)$（内側の積分で $g(x)$ は定数）。たとえば $\iint_{[0,1]^2}e^{x+y}=(e-1)^2$。</li></ol>` },
      { t: 'rem', title: '順序を入れかえると値が変わる例', text: R`$f(x,y)=\dfrac{x^2-y^2}{(x^2+y^2)^2}$ は $(0,0)$ の近くで有界でないので、上の定理の対象外である。$\frac\partial{\partial y}\frac y{x^2+y^2}=\frac{x^2-y^2}{(x^2+y^2)^2}$ より、$x>0$ について $\int_0^1f(x,y)dy=\frac1{1+x^2}$、したがって $\int_0^1\int_0^1f\,dy\,dx=\int_0^1\frac{dx}{1+x^2}=\frac\pi4$。一方 $f(y,x)=-f(x,y)$ なので、逆の順序では $-\frac\pi4$ になる。積分の順序交換には、連続性（あるいはルベーグ積分での絶対可積分性）が必要である。` },
      { t: 'note', title: '一般の領域', text: R`有界な領域 $D\subset\mathbb{R}^2$ 上の積分は、$D$ を含む長方形 $Q$ をとり、$f$ を $D$ の外で $0$ とした関数の $Q$ 上の積分として定める。$D$ の境界が「面積 $0$」（ジョルダン測度 $0$：任意の $\varepsilon$ に対して面積の和が $\varepsilon$ 未満の有限個の長方形で覆える）で $f$ が $\overline D$ 上連続なら積分可能であり、縦線領域 $D=\{a\le x\le b,\ \varphi_1(x)\le y\le\varphi_2(x)\}$（$\varphi_1\le\varphi_2$ は連続）では $\iint_Df=\int_a^b\int_{\varphi_1(x)}^{\varphi_2(x)}f\,dy\,dx$ となる。（証明は参考文献）` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-double-1', level: 1, title: '基本', text: R`$\iint_{[0,1]\times[0,2]}(x^2+y)\,dx\,dy$ を求めよ。`, hint: R`$y$ から先に積分する。`, answer: R`$\int_0^1\Bigl(\int_0^2(x^2+y)dy\Bigr)dx=\int_0^1(2x^2+2)dx=\frac23+2=\frac83$。`, space: 4 },
      { t: 'problem', id: 'prob-double-2', level: 2, title: '標準', text: R`三角形 $D=\{0\le y\le x\le1\}$ 上で $\iint_Dxy\,dx\,dy$ を求めよ（縦線領域の公式を用いてよい）。`, hint: R`$\int_0^1\int_0^xxy\,dy\,dx$。`, answer: R`$\int_0^1\Bigl(\int_0^xxy\,dy\Bigr)dx=\int_0^1\frac{x^3}2dx=\frac18$。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'change-of-variables',
    title: '変数変換と極座標',
    sub: 'ヤコビアンとガウス積分 √π',
    yomi: 'へんすうへんかん',
    aliases: ['変数変換', 'へんすうへんかん', '重積分の変数変換', 'ヤコビアン', 'やこびあん', '極座標', 'きょくざひょう', 'ガウス積分', 'がうすせきぶん', '√π'],
    kind: '定理',
    field: '重積分',
    grade: '2年後期',
    importance: 3,
    prereq: ['double-integral', 'total-derivative', 'improper-integral'],
    related: ['fourier-transform', 'heat-equation', 'sobolev'],
    notation: [
      R`$\Phi:E\to\mathbb{R}^2$：変数変換（$E\subset\mathbb{R}^2$）。$D\Phi(u)$：ヤコビ行列、$\det D\Phi(u)$：ヤコビアン。`,
      R`極座標：$x=r\cos\theta$、$y=r\sin\theta$（$r\ge0$、$0\le\theta\le2\pi$）。`,
      R`$D(R):=\{(x,y)\mid x^2+y^2\le R^2\}$：半径 $R$ の円板。$Q_R:=[-R,R]^2$：正方形。`,
    ],
    synopsis: R`重積分の変数変換では、面積の伸び縮みの割合としてヤコビアン $|\det D\Phi|$ が掛かる。極座標では $dx\,dy=r\,dr\,d\theta$ となる。これを使うと、1 変数では原始関数で計算できないガウス積分 $\int_{-\infty}^\infty e^{-x^2}dx$ が、2 乗して平面上の積分とみることで $\sqrt\pi$ と求まる。`,
    body: [
      { t: 'h2', id: 'thm', text: '変数変換の公式' },
      { t: 'thm', id: 'thm-change-var', title: '重積分の変数変換', yomi: 'へんすうへんかんのこうしき', imp: 3, text: R`$E\subset\mathbb{R}^2$ を境界の面積が $0$ の有界閉領域、$\Phi$ を $E$ を含む開集合上の $C^1$ 級写像で、$E$ の内部で単射かつ $\det D\Phi\ne0$ とする。$f$ が $\Phi(E)$ 上で連続ならば
$$\iint_{\Phi(E)}f(x,y)\,dx\,dy=\iint_Ef(\Phi(u,v))\,\bigl|\det D\Phi(u,v)\bigr|\,du\,dv.$$
（証明は参考文献。1 変数の[[integration-techniques#thm-subst|置換積分]]の 2 次元版で、$|\det D\Phi|$ は「小さな長方形が $\Phi$ で写されたときの面積の拡大率」である。）` },
      { t: 'ex', id: 'ex-polar-jacobian', title: '極座標のヤコビアン', text: R`$\Phi(r,\theta)=(r\cos\theta,\ r\sin\theta)$ とすると
$$D\Phi=\begin{pmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{pmatrix},\qquad\det D\Phi=r\cos^2\theta+r\sin^2\theta=r.$$
$E=[0,R]\times[0,2\pi]$ は円板 $D(R)$ に写される（$r>0$ かつ $0<\theta<2\pi$ の内部で単射）。よって $\iint_{D(R)}f\,dx\,dy=\int_0^{2\pi}\int_0^Rf(r\cos\theta,r\sin\theta)\,r\,dr\,d\theta$。` },
      { t: 'note', title: 'n 次元の極座標', text: R`$\mathbb{R}^n$ では、$|x|$ だけに依存する関数について $\int_{\mathbb{R}^n}g(|x|)\,dx=|S^{n-1}|\int_0^\infty g(r)r^{n-1}dr$（$|S^{n-1}|$ は単位球面の面積、$n=2$ で $2\pi$、$n=3$ で $4\pi$）。[[sobolev#thm-sobolev-embed|ソボレフの埋め込み]]の証明で、$\int\langle\xi\rangle^{-2s}d\xi<\infty\iff2s>n$ を確かめるのに使った。（証明は参考文献）` },

      { t: 'h2', id: 'gauss', text: 'ガウス積分' },
      { t: 'thm', id: 'thm-gauss-integral', title: 'ガウス積分', yomi: 'がうすせきぶん', imp: 3, text: R`$\displaystyle\int_{-\infty}^\infty e^{-x^2}\,dx=\sqrt\pi$。` },
      { t: 'html', html: sqDiscSvg, caption: R`$D(R)\subset Q_R\subset D(\sqrt2R)$。正方形 $Q_R$ 上の積分はフビニの定理で 1 変数の積分の 2 乗になり、円板上の積分は極座標で計算できる。` },
      {
        t: 'proof',
        steps: [
          { text: R`広義積分 $I:=\int_{-\infty}^\infty e^{-x^2}dx$ が収束することは[[improper-integral#ex-gauss|確かめた]]。$I_R:=\int_{-R}^Re^{-x^2}dx$ とおくと $I_R\to I$（$R\to\infty$）。$g(x,y):=e^{-x^2-y^2}>0$ は連続である。` },
          { text: R`<b>正方形。</b>[[double-integral#ex-fubini|フビニの定理（積の形）]]より $\iint_{Q_R}g=\Bigl(\int_{-R}^Re^{-x^2}dx\Bigr)\Bigl(\int_{-R}^Re^{-y^2}dy\Bigr)=I_R^2$。` },
          {
            text: R`<b>円板。</b>極座標で`,
            eqs: [[R`\iint_{D(R)}g=\int_0^{2\pi}\int_0^Re^{-r^2}r\,dr\,d\theta=2\pi\Bigl[-\frac12e^{-r^2}\Bigr]_0^R=\pi\bigl(1-e^{-R^2}\bigr).`, R`$\det D\Phi=r$・$(e^{-r^2})'=-2re^{-r^2}$`]],
          },
          { text: R`<b>はさみうち。</b>$D(R)\subset Q_R\subset D(\sqrt2R)$ で $g>0$ なので（積分の単調性：大きい領域の積分のほうが大きい）、$\pi(1-e^{-R^2})\le I_R^2\le\pi(1-e^{-2R^2})$。$R\to\infty$ とすると両端は $\pi$ に収束するので $I^2=\lim I_R^2=\pi$。$I>0$ なので $I=\sqrt\pi$。` },
        ],
      },
      { t: 'cor', id: 'cor-gauss-n', title: 'n 次元のガウス積分', yomi: 'えぬじげんのがうすせきぶん', imp: 2, text: R`$a>0$ について $\displaystyle\int_{\mathbb{R}}e^{-ax^2}dx=\sqrt{\frac\pi a}$、$\displaystyle\int_{\mathbb{R}^n}e^{-a|x|^2}dx=\Bigl(\frac\pi a\Bigr)^{n/2}$。` },
      { t: 'proof', steps: [{ text: R`1 次元は $x=\frac y{\sqrt a}$ と置換。$n$ 次元は $e^{-a|x|^2}=\prod_je^{-ax_j^2}$ で、長方形 $[-R,R]^n$ 上でフビニの定理を $n-1$ 回使えば各因子の積分の積になり、$R\to\infty$ とすればよい。[[heat-equation#prop-heat-kernel|熱核の積分が 1]] になるのはこの式による。` }] },
      { t: 'qa', q: R`なぜ 2 乗すると計算できる？`, a: R`$e^{-x^2}$ の原始関数は初等関数で書けないので、1 変数のままでは計算できない。2 乗して平面上の $e^{-(x^2+y^2)}=e^{-r^2}$ の積分にすると、極座標のヤコビアン $r$ が付いて $re^{-r^2}$ となり、これは $-\frac12e^{-r^2}$ の導関数なので計算できる。回転対称性を利用したのである。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-cv-1', level: 1, title: '基本', text: R`極座標を用いて $\iint_{D(1)}(x^2+y^2)\,dx\,dy$ を求めよ。`, hint: R`$\int_0^{2\pi}\int_0^1r^2\cdot r\,dr\,d\theta$。`, answer: R`$\int_0^{2\pi}\int_0^1r^3dr\,d\theta=2\pi\cdot\frac14=\frac\pi2$。`, space: 4 },
      { t: 'problem', id: 'prob-cv-2', level: 2, title: '標準', text: R`$\displaystyle\int_0^\infty x^2e^{-x^2}dx=\frac{\sqrt\pi}4$ を示せ。`, hint: R`部分積分：$x^2e^{-x^2}=x\cdot xe^{-x^2}$、$\bigl(-\frac12e^{-x^2}\bigr)'=xe^{-x^2}$。`, answer: R`$[0,R]$ で部分積分すると $\int_0^Rx\cdot xe^{-x^2}dx=\bigl[-\frac x2e^{-x^2}\bigr]_0^R+\frac12\int_0^Re^{-x^2}dx$。$R\to\infty$ で第 1 項は $0$、第 2 項は $\frac12\cdot\frac{\sqrt\pi}2$（ガウス積分の半分）。よって $\frac{\sqrt\pi}4$。`, space: 6 },
    ],
  });
})();
