/* 第 14 章：線形作用素（参考資料 解析学 IV 第 10〜12 章） */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  const NOTE_OP = [
    R`$X,Y$：$\mathbb{K}$ 上の線形空間（ノルムを使う定理ではノルム空間）。$D\subset X$：部分空間。`,
    R`$T:D(T)\to Y$：作用素（写像）。$D(T)$ は<b>定義域</b>、$R(T):=\{T(f)\mid f\in D(T)\}$ は<b>値域</b>。$T(f)$ を $Tf$ とも書く。`,
    R`$L(X,Y)$：定義域が $X$ 全体の有界線形作用素全体。$L(X):=L(X,X)$。$I$：恒等作用素 $I(f)=f$。`,
    R`$\|T\|_B$：作用素ノルム（B は bounded の頭文字）。$T\in L(X,Y)$ なら $\|T\|_{L(X,Y)}$ とも書く。`,
  ];

  /* ------------------------------------------------------------ */
  A.push({
    id: 'linear-operator',
    title: '線形作用素',
    sub: '連続性と有界性（資料 第 10 章）',
    yomi: 'せんけいさようそ',
    aliases: ['線形作用素', 'せんけいさようそ', '作用素', 'さようそ', '線形写像', 'せんけいしゃぞう', '有界作用素', 'ゆうかいさようそ', '連続作用素', 'れんぞくさようそ', '定義域', 'ていぎいき', '値域', 'ちいき', '恒等作用素', '積分作用素', '微分作用素', 'シフト作用素'],
    kind: '用語',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['normed-space', 'fundamental-theorem', 'metric-continuity'],
    related: ['operator-norm', 'extension-theorem', 'neumann-series'],
    notation: NOTE_OP,
    synopsis: R`線形作用素とは、線形空間の間の「線形な写像」のことで、行列の無限次元版である。微分や積分も線形作用素とみなせる。ノルム空間の間の線形作用素では、「連続」と「有界（$\|Tf\|\le M\|f\|$）」が同値になる。積分作用素は有界だが、微分作用素は最大値ノルムで有界でない。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と例' },
      { t: 'def', id: 'def-linop', title: '線形作用素', yomi: 'せんけいさようそ', imp: 3, text: R`$X,Y$ を線形空間、$D\subset X$ を部分空間とする（ここでは $X,Y$ がノルム空間であることは仮定しない）。写像 $T:D\to Y$ が<b class="term">線形</b>であるとは、
$$T(\alpha f+\beta g)=\alpha T(f)+\beta T(g)\qquad(f,g\in D,\ \alpha,\beta\in\mathbb{K})$$
が成り立つことをいう。線形な写像を<b class="term">線形作用素</b>という。$T$ の定義域 $D$ を $D(T)$、値域を $R(T):=\{T(f)\mid f\in D(T)\}$ と書く。` },
      { t: 'prop', id: 'prop-linop-basic', title: '線形作用素の基本性質', yomi: 'せんけいさようそのせいしつ', imp: 2, text: R`線形作用素 $T:D(T)\to Y$ について、$T(0)=0$。また値域 $R(T)$ と<b class="term">核</b> $N(T):=\{f\in D(T)\mid T(f)=0\}$ はそれぞれ $Y$、$X$ の部分空間である。さらに $T$ が単射であることと $N(T)=\{0\}$ は同値である。` },
      { t: 'proof', steps: [{ text: R`$T(0)=T(0\cdot0)=0\cdot T(0)=0$（[[vector-space#prop-zero-unique|$0f=0$]]）。$R(T)$：$T(f),T(g)\in R(T)$ なら $\alpha T(f)+\beta T(g)=T(\alpha f+\beta g)\in R(T)$（資料の脚注 *2）。$N(T)$：$T(f)=T(g)=0$ なら $T(\alpha f+\beta g)=0$。単射性：$T$ が単射で $T(f)=0=T(0)$ なら $f=0$。逆に $N(T)=\{0\}$ で $T(f)=T(g)$ なら $T(f-g)=0$ より $f=g$。` }] },
      { t: 'thm', id: 'thm-int-op', title: '積分作用素は線形', yomi: 'せきぶんさようそ', imp: 2, text: R`$X=D=Y=C([0,1])$ とし、$f\in D$ に対して $(Tf)(x):=\int_0^xf(t)\,dt$（$x\in[0,1]$）と定めると、$T$ は線形作用素である。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>第 1 段：$T$ は $C([0,1])$ の中への写像。</b>$f\in C([0,1])$ なら、[[fundamental-theorem#thm-ftc1|微積分の基本定理 (I)]]より $Tf$ は微分可能で $(Tf)'=f$、特に連続。よって $Tf\in C([0,1])$。` },
          {
            text: R`<b>第 2 段：線形性。</b>$x\in[0,1]$ について、[[integral-properties#thm-int-linear|積分の線形性]]より`,
            eqs: [[R`T(\alpha f+\beta g)(x)=\int_0^x(\alpha f(t)+\beta g(t))\,dt=\alpha\int_0^xf(t)\,dt+\beta\int_0^xg(t)\,dt=\alpha(Tf)(x)+\beta(Tg)(x).`, R`積分の線形性`]],
          },
          { text: R`$x$ は任意なので、関数として $T(\alpha f+\beta g)=\alpha Tf+\beta Tg$。` },
        ],
      },
      { t: 'thm', id: 'thm-diff-op', title: '微分作用素は線形', yomi: 'びぶんさようそ', imp: 2, text: R`$X=Y=C([0,1])$、定義域を $D=C^1([0,1])$ とし、$(Tf)(x):=f'(x)$ と定めると、$T$ は線形作用素である。` },
      { t: 'proof', steps: [{ text: R`第 1 段：$f\in C^1([0,1])$ なら $f'\in C([0,1])$（$C^1$ の定義そのもの）。第 2 段：[[derivative-rules#thm-arith-diff|微分の線形性]] $(\alpha f+\beta g)'=\alpha f'+\beta g'$（端点では片側微分で同じ計算）。` }] },
      { t: 'ex', id: 'ex-linop', title: 'その他の例', text: R`<ol><li><b>行列：</b>$m\times n$ 行列 $A$ について $T_A:\mathbb{K}^n\to\mathbb{K}^m$, $T_Ax:=Ax$。</li><li><b>恒等作用素：</b>$I:X\to X$, $I(f)=f$。</li><li><b>かけ算作用素：</b>$\varphi\in C([a,b])$ を固定し、$(M_\varphi f)(x):=\varphi(x)f(x)$ は $C([a,b])$ 上の線形作用素。</li><li><b>シフト作用素：</b>$\ell^2$ 上で $S(a_1,a_2,\dots):=(0,a_1,a_2,\dots)$（右シフト）、$S^*(a_1,a_2,\dots):=(a_2,a_3,\dots)$（左シフト）。$S$ は単射だが全射でなく、$S^*$ は全射だが単射でない。有限次元では「単射 ⇔ 全射」だったが、無限次元ではこれが崩れる。</li><li><b>点での値：</b>$\delta_c(f):=f(c)$（$c\in[a,b]$ を固定）は $C([a,b])\to\mathbb{K}$ の線形作用素（値が数の線形作用素を<b class="term">線形汎関数</b>という）。</li></ol>` },

      { t: 'h2', id: 'bdd', text: '連続性と有界性' },
      { t: 'def', id: 'def-cont-op', title: '連続線形作用素', yomi: 'れんぞくせんけいさようそ', imp: 3, text: R`$X,Y$ をノルム空間、$D(T)\subset X$ とする。線形作用素 $T:D(T)\to Y$ が<b class="term">連続</b>であるとは、$\{f_k\}\subset D(T)$、$f\in D(T)$ で $\lim_k\|f_k-f\|_X=0$ ならば $\lim_k\|T(f_k)-T(f)\|_Y=0$ となることをいう。` },
      { t: 'def', id: 'def-bdd-op', title: '有界線形作用素', yomi: 'ゆうかいせんけいさようそ', imp: 3, text: R`線形作用素 $T:D(T)\to Y$ が<b class="term">有界</b>であるとは、ある $M>0$ が存在して
$$\|T(f)\|_Y\le M\|f\|_X\qquad(f\in D(T))$$
が成り立つことをいう。` },
      { t: 'rem', title: '「有界」の意味に注意', text: R`ここでの「有界」は「$\|T(f)\|$ がつねに $M$ 以下」ではない（$f$ を何倍もすれば $T(f)$ も何倍にもなるので、それは $T=0$ のときしか成り立たない）。「ノルムを高々 $M$ 倍にしか拡大しない」、言いかえると「有界集合を有界集合に写す」という意味である。` },
      { t: 'thm', id: 'thm-cont-bdd', title: '連続 ⇔ 有界', yomi: 'れんぞくとゆうかい', imp: 3, text: R`$X,Y$ をノルム空間とする。線形作用素 $T:D(T)\to Y$ が連続であるための必要十分条件は、$T$ が有界であることである。` },
      { t: 'strategy', text: R`十分性は線形性 $T(f_k)-T(f)=T(f_k-f)$ から一行で出る。必要性は背理法：有界でなければ $\|T(f_k)\|>k\|f_k\|$ となる $f_k$ がとれる。これを $\frac1{\sqrt k\|f_k\|}$ 倍に縮めると、点列は $0$ に収束するのに、像のノルムは $\sqrt k\to\infty$ となって連続性に反する。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>（十分性）</b>有界性を仮定する。$f_k\to f$ なら $\|T(f_k)-T(f)\|_Y=\|T(f_k-f)\|_Y\le M\|f_k-f\|_X\to0$（線形性と有界性）。` },
          { text: R`<b>（必要性）</b>$T$ が連続で、有界でないと仮定する。有界の否定は「任意の $M>0$ に対し $\|T(f)\|_Y>M\|f\|_X$ となる $f\in D(T)$ がある」。$M=k$（$k\in\mathbb{N}$）としてそのような $f_k$ をとる。$f_k=0$ なら両辺 $0$ で不等式が成り立たないので、$f_k\ne0$。` },
          {
            text: R`$g_k:=\dfrac1{\sqrt k\,\|f_k\|_X}f_k\in D(T)$ とおくと $\|g_k\|_X=\frac1{\sqrt k}\to0$、すなわち $g_k\to0$。一方`,
            eqs: [[R`\|T(g_k)\|_Y=\frac1{\sqrt k\|f_k\|_X}\|T(f_k)\|_Y>\frac1{\sqrt k\|f_k\|_X}\cdot k\|f_k\|_X=\sqrt k\ \xrightarrow[k\to\infty]{}\ \infty.`, R`線形性・$f_k$ の選び方`]],
          },
          { text: R`連続性と $T(0)=0$ より $T(g_k)\to T(0)=0$ のはずなので矛盾。よって $T$ は有界である。` },
        ],
      },
      { t: 'cor', id: 'cor-cont-zero', title: '0 で連続なら全体で連続', yomi: 'ぜろでれんぞく', imp: 2, text: R`線形作用素 $T$ が $f=0$ で連続ならば、$T$ は $D(T)$ のすべての点で連続である。` },
      { t: 'proof', steps: [{ text: R`必要性の証明では、$g_k\to0$ のときの $0$ での連続性しか使っていない。よって $0$ で連続なら有界で、十分性よりどの点でも連続。` }] },
      { t: 'ex', id: 'ex-bdd', title: '有界な作用素・有界でない作用素', text: R`<ol><li><b>積分作用素は有界：</b>$(Tf)(x)=\int_0^xf$ について $|(Tf)(x)|\le\int_0^x|f|\le x\|f\|_C\le\|f\|_C$。最大値をとって $\|Tf\|_C\le\|f\|_C$。</li><li><b>微分作用素は有界でない：</b>$f_k(x)=x^k\in C^1([0,1])$ は $\|f_k\|_C=1$ だが $\|f_k'\|_C=\max kx^{k-1}=k$。$\|Tf_k\|\le M\|f_k\|$ となる $M$ はない。したがって微分作用素は（最大値ノルムで）連続でない：$g_k=\frac{\sin(kx)}k\to0$ だが $g_k'=\cos(kx)$ は $0$ に近づかない。</li><li><b>有限次元からの線形作用素は有界：</b>$T:\mathbb{K}^n\to Y$ が線形なら、$x=\sum x_je_j$ として $\|Tx\|\le\sum|x_j|\|Te_j\|\le\bigl(\max_j\|Te_j\|\bigr)\sum_j|x_j|\le\sqrt n\max_j\|Te_j\|\,\|x\|$（最後はコーシー＝シュワルツ）。</li></ol>` },
      { t: 'def', id: 'def-lxy', title: 'L(X, Y)', yomi: 'えるえっくすわい', imp: 2, text: R`$D(T)=X$ となる有界線形作用素 $T:X\to Y$ の全体を $L(X,Y)$ と書く。$L(X):=L(X,X)$。` },
      { t: 'qa', q: R`偏微分方程式に出てくる微分作用素は有界でないのに、どう扱う？`, a: R`二つの方法がある。(1) 定義域を限定した「非有界作用素」として扱う（たとえば $\Delta$ を $D(\Delta)=H^2$ 上の作用素とみる）。(2) 微分を含むノルムを使う（$C^1$ ノルムや[[sobolev|ソボレフノルム]] $H^s$）。$T:C^1\to C$, $f\mapsto f'$ は $\|f'\|_C\le\|f\|_{C^1}$ なので有界である。どのノルムで測るかで、有界かどうかが変わる。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\varphi\in C([a,b])$ を固定する。かけ算作用素 $(M_\varphi f)(x)=\varphi(x)f(x)$ は $C([a,b])$（最大値ノルム）上の有界線形作用素であることを示せ。`, hint: R`$|\varphi(x)f(x)|\le\|\varphi\|_C\|f\|_C$。`, answer: R`連続関数の積は連続なので $M_\varphi f\in C([a,b])$。線形性は各点の分配法則。$|(M_\varphi f)(x)|\le\|\varphi\|_C|f(x)|\le\|\varphi\|_C\|f\|_C$ の最大値をとって $\|M_\varphi f\|_C\le\|\varphi\|_C\|f\|_C$（$\varphi=0$ なら $M=1$ でよい）。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\ell^2$ の右シフト $S$ は $\|Sa\|_{\ell^2}=\|a\|_{\ell^2}$ をみたし、$R(S)\ne\ell^2$ であることを示せ。`, hint: R`$Sa$ の第 1 項はつねに $0$。`, answer: R`$\|Sa\|^2=0^2+\sum_{k\ge1}|a_k|^2=\|a\|^2$。$Sa$ の第 1 項は $0$ なので、$e^{(1)}=(1,0,0,\dots)$ は $R(S)$ に属さない。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'operator-norm',
    title: '作用素ノルム',
    sub: 'L(X, Y) の完備性（資料 第 11 章）',
    yomi: 'さようそのるむ',
    aliases: ['作用素ノルム', 'さようそのるむ', 'L(X,Y)', '有界線形作用素の空間', '双対空間', 'そうついくうかん', '行列のノルム'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['linear-operator', 'banach-space'],
    related: ['extension-theorem', 'neumann-series'],
    notation: NOTE_OP,
    synopsis: R`有界線形作用素 $T$ の「拡大率の最大値」$\|T\|=\sup_{f\ne0}\frac{\|Tf\|}{\|f\|}$ を作用素ノルムという。これで有界線形作用素全体がノルム空間になり、値域の空間 $Y$ がバナッハ空間なら $L(X,Y)$ もバナッハ空間になる。行列の作用素ノルムは成分の 2 乗和のノルムと同値である。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-op-sum', title: '作用素の和とスカラー倍', yomi: 'さようそのわ', imp: 1, text: R`同じ定義域 $D\subset X$ をもつ線形作用素 $T,S$ について、$(T+S)(f):=T(f)+S(f)$、$(\alpha T)(f):=\alpha(T(f))$ と定める。これらはまた線形作用素で、この演算により線形作用素全体は線形空間になる（各点 $f$ で $Y$ の公理を使う。[[vector-space#prop-ci-vs|C(I) の場合]]と同じ型）。` },
      { t: 'def', id: 'def-opnorm', title: '作用素ノルム', yomi: 'さようそのるむ', imp: 3, text: R`$X,Y$ をノルム空間、$T:D(T)\to Y$ を有界線形作用素とする（$D(T)\ne\{0\}$）。
$$\|T\|_B:=\sup_{f\in D(T),\ f\ne0}\frac{\|T(f)\|_Y}{\|f\|_X}$$
を $T$ の<b class="term">作用素ノルム</b>という。$T\in L(X,Y)$ のときは $\|T\|_{L(X,Y)}$ とも書く。` },
      { t: 'prop', id: 'prop-opnorm-basic', title: '作用素ノルムの基本性質', yomi: 'さようそのるむのきほんせいしつ', imp: 3, text: R`<ol><li>$\|T\|_B$ は実数で、すべての $f\in D(T)$ で $\|T(f)\|_Y\le\|T\|_B\|f\|_X$。</li><li>$\|T\|_B$ は「$\|T(f)\|\le M\|f\|$（$f\in D(T)$）をみたす $M\ge0$」の最小値である。</li><li>$\|\cdot\|_B$ は、同じ定義域をもつ有界線形作用素全体の上のノルムである。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) 有界性の $M$ は集合 $\bigl\{\frac{\|Tf\|}{\|f\|}\bigm|f\ne0\bigr\}$ の上界なので、上限は $M$ 以下の実数。$f\ne0$ なら $\frac{\|Tf\|}{\|f\|}\le\|T\|_B$ の両辺に $\|f\|$ を掛け、$f=0$ なら両辺 $0$。` },
          { text: R`(2) (1) より $M=\|T\|_B$ は条件をみたす。条件をみたす任意の $M$ は上の集合の上界なので $\|T\|_B\le M$。` },
          {
            text: R`(3) (i) $\|T\|_B=0$ なら (1) よりすべての $f$ で $Tf=0$、すなわち $T=0$。(ii) $\|\alpha T\|_B=\sup\frac{|\alpha|\|Tf\|}{\|f\|}=|\alpha|\|T\|_B$。(iii) $f\ne0$ について`,
            eqs: [[R`\frac{\|(T+S)(f)\|_Y}{\|f\|_X}\le\frac{\|T(f)\|_Y+\|S(f)\|_Y}{\|f\|_X}\le\|T\|_B+\|S\|_B,`, R`$Y$ の三角不等式・(1)`]],
          },
          { text: R`右辺は $f$ によらない上界なので、上限をとって $\|T+S\|_B\le\|T\|_B+\|S\|_B$。` },
        ],
      },
      { t: 'thm', id: 'thm-opnorm-sphere', title: '単位球面・単位球での上限', yomi: 'たんいきゅうでのじょうげん', imp: 2, text: R`$T:D(T)\to Y$ を有界線形作用素（$D(T)\ne\{0\}$）とすると
$$\|T\|_B=\sup_{f\in D(T),\ \|f\|_X=1}\|T(f)\|_Y=\sup_{f\in D(T),\ \|f\|_X\le1}\|T(f)\|_Y.$$` },
      {
        t: 'proof',
        steps: [
          { text: R`$a:=\sup_{\|f\|=1}\|Tf\|$、$b:=\sup_{\|f\|\le1}\|Tf\|$ とおく。$\|f\|=1$ の元は $\|f\|\le1$ の元でもあるので $a\le b$。` },
          { text: R`$f\ne0$ について $\frac{f}{\|f\|}$ はノルム $1$ で、線形性より $\frac{\|Tf\|}{\|f\|}=\bigl\|T\bigl(\frac f{\|f\|}\bigr)\bigr\|\le a$。上限をとって $\|T\|_B\le a$。` },
          { text: R`$\|f\|\le1$ なら $\|Tf\|\le\|T\|_B\|f\|\le\|T\|_B$（命題 (1)）なので $b\le\|T\|_B$。以上で $\|T\|_B\le a\le b\le\|T\|_B$。（資料の脚注は $f=0$ を含むかどうかの細かい場合分けを扱っているが、命題 (1) を使うと一度に済む。）` },
        ],
      },
      { t: 'prop', id: 'prop-opnorm-comp', title: '合成のノルム', yomi: 'ごうせいのるむ', imp: 2, text: R`$T\in L(X,Y)$、$S\in L(Y,Z)$ ならば $ST:=S\circ T\in L(X,Z)$ で $\|ST\|\le\|S\|\,\|T\|$。特に $T\in L(X)$ について $\|T^k\|\le\|T\|^k$（$k\in\mathbb{N}$）。` },
      { t: 'proof', steps: [{ text: R`線形性は合成の計算。$\|S(Tf)\|\le\|S\|\|Tf\|\le\|S\|\|T\|\|f\|$ なので有界で、作用素ノルムの最小性より $\|ST\|\le\|S\|\|T\|$。後半は $k$ についての帰納法。` }] },

      { t: 'h2', id: 'examples', text: '例' },
      { t: 'ex', id: 'ex-opnorm-int', title: '積分汎関数のノルム', text: R`$I=[a,b]$、$T(f):=\int_a^bf(x)\,dx$（$f\in C(I)$）とすると $T\in L(C(I),\mathbb{R})$ で $\|T\|=b-a$。実際 $|T(f)|\le\int_a^b|f|\le(b-a)\|f\|_{C(I)}$ より $\|T\|\le b-a$。$f\equiv1$ とすると $\frac{|T(1)|}{\|1\|_{C(I)}}=b-a$ なので $\|T\|\ge b-a$。` },
      { t: 'ex', id: 'ex-opnorm-matrix', title: '行列の作用素ノルム', text: R`$X=\mathbb{R}^2$（ユークリッドノルム）、$A=\begin{pmatrix}a&b\\c&d\end{pmatrix}$、$T_Ax:=Ax$ とし、$\|A\|_0:=\sqrt{a^2+b^2+c^2+d^2}$ とおく。
<ul><li>$\|T_A\|\le\|A\|_0$：コーシー＝シュワルツより $|ax_1+bx_2|\le\sqrt{a^2+b^2}\|x\|$、$|cx_1+dx_2|\le\sqrt{c^2+d^2}\|x\|$ なので $\|Ax\|^2\le(a^2+b^2+c^2+d^2)\|x\|^2$。</li><li>$\|A\|_0\le\sqrt2\|T_A\|$：$\|A\|_0^2=\|T_Ae_1\|^2+\|T_Ae_2\|^2\le2\|T_A\|^2$（$e_1=(1,0)$, $e_2=(0,1)$ はノルム $1$）。</li></ul>よって $\frac1{\sqrt2}\|A\|_0\le\|T_A\|\le\|A\|_0$ で、二つのノルムは同値である（有限次元なので[[normed-space#thm-equiv-fin|当然]]だが、定数が具体的にわかる）。資料ではもう少し粗い定数 $\|T_A\|\le2\|A\|_0\le4\|T_A\|$ で示している。対角行列 $\operatorname{diag}(\lambda_1,\lambda_2)$ なら $\|T_A\|=\max|\lambda_j|$。` },

      { t: 'h2', id: 'complete', text: 'L(X, Y) の完備性' },
      { t: 'thm', id: 'thm-lxy-complete', title: 'L(X, Y) はバナッハ空間', yomi: 'えるえっくすわいのかんびせい', imp: 3, text: R`$X$ をノルム空間、$Y$ をバナッハ空間とする。このとき $L(X,Y)$ は作用素ノルムに関してバナッハ空間である。` },
      { t: 'strategy', text: R`いつもの 4 ステップ。各 $f$ で $\{T_kf\}$ は $Y$ のコーシー列なので極限 $Tf$ が決まる（ここで $Y$ の完備性を使う。$X$ は完備でなくてよい）。$T$ が線形・有界であることを確かめ、最後に単位球面上で一様に $T_kf\to Tf$ となることから $\|T_k-T\|\to0$。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>①</b> $\{T_k\}\subset L(X,Y)$ をコーシー列とする：$\varepsilon>0$ に対し $N=N(\varepsilon)$ があって、$k,l\ge N$ なら $\|T_k-T_l\|<\frac\varepsilon2$。` },
          { text: R`<b>②</b> $f\in X$ を固定すると $\|T_kf-T_lf\|_Y=\|(T_k-T_l)f\|_Y\le\|T_k-T_l\|\|f\|_X$ なので、$\{T_kf\}$ は $Y$ のコーシー列。$Y$ は完備なので収束し、その極限を $T(f)$ とおく（$f=0$ なら $T_k0=0\to0$）。これで写像 $T:X\to Y$ が定まる。` },
          { text: R`<b>線形性。</b>$T_k(\alpha f+\beta g)=\alpha T_kf+\beta T_kg$ で $k\to\infty$ とすると、[[normed-space#prop-norm-arith|収束と演算]]より $T(\alpha f+\beta g)=\alpha Tf+\beta Tg$。` },
          { text: R`<b>有界性。</b>コーシー列は[[banach-space#prop-cauchy-bdd|有界]]なので $\|T_k\|\le K$。$\|T_kf\|_Y\le K\|f\|_X$ で $k\to\infty$ とすると、[[normed-space#prop-norm-rev|ノルムの連続性]]より $\|Tf\|_Y\le K\|f\|_X$。よって $T\in L(X,Y)$。` },
          { text: R`<b>③④</b> $\|g\|_X=1$ をみたす $g$ と $k,l\ge N$ について $\|T_kg-T_lg\|_Y\le\|T_k-T_l\|<\frac\varepsilon2$。$l\to\infty$ として $\|T_kg-Tg\|_Y\le\frac\varepsilon2$。この $N$ は $g$ によらないので、[[operator-norm#thm-opnorm-sphere|単位球面での上限]]をとって $\|T_k-T\|\le\frac\varepsilon2<\varepsilon$（$k\ge N$）。よって $T_k\to T$ in $L(X,Y)$。` },
        ],
      },
      { t: 'cor', id: 'cor-dual', title: '双対空間はバナッハ空間', yomi: 'そうついくうかん', imp: 2, text: R`ノルム空間 $X$ の<b class="term">双対空間</b> $X':=L(X,\mathbb{K})$（有界線形汎関数全体）は、$X$ が完備でなくてもバナッハ空間である。` },
      { t: 'proof', steps: [{ text: R`$\mathbb{K}$ は完備なので、[[operator-norm#thm-lxy-complete|定理]]を $Y=\mathbb{K}$ に使えばよい。` }] },
      { t: 'qa', q: R`$X$ だけがバナッハ空間で $Y$ が完備でないときは？`, a: R`$L(X,Y)$ は完備とは限らない。たとえば $X=Y$ が完備でない場合、$Y$ の元を一つ固定した作用素の列などで反例が作れる。完備性の証明で使ったのは「各点の像の列 $\{T_kf\}$ の行き先が $Y$ の中にある」ことなので、効いているのは値域側の完備性である。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$X=C([0,1])$、$(Tf)(x)=\int_0^xf(t)\,dt$ のとき $\|T\|=1$ を示せ。`, hint: R`$\|Tf\|\le\|f\|$ と、$f\equiv1$ の場合。`, answer: R`$|(Tf)(x)|\le\int_0^x|f|\le x\|f\|\le\|f\|$ より $\|T\|\le1$。$f\equiv1$ なら $(Tf)(x)=x$、$\|Tf\|=1=\|f\|$ なので $\|T\|\ge1$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$c\in[a,b]$ を固定し、$\delta_c(f)=f(c)$ を $C([a,b])$ 上の線形汎関数とする。$\|\delta_c\|=1$ を示せ。`, hint: R`$|f(c)|\le\|f\|_C$、等号は $f\equiv1$。`, answer: R`$|\delta_c(f)|=|f(c)|\le\max|f|=\|f\|_C$ より $\|\delta_c\|\le1$。$f\equiv1$ で $|\delta_c(1)|=1=\|1\|_C$ なので $\|\delta_c\|=1$。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'extension-theorem',
    title: '拡張定理',
    sub: '稠密な定義域からの延長（資料 第 12 章前半）',
    yomi: 'かくちょうていり',
    aliases: ['拡張定理', 'かくちょうていり', '延長定理', 'えんちょうていり', '有界線形作用素の拡張', 'BLT定理'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['operator-norm', 'closure', 'banach-space'],
    related: ['fourier-transform', 'sobolev', 'neumann-series'],
    notation: NOTE_OP.concat([R`$\overline{D(T)}=X$：定義域 $D(T)$ が $X$ で[[closure#def-dense|稠密]]（どの $u\in X$ も $D(T)$ の点列の極限）。`, R`$\widetilde T$：$T$ の拡張（延長）。`]),
    synopsis: R`稠密な部分空間で定義された有界線形作用素は、値域がバナッハ空間なら、ノルムを変えずに空間全体へただ一通りに延長できる。扱いやすい関数（多項式・なめらかな関数）で作用素を定義し、極限で一般の関数に広げる、という関数解析の基本的な手法の土台である。フーリエ変換を $L^2$ に広げるときや、ソボレフ空間のトレースを定義するときに使う。`,
    body: [
      { t: 'h2', id: 'thm', text: '定理' },
      { t: 'thm', id: 'thm-extension', title: '拡張定理', yomi: 'かくちょうていり', imp: 3, text: R`$X$ をノルム空間、$Y$ をバナッハ空間とし、定義域が $X$ で稠密（$\overline{D(T)}=X$）な有界線形作用素 $T:D(T)\to Y$ を考える。このとき、$D(\widetilde T)=X$ で
$$\widetilde T(u)=T(u)\quad(u\in D(T)),\qquad\|\widetilde T\|_B=\|T\|_B$$
をみたす有界線形作用素 $\widetilde T$ がただ一つ存在する。` },
      { t: 'rem', title: '資料との違い', text: R`資料では $X,Y$ ともバナッハ空間と仮定しているが、証明で使うのは $Y$ の完備性だけである（$X$ は稠密性のためにだけ現れる）。` },
      { t: 'strategy', text: R`$u\in X$ に近づく点列 $u_k\in D(T)$ をとり、$\widetilde T(u):=\lim T(u_k)$ と定義したい。そのために (1) 極限が存在すること（$\{T(u_k)\}$ がコーシー列）、(2) 点列の選び方によらないこと、(3) 線形・有界・ノルムが等しいこと、(4) 一意性、を順に示す。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>(1) 極限の存在。</b>$u\in X$ とする。$D(T)$ は稠密なので、[[closure#prop-dense-eq|稠密の言い換え]]より $u_k\to u$ となる $\{u_k\}\subset D(T)$ がある。$\|T(u_k)-T(u_l)\|_Y=\|T(u_k-u_l)\|_Y\le\|T\|_B\|u_k-u_l\|_X$ で、$\{u_k\}$ は収束列なのでコーシー列。よって $\{T(u_k)\}$ は $Y$ のコーシー列で、$Y$ は完備なので $y\in Y$ に収束する。` },
          {
            text: R`<b>(2) 選び方によらない。</b>$\{u_k'\}\subset D(T)$ も $u_k'\to u$ をみたし、$T(u_k')\to y'$ とする。`,
            eqs: [
              [R`\|y-y'\|_Y\le\|y-T(u_k)\|_Y+\|T(u_k)-T(u_k')\|_Y+\|T(u_k')-y'\|_Y`, R`三角不等式`],
              [R`\phantom{\|y-y'\|_Y}\le\|y-T(u_k)\|_Y+\|T\|_B\bigl(\|u_k-u\|_X+\|u-u_k'\|_X\bigr)+\|T(u_k')-y'\|_Y\ \xrightarrow[k\to\infty]{}\ 0.`, R`有界性・三角不等式`],
            ],
          },
          { text: R`よって $y=y'$。そこで $\widetilde T(u):=y$ と定義する。$u\in D(T)$ なら定数列 $u_k=u$ がとれるので $\widetilde T(u)=T(u)$。` },
          { text: R`<b>(3) 線形・有界・ノルム。</b>線形性：$u_k\to u$, $v_k\to v$（$u_k,v_k\in D(T)$）なら $\alpha u_k+\beta v_k\in D(T)$ は $\alpha u+\beta v$ に収束し、$T(\alpha u_k+\beta v_k)=\alpha T(u_k)+\beta T(v_k)\to\alpha\widetilde T(u)+\beta\widetilde T(v)$。(2) よりこれが $\widetilde T(\alpha u+\beta v)$。有界性：$\|T(u_k)\|_Y\le\|T\|_B\|u_k\|_X$ で $k\to\infty$ とすると、ノルムの連続性より $\|\widetilde T(u)\|_Y\le\|T\|_B\|u\|_X$。よって $\|\widetilde T\|_B\le\|T\|_B$。逆に $u\in D(T)$ なら $\|T(u)\|=\|\widetilde T(u)\|\le\|\widetilde T\|_B\|u\|$ なので $\|T\|_B\le\|\widetilde T\|_B$。` },
          { text: R`<b>(4) 一意性。</b>$\widehat T$ も同じ条件をみたす有界線形作用素とする。$u\in X$、$u_k\to u$（$u_k\in D(T)$）について、$\widehat T$ は有界なので[[linear-operator#thm-cont-bdd|連続]]で、$\widehat T(u)=\lim\widehat T(u_k)=\lim T(u_k)=\widetilde T(u)$。` },
        ],
      },
      { t: 'ex', id: 'ex-extension', title: '例：ℓ² 上の汎関数', text: R`$c_{00}$（有限個の項を除いて $0$ の数列）は $\ell^2$ で稠密である（$a\in\ell^2$ に対して先頭 $n$ 項で切った数列 $a^{[n]}$ は $\|a-a^{[n]}\|_{\ell^2}^2=\sum_{k>n}|a_k|^2\to0$）。$c_{00}$ 上で $T(a):=\sum_ka_k/k$（実質有限和）と定めると、ヘルダーの不等式より $|T(a)|\le\bigl(\sum\frac1{k^2}\bigr)^{1/2}\|a\|_{\ell^2}=\frac\pi{\sqrt6}\|a\|_{\ell^2}$ で有界。拡張定理より $\ell^2$ 全体に延長され、延長は $\widetilde T(a)=\sum_{k=1}^\infty a_k/k$（収束する級数）で与えられる。` },
      { t: 'crux', text: R`拡張定理は「なめらかな関数で考えて評価式を示し、密度の議論で一般の関数に広げる」という、偏微分方程式の研究で最もよく使う手順の正当化である。たとえばフーリエ変換は、まず急減少関数に対して積分で定義し、プランシュレルの等式 $\|\hat f\|_{L^2}=\|f\|_{L^2}$（有界性）を示してから、拡張定理で $L^2$ 全体に広げる（[[fourier-transform|フーリエ変換]]）。` },
      { t: 'qa', q: R`有界でない作用素も拡張できる？`, a: R`一般にはできない。微分作用素 $f\mapsto f'$ は $C^1([0,1])\subset C([0,1])$（稠密）で定義されているが、最大値ノルムで有界でないので、$C([0,1])$ 全体へ連続に延長することはできない（$|x-\frac12|$ に一様収束する $C^1$ 関数列の導関数は収束しない）。有界性がコーシー列をコーシー列に写す保証になっている。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`拡張定理の証明の (2) で、なぜ「選び方によらない」ことを示す必要があるのか説明せよ。`, hint: R`$\widetilde T(u)$ が一つの値に決まらなければ写像にならない。`, answer: R`$\widetilde T(u):=\lim T(u_k)$ と定義するとき、$u$ に近づく点列 $\{u_k\}$ は一つではない。点列によって極限が違えば、$\widetilde T(u)$ がただ一つに定まらず、写像として定義できない（well-defined でない）。(2) はその心配がないことを保証している。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'neumann-series',
    title: 'ノイマン級数',
    sub: '逆作用素と作用素の等比級数（資料 第 12 章後半）',
    yomi: 'のいまんきゅうすう',
    aliases: ['ノイマン級数', 'のいまんきゅうすう', 'Neumann', '逆作用素', 'ぎゃくさようそ', '作用素のべき', 'さようそのべき', 'レゾルベント', 'れぞるべんと', 'ボルテラ作用素', 'ぼるてら', '摂動', 'せつどう'],
    kind: '定理',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['operator-norm', 'banach-space', 'series'],
    related: ['banach-fixed-point', 'extension-theorem'],
    notation: NOTE_OP.concat([R`$T^k$：作用素のべき。$T^0:=I$、$T^k(f):=T(T^{k-1}(f))$（$k\in\mathbb{N}$）。`, R`$T^{-1}$：逆作用素（$T$ が単射のとき、$D(T^{-1})=R(T)$）。`]),
    synopsis: R`等比級数 $\frac1{1-r}=\sum r^k$（$|r|<1$）の作用素版が、ノイマン級数 $(I-T)^{-1}=\sum_{k=0}^\infty T^k$（$\|T\|<1$）である。バナッハ空間上の有界線形作用素 $T$ のノルムが $1$ より小さければ、方程式 $(I-T)u=g$ はどんな $g$ に対してもただ一つの解 $u=\sum T^kg$ をもち、$\|u\|\le\frac{\|g\|}{1-\|T\|}$ と評価できる。`,
    body: [
      { t: 'h2', id: 'inverse', text: '逆作用素' },
      { t: 'def', id: 'def-inverse-op', title: '逆作用素', yomi: 'ぎゃくさようそ', imp: 2, text: R`線形作用素 $T:D(T)\to Y$ が単射のとき、逆写像 $T^{-1}:R(T)\to X$（$D(T^{-1})=R(T)$）が定義でき、
$$T^{-1}(T(f))=f\quad(f\in D(T)),\qquad T(T^{-1}(g))=g\quad(g\in R(T))$$
をみたす。これを $T$ の<b class="term">逆作用素</b>という。` },
      { t: 'thm', id: 'thm-inverse-linear', title: '逆作用素は線形', yomi: 'ぎゃくさようそはせんけい', imp: 2, text: R`単射な線形作用素 $T$ の逆作用素 $T^{-1}$ は線形作用素である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$R(T)$ は[[linear-operator#prop-linop-basic|部分空間]]なので、$f,g\in R(T)$、$\alpha,\beta\in\mathbb{K}$ について $\alpha f+\beta g\in R(T)$。` },
          {
            text: R`$T$ の線形性より`,
            eqs: [[R`T\bigl(T^{-1}(\alpha f+\beta g)\bigr)=\alpha f+\beta g=\alpha T(T^{-1}f)+\beta T(T^{-1}g)=T\bigl(\alpha T^{-1}f+\beta T^{-1}g\bigr).`, R`逆作用素の性質・線形性`]],
          },
          { text: R`$T$ は単射なので $T^{-1}(\alpha f+\beta g)=\alpha T^{-1}f+\beta T^{-1}g$。` },
        ],
      },

      { t: 'h2', id: 'neumann', text: 'ノイマン級数' },
      { t: 'thm', id: 'thm-neumann', title: 'ノイマン級数', yomi: 'のいまんきゅうすう', imp: 3, text: R`$X$ をバナッハ空間、$T\in L(X)$ で $\|T\|_{L(X)}<1$ とする。このとき
<ol type="i"><li>$R(I-T)=X$（$I-T$ は全射）で、$I-T$ は単射である。</li><li>逆作用素 $(I-T)^{-1}$ は $L(X)$ に属し、$\displaystyle(I-T)^{-1}=\sum_{k=0}^\infty T^k=I+T+T^2+\cdots$（$L(X)$ のノルムで収束）。</li><li>$\displaystyle\|(I-T)^{-1}\|_{L(X)}\le\frac1{1-\|T\|_{L(X)}}$。</li></ol>` },
      { t: 'strategy', text: R`等比級数と同じ計算をする。$S_n:=\sum_{k=0}^nT^k$ について $(I-T)S_n=S_n(I-T)=I-T^{n+1}$（望遠鏡和）。$\|T^{n+1}\|\le\|T\|^{n+1}\to0$ なので、$S_n$ の極限 $S$ が $(I-T)S=S(I-T)=I$ をみたす。$S_n$ が収束することは、$L(X)$ の完備性（$X$ がバナッハ空間だから）と絶対収束から出る。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>ステップ 1：級数の収束。</b>[[operator-norm#prop-opnorm-comp|合成のノルム]]より $\|T^k\|\le\|T\|^k$ で、$\|T\|<1$ なので $\sum_k\|T^k\|\le\sum_k\|T\|^k=\frac1{1-\|T\|}<\infty$（[[series#thm-geom|等比級数]]・比較判定法）。$X$ はバナッハ空間なので $L(X)$ も[[operator-norm#thm-lxy-complete|バナッハ空間]]であり、[[banach-space#thm-abs-series|絶対収束する級数は収束する]]ので、$S:=\sum_{k=0}^\infty T^k\in L(X)$ が存在し、$\|S\|\le\sum\|T^k\|\le\frac1{1-\|T\|}$。` },
          {
            text: R`<b>ステップ 2：望遠鏡和。</b>$S_n:=\sum_{k=0}^nT^k$ とおくと`,
            eqs: [[R`(I-T)S_n=\sum_{k=0}^nT^k-\sum_{k=0}^nT^{k+1}=I-T^{n+1}=S_n(I-T).`, R`分配法則（作用素の和と合成）・[[sigma-notation#prop-sum-rules|望遠鏡和]]`]],
          },
          {
            text: R`<b>ステップ 3：極限。</b>合成のノルムより`,
            eqs: [
              [R`\|(I-T)S-I\|\le\|(I-T)(S-S_n)\|+\|(I-T)S_n-I\|\le\|I-T\|\,\|S-S_n\|+\|T^{n+1}\|`, R`三角不等式・ステップ 2`],
              [R`\phantom{\|(I-T)S-I\|}\le(1+\|T\|)\|S-S_n\|+\|T\|^{n+1}\ \xrightarrow[n\to\infty]{}\ 0.`, R`$\|I-T\|\le\|I\|+\|T\|=1+\|T\|$`],
            ],
          },
          { text: R`左辺は $n$ によらないので $(I-T)S=I$。同様に $S(I-T)=I$。` },
          { text: R`<b>ステップ 4：結論。</b>$(I-T)S=I$ より、任意の $g\in X$ について $g=(I-T)(Sg)\in R(I-T)$、よって全射。$S(I-T)=I$ より、$(I-T)f=0$ なら $f=S(I-T)f=0$、よって単射。したがって $(I-T)^{-1}$ が存在し、$(I-T)^{-1}=(I-T)^{-1}(I-T)S=S\in L(X)$。ノルムの評価はステップ 1。` },
        ],
      },
      { t: 'note', title: '言い換え：方程式の解', text: R`定理は「$\|T\|<1$ なら、方程式 $u-Tu=g$ は任意の $g\in X$ に対してただ一つの解 $u=\sum_{k=0}^\infty T^kg$ をもち、$\|u\|\le\frac{\|g\|}{1-\|T\|}$」と言いかえられる。これは $\Phi(u):=g+Tu$ に[[banach-fixed-point#thm-banach-fp|不動点定理]]を使っても示せる（$\|\Phi u-\Phi v\|\le\|T\|\|u-v\|$）。反復 $u_{k+1}=g+Tu_k$（$u_0=0$）は、ちょうどノイマン級数の部分和 $\sum_{j=0}^kT^jg$ になる。` },
      { t: 'ex', id: 'ex-neumann-matrix', title: '行列の例', text: R`$X=\mathbb{R}^2$、$A=\begin{pmatrix}1/2&0\\0&1/2\end{pmatrix}$ とすると $\|T_A\|=\sup_{\|x\|=1}\sqrt{(x_1/2)^2+(x_2/2)^2}=\frac12$。よって
$$(I-T_A)^{-1}=\sum_{k=0}^\infty T_A^k=\begin{pmatrix}\sum(1/2)^k&0\\0&\sum(1/2)^k\end{pmatrix}=\begin{pmatrix}2&0\\0&2\end{pmatrix}.$$
直接計算すると $E-A=\operatorname{diag}(\frac12,\frac12)$ で、その逆行列は $2E$ なので一致する（資料の「$(E-A)^{-1}=A^{-1}$」は、この例で $E-A=A$ となっているためである）。方程式 $(I-T_A)x=b$ の解は $x=2b$。` },
      { t: 'ex', id: 'ex-neumann-volterra', title: '積分作用素の例', text: R`$X=C([0,1])$、$(Tf)(x):=\frac12\int_0^xf(t)\,dt$ とすると $\|T\|\le\frac12$（[[operator-norm#prob-1|問題]]の $\frac12$ 倍）。$g\equiv1$ として $u=(I-T)^{-1}1=\sum_kT^k1$ を計算する。帰納法で $T^k1=\frac{x^k}{2^kk!}$（$T\bigl(\frac{t^m}{2^mm!}\bigr)=\frac12\int_0^x\frac{t^m}{2^mm!}dt=\frac{x^{m+1}}{2^{m+1}(m+1)!}$）なので、$u(x)=\sum_k\frac{(x/2)^k}{k!}=e^{x/2}$。これは[[banach-fixed-point#ex-int-eq|不動点定理の例]] $u=1+\frac12\int_0^xu$ の解と一致する。` },

      { t: 'h2', id: 'more', text: '一般化と応用' },
      { t: 'thm', id: 'thm-neumann-gen', title: 'Σ‖Tᵏ‖ < ∞ なら I − T は可逆', yomi: 'のいまんきゅうすうのいっぱんか', imp: 2, text: R`$X$ をバナッハ空間、$T\in L(X)$ とし、$\sum_{k=0}^\infty\|T^k\|<\infty$ とする（$\|T\|<1$ でなくてもよい）。このとき $I-T$ は全単射で、$(I-T)^{-1}=\sum_{k=0}^\infty T^k\in L(X)$。` },
      { t: 'proof', steps: [{ text: R`ノイマン級数の証明のステップ 1 で使ったのは $\sum\|T^k\|<\infty$ だけであり、ステップ 3 の $\|T^{n+1}\|\to0$ も[[series#thm-term|収束級数の項は 0 に収束]]することから従う。残りは同じである。` }] },
      { t: 'ex', id: 'ex-volterra-all', title: 'ボルテラ型積分作用素はどんな λ でも可逆', text: R`$(Vf)(x):=\int_0^xf(t)\,dt$ を $C([0,1])$ 上で考える。$|(V^kf)(x)|\le\|f\|\frac{x^k}{k!}$ が帰納法で示せる（$|V^{k+1}f(x)|\le\int_0^x\|f\|\frac{t^k}{k!}dt=\|f\|\frac{x^{k+1}}{(k+1)!}$）ので $\|V^k\|\le\frac1{k!}$。任意の $\lambda\in\mathbb{K}$ について $\sum\|(\lambda V)^k\|\le\sum\frac{|\lambda|^k}{k!}=e^{|\lambda|}<\infty$ なので、$I-\lambda V$ はつねに可逆である。$\|\lambda V\|=|\lambda|$ が $1$ より大きくても成り立つ点が、ノイマン級数の素朴な形より強い。` },
      { t: 'cor', id: 'cor-open-invertible', title: '可逆な作用素の摂動', yomi: 'かぎゃくなさようそのせつどう', imp: 2, text: R`$X$ をバナッハ空間、$A\in L(X)$ が全単射で $A^{-1}\in L(X)$ とする。$B\in L(X)$ が $\|B\|<\frac1{\|A^{-1}\|}$ をみたすならば、$A-B$ も全単射で $(A-B)^{-1}\in L(X)$。` },
      { t: 'proof', steps: [{ text: R`$A-B=A(I-A^{-1}B)$ で、$\|A^{-1}B\|\le\|A^{-1}\|\|B\|<1$。ノイマン級数より $I-A^{-1}B$ は全単射で逆作用素は有界。全単射の合成は全単射で、$(A-B)^{-1}=(I-A^{-1}B)^{-1}A^{-1}\in L(X)$（合成のノルム）。` }] },
      { t: 'crux', text: R`ノイマン級数は「小さい摂動では可逆性が保たれる」ことの定量版である。偏微分方程式では、主要な部分（たとえば $\partial_t-i\Delta$）の逆作用素を先に作り、残りの小さい部分をノイマン級数や不動点定理で処理する、という形で何度も現れる。また $|\lambda|>\|T\|$ なら $(\lambda I-T)^{-1}=\frac1\lambda\sum(T/\lambda)^k$ で、これがスペクトル理論（レゾルベント）の出発点になる。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$X=\mathbb{R}^2$、$A=\begin{pmatrix}0&1/3\\0&0\end{pmatrix}$ について、ノイマン級数で $(I-T_A)^{-1}$ を求めよ。`, hint: R`$A^2=0$ なので級数は 2 項で止まる。`, answer: R`$A^2=0$ なので $T_A^k=0$（$k\ge2$）。$(I-T_A)^{-1}=I+T_A$、行列では $\begin{pmatrix}1&1/3\\0&1\end{pmatrix}$。実際 $\begin{pmatrix}1&-1/3\\0&1\end{pmatrix}\begin{pmatrix}1&1/3\\0&1\end{pmatrix}=E$。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$X$ をバナッハ空間、$T\in L(X)$、$\|T\|<1$ とする。$g\in X$ に対する方程式 $u-Tu=g$ の解 $u$ と、部分和 $u_n:=\sum_{k=0}^nT^kg$ について $\|u-u_n\|\le\dfrac{\|T\|^{n+1}}{1-\|T\|}\|g\|$ を示せ。`, hint: R`$u-u_n=\sum_{k>n}T^kg$。`, answer: R`$u-u_n=\sum_{k=n+1}^\infty T^kg$ なので、三角不等式（極限で）より $\|u-u_n\|\le\sum_{k=n+1}^\infty\|T\|^k\|g\|=\frac{\|T\|^{n+1}}{1-\|T\|}\|g\|$。`, space: 5 },
    ],
  });
})();
