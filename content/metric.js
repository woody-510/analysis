/* ユークリッド空間（第 8 章）と距離空間（第 10 章：資料 付録 13〜17 章） */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* 図：開集合と ε 近傍（白黒でも読めるように線種で区別する） */
  const openSetSvg = `<svg viewBox="0 0 640 230" role="img" aria-label="開集合の各点のまわりに小さな球がとれる">
    <path d="M90,120 C75,40 250,18 340,40 C440,62 560,50 548,130 C538,200 380,214 260,198 C150,186 98,175 90,120 Z" fill="rgba(168,38,27,.10)" stroke="#222" stroke-width="1.5" stroke-dasharray="7 5"/>
    <text x="112" y="70">U</text>
    <circle cx="300" cy="118" r="44" fill="rgba(35,61,107,.10)" stroke="#233d6b" stroke-width="1.4"/>
    <circle cx="300" cy="118" r="3.5" fill="#222"/><text x="290" y="108">x</text>
    <line x1="300" y1="118" x2="344" y2="118" stroke="#233d6b" stroke-width="1.4"/><text x="316" y="136">ε</text>
    <circle cx="500" cy="128" r="22" fill="rgba(35,61,107,.10)" stroke="#233d6b" stroke-width="1.4"/>
    <circle cx="500" cy="128" r="3.5" fill="#222"/><text x="440" y="176">y（ε を小さく）</text>
    <circle cx="547" cy="134" r="4" fill="#fff" stroke="#222" stroke-width="1.4"/><text x="560" y="128">z ∉ U</text>
  </svg>`;
  const ballTriSvg = `<svg viewBox="0 0 640 230" role="img" aria-label="開球の中の点のまわりに小さな球がとれる">
    <circle cx="230" cy="118" r="100" fill="rgba(168,38,27,.08)" stroke="#222" stroke-width="1.5" stroke-dasharray="7 5"/>
    <circle cx="230" cy="118" r="3.5" fill="#222"/><text x="206" y="138">a</text>
    <circle cx="290" cy="78" r="27.9" fill="rgba(35,61,107,.12)" stroke="#233d6b" stroke-width="1.4"/>
    <circle cx="290" cy="78" r="3.5" fill="#222"/><text x="270" y="72">x₀</text>
    <line x1="230" y1="118" x2="290" y2="78" stroke="#222" stroke-width="1.2"/>
    <line x1="290" y1="78" x2="313.2" y2="62.5" stroke="#233d6b" stroke-width="2"/>
    <line x1="230" y1="118" x2="330" y2="118" stroke="#6d665a" stroke-dasharray="2 3"/><text x="300" y="136">r</text>
    <text x="370" y="60">太線：ε = r − d(x₀, a)</text>
    <text x="370" y="84">細線：d(x₀, a)</text>
    <text x="370" y="124">N(x₀; ε) ⊂ N(a; r)</text>
  </svg>`;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'euclidean-space',
    title: 'ユークリッド空間 ℝⁿ',
    sub: '内積・ノルム・コーシー＝シュワルツの不等式',
    yomi: 'ゆーくりっどくうかん',
    aliases: ['ユークリッド空間', 'ゆーくりっどくうかん', 'Rn', 'ℝⁿ', '内積', 'ないせき', 'ユークリッドノルム', 'コーシー・シュワルツの不等式', 'こーしーしゅわるつ', 'シュワルツの不等式', '点列', 'てんれつ'],
    kind: '用語',
    field: '多変数',
    grade: '1年後期',
    importance: 3,
    prereq: ['sequence-convergence', 'bolzano-weierstrass', 'cauchy-sequence'],
    related: ['metric-space', 'normed-space', 'hilbert-space'],
    notation: [
      R`$n\in\mathbb{N}$。$\mathbb{R}^n:=\{x=(x_1,\dots,x_n)\mid x_j\in\mathbb{R}\ (1\le j\le n)\}$。成分 $x_j$ は実数。`,
      R`和とスカラー倍：$x+y:=(x_1+y_1,\dots,x_n+y_n)$、$\alpha x:=(\alpha x_1,\dots,\alpha x_n)$（$\alpha\in\mathbb{R}$）。$0:=(0,\dots,0)$。`,
      R`内積 $x\cdot y:=\sum_{j=1}^nx_jy_j\in\mathbb{R}$。ノルム $\|x\|:=\sqrt{x\cdot x}=\bigl(\sum_{j=1}^nx_j^2\bigr)^{1/2}\ge0$（資料では $\|x\|_{\mathbb{R}^n}$ とも書く）。`,
      R`点列 $\{x^{(k)}\}_{k\in\mathbb{N}}\subset\mathbb{R}^n$：各 $k$ に $\mathbb{R}^n$ の点 $x^{(k)}=(x^{(k)}_1,\dots,x^{(k)}_n)$ を対応させたもの。添字 $k$ は右上にかっこ付きで書き、成分の番号 $j$ と区別する。`,
    ],
    synopsis: R`$\mathbb{R}^n$ では、内積 $x\cdot y$ からノルム（長さ）$\|x\|$ と距離 $\|x-y\|$ が定まり、コーシー＝シュワルツの不等式 $|x\cdot y|\le\|x\|\|y\|$ から三角不等式が出る。点列の収束・コーシー列・ボルツァーノ＝ワイエルシュトラスの定理は、すべて成分ごとの議論に帰着する。距離空間・ノルム空間・ヒルベルト空間は、ここでの性質を抜き出して一般化したものである。`,
    body: [
      { t: 'h2', id: 'inner', text: '内積とノルム' },
      { t: 'prop', id: 'prop-inner', title: '内積の性質', yomi: 'ないせきのせいしつ', imp: 2, text: R`$x,y,z\in\mathbb{R}^n$、$\alpha\in\mathbb{R}$ について
<ol><li>$x\cdot x\ge0$、かつ $x\cdot x=0\iff x=0$。</li><li>$x\cdot y=y\cdot x$。</li><li>$(x+y)\cdot z=x\cdot z+y\cdot z$、$(\alpha x)\cdot y=\alpha(x\cdot y)$。</li></ol>` },
      { t: 'proof', steps: [{ text: R`(1) $x\cdot x=\sum x_j^2$ は非負の数の和なので $\ge0$。和が $0$ なら各 $x_j^2=0$（非負の数の和が $0$ なら各項が $0$）なので $x=0$。逆は明らか。(2) $x_jy_j=y_jx_j$。(3) 有限和の[[sigma-notation#prop-sum-rules|線形性]]。` }] },
      { t: 'thm', id: 'thm-cs-rn', title: 'コーシー＝シュワルツの不等式', yomi: 'こーしー・しゅわるつのふとうしき', imp: 3, text: R`任意の $x,y\in\mathbb{R}^n$ について
$$|x\cdot y|\le\|x\|\,\|y\|,\qquad\text{すなわち}\qquad\Bigl|\sum_{j=1}^nx_jy_j\Bigr|\le\Bigl(\sum_{j=1}^nx_j^2\Bigr)^{1/2}\Bigl(\sum_{j=1}^ny_j^2\Bigr)^{1/2}.$$` },
      { t: 'strategy', text: R`$\alpha\in\mathbb{R}$ について $\|x+\alpha y\|^2\ge0$ が<em>つねに</em>成り立つ。これを $\alpha$ の 2 次式として展開し、最小になる $\alpha$ を代入する。資料と同じ方法で、[[hilbert-space#thm-cs|内積空間]]でもそのまま使える。` },
      {
        t: 'proof',
        steps: [
          { text: R`$y=0$ なら両辺とも $0$ で成り立つ。以下 $y\ne0$ とすると $\|y\|^2>0$（内積の性質 (1)）。` },
          {
            text: R`$\alpha:=-\dfrac{x\cdot y}{\|y\|^2}\in\mathbb{R}$ とおく。内積の性質より`,
            eqs: [
              [R`0\le(x+\alpha y)\cdot(x+\alpha y)=\|x\|^2+2\alpha\,(x\cdot y)+\alpha^2\|y\|^2`, R`性質 (1)(2)(3) で展開`],
              [R`\phantom{0}=\|x\|^2-2\frac{(x\cdot y)^2}{\|y\|^2}+\frac{(x\cdot y)^2}{\|y\|^2}=\|x\|^2-\frac{(x\cdot y)^2}{\|y\|^2}.`, R`$\alpha$ を代入`],
            ],
          },
          { text: R`よって $(x\cdot y)^2\le\|x\|^2\|y\|^2$。両辺は非負なので平方根をとって（$t\mapsto\sqrt t$ は単調増加）$|x\cdot y|\le\|x\|\|y\|$。` },
        ],
      },
      { t: 'cor', id: 'cor-norm-rn', title: 'ユークリッドノルムの性質', yomi: 'ゆーくりっどのるむ', imp: 3, text: R`$x,y\in\mathbb{R}^n$、$\alpha\in\mathbb{R}$ について
<ol><li>$\|x\|\ge0$、$\|x\|=0\iff x=0$。</li><li>$\|\alpha x\|=|\alpha|\,\|x\|$。</li><li>（三角不等式）$\|x+y\|\le\|x\|+\|y\|$。</li><li>各 $j$ で $|x_j|\le\|x\|\le\sqrt n\max_{1\le i\le n}|x_i|$、また $\|x\|\le\sum_{i=1}^n|x_i|$。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) 内積の性質 (1)。(2) $\|\alpha x\|^2=\sum\alpha^2x_j^2=\alpha^2\|x\|^2$、両辺の非負の平方根をとって $\sqrt{\alpha^2}=|\alpha|$。` },
          {
            text: R`(3) `,
            eqs: [
              [R`\|x+y\|^2=\|x\|^2+2\,x\cdot y+\|y\|^2`, R`展開`],
              [R`\phantom{\|x+y\|^2}\le\|x\|^2+2\|x\|\|y\|+\|y\|^2=(\|x\|+\|y\|)^2.`, R`$x\cdot y\le|x\cdot y|$ とコーシー＝シュワルツ`],
            ],
          },
          { text: R`両辺の非負の平方根をとればよい。(4) 各 $j$ で $x_j^2\le\sum_ix_i^2\le n\max_ix_i^2$ なので、非負の平方根をとって $|x_j|\le\|x\|\le\sqrt n\max_i|x_i|$。また $\bigl(\sum_i|x_i|\bigr)^2=\sum_ix_i^2+\sum_{i\ne k}|x_i||x_k|\ge\sum_ix_i^2=\|x\|^2$（交差項は非負）なので $\|x\|\le\sum_i|x_i|$。` },
        ],
      },
      { t: 'rem', title: '(4) の読み方', text: R`(4) の「$|x_j|\le\|x\|$」は「成分は長さ以下」、「$\|x\|\le\sum_i|x_i|$」は「長さは成分の絶対値の和以下」ということである。$\max_i|x_i|\le\|x\|\le\sqrt n\max_i|x_i|$ から、$\|x\|$ と $\max_i|x_i|$ は定数倍の範囲で同じ大きさであることがわかる。これは[[normed-space#thm-equiv-fin|有限次元のノルムの同値性]]の最初の例である。` },

      { t: 'h2', id: 'seq', text: '点列の収束' },
      { t: 'def', id: 'def-conv-rn', title: 'ℝⁿ の点列の収束', yomi: 'てんれつのしゅうそく', imp: 3, text: R`点列 $\{x^{(k)}\}_{k\in\mathbb{N}}\subset\mathbb{R}^n$ が $x\in\mathbb{R}^n$ に<b class="term">収束する</b>とは、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall k\ge N,\quad\|x^{(k)}-x\|<\varepsilon$$
が成り立つことをいう。すなわち実数列 $\|x^{(k)}-x\|\to0$。$\displaystyle\lim_{k\to\infty}x^{(k)}=x$ と書く。<b class="term">コーシー列</b>も同様に $\forall\varepsilon>0\ \exists N\ \forall k,l\ge N,\ \|x^{(k)}-x^{(l)}\|<\varepsilon$ で定める。` },
      { t: 'prop', id: 'prop-conv-comp', title: '収束は成分ごとの収束と同値', yomi: 'せいぶんごとのしゅうそく', imp: 3, text: R`$\{x^{(k)}\}\subset\mathbb{R}^n$、$x\in\mathbb{R}^n$ について、$x^{(k)}\to x$ であることと、各 $j=1,\dots,n$ で実数列 $x^{(k)}_j\to x_j\ (k\to\infty)$ であることは同値である。コーシー列についても同様。` },
      {
        t: 'proof',
        steps: [
          { text: R`(⇒) [[euclidean-space#cor-norm-rn|(4)]] より $|x^{(k)}_j-x_j|\le\|x^{(k)}-x\|$。右辺が $\varepsilon$ 未満なら左辺も $\varepsilon$ 未満なので、同じ $N$ で成分も収束する。` },
          { text: R`(⇐) $\varepsilon>0$ をとる。各 $j$ について、$k\ge N_j$ で $|x^{(k)}_j-x_j|<\frac\varepsilon n$ となる $N_j=N_j(\varepsilon)\in\mathbb{N}$ をとり、$N:=\max\{N_1,\dots,N_n\}$ とおく（有限個の最大値なので存在する）。$k\ge N$ なら (4) より $\|x^{(k)}-x\|\le\sum_j|x^{(k)}_j-x_j|<n\cdot\frac\varepsilon n=\varepsilon$。` },
          { text: R`コーシー列についても、$x^{(k)}-x$ を $x^{(k)}-x^{(l)}$ に置きかえて同じ議論をすればよい。` },
        ],
      },
      { t: 'thm', id: 'thm-rn-complete', title: 'ℝⁿ は完備', yomi: 'あーるえぬのかんびせい', imp: 3, text: R`$\mathbb{R}^n$ のコーシー列は、$\mathbb{R}^n$ のある点に収束する。` },
      { t: 'proof', steps: [{ text: R`$\{x^{(k)}\}$ をコーシー列とする。[[euclidean-space#prop-conv-comp|命題]]より各成分 $\{x^{(k)}_j\}_k$ は実数のコーシー列で、[[cauchy-sequence#thm-cauchy-conv|実数の完備性]]よりある $x_j\in\mathbb{R}$ に収束する。$x:=(x_1,\dots,x_n)$ とおけば、成分ごとに収束するので命題より $x^{(k)}\to x$。` }] },
      { t: 'thm', id: 'thm-bw-rn', title: 'ℝⁿ のボルツァーノ＝ワイエルシュトラスの定理', yomi: 'ぼるつぁーの・わいえるしゅとらす', imp: 3, text: R`有界な点列 $\{x^{(k)}\}\subset\mathbb{R}^n$（ある $M>0$ ですべての $k$ について $\|x^{(k)}\|\le M$）は、収束する部分列をもつ。` },
      {
        t: 'proof',
        sketch: R`まず第 1 成分が収束する部分列をとり、その中からさらに第 2 成分が収束する部分列をとり……と $n$ 回くり返す。部分列の部分列はもとの列の部分列であり、収束列の部分列は同じ極限に収束するので、最後に得られた部分列ではすべての成分が収束する。`,
        steps: [
          { text: R`各成分は $|x^{(k)}_j|\le\|x^{(k)}\|\le M$ で有界な実数列である。` },
          { text: R`$\{x^{(k)}_1\}_k$ に[[bolzano-weierstrass#thm-bw|1 次元の定理]]を使い、狭義単調増加な番号の列 $\{k^{(1)}_i\}_{i\in\mathbb{N}}$ で $x^{(k^{(1)}_i)}_1$ が収束するものをとる。次に、有界な実数列 $\{x^{(k^{(1)}_i)}_2\}_i$ に定理を使って、その部分列（番号 $\{k^{(2)}_i\}\subset\{k^{(1)}_i\}$、狭義単調増加）で第 2 成分が収束するものをとる。第 1 成分は収束列の部分列なので、[[bolzano-weierstrass#prop-subseq-conv|同じ極限に収束したまま]]である。` },
          { text: R`これを $j=n$ までくり返すと、番号の列 $\{k^{(n)}_i\}_i$ に沿って、すべての成分 $j=1,\dots,n$ が収束する。[[euclidean-space#prop-conv-comp|命題]]より部分列 $\{x^{(k^{(n)}_i)}\}_i$ は $\mathbb{R}^n$ で収束する。` },
        ],
      },
      { t: 'note', title: 'ℂⁿ の場合', text: R`複素数 $z=x+iy$（$x,y\in\mathbb{R}$）を $(x,y)\in\mathbb{R}^2$ と同一視すれば、$\mathbb{C}^n$ は $\mathbb{R}^{2n}$ と同一視でき、$\|z\|_{\mathbb{C}^n}:=\bigl(\sum_j|z_j|^2\bigr)^{1/2}=\bigl(\|x\|^2+\|y\|^2\bigr)^{1/2}$ は $\mathbb{R}^{2n}$ のユークリッドノルムに一致する。したがって、完備性もボルツァーノ＝ワイエルシュトラスの定理も $\mathbb{C}^n$ でそのまま成り立つ。ただし内積は $(z,w):=\sum_jz_j\overline{w_j}$ と複素共役を付けて定める（[[hilbert-space|内積空間]]）。` },
      { t: 'qa', q: R`無限次元でもボルツァーノ＝ワイエルシュトラスの定理は成り立つ？`, a: R`成り立たない。数列空間 $\ell^2$ の単位ベクトル $e_k=(0,\dots,0,1,0,\dots)$（$k$ 番目だけ $1$）は $\|e_k\|=1$ で有界だが、$k\ne l$ なら $\|e_k-e_l\|=\sqrt2$ なので、どの部分列もコーシー列にならず収束しない。上の証明は「成分が有限個」であることを使って $n$ 回で止めていた。この違いが[[normed-space|無限次元のノルム空間]]の難しさの源である。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$x,y\in\mathbb{R}^n$ について、中線定理 $\|x+y\|^2+\|x-y\|^2=2\|x\|^2+2\|y\|^2$ を示せ。`, hint: R`両辺を内積で展開する。`, answer: R`$\|x\pm y\|^2=\|x\|^2\pm2\,x\cdot y+\|y\|^2$ を足すと、交差項が消えて $2\|x\|^2+2\|y\|^2$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`コーシー＝シュワルツの不等式で等号が成り立つのは、$x,y$ の一方が他方の実数倍のときに限ることを示せ。`, hint: R`$y\ne0$ のとき、等号なら証明中の $\|x+\alpha y\|^2=0$。`, answer: R`$y=0$ なら $y=0\cdot x$。$y\ne0$ で等号が成り立つと、証明の計算より $\|x+\alpha y\|^2=\|x\|^2-\frac{(x\cdot y)^2}{\|y\|^2}=0$ なので $x+\alpha y=0$、すなわち $x=-\alpha y$。逆に $x=\beta y$ なら $|x\cdot y|=|\beta|\|y\|^2=\|x\|\|y\|$。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'metric-space',
    title: '距離空間',
    sub: '距離の公理と例・点列の収束・完備性',
    yomi: 'きょりくうかん',
    aliases: ['距離空間', 'きょりくうかん', '距離', 'きょり', '距離関数', '距離の公理', 'きょりのこうり', '離散距離', 'りさんきょり', '完備距離空間', 'かんび', '完備', '基本列', 'きほんれつ'],
    kind: '用語',
    field: '距離空間',
    grade: '2年後期',
    importance: 3,
    prereq: ['euclidean-space', 'sets', 'maps', 'cauchy-sequence'],
    related: ['open-closed', 'normed-space', 'banach-space', 'banach-fixed-point'],
    notation: [
      R`$X$：空でない集合。$X\times X:=\{(x,y)\mid x,y\in X\}$（直積集合）。`,
      R`$d:X\times X\to\mathbb{R}$：距離関数。$(X,d)$：距離空間（集合と距離の組）。`,
      R`点列 $\{x_k\}_{k\in\mathbb{N}}\subset X$：各 $k\in\mathbb{N}$ に $x_k\in X$ を対応させたもの（$X$ の元は数とは限らないので「数列」ではなく「点列」と呼ぶ）。`,
      R`$C(I)$：区間 $I$ 上の実数値連続関数全体。$B(I)$：$I$ 上の有界な実数値関数全体。`,
      R`$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon>0$ に応じて決まる番号。`,
    ],
    synopsis: R`「距離」が満たすべき 3 つの性質（正値性・対称性・三角不等式）だけを取り出して公理とし、それを満たす関数 $d$ をもつ集合を距離空間と呼ぶ。数直線や $\mathbb{R}^n$ だけでなく、関数の集合にも距離が入り、点列の収束やコーシー列（基本列）、完備性を同じ言葉で論じられるようになる。`,
    body: [
      { t: 'h2', id: 'def', text: '距離の公理' },
      { t: 'p', text: R`数直線では $|x-y|$、平面では $\sqrt{(x_1-y_1)^2+(x_2-y_2)^2}$ で 2 点の離れ具合を測った。これまでの収束の議論で使ったのは、距離の値そのものではなく、次の 3 つの性質だけだった。そこでこの 3 つを公理として採用し、「距離」をもつ集合一般について収束を考える。` },
      { t: 'def', id: 'def-metric', title: '距離空間', yomi: 'きょりくうかん', imp: 3, text: R`$X\ne\emptyset$ を集合とする。写像 $d:X\times X\to\mathbb{R}$ が次の 3 条件をみたすとき、$d$ を $X$ 上の<b class="term">距離関数</b>（距離）という。
<ol><li>（正値性）すべての $x,y\in X$ で $d(x,y)\ge0$。さらに $d(x,y)=0\iff x=y$。</li><li>（対称性）すべての $x,y\in X$ で $d(x,y)=d(y,x)$。</li><li>（三角不等式）すべての $x,y,z\in X$ で $d(x,z)\le d(x,y)+d(y,z)$。</li></ol>距離関数の定められた集合 $X$ を<b class="term">距離空間</b>といい、$(X,d)$ と書く。` },
      { t: 'note', title: '言い換え', text: R`(1) は「距離は $0$ 以上で、$0$ になるのは同じ点どうしだけ」、(2) は「行きと帰りの距離は同じ」、(3) は「寄り道すると近くはならない」。$\mathbb{R}^n$ のユークリッド距離はこの 3 つをすべてみたす（[[euclidean-space#cor-norm-rn|ノルムの性質]]より $d(x,y)=\|x-y\|$）。距離空間論は $\mathbb{R}^n$ をモデルにしている。` },
      { t: 'rem', title: '資料の記号の誤植について', text: R`参考資料（解析学 IV）第 13 章の公理 (1) は PDF の文字化けで「$d(x,y)\le0$」と表示されることがあるが、正しくは $d(x,y)\ge0$ である（収束の定義の「$N\le1$」「$k\le N$」も、正しくは $N\ge1$、$k\ge N$）。` },

      { t: 'h2', id: 'examples', text: '距離空間の例' },
      { t: 'ex', id: 'ex-metric-r', title: 'ℝ と ℝⁿ', text: R`<ol><li>$\mathbb{R}$ に $d(x,y):=|x-y|$ を入れたもの。(3) は[[abs-triangle#cor-tri-dist|距離の三角不等式]]。</li><li>$\mathbb{R}^n$ に $d_2(x,y):=\|x-y\|=\bigl(\sum_j(x_j-y_j)^2\bigr)^{1/2}$ を入れたもの（ユークリッド距離）。</li><li>$\mathbb{R}^n$ に $d_1(x,y):=\sum_j|x_j-y_j|$、あるいは $d_\infty(x,y):=\max_j|x_j-y_j|$ を入れたもの。同じ集合でも距離の入れ方は一つではない。</li></ol>` },
      { t: 'fig', type: 'lpball', preset: 'p2', caption: R`$\mathbb{R}^2$ で原点からの距離が $1$ 以下の点の集合（単位球）。$d_2$ では円、$d_1$ では菱形、$d_\infty$ では正方形になる（点線）。$p$ を動かすと、$d_p(x,y)=(|x_1-y_1|^p+|x_2-y_2|^p)^{1/p}$ の単位球が変わる。$p<1$ では単位球がへこみ、三角不等式が成り立たなくなる（距離にならない）。` },
      { t: 'ex', id: 'ex-discrete', title: '離散距離', text: R`任意の集合 $X\ne\emptyset$ に $d(x,y):=0\ (x=y)$、$d(x,y):=1\ (x\ne y)$ と定めると距離になる。(1)(2) は定義から明らか。(3)：$x,y,z\in X$ とする。$d(x,z)=0$ なら右辺は $0$ 以上なので成り立つ。$d(x,z)=1$ なら $x\ne z$ なので、$x=y$ と $y=z$ が同時に成り立つことはない（同時に成り立てば $x=z$）。よって $d(x,y)$, $d(y,z)$ の少なくとも一方は $1$ で、右辺 $\ge1=d(x,z)$。` },
      { t: 'ex', id: 'ex-metric-sup', title: '有界関数の空間と上限距離', text: R`区間 $I\subset\mathbb{R}$ 上の有界な実数値関数全体を $B(I)$ とし、$d_\infty(f,g):=\sup_{x\in I}|f(x)-g(x)|$（$f,g\in B(I)$）と定める。$|f-g|\le|f|+|g|$ は有界なので上限は実数である。(1)：$d_\infty(f,g)=0$ なら各 $x$ で $0\le|f(x)-g(x)|\le0$、すなわち $f=g$。(2) は $|f(x)-g(x)|=|g(x)-f(x)|$。(3)：各 $x\in I$ で $|f(x)-h(x)|\le|f(x)-g(x)|+|g(x)-h(x)|\le d_\infty(f,g)+d_\infty(g,h)$。右辺は $x$ によらない上界なので、左辺の上限をとっても成り立つ。$I=[a,b]$ なら $C(I)\subset B(I)$（[[extreme-value#lem-bdd|連続関数は有界]]）で、$d_\infty(f,g)=\max_{x\in I}|f(x)-g(x)|$（最大値の定理）。[[uniform-convergence#prop-unif-sup|一様収束]]はこの距離での収束である。` },
      { t: 'ex', id: 'ex-metric-l1', title: '連続関数の空間と積分距離', text: R`$I=[a,b]$ とし、$f,g\in C(I)$ について $d_1(f,g):=\int_a^b|f(x)-g(x)|\,dx$ と定めると距離になる。積分は $|f-g|\in C(I)$ なので意味をもつ。(2) は明らか。(1)：$d_1\ge0$ は[[integral-properties#thm-int-mono|単調性]]。$d_1(f,g)=0$ なら、$|f-g|$ は連続で非負かつ積分が $0$ なので恒等的に $0$（[[integral-properties#prob-1|連続性を使う問題]]）、すなわち $f=g$。(3)：$|f-h|\le|f-g|+|g-h|$ を積分して、単調性と線形性から $d_1(f,h)\le d_1(f,g)+d_1(g,h)$。
<br><b>注意：</b>連続性を外すと (1) が崩れる。たとえば $f=0$ と、一点だけ値を変えた関数 $g$ は $\int|f-g|=0$ だが $f\ne g$。[[lebesgue-lp|$L^p$ 空間]]で「ほとんど至るところ等しい関数を同一視する」のはこのためである。` },
      { t: 'ex', id: 'ex-metric-sub', title: '部分空間（距離の制限）', text: R`$(X,d)$ が距離空間で $Y\subset X$, $Y\ne\emptyset$ なら、$d$ を $Y\times Y$ に制限した $d|_{Y\times Y}$ は $Y$ 上の距離になる（3 条件は $X$ のすべての点で成り立つので、特に $Y$ の点で成り立つ）。たとえば $(0,1]$ や $\mathbb{Q}$ は、$\mathbb{R}$ の距離 $|x-y|$ で距離空間になる。` },

      { t: 'h2', id: 'conv', text: '点列の収束とコーシー列' },
      { t: 'def', id: 'def-metric-conv', title: '点列の収束', yomi: 'てんれつのしゅうそく', imp: 3, text: R`距離空間 $(X,d)$ の点列 $\{x_k\}\subset X$ が $x\in X$ に<b class="term">収束する</b>とは、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall k\in\mathbb{N},\quad k\ge N\Longrightarrow d(x_k,x)<\varepsilon$$
が成り立つことをいう。このとき $x$ を<b class="term">極限点</b>（極限）といい、$\displaystyle\lim_{k\to\infty}x_k=x$ または $x_k\to x$ と書く。言い換えると、実数列 $d(x_k,x)\to0$ のことである。` },
      { t: 'prop', id: 'prop-metric-unique', title: '極限の一意性', yomi: 'きょくげんのいちいせい', imp: 2, text: R`距離空間の点列の極限は、存在すればただ一つである。` },
      { t: 'proof', steps: [{ text: R`$x_k\to x$, $x_k\to y$ とする。三角不等式と対称性より $0\le d(x,y)\le d(x,x_k)+d(x_k,y)=d(x_k,x)+d(x_k,y)\to0$。[[sequence-convergence#prop-order|はさみうち]]より $d(x,y)=0$（$d(x,y)$ は $k$ によらない定数）、公理 (1) より $x=y$。` }] },
      { t: 'def', id: 'def-metric-cauchy', title: '基本列（コーシー列）', yomi: 'きほんれつ', imp: 3, text: R`距離空間 $(X,d)$ の点列 $\{x_k\}$ が<b class="term">基本列</b>（コーシー列）であるとは、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall k,l\ge N,\quad d(x_k,x_l)<\varepsilon$$
が成り立つことをいう。` },
      { t: 'prop', id: 'prop-conv-cauchy-metric', title: '収束列は基本列', yomi: 'しゅうそくれつはきほんれつ', imp: 2, text: R`距離空間で収束する点列は基本列である。` },
      { t: 'proof', steps: [{ text: R`$x_k\to x$ とし、$\varepsilon>0$ に対し $k\ge N$ で $d(x_k,x)<\frac\varepsilon2$ となる $N$ をとる。$k,l\ge N$ なら $d(x_k,x_l)\le d(x_k,x)+d(x,x_l)<\varepsilon$（三角不等式と対称性）。` }] },
      { t: 'def', id: 'def-complete', title: '完備距離空間', yomi: 'かんびきょりくうかん', imp: 3, text: R`距離空間 $(X,d)$ の任意の基本列が $X$ の中に極限点をもつとき、$(X,d)$ は<b class="term">完備</b>であるという。` },
      { t: 'ex', id: 'ex-complete', title: '完備な例とそうでない例', text: R`<ol><li>$\mathbb{R}$（$|x-y|$）、$\mathbb{R}^n$（$d_2$）は完備（[[cauchy-sequence#thm-cauchy-conv|実数の完備性]]・[[euclidean-space#thm-rn-complete|ℝⁿ の完備性]]）。</li><li>$(0,1]$（$|x-y|$）は完備でない：$x_k=\frac1k$ は $\mathbb{R}$ で $0$ に収束するので基本列だが、$(0,1]$ の中に極限をもたない（もし $x\in(0,1]$ に収束すれば、$\mathbb{R}$ での極限の一意性より $x=0$ となり矛盾）。</li><li>$\mathbb{Q}$（$|x-y|$）は完備でない：$\sqrt2$ に収束する有理数列（たとえば $\sqrt2$ の小数展開を $k$ 桁で切ったもの）は基本列だが、極限 $\sqrt2\notin\mathbb{Q}$。</li><li>$C([a,b])$ は $d_\infty$ で完備（[[banach-space#thm-c-complete|バナッハ空間]]）だが、$d_1$ では完備でない（[[banach-space#ex-c-l1|例]]）。同じ集合でも、距離によって完備かどうかが変わる。</li></ol>` },
      { t: 'crux', text: R`完備性は「近づき合う点列には、必ず行き先が空間の中にある」という性質である。行き先の値がわからなくても、基本列であることさえ示せば存在が保証される。[[banach-fixed-point|バナッハの不動点定理]]は、この性質を使って方程式の解の存在を示す。` },
      { t: 'qa', q: R`距離空間とノルム空間の違いは？`, a: R`距離空間は「集合＋距離」で、足し算やスカラー倍は要らない。[[normed-space|ノルム空間]]は「線形空間＋ノルム（長さ）」で、$d(x,y):=\|x-y\|$ と定めると距離空間になる。関数解析では主にノルム空間を扱い、距離空間の言葉（開集合・閉包・完備性）をそのまま借りる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\mathbb{R}^n$ の $d_1(x,y)=\sum_j|x_j-y_j|$ と $d_\infty(x,y)=\max_j|x_j-y_j|$ が距離であることを示せ。`, hint: R`各成分で三角不等式を使い、足す（または最大値をとる）。`, answer: R`(1)(2) は各成分の絶対値の性質から。(3)：各 $j$ で $|x_j-z_j|\le|x_j-y_j|+|y_j-z_j|$。$d_1$ では $j$ について足して $d_1(x,z)\le d_1(x,y)+d_1(y,z)$。$d_\infty$ では右辺 $\le d_\infty(x,y)+d_\infty(y,z)$ がすべての $j$ で成り立つので、左辺の最大値をとって $d_\infty(x,z)\le d_\infty(x,y)+d_\infty(y,z)$。`, space: 6 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`離散距離空間 $(X,d)$ において、基本列はある番号から先で一定（$x_k=x_N$, $k\ge N$）であることを示し、離散距離空間は完備であることを示せ。`, hint: R`$\varepsilon=\frac12$ とおく。`, answer: R`基本列 $\{x_k\}$ に $\varepsilon=\frac12$ を使うと、$k,l\ge N$ で $d(x_k,x_l)<\frac12$。離散距離の値は $0$ か $1$ なので $d(x_k,x_l)=0$、すなわち $x_k=x_l$。よって $k\ge N$ で $x_k=x_N$。このとき任意の $\varepsilon>0$ について $k\ge N$ で $d(x_k,x_N)=0<\varepsilon$ なので $x_k\to x_N\in X$。よって完備。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'open-closed',
    title: '開集合と閉集合',
    sub: 'ε 近傍・開球・閉球',
    yomi: 'かいしゅうごうとへいしゅうごう',
    aliases: ['開集合', 'かいしゅうごう', '閉集合', 'へいしゅうごう', 'ε近傍', 'いぷしろんきんぼう', '近傍', 'きんぼう', '開球', 'かいきゅう', '閉球', 'へいきゅう'],
    kind: '用語',
    field: '距離空間',
    grade: '2年後期',
    importance: 3,
    prereq: ['metric-space', 'sets', 'propositional-logic'],
    related: ['interior-boundary', 'closure', 'metric-continuity'],
    notation: [
      R`$(X,d)$：距離空間。$a\in X$、$\varepsilon>0$, $r>0$：正の実数。`,
      R`$N(a;\varepsilon):=\{x\in X\mid d(x,a)<\varepsilon\}$：中心 $a$、半径 $\varepsilon$ の開球（$\varepsilon$ 近傍）。$B(a;\varepsilon)$ と書く本も多い。`,
      R`$D(a;r):=\{x\in X\mid d(x,a)\le r\}$：閉球。`,
      R`$\mathcal{O}_d(X)$：$(X,d)$ の開集合全体。$\mathcal{C}_d(X)$：閉集合全体。$A^c:=X\setminus A$：補集合。`,
      R`$\{U_\lambda\}_{\lambda\in\Lambda}$：添字集合 $\Lambda$ で番号づけられた集合の族（$\Lambda$ は無限集合でもよい）。$\bigcup_{\lambda\in\Lambda}U_\lambda:=\{x\mid\exists\lambda\in\Lambda,\ x\in U_\lambda\}$。`,
    ],
    synopsis: R`集合 $U$ のどの点 $x$ についても、$x$ を中心とする小さな球 $N(x;\varepsilon)$ が $U$ に収まるとき、$U$ を開集合という。補集合が開集合であるものを閉集合という。開集合は任意個の和と有限個の共通部分で閉じ、閉集合は有限個の和と任意個の共通部分で閉じる。`,
    body: [
      { t: 'h2', id: 'nbhd', text: 'ε 近傍と開集合' },
      { t: 'def', id: 'def-nbhd', title: 'ε 近傍・近傍', yomi: 'きんぼう', imp: 3, text: R`$(X,d)$ を距離空間、$a\in X$、$\varepsilon>0$ とする。中心 $a$、半径 $\varepsilon$ の<b class="term">開球</b>
$$N(a;\varepsilon):=\{x\in X\mid d(x,a)<\varepsilon\}$$
を点 $a$ の<b class="term">$\varepsilon$ 近傍</b>という。集合 $V\subset X$ が $a$ の<b class="term">近傍</b>であるとは、ある $\varepsilon>0$ で $N(a;\varepsilon)\subset V$ となることをいう。` },
      { t: 'ex', id: 'ex-nbhd', title: 'ε 近傍の形', text: R`$\mathbb{R}$（$|x-y|$）では $N(a;\varepsilon)=(a-\varepsilon,a+\varepsilon)$（開区間）。$\mathbb{R}^2$ では、$d_2$ で円板の内部、$d_1$ で菱形の内部、$d_\infty$ で正方形の内部（[[metric-space#examples|単位球の図]]）。離散距離では、$\varepsilon\le1$ なら $N(a;\varepsilon)=\{a\}$、$\varepsilon>1$ なら $N(a;\varepsilon)=X$。` },
      { t: 'def', id: 'def-open', title: '開集合', yomi: 'かいしゅうごう', imp: 3, text: R`部分集合 $U\subset X$ が<b class="term">開集合</b>であるとは、
$$\forall x\in U,\ \exists\varepsilon=\varepsilon(x)>0\ \text{ s.t. }\ N(x;\varepsilon)\subset U$$
が成り立つことをいう。$(X,d)$ の開集合全体を $\mathcal{O}_d(X)$ と書く。` },
      { t: 'html', html: openSetSvg, caption: R`開集合 $U$（点線の境界は $U$ に含まれない）。各点 $x\in U$ ごとに半径 $\varepsilon=\varepsilon(x)$ を選んでよく、境界に近い点 $y$ ほど $\varepsilon$ を小さくとる必要がある。境界上の点 $z$ がもし $U$ に属していたら、$z$ のまわりのどんな小さな球も $U$ からはみ出すので、$U$ は開集合でなくなる。` },
      { t: 'thm', id: 'thm-ball-open', title: '開球は開集合', yomi: 'かいきゅうはかいしゅうごう', imp: 3, text: R`$a\in X$, $r>0$ とする。開球 $N(a;r)$ は開集合である。` },
      { t: 'html', html: ballTriSvg, caption: R`$x_0\in N(a;r)$ のまわりには、半径 $\varepsilon=r-d(x_0,a)$ の球がとれる。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x_0\in N(a;r)$ を任意にとる。$d(x_0,a)<r$ なので $\varepsilon:=r-d(x_0,a)>0$（$\varepsilon$ は $x_0$ に依存する）。` },
          {
            text: R`$x\in N(x_0;\varepsilon)$ を任意にとると、`,
            eqs: [
              [R`d(x,a)\le d(x,x_0)+d(x_0,a)`, R`三角不等式`],
              [R`\phantom{d(x,a)}<\varepsilon+d(x_0,a)=r.`, R`$x\in N(x_0;\varepsilon)$ と $\varepsilon$ の定義`],
            ],
          },
          { text: R`よって $x\in N(a;r)$。$x$ は任意なので $N(x_0;\varepsilon)\subset N(a;r)$。$x_0$ も任意なので $N(a;r)$ は開集合である。` },
        ],
      },
      { t: 'thm', id: 'thm-open-axioms', title: '開集合の基本性質', yomi: 'かいしゅうごうのきほんせいしつ', imp: 3, text: R`距離空間 $(X,d)$ について次が成り立つ。
<ol><li>$\emptyset\in\mathcal{O}_d(X)$、$X\in\mathcal{O}_d(X)$。</li><li>$m\in\mathbb{N}$、$U_1,\dots,U_m\in\mathcal{O}_d(X)$ ならば $\bigcap_{i=1}^mU_i\in\mathcal{O}_d(X)$（有限個の共通部分）。</li><li>$\{U_\lambda\}_{\lambda\in\Lambda}\subset\mathcal{O}_d(X)$ ならば $\bigcup_{\lambda\in\Lambda}U_\lambda\in\mathcal{O}_d(X)$（任意個の和集合）。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $\emptyset$ について示すべき命題は「$\forall x\in\emptyset,\ \exists\varepsilon>0,\ N(x;\varepsilon)\subset\emptyset$」であり、$x\in\emptyset$ となる $x$ は存在しないので[[propositional-logic#rem-vacuous|空虚に真]]である。$X$ については、任意の $x\in X$ で $N(x;1)\subset X$（$N(x;1)$ は定義から $X$ の部分集合）。` },
          { text: R`(2) $x\in\bigcap_{i=1}^mU_i$ を任意にとる。各 $i$ で $x\in U_i$ かつ $U_i$ は開集合なので、$N(x;\varepsilon_i)\subset U_i$ となる $\varepsilon_i>0$ がある。$\varepsilon:=\min\{\varepsilon_1,\dots,\varepsilon_m\}>0$（<em>有限個</em>の正の数の最小値なので正）とおくと、各 $i$ で $N(x;\varepsilon)\subset N(x;\varepsilon_i)\subset U_i$。よって $N(x;\varepsilon)\subset\bigcap_iU_i$。` },
          { text: R`(3) $x\in\bigcup_\lambda U_\lambda$ を任意にとると、ある $\mu\in\Lambda$ で $x\in U_\mu$。$U_\mu$ は開集合なので $N(x;\varepsilon)\subset U_\mu$ となる $\varepsilon>0$ があり、$U_\mu\subset\bigcup_\lambda U_\lambda$ なので $N(x;\varepsilon)\subset\bigcup_\lambda U_\lambda$。` },
        ],
      },
      { t: 'rem', title: '無限個の共通部分は開集合とは限らない', text: R`$\mathbb{R}$ で $U_n:=(-\frac1n,\frac1n)$（$n\in\mathbb{N}$）はどれも開集合だが、$\bigcap_{n\in\mathbb{N}}U_n=\{0\}$ は開集合でない（$\{0\}$ はどんな $(-\varepsilon,\varepsilon)$ も含まない）。証明 (2) で「有限個の最小値は正」を使ったが、無限個の正の数 $\frac1n$ の下限は $0$ になりうるのである。` },

      { t: 'h2', id: 'closed', text: '閉集合' },
      { t: 'def', id: 'def-closed', title: '閉集合', yomi: 'へいしゅうごう', imp: 3, text: R`部分集合 $F\subset X$ が<b class="term">閉集合</b>であるとは、補集合 $F^c=X\setminus F$ が開集合であることをいう。閉集合全体を $\mathcal{C}_d(X)$ と書く。` },
      { t: 'thm', id: 'thm-ball-closed', title: '閉球は閉集合', yomi: 'へいきゅうはへいしゅうごう', imp: 2, text: R`$a\in X$, $r>0$ とする。閉球 $D(a;r)=\{x\in X\mid d(x,a)\le r\}$ は閉集合である。` },
      {
        t: 'proof',
        steps: [
          { text: R`補集合 $D(a;r)^c=\{x\in X\mid d(x,a)>r\}$ が開集合であることを示す。$x_0\in D(a;r)^c$ を任意にとり、$\varepsilon:=d(x_0,a)-r>0$ とおく。` },
          {
            text: R`$x\in N(x_0;\varepsilon)$ なら、`,
            eqs: [
              [R`d(x_0,a)\le d(x_0,x)+d(x,a)<\varepsilon+d(x,a)`, R`三角不等式・$d(x_0,x)=d(x,x_0)<\varepsilon$`],
              [R`\therefore\ d(x,a)>d(x_0,a)-\varepsilon=r.`, R`$\varepsilon$ の定義`],
            ],
          },
          { text: R`よって $N(x_0;\varepsilon)\subset D(a;r)^c$ で、補集合は開集合。` },
        ],
      },
      { t: 'thm', id: 'thm-closed-axioms', title: '閉集合の基本性質', yomi: 'へいしゅうごうのきほんせいしつ', imp: 3, text: R`<ol><li>$\emptyset,X\in\mathcal{C}_d(X)$。</li><li>$F_1,\dots,F_m\in\mathcal{C}_d(X)$ ならば $\bigcup_{i=1}^mF_i\in\mathcal{C}_d(X)$（有限個の和集合）。</li><li>$\{F_\lambda\}_{\lambda\in\Lambda}\subset\mathcal{C}_d(X)$ ならば $\bigcap_{\lambda\in\Lambda}F_\lambda\in\mathcal{C}_d(X)$（任意個の共通部分）。</li></ol>` },
      { t: 'proof', steps: [{ text: R`(1) $\emptyset^c=X$、$X^c=\emptyset$ はともに開集合。(2) [[propositional-logic#prop-demorgan|ド・モルガンの法則]]より $\left(\bigcup_{i=1}^mF_i\right)^c=\bigcap_{i=1}^mF_i^c$ で、右辺は有限個の開集合の共通部分なので開集合。(3) 同様に $\left(\bigcap_\lambda F_\lambda\right)^c=\bigcup_\lambda F_\lambda^c$ は開集合の和集合なので開集合。（任意個の集合のド・モルガンの法則も、$x\notin\bigcap_\lambda F_\lambda\iff\exists\lambda,\ x\notin F_\lambda$ という[[logic-quantifiers#prop-neg|量化子の否定]]から同じように示せる。）` }] },
      { t: 'thm', id: 'thm-point-closed', title: '一点集合は閉集合', yomi: 'いってんしゅうごう', imp: 2, text: R`任意の $a\in X$ について $\{a\}$ は閉集合である。したがって有限集合も閉集合である。` },
      { t: 'proof', steps: [{ text: R`$x_0\in X\setminus\{a\}$ をとり $\varepsilon:=d(x_0,a)>0$（$x_0\ne a$ なので正）とおく。$x\in N(x_0;\varepsilon)$ なら $d(x,a)\ge d(x_0,a)-d(x_0,x)>\varepsilon-\varepsilon=0$（三角不等式）なので $x\ne a$。よって $N(x_0;\varepsilon)\subset X\setminus\{a\}$ で補集合は開集合。有限集合は有限個の一点集合の和集合なので、閉集合の性質 (2) より閉集合。` }] },
      { t: 'rem', title: '「開」と「閉」は反対語ではない', text: R`<ul><li>開集合かつ閉集合：$\emptyset$ と $X$ はつねにそう。離散距離空間では<em>すべての</em>部分集合がそうである（$N(x;\frac12)=\{x\}$ なのでどの集合も開集合、したがって補集合も開集合）。</li><li>開集合でも閉集合でもない：$\mathbb{R}$ の $[0,1)$。$0$ のまわりの球は $[0,1)$ からはみ出し（開でない）、$1$ のまわりの球は補集合からはみ出す（閉でない）。</li><li>一点集合 $\{a\}$ は $\mathbb{R}$ では開集合でないが、離散距離空間では開集合である。開かどうかは距離による。</li></ul>` },
      { t: 'qa', q: R`閉集合を「極限をとっても外に出ない集合」と習ったが？`, a: R`それは同値な特徴づけで、[[closure#cor-closed-seq|閉包の記事]]で示す：「$F$ が閉集合 ⇔ $F$ の点列が $X$ のある点に収束すれば、その極限は $F$ に属する」。関数解析ではこちらの形を使うことが多い。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\mathbb{R}$ の開区間 $(p,q)$（$p<q$）は開集合、閉区間 $[p,q]$ は閉集合であることを示せ。`, hint: R`$(p,q)=N\left(\frac{p+q}2;\frac{q-p}2\right)$、$[p,q]=D\left(\frac{p+q}2;\frac{q-p}2\right)$。`, answer: R`$c=\frac{p+q}2$, $r=\frac{q-p}2$ とすると $|x-c|<r\iff p<x<q$ なので $(p,q)=N(c;r)$ は開球、したがって開集合。同様に $[p,q]=D(c;r)$ は閉球なので閉集合。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\mathbb{R}$ において、$F_n:=[\frac1n,1]$（$n\in\mathbb{N}$）の和集合 $\bigcup_nF_n$ は閉集合か。`, hint: R`和集合を具体的に求める。`, answer: R`$\bigcup_{n\in\mathbb{N}}[\frac1n,1]=(0,1]$（$x\in(0,1]$ なら $\frac1n\le x$ となる $n$ がある。$0$ はどの $F_n$ にも入らない）。$(0,1]$ は閉集合でない：補集合 $(-\infty,0]\cup(1,\infty)$ の点 $0$ のまわりのどの球 $(-\varepsilon,\varepsilon)$ も $(0,1]$ の点を含む。無限個の閉集合の和集合は閉とは限らない。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'interior-boundary',
    title: '内部・外部・境界',
    sub: '内点・外点・境界点',
    yomi: 'ないぶ・がいぶ・きょうかい',
    aliases: ['内点', 'ないてん', '内部', 'ないぶ', '開核', 'かいかく', '外点', 'がいてん', '外部', 'がいぶ', '境界点', 'きょうかいてん', '境界', 'きょうかい'],
    kind: '用語',
    field: '距離空間',
    grade: '2年後期',
    importance: 2,
    prereq: ['open-closed'],
    related: ['closure', 'metric-continuity'],
    notation: [
      R`$(X,d)$：距離空間。$A\subset X$：部分集合。$A^c=X\setminus A$。`,
      R`$A^i$：$A$ の内部（資料の記号。interior の i）。多くの本では $A^\circ$ や $\operatorname{int}A$ と書く。`,
      R`$A^e:=(A^c)^i$：外部（exterior の e）。$A^f$：境界（frontier の f）。多くの本では $\partial A$ と書く。`,
    ],
    synopsis: R`集合 $A$ に対して空間の各点は、「まわりの小さな球がまるごと $A$ に入る点（内点）」「まるごと $A$ の外に入る点（外点）」「どんな小さな球も $A$ と外の両方にかかる点（境界点）」のどれか一つに分類される。内部は $A$ に含まれる最大の開集合であり、境界はつねに閉集合である。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-interior', title: '内点・内部', yomi: 'ないてん', imp: 3, text: R`$x\in X$ が $A$ の<b class="term">内点</b>であるとは、ある $\varepsilon>0$ で $N(x;\varepsilon)\subset A$ となることをいう。内点全体の集合
$$A^i:=\{x\in X\mid\exists\varepsilon>0:\ N(x;\varepsilon)\subset A\}$$
を $A$ の<b class="term">内部</b>（開核）という。` },
      { t: 'def', id: 'def-exterior', title: '外点・外部', yomi: 'がいてん', imp: 2, text: R`$A$ の補集合の内部 $A^e:=(A^c)^i=\{x\in X\mid\exists\varepsilon>0:\ N(x;\varepsilon)\subset A^c\}$ を $A$ の<b class="term">外部</b>といい、その点を<b class="term">外点</b>という。` },
      { t: 'def', id: 'def-boundary', title: '境界点・境界', yomi: 'きょうかいてん', imp: 3, text: R`$x\in X$ が $A$ の<b class="term">境界点</b>であるとは、任意の $\varepsilon>0$ について $N(x;\varepsilon)\cap A\ne\emptyset$ かつ $N(x;\varepsilon)\cap A^c\ne\emptyset$ となることをいう。境界点全体の集合を $A^f$ と書き、$A$ の<b class="term">境界</b>という。` },
      { t: 'ex', id: 'ex-int-r', title: 'ℝ での例', text: R`<ol><li>$A=[0,1)$：$A^i=(0,1)$、$A^e=(-\infty,0)\cup(1,\infty)$、$A^f=\{0,1\}$。境界点 $0$ は $A$ に属し、$1$ は属さない。境界点は $A$ に属しても属さなくてもよい。</li><li>$A=\mathbb{Q}$：どの区間にも有理数と無理数がある（[[supremum#prop-dense|稠密性]]）ので、$A^i=\emptyset$、$A^e=\emptyset$、$A^f=\mathbb{R}$。</li><li>$A=\{\frac1n\mid n\in\mathbb{N}\}$：$A^i=\emptyset$、$A^f=A\cup\{0\}$。</li></ol>` },
      { t: 'prop', id: 'prop-partition', title: '空間は内部・外部・境界に分かれる', yomi: 'ぶんかつ', imp: 2, text: R`$A\subset X$ について $X=A^i\cup A^e\cup A^f$ であり、$A^i\cap A^e=A^i\cap A^f=A^e\cap A^f=\emptyset$。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x\in X$ を任意にとる。任意の $\varepsilon>0$ について「$N(x;\varepsilon)\cap A^c=\emptyset$（すなわち $N(x;\varepsilon)\subset A$）」「$N(x;\varepsilon)\cap A=\emptyset$（すなわち $N(x;\varepsilon)\subset A^c$）」「両方と交わる」のどれかである。` },
          { text: R`ある $\varepsilon$ で $N(x;\varepsilon)\subset A$ なら $x\in A^i$。ある $\varepsilon$ で $N(x;\varepsilon)\subset A^c$ なら $x\in A^e$。どちらでもなければ、すべての $\varepsilon$ で両方と交わるので $x\in A^f$。よって $X=A^i\cup A^e\cup A^f$。` },
          { text: R`共通部分：$x\in A^i\cap A^e$ なら $N(x;\varepsilon_1)\subset A$、$N(x;\varepsilon_2)\subset A^c$ で、$\varepsilon=\min\{\varepsilon_1,\varepsilon_2\}$ とすると $x\in N(x;\varepsilon)\subset A\cap A^c=\emptyset$ となり矛盾。$x\in A^i\cap A^f$ なら $N(x;\varepsilon)\subset A$ となる $\varepsilon$ があり、それは $N(x;\varepsilon)\cap A^c\ne\emptyset$ に反する。$A^e\cap A^f=\emptyset$ も同様。` },
        ],
      },

      { t: 'h2', id: 'props', text: '内部の性質' },
      { t: 'thm', id: 'thm-open-int', title: '開集合 ⇔ A = Aⁱ', yomi: 'かいしゅうごうとないぶ', imp: 3, text: R`$A\subset X$ について、$A$ が開集合であることと $A^i=A$ は同値である。` },
      { t: 'proof', steps: [{ text: R`まず $A^i\subset A$ はつねに成り立つ（$x\in A^i$ なら $x\in N(x;\varepsilon)\subset A$。$d(x,x)=0<\varepsilon$ に注意）。（必要性）$A$ が開集合なら、$x\in A$ について $N(x;\varepsilon)\subset A$ となる $\varepsilon$ があり $x\in A^i$。よって $A\subset A^i$。（十分性）$A^i=A$ なら、任意の $x\in A=A^i$ について内点の定義から $N(x;\varepsilon)\subset A$ となる $\varepsilon$ がある。これは開集合の定義そのもの。` }] },
      { t: 'prop', id: 'prop-int-mono', title: '内部の単調性', yomi: 'ないぶのたんちょうせい', imp: 1, text: R`$A\subset B\subset X$ ならば $A^i\subset B^i$。` },
      { t: 'proof', steps: [{ text: R`$x\in A^i$ なら $N(x;\varepsilon)\subset A\subset B$ となる $\varepsilon$ があるので $x\in B^i$。` }] },
      { t: 'thm', id: 'thm-int-open', title: '内部は開集合', yomi: 'ないぶはかいしゅうごう', imp: 3, text: R`任意の $A\subset X$ について $(A^i)^i=A^i$。すなわち $A^i$ は開集合である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$(A^i)^i\subset A^i$ はつねに成り立つ（上の証明の最初）ので、$A^i\subset(A^i)^i$ を示す。$x\in A^i$ とすると、$N(x;\varepsilon)\subset A$ となる $\varepsilon>0$ がある。この $N(x;\varepsilon)$ が $A^i$ に含まれることを示せば、$x\in(A^i)^i$ となる。` },
          { text: R`$y\in N(x;\varepsilon)$ とし $\delta:=\varepsilon-d(x,y)>0$ とおく。[[open-closed#thm-ball-open|開球は開集合]]の証明と同じく $N(y;\delta)\subset N(x;\varepsilon)\subset A$ なので、$y\in A^i$。よって $N(x;\varepsilon)\subset A^i$。` },
        ],
      },
      { t: 'thm', id: 'thm-int-max', title: '内部は A に含まれる最大の開集合', yomi: 'ないぶはさいだいのかいしゅうごう', imp: 2, text: R`$A\subset X$ について、$A^i$ は $A$ に含まれる開集合であり、$A$ に含まれる任意の開集合 $B$ は $B\subset A^i$ をみたす。同様に、外部 $A^e$ は $A^c$ に含まれる最大の開集合である。` },
      { t: 'proof', steps: [{ text: R`$A^i$ が開集合で $A^i\subset A$ であることは上で示した。$B\subset A$ を開集合とすると、[[interior-boundary#thm-open-int|定理]]と[[interior-boundary#prop-int-mono|単調性]]より $B=B^i\subset A^i$。外部については $A$ を $A^c$ に置きかえればよい（$A^e=(A^c)^i$）。` }] },
      { t: 'thm', id: 'thm-boundary-closed', title: '境界は閉集合', yomi: 'きょうかいはへいしゅうごう', imp: 2, text: R`任意の $A\subset X$ について、$A^f$ は閉集合である。` },
      { t: 'proof', steps: [{ text: R`[[interior-boundary#prop-partition|分割]]より $(A^f)^c=A^i\cup A^e$。$A^i$ と $A^e=(A^c)^i$ はともに開集合（[[interior-boundary#thm-int-open|定理]]）なので、和集合は開集合。よって $A^f$ は閉集合。` }] },
      { t: 'qa', q: R`$A^f$ と $(A^c)^f$ の関係は？`, a: R`等しい。境界点の定義「すべての $\varepsilon$ で $A$ とも $A^c$ とも交わる」は $A$ と $A^c$ について対称だからである（$(A^c)^c=A$）。$A$ とその外側は、同じ境界を共有している。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\mathbb{R}^2$（ユークリッド距離）で $A=\{(x,y)\mid x^2+y^2<1\}\cup\{(1,0)\}$ の内部と境界を求めよ。`, hint: R`開円板は開集合。点 $(1,0)$ はどんな球も円の外とかかる。`, answer: R`$A^i=\{x^2+y^2<1\}$（開円板は開集合で $A$ に含まれ、$(1,0)$ は内点でない）。$A^f=\{x^2+y^2=1\}$（円周上の点はどの球も円板の内側と外側の両方にかかる。$(1,0)$ も境界点）。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'closure',
    title: '閉包と稠密性',
    sub: '触点・集積点・孤立点',
    yomi: 'へいほう',
    aliases: ['閉包', 'へいほう', '触点', 'しょくてん', '集積点', 'しゅうせきてん', '孤立点', 'こりつてん', '導集合', 'どうしゅうごう', '稠密', 'ちゅうみつ', '密', 'みつ'],
    kind: '用語',
    field: '距離空間',
    grade: '2年後期',
    importance: 3,
    prereq: ['interior-boundary', 'open-closed'],
    related: ['normed-space', 'extension-theorem', 'metric-continuity'],
    notation: [
      R`$(X,d)$：距離空間。$A\subset X$。`,
      R`$\overline{A}$：$A$ の閉包。資料の付録では $A^a$（adherent の a）と書く。関数解析の本編（資料第 2 章以降）では $\overline{A}$ を使う。`,
      R`$A^d$：$A$ の導集合（集積点全体。derive の d）。多くの本では $A'$ と書く。`,
      R`点列 $\{x_n\}\subset A$：すべての $n\in\mathbb{N}$ で $x_n\in A$ となる点列。`,
    ],
    synopsis: R`どんな小さな球をとっても $A$ の点を含むような点を触点といい、触点全体を閉包 $\overline A$ という。閉包はちょうど「$A$ の点列の極限としてとれる点」全体であり、$A$ を含む最小の閉集合である。$\overline A=X$ のとき $A$ は稠密といい、「$X$ のどの点も $A$ の点でいくらでも近似できる」ことを意味する。`,
    body: [
      { t: 'h2', id: 'def', text: '触点と閉包' },
      { t: 'def', id: 'def-closure', title: '触点・閉包', yomi: 'へいほう', imp: 3, text: R`$x\in X$ が $A$ の<b class="term">触点</b>であるとは、任意の $\varepsilon>0$ について $N(x;\varepsilon)\cap A\ne\emptyset$ となることをいう。触点全体の集合
$$\overline{A}:=\{x\in X\mid\forall\varepsilon>0,\ N(x;\varepsilon)\cap A\ne\emptyset\}$$
を $A$ の<b class="term">閉包</b>という。` },
      { t: 'note', title: '言い換え', text: R`「$x\in\overline A$」は「$x$ のどれほど近くにも $A$ の点がある」「$A$ から $x$ までの距離が $0$」ということである。$A\subset\overline A$ はつねに成り立つ（$x\in A$ なら $x\in N(x;\varepsilon)\cap A$）。` },
      { t: 'thm', id: 'thm-closure-seq', title: '閉包の点列による特徴づけ', yomi: 'へいほうのてんれつによるとくちょうづけ', imp: 3, text: R`$A\subset X$ について
$$\overline A=\Bigl\{x\in X\ \Bigm|\ \text{ある点列 }\{x_n\}\subset A\text{ が存在して }\lim_{n\to\infty}x_n=x\Bigr\}.$$` },
      {
        t: 'proof',
        steps: [
          { text: R`(⊂) $x\in\overline A$ とする。各 $n\in\mathbb{N}$ について $\varepsilon=\frac1n$ とすると $N(x;\frac1n)\cap A\ne\emptyset$ なので、$x_n\in A$ で $d(x_n,x)<\frac1n$ となるものがとれる。$\varepsilon>0$ に対し、[[supremum#cor-arch|アルキメデスの原理]]で $\frac1N<\varepsilon$ となる $N=N(\varepsilon)$ をとれば、$n\ge N$ で $d(x_n,x)<\frac1n\le\frac1N<\varepsilon$。よって $x_n\to x$。` },
          { text: R`(⊃) $\{x_n\}\subset A$, $x_n\to x$ とする。$\varepsilon>0$ に対し、$n\ge N$ で $d(x_n,x)<\varepsilon$ となる $N$ があり、特に $x_N\in N(x;\varepsilon)\cap A$。よって $N(x;\varepsilon)\cap A\ne\emptyset$ がすべての $\varepsilon$ で成り立ち、$x\in\overline A$。` },
        ],
      },
      { t: 'thm', id: 'thm-closure-min', title: '閉包は A を含む最小の閉集合', yomi: 'へいほうはさいしょうのへいしゅうごう', imp: 3, text: R`$A\subset X$ について、$\overline A$ は $A$ を含む閉集合であり、$A$ を含む任意の閉集合 $B$ は $\overline A\subset B$ をみたす。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>閉集合であること。</b>$(\overline A)^c=A^e$ を示す。触点の定義を否定すると、$x\notin\overline A\iff\exists\varepsilon>0,\ N(x;\varepsilon)\cap A=\emptyset\iff\exists\varepsilon>0,\ N(x;\varepsilon)\subset A^c\iff x\in(A^c)^i=A^e$。$A^e$ は[[interior-boundary#thm-int-open|開集合]]なので、$\overline A$ は閉集合。` },
          { text: R`<b>最小であること。</b>$B\supset A$ を閉集合とする。$B^c\subset(\overline A)^c=A^e$ を示せばよい。$x\in B^c$ なら、$B^c$ は開集合なので $N(x;\varepsilon)\subset B^c\subset A^c$ となる $\varepsilon$ があり、$x\in A^e$。` },
        ],
      },
      { t: 'cor', id: 'cor-closed-eq', title: '閉集合 ⇔ A = Ā', yomi: 'へいしゅうごうとへいほう', imp: 3, text: R`$A\subset X$ について、$A$ が閉集合であることと $\overline A=A$ は同値である。特に $\overline{\overline A}=\overline A$。` },
      { t: 'proof', steps: [{ text: R`$\overline A=A$ なら、$\overline A$ は閉集合なので $A$ も閉集合。逆に $A$ が閉集合なら、[[closure#thm-closure-min|定理]]を $B=A$ に使って $\overline A\subset A$、$A\subset\overline A$ と合わせて等しい。$\overline A$ は閉集合なので、今示したことを $\overline A$ に使えば $\overline{\overline A}=\overline A$。` }] },
      { t: 'cor', id: 'cor-closed-seq', title: '閉集合は「極限で外に出ない集合」', yomi: 'へいしゅうごうとてんれつ', imp: 3, text: R`$F\subset X$ が閉集合であるための必要十分条件は、「$\{x_n\}\subset F$ が $x\in X$ に収束するならば $x\in F$」が成り立つことである。` },
      { t: 'proof', steps: [{ text: R`[[closure#thm-closure-seq|点列による特徴づけ]]より、条件は「$\overline F\subset F$」と同値であり、$F\subset\overline F$ はつねに成り立つので「$\overline F=F$」と同値。[[closure#cor-closed-eq|系]]より、これは $F$ が閉集合であることと同値。` }] },
      { t: 'ex', id: 'ex-closure-r', title: 'ℝ での例', text: R`$\overline{(0,1)}=[0,1]$（$\frac1n\to0$、$1-\frac1n\to1$、$[0,1]$ は閉集合で $(0,1)$ を含む）。$\overline{\mathbb{Q}}=\mathbb{R}$（どの実数も有理数列の極限：$x$ の近く $(x-\frac1n,x+\frac1n)$ に有理数がある）。$\overline{\{\frac1n\mid n\in\mathbb{N}\}}=\{\frac1n\}\cup\{0\}$。` },

      { t: 'h2', id: 'dense', text: '稠密' },
      { t: 'def', id: 'def-dense', title: '稠密', yomi: 'ちゅうみつ', imp: 3, text: R`$A\subset X$ が $X$ で<b class="term">稠密</b>（密）であるとは、$\overline A=X$ となることをいう。` },
      { t: 'prop', id: 'prop-dense-eq', title: '稠密の言い換え', yomi: 'ちゅうみつのいいかえ', imp: 3, text: R`$A\subset X$ について、次の 3 条件は同値である。
<ol><li>$A$ は $X$ で稠密である。</li><li>任意の $x\in X$ と任意の $\varepsilon>0$ について、$d(x,x')<\varepsilon$ となる $x'\in A$ が存在する。</li><li>任意の $x\in X$ について、$\lim_{n\to\infty}x_n=x$ となる点列 $\{x_n\}\subset A$ が存在する。</li></ol>` },
      { t: 'proof', steps: [{ text: R`(1)⇔(2)：$\overline A\subset X$ はつねに成り立つので、(1) は $X\subset\overline A$、すなわち「すべての $x\in X$ が触点」と同値。触点の定義 $N(x;\varepsilon)\cap A\ne\emptyset$ は「$d(x',x)<\varepsilon$ となる $x'\in A$ がある」と同じ意味なので (2) と同値。(1)⇔(3)：(1) は「すべての $x\in X$ が $\overline A$ に属する」ことで、[[closure#thm-closure-seq|点列による特徴づけ]]より (3) と同値。` }] },
      { t: 'ex', id: 'ex-dense', title: '稠密な集合の例', text: R`<ol><li>$\mathbb{Q}$ は $\mathbb{R}$ で稠密（[[supremum#prop-dense|稠密性]]）。無理数全体も $\mathbb{R}$ で稠密。</li><li>$\mathbb{Q}^n$ は $\mathbb{R}^n$ で稠密（成分ごとに有理数で近似し、[[euclidean-space#prop-conv-comp|成分ごとの収束]]を使う）。</li><li>（ワイエルシュトラスの近似定理）多項式全体は、$C([a,b])$（上限距離 $d_\infty$）で稠密である。すなわち任意の $f\in C([a,b])$ は多項式で一様に近似できる。（証明はやや長いのでここでは主張のみ。）</li></ol>` },
      { t: 'crux', text: R`稠密な部分集合は「扱いやすい元で近似する」ための土台である。関数解析では、稠密な部分空間上で定義した有界線形作用素を全体に一意に延長する[[extension-theorem#thm-extension|拡張定理]]があり、フーリエ変換を $L^2$ 全体に広げるときなどに使われる。` },

      { t: 'h2', id: 'acc', text: '集積点と孤立点' },
      { t: 'def', id: 'def-acc', title: '集積点・孤立点', yomi: 'しゅうせきてん', imp: 2, text: R`$x\in X$ が $A$ の<b class="term">集積点</b>であるとは、任意の $\varepsilon>0$ について $N(x;\varepsilon)\cap(A\setminus\{x\})\ne\emptyset$ となることをいう。集積点全体を $A^d$ と書き、<b class="term">導集合</b>という。$x\in A$ が $A$ の<b class="term">孤立点</b>であるとは、ある $\varepsilon>0$ で $N(x;\varepsilon)\cap A=\{x\}$ となることをいう。` },
      { t: 'thm', id: 'thm-closure-acc', title: 'Ā = A ∪ Aᵈ = Aⁱ ∪ Aᶠ', yomi: 'へいほうとしゅうせきてん', imp: 2, text: R`$A\subset X$ について $\overline A=A\cup A^d=A^i\cup A^f$。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>$\overline A=A\cup A^d$。</b>(⊃) $A\subset\overline A$ であり、$x\in A^d$ なら $N(x;\varepsilon)\cap A\supset N(x;\varepsilon)\cap(A\setminus\{x\})\ne\emptyset$ なので $x\in\overline A$。(⊂) $x\in\overline A$ とする。$x\in A$ なら右辺に属する。$x\notin A$ なら $A\setminus\{x\}=A$ なので、触点の条件がそのまま集積点の条件になり $x\in A^d$。` },
          { text: R`<b>$\overline A=A^i\cup A^f$。</b>[[closure#thm-closure-min|定理]]の証明で $(\overline A)^c=A^e$ を示した。[[interior-boundary#prop-partition|分割]] $X=A^i\cup A^e\cup A^f$（互いに素）より、$\overline A=X\setminus A^e=A^i\cup A^f$。` },
        ],
      },
      { t: 'ex', id: 'ex-acc', title: '例', text: R`$A=\{\frac1n\mid n\in\mathbb{N}\}\subset\mathbb{R}$ について、$A^d=\{0\}$ で、$A$ の点はすべて孤立点（$\frac1n$ のまわりの幅 $\frac1{n(n+1)}$ の区間には $A$ の他の点がない）。集積点 $0$ は $A$ に属さない。一方 $A=[0,1]$ なら $A^d=[0,1]$ で孤立点はない。` },
      { t: 'qa', q: R`触点と集積点の違いは？`, a: R`触点は「近くに $A$ の点がある」、集積点は「近くに<em>自分以外の</em> $A$ の点がある」。$A$ の孤立点は触点だが集積点ではない。集積点は「$A$ の点が無限に集まってくる場所」で、実際 $x\in A^d$ なら $x$ のどの近傍にも $A$ の点が無限個ある。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$A,B\subset X$ について $\overline{A\cup B}=\overline A\cup\overline B$ を示せ。`, hint: R`(⊃) は単調性。(⊂) は右辺が $A\cup B$ を含む閉集合であることと最小性。`, answer: R`閉包は単調（$A\subset B\Rightarrow\overline A\subset\overline B$：触点の定義から）なので $\overline A,\overline B\subset\overline{A\cup B}$。逆に $\overline A\cup\overline B$ は閉集合の有限個の和なので閉集合で、$A\cup B$ を含む。[[closure#thm-closure-min|最小性]]より $\overline{A\cup B}\subset\overline A\cup\overline B$。`, space: 6 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$C([0,1])$ に $d_\infty$ を入れた距離空間で、$A:=\{f\in C([0,1])\mid f(0)=0\}$ は閉集合であることを示せ。`, hint: R`[[closure#cor-closed-seq|点列による特徴づけ]]。$|f_n(0)-f(0)|\le d_\infty(f_n,f)$。`, answer: R`$\{f_n\}\subset A$ が $f\in C([0,1])$ に $d_\infty$ で収束するとする。$|f(0)|=|f(0)-f_n(0)|\le d_\infty(f_n,f)\to0$ なので $f(0)=0$、すなわち $f\in A$。点列による特徴づけより $A$ は閉集合。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'metric-continuity',
    title: '距離空間の間の連続写像',
    sub: 'ε-δ・点列・開集合による特徴づけ',
    yomi: 'きょりくうかんのれんぞくしゃぞう',
    aliases: ['連続写像', 'れんぞくしゃぞう', '逆像', 'ぎゃくぞう', '開集合の逆像', '点列連続', 'てんれつれんぞく', '一様連続写像'],
    kind: '定理',
    field: '距離空間',
    grade: '2年後期',
    importance: 3,
    prereq: ['open-closed', 'closure', 'maps', 'continuity'],
    related: ['compactness', 'linear-operator', 'banach-fixed-point'],
    notation: [
      R`$(X,d_X)$, $(Y,d_Y)$：二つの距離空間。$f:X\to Y$：写像。`,
      R`$f(A):=\{f(x)\mid x\in A\}$（像）、$f^{-1}(V):=\{x\in X\mid f(x)\in V\}$（逆像。$f$ に逆写像がなくても定義される。[[maps#def-image|像と逆像]]）。`,
      R`$N_X(a;\delta)$, $N_Y(b;\varepsilon)$：それぞれ $X$, $Y$ の開球。`,
      R`$\delta=\delta(\varepsilon,\alpha)$：点 $\alpha\in X$ での連続性の $\delta$。`,
    ],
    synopsis: R`距離空間の間の写像 $f:X\to Y$ の連続性を ε-δ で定義する。これは「点列の像が像の極限に収束する」こと、さらに「開集合の逆像が開集合になる」ことと同値である。最後の形は距離の値を使わないので、位相空間論への入口になる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と近傍による言い換え' },
      { t: 'def', id: 'def-metric-cont', title: '連続写像', yomi: 'れんぞくしゃぞう', imp: 3, text: R`$f:X\to Y$ が点 $\alpha\in X$ で<b class="term">連続</b>であるとは、
$$\forall\varepsilon>0,\ \exists\delta=\delta(\varepsilon,\alpha)>0\ \text{ s.t. }\ \forall x\in X,\quad d_X(x,\alpha)<\delta\Longrightarrow d_Y(f(x),f(\alpha))<\varepsilon$$
が成り立つことをいう。すべての点で連続なとき、$f$ を<b class="term">連続写像</b>という。` },
      { t: 'thm', id: 'thm-cont-nbhd', title: '近傍による言い換え', yomi: 'きんぼうによるいいかえ', imp: 2, text: R`$f:X\to Y$ が $\alpha\in X$ で連続であることは、$\forall\varepsilon>0\ \exists\delta>0:\ f(N_X(\alpha;\delta))\subset N_Y(f(\alpha);\varepsilon)$ と同値である。` },
      { t: 'proof', steps: [{ text: R`$\varepsilon,\delta$ を固定して比べればよい。「$\forall x,\ d_X(x,\alpha)<\delta\Rightarrow d_Y(f(x),f(\alpha))<\varepsilon$」⇔「$\forall x,\ x\in N_X(\alpha;\delta)\Rightarrow f(x)\in N_Y(f(\alpha);\varepsilon)$」⇔「$N_X(\alpha;\delta)\subset f^{-1}(N_Y(f(\alpha);\varepsilon))$」⇔「$f(N_X(\alpha;\delta))\subset N_Y(f(\alpha);\varepsilon)$」。最後の同値は、像と逆像の一般的な関係 $f(A)\subset V\iff A\subset f^{-1}(V)$ による。` }] },
      { t: 'thm', id: 'thm-cont-seq-metric', title: '点列による特徴づけ', yomi: 'てんれつによるとくちょうづけ', imp: 3, text: R`$f:X\to Y$ が $\alpha\in X$ で連続であるための必要十分条件は、$X$ の任意の点列 $\{x_n\}$ について「$x_n\to\alpha$ ならば $f(x_n)\to f(\alpha)$」が成り立つことである。` },
      {
        t: 'proof',
        steps: [
          { text: R`(⇒) $\varepsilon>0$ に対して連続性の $\delta$ をとり、$x_n\to\alpha$ から $n\ge N$ で $d_X(x_n,\alpha)<\delta$ となる $N$ をとる。$n\ge N$ なら $d_Y(f(x_n),f(\alpha))<\varepsilon$。` },
          { text: R`(⇐) 対偶を示す。$f$ が $\alpha$ で連続でないとすると、[[logic-quantifiers#prop-neg|否定]]より、ある $\varepsilon_0>0$ があって、どの $\delta>0$ にも $d_X(x,\alpha)<\delta$ かつ $d_Y(f(x),f(\alpha))\ge\varepsilon_0$ となる $x$ がある。$\delta=\frac1n$ としてそのような点を $x_n$ とすれば、$x_n\to\alpha$ だが、すべての $n$ で $d_Y(f(x_n),f(\alpha))\ge\varepsilon_0$ なので $f(x_n)\not\to f(\alpha)$。` },
        ],
      },
      { t: 'ex', id: 'ex-dist-cont', title: '距離関数は連続', text: R`$a\in X$ を固定し、$g:X\to\mathbb{R}$, $g(x):=d(x,a)$ とする。三角不等式より $d(x,a)\le d(x,y)+d(y,a)$、$d(y,a)\le d(y,x)+d(x,a)$ なので
$$|g(x)-g(y)|=|d(x,a)-d(y,a)|\le d(x,y).$$
$g$ はリプシッツ定数 $1$ の[[uniform-continuity#def-lip|リプシッツ連続]]写像で、特に連続（$\delta=\varepsilon$ でよい）。同様に、ノルム空間のノルム $x\mapsto\|x\|$ も $\bigl|\|x\|-\|y\|\bigr|\le\|x-y\|$ より連続である。` },

      { t: 'h2', id: 'open', text: '開集合・閉集合による特徴づけ' },
      { t: 'thm', id: 'thm-cont-open', title: '連続写像の特徴づけ', yomi: 'れんぞくしゃぞうのとくちょうづけ', imp: 3, text: R`$f:X\to Y$ について、次の 3 条件は同値である。
<ol><li>$f$ は連続写像である。</li><li>$Y$ の任意の開集合 $U$ について、$f^{-1}(U)$ は $X$ の開集合である。</li><li>$Y$ の任意の閉集合 $F$ について、$f^{-1}(F)$ は $X$ の閉集合である。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1)⇒(2)：$U\subset Y$ を開集合とし、$a\in f^{-1}(U)$ を任意にとる。$f(a)\in U$ で $U$ は開集合なので、$N_Y(f(a);\varepsilon)\subset U$ となる $\varepsilon>0$ がある。$f$ は $a$ で連続なので、[[metric-continuity#thm-cont-nbhd|近傍の言い換え]]より $f(N_X(a;\delta))\subset N_Y(f(a);\varepsilon)\subset U$ となる $\delta>0$ があり、$N_X(a;\delta)\subset f^{-1}(U)$。よって $f^{-1}(U)$ は開集合。` },
          { text: R`(2)⇒(1)：$a\in X$、$\varepsilon>0$ をとる。$N_Y(f(a);\varepsilon)$ は[[open-closed#thm-ball-open|開集合]]なので、(2) より $f^{-1}(N_Y(f(a);\varepsilon))$ は開集合で、$a$ を含む。よって $N_X(a;\delta)\subset f^{-1}(N_Y(f(a);\varepsilon))$ となる $\delta>0$ があり、$f(N_X(a;\delta))\subset N_Y(f(a);\varepsilon)$。これは $a$ での連続性である。` },
          { text: R`(2)⇔(3)：逆像は補集合と交換する：$f^{-1}(V^c)=\bigl(f^{-1}(V)\bigr)^c$（$x\in f^{-1}(V^c)\iff f(x)\notin V\iff x\notin f^{-1}(V)$）。(2) を仮定し $F$ を閉集合とすると、$f^{-1}(F)^c=f^{-1}(F^c)$ は開集合なので $f^{-1}(F)$ は閉集合。(3)⇒(2) も同様に $U=(U^c)^c$ として示せる。` },
        ],
      },
      { t: 'rem', title: '像ではなく逆像', text: R`連続写像は開集合を開集合に写すとは限らない。$f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ は連続だが、開集合 $(-1,1)$ の像は $[0,1)$ で開集合でない。特徴づけに出てくるのは<em>逆像</em>である。` },
      { t: 'ex', id: 'ex-level', title: '使い方：不等式で定まる集合', text: R`$g:X\to\mathbb{R}$ が連続なら、$\{x\in X\mid g(x)<c\}=g^{-1}((-\infty,c))$ は開集合、$\{x\mid g(x)\le c\}=g^{-1}((-\infty,c])$ と $\{x\mid g(x)=c\}=g^{-1}(\{c\})$ は閉集合である。たとえば $\{(x,y)\in\mathbb{R}^2\mid x^2+y^2<1\}$ は開集合、単位円周は閉集合。ノルム空間の閉部分空間 $\{f\in C([0,1])\mid f(0)=0\}$ も、連続写像 $f\mapsto f(0)$ による $\{0\}$ の逆像なので閉集合である。` },
      { t: 'prop', id: 'prop-comp-cont', title: '連続写像の合成は連続', yomi: 'ごうせいのれんぞくせい', imp: 2, text: R`$(Z,d_Z)$ をもう一つの距離空間とする。$f:X\to Y$、$g:Y\to Z$ が連続ならば、$g\circ f:X\to Z$ も連続である。` },
      { t: 'proof', steps: [{ text: R`$W\subset Z$ を開集合とすると、$(g\circ f)^{-1}(W)=f^{-1}(g^{-1}(W))$。$g$ の連続性より $g^{-1}(W)$ は開集合、$f$ の連続性よりその逆像も開集合。[[metric-continuity#thm-cont-open|特徴づけ]]より $g\circ f$ は連続。` }] },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$C([a,b])$ に $d_\infty$ を入れる。写像 $I:C([a,b])\to\mathbb{R}$, $I(f):=\int_a^bf$ は連続であることを示せ。`, hint: R`$|I(f)-I(g)|\le(b-a)d_\infty(f,g)$。`, answer: R`[[integral-properties#thm-int-abs|積分の三角不等式]]より $|I(f)-I(g)|=\left|\int_a^b(f-g)\right|\le\int_a^b|f-g|\le(b-a)\max|f-g|=(b-a)d_\infty(f,g)$。$I$ はリプシッツ連続なので連続（$\delta=\frac\varepsilon{b-a}$）。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$f,g:X\to\mathbb{R}$ が連続ならば、$\{x\in X\mid f(x)=g(x)\}$ は閉集合であることを示せ。`, hint: R`$h=f-g$ は連続。`, answer: R`$h:=f-g$ は連続（点列による特徴づけと実数列の四則演算から）。求める集合は $h^{-1}(\{0\})$ で、$\{0\}$ は $\mathbb{R}$ の閉集合なので、[[metric-continuity#thm-cont-open|特徴づけ]] (3) より閉集合。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'compactness',
    title: '点列コンパクト',
    sub: '有界閉集合と最大値の定理',
    yomi: 'てんれつこんぱくと',
    aliases: ['コンパクト', 'こんぱくと', '点列コンパクト', 'てんれつこんぱくと', 'ハイネ・ボレルの定理', 'はいね・ぼれる', '有界閉集合', 'ゆうかいへいしゅうごう', '全有界'],
    kind: '定理',
    field: '距離空間',
    grade: '2年後期',
    importance: 3,
    prereq: ['metric-continuity', 'euclidean-space', 'closure'],
    related: ['normed-space', 'uniform-continuity', 'extreme-value'],
    notation: [
      R`$(X,d)$：距離空間。$K\subset X$。`,
      R`$K$ が<b>有界</b> $:\Longleftrightarrow$ ある $a\in X$ と $M>0$ で $K\subset N(a;M)$（$\mathbb{R}^n$ なら「ある $M$ ですべての $x\in K$ について $\|x\|\le M$」と同値）。`,
      R`部分列 $\{x_{n_k}\}_{k\in\mathbb{N}}$：$n_1<n_2<\cdots$（各 $n_k\in\mathbb{N}$）。[[bolzano-weierstrass#def-subseq|部分列]]と同じ。`,
    ],
    synopsis: R`集合 $K$ のどんな点列も $K$ の点に収束する部分列をもつとき、$K$ は点列コンパクトであるという。$\mathbb{R}^n$ では、有界閉集合がちょうど点列コンパクトな集合である。点列コンパクト集合上の連続関数は最大値・最小値をとり、一様連続になる。有限次元のノルムがすべて同値であることの証明にも使う。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と ℝⁿ での特徴づけ' },
      { t: 'def', id: 'def-seq-compact', title: '点列コンパクト', yomi: 'てんれつこんぱくと', imp: 3, text: R`$K\subset X$ が<b class="term">点列コンパクト</b>であるとは、$K$ の任意の点列 $\{x_n\}\subset K$ が、ある $x\in K$ に収束する部分列 $\{x_{n_k}\}$ をもつことをいう。` },
      { t: 'prop', id: 'prop-compact-closed-bdd', title: '点列コンパクトなら有界閉', yomi: 'こんぱくとならゆうかいへい', imp: 2, text: R`点列コンパクトな $K\subset X$ は閉集合であり、有界である。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>閉。</b>$\{x_n\}\subset K$ が $x\in X$ に収束するとする。点列コンパクト性より、ある部分列が $y\in K$ に収束する。一方、[[bolzano-weierstrass#prop-subseq-conv|収束列の部分列]]は同じ極限 $x$ に収束する（距離空間でも証明は同じ）ので、極限の一意性より $x=y\in K$。[[closure#cor-closed-seq|点列による特徴づけ]]より $K$ は閉集合。` },
          { text: R`<b>有界。</b>$K=\emptyset$ なら明らか。そうでなければ $a\in K$ を一つとる。有界でないとすると、各 $n\in\mathbb{N}$ で $d(x_n,a)\ge n$ となる $x_n\in K$ がある。部分列 $x_{n_k}\to x\in K$ をとると、$d(x_{n_k},a)\le d(x_{n_k},x)+d(x,a)$ は有界（収束する実数列は有界）だが、$d(x_{n_k},a)\ge n_k\ge k$ に矛盾する。` },
        ],
      },
      { t: 'thm', id: 'thm-heine-borel', title: 'ℝⁿ の点列コンパクト集合 ＝ 有界閉集合', yomi: 'はいね・ぼれるのていり', imp: 3, text: R`$K\subset\mathbb{R}^n$（ユークリッド距離）について、$K$ が点列コンパクトであることと、$K$ が有界閉集合であることは同値である。` },
      { t: 'proof', steps: [{ text: R`(⇒) は[[compactness#prop-compact-closed-bdd|命題]]。(⇐) $K$ を有界閉集合、$\{x_n\}\subset K$ とする。$K$ は有界なので $\{x_n\}$ は有界な点列で、[[euclidean-space#thm-bw-rn|ℝⁿ のボルツァーノ＝ワイエルシュトラスの定理]]より、ある $x\in\mathbb{R}^n$ に収束する部分列がある。$K$ は閉集合なので、[[closure#cor-closed-seq|点列による特徴づけ]]より $x\in K$。` }] },
      { t: 'rem', title: '無限次元では成り立たない', text: R`$\ell^2$ の単位閉球 $\{x\mid\|x\|\le1\}$ は有界閉集合だが、単位ベクトルの列 $e_k$ はどの部分列も収束しない（[[euclidean-space#thm-bw-rn|ℝⁿ の記事の Q&A]]）ので、点列コンパクトでない。「有界閉 ⇒ コンパクト」は有限次元の特権であり、実はノルム空間が有限次元であるための必要十分条件になっている（リースの定理）。` },

      { t: 'h2', id: 'cont', text: '連続写像とコンパクト性' },
      { t: 'thm', id: 'thm-compact-image', title: '連続写像はコンパクト性を保つ', yomi: 'れんぞくしゃぞうとこんぱくと', imp: 2, text: R`$f:X\to Y$ が連続で $K\subset X$ が点列コンパクトならば、$f(K)\subset Y$ も点列コンパクトである。` },
      { t: 'proof', steps: [{ text: R`$\{y_n\}\subset f(K)$ とし、$y_n=f(x_n)$ となる $x_n\in K$ を選ぶ。点列コンパクト性より部分列 $x_{n_k}\to x\in K$ があり、[[metric-continuity#thm-cont-seq-metric|点列による連続性]]より $y_{n_k}=f(x_{n_k})\to f(x)\in f(K)$。` }] },
      { t: 'thm', id: 'thm-compact-max', title: '最大値・最小値の定理（コンパクト版）', yomi: 'さいだいちさいしょうちのていり', imp: 3, text: R`$K\subset X$ を空でない点列コンパクト集合、$f:K\to\mathbb{R}$ を連続とする（$K$ には $X$ の距離を制限して入れる）。このとき $f$ は $K$ 上で最大値と最小値をとる。` },
      {
        t: 'proof',
        steps: [
          { text: R`$f(K)\subset\mathbb{R}$ は[[compactness#thm-compact-image|定理]]より点列コンパクトなので、[[compactness#prop-compact-closed-bdd|命題]]より有界閉集合。空でなく上に有界なので $s:=\sup f(K)\in\mathbb{R}$ がある（上限公理）。` },
          { text: R`上限の特徴づけより、各 $n$ で $s-\frac1n<y_n\le s$ となる $y_n\in f(K)$ があり、$y_n\to s$。$f(K)$ は閉集合なので $s\in f(K)$、すなわち $s=f(x_M)$ となる $x_M\in K$ がある。これが最大値。最小値は $-f$ に同じ議論を使えばよい。` },
        ],
      },
      { t: 'thm', id: 'thm-compact-uc', title: 'コンパクト集合上の連続写像は一様連続', yomi: 'こんぱくとじょうのいちようれんぞく', imp: 2, text: R`$K\subset X$ が点列コンパクトで $f:K\to Y$ が連続ならば、$f$ は一様連続である：$\forall\varepsilon>0\ \exists\delta>0\ \forall x,y\in K,\ d_X(x,y)<\delta\Rightarrow d_Y(f(x),f(y))<\varepsilon$。` },
      { t: 'proof', steps: [{ text: R`[[uniform-continuity#thm-heine|ハイネ＝カントールの定理]]の証明をそのまま写せばよい。一様連続でないとすると、$\varepsilon_0>0$ と、$d_X(x_n,y_n)<\frac1n$ かつ $d_Y(f(x_n),f(y_n))\ge\varepsilon_0$ となる $x_n,y_n\in K$ がある。点列コンパクト性で $x_{n_k}\to c\in K$ とすると、$d_X(y_{n_k},c)\le\frac1{n_k}+d_X(x_{n_k},c)\to0$。連続性より $d_Y(f(x_{n_k}),f(y_{n_k}))\le d_Y(f(x_{n_k}),f(c))+d_Y(f(c),f(y_{n_k}))\to0$ となり、$\ge\varepsilon_0$ に矛盾する。` }] },
      { t: 'crux', text: R`第 4 章の[[extreme-value#thm-evt|最大値の定理]]と[[uniform-continuity#thm-heine|ハイネ＝カントール]]は、どちらも「$[a,b]$ が点列コンパクト」という一つの性質から出ていたことがわかる。関数解析では、有限次元の単位球面 $\{c\in\mathbb{K}^d\mid\max|c_j|=1\}$ のコンパクト性から[[normed-space#thm-equiv-fin|ノルムの同値性]]を導く。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\mathbb{R}^2$ の単位円周 $S=\{(x,y)\mid x^2+y^2=1\}$ は点列コンパクトであることを示し、$f(x,y)=x+2y$ が $S$ 上で最大値をとることを結論せよ。`, hint: R`$S$ は有界で、連続関数 $g(x,y)=x^2+y^2$ による $\{1\}$ の逆像。`, answer: R`$S\subset D(0;1)$ なので有界。$g(x,y)=x^2+y^2$ は連続で $S=g^{-1}(\{1\})$ なので閉集合（[[metric-continuity#ex-level|例]]）。[[compactness#thm-heine-borel|定理]]より点列コンパクト。$f$ は連続なので[[compactness#thm-compact-max|最大値の定理]]より $S$ 上で最大値をとる（実際の最大値は $\sqrt5$、コーシー＝シュワルツより）。`, space: 6 },
    ],
  });
})();
