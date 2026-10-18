/* 第 15 章：研究への道（ルベーグ空間・フーリエ解析・ソボレフ空間・分散型方程式） */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  const REF = R`<b>この章の深い定理について：</b>ルベーグ積分論や調和解析の定理の一部は、この章では主張を正確に述べ、証明は参考文献に譲る（その箇所には「証明は参考文献」と明記する）。参考文献の例：伊藤清三『ルベーグ積分入門』、新井仁之『ルベーグ積分講義』、黒田成俊『関数解析』、H. Brezis『Functional Analysis, Sobolev Spaces and Partial Differential Equations』、F. Linares–G. Ponce『Introduction to Nonlinear Dispersive Equations』、T. Cazenave『Semilinear Schrödinger Equations』。`;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'lebesgue-lp',
    title: 'ルベーグ積分と Lᵖ 空間',
    sub: '測度 0・ほとんど至るところ・収束定理',
    yomi: 'るべーぐせきぶんとえるぴーくうかん',
    aliases: ['ルベーグ積分', 'るべーぐせきぶん', 'Lp空間', 'えるぴーくうかん', 'Lᵖ', 'L2', 'ルベーグ空間', '測度', 'そくど', '測度0', 'ほとんど至るところ', 'a.e.', '単調収束定理', '優収束定理', 'ゆうしゅうそくていり', 'ファトゥの補題', 'リース・フィッシャーの定理', 'ローレンツ空間', 'ろーれんつ', '弱Lp', '混合ノルム'],
    kind: '用語',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['riemann-integral', 'sequence-spaces', 'banach-space', 'improper-integral'],
    related: ['fourier-transform', 'sobolev', 'hilbert-space'],
    notation: [
      R`$\Omega\subset\mathbb{R}^n$：開集合（または区間）。$dx$：ルベーグ測度による積分。$|E|$：集合 $E$ の測度（長さ・面積・体積の一般化）。`,
      R`<b>a.e.</b>（almost everywhere、ほとんど至るところ）：「測度 $0$ の集合を除いて成り立つ」。`,
      R`$\|f\|_{L^p}:=\bigl(\int_\Omega|f|^pdx\bigr)^{1/p}$（$1\le p<\infty$）、$\|f\|_{L^\infty}:=\operatorname{ess\,sup}|f|$（本質的上限）。`,
      R`$L^q_tL^r_x=L^q(I;L^r(\mathbb{R}^n))$：混合ノルム $\|u\|_{L^q_tL^r_x}:=\bigl(\int_I\|u(t)\|_{L^r}^q\,dt\bigr)^{1/q}$。分散型方程式のストリッカーツ評価で使う。`,
      REF,
    ],
    synopsis: R`リーマン積分は「極限との相性」が悪い：積分可能な関数の極限が積分可能とは限らず、連続関数の空間に積分ノルムを入れても完備にならない。ルベーグ積分はこれを解決し、単調収束定理・優収束定理という強力な極限定理をもつ。$p$ 乗が積分できる関数の空間 $L^p$ はバナッハ空間になり、$L^2$ はヒルベルト空間になる。偏微分方程式の解はこの空間の元として扱う。`,
    body: [
      { t: 'h2', id: 'why', text: 'なぜルベーグ積分か' },
      { t: 'p', text: R`リーマン積分には二つの弱点がある。(1) $[0,1]$ の有理数を $q_1,q_2,\dots$ と並べ、$f_k$ を「$q_1,\dots,q_k$ で $1$、それ以外で $0$」とすると、各 $f_k$ は有限個の点を除いて $0$ なので積分可能で $\int f_k=0$（[[riemann-integral#prob-2|問題]]と同じ）。しかし $f_k$ は単調に[[riemann-integral#ex-dirichlet-int|ディリクレ関数]]に近づき、極限は積分可能でない。(2) $C([0,1])$ に積分ノルムを入れても[[banach-space#ex-c-l1|完備でない]]。ルベーグ積分では、どちらの問題も起こらない。` },
      { t: 'def', id: 'def-null', title: '測度 0 の集合（ℝ の場合）', yomi: 'そくどぜろ', imp: 3, text: R`$E\subset\mathbb{R}$ が<b class="term">測度 0</b> であるとは、任意の $\varepsilon>0$ に対して、可算個の開区間 $(a_j,b_j)$（$j\in\mathbb{N}$）で $E\subset\bigcup_j(a_j,b_j)$ かつ $\sum_j(b_j-a_j)<\varepsilon$ となるものが存在することをいう。ある性質が測度 $0$ の集合を除いて成り立つとき、<b class="term">ほとんど至るところ</b>（a.e.）成り立つという。` },
      { t: 'prop', id: 'prop-countable-null', title: '可算集合は測度 0', yomi: 'かさんしゅうごうはそくどぜろ', imp: 2, text: R`$E=\{e_1,e_2,\dots\}\subset\mathbb{R}$（有限または可算）は測度 $0$ である。特に $\mathbb{Q}$ は測度 $0$。` },
      { t: 'proof', steps: [{ text: R`$\varepsilon>0$ に対し、$e_j$ を中心とする長さ $\frac\varepsilon{2^{j+1}}$ の開区間をとると、$E$ を覆い、長さの和は $\sum_j\frac\varepsilon{2^{j+1}}=\frac\varepsilon2<\varepsilon$（[[series#thm-geom|等比級数]]）。$\mathbb{Q}$ は可算（分母と分子の組を数え上げられる）なので測度 $0$。` }] },
      { t: 'note', title: 'ルベーグ積分の性質（まとめ）', text: R`ルベーグ測度とルベーグ積分の構成は参考文献に譲り、ここでは使う性質だけを挙げる（証明は参考文献）。可測関数 $f:\Omega\to[0,\infty]$ に対して $\int_\Omega f\,dx\in[0,\infty]$ が定まり、<ol><li>有界区間上のリーマン積分可能な関数では、リーマン積分と一致する（広義積分が絶対収束する場合も一致する）。</li><li>線形性・単調性をもつ。</li><li>$\int_\Omega|f|\,dx=0\iff f=0$ a.e.</li><li>ディリクレ関数は測度 $0$ の集合 $\mathbb{Q}$ の外で $0$ なので、$\int_0^1D=0$。</li></ol>` },
      { t: 'thm', id: 'thm-mct', title: '単調収束定理（ルベーグ積分）', yomi: 'たんちょうしゅうそくていり', imp: 3, text: R`可測関数 $f_k:\Omega\to[0,\infty]$ が a.e. で $f_1\le f_2\le\cdots$ をみたし、$f_k\to f$ a.e. ならば、$\displaystyle\lim_{k\to\infty}\int_\Omega f_k\,dx=\int_\Omega f\,dx$。（証明は参考文献）` },
      { t: 'thm', id: 'thm-dct', title: '優収束定理（ルベーグの収束定理）', yomi: 'ゆうしゅうそくていり', imp: 3, text: R`可測関数 $f_k:\Omega\to\mathbb{C}$ が a.e. で $f$ に収束し、ある $g\in L^1(\Omega)$（$g\ge0$）があってすべての $k$ で $|f_k|\le g$ a.e. ならば、$f\in L^1(\Omega)$ で $\displaystyle\lim_{k\to\infty}\int_\Omega|f_k-f|\,dx=0$、特に $\int f_k\to\int f$。（証明は参考文献）` },
      { t: 'rem', title: '優関数がないと失敗する', text: R`[[uniform-convergence#ex-tent|山の例]] $f_k$（高さ $k$、面積 $1$）は各点で $0$ に収束するが $\int f_k=1$。すべての $f_k$ を上から抑える可積分関数 $g$ は存在しない（$g\ge\sup_kf_k$ は $x\approx\frac1k$ で $\approx k$ となり、$\int g=\infty$）。優収束定理の仮定「$|f_k|\le g$」が本質的であることがわかる。リーマン積分の[[uniform-convergence#thm-unif-int|項別積分]]は一様収束を要求したが、ルベーグ積分では優関数があれば各点収束で十分になる。` },

      { t: 'h2', id: 'lp', text: 'Lᵖ 空間' },
      { t: 'def', id: 'def-Lp', title: 'Lᵖ 空間', yomi: 'えるぴーくうかん', imp: 3, text: R`$1\le p<\infty$ について、可測関数 $f:\Omega\to\mathbb{C}$ で $\int_\Omega|f|^pdx<\infty$ となるもの全体を、a.e. で等しい関数を同一視して $L^p(\Omega)$ と書き、$\|f\|_{L^p}:=\bigl(\int_\Omega|f|^pdx\bigr)^{1/p}$ とする。$p=\infty$ では $\|f\|_{L^\infty}:=\inf\{M\ge0\mid|f|\le M\text{ a.e.}\}$（本質的上限）が有限なもの全体を $L^\infty(\Omega)$ とする。` },
      { t: 'note', title: '「同一視」が必要な理由', text: R`$f=0$ と、一点だけ値を変えた $g$ は $\int|f-g|^p=0$ になる。同一視しないと、ノルムの公理「$\|f\|=0\Rightarrow f=0$」が成り立たない（[[metric-space#ex-metric-l1|積分距離の注意]]）。したがって $L^p$ の元は厳密には関数そのものではなく「a.e. で等しい関数の集まり（同値類）」である。「$f\in L^2$ の $x=0$ での値」のような言い方は、一般には意味をもたない。` },
      { t: 'thm', id: 'thm-holder-Lp', title: 'ヘルダーの不等式・ミンコフスキーの不等式（Lᵖ）', yomi: 'へるだー', imp: 3, text: R`$1\le p\le\infty$、$\frac1p+\frac1q=1$ とする。$f\in L^p(\Omega)$, $g\in L^q(\Omega)$ ならば $fg\in L^1(\Omega)$ で $\int_\Omega|fg|\le\|f\|_{L^p}\|g\|_{L^q}$。また $f,g\in L^p(\Omega)$ ならば $\|f+g\|_{L^p}\le\|f\|_{L^p}+\|g\|_{L^p}$。` },
      { t: 'proof', sketch: R`[[sequence-spaces#thm-holder|ℓᵖ の場合]]と全く同じ。和 $\sum_k$ を積分 $\int_\Omega dx$ に置きかえればよい。`, steps: [
        { text: R`$1<p<\infty$ のヘルダー：$\|f\|_{L^p},\|g\|_{L^q}>0$ としてよい。各点 $x$ で[[sequence-spaces#lem-young|ヤングの不等式]]を $\frac{|f(x)|}{\|f\|_{L^p}}$, $\frac{|g(x)|}{\|g\|_{L^q}}$ に使い、積分の単調性・線形性で積分すると、右辺の積分は $\frac1p+\frac1q=1$。$p=1$（$q=\infty$）は $|fg|\le|f|\,\|g\|_{L^\infty}$ a.e. を積分する。` },
        { text: R`ミンコフスキー：$|f+g|^p\le2^p(|f|^p+|g|^p)$（[[sequence-spaces#prop-lp-vs|数列の場合]]と同じ計算）より $f+g\in L^p$。あとは $\int|f+g|^p\le\int|f||f+g|^{p-1}+\int|g||f+g|^{p-1}$ にヘルダーの不等式（指数 $p$ と $q$、$(p-1)q=p$）を使って、両辺を $\|f+g\|_{L^p}^{p-1}$ で割る（$0$ なら自明）。` },
      ] },
      { t: 'thm', id: 'thm-riesz-fischer', title: 'リース＝フィッシャーの定理', yomi: 'りーす・ふぃっしゃー', imp: 3, text: R`$1\le p\le\infty$ について $L^p(\Omega)$ はバナッハ空間である。$L^2(\Omega)$ は内積 $(f,g):=\int_\Omega f\overline g\,dx$ によってヒルベルト空間である。（証明は参考文献。$1\le p<\infty$ の場合は、[[banach-space#thm-abs-series|絶対収束級数による完備性の特徴づけ]]と単調収束定理で示すのが標準的である。）` },
      { t: 'thm', id: 'thm-dense-Lp', title: '連続関数の稠密性', yomi: 'れんぞくかんすうのちゅうみつせい', imp: 3, text: R`$1\le p<\infty$ ならば、台がコンパクトな連続関数全体 $C_c(\Omega)$、さらに台がコンパクトな無限回微分可能な関数全体 $C_c^\infty(\Omega)$ は $L^p(\Omega)$ で[[closure#def-dense|稠密]]である。$p=\infty$ では成り立たない。（証明は参考文献）` },
      { t: 'note', title: '使い方：なめらかな関数で示して広げる', text: R`稠密性と[[extension-theorem#thm-extension|拡張定理]]を組み合わせると、「$C_c^\infty$ の関数で不等式 $\|Tf\|\le C\|f\|_{L^p}$ を示せば、$T$ は $L^p$ 全体に一意に延長される」。$L^p$ の関数そのものを直接扱う代わりに、なめらかな関数で計算して極限で広げる、というのが実解析の基本の流れである。` },
      { t: 'ex', id: 'ex-power-Lp', title: 'べき関数の可積分性', text: R`$a>0$ とする。$f(x)=x^{-a}$ は $L^p(0,1)$ に属する $\iff ap<1$、$L^p(1,\infty)$ に属する $\iff ap>1$。実際 $\int_0^1x^{-ap}dx$、$\int_1^\infty x^{-ap}dx$ の収束は[[improper-integral#ex-xp-0|広義積分の例]]で調べた（ルベーグ積分は非負関数の広義積分と一致する）。$0$ の近くでは「$p$ が小さいほど入りやすく」、無限遠では「$p$ が大きいほど入りやすい」。` },
      { t: 'prop', id: 'prop-Lp-incl-finite', title: '有限測度では Lʳ ⊂ Lᵖ（p ≤ r）', yomi: 'ゆうげんそくどのほうがん', imp: 2, text: R`$|\Omega|<\infty$、$1\le p\le r<\infty$ ならば $L^r(\Omega)\subset L^p(\Omega)$ で、$\|f\|_{L^p}\le|\Omega|^{\frac1p-\frac1r}\|f\|_{L^r}$。` },
      { t: 'proof', steps: [{ text: R`$p=r$ なら明らか。$p<r$ のとき、ヘルダーの不等式を指数 $\frac rp>1$ とその共役指数 $\frac r{r-p}$ で $|f|^p\cdot1$ に使うと $\int|f|^p\le\bigl(\int|f|^r\bigr)^{p/r}\bigl(\int1\bigr)^{1-p/r}=\|f\|_{L^r}^p|\Omega|^{1-p/r}$。$\frac1p$ 乗して結論。（[[sequence-spaces#prop-lp-incl|数列空間の包含]]と向きが逆であることに注意。）` }] },

      { t: 'h2', id: 'lorentz', text: '弱 Lᵖ とローレンツ空間' },
      { t: 'def', id: 'def-weak-Lp', title: '弱 Lᵖ 空間', yomi: 'じゃくえるぴー', imp: 1, text: R`$1\le p<\infty$ について、$\|f\|_{L^{p,\infty}}:=\sup_{\lambda>0}\lambda\,\bigl|\{x\in\Omega\mid|f(x)|>\lambda\}\bigr|^{1/p}<\infty$ となる可測関数全体を<b class="term">弱 $L^p$ 空間</b> $L^{p,\infty}(\Omega)$ という。チェビシェフの不等式 $\lambda^p|\{|f|>\lambda\}|\le\int|f|^p$ より $L^p\subset L^{p,\infty}$。$\mathbb{R}^n$ 上の $|x|^{-n/p}$ は $L^{p,\infty}$ に属するが $L^p$ に属さない。$L^p$ と $L^{p,\infty}$ の間をつなぐのが<b class="term">ローレンツ空間</b> $L^{p,q}$（$L^{p,p}=L^p$）で、分散型方程式の臨界的な評価で用いられる。（定義の詳細は参考文献）` },
      { t: 'crux', text: R`$L^p$ 空間は「関数の大きさの測り方」を $p$ で調整する道具である。$p$ が大きいと高い山（特異性）に厳しく、$p$ が小さいと広がった裾に厳しい。偏微分方程式の評価式は、どの $p$ で測るかの組み合わせとして書かれる（$L^p$–$L^q$ 評価、ストリッカーツ評価）。` },
      { t: 'qa', q: R`ルベーグ積分を本格的に学ぶ前に、研究の論文は読める？`, a: R`ある程度は読める。多くの論文では、$L^p$ のノルム、ヘルダー・ミンコフスキーの不等式、稠密性、優収束定理を「道具」として使うだけである。この記事の定理の主張を正確に覚えておけば、論文の議論の大部分は追える。測度論の構成そのものは、必要になったときに参考文献で学べばよい。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'fourier-series',
    title: 'フーリエ級数',
    sub: '三角関数系による展開とパーセバルの等式',
    yomi: 'ふーりえきゅうすう',
    aliases: ['フーリエ級数', 'ふーりえきゅうすう', 'フーリエ係数', 'ふーりえけいすう', 'リーマン・ルベーグの補題', 'りーまん・るべーぐ', 'ギブズ現象', 'ぎぶず', 'バーゼル問題', 'ばーぜる', '三角関数系', 'さんかくかんすうけい'],
    kind: '定理',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['orthonormal-system', 'integration-techniques', 'function-series', 'lebesgue-lp'],
    related: ['fourier-transform', 'sobolev'],
    notation: [
      R`$\mathbb{T}$：周期 $2\pi$ の関数を $[-\pi,\pi]$ 上で考えること。$f:[-\pi,\pi]\to\mathbb{C}$。`,
      R`フーリエ係数 $c_k=\hat f(k):=\frac1{2\pi}\int_{-\pi}^\pi f(x)e^{-ikx}\,dx$（$k\in\mathbb{Z}$）。部分和 $S_Nf(x):=\sum_{|k|\le N}c_ke^{ikx}$。`,
      R`$e_k(x):=\frac1{\sqrt{2\pi}}e^{ikx}$：$L^2(-\pi,\pi)$ の[[orthonormal-system#ex-ons|正規直交系]]。$(f,e_k)=\sqrt{2\pi}\,c_k$。`,
      REF,
    ],
    synopsis: R`周期関数を三角関数 $e^{ikx}=\cos kx+i\sin kx$ の重ね合わせとして表すのがフーリエ級数である。ヒルベルト空間の言葉では、$\{e^{ikx}/\sqrt{2\pi}\}$ が $L^2(-\pi,\pi)$ の完全正規直交系であることに他ならず、パーセバルの等式から $\sum\frac1{n^2}=\frac{\pi^2}6$ が導かれる。なめらかな関数ほどフーリエ係数は速く減り、これがソボレフ空間の考え方の原型になる。`,
    body: [
      { t: 'h2', id: 'def', text: 'フーリエ係数とベッセルの不等式' },
      { t: 'p', text: R`正規直交系の一般論（[[orthonormal-system|第 13 章]]）を、$L^2(-\pi,\pi)$ と $e_k(x)=\frac{e^{ikx}}{\sqrt{2\pi}}$ に当てはめる。$f$ の $e_k$ 方向の成分は $(f,e_k)e_k=c_ke^{ikx}$ なので、正規直交展開 $\sum(f,e_k)e_k$ はちょうど $\sum c_ke^{ikx}$ になる。` },
      { t: 'prop', id: 'prop-fourier-bessel', title: 'ベッセルの不等式とリーマン＝ルベーグの補題', yomi: 'りーまん・るべーぐのほだい', imp: 3, text: R`$f\in L^2(-\pi,\pi)$ ならば $\sum_{k\in\mathbb{Z}}|c_k|^2\le\frac1{2\pi}\int_{-\pi}^\pi|f|^2dx$。特に $c_k\to0$（$|k|\to\infty$）。` },
      { t: 'proof', steps: [{ text: R`[[orthonormal-system#thm-bessel|ベッセルの不等式]]を $\{e_k\}$ に使うと $\sum|(f,e_k)|^2\le\|f\|_{L^2}^2$、すなわち $2\pi\sum|c_k|^2\le\int|f|^2$。（$\mathbb{Z}$ で添字づけられているが、$0,1,-1,2,-2,\dots$ と並べれば同じ議論。）収束する正項級数の項は $0$ に収束する（[[series#thm-term|定理]]）。` }] },

      { t: 'h2', id: 'parseval', text: '完全性とパーセバルの等式' },
      { t: 'thm', id: 'thm-trig-complete', title: '三角関数系の完全性', yomi: 'さんかくかんすうけいのかんぜんせい', imp: 3, text: R`$\{e_k\}_{k\in\mathbb{Z}}$ は $L^2(-\pi,\pi)$ の完全正規直交系である。したがって任意の $f\in L^2(-\pi,\pi)$ について $\|f-S_Nf\|_{L^2}\to0$（$N\to\infty$）であり、
$$\frac1{2\pi}\int_{-\pi}^\pi|f(x)|^2dx=\sum_{k\in\mathbb{Z}}|c_k|^2\qquad(\text{パーセバルの等式}).$$
（証明は参考文献。三角多項式が $C(\mathbb{T})$ で一様に稠密であること（フェイエールの定理またはワイエルシュトラスの近似定理）と、$C(\mathbb{T})$ が $L^2$ で稠密であることから、[[orthonormal-system#thm-cons|特徴づけ]]の (ii) を確かめる。）` },
      { t: 'ex', id: 'ex-basel', title: 'Σ 1/n² = π²/6（バーゼル問題）', text: R`$f(x)=x$ とする。$c_0=\frac1{2\pi}\int_{-\pi}^\pi x\,dx=0$。$k\ne0$ では、$x\cos kx$ が奇関数なので $\int x\cos kx=0$、[[integration-techniques#ex-parts|部分積分の例]]より $\int_{-\pi}^\pi x\sin kx\,dx=\frac{2\pi(-1)^{k+1}}k$。よって
$$c_k=\frac1{2\pi}\int_{-\pi}^\pi x(\cos kx-i\sin kx)\,dx=\frac{-i}{2\pi}\cdot\frac{2\pi(-1)^{k+1}}k=\frac{i(-1)^k}k,\qquad|c_k|^2=\frac1{k^2}.$$
パーセバルの等式の左辺は $\frac1{2\pi}\int_{-\pi}^\pi x^2dx=\frac{\pi^2}3$。右辺は $\sum_{k\ne0}\frac1{k^2}=2\sum_{n=1}^\infty\frac1{n^2}$。したがって $\displaystyle\sum_{n=1}^\infty\frac1{n^2}=\frac{\pi^2}6$。` },
      { t: 'fig', type: 'fourier', preset: 'saw', editable: true, caption: R`のこぎり波 $f(x)=x$ のフーリエ部分和。$L^2$ の誤差 $\|f-S_N\|_2^2$ は $0$ に近づくが、端点 $\pm\pi$（周期的に延長すると跳びがある点）の近くでは、部分和が約 9% はみ出す山が残る（ギブズ現象）。各点・一様収束と $L^2$ 収束の違いが見える。` },

      { t: 'h2', id: 'smooth', text: 'なめらかさと係数の減り方' },
      { t: 'prop', id: 'prop-fourier-deriv', title: '微分は係数に ik を掛けること', yomi: 'びぶんとけいすう', imp: 3, text: R`$f\in C^1([-\pi,\pi])$ が $f(-\pi)=f(\pi)$ をみたすならば、$\widehat{f'}(k)=ik\,\hat f(k)$（$k\in\mathbb{Z}$）。` },
      { t: 'proof', steps: [{ text: R`[[integration-techniques#thm-parts|部分積分]]より $\int_{-\pi}^\pi f'(x)e^{-ikx}dx=\bigl[f(x)e^{-ikx}\bigr]_{-\pi}^\pi+ik\int_{-\pi}^\pi f(x)e^{-ikx}dx$。$e^{-ik\pi}=e^{ik\pi}=(-1)^k$ と $f(\pi)=f(-\pi)$ より境界項は $0$。$\frac1{2\pi}$ を掛けて結論。` }] },
      { t: 'thm', id: 'thm-fourier-uniform', title: 'C¹ 級の周期関数のフーリエ級数は一様収束する', yomi: 'いちようしゅうそく', imp: 3, text: R`$f\in C^1([-\pi,\pi])$、$f(-\pi)=f(\pi)$ ならば $\sum_{k\in\mathbb{Z}}|c_k|<\infty$ であり、$S_Nf\to f$ は $[-\pi,\pi]$ 上で一様収束する。` },
      {
        t: 'proof',
        steps: [
          {
            text: R`$k\ne0$ について $|c_k|=\frac{|\widehat{f'}(k)|}{|k|}$（命題）。有限和のコーシー＝シュワルツの不等式とベッセルの不等式（$f'$ に使う）より`,
            eqs: [[R`\sum_{0<|k|\le N}|c_k|\le\Bigl(\sum_{0<|k|\le N}|\widehat{f'}(k)|^2\Bigr)^{1/2}\Bigl(\sum_{0<|k|\le N}\frac1{k^2}\Bigr)^{1/2}\le\Bigl(\frac1{2\pi}\int|f'|^2\Bigr)^{1/2}\Bigl(\frac{\pi^2}3\Bigr)^{1/2}.`, R`コーシー＝シュワルツ・ベッセル・バーゼル問題`]],
          },
          { text: R`右辺は $N$ によらないので $\sum|c_k|<\infty$。$|c_ke^{ikx}|=|c_k|$ なので、[[function-series#thm-mtest|M 判定法]]より $S_Nf$ はある連続関数 $g$ に一様収束する。` },
          { text: R`一様収束すれば $L^2$ でも収束する（$\|S_Nf-g\|_{L^2}^2\le2\pi\|S_Nf-g\|_\infty^2$）。一方[[fourier-series#thm-trig-complete|完全性]]より $S_Nf\to f$ in $L^2$。極限の一意性より $f=g$ a.e.、どちらも連続なのですべての点で $f=g$（連続関数が a.e. で等しければ恒等的に等しい：差が正の点があれば、その近くの区間で正になり測度が正）。` },
        ],
      },
      { t: 'rem', title: '各点収束について', text: R`連続関数のフーリエ級数でも、各点で収束しないことがある（デュ・ボア＝レーモン）。一方、区分的に $C^1$ 級の周期関数なら、各点で $S_Nf(x)\to\frac{f(x+0)+f(x-0)}2$ となる（ディリクレの定理。証明は参考文献）。$L^2$ 関数のフーリエ級数は a.e. で収束する（カールソンの定理。非常に深い結果である）。` },
      { t: 'note', title: 'ソボレフ空間への入口', text: R`命題を繰り返すと、$f$ が $m$ 回なめらか（周期的に）なら $|c_k|\le\frac C{|k|^m}$ 程度に減る。逆に「$\sum(1+k^2)^s|c_k|^2<\infty$」を、$f$ が「$s$ 回微分して $L^2$」であることの定義として使える。これが周期関数のソボレフ空間 $H^s(\mathbb{T})$ であり、$s$ は整数でなくてよい（[[sobolev|ソボレフ空間]]）。` },
      { t: 'crux', text: R`フーリエ級数は「微分 ↔ $ik$ を掛ける」という翻訳辞書を与える。微分方程式は係数ごとの代数方程式になり、なめらかさは係数の減り方になる。$\mathbb{R}^n$ 上ではこれが[[fourier-transform|フーリエ変換]]になる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 2, title: '標準', text: R`$f(x)=|x|$（$x\in[-\pi,\pi]$）のフーリエ係数を求め、パーセバルの等式から $\sum_{j=0}^\infty\frac1{(2j+1)^4}=\frac{\pi^4}{96}$ を導け。`, hint: R`$c_0=\frac\pi2$。$k\ne0$ では $c_k=\frac{(-1)^k-1}{\pi k^2}$。`, answer: R`$c_0=\frac1{2\pi}\int|x|=\frac\pi2$。$k\ne0$：偶関数なので $c_k=\frac1\pi\int_0^\pi x\cos kx\,dx=\frac1\pi\Bigl[\frac{x\sin kx}k+\frac{\cos kx}{k^2}\Bigr]_0^\pi=\frac{(-1)^k-1}{\pi k^2}$（$k$ 奇数で $-\frac2{\pi k^2}$、偶数で $0$）。パーセバル：$\frac1{2\pi}\int x^2=\frac{\pi^2}3=\frac{\pi^2}4+2\sum_{k\text{ 奇}>0}\frac4{\pi^2k^4}$。よって $\sum_{k\text{ 奇}}\frac1{k^4}=\frac{\pi^2}8\cdot\frac{\pi^2}{12}=\frac{\pi^4}{96}$。`, space: 8 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'fourier-transform',
    title: 'フーリエ変換',
    sub: 'ガウス関数・プランシュレルの定理・L² への拡張',
    yomi: 'ふーりえへんかん',
    aliases: ['フーリエ変換', 'ふーりえへんかん', '逆フーリエ変換', 'プランシュレルの定理', 'ぷらんしゅれる', '急減少関数', 'きゅうげんしょうかんすう', 'シュワルツ空間', 'しゅわるつくうかん', '畳み込み', 'たたみこみ', 'ガウス関数'],
    kind: '用語',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['lebesgue-lp', 'fourier-series', 'extension-theorem', 'improper-integral'],
    related: ['sobolev', 'heat-equation', 'nls'],
    notation: [
      R`$x,\xi\in\mathbb{R}^n$、$x\cdot\xi=\sum x_j\xi_j$。$|x|=\sqrt{x\cdot x}$。`,
      R`$\mathcal{F}f=\hat f(\xi):=\int_{\mathbb{R}^n}e^{-ix\cdot\xi}f(x)\,dx$（この章の規約。$2\pi$ の置き場所は本によって違う）。逆変換 $\mathcal{F}^{-1}g(x):=(2\pi)^{-n}\int e^{ix\cdot\xi}g(\xi)\,d\xi$。`,
      R`$\mathcal{S}(\mathbb{R}^n)$：シュワルツ空間（急減少関数）。$f\in C^\infty$ で、任意の多重指数 $\alpha,\beta$ について $\sup_x|x^\alpha\partial^\beta f(x)|<\infty$ となるもの全体。`,
      R`$(f*g)(x):=\int f(x-y)g(y)\,dy$：畳み込み。`,
      REF,
    ],
    synopsis: R`フーリエ変換は、$\mathbb{R}^n$ 上の関数を周波数 $\xi$ ごとの成分 $\hat f(\xi)$ に分解する。微分は $i\xi$ を掛けることに、畳み込みは積に変わるので、定数係数の偏微分方程式は $\xi$ ごとの常微分方程式になる。$L^1$ 関数に対して積分で定義し、プランシュレルの等式と拡張定理によって $L^2$ 全体に広げる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と基本性質' },
      { t: 'def', id: 'def-ft', title: 'フーリエ変換（L¹）', yomi: 'ふーりえへんかん', imp: 3, text: R`$f\in L^1(\mathbb{R}^n)$ に対して $\hat f(\xi):=\int_{\mathbb{R}^n}e^{-ix\cdot\xi}f(x)\,dx$（$\xi\in\mathbb{R}^n$）を $f$ の<b class="term">フーリエ変換</b>という。$|e^{-ix\cdot\xi}f(x)|=|f(x)|$ なので積分は絶対収束する。` },
      { t: 'prop', id: 'prop-ft-basic', title: '基本性質', yomi: 'ふーりえへんかんのせいしつ', imp: 3, text: R`$f,g\in L^1(\mathbb{R}^n)$、$a\in\mathbb{R}^n$、$\lambda>0$ とする。
<ol><li>$\sup_\xi|\hat f(\xi)|\le\|f\|_{L^1}$。$\mathcal{F}$ は線形。</li><li>（平行移動）$f_a(x):=f(x-a)$ なら $\widehat{f_a}(\xi)=e^{-ia\cdot\xi}\hat f(\xi)$。</li><li>（スケール）$f^\lambda(x):=f(\lambda x)$ なら $\widehat{f^\lambda}(\xi)=\lambda^{-n}\hat f(\xi/\lambda)$。</li><li>（微分）$n=1$ で $f\in C^1(\mathbb{R})$、$f,f'\in L^1(\mathbb{R})$ ならば $\widehat{f'}(\xi)=i\xi\hat f(\xi)$。</li><li>$\hat f$ は連続で、$|\xi|\to\infty$ で $\hat f(\xi)\to0$（リーマン＝ルベーグの補題。証明は参考文献）。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $|\hat f(\xi)|\le\int|e^{-ix\cdot\xi}f(x)|dx=\|f\|_{L^1}$（積分の三角不等式）。線形性は積分の線形性。` },
          { text: R`(2) $y=x-a$ と置換すると $\int e^{-ix\cdot\xi}f(x-a)dx=\int e^{-i(y+a)\cdot\xi}f(y)dy=e^{-ia\cdot\xi}\hat f(\xi)$。(3) $y=\lambda x$（$dx=\lambda^{-n}dy$）と置換すると $\int e^{-ix\cdot\xi}f(\lambda x)dx=\lambda^{-n}\int e^{-iy\cdot\xi/\lambda}f(y)dy$。` },
          { text: R`(4) $f'\in L^1$ なので $f(x)=f(0)+\int_0^xf'$ は $x\to\pm\infty$ で極限をもち、$f\in L^1$ よりその極限は $0$ である。$[-R,R]$ で部分積分すると $\int_{-R}^Rf'(x)e^{-ix\xi}dx=\bigl[f(x)e^{-ix\xi}\bigr]_{-R}^R+i\xi\int_{-R}^Rf(x)e^{-ix\xi}dx$。$R\to\infty$ で境界項は $0$ に収束する。` },
        ],
      },
      { t: 'thm', id: 'thm-gauss-ft', title: 'ガウス関数のフーリエ変換', yomi: 'がうすかんすうのふーりえへんかん', imp: 3, text: R`$\displaystyle\int_{\mathbb{R}^n}e^{-ix\cdot\xi}e^{-|x|^2/2}\,dx=(2\pi)^{n/2}e^{-|\xi|^2/2}$。より一般に $a>0$ について $\mathcal{F}\bigl[e^{-a|x|^2}\bigr](\xi)=\bigl(\frac\pi a\bigr)^{n/2}e^{-|\xi|^2/(4a)}$。` },
      {
        t: 'proof',
        sketch: R`$n=1$ で示せば、$e^{-|x|^2/2}=\prod_je^{-x_j^2/2}$ と $e^{-ix\cdot\xi}=\prod_je^{-ix_j\xi_j}$ により各変数の積になる（フビニの定理）。$n=1$ では、変換 $g(\xi)$ が常微分方程式 $g'=-\xi g$ をみたすことを示す。`,
        steps: [
          { text: R`$n=1$、$g(\xi):=\int_{\mathbb{R}}e^{-ix\xi}e^{-x^2/2}dx$ とおく。$g(0)=\int e^{-x^2/2}dx=\sqrt{2\pi}$（[[improper-integral#ex-gauss|ガウス積分]] $\int e^{-y^2}dy=\sqrt\pi$ で $x=\sqrt2y$ と置換）。` },
          { text: R`$\xi$ について積分記号下で微分すると（被積分関数の $\xi$ 微分 $-ixe^{-ix\xi}e^{-x^2/2}$ は可積分関数 $|x|e^{-x^2/2}$ で抑えられるので、[[lebesgue-lp#thm-dct|優収束定理]]により正当化される）、$g'(\xi)=\int(-ix)e^{-ix\xi}e^{-x^2/2}dx$。` },
          { text: R`$(-x)e^{-x^2/2}=\frac d{dx}e^{-x^2/2}$ なので部分積分（境界項は $0$）すると $g'(\xi)=i\int e^{-ix\xi}\frac d{dx}e^{-x^2/2}dx=-i\int\Bigl(\frac d{dx}e^{-ix\xi}\Bigr)e^{-x^2/2}dx=-i\cdot(-i\xi)g(\xi)=-\xi g(\xi)$。` },
          { text: R`$h(\xi):=g(\xi)e^{\xi^2/2}$ とおくと $h'=(g'+\xi g)e^{\xi^2/2}=0$ なので $h$ は定数（[[mean-value#cor-const|平均値の定理の系]]）で $h=h(0)=\sqrt{2\pi}$。よって $g(\xi)=\sqrt{2\pi}e^{-\xi^2/2}$。一般の $a$ は[[fourier-transform#prop-ft-basic|スケール]]で $e^{-a|x|^2}=e^{-|\sqrt{2a}x|^2/2}$ と見ればよい。` },
        ],
      },
      { t: 'note', title: '言い換え', text: R`ガウス関数はフーリエ変換で（定数倍とスケールを除いて）自分自身に移る。細いガウス関数（$a$ 大）の変換は太いガウス関数になる：「位置に集中すると周波数は広がる」（不確定性原理）。[[heat-equation|熱核]]や[[nls|シュレディンガー方程式]]の基本解は、このガウス関数の計算から得られる。` },

      { t: 'h2', id: 'inv', text: '反転公式と L² 理論' },
      { t: 'thm', id: 'thm-ft-schwartz', title: 'シュワルツ空間上のフーリエ変換', yomi: 'しゅわるつくうかん', imp: 3, text: R`$\mathcal{F}$ は $\mathcal{S}(\mathbb{R}^n)$ から $\mathcal{S}(\mathbb{R}^n)$ への全単射であり、逆写像は $\mathcal{F}^{-1}g(x)=(2\pi)^{-n}\int e^{ix\cdot\xi}g(\xi)\,d\xi$（反転公式）。さらに $f,g\in\mathcal{S}$ について
$$\int f\overline g\,dx=(2\pi)^{-n}\int\hat f\,\overline{\hat g}\,d\xi,\qquad\|\hat f\|_{L^2}=(2\pi)^{n/2}\|f\|_{L^2}\qquad(\text{プランシュレルの等式}).$$
また $\widehat{\partial_jf}=i\xi_j\hat f$、$\widehat{f*g}=\hat f\,\hat g$。（証明は参考文献）` },
      { t: 'thm', id: 'thm-plancherel', title: 'L² 上のフーリエ変換（プランシュレルの定理）', yomi: 'ぷらんしゅれるのていり', imp: 3, text: R`$\mathcal{F}:\mathcal{S}(\mathbb{R}^n)\to L^2(\mathbb{R}^n)$ は、$L^2(\mathbb{R}^n)$ 全体で定義された有界線形作用素 $\mathcal{F}:L^2\to L^2$ に一意に拡張され、$\|\mathcal{F}f\|_{L^2}=(2\pi)^{n/2}\|f\|_{L^2}$ がすべての $f\in L^2$ で成り立つ。拡張は全射で、$(2\pi)^{-n/2}\mathcal{F}$ は $L^2$ のユニタリ作用素（内積を保つ全単射）である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$\mathcal{S}(\mathbb{R}^n)$ は $L^2$ の部分空間で、$C_c^\infty\subset\mathcal{S}$ が[[lebesgue-lp#thm-dense-Lp|稠密]]なので $\mathcal{S}$ も稠密。プランシュレルの等式より、$\mathcal{F}:\mathcal{S}\to L^2$ は作用素ノルム $(2\pi)^{n/2}$ の有界線形作用素である。$L^2$ は完備（[[lebesgue-lp#thm-riesz-fischer|リース＝フィッシャー]]）なので、[[extension-theorem#thm-extension|拡張定理]]より $L^2$ 全体へ一意に、ノルムを保って拡張される。` },
          { text: R`等式の保存：$f\in L^2$、$\mathcal{S}\ni f_k\to f$ とすると、$\|\mathcal{F}f_k\|=(2\pi)^{n/2}\|f_k\|$ の両辺で $k\to\infty$ とすれば（拡張の定義とノルムの連続性）$\|\mathcal{F}f\|=(2\pi)^{n/2}\|f\|$。全射性は、逆変換 $\mathcal{F}^{-1}$ も同様に拡張でき、$\mathcal{S}$ 上の関係 $\mathcal{F}\mathcal{F}^{-1}=I$ が連続性で $L^2$ に広がることから従う。` },
        ],
      },
      { t: 'rem', title: 'L² 関数のフーリエ変換は積分で書けるとは限らない', text: R`$f\in L^2\setminus L^1$ では $\int e^{-ix\cdot\xi}f(x)dx$ が絶対収束しない。$L^2$ 上のフーリエ変換は、積分の式ではなく「拡張」として定義されている。実際には $\hat f=\lim_{R\to\infty}\int_{|x|<R}e^{-ix\cdot\xi}f(x)dx$（$L^2$ の極限）と書ける。` },
      { t: 'crux', text: R`フーリエ変換で、方程式の「定数係数の微分作用素」は「かけ算作用素」になる。たとえば $\Delta$ は $-|\xi|^2$ を掛けることになり、熱方程式 $\partial_tu=\Delta u$ は $\partial_t\hat u=-|\xi|^2\hat u$、シュレディンガー方程式 $i\partial_tu+\Delta u=0$ は $\partial_t\hat u=-i|\xi|^2\hat u$ という、$\xi$ ごとの常微分方程式になる。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'sobolev',
    title: 'ソボレフ空間 Hˢ',
    sub: 'フーリエ変換による定義・埋め込み・スケーリング',
    yomi: 'そぼれふくうかん',
    aliases: ['ソボレフ空間', 'そぼれふくうかん', 'Hs', 'Hˢ', 'H1', '分数階ソボレフ空間', 'ぶんすうかい', 'ソボレフの埋め込み', 'そぼれふのうめこみ', 'ベゾフ空間', 'べぞふ', '斉次ソボレフ空間', 'スケーリング', 'すけーりんぐ', '臨界指数', '重み付きソボレフ空間', 'ジャパニーズブラケット'],
    kind: '用語',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['fourier-transform', 'hilbert-space', 'lebesgue-lp'],
    related: ['nls', 'local-wellposedness', 'dissipative-nls'],
    notation: [
      R`$\langle\xi\rangle:=(1+|\xi|^2)^{1/2}$（ジャパニーズブラケット）。$|\xi|\le\langle\xi\rangle$、$1\le\langle\xi\rangle$。`,
      R`$s\in\mathbb{R}$：なめらかさの指数（整数でなくてよい）。$\|f\|_{H^s}:=(2\pi)^{-n/2}\|\langle\xi\rangle^s\hat f\|_{L^2}$。`,
      R`$|\nabla|^s$：$\widehat{|\nabla|^sf}=|\xi|^s\hat f$ で定まる分数べきの微分。$\langle\nabla\rangle^s$ も同様。`,
      R`$\dot H^s$：斉次ソボレフ空間 $\|f\|_{\dot H^s}:=(2\pi)^{-n/2}\||\xi|^s\hat f\|_{L^2}$。`,
      REF,
    ],
    synopsis: R`「$s$ 回微分して $L^2$」という性質を、フーリエ変換で $\langle\xi\rangle^s\hat f\in L^2$ と表すと、$s$ を実数に広げたソボレフ空間 $H^s$ が得られる。$H^s$ はヒルベルト空間で、$s$ が大きいほど関数はなめらかになり、$s>\frac n2$ なら有界連続関数になる（ソボレフの埋め込み）。非線形シュレディンガー方程式の解は、主に $H^s$ の中で構成される。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-Hs', title: 'ソボレフ空間 Hˢ(ℝⁿ)', yomi: 'そぼれふくうかん', imp: 3, text: R`$s\ge0$ とする。$H^s(\mathbb{R}^n):=\{f\in L^2(\mathbb{R}^n)\mid\langle\xi\rangle^s\hat f\in L^2(\mathbb{R}^n)\}$ と定め、内積とノルムを
$$(f,g)_{H^s}:=(2\pi)^{-n}\int\langle\xi\rangle^{2s}\hat f(\xi)\overline{\hat g(\xi)}\,d\xi,\qquad\|f\|_{H^s}:=(2\pi)^{-n/2}\|\langle\xi\rangle^s\hat f\|_{L^2}$$
とする。（$s<0$ の場合は、緩増加超関数を使って同じ式で定義する。）` },
      { t: 'prop', id: 'prop-H1', title: 'H¹ のノルムは導関数の L² ノルム', yomi: 'えいちいち', imp: 3, text: R`$f\in\mathcal{S}(\mathbb{R}^n)$ について $\|f\|_{H^1}^2=\|f\|_{L^2}^2+\sum_{j=1}^n\|\partial_jf\|_{L^2}^2$。より一般に、整数 $m\ge0$ について $\|f\|_{H^m}$ は $\bigl(\sum_{|\alpha|\le m}\|\partial^\alpha f\|_{L^2}^2\bigr)^{1/2}$ と同値なノルムである。` },
      { t: 'proof', steps: [{ text: R`$\langle\xi\rangle^2=1+\sum_j\xi_j^2$ と[[fourier-transform#thm-ft-schwartz|$\widehat{\partial_jf}=i\xi_j\hat f$]]、プランシュレルの等式より、$(2\pi)^{-n}\int\langle\xi\rangle^2|\hat f|^2=(2\pi)^{-n}\int|\hat f|^2+\sum_j(2\pi)^{-n}\int|\widehat{\partial_jf}|^2=\|f\|_{L^2}^2+\sum_j\|\partial_jf\|_{L^2}^2$。$m$ 一般の場合は、$\langle\xi\rangle^{2m}$ と $\sum_{|\alpha|\le m}\xi^{2\alpha}$ が定数倍の範囲で同じ大きさであること（多項式の比較）から従う。` }] },
      { t: 'prop', id: 'prop-Hs-basic', title: '基本性質', yomi: 'そぼれふのきほんせいしつ', imp: 2, text: R`<ol><li>$H^s$ はヒルベルト空間である（重み付き $L^2$ 空間 $L^2(\langle\xi\rangle^{2s}d\xi)$ とフーリエ変換で同一視できるので、完備性はリース＝フィッシャーの定理から従う）。$H^0=L^2$。</li><li>$0\le r\le s$ ならば $H^s\subset H^r$ で $\|f\|_{H^r}\le\|f\|_{H^s}$。</li><li>$\mathcal{S}(\mathbb{R}^n)$（したがって $C_c^\infty$）は $H^s$ で稠密である（証明は参考文献）。</li></ol>` },
      { t: 'proof', steps: [{ text: R`(2) $\langle\xi\rangle\ge1$ なので $\langle\xi\rangle^{2r}\le\langle\xi\rangle^{2s}$。両辺に $|\hat f|^2$ を掛けて積分すればよい（積分の単調性）。` }] },

      { t: 'h2', id: 'embed', text: 'ソボレフの埋め込み' },
      { t: 'thm', id: 'thm-sobolev-embed', title: 'Hˢ ⊂ L^∞（s > n/2）', yomi: 'そぼれふのうめこみ', imp: 3, text: R`$s>\frac n2$ ならば、任意の $f\in H^s(\mathbb{R}^n)$ は（a.e. で等しい関数を選びなおせば）有界連続関数であり、
$$\|f\|_{L^\infty}\le C_{n,s}\|f\|_{H^s},\qquad C_{n,s}:=(2\pi)^{-n/2}\Bigl(\int_{\mathbb{R}^n}\langle\xi\rangle^{-2s}d\xi\Bigr)^{1/2}<\infty.$$` },
      { t: 'strategy', text: R`反転公式 $f(x)=(2\pi)^{-n}\int e^{ix\cdot\xi}\hat f(\xi)d\xi$ の積分を、$\langle\xi\rangle^{-s}\cdot\langle\xi\rangle^s\hat f$ と分けてコーシー＝シュワルツの不等式で抑える。$\langle\xi\rangle^{-s}$ が $L^2$ に入る条件がちょうど $2s>n$ である。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>定数の有限性。</b>$n=1$ の場合：$\int_{\mathbb{R}}(1+\xi^2)^{-s}d\xi$ は、$|\xi|\le1$ では被積分関数が $1$ 以下、$|\xi|\ge1$ では $(1+\xi^2)^{-s}\le|\xi|^{-2s}$ で、$2s>1$ なので[[improper-integral#ex-xp-inf|広義積分の例]]と比較判定法より収束する。一般の $n$ では極座標で $\int\langle\xi\rangle^{-2s}d\xi=|S^{n-1}|\int_0^\infty(1+r^2)^{-s}r^{n-1}dr$ となり、$r\to\infty$ で被積分関数は $r^{n-1-2s}$ 程度なので、$n-1-2s<-1\iff2s>n$ で収束する。` },
          {
            text: R`<b>評価。</b>$f\in\mathcal{S}$ とする。反転公式とコーシー＝シュワルツの不等式（$L^2$ の内積）より、すべての $x$ で`,
            eqs: [[R`|f(x)|\le(2\pi)^{-n}\int\langle\xi\rangle^{-s}\cdot\langle\xi\rangle^s|\hat f(\xi)|\,d\xi\le(2\pi)^{-n}\|\langle\xi\rangle^{-s}\|_{L^2}\|\langle\xi\rangle^s\hat f\|_{L^2}=C_{n,s}\|f\|_{H^s}.`, R`$|e^{ix\cdot\xi}|=1$・コーシー＝シュワルツ`]],
          },
          { text: R`<b>一般の $f\in H^s$。</b>$\mathcal{S}\ni f_k\to f$ in $H^s$ をとると、上の評価より $\|f_k-f_l\|_{L^\infty}\le C\|f_k-f_l\|_{H^s}\to0$ なので、$\{f_k\}$ は有界連続関数の空間 $C_b(\mathbb{R}^n)$（上限ノルム、[[banach-space#prob-3|バナッハ空間]]）のコーシー列で、ある $g\in C_b$ に一様収束する。一方 $f_k\to f$ in $L^2$ なので、部分列が a.e. で $f$ に収束する（参考文献）。よって $f=g$ a.e. で、評価式は極限で保たれる。` },
        ],
      },
      { t: 'fig', type: 'plot', preset: 'kgauss', caption: R`$n=1$ での $\langle\xi\rangle^{-2s}=(1+\xi^2)^{-s}$。$s=0.4$（$2s<1$）では裾が $|\xi|^{-0.8}$ 程度にしか減らず積分が発散し、$s>\frac12$ では収束する。この境目 $s=\frac n2$ が埋め込み定理の条件になる。` },
      { t: 'rem', title: 's = n/2 では成り立たない', text: R`$s=\frac n2$ では $H^{n/2}\not\subset L^\infty$ である。たとえば $n=2$ で、原点の近くで $\log\log\frac1{|x|}$ のようにふるまう関数は $H^1(\mathbb{R}^2)$ に属するが有界でない。その代わり $H^{n/2}$ の関数は指数的に可積分であることが知られている（トゥルーディンガー＝モーザーの不等式）。` },
      { t: 'thm', id: 'thm-Hs-algebra', title: 'Hˢ は環（s > n/2）', yomi: 'そぼれふのかん', imp: 2, text: R`$s>\frac n2$ ならば、ある定数 $C$ が存在して、すべての $f,g\in H^s(\mathbb{R}^n)$ について $fg\in H^s$ かつ $\|fg\|_{H^s}\le C\|f\|_{H^s}\|g\|_{H^s}$。（証明は参考文献。$\widehat{fg}=(2\pi)^{-n}\hat f*\hat g$ と $\langle\xi\rangle^s\le2^s(\langle\xi-\eta\rangle^s+\langle\eta\rangle^s)$ を使う。）` },
      { t: 'note', title: '使い方', text: R`この性質により、非線形項 $|u|^2u=u\cdot u\cdot\overline u$ は $\|\,|u|^2u\|_{H^s}\le C\|u\|_{H^s}^3$ と評価できる。これが $H^s$（$s>\frac n2$）での[[local-wellposedness|局所適切性]]の証明の鍵になる。` },

      { t: 'h2', id: 'scaling', text: 'スケーリングと臨界指数' },
      { t: 'prop', id: 'prop-Hs-scaling', title: '斉次ソボレフノルムのスケーリング', yomi: 'すけーりんぐ', imp: 3, text: R`$f\in\mathcal{S}(\mathbb{R}^n)$、$\lambda>0$、$f_\lambda(x):=f(\lambda x)$ とすると $\|f_\lambda\|_{\dot H^s}=\lambda^{s-\frac n2}\|f\|_{\dot H^s}$。` },
      {
        t: 'proof',
        steps: [
          {
            text: R`[[fourier-transform#prop-ft-basic|スケール]]より $\widehat{f_\lambda}(\xi)=\lambda^{-n}\hat f(\xi/\lambda)$。$\eta=\xi/\lambda$（$d\xi=\lambda^nd\eta$）と置換して`,
            eqs: [[R`\int|\xi|^{2s}|\widehat{f_\lambda}(\xi)|^2d\xi=\lambda^{-2n}\int|\lambda\eta|^{2s}|\hat f(\eta)|^2\lambda^nd\eta=\lambda^{2s-n}\int|\eta|^{2s}|\hat f(\eta)|^2d\eta.`, R`置換積分`]],
          },
          { text: R`平方根をとり $(2\pi)^{-n/2}$ を掛ければ結論。` },
        ],
      },
      { t: 'note', title: '臨界指数 s_c', text: R`非線形シュレディンガー方程式 $i\partial_tu+\Delta u=\lambda|u|^{p-1}u$ は、$u$ が解なら $u_\mu(t,x):=\mu^{\frac2{p-1}}u(\mu^2t,\mu x)$ も解になる（確かめよ）。$\|u_\mu(0)\|_{\dot H^s}=\mu^{\frac2{p-1}+s-\frac n2}\|u(0)\|_{\dot H^s}$ がスケールによらないのは $s=s_c:=\frac n2-\frac2{p-1}$ のときで、これを<b class="term">臨界指数</b>という。$s>s_c$（劣臨界）ではスケールを使った反例が作れず、局所適切性が期待できる。$s_c=0$ となる $p=1+\frac4n$ を<b class="term">質量臨界</b>という。` },
      { t: 'rem', title: 'その他の関数空間', text: R`<ul><li><b>重み付き空間：</b>$H^{0,s}:=\{f\mid\langle x\rangle^sf\in L^2\}$。フーリエ変換で $H^s$ と入れかわる。散乱理論や[[dissipative-nls|消散型 NLS]]の時間減衰の研究で、初期値の空間として現れる。</li><li><b>ベゾフ空間 $B^s_{p,q}$：</b>周波数 $|\xi|\approx2^j$ ごとに分けた部分（リトルウッド＝ペイリー分解）の $L^p$ ノルムに $2^{js}$ を掛け、$j$ について $\ell^q$ ノルムをとって定める。$B^s_{2,2}=H^s$。臨界的な問題で細かい調整が必要なときに使う。</li><li><b>ローレンツ空間：</b>[[lebesgue-lp#def-weak-Lp|弱 Lᵖ]] を参照。</li></ul>` },
      { t: 'crux', text: R`ソボレフ空間は「なめらかさを数で測る」空間で、$s$ を大きくすれば扱いやすく（埋め込みで有界・連続、環になる）、$s$ を小さくすれば広いクラスの初期値を扱える。研究では、できるだけ小さい $s$（理想的には臨界指数 $s_c$）で適切性や大域可解性を示すことが一つの目標になる。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'heat-equation',
    title: '熱方程式',
    sub: '熱核・平滑化・時間減衰',
    yomi: 'ねつほうていしき',
    aliases: ['熱方程式', 'ねつほうていしき', '熱核', 'ねっかく', 'ガウス核', '拡散方程式', 'かくさんほうていしき', '熱半群', 'ねつはんぐん', '平滑化効果', 'へいかつかこうか', '近似単位元'],
    kind: '用語',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['fourier-transform', 'improper-integral', 'uniform-continuity'],
    related: ['nls', 'dissipative-nls', 'sobolev'],
    notation: [
      R`$u=u(t,x)$：$t>0$ は時間、$x\in\mathbb{R}^n$ は位置。$\Delta=\sum_j\partial_{x_j}^2$（ラプラシアン）。`,
      R`$G_t(x):=(4\pi t)^{-n/2}e^{-|x|^2/(4t)}$（$t>0$）：熱核（ガウス核）。`,
      R`$e^{t\Delta}f:=G_t*f$：熱半群。$\widehat{e^{t\Delta}f}(\xi)=e^{-t|\xi|^2}\hat f(\xi)$。`,
      R`$C_b(\mathbb{R}^n)$：有界連続関数全体（上限ノルム）。`,
    ],
    synopsis: R`熱方程式 $\partial_tu=\Delta u$ の解は、初期値と熱核 $G_t$ の畳み込みで与えられる。フーリエ変換すると各周波数が $e^{-t|\xi|^2}$ で減衰するので、高い周波数（細かい凹凸）ほど速く消え、解は $t>0$ で瞬時になめらかになる（平滑化）。また $L^1$ の初期値に対して $\|u(t)\|_{L^\infty}\le(4\pi t)^{-n/2}\|u_0\|_{L^1}$ という時間減衰が成り立つ。消散と減衰の、最も基本的なモデルである。`,
    body: [
      { t: 'h2', id: 'kernel', text: '熱核' },
      { t: 'p', text: R`初期値問題 $\partial_tu=\Delta u$（$t>0$）、$u(0,x)=u_0(x)$ を、フーリエ変換で形式的に解く。$\partial_t\hat u(t,\xi)=-|\xi|^2\hat u(t,\xi)$ は $\xi$ ごとの常微分方程式で、$\hat u(t,\xi)=e^{-t|\xi|^2}\hat u_0(\xi)$。[[fourier-transform#thm-gauss-ft|ガウス関数の変換]]を $a=\frac1{4t}$ で使うと $e^{-t|\xi|^2}=\widehat{G_t}(\xi)$ なので、畳み込みの公式より $u(t)=G_t*u_0$ となる。` },
      { t: 'prop', id: 'prop-heat-kernel', title: '熱核の性質', yomi: 'ねっかくのせいしつ', imp: 3, text: R`$t>0$ について (1) $G_t(x)>0$、(2) $\int_{\mathbb{R}^n}G_t(x)\,dx=1$、(3) $\sup_xG_t(x)=(4\pi t)^{-n/2}$、(4) $G_t$ は $(0,\infty)\times\mathbb{R}^n$ で $\partial_tG_t=\Delta G_t$ をみたす。` },
      {
        t: 'proof',
        steps: [
          { text: R`(1)(3) は指数関数の性質（$e^{-|x|^2/(4t)}\le1$、等号は $x=0$）。(2) 各変数の積に分かれ、$\int_{\mathbb{R}}e^{-y^2/(4t)}dy=\sqrt{4t}\int e^{-z^2}dz=\sqrt{4\pi t}$（$y=\sqrt{4t}z$ と置換、[[improper-integral#ex-gauss|ガウス積分]]）。` },
          {
            text: R`(4) $n=1$ で計算する（一般の $n$ も同様に各変数ごと）。$G=(4\pi t)^{-1/2}e^{-x^2/(4t)}$ について`,
            eqs: [
              [R`\partial_tG=\Bigl(-\frac1{2t}+\frac{x^2}{4t^2}\Bigr)G,`, R`積と合成の微分`],
              [R`\partial_xG=-\frac x{2t}G,\qquad\partial_x^2G=\Bigl(-\frac1{2t}+\frac{x^2}{4t^2}\Bigr)G.`, R`もう一度微分`],
            ],
          },
        ],
      },
      { t: 'fig', type: 'heat', preset: 'box', editable: true, caption: R`初期値 $u_0$（点線）と、時刻 $t$ の解 $u(t,\cdot)=G_t*u_0$（紺）。箱型の角は一瞬で丸くなり（平滑化）、山は低く広くなっていく（減衰）。面積 $\int u(t)dx$ は保存される（熱核の積分が $1$）。` },

      { t: 'h2', id: 'thm', text: '解の性質' },
      { t: 'thm', id: 'thm-heat-solution', title: '熱方程式の解', yomi: 'ねつほうていしきのかい', imp: 3, text: R`$u_0\in C_b(\mathbb{R}^n)$ とし、$u(t,x):=\int_{\mathbb{R}^n}G_t(x-y)u_0(y)\,dy$（$t>0$）とおく。
<ol><li>（最大値の評価）$|u(t,x)|\le\sup|u_0|$。</li><li>（初期値の実現）各 $x$ で $u(t,x)\to u_0(x)$（$t\to+0$）。</li><li>（減衰）$u_0\in L^1$ でもあれば $|u(t,x)|\le(4\pi t)^{-n/2}\|u_0\|_{L^1}$。</li><li>（平滑化）$u$ は $(0,\infty)\times\mathbb{R}^n$ で無限回微分可能で、熱方程式をみたす（微分と積分の交換は参考文献）。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $|u(t,x)|\le\int G_t(x-y)|u_0(y)|dy\le\sup|u_0|\int G_t(x-y)dy=\sup|u_0|$（熱核の (1)(2)）。` },
          { text: R`(2) $\int G_t(x-y)dy=1$ より $u(t,x)-u_0(x)=\int G_t(x-y)(u_0(y)-u_0(x))dy$。$\varepsilon>0$ をとり、$u_0$ の $x$ での連続性から $|y-x|<\delta$ なら $|u_0(y)-u_0(x)|<\frac\varepsilon2$ となる $\delta>0$ をとる。積分を $|y-x|<\delta$ と $|y-x|\ge\delta$ に分けると、前者は $\frac\varepsilon2\int G_t=\frac\varepsilon2$ 以下。後者は $2\sup|u_0|\int_{|z|\ge\delta}G_t(z)dz$ 以下で、$z=\sqrt tw$ と置換すると $\int_{|w|\ge\delta/\sqrt t}G_1(w)dw\to0$（$t\to+0$。可積分関数の裾）。よって十分小さい $t$ で $|u(t,x)-u_0(x)|<\varepsilon$。` },
          { text: R`(3) $|u(t,x)|\le\sup_zG_t(z)\int|u_0(y)|dy=(4\pi t)^{-n/2}\|u_0\|_{L^1}$（熱核の (3)）。` },
        ],
      },
      { t: 'prop', id: 'prop-heat-smoothing', title: '平滑化の評価', yomi: 'へいかつかのひょうか', imp: 3, text: R`$s>0$、$t>0$、$f\in L^2(\mathbb{R}^n)$ ならば $e^{t\Delta}f\in\dot H^s$ で
$$\|e^{t\Delta}f\|_{\dot H^s}\le\Bigl(\frac s{2e\,t}\Bigr)^{s/2}\|f\|_{L^2}.$$` },
      {
        t: 'proof',
        steps: [
          { text: R`$\phi(r):=r^{s}e^{-tr^2}$（$r\ge0$）の最大値を求める。$\phi'(r)=(s-2tr^2)r^{s-1}e^{-tr^2}$ なので $r^2=\frac s{2t}$ で最大で、最大値は $\bigl(\frac s{2t}\bigr)^{s/2}e^{-s/2}=\bigl(\frac s{2et}\bigr)^{s/2}$。` },
          { text: R`$\||\xi|^se^{-t|\xi|^2}\hat f\|_{L^2}\le\sup_\xi\phi(|\xi|)\cdot\|\hat f\|_{L^2}$。$(2\pi)^{-n/2}$ を掛けて[[fourier-transform#thm-plancherel|プランシュレル]]を使えば結論。` },
        ],
      },
      { t: 'note', title: '言い換え', text: R`$L^2$ の初期値（なめらかでなくてよい）から出発しても、$t>0$ では何回でも微分できる関数になり、$s$ 回微分のノルムは $t^{-s/2}$ 程度で抑えられる。さらに強く、$t>0$ の解は $x$ について実解析的になる（解析的平滑化）。非線形シュレディンガー方程式でも、重み付きの初期値に対して解析的・ジュブレイ（Gevrey）級の平滑化効果が成り立つことが研究されている（[[dissipative-nls|消散型 NLS]]）。` },
      { t: 'crux', text: R`熱方程式の解の性質はすべて「周波数ごとに $e^{-t|\xi|^2}$ で減衰する」ことから来ている。シュレディンガー方程式では因子が $e^{-it|\xi|^2}$（絶対値 $1$）に変わり、平滑化も $L^2$ ノルムの減衰も起こらない。その代わりに波が「分散」して $L^\infty$ ノルムが減衰する。熱方程式との違いを意識することが、分散型方程式を理解する近道である。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'nls',
    title: 'シュレディンガー方程式',
    sub: '自由解・分散・デュアメルの公式・保存則',
    yomi: 'しゅれでぃんがーほうていしき',
    aliases: ['シュレディンガー方程式', 'しゅれでぃんがーほうていしき', '非線形シュレディンガー方程式', 'NLS', 'えぬえるえす', '分散型方程式', 'ぶんさんがた', '分散評価', 'ストリッカーツ評価', 'すとりっかーつ', '質量保存', 'エネルギー保存', '自由解', 'デュアメルの公式', 'ユニタリ群', 'ガリレイ変換'],
    kind: '用語',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['fourier-transform', 'sobolev', 'ode-application', 'heat-equation'],
    related: ['local-wellposedness', 'dissipative-nls'],
    notation: [
      R`$u=u(t,x)\in\mathbb{C}$、$t\in\mathbb{R}$、$x\in\mathbb{R}^n$。$i\partial_tu+\Delta u=0$：自由シュレディンガー方程式。`,
      R`$U(t)=e^{it\Delta}$：自由シュレディンガー群。$\widehat{U(t)f}(\xi)=e^{-it|\xi|^2}\hat f(\xi)$。`,
      R`$\lambda\in\mathbb{C}$、$p>1$：非線形項 $F(u)=\lambda|u|^{p-1}u$ の係数と次数。$\lambda\in\mathbb{R}$ なら保存型、$\operatorname{Im}\lambda<0$ なら[[dissipative-nls|消散型]]。`,
      R`$(q,r)$：許容対 $\frac2q=n\bigl(\frac12-\frac1r\bigr)$、$2\le r\le\frac{2n}{n-2}$（$n\ge3$。$n=1,2$ では適宜修正）。`,
      REF,
    ],
    synopsis: R`シュレディンガー方程式 $i\partial_tu+\Delta u=0$ は、フーリエ変換すると各周波数の位相が $e^{-it|\xi|^2}$ で回るだけなので、$L^2$ ノルムも $H^s$ ノルムも保存される。それでも波は空間に広がり、$L^\infty$ ノルムは $|t|^{-n/2}$ で減衰する（分散）。非線形方程式はデュアメルの公式で積分方程式に書きかえ、不動点定理で解く。`,
    body: [
      { t: 'h2', id: 'free', text: '自由解' },
      { t: 'prop', id: 'prop-schrod-unitary', title: '自由シュレディンガー群はユニタリ', yomi: 'ゆにたり', imp: 3, text: R`$s\ge0$、$f\in H^s(\mathbb{R}^n)$ について $\|U(t)f\|_{H^s}=\|f\|_{H^s}$（$t\in\mathbb{R}$）。また $U(t+\tau)=U(t)U(\tau)$、$U(0)=I$、$U(t)^{-1}=U(-t)$。` },
      { t: 'proof', steps: [{ text: R`$|e^{-it|\xi|^2}|=1$ なので $\|\langle\xi\rangle^s\widehat{U(t)f}\|_{L^2}=\|\langle\xi\rangle^s\hat f\|_{L^2}$（[[sobolev#def-Hs|$H^s$ の定義]]）。群の性質は $e^{-i(t+\tau)|\xi|^2}=e^{-it|\xi|^2}e^{-i\tau|\xi|^2}$ から。` }] },
      { t: 'ex', id: 'ex-gauss-schrod', title: 'ガウス型の波束（n = 1）', text: R`$u_0(x)=e^{-x^2/2}$ のとき $u(t,x)=(1+2it)^{-1/2}\exp\Bigl(-\dfrac{x^2}{2(1+2it)}\Bigr)$。実際 $u=A(t)e^{-x^2/(2\sigma(t))}$ とおいて代入すると、$x^2$ の係数から $\sigma'=2i$、定数項から $A'=-\frac{iA}\sigma$ が出て、$\sigma=1+2it$、$A=(1+2it)^{-1/2}$。$\frac1\sigma=\frac{1-2it}{1+4t^2}$ より
$$|u(t,x)|=(1+4t^2)^{-1/4}\exp\Bigl(-\frac{x^2}{2(1+4t^2)}\Bigr).$$
$\sup_x|u(t,x)|=(1+4t^2)^{-1/4}\approx(2|t|)^{-1/2}$ で減衰し、幅は $\sqrt{1+4t^2}$ で広がる。$\|u(t)\|_{L^2}^2=\int|u|^2=(1+4t^2)^{-1/2}\sqrt{\pi(1+4t^2)}=\sqrt\pi$ は一定である。` },
      { t: 'fig', type: 'schrod', preset: 'move', editable: true, caption: R`ガウス型の波束 $u_0=e^{-x^2/2+ikx}$ の時間発展（$|u|$ を紺の太線、実部を赤の破線）。波束は速度 $2k$ で進みながら広がり、高さが $t^{-1/2}$ 程度で下がる。面積 $\int|u|^2dx=\sqrt\pi$ は変わらない。（$k\ne0$ の解はガリレイ変換 $u(t,x)=e^{ikx-ik^2t}v(t,x-2kt)$ で $k=0$ の解 $v$ から得られる。）` },
      { t: 'thm', id: 'thm-dispersive', title: '分散評価', yomi: 'ぶんさんひょうか', imp: 3, text: R`$t\ne0$、$f\in L^1\cap L^2(\mathbb{R}^n)$ について
$$U(t)f(x)=(4\pi it)^{-n/2}\int_{\mathbb{R}^n}e^{\frac{i|x-y|^2}{4t}}f(y)\,dy,\qquad\|U(t)f\|_{L^\infty}\le(4\pi|t|)^{-n/2}\|f\|_{L^1}.$$
（核の公式はガウス関数の計算を複素数の $a$ に延長して得られる。証明は参考文献。評価式は核の絶対値が $(4\pi|t|)^{-n/2}$ であることから直ちに従う。）` },
      { t: 'thm', id: 'thm-strichartz', title: 'ストリッカーツ評価', yomi: 'すとりっかーつひょうか', imp: 3, text: R`$(q,r)$ を許容対とすると、ある定数 $C$ が存在して $\|U(t)f\|_{L^q_tL^r_x(\mathbb{R}\times\mathbb{R}^n)}\le C\|f\|_{L^2}$ がすべての $f\in L^2$ で成り立つ。非斉次項 $\int_0^tU(t-s)F(s)\,ds$ についても同様の評価が成り立つ。（ストリッカーツ (1977)、ジニブレ＝ヴェロ、端点はキール＝タオ (1998)。証明は参考文献）` },
      { t: 'note', title: '熱方程式との比較', text: R`熱方程式では $\|e^{t\Delta}f\|_{L^2}$ が減り、なめらかになる。シュレディンガー方程式では $\|U(t)f\|_{L^2}$ は保存され、なめらかにもならない（$H^s$ ノルムも保存）。それでも $L^\infty$ では同じ $t^{-n/2}$ の減衰がある。これは「高さが下がる代わりに、遠くまで広がる」ことで $L^2$ ノルムを保っているからである。ストリッカーツ評価は、この分散効果を時間について積分した形で捉えたものである。` },

      { t: 'h2', id: 'nonlinear', text: '非線形シュレディンガー方程式' },
      { t: 'def', id: 'def-nls', title: '非線形シュレディンガー方程式（NLS）', yomi: 'ひせんけいしゅれでぃんがーほうていしき', imp: 3, text: R`$\lambda\in\mathbb{C}$、$p>1$ とする。
$$i\partial_tu+\Delta u=\lambda|u|^{p-1}u,\qquad u(0,x)=u_0(x)\tag{NLS}$$
を<b class="term">非線形シュレディンガー方程式</b>という。$p$ が奇数なら $|u|^{p-1}u=u^{\frac{p+1}2}\overline u^{\frac{p-1}2}$ は多項式である（たとえば $p=3$ で $|u|^2u=u^2\overline u$）。` },
      { t: 'prop', id: 'prop-duhamel-nls', title: 'デュアメルの公式', yomi: 'でゅあめるのこうしき', imp: 3, text: R`十分なめらかで減衰する $u$ について、(NLS) は積分方程式
$$u(t)=U(t)u_0-i\lambda\int_0^tU(t-s)\bigl(|u|^{p-1}u\bigr)(s)\,ds\tag{D}$$
と同値である。` },
      {
        t: 'proof',
        sketch: R`常微分方程式で $u'=Au+F$ の解が $u(t)=e^{tA}u_0+\int_0^te^{(t-s)A}F(s)ds$ となるのと同じ計算（[[ode-application#thm-duhamel|デュアメルの原理]]）。$A=i\Delta$、$F=-i\lambda|u|^{p-1}u$ に当たる。`,
        steps: [
          { text: R`(NLS) を $\partial_tu=i\Delta u-i\lambda|u|^{p-1}u$ と書く。$v(t):=U(-t)u(t)$ とおくと、フーリエ変換で計算して $\partial_t\hat v=e^{it|\xi|^2}(\partial_t\hat u+i|\xi|^2\hat u)$。$\widehat{i\Delta u}=-i|\xi|^2\hat u$ なので $\partial_t\hat v=e^{it|\xi|^2}\widehat{(-i\lambda|u|^{p-1}u)}$、すなわち $\partial_tv=-i\lambda U(-t)(|u|^{p-1}u)$。` },
          { text: R`$0$ から $t$ まで積分して $v(t)=u_0-i\lambda\int_0^tU(-s)(|u|^{p-1}u)(s)ds$。両辺に $U(t)$ を作用させ、$U(t)U(-s)=U(t-s)$ を使えば (D)。逆に (D) を微分すれば (NLS) に戻る。（関数空間での正当化は参考文献。）` },
        ],
      },
      { t: 'prop', id: 'prop-nls-mass', title: '質量（L² ノルム）の変化', yomi: 'しつりょうほぞん', imp: 3, text: R`(NLS) のなめらかで減衰の速い解について
$$\frac d{dt}\|u(t)\|_{L^2}^2=2\operatorname{Im}\lambda\int_{\mathbb{R}^n}|u(t,x)|^{p+1}dx.$$
特に $\lambda\in\mathbb{R}$ なら $\|u(t)\|_{L^2}$ は保存され、$\operatorname{Im}\lambda<0$ なら単調に減少する。` },
      {
        t: 'proof',
        steps: [
          {
            text: R`$\partial_tu=i\Delta u-i\lambda|u|^{p-1}u$ より`,
            eqs: [
              [R`\frac d{dt}\int|u|^2=2\operatorname{Re}\int\partial_tu\,\overline u=2\operatorname{Re}\Bigl(i\int\Delta u\,\overline u\Bigr)+2\operatorname{Re}\Bigl(-i\lambda\int|u|^{p+1}\Bigr)`, R`$\partial_t|u|^2=2\operatorname{Re}(\partial_tu\,\overline u)$`],
              [R`\phantom{\frac d{dt}\int|u|^2}=2\operatorname{Re}\Bigl(-i\int|\nabla u|^2\Bigr)+2\operatorname{Im}\lambda\int|u|^{p+1}=2\operatorname{Im}\lambda\int|u|^{p+1}.`, R`部分積分 $\int\Delta u\,\overline u=-\int|\nabla u|^2$・$\operatorname{Re}(-i\lambda)=\operatorname{Im}\lambda$`],
            ],
          },
          { text: R`$-i\int|\nabla u|^2$ は純虚数なので実部は $0$。（積分と微分の交換、部分積分の境界項の消失は、解のなめらかさと減衰で正当化される。）` },
        ],
      },
      { t: 'note', title: 'エネルギー保存', text: R`$\lambda\in\mathbb{R}$ のとき、エネルギー $E(u):=\frac12\|\nabla u\|_{L^2}^2+\frac\lambda{p+1}\|u\|_{L^{p+1}}^{p+1}$ も保存される（同様の計算）。$\lambda>0$（反発型・defocusing）なら両項とも正なので、エネルギー保存から $\|\nabla u(t)\|_{L^2}$ の一様な上界が得られ、[[local-wellposedness|局所解を時間大域解に延長する]]ための鍵になる。$\lambda<0$（引力型・focusing）では解が有限時間で爆発することがある。` },
      { t: 'rem', title: '長距離型と短距離型', text: R`自由解は $|u|\approx t^{-n/2}$ で減衰するので、非線形項の大きさは $|u|^{p-1}\approx t^{-n(p-1)/2}$ 程度である。$\int^\infty t^{-n(p-1)/2}dt$ が収束するのは $p>1+\frac2n$ のときで、このとき非線形項は時間とともに無視でき、解は自由解に近づく（散乱）。$p\le1+\frac2n$（長距離型）では非線形の効果が最後まで残り、$p=1+\frac2n$ では解の位相に $\log t$ の補正が現れる（修正散乱）。[[dissipative-nls|消散型 NLS]]はこの臨界の場合が主な舞台である。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'local-wellposedness',
    title: '縮小写像による局所適切性',
    sub: '時間局所解・一意性・連続依存性',
    yomi: 'しゅくしょうしゃぞうによるきょくしょてきせつせい',
    aliases: ['適切性', 'てきせつせい', '局所適切性', 'きょくしょてきせつせい', '時間局所解', 'じかんきょくしょかい', '時間大域解', '大域可解性', 'たいいきかかいせい', '連続依存性', 'れんぞくいぞんせい', '爆発', 'ばくはつ', '爆発の判定法', 'well-posedness', 'アダマール'],
    kind: '定理',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['banach-fixed-point', 'ode-application', 'nls', 'sobolev'],
    related: ['dissipative-nls'],
    notation: [
      R`$X$：バナッハ空間（たとえば $H^s(\mathbb{R}^n)$）。$C([0,T];X)$：$[0,T]$ から $X$ への連続写像全体、ノルム $\|u\|_{C_TX}:=\max_{0\le t\le T}\|u(t)\|_X$（バナッハ空間。証明は[[banach-space#thm-c-complete|C(I) の場合]]と同じ）。`,
      R`$\{U(t)\}_{t\in\mathbb{R}}$：$X$ 上の等長作用素の族で、$U(t+\tau)=U(t)U(\tau)$、$t\mapsto U(t)f$ が連続（強連続）なもの。`,
      R`$F:X\to X$：非線形項。<b>局所リプシッツ</b>：各 $R>0$ に対して定数 $L(R)$ があって、$\|u\|_X,\|v\|_X\le R$ なら $\|F(u)-F(v)\|_X\le L(R)\|u-v\|_X$。$F(0)=0$ とする。`,
      R`$\int_0^tU(t-s)F(u(s))\,ds$：$X$ 値の連続関数のリーマン積分（実数値と同じくリーマン和の極限で定義され、$\bigl\|\int g\bigr\|_X\le\int\|g\|_X$ が成り立つ。参考文献）。`,
    ],
    synopsis: R`偏微分方程式の初期値問題が「適切」であるとは、解が存在し、一意で、初期値に連続に依存することである（アダマール）。非線形シュレディンガー方程式をデュアメルの公式で積分方程式に書きかえ、短い時間区間 $[0,T]$ 上の関数空間の閉球で縮小写像の原理を使うと、時間局所解が得られる。存在時間 $T$ は初期値のノルムだけで決まるので、ノルムが有界にとどまる限り解は延長でき、爆発の判定法が得られる。`,
    body: [
      { t: 'h2', id: 'def', text: '適切性' },
      { t: 'def', id: 'def-wellposed', title: '適切性（アダマールの意味）', yomi: 'てきせつせい', imp: 3, text: R`初期値問題が空間 $X$ で<b class="term">（時間局所的に）適切</b>であるとは、任意の $u_0\in X$ に対して、ある $T>0$ と次をみたす解 $u\in C([0,T];X)$ が存在することをいう。
<ol><li>（存在）$u$ は方程式（の積分形）をみたす。</li><li>（一意性）同じ初期値の解は（指定したクラスの中で）ただ一つ。</li><li>（連続依存性）初期値写像 $u_0\mapsto u$ が連続：$u_{0,k}\to u_0$ in $X$ なら、対応する解が $C([0,T];X)$ で収束する。</li></ol>$T$ を任意に大きくとれるとき<b class="term">時間大域的に適切</b>（大域可解）という。` },
      { t: 'note', title: 'なぜ連続依存性まで要求するか', text: R`物理的なモデルでは、初期値は測定誤差を含む。初期値のわずかな違いで解が大きく変わるなら、方程式から予測ができない。連続依存性は「方程式が予測に使える」ことの数学的な表現である。` },

      { t: 'h2', id: 'abstract', text: '抽象的な局所存在定理' },
      { t: 'thm', id: 'thm-abstract-lwp', title: '縮小写像による局所存在', yomi: 'きょくしょそんざい', imp: 3, text: R`記号メモの仮定の下で、$R_0>0$ とし $T:=\dfrac1{2L(2R_0)}$ とおく。$\|u_0\|_X\le R_0$ ならば、積分方程式
$$u(t)=U(t)u_0-i\int_0^tU(t-s)F(u(s))\,ds\qquad(0\le t\le T)\tag{D}$$
は閉球 $B:=\{u\in C([0,T];X)\mid\|u\|_{C_TX}\le2R_0\}$ の中にただ一つの解をもつ。さらに、$\|u_0\|_X,\|v_0\|_X\le R_0$ の初期値に対する解 $u,v\in B$ は $\|u-v\|_{C_TX}\le2\|u_0-v_0\|_X$ をみたす。` },
      { t: 'strategy', text: R`$\Phi(u)(t):=U(t)u_0-i\int_0^tU(t-s)F(u(s))ds$ とおき、(1) $\Phi(B)\subset B$、(2) $\Phi$ が $B$ 上で縮小定数 $\frac12$ の縮小写像、を示す。$B$ は完備な空間の閉集合なので[[banach-fixed-point#prop-banach-metric|完備距離空間]]であり、[[banach-fixed-point#thm-banach-fp|不動点定理]]が使える。時間 $T$ を小さくとることで、積分の項に因子 $T$ がつき、縮小性が生まれる。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>準備。</b>$u\in B$ なら各 $s$ で $\|u(s)\|_X\le2R_0$ なので、局所リプシッツ性と $F(0)=0$ より $\|F(u(s))\|_X\le L(2R_0)\|u(s)\|_X\le2R_0L(2R_0)$。$\Phi(u)\in C([0,T];X)$ であること（$t$ についての連続性）は、$U$ の強連続性と積分の性質から従う（参考文献）。` },
          {
            text: R`<b>(1) $\Phi(B)\subset B$。</b>$U(t)$ は等長なので、$0\le t\le T$ で`,
            eqs: [[R`\|\Phi(u)(t)\|_X\le\|U(t)u_0\|_X+\int_0^t\|U(t-s)F(u(s))\|_Xds\le R_0+T\cdot2R_0L(2R_0)=R_0+R_0=2R_0.`, R`三角不等式・積分の三角不等式・等長性・$T=\frac1{2L(2R_0)}$`]],
          },
          {
            text: R`<b>(2) 縮小性。</b>$u,v\in B$ について`,
            eqs: [[R`\|\Phi(u)(t)-\Phi(v)(t)\|_X\le\int_0^t\|F(u(s))-F(v(s))\|_Xds\le TL(2R_0)\|u-v\|_{C_TX}=\frac12\|u-v\|_{C_TX}.`, R`等長性・局所リプシッツ性（$\|u(s)\|,\|v(s)\|\le2R_0$）`]],
          },
          { text: R`最大値をとって $\|\Phi(u)-\Phi(v)\|_{C_TX}\le\frac12\|u-v\|_{C_TX}$。不動点定理より、$B$ の中に $u=\Phi(u)$ がただ一つ存在する。` },
          { text: R`<b>連続依存性。</b>$u=\Phi_{u_0}(u)$、$v=\Phi_{v_0}(v)$ とすると、$\|u(t)-v(t)\|_X\le\|U(t)(u_0-v_0)\|_X+\frac12\|u-v\|_{C_TX}$ なので $\|u-v\|_{C_TX}\le\|u_0-v_0\|_X+\frac12\|u-v\|_{C_TX}$。移項して $\|u-v\|_{C_TX}\le2\|u_0-v_0\|_X$。` },
        ],
      },
      { t: 'cor', id: 'cor-blowup', title: '爆発の判定法（延長可能性）', yomi: 'ばくはつのはんていほう', imp: 3, text: R`上の状況で、解を延長できる最大の時刻を $T^*\in(0,\infty]$ とする。$T^*<\infty$ ならば $\displaystyle\lim_{t\to T^*-0}\|u(t)\|_X=\infty$。対偶をとると、$\sup_{0\le t<T^*}\|u(t)\|_X<\infty$ が（たとえば保存則から）わかれば $T^*=\infty$、すなわち時間大域解が存在する。` },
      { t: 'proof', steps: [{ text: R`$T^*<\infty$ で、ある $R$ と $t_k\to T^*$ について $\|u(t_k)\|_X\le R$ とする。定理の存在時間 $T(R)=\frac1{2L(2R)}$ は $R$ だけで決まるので、時刻 $t_k$ を初期時刻として解き直すと（$U$ の群の性質により方程式は時間をずらしても同じ形）、解は $t_k+T(R)$ まで延長できる。$k$ を大きくとって $t_k+T(R)>T^*$ とすれば、$T^*$ の最大性に矛盾する。したがって、どんな $R>0$ に対しても、$T^*$ に十分近いすべての $t$ で $\|u(t)\|_X>R$ となる（そうでなければ $\|u(t_k)\|\le R$ となる列 $t_k\to T^*$ がとれる）。これは $\lim_{t\to T^*-0}\|u(t)\|_X=\infty$ を意味する。` }] },

      { t: 'h2', id: 'nls', text: 'NLS への適用' },
      { t: 'thm', id: 'thm-nls-lwp', title: 'Hˢ（s > n/2）での局所適切性', yomi: 'えぬえるえすのきょくしょてきせつせい', imp: 3, text: R`$s>\frac n2$、$p$ を $3$ 以上の奇数、$\lambda\in\mathbb{C}$ とする。(NLS) は $H^s(\mathbb{R}^n)$ で時間局所的に適切である。存在時間は $T\ge\dfrac c{|\lambda|\|u_0\|_{H^s}^{p-1}}$（$c>0$ は $n,s,p$ だけによる定数）ととれる。` },
      {
        t: 'proof',
        steps: [
          { text: R`$X=H^s$、$U(t)=e^{it\Delta}$ は[[nls#prop-schrod-unitary|等長]]で、強連続性はプランシュレルと優収束定理から従う（参考文献）。$F(u)=\lambda|u|^{p-1}u=\lambda u^{\frac{p+1}2}\overline u^{\frac{p-1}2}$ とする。` },
          { text: R`<b>局所リプシッツ性。</b>$a^m-b^m=(a-b)\sum_{j=0}^{m-1}a^jb^{m-1-j}$ のような因数分解により、$F(u)-F(v)$ は「$u-v$ または $\overline{u-v}$」と「$u,\overline u,v,\overline v$ の $p-1$ 個の積」の積の和で書ける。[[sobolev#thm-Hs-algebra|$H^s$ は環]]（$s>\frac n2$）で、$\|\overline w\|_{H^s}=\|w\|_{H^s}$ なので、$\|u\|,\|v\|\le R$ なら $\|F(u)-F(v)\|_{H^s}\le C|\lambda|R^{p-1}\|u-v\|_{H^s}$。すなわち $L(R)=C|\lambda|R^{p-1}$。` },
          { text: R`[[local-wellposedness#thm-abstract-lwp|抽象定理]]を $R_0=\|u_0\|_{H^s}$ で使うと、$T=\frac1{2L(2R_0)}=\frac1{2C|\lambda|2^{p-1}\|u_0\|_{H^s}^{p-1}}$ で解が存在し、一意性（$B$ の中）と連続依存性が成り立つ。$B$ の外の解との一意性は、二つの解の差に同じ評価を短い時間ごとに使えば示せる。` },
        ],
      },
      { t: 'rem', title: '研究ではどこまで下げるか', text: R`上の定理は、環の性質が使える $s>\frac n2$ という「ぜいたくな」条件の下での結果である。研究では、[[nls#thm-strichartz|ストリッカーツ評価]]を使って $X$ を $C([0,T];H^s)\cap L^q([0,T];W^{s,r})$ のような空間に取りかえ、より小さい $s$（たとえば $L^2$ や $H^1$、さらには臨界指数 $s_c$）で適切性を示す（たとえば $p<1+\frac4n$ で $L^2$ 適切性：Y. Tsutsumi (1987)）。どの空間で縮小写像を作るか、が研究の中心的な問題になる。` },
      { t: 'crux', text: R`局所適切性の証明は、第 12 章の[[ode-application|常微分方程式への応用]]と全く同じ構造をしている：積分方程式への書きかえ（デュアメル）、関数空間の閉球、時間を小さくとることによる縮小性。違いは、空間が $\mathbb{R}$ ではなく無限次元の $H^s$ になり、線形部分 $U(t)$ の性質（等長性・分散・ストリッカーツ評価）が加わることだけである。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'dissipative-nls',
    title: '消散型非線形シュレディンガー方程式と時間減衰',
    sub: '臨界べき・対数減衰のモデル・研究の現状',
    yomi: 'しょうさんがたひせんけいしゅれでぃんがーほうていしき',
    aliases: ['消散型NLS', 'しょうさんがた', '消散型非線形シュレディンガー方程式', '時間減衰', 'じかんげんすい', '減衰評価', 'げんすいひょうか', '漸近挙動', 'ぜんきんきょどう', '修正散乱', 'しゅうせいさんらん', '散乱', 'さんらん', 'Gevrey', 'ジュブレイ', '解析的平滑化', '星埜研究室', 'ほしのけんきゅうしつ'],
    kind: '用語',
    field: '研究への道',
    grade: '3年以降',
    importance: 3,
    prereq: ['nls', 'local-wellposedness', 'sobolev', 'power-series'],
    related: ['heat-equation'],
    notation: [
      R`$i\partial_tu+\Delta u=\lambda|u|^{p-1}u$、$\lambda\in\mathbb{C}$、$\operatorname{Im}\lambda<0$：消散型 NLS（符号の規約は論文によって異なる。$\frac12\Delta$ と書くものも多い）。`,
      R`$p=1+\frac2n$：臨界べき（長距離型と短距離型の境目）。$n=1$ なら $p=3$（3 次）、$n=2$ なら $p=2$。`,
      R`$\log t$：自然対数（$t\ge1$ で $\ge0$）。`,
      R`$J(t):=x+2it\nabla$：ガリレイ（擬等角）変換に関わる作用素。`,
    ],
    synopsis: R`非線形項の係数 $\lambda$ の虚部が負のとき、$L^2$ ノルムは時間とともに減少し（消散）、解は自由解より速く減衰しうる。臨界べき $p=1+\frac2n$ では、解の $L^\infty$ ノルムが $(t\log t)^{-n/2}$ の速さで減衰することが知られている。この記事では、その仕組みを常微分方程式のモデルで厳密に計算し、研究の現状（星埜研究室の研究テーマ）を紹介する。`,
    body: [
      { t: 'h2', id: 'setting', text: '方程式と消散' },
      { t: 'p', text: R`[[nls#prop-nls-mass|質量の変化の公式]]より、$\operatorname{Im}\lambda<0$ なら $\frac d{dt}\|u(t)\|_{L^2}^2=2\operatorname{Im}\lambda\int|u|^{p+1}\le0$ で、$L^2$ ノルムは単調に減少する。これが「消散型」と呼ばれる理由である。一方、自由解は[[nls#thm-dispersive|分散]]によって $\|U(t)u_0\|_{L^\infty}\lesssim t^{-n/2}$ で減衰する。消散と分散が組み合わさると、どのくらい速く減衰するか、が問題になる。` },
      { t: 'rem', title: 'なぜ臨界べき p = 1 + 2/n が重要か', text: R`[[nls#nonlinear|長距離型の注意]]のとおり、$|u|\approx t^{-n/2}$ なら非線形項の強さは $|u|^{p-1}\approx t^{-n(p-1)/2}$ で、$p=1+\frac2n$ ではちょうど $t^{-1}$ になる。$\int_1^\infty t^{-1}dt=\infty$ なので、非線形の効果は時間とともに消えずに、$\log t$ の速さで蓄積する。$\lambda$ の実部はこの蓄積を「位相のずれ」として、虚部は「振幅の減衰」として表す。` },

      { t: 'h2', id: 'model', text: '対数減衰の仕組み：常微分方程式モデル' },
      { t: 'p', text: R`臨界べきの解は、漸近的に $u(t,x)\approx(2it)^{-n/2}e^{i|x|^2/(4t)}w\bigl(t,\frac x{2t}\bigr)$ という形をとる（自由解の形に、ゆっくり変化する振幅 $w$ を掛けたもの）。振幅 $w(t,\xi)$ は、各 $\xi$ ごとに次の常微分方程式に従うと考えられる（定数は規約によって変わるので省略して $\lambda$ に含める）：
$$i\partial_tw=\frac\lambda t|w|^{2/n}w\qquad(t\ge1).\tag{M}$$
このモデルは厳密に解ける。` },
      { t: 'thm', id: 'thm-model-decay', title: 'モデル方程式の解の減衰', yomi: 'もでるほうていしき', imp: 3, text: R`$n\in\mathbb{N}$、$\lambda\in\mathbb{C}$、$w\in C^1([1,\infty);\mathbb{C})$ が (M) をみたし、$w(1)\ne0$ とする。
<ol><li>$\operatorname{Im}\lambda=0$ ならば $|w(t)|=|w(1)|$（振幅は一定）で、位相は $\log t$ に比例してずれる：$w(t)=w(1)\exp\bigl(-i\lambda|w(1)|^{2/n}\log t\bigr)$。</li><li>$\operatorname{Im}\lambda<0$ ならば
$$|w(t)|=\Bigl(|w(1)|^{-2/n}+\frac{2|\operatorname{Im}\lambda|}n\log t\Bigr)^{-n/2}\le\Bigl(\frac n{2|\operatorname{Im}\lambda|}\Bigr)^{n/2}(\log t)^{-n/2}\quad(t>1).$$
右辺は初期値 $w(1)$ の大きさによらない。</li></ol>` },
      {
        t: 'proof',
        steps: [
          {
            text: R`<b>振幅の方程式。</b>$W(t):=|w(t)|^2=w\overline w$ とおく。(M) より $w'=-\frac{i\lambda}t|w|^{2/n}w$ なので`,
            eqs: [[R`W'=2\operatorname{Re}(w'\overline w)=2\operatorname{Re}\Bigl(-\frac{i\lambda}t|w|^{2/n}|w|^2\Bigr)=\frac{2\operatorname{Im}\lambda}t\,W^{1+\frac1n}.`, R`$\operatorname{Re}(-i\lambda)=\operatorname{Im}\lambda$`]],
          },
          { text: R`<b>(1)</b> $\operatorname{Im}\lambda=0$ なら $W'=0$ で、[[mean-value#cor-const|平均値の定理の系]]より $W$ は定数。すると (M) は $w'=-\frac{i\lambda}t|w(1)|^{2/n}w$ という線形方程式になり、$\bigl(w(t)\exp(i\lambda|w(1)|^{2/n}\log t)\bigr)'=0$ から結論を得る（$(\log t)'=\frac1t$）。` },
          { text: R`<b>(2)</b> $\operatorname{Im}\lambda<0$ とする。まず $W(t)>0$（すべての $t\ge1$）を示す：$W'\le0$ なので $W$ は単調減少で $0\le W(t)\le W(1)$。$c:=2|\operatorname{Im}\lambda|W(1)^{1/n}$ とおくと、$t\ge1$ で $W'=-\frac{2|\operatorname{Im}\lambda|}tW^{\frac1n}W\ge-cW$。よって $\bigl(W(t)e^{c(t-1)}\bigr)'=(W'+cW)e^{c(t-1)}\ge0$ で、$W(t)e^{c(t-1)}\ge W(1)>0$、すなわち $W(t)>0$。` },
          {
            text: R`$W>0$ なので $W^{-1/n}$ は微分可能で`,
            eqs: [[R`\frac d{dt}W^{-1/n}=-\frac1nW^{-\frac1n-1}W'=-\frac1nW^{-\frac1n-1}\cdot\frac{2\operatorname{Im}\lambda}tW^{1+\frac1n}=\frac{2|\operatorname{Im}\lambda|}{n}\cdot\frac1t.`, R`[[power-series#prop-log-diff|べきの微分]]と合成関数の微分`]],
          },
          { text: R`$1$ から $t$ まで積分して（[[fundamental-theorem#thm-ftc2|基本定理]]）$W(t)^{-1/n}=W(1)^{-1/n}+\frac{2|\operatorname{Im}\lambda|}n\log t$。両辺を $-\frac n2$ 乗すると $|w(t)|=W^{1/2}$ の式を得る。不等式は $W(1)^{-1/n}>0$ を捨てて分母を小さくしたもの。` },
        ],
      },
      { t: 'fig', type: 'plot', preset: 'dissdecay', caption: R`$n=1$ のとき、自由解の減衰 $t^{-1/2}$（黒）と、モデルから予想される消散型の減衰 $(t(1+\log t))^{-1/2}$（赤の破線、$|w(1)|=1$、$2|\operatorname{Im}\lambda|=1$ の場合）。違いは対数の因子だけなのでゆっくりだが、確実に速く減衰する。` },
      { t: 'note', title: '言い換え', text: R`臨界べきでは、非線形項が「$\frac1t$ の強さ」で毎時刻はたらく。実部 $\operatorname{Re}\lambda$ はそれを位相の回転として受け流し（$\log t$ の位相補正＝修正散乱）、虚部 $\operatorname{Im}\lambda<0$ はそれを振幅の減少として受け取る。$\frac1t$ を積分すると $\log t$ なので、減少も対数的にゆっくり進む。結果として、もとの解は $t^{-n/2}\times(\log t)^{-n/2}=(t\log t)^{-n/2}$ で減衰する。` },

      { t: 'h2', id: 'results', text: '知られている結果' },
      { t: 'p', text: R`以下は、この分野の代表的な結果の概要である（主張の細部・仮定は原論文を参照のこと。書誌情報は検索で確認できた範囲で記しており、巻・頁が確認できなかったものはその旨を書いた）。` },
      { t: 'table', html: R`<table class="tbl"><tr><th>研究</th><th>内容（概要）</th></tr>
<tr><td>A. Shimomura（2006）</td><td>$n=1,2,3$、臨界べき $p=1+\frac2n$、$\operatorname{Im}\lambda<0$ の消散型 NLS について、小さい初期値の解の漸近形を求め、$\|u(t)\|_{L^\infty}$ が $(t\log t)^{-n/2}$ の速さで減衰することを示した。消散の効果が、漸近形の位相補正だけでなく減衰率にも現れることを明らかにした最初の結果とされる。</td></tr>
<tr><td>N. Kita, A. Shimomura, J. Differential Equations 242 (2007) 192–210</td><td>劣臨界（$p<1+\frac2n$ に近い場合）の消散型 NLS の時間減衰評価と漸近形。</td></tr>
<tr><td>N. Kita, A. Shimomura, J. Math. Soc. Japan 61 (2009)</td><td>1 次元で、強い消散条件（$\operatorname{Im}\lambda<0$ と $|\operatorname{Re}\lambda|\le\sqrt3|\operatorname{Im}\lambda|$ という形の条件）の下で、小ささを仮定しない（任意の大きさの）初期値に対する時間減衰と漸近挙動。</td></tr>
<tr><td>G. Hoshino（星埜岳）, J. Math. Phys.（2019）</td><td>分数階ソボレフ空間の枠組みでの消散型 NLS の漸近挙動。</td></tr>
<tr><td>G. Hoshino, Commun. Pure Appl. Anal.（2020, doi:10.3934/cpaa.2020044）</td><td>1 次元・大きい初期値の消散型 NLS について、重み付きソボレフ型の空間での時間大域解の存在、平滑化効果、漸近挙動。</td></tr>
<tr><td>G. Hoshino, NoDEA（2020）ほか</td><td>消散型 NLS の解の時空間ジュブレイ（Gevrey）級・解析的平滑化効果。</td></tr>
<tr><td>G. Hoshino, Partial Differ. Equ. Appl.（2025）</td><td>質量優臨界の場合の、漸近的に自由な解の存在（重み付きソボレフ空間の初期値）。</td></tr>
<tr><td>C. Li, Y. Nishii, Y. Sagawa, H. Sunagawa（2023, arXiv:2303.17801）</td><td>消散型非線形項をもつシュレディンガー方程式についての最近の進展のサーベイ。</td></tr></table>`, caption: R`代表的な研究の一覧（概要）。正確な主張・仮定・巻頁は原論文で確認すること。` },
      { t: 'rem', title: '符号の規約', text: R`論文によって方程式が $i\partial_tu+\frac12\Delta u=\lambda|u|^{p-1}u$ や $i\partial_tu+\Delta u=\lambda|u|^{p-1}u$ と書かれ、消散の条件が $\operatorname{Im}\lambda<0$ または $\operatorname{Im}\lambda>0$ になることがある。論文を読むときは、最初に質量の変化の公式を自分で計算して、どちらの符号が消散になるかを確認するとよい（[[nls#prop-nls-mass|計算はここ]]）。` },

      { t: 'h2', id: 'smoothing', text: '平滑化効果と作用素 J(t)' },
      { t: 'prop', id: 'prop-J', title: '重みが微分に変わる', yomi: 'じぇいさようそ', imp: 2, text: R`$n=1$、$U(t)=e^{it\partial_x^2}$ とする。なめらかで急減少する $f$ について
$$U(t)\,x\,U(-t)f=(x+2it\partial_x)f=:J(t)f,\qquad J(t)f=M(t)\,(2it\partial_x)\,\bigl(M(-t)f\bigr),\quad M(t):=e^{ix^2/(4t)}\ (t\ne0).$$` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>第 1 式。</b>この章の規約 $\hat f(\xi)=\int e^{-ix\xi}f\,dx$ では、$\widehat{xf}=i\partial_\xi\hat f$（$\partial_\xi\hat f=\int(-ix)e^{-ix\xi}f\,dx$ より）、$\widehat{\partial_xf}=i\xi\hat f$、$\widehat{U(t)f}=e^{-it\xi^2}\hat f$ である。$\partial_\xi(e^{-it\xi^2}\hat f)=e^{-it\xi^2}(\partial_\xi\hat f-2it\xi\hat f)$ より $\widehat{xU(t)f}=e^{-it\xi^2}(\widehat{xf}+2t\xi\hat f)$、また $\widehat{2it\partial_xU(t)f}=-2t\xi e^{-it\xi^2}\hat f$。足すと $e^{-it\xi^2}\widehat{xf}$、すなわち $(x+2it\partial_x)U(t)f=U(t)(xf)$。$f$ を $U(-t)f$ に置きかえれば $(x+2it\partial_x)f=U(t)\,x\,U(-t)f$。` },
          { text: R`<b>第 2 式。</b>$\partial_x\bigl(e^{-ix^2/(4t)}f\bigr)=e^{-ix^2/(4t)}\bigl(\partial_xf-\frac{ix}{2t}f\bigr)$ なので、$M(t)(2it\partial_x)(M(-t)f)=2it\partial_xf+2it\cdot\bigl(-\frac{ix}{2t}\bigr)f=2it\partial_xf+xf$。` },
        ],
      },
      { t: 'note', title: '意味：初期値の重みが解のなめらかさになる', text: R`$u(t)=U(t)u_0$ なら $J(t)u(t)=U(t)(xu_0)$ なので $\|J(t)u(t)\|_{L^2}=\|xu_0\|_{L^2}$。第 2 式より $J(t)=M(t)(2it\partial_x)M(-t)$ なので、$t\ne0$ では「$M(-t)u(t)$ の導関数が $L^2$ に入る」ことになる。初期値の空間での<em>重み</em>（$x$ を掛けて $L^2$）が、時刻 $t\ne0$ での<em>なめらかさ</em>に変わる。重みとして $e^{|x|}$ のような指数関数を許すと解析的な平滑化が、$e^{|x|^{1/\sigma}}$ 型の重みからジュブレイ級の平滑化が得られる、というのが平滑化効果の研究の基本的な考え方である。非線形方程式では、$J$ と非線形項の相性（ゲージ不変性）がカギになる。` },
      { t: 'crux', text: R`この章で学んだ道具——$L^p$・$H^s$・重み付き空間、フーリエ変換、ユニタリ群 $e^{it\Delta}$ と分散評価、デュアメルの公式、縮小写像の原理、質量の計算——は、すべて消散型 NLS の研究で日常的に使われる。研究の論文を読むときは、「どの空間で」「どの評価を使って」「どの写像を縮小写像にしているか」をまず探すとよい。` },
      { t: 'qa', q: R`研究を始める前に、まず何を固めておくべき？`, a: R`(1) 第 11〜14 章の関数解析（特に完備性・不動点定理・作用素ノルム）、(2) フーリエ変換とプランシュレル、$H^s$ の定義と埋め込み、(3) ヘルダー・ヤング・コーシー＝シュワルツなどの不等式を自在に使えること、(4) 常微分方程式モデル（この記事の (M)）のような計算を自分で再現できること。そのうえで、サーベイ論文（Li–Nishii–Sagawa–Sunagawa）と、研究室の論文の序論を読むのがよい入口になる。` },
    ],
  });
})();
