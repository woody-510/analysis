/* 第 8 章（続き）：多変数関数の微分 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  const NOTE_U = [
    R`$U\subset\mathbb{R}^n$：開集合（[[open-closed#def-open|各点のまわりに球がとれる集合]]）。$a\in U$。$f:U\to\mathbb{R}$。`,
    R`$e_j=(0,\dots,0,1,0,\dots,0)$：第 $j$ 成分だけ $1$ の単位ベクトル。$h=(h_1,\dots,h_n)\in\mathbb{R}^n$：変位。$\|h\|$：ユークリッドノルム。`,
    R`$\|A\|_F:=\bigl(\sum_{i,j}a_{ij}^2\bigr)^{1/2}$：行列の成分の 2 乗和のノルム。$\|Ah\|\le\|A\|_F\|h\|$（[[operator-norm#ex-opnorm-matrix|行列の作用素ノルム]]と同じコーシー＝シュワルツの計算）。`,
  ];

  /* ------------------------------------------------------------ */
  A.push({
    id: 'partial-derivative',
    title: '偏微分と方向微分',
    sub: '偏微分可能でも連続とは限らない',
    yomi: 'へんびぶん',
    aliases: ['偏微分', 'へんびぶん', '偏導関数', 'へんどうかんすう', '方向微分', 'ほうこうびぶん', '偏微分係数'],
    kind: '用語',
    field: '多変数',
    grade: '2年前期',
    importance: 3,
    prereq: ['euclidean-space', 'differentiability', 'metric-continuity'],
    related: ['total-derivative', 'multivar-taylor'],
    notation: NOTE_U.concat([R`$\partial_jf=\frac{\partial f}{\partial x_j}=f_{x_j}$：第 $j$ 変数についての偏導関数。$n=2$ では $(x,y)$ と書き $\partial_xf$, $\partial_yf$。`]),
    synopsis: R`多変数関数を、一つの変数だけを動かし他を固定して微分したものが偏微分である。計算は 1 変数の微分と同じだが、偏微分がすべて存在しても関数が連続とは限らない。多変数の「本当の微分」は、次の記事の全微分である。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-partial', title: '偏微分', yomi: 'へんびぶん', imp: 3, text: R`$f:U\to\mathbb{R}$、$a\in U$、$j\in\{1,\dots,n\}$ とする。極限
$$\partial_jf(a):=\lim_{t\to0}\frac{f(a+te_j)-f(a)}t$$
が存在するとき、$f$ は $a$ で第 $j$ 変数について<b class="term">偏微分可能</b>であるといい、その値を<b class="term">偏微分係数</b>という。（$U$ は開集合なので、十分小さい $t$ で $a+te_j\in U$。）` },
      { t: 'def', id: 'def-directional', title: '方向微分', yomi: 'ほうこうびぶん', imp: 2, text: R`$v\in\mathbb{R}^n$ について $D_vf(a):=\displaystyle\lim_{t\to0}\frac{f(a+tv)-f(a)}t$ が存在するとき、これを $v$ 方向の<b class="term">方向微分</b>という。$D_{e_j}f=\partial_jf$。` },
      { t: 'ex', id: 'ex-partial', title: '計算例', text: R`$f(x,y)=x^2y+\sin(xy)$ とすると、$y$ を定数とみて $x$ で微分して $\partial_xf=2xy+y\cos(xy)$、$x$ を定数とみて $\partial_yf=x^2+x\cos(xy)$。どちらも 1 変数の微分公式（[[derivative-rules|微分の公式]]）だけで計算できる。` },

      { t: 'h2', id: 'counter', text: '偏微分可能でも連続とは限らない' },
      { t: 'ex', id: 'ex-partial-discont', title: 'xy/(x² + y²)', text: R`$f(x,y):=\dfrac{xy}{x^2+y^2}$（$(x,y)\ne(0,0)$）、$f(0,0):=0$ とする。
<ul><li><b>偏微分は存在する：</b>$f(t,0)=0$ がすべての $t$ で成り立つので $\partial_xf(0,0)=\lim_{t\to0}\frac{0-0}t=0$。同様に $\partial_yf(0,0)=0$。</li><li><b>連続でない：</b>$f(t,t)=\frac{t^2}{2t^2}=\frac12$（$t\ne0$）なので、点列 $(\frac1k,\frac1k)\to(0,0)$ に対して $f(\frac1k,\frac1k)=\frac12\not\to0=f(0,0)$。[[metric-continuity#thm-cont-seq-metric|点列による特徴づけ]]より $(0,0)$ で連続でない。</li></ul>座標軸の方向だけを見る偏微分では、斜めの方向からの近づき方を捉えられないのである。` },
      { t: 'rem', title: '方向微分がすべて存在しても不十分', text: R`$f(x,y):=\dfrac{x^2y}{x^4+y^2}$（$(x,y)\ne0$）、$f(0,0)=0$ は、すべての方向 $v=(v_1,v_2)$ で方向微分が存在する（$v_2\ne0$ なら $\frac{f(tv)}t=\frac{v_1^2v_2}{t^2v_1^4+v_2^2}\to\frac{v_1^2}{v_2}$、$v_2=0$ なら $0$）が、放物線 $y=x^2$ に沿って $f(t,t^2)=\frac12$ なので連続でない。直線だけでなく、あらゆる近づき方を同時に制御する概念が必要になる。` },
      { t: 'qa', q: R`それでは偏微分は役に立たない？`, a: R`計算の道具としては非常に役に立つ。[[total-derivative|全微分]]可能な関数では、全微分は偏微分を並べたもの（勾配・ヤコビ行列）になり、しかも「偏導関数が連続ならば全微分可能」という使いやすい十分条件がある。理論は全微分で、計算は偏微分で、という分担である。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'total-derivative',
    title: '全微分と連鎖律',
    sub: '一次近似・勾配・ヤコビ行列',
    yomi: 'ぜんびぶん',
    aliases: ['全微分', 'ぜんびぶん', '全微分可能', 'フレシェ微分', 'ふれしぇ', '勾配', 'こうばい', 'グラディエント', 'ヤコビ行列', 'やこびぎょうれつ', '連鎖律', 'れんさりつ', '多変数の合成関数の微分', 'C1級'],
    kind: '定理',
    field: '多変数',
    grade: '2年前期',
    importance: 3,
    prereq: ['partial-derivative', 'differentiability', 'mean-value'],
    related: ['multivar-taylor', 'operator-norm'],
    notation: NOTE_U.concat([
      R`$f:U\to\mathbb{R}^m$ のとき、成分を $f=(f_1,\dots,f_m)$ と書く。$Df(a)$：$m\times n$ 行列（ヤコビ行列）。$m=1$ なら $\nabla f(a)=(\partial_1f(a),\dots,\partial_nf(a))$（勾配）。`,
      R`$\rho(h)$：「$h\to0$ で $0$ に近づく」誤差の項（[[differentiability#thm-rho|1 変数の ρ による特徴づけ]]と同じ役割）。`,
    ]),
    synopsis: R`$f$ が点 $a$ で全微分可能とは、$a$ の近くで $f(a+h)\approx f(a)+Ah$（$A$ は行列）と一次近似でき、その誤差が $\|h\|$ より速く小さくなることである。全微分可能なら連続で、行列 $A$ は偏微分を並べたヤコビ行列になる。偏導関数が連続なら全微分可能であり、合成関数のヤコビ行列は各ヤコビ行列の積になる（連鎖律）。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-total', title: '全微分可能', yomi: 'ぜんびぶんかのう', imp: 3, text: R`$U\subset\mathbb{R}^n$ を開集合、$f:U\to\mathbb{R}^m$、$a\in U$ とする。$f$ が $a$ で<b class="term">全微分可能</b>（微分可能）であるとは、ある $m\times n$ 行列 $A$ が存在して
$$\lim_{h\to0}\frac{\|f(a+h)-f(a)-Ah\|}{\|h\|}=0$$
が成り立つことをいう（$h\in\mathbb{R}^n\setminus\{0\}$、$a+h\in U$）。このとき $A$ を $f$ の $a$ での<b class="term">微分</b>（ヤコビ行列）といい $Df(a)$ と書く。` },
      { t: 'note', title: 'ρ を使った言い換え', text: R`$\rho(h):=\frac{f(a+h)-f(a)-Ah}{\|h\|}$（$h\ne0$）、$\rho(0):=0$ とおけば、全微分可能性は「$f(a+h)=f(a)+Ah+\|h\|\rho(h)$ で、$\rho$ は $h=0$ で連続（$\rho(h)\to0$）」と言いかえられる。1 変数では $x-a$ で割れたが、多変数では $h$ がベクトルなので $h$ で割れない。そこで長さ $\|h\|$ で割る。` },
      { t: 'prop', id: 'prop-total-basic', title: '全微分可能なら連続で、微分は偏微分を並べたもの', yomi: 'ぜんびぶんのきほんせいしつ', imp: 3, text: R`$f$ が $a$ で全微分可能ならば、(1) $f$ は $a$ で連続であり、(2) 各成分 $f_i$ は $a$ で各変数について偏微分可能で、$Df(a)=\bigl(\partial_jf_i(a)\bigr)_{1\le i\le m,\,1\le j\le n}$。特に $Df(a)$ はただ一つに決まる。` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $\|f(a+h)-f(a)\|\le\|Ah\|+\|h\|\|\rho(h)\|\le(\|A\|_F+\|\rho(h)\|)\|h\|\to0$（$h\to0$）。` },
          { text: R`(2) $h=te_j$（$t\ne0$）とすると $\|h\|=|t|$、$Ah=tAe_j$（$A$ の第 $j$ 列の $t$ 倍）なので、$\frac{f(a+te_j)-f(a)}t=Ae_j+\frac{|t|}t\rho(te_j)$。右辺の第 2 項は大きさ $\|\rho(te_j)\|\to0$ なので、$t\to0$ で左辺は $Ae_j$ に収束する。成分ごとに見ると $\partial_jf_i(a)=a_{ij}$。` },
        ],
      },
      { t: 'ex', id: 'ex-total-counter', title: '前の記事の例は全微分可能でない', text: R`[[partial-derivative#ex-partial-discont|$\frac{xy}{x^2+y^2}$]] は $(0,0)$ で連続でないので、命題 (1) の対偶により全微分可能でない。偏微分が存在しても全微分可能とは限らない。` },

      { t: 'h2', id: 'c1', text: 'C¹ 級なら全微分可能' },
      { t: 'thm', id: 'thm-c1-diff', title: '偏導関数が連続なら全微分可能', yomi: 'しーいちきゅう', imp: 3, text: R`$f:U\to\mathbb{R}$ が $U$ 上で各変数について偏微分可能で、偏導関数 $\partial_1f,\dots,\partial_nf$ が $a\in U$ で連続ならば、$f$ は $a$ で全微分可能で $Df(a)=\nabla f(a)$。（$U$ 上で偏導関数がすべて連続な関数を <b class="term">$C^1$ 級</b>といい、$C^1(U)$ と書く。）` },
      { t: 'strategy', text: R`$a$ から $a+h$ へ、座標軸に平行な線分をつないで進む（$n$ 本の線分）。各線分では一つの変数しか動かないので、1 変数の[[mean-value#thm-mvt|平均値の定理]]が使える。偏導関数の連続性で、途中の点での偏微分を $a$ での偏微分に取りかえる。` },
      {
        t: 'proof',
        steps: [
          { text: R`$U$ は開集合なので $N(a;r)\subset U$ となる $r>0$ がある。$0<\|h\|<r$ とし、$p_0:=a$、$p_k:=a+\sum_{j=1}^kh_je_j$（$k=1,\dots,n$）とおく。$p_n=a+h$ で、各 $p_k$ および $p_{k-1}$ と $p_k$ を結ぶ線分上の点は $a$ からの距離が $\|h\|$ 以下なので $N(a;r)$ に含まれる。` },
          {
            text: R`$p_{k-1}$ から $p_k$ へは第 $k$ 変数だけが $h_k$ だけ動く。$\varphi_k(t):=f(p_{k-1}+te_k)$（$t$ は $0$ と $h_k$ の間）は微分可能で $\varphi_k'(t)=\partial_kf(p_{k-1}+te_k)$。平均値の定理より、$p_{k-1}$ と $p_k$ を結ぶ線分上のある点 $\xi_k$ で`,
            eqs: [[R`f(p_k)-f(p_{k-1})=\partial_kf(\xi_k)\,h_k\qquad(h_k=0\text{ なら両辺 }0).`, R`1 変数の平均値の定理`]],
          },
          {
            text: R`足し合わせると望遠鏡和で $f(a+h)-f(a)=\sum_k\partial_kf(\xi_k)h_k$。よって`,
            eqs: [[R`\Bigl|f(a+h)-f(a)-\sum_{k=1}^n\partial_kf(a)h_k\Bigr|\le\sum_{k=1}^n|\partial_kf(\xi_k)-\partial_kf(a)|\,|h_k|\le\|h\|\sum_{k=1}^n|\partial_kf(\xi_k)-\partial_kf(a)|.`, R`三角不等式・$|h_k|\le\|h\|$`]],
          },
          { text: R`$\|\xi_k-a\|\le\|h\|\to0$ と $\partial_kf$ の $a$ での連続性より、右辺を $\|h\|$ で割ったものは $0$ に収束する。よって全微分可能で、行列は $\nabla f(a)$。` },
        ],
      },

      { t: 'h2', id: 'chain', text: '連鎖律' },
      { t: 'thm', id: 'thm-chain-multi', title: '連鎖律（合成関数の微分）', yomi: 'れんさりつ', imp: 3, text: R`$U\subset\mathbb{R}^n$, $V\subset\mathbb{R}^m$ を開集合、$g:U\to V$ が $a\in U$ で全微分可能、$f:V\to\mathbb{R}^l$ が $b:=g(a)$ で全微分可能とする。このとき $f\circ g$ は $a$ で全微分可能で
$$D(f\circ g)(a)=Df(b)\,Dg(a)\qquad(l\times m\text{ 行列と }m\times n\text{ 行列の積}).$$` },
      {
        t: 'proof',
        steps: [
          { text: R`$B:=Dg(a)$、$C:=Df(b)$ とし、$g(a+h)=b+Bh+\|h\|\rho_1(h)$、$f(b+k)=f(b)+Ck+\|k\|\rho_2(k)$（$\rho_1(h)\to0$, $\rho_2(k)\to0$、$\rho_1(0)=0$, $\rho_2(0)=0$）と書く。` },
          {
            text: R`$k:=g(a+h)-b=Bh+\|h\|\rho_1(h)$ とおくと、`,
            eqs: [
              [R`f(g(a+h))=f(b)+Ck+\|k\|\rho_2(k)=f(b)+CBh+\|h\|C\rho_1(h)+\|k\|\rho_2(k).`, R`$f$ の展開に $k$ を代入`],
              [R`\|k\|\le\bigl(\|B\|_F+\|\rho_1(h)\|\bigr)\|h\|.`, R`三角不等式・$\|Bh\|\le\|B\|_F\|h\|$`],
            ],
          },
          { text: R`したがって、$h\ne0$ について $\dfrac{\|f(g(a+h))-f(b)-CBh\|}{\|h\|}\le\|C\|_F\|\rho_1(h)\|+(\|B\|_F+\|\rho_1(h)\|)\|\rho_2(k)\|$。$h\to0$ のとき $\rho_1(h)\to0$、また $k\to0$（上の不等式）なので $\rho_2(k)\to0$（$\rho_2$ は $0$ で連続、$k=0$ でも $\rho_2(0)=0$）。よって右辺は $0$ に収束し、$D(f\circ g)(a)=CB$。` },
        ],
      },
      { t: 'cor', id: 'cor-chain-curve', title: '曲線に沿った微分', yomi: 'きょくせんにそったびぶん', imp: 3, text: R`$f\in C^1(U)$、$x:(\alpha,\beta)\to U$ を微分可能な曲線とすると、$\dfrac d{dt}f(x(t))=\nabla f(x(t))\cdot x'(t)=\sum_{j=1}^n\partial_jf(x(t))\,x_j'(t)$。特に $D_vf(a)=\nabla f(a)\cdot v$。` },
      { t: 'proof', steps: [{ text: R`$C^1$ 級なので[[total-derivative#thm-c1-diff|全微分可能]]で $Df=\nabla f$（$1\times n$ 行列）。曲線の微分は $n\times1$ 行列 $x'(t)$。連鎖律より積は内積 $\nabla f\cdot x'$。$x(t)=a+tv$ とすれば方向微分。` }] },
      { t: 'cor', id: 'cor-mvt-multi', title: '多変数の平均値の定理', yomi: 'たへんすうのへいきんちのていり', imp: 2, text: R`$f\in C^1(U)$ で、$a,b\in U$ を結ぶ線分が $U$ に含まれるならば、線分上のある点 $c$ で $f(b)-f(a)=\nabla f(c)\cdot(b-a)$。` },
      { t: 'proof', steps: [{ text: R`$\varphi(t):=f(a+t(b-a))$（$t\in[0,1]$）は、系より微分可能で $\varphi'(t)=\nabla f(a+t(b-a))\cdot(b-a)$。1 変数の平均値の定理より $\varphi(1)-\varphi(0)=\varphi'(\tau)$ となる $\tau\in(0,1)$ があり、$c:=a+\tau(b-a)$。` }] },
      { t: 'note', title: '勾配の意味', text: R`$\|v\|=1$ の方向の方向微分 $D_vf(a)=\nabla f(a)\cdot v$ は、[[euclidean-space#thm-cs-rn|コーシー＝シュワルツ]]より $\|\nabla f(a)\|$ 以下で、等号は $v=\frac{\nabla f(a)}{\|\nabla f(a)\|}$ のとき。勾配は「$f$ が最も急に増える方向」を指し、その大きさが最大の増加率である。` },
      { t: 'qa', q: R`関数解析でも「微分」を考える？`, a: R`考える。全微分の定義は $\mathbb{R}^n$ をバナッハ空間 $X,Y$ に、行列を[[operator-norm|有界線形作用素]] $A\in L(X,Y)$ に置きかえても意味をもつ（フレシェ微分）。非線形シュレディンガー方程式の解が初期値に「なめらかに」依存すること（初期値写像の微分可能性）は、この意味で述べられる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-total-1', level: 1, title: '基本', text: R`$f(x,y)=e^{x}\sin y$、$x(t)=t^2$、$y(t)=t$ のとき、$\frac d{dt}f(x(t),y(t))$ を連鎖律で計算し、直接の計算と比べよ。`, hint: R`$\nabla f=(e^x\sin y,\ e^x\cos y)$、$x'=2t$、$y'=1$。`, answer: R`連鎖律：$e^{t^2}\sin t\cdot2t+e^{t^2}\cos t\cdot1=e^{t^2}(2t\sin t+\cos t)$。直接：$\frac d{dt}(e^{t^2}\sin t)=2te^{t^2}\sin t+e^{t^2}\cos t$。一致する。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'multivar-taylor',
    title: '高階偏導関数と極値',
    sub: 'シュワルツの定理・2 次のテイラー展開・ヘッセ行列',
    yomi: 'こうかいへんどうかんすうときょくち',
    aliases: ['シュワルツの定理', 'しゅわるつのていり', 'クレローの定理', '偏微分の順序交換', 'ヘッセ行列', 'へっせぎょうれつ', 'ヘシアン', '多変数のテイラー展開', '極値', 'きょくち', '鞍点', 'あんてん', '停留点', 'ていりゅうてん', '正定値', 'せいていち'],
    kind: '定理',
    field: '多変数',
    grade: '2年前期',
    importance: 3,
    prereq: ['total-derivative', 'taylor', 'compactness'],
    related: ['partial-derivative'],
    notation: NOTE_U.concat([
      R`$\partial_i\partial_jf:=\partial_i(\partial_jf)$（先に $j$、次に $i$ で微分）。$n=2$ では $f_{xy}=\partial_y\partial_xf$ と書く本もあり、順番の約束は本によって違う。`,
      R`$C^2(U)$：2 階までの偏導関数がすべて存在して連続な関数全体。`,
      R`$H(a)=\bigl(\partial_i\partial_jf(a)\bigr)_{i,j}$：ヘッセ行列。$h^THh=\sum_{i,j}\partial_i\partial_jf\,h_ih_j$（2 次形式）。`,
      R`$H$ が<b>正定値</b> $:\Longleftrightarrow$ すべての $v\ne0$ で $v^THv>0$。`,
    ]),
    synopsis: R`$C^2$ 級の関数では、偏微分の順番を入れかえてよい（シュワルツの定理）。1 変数のテイラーの定理を線分に沿って使うと、2 次のテイラー展開 $f(a+h)=f(a)+\nabla f(a)\cdot h+\frac12h^TH(\xi)h$ が得られる。勾配が $0$ の点で、ヘッセ行列が正定値なら極小、負定値なら極大である。2 変数なら判定は行列式の符号で書ける。`,
    body: [
      { t: 'h2', id: 'schwarz', text: 'シュワルツの定理' },
      { t: 'thm', id: 'thm-schwarz', title: 'シュワルツの定理（偏微分の順序交換）', yomi: 'しゅわるつのていり', imp: 3, text: R`$U\subset\mathbb{R}^2$ を開集合、$f:U\to\mathbb{R}$ とし、$\partial_xf,\partial_yf,\partial_y\partial_xf,\partial_x\partial_yf$ が $U$ 上に存在して $(a,b)\in U$ で連続とする。このとき $\partial_y\partial_xf(a,b)=\partial_x\partial_yf(a,b)$。特に $f\in C^2(U)$ ならば偏微分の順序は交換できる（$n$ 変数でも、2 変数ずつ同じ議論をすればよい）。` },
      {
        t: 'proof',
        steps: [
          { text: R`$(a,b)$ を中心とする正方形 $[a-r,a+r]\times[b-r,b+r]\subset U$ をとり、$0<|h|<r$ について $\Delta(h):=f(a+h,b+h)-f(a+h,b)-f(a,b+h)+f(a,b)$ とおく。` },
          { text: R`<b>$x$ から先に。</b>$\varphi(x):=f(x,b+h)-f(x,b)$ とおくと $\Delta(h)=\varphi(a+h)-\varphi(a)$。平均値の定理より $\Delta(h)=\varphi'(\xi)h=\bigl(\partial_xf(\xi,b+h)-\partial_xf(\xi,b)\bigr)h$（$\xi$ は $a$ と $a+h$ の間）。さらに $y\mapsto\partial_xf(\xi,y)$ に平均値の定理を使って $\Delta(h)=\partial_y\partial_xf(\xi,\eta)h^2$（$\eta$ は $b$ と $b+h$ の間）。` },
          { text: R`<b>$y$ から先に。</b>$\psi(y):=f(a+h,y)-f(a,y)$ とおくと $\Delta(h)=\psi(b+h)-\psi(b)$ で、同様に $\Delta(h)=\partial_x\partial_yf(\xi',\eta')h^2$（$\xi',\eta'$ はそれぞれ $a$ と $a+h$、$b$ と $b+h$ の間）。` },
          { text: R`よって $\partial_y\partial_xf(\xi,\eta)=\frac{\Delta(h)}{h^2}=\partial_x\partial_yf(\xi',\eta')$。$h\to0$ のとき $(\xi,\eta),(\xi',\eta')\to(a,b)$ で、二つの 2 階偏導関数は $(a,b)$ で連続なので、両辺の極限をとって結論を得る。` },
        ],
      },
      { t: 'ex', id: 'ex-schwarz-counter', title: '連続性がないと順序を交換できない', text: R`$f(x,y):=\dfrac{xy(x^2-y^2)}{x^2+y^2}$（$(x,y)\ne0$）、$f(0,0)=0$ とする。$y\ne0$ について $\partial_xf(0,y)=\lim_{h\to0}\frac{f(h,y)}h=\lim\frac{y(h^2-y^2)}{h^2+y^2}=-y$、$y=0$ でも $\partial_xf(0,0)=0=-0$。よって $\partial_y\partial_xf(0,0)=\frac d{dy}(-y)=-1$。同様に $\partial_yf(x,0)=x$ から $\partial_x\partial_yf(0,0)=1$。二つは等しくない（2 階偏導関数が原点で連続でない）。` },

      { t: 'h2', id: 'taylor', text: '2 次のテイラー展開' },
      { t: 'thm', id: 'thm-taylor2', title: '2 次のテイラー展開', yomi: 'にじのていらーてんかい', imp: 3, text: R`$f\in C^2(U)$、$a\in U$、$h\in\mathbb{R}^n$ で、$a$ と $a+h$ を結ぶ線分が $U$ に含まれるとする。線分上のある点 $\xi$ で
$$f(a+h)=f(a)+\nabla f(a)\cdot h+\frac12h^TH(\xi)h.$$` },
      { t: 'proof', steps: [{ text: R`$\varphi(t):=f(a+th)$（$t\in[0,1]$ を含む開区間）とおく。[[total-derivative#cor-chain-curve|曲線に沿った微分]]より $\varphi'(t)=\sum_j\partial_jf(a+th)h_j$。各 $\partial_jf$ も $C^1$ 級なので、もう一度使って $\varphi''(t)=\sum_j\sum_i\partial_i\partial_jf(a+th)h_ih_j=h^TH(a+th)h$。1 変数の[[taylor#thm-taylor|テイラーの定理]]（$n=1$）より $\varphi(1)=\varphi(0)+\varphi'(0)+\frac12\varphi''(\tau)$ となる $\tau\in(0,1)$ があり、$\xi:=a+\tau h$。` }] },

      { t: 'h2', id: 'extrema', text: '極値の判定' },
      { t: 'thm', id: 'thm-extrema', title: 'ヘッセ行列による極値の判定', yomi: 'きょくちのはんてい', imp: 3, text: R`$f\in C^2(U)$、$a\in U$ で $\nabla f(a)=0$ とする。$H(a)$ が正定値ならば、$f$ は $a$ で狭義の極小値をとる（ある $\delta>0$ で、$0<\|x-a\|<\delta$ なら $f(x)>f(a)$）。$H(a)$ が負定値（$-H(a)$ が正定値）ならば狭義の極大値をとる。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>ステップ 1：一様な正値性。</b>単位球面 $S=\{v\mid\|v\|=1\}$ は有界閉集合なので[[compactness#thm-heine-borel|点列コンパクト]]で、連続関数 $v\mapsto v^TH(a)v$ は $S$ 上で最小値 $\mu$ をとる（[[compactness#thm-compact-max|最大値・最小値の定理]]）。正定値なので $\mu>0$。斉次性より、すべての $v$ で $v^TH(a)v\ge\mu\|v\|^2$。` },
          { text: R`<b>ステップ 2：近くでも正値。</b>2 階偏導関数は連続なので、ある $\delta>0$ があって $\|\xi-a\|<\delta$ なら $\xi\in U$ かつ $\|H(\xi)-H(a)\|_F<\frac\mu2$。このとき $|v^T(H(\xi)-H(a))v|\le\|v\|\,\|(H(\xi)-H(a))v\|\le\|H(\xi)-H(a)\|_F\|v\|^2<\frac\mu2\|v\|^2$（$v\ne0$）なので、$v^TH(\xi)v>\frac\mu2\|v\|^2$。` },
          { text: R`<b>ステップ 3：結論。</b>$0<\|h\|<\delta$ なら、線分 $[a,a+h]$ は $N(a;\delta)$（凸）に含まれ、[[multivar-taylor#thm-taylor2|2 次のテイラー展開]]と $\nabla f(a)=0$ より $f(a+h)-f(a)=\frac12h^TH(\xi)h>\frac\mu4\|h\|^2>0$。極大は $-f$ に同じ議論を使う。` },
        ],
      },
      { t: 'prop', id: 'prop-2x2', title: '2 変数の判定法', yomi: 'にへんすうのはんていほう', imp: 3, text: R`$n=2$、$H=\begin{pmatrix}A&B\\B&C\end{pmatrix}$（$A=\partial_x^2f$, $B=\partial_x\partial_yf$, $C=\partial_y^2f$ の $a$ での値）とする。$\nabla f(a)=0$ のとき
<ol><li>$AC-B^2>0$ かつ $A>0$ ならば極小、$AC-B^2>0$ かつ $A<0$ ならば極大。</li><li>$AC-B^2<0$ ならば極値でない（鞍点）。</li></ol>（$AC-B^2=0$ のときは、この判定法では決まらない。）` },
      {
        t: 'proof',
        steps: [
          {
            text: R`$v=(x,y)$ について、$A\ne0$ なら平方完成して`,
            eqs: [[R`v^THv=Ax^2+2Bxy+Cy^2=A\Bigl(x+\frac BAy\Bigr)^2+\frac{AC-B^2}Ay^2.`, R`平方完成`]],
          },
          { text: R`(1) $AC-B^2>0$、$A>0$ なら両項とも $\ge0$ で、和が $0$ なら $y=0$ かつ $x=0$。よって正定値で、[[multivar-taylor#thm-extrema|定理]]より極小。$A<0$ なら負定値で極大。（$AC-B^2>0$ なら $AC>B^2\ge0$ なので $A\ne0$。）` },
          { text: R`(2) $AC-B^2<0$ とする。<b>異符号の方向がある：</b>$A\ne0$ なら $v=(1,0)$ で $v^THv=A$、$v=(-B,A)$ で $v^THv=A(AC-B^2)$ となり、両者は異符号。$A=0$ なら $-B^2<0$ より $B\ne0$ で、$v=(1,t)$ について $v^THv=t(2B+Ct)$。$0<|t|<\frac{|B|}{|C|+1}$ なら $2B+Ct$ は $B$ と同符号なので、$t$ の符号を変えれば $v^THv$ は正にも負にもなる。<b>極値でない：</b>$v^TH(a)v>0$ となる $v$ をとると、$H$ の連続性より $\xi$ が $a$ に近ければ $v^TH(\xi)v>0$（定理の証明のステップ 2 と同じ評価）で、2 次のテイラー展開より十分小さい $s\ne0$ で $f(a+sv)-f(a)=\frac{s^2}2v^TH(\xi_s)v>0$。同様に $v^TH(a)v<0$ の方向では $f(a+sv)<f(a)$。どんな近くにも $f(a)$ より大きい点と小さい点があるので、極値ではない。` },
        ],
      },
      { t: 'ex', id: 'ex-extrema', title: '例', text: R`$f(x,y)=x^2+xy+y^2-3x$。$\nabla f=(2x+y-3,\ x+2y)=0$ を解いて $(x,y)=(2,-1)$。$H=\begin{pmatrix}2&1\\1&2\end{pmatrix}$、$AC-B^2=3>0$、$A=2>0$ なので極小で、値は $f(2,-1)=4-2+1-6=-3$。一方 $g(x,y)=x^2-y^2$ は原点で $\nabla g=0$、$AC-B^2=-4<0$ で鞍点（$x$ 軸方向には極小、$y$ 軸方向には極大）。` },
      { t: 'qa', q: R`停留点（$\nabla f=0$）以外で極値になることはある？`, a: R`$U$ の内点では、ない。$a$ で極値をとり $f$ が全微分可能なら、各 $j$ について 1 変数関数 $t\mapsto f(a+te_j)$ が $t=0$ で極値をとるので、[[rolle#lem-fermat|フェルマーの補題]]より $\partial_jf(a)=0$。ただし、定義域の境界上や微分可能でない点では、$\nabla f\ne0$ でも最大・最小になりうる。` },
    ],
  });
})();
