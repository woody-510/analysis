/* 第 11 章：線形空間とノルム空間（参考資料 解析学 IV 第 1・2 章） */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  const NOTE_K = R`$\mathbb{K}$：$\mathbb{R}$（実数全体）か $\mathbb{C}$（複素数全体）のどちらか。ひと続きの議論の中では、最初にどちらかに決めたら最後まで変えない（資料の約束）。$\mathbb{K}$ の元を<b>スカラー</b>という。`;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'vector-space',
    title: '線形空間',
    sub: '部分空間・線形独立・次元（資料 第 1 章）',
    yomi: 'せんけいくうかん',
    aliases: ['線形空間', 'せんけいくうかん', 'ベクトル空間', 'べくとるくうかん', '部分空間', 'ぶぶんくうかん', '線形独立', 'せんけいどくりつ', '一次独立', '線形従属', '次元', 'じげん', '無限次元', 'むげんじげん', '生成', 'せいせい', '張る', '零元', 'れいげん', '逆元', 'ぎゃくげん'],
    kind: '用語',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['sets', 'maps', 'continuity', 'absolute-convergence'],
    related: ['normed-space', 'linear-operator', 'sequence-spaces'],
    notation: [
      NOTE_K,
      R`$X$：集合。$f,g,h\in X$ は $X$ の元（ベクトル）。$\alpha,\beta\in\mathbb{K}$ はスカラー。文字の種類で「ベクトル」と「数」を区別している。ベクトルに $f$ を使うのは、後で関数（function）を考えることが多いから。`,
      R`$0$：零元（ゼロの役目をする $X$ の元）。数の $0\in\mathbb{K}$ と同じ記号だが別物で、文脈で区別する。`,
      R`数列 $a=\{a_k\}_{k=1}^\infty$：各 $k\in\mathbb{N}$ に $a_k\in\mathbb{K}$。$\ell^1:=\bigl\{a\ \bigm|\ \sum_{k=1}^\infty|a_k|<\infty\bigr\}$（[[absolute-convergence|絶対収束]]する数列全体。資料では「収束する数列全体」と書かれているが、正しくは「絶対値の和が収束する数列全体」）。`,
      R`$I\subset\mathbb{R}$：区間。$C(I):=\{f:I\to\mathbb{K}\mid f\text{ は }I\text{ 上連続}\}$。複素数値 $f=u+iv$（$u,v$ 実数値）が連続とは $u,v$ がともに連続なこと。`,
      R`$\sum_{j=1}^k\alpha_ju_j$：<b>線形結合</b>（有限個のベクトルのスカラー倍の和）。`,
    ],
    synopsis: R`線形空間とは、足し算とスカラー倍が、平面ベクトルと同じ 8 つの計算規則をみたす集合である。中身が矢印である必要はなく、行列・数列・関数の集まりも線形空間になる。関数解析は、関数を「ベクトル」とみなして長さや角度を考える分野であり、その第一歩がこの章である。数列空間 $\ell^1$ や連続関数の空間 $C(I)$ は無限次元になる。`,
    body: [
      { t: 'h2', id: 'intro', text: '導入：ベクトルの性質を取り出す' },
      { t: 'p', text: R`$\mathbb{R}^2$ のベクトルの和には交換法則や結合法則が成り立ち、スカラー倍には結合法則や分配法則が成り立つ。これらの性質だけを取り出し、同じ性質をもつものの集まりを「線形空間」と呼ぶ。性質が同じなら、ベクトルについて示した定理はそのまま使えるので、数列や関数も「ベクトルの仲間」として一度に扱える。` },

      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-vs', title: '線形空間', yomi: 'せんけいくうかん', imp: 3, text: R`集合 $X$ が $\mathbb{K}$ 上の<b class="term">線形空間</b>（ベクトル空間）であるとは、任意の $f,g\in X$、$\alpha\in\mathbb{K}$ に対して<b class="term">和</b> $f+g\in X$ と<b class="term">スカラー倍</b> $\alpha f\in X$ が一意に定まり、次の (i)〜(viii) をみたすことをいう。
<ol type="i"><li>$f+g=g+f$（$f,g\in X$）。</li><li>$(f+g)+h=f+(g+h)$（$f,g,h\in X$）。</li><li>ある $g\in X$ が存在して、すべての $f\in X$ で $f+g=f$。この $g$ を<b class="term">零元</b>といい $0$ と書く。</li><li>各 $f\in X$ に対して、$f+g=0$ となる $g\in X$ が存在する。この $g$ を $f$ の<b class="term">逆元</b>といい $-f$ と書く。</li><li>$1f=f$（$f\in X$）。</li><li>$(\alpha\beta)f=\alpha(\beta f)$（$\alpha,\beta\in\mathbb{K}$, $f\in X$）。</li><li>$\alpha(f+g)=\alpha f+\alpha g$（$\alpha\in\mathbb{K}$, $f,g\in X$）。</li><li>$(\alpha+\beta)f=\alpha f+\beta f$（$\alpha,\beta\in\mathbb{K}$, $f\in X$）。</li></ol>` },
      { t: 'table', html: R`<table class="tbl"><tr><th>番号</th><th>式</th><th>日本語での意味</th></tr><tr><td>(i)</td><td>$f+g=g+f$</td><td>足す順番を入れかえてよい（和の交換法則）</td></tr><tr><td>(ii)</td><td>$(f+g)+h=f+(g+h)$</td><td>どこから足してもよい（和の結合法則）</td></tr><tr><td>(iii)</td><td>$f+0=f$</td><td>足しても何も変わらない「ゼロ」がある</td></tr><tr><td>(iv)</td><td>$f+(-f)=0$</td><td>足すとゼロになる相手「マイナス」がある</td></tr><tr><td>(v)</td><td>$1f=f$</td><td>数の $1$ 倍は何も変えない</td></tr><tr><td>(vi)</td><td>$(\alpha\beta)f=\alpha(\beta f)$</td><td>数を先に掛けても、順に掛けても同じ</td></tr><tr><td>(vii)</td><td>$\alpha(f+g)=\alpha f+\alpha g$</td><td>和の定数倍は定数倍の和（分配法則 1）</td></tr><tr><td>(viii)</td><td>$(\alpha+\beta)f=\alpha f+\beta f$</td><td>数の和で掛けるのは、それぞれ掛けて足すのと同じ（分配法則 2）</td></tr></table>`, caption: R`8 つの条件の言い換え。(i)〜(iv) は足し算だけ、(v)〜(viii) はスカラー倍が関わる規則。` },
      { t: 'note', title: '「一意に定まる」の意味', text: R`「$f+g\in X$ が一意に定まる」とは、(1) $f$ と $g$ を足した結果がちょうど一つに決まり、(2) その結果がまた $X$ に入っている（$X$ の外に飛び出さない）ということである。(2) を「$X$ は和について<b>閉じている</b>」という。部分集合が線形空間になるかを調べるときは、まずここを確かめる。` },
      { t: 'prop', id: 'prop-zero-unique', title: '零元・逆元の一意性と基本的な計算', yomi: 'れいげんのいちいせい', imp: 2, text: R`$X$ を線形空間、$f\in X$、$\alpha\in\mathbb{K}$ とする。
<ol><li>零元はただ一つである。$f$ の逆元もただ一つである。</li><li>$0f=0$（左辺の $0$ は数、右辺は零元）、$(-1)f=-f$、$\alpha0=0$。</li></ol>` },
      {
        t: 'proof',
        steps: [
          { text: R`(1) $0$ と $0'$ がともに零元とすると、$0'$ が零元であることから $0+0'=0$、$0$ が零元であることと (i) から $0'+0=0'$、よって $0=0+0'=0'+0=0'$。` },
          {
            text: R`$-f$ と $h$ がともに $f$ の逆元とすると、`,
            eqs: [[R`-f=-f+0=-f+(f+h)=(-f+f)+h=0+h=h.`, R`(iii)・$h$ は逆元・(ii)・(i)(iv)・(i)(iii)`]],
          },
          { text: R`(2) $f=1f=(0+1)f=0f+1f=0f+f$（(v)(viii)）。両辺に $-f$ を足すと、左辺は $f+(-f)=0$、右辺は $(0f+f)+(-f)=0f+(f+(-f))=0f+0=0f$（(ii)(iv)(iii)）。よって $0=0f$。` },
          { text: R`$f+(-1)f=1f+(-1)f=(1+(-1))f=0f=0$（(v)(viii) と今示したこと）なので、$(-1)f$ は $f$ の逆元であり、逆元の一意性より $(-1)f=-f$。最後に $\alpha0=\alpha(0f)=(\alpha\cdot0)f=0f=0$（(vi)）。` },
        ],
      },
      { t: 'rem', title: '公理から出ることと、出ないこと', text: R`「$0f=0$」のような当たり前に見える式も、公理 (i)〜(viii) から導かなければならない。逆に、公理にないこと（たとえばベクトルどうしの掛け算や割り算）は、線形空間では一般には定義されていない。資料の注意にあるとおり、零元・逆元の「存在」を「一意的に存在」と書く文献もあるが、上の命題によりどちらでも同じことである。` },

      { t: 'h2', id: 'examples', text: '線形空間の例' },
      { t: 'ex', id: 'ex-kn', title: 'ℝⁿ・ℂⁿ', text: R`$\mathbb{K}^n=\{(x_1,\dots,x_n)\mid x_j\in\mathbb{K}\}$ は、成分ごとの和 $x+y=(x_1+y_1,\dots)$ とスカラー倍 $\alpha x=(\alpha x_1,\dots)$ で線形空間になる。各公理は成分ごとに数の計算規則（交換法則・結合法則・分配法則）を使えば確かめられる。たとえば (vii)：$\alpha(x+y)$ の第 $j$ 成分は $\alpha(x_j+y_j)=\alpha x_j+\alpha y_j$ で、これは $\alpha x+\alpha y$ の第 $j$ 成分。零元は $(0,\dots,0)$、逆元は $(-x_1,\dots,-x_n)$。` },
      { t: 'ex', id: 'ex-matrix', title: '行列の空間 M(2; 𝕂)', text: R`2 次正方行列全体 $M(2;\mathbb{K})=\{A=(a_{ij})_{1\le i,j\le2}\mid a_{ij}\in\mathbb{K}\}$ は、成分ごとの和 $A+B=(a_{ij}+b_{ij})$ とスカラー倍 $\alpha A=(\alpha a_{ij})$ で線形空間になる。成分を一列に並べれば $\mathbb{K}^4$ と同じ計算なので、公理は $\mathbb{K}^4$ の場合から従う。` },
      { t: 'prop', id: 'prop-l1-vs', title: 'ℓ¹ は線形空間', yomi: 'えるいちはせんけいくうかん', imp: 2, text: R`$a,b\in\ell^1$、$\alpha\in\mathbb{K}$ について、成分ごとの和 $a+b:=\{a_k+b_k\}_{k=1}^\infty$ とスカラー倍 $\alpha a:=\{\alpha a_k\}_{k=1}^\infty$ はまた $\ell^1$ に属し、$\ell^1$ はこの演算で線形空間になる。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>和について閉じている。</b>各 $k$ で $0\le|a_k+b_k|\le|a_k|+|b_k|$（三角不等式）。$\sum(|a_k|+|b_k|)=\sum|a_k|+\sum|b_k|<\infty$（[[series#prop-linear|級数の線形性]]）なので、[[series-tests#thm-comparison|比較判定法]]より $\sum|a_k+b_k|<\infty$、すなわち $a+b\in\ell^1$。` },
          { text: R`<b>スカラー倍について閉じている。</b>$\sum|\alpha a_k|=|\alpha|\sum|a_k|<\infty$（線形性）。` },
          { text: R`<b>公理。</b>演算は成分ごとなので、(i)〜(viii) はどれも各成分 $k$ での数の計算規則に帰着する（$\mathbb{K}^n$ の場合と同じ）。零元は $0=\{0,0,\dots\}\in\ell^1$、$a$ の逆元は $\{-a_k\}\in\ell^1$。` },
        ],
      },
      { t: 'prop', id: 'prop-ci-vs', title: 'C(I) は線形空間', yomi: 'しーあいはせんけいくうかん', imp: 3, text: R`区間 $I$ 上の連続関数全体 $C(I)$ は、各点ごとの和とスカラー倍
$$(f+g)(x):=f(x)+g(x),\qquad(\alpha f)(x):=\alpha f(x)\qquad(x\in I)$$
で線形空間になる。` },
      {
        t: 'proof',
        sketch: R`連続関数の和と定数倍は連続なので、演算は $C(I)$ の中で閉じている。公理は、各点 $x$ で両辺の値を比べると、数の計算規則そのものになる。`,
        steps: [
          { text: R`<b>閉じていること。</b>$f,g\in C(I)$ なら $f+g$、$\alpha f$ は連続（[[continuity#prop-cont-arith|連続関数の四則]]。複素数値なら実部と虚部ごとに使う）。よって $f+g,\alpha f\in C(I)$。` },
          { text: R`<b>関数の相等。</b>二つの関数 $F,G:I\to\mathbb{K}$ が等しいとは、すべての $x\in I$ で $F(x)=G(x)$ となることである（[[maps#def-map|写像の相等]]）。以下、各公理の両辺をこの意味で比べる。` },
          {
            text: R`$x\in I$ を任意に固定する。$f(x),g(x),h(x)\in\mathbb{K}$ は数なので、`,
            eqs: [
              [R`(i)\ \ (f+g)(x)=f(x)+g(x)=g(x)+f(x)=(g+f)(x)`, R`和の定義・数の交換法則`],
              [R`(ii)\ \ ((f+g)+h)(x)=(f(x)+g(x))+h(x)=f(x)+(g(x)+h(x))=(f+(g+h))(x)`, R`数の結合法則`],
              [R`(v)\ \ (1f)(x)=1\cdot f(x)=f(x)`, R`スカラー倍の定義`],
              [R`(vi)\ \ ((\alpha\beta)f)(x)=(\alpha\beta)f(x)=\alpha(\beta f(x))=\alpha\,(\beta f)(x)=(\alpha(\beta f))(x)`, R`数の結合法則`],
              [R`(vii)\ \ (\alpha(f+g))(x)=\alpha(f(x)+g(x))=\alpha f(x)+\alpha g(x)=(\alpha f+\alpha g)(x)`, R`数の分配法則`],
              [R`(viii)\ \ ((\alpha+\beta)f)(x)=(\alpha+\beta)f(x)=\alpha f(x)+\beta f(x)=(\alpha f+\beta f)(x)`, R`数の分配法則`],
            ],
          },
          { text: R`(iii) 零元は恒等的に $0$ の関数 $0(x):=0$（連続）で、$(f+0)(x)=f(x)+0=f(x)$。(iv) $(-f)(x):=-(f(x))$ は連続で、$(f+(-f))(x)=f(x)-f(x)=0$。$x$ は任意だったので、すべての公理が関数の等式として成り立つ。` },
        ],
      },
      { t: 'rem', title: '資料の「残りも同様に示せる」', text: R`資料では (vi) まで確かめて「残りも同様」としているが、上のように (vii)(viii) も各点での数の分配法則から出る。どの公理も「各点で値を比べる → 数の計算規則」という同じ型である。` },

      { t: 'h2', id: 'dim', text: '線形独立と次元' },
      { t: 'def', id: 'def-indep', title: '線形独立・次元', yomi: 'せんけいどくりつ', imp: 3, text: R`$X$ の元 $u_1,\dots,u_k$（$k\in\mathbb{N}$）が<b class="term">線形独立</b>であるとは、
$$\sum_{j=1}^k\alpha_ju_j=0\ \ (\alpha_j\in\mathbb{K})\Longrightarrow\alpha_1=\alpha_2=\cdots=\alpha_k=0$$
が成り立つことをいう。線形独立でないとき<b class="term">線形従属</b>という。$X$ の中に $d$ 個の線形独立な元が存在し、どの $d+1$ 個の元も線形従属であるとき、$X$ は <b class="term">$d$ 次元</b>であるといい $\dim X=d$ と書く。どんな $d\in\mathbb{N}$ に対しても $d$ 個の線形独立な元が存在するとき、$X$ は<b class="term">無限次元</b>であるといい $\dim X=\infty$ と書く。` },
      { t: 'note', title: '言い換え', text: R`線形独立とは「どの $u_j$ も、他の $u$ たちの線形結合では書けない」こと、言いかえると「$0$ を作る線形結合は、係数がすべて $0$ の自明なものしかない」ことである。次元は「線形独立にとれる元の最大個数」である。` },
      { t: 'prop', id: 'prop-basis', title: '有限次元なら基底で一意に表せる', yomi: 'きてい', imp: 2, text: R`$\dim X=d$（$d\in\mathbb{N}$）とし、$e_1,\dots,e_d\in X$ を線形独立とする。このとき任意の $f\in X$ は、ある $c_1,\dots,c_d\in\mathbb{K}$ によって $f=\sum_{j=1}^dc_je_j$ と<em>一意に</em>表される。（このような $\{e_1,\dots,e_d\}$ を<b class="term">基底</b>という。）` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>存在。</b>$d+1$ 個の元 $e_1,\dots,e_d,f$ は線形従属なので、すべては $0$ でない係数 $\beta_1,\dots,\beta_d,\beta\in\mathbb{K}$ で $\sum_j\beta_je_j+\beta f=0$ となる。もし $\beta=0$ なら $\sum_j\beta_je_j=0$ で、$e_j$ の線形独立性より $\beta_j=0$ がすべての $j$ で成り立ち、「すべては $0$ でない」に反する。よって $\beta\ne0$ で、$f=\sum_j\left(-\frac{\beta_j}\beta\right)e_j$。` },
          { text: R`<b>一意性。</b>$f=\sum c_je_j=\sum c_j'e_j$ なら、引いて $\sum(c_j-c_j')e_j=0$（公理による変形）。線形独立性より $c_j=c_j'$。` },
        ],
      },
      { t: 'ex', id: 'ex-dim-matrix', title: 'dim M(2; 𝕂) = 4', text: R`$E_1=\begin{pmatrix}1&0\\0&0\end{pmatrix}$, $E_2=\begin{pmatrix}0&1\\0&0\end{pmatrix}$, $E_3=\begin{pmatrix}0&0\\1&0\end{pmatrix}$, $E_4=\begin{pmatrix}0&0\\0&1\end{pmatrix}$ とする。$\sum c_jE_j=\begin{pmatrix}c_1&c_2\\c_3&c_4\end{pmatrix}=0$ なら $c_1=\cdots=c_4=0$ なので線形独立。任意の行列は $\begin{pmatrix}a&b\\c&d\end{pmatrix}=aE_1+bE_2+cE_3+dE_4$ と書ける。5 個の元 $A_1,\dots,A_5$ は、それぞれを $E_j$ で表した係数のなす $4\times5$ 行列の列が線形従属（$\mathbb{K}^4$ の 5 個のベクトル）であることから線形従属になる。よって $\dim M(2;\mathbb{K})=4$。` },
      { t: 'prop', id: 'prop-l1-inf', title: 'ℓ¹ は無限次元', yomi: 'えるいちはむげんじげん', imp: 3, text: R`$j\in\mathbb{N}$ について $e^{(j)}=\{e^{(j)}_k\}_{k=1}^\infty$ を $e^{(j)}_k:=1\ (k=j)$、$e^{(j)}_k:=0\ (k\ne j)$ と定める（$j$ 番目だけ $1$ の数列）。任意の $d\in\mathbb{N}$ について $e^{(1)},\dots,e^{(d)}$ は線形独立である。したがって $\dim\ell^1=\infty$。` },
      { t: 'proof', steps: [{ text: R`各 $e^{(j)}$ は $\sum_k|e^{(j)}_k|=1<\infty$ なので $\ell^1$ に属する。$\sum_{j=1}^dc_je^{(j)}=0$（零元＝すべての項が $0$ の数列）とすると、両辺の第 $k$ 項（$1\le k\le d$）を比べて $\sum_{j=1}^dc_je^{(j)}_k=c_k=0$（[[sigma-notation#def-kronecker|クロネッカーのデルタ]]と同じ計算）。よって $c_1=\cdots=c_d=0$。$d$ は任意なので無限次元。` }] },
      { t: 'prop', id: 'prop-ci-inf', title: 'C(I) は無限次元', yomi: 'しーあいはむげんじげん', imp: 3, text: R`$a<b$、$I=[a,b]$ とし、$p_j(x):=x^j$（$j\in\mathbb{N}\cup\{0\}$, $x\in I$）とおく。任意の $d\in\mathbb{N}\cup\{0\}$ について $p_0,p_1,\dots,p_d$ は $C(I)$ で線形独立である。したがって $\dim C(I)=\infty$。` },
      {
        t: 'proof',
        steps: [
          { text: R`$\alpha_0,\dots,\alpha_d\in\mathbb{K}$ について $\sum_{j=0}^d\alpha_jp_j=0$、すなわちすべての $x\in I$ で $\sum_{j=0}^d\alpha_jx^j=0$ とする。` },
          { text: R`左辺は $I$ 上の多項式関数で、恒等的に $0$ なので、何回微分しても恒等的に $0$ である（$I$ の内部では両側、端点では片側の微分）。$d$ 回微分すると $x^j$（$j<d$）の項は消え、$x^d$ の項は $d!$ になるので（[[derivative-rules#ex-power|べきの微分]]を $d$ 回）、$d!\,\alpha_d=0$、すなわち $\alpha_d=0$。` },
          { text: R`すると $\sum_{j=0}^{d-1}\alpha_jx^j=0$ が $I$ 上で成り立つので、$d-1$ 回微分して $\alpha_{d-1}=0$。これを繰り返して（$d$ についての帰納法）$\alpha_d=\alpha_{d-1}=\cdots=\alpha_0=0$。` },
        ],
      },
      { t: 'rem', title: '有限次元と無限次元の違い', text: R`線形代数では主に有限次元の空間を扱った。関数解析では本質的に無限次元の空間を扱う。無限次元では、有限次元で当たり前だったことが成り立たなくなる。たとえば「有界な点列は収束部分列をもつ」（[[euclidean-space#thm-bw-rn|ボルツァーノ＝ワイエルシュトラス]]）や「どのノルムも同値」（[[normed-space#thm-equiv-fin|ノルムの同値性]]）は無限次元では成り立たない。` },

      { t: 'h2', id: 'subspace', text: '部分空間と生成' },
      { t: 'def', id: 'def-subspace', title: '部分空間', yomi: 'ぶぶんくうかん', imp: 3, text: R`$X$ を線形空間とする。空でない部分集合 $X_0\subset X$ が $X$ の<b class="term">部分空間</b>（線形部分空間）であるとは、任意の $f,g\in X_0$ と任意の $\alpha\in\mathbb{K}$ について $f+g\in X_0$、$\alpha f\in X_0$ が成り立つことをいう。` },
      { t: 'rem', title: '「空でない」を忘れない', text: R`資料の定義には「空でない」が書かれていないが、$X_0=\emptyset$ だと条件は[[propositional-logic#rem-vacuous|空虚に真]]になってしまう。空でなければ、$f\in X_0$ をとって $0=0f\in X_0$（[[vector-space#prop-zero-unique|命題]]）となり、零元を必ず含む。逆に「$0\in X_0$ かどうか」は、部分空間でないことを示すのに便利な目印である。` },
      { t: 'prop', id: 'prop-subspace-vs', title: '部分空間はそれ自身が線形空間', yomi: 'ぶぶんくうかんはせんけいくうかん', imp: 2, text: R`$X_0$ が $X$ の部分空間ならば、$X$ の和とスカラー倍を $X_0$ に制限したものによって、$X_0$ は線形空間になる。` },
      { t: 'proof', steps: [{ text: R`和とスカラー倍が $X_0$ の中で閉じていることは定義そのもの。(i)(ii)(v)〜(viii) は $X$ のすべての元で成り立つので、特に $X_0$ の元で成り立つ。(iii)：$f\in X_0$ をとると $0=0f\in X_0$。(iv)：$f\in X_0$ なら $-f=(-1)f\in X_0$（[[vector-space#prop-zero-unique|命題]]）。` }] },
      { t: 'ex', id: 'ex-subspace', title: '部分空間の例', text: R`<ol><li>$C^1([a,b]):=\{f\in C([a,b])\mid f'\in C([a,b])\}$ は $C([a,b])$ の部分空間（和と定数倍の微分 $(f+g)'=f'+g'$、$(\alpha f)'=\alpha f'$ は連続）。</li><li>$\{f\in C([0,1])\mid f(0)=0\}$ は部分空間。$\{f\in C([0,1])\mid f(0)=1\}$ は零元（恒等的に $0$）を含まないので部分空間でない。</li><li>多項式関数全体 $\mathcal{P}([a,b])$ は $C([a,b])$ の部分空間。</li></ol>` },
      { t: 'def', id: 'def-span', title: '生成する部分空間', yomi: 'せいせいするぶぶんくうかん', imp: 2, text: R`空でない部分集合 $A\subset X$ に対して
$$M:=\Bigl\{\sum_{j=1}^k\alpha_ju_j\ \Bigm|\ k\in\mathbb{N},\ u_j\in A,\ \alpha_j\in\mathbb{K}\ (1\le j\le k)\Bigr\}$$
（$A$ の元の有限個の線形結合全体）を、$A$ が<b class="term">生成する部分空間</b>といい、$\operatorname{span}A$ とも書く。` },
      { t: 'prop', id: 'prop-span-min', title: '生成する部分空間は A を含む最小の部分空間', yomi: 'さいしょうのぶぶんくうかん', imp: 2, text: R`$M=\operatorname{span}A$ は $A$ を含む部分空間であり、$A$ を含む任意の部分空間 $M'$ について $M\subset M'$。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>部分空間であること。</b>$M\ne\emptyset$（$A$ の元 $u$ は $1u\in M$）。二つの線形結合の和は、項を並べてつなげた線形結合なので $M$ に属する。線形結合の $\alpha$ 倍は、分配法則 (vii) と (vi) より各係数を $\alpha$ 倍した線形結合なので $M$ に属する。` },
          { text: R`<b>$A$ を含むこと。</b>$u\in A$ なら $u=1u$（(v)）は $k=1$ の線形結合。` },
          { text: R`<b>最小性。</b>$M'\supset A$ を部分空間とする。$\sum_{j=1}^k\alpha_ju_j\in M$（$u_j\in A\subset M'$）について、部分空間はスカラー倍で閉じているので $\alpha_ju_j\in M'$、和で閉じているので（$k$ についての帰納法で）$\sum_{j=1}^k\alpha_ju_j\in M'$。よって $M\subset M'$。` },
        ],
      },
      { t: 'qa', q: R`「無限個の線形結合 $\sum_{j=1}^\infty\alpha_ju_j$」は $\operatorname{span}A$ に入る？`, a: R`入らない。線形空間には極限の概念がないので、線形結合はつねに有限個である。無限和を考えるには「近さ」を測るノルムが必要で、そのとき現れるのが[[normed-space#def-closed-span|生成する閉部分空間]] $\overline{\operatorname{span}A}$ である。[[orthonormal-system|正規直交系]]による展開 $f=\sum(f,e_k)e_k$ はこちらの意味である。` },
      { t: 'crux', text: R`線形空間の定義は「計算規則だけ」を述べていて、「近さ」「長さ」「極限」は一切含んでいない。関数解析で大事なのは無限次元の空間であり、そこでは極限を扱うために次の章で<b>ノルム</b>（長さ）を導入する。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$X_0:=\{f\in C([0,1])\mid f(0)=f(1)\}$ が $C([0,1])$ の部分空間であることを示せ。`, hint: R`空でないこと、和とスカラー倍で閉じていること。`, answer: R`恒等的に $0$ の関数は $f(0)=f(1)=0$ をみたすので $X_0\ne\emptyset$。$f,g\in X_0$、$\alpha\in\mathbb{K}$ なら $(f+g)(0)=f(0)+g(0)=f(1)+g(1)=(f+g)(1)$、$(\alpha f)(0)=\alpha f(0)=\alpha f(1)=(\alpha f)(1)$。また $f+g,\alpha f$ は連続。よって $f+g,\alpha f\in X_0$。`, space: 5 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$\mathbb{K}=\mathbb{R}$ とする。$C([0,\pi])$ において $\sin x$ と $\cos x$ は線形独立であることを示せ。`, hint: R`$\alpha\sin x+\beta\cos x=0$ に $x=0$、$x=\frac\pi2$ を代入。`, answer: R`すべての $x\in[0,\pi]$ で $\alpha\sin x+\beta\cos x=0$ とする。$x=0$ を代入すると $\beta=0$、$x=\frac\pi2$ を代入すると $\alpha=0$。よって線形独立。`, space: 4 },
      { t: 'problem', id: 'prob-3', level: 2, title: '標準', text: R`$\ell^1$ の部分集合 $c_{00}:=\{a\in\ell^1\mid\text{有限個の }k\text{ を除いて }a_k=0\}$ は部分空間であり、$\{e^{(j)}\}_{j\in\mathbb{N}}$ で生成されることを示せ。`, hint: R`$a\in c_{00}$ なら、ある $K$ で $a=\sum_{k=1}^Ka_ke^{(k)}$。`, answer: R`零数列は $c_{00}$ に属する。$a,b\in c_{00}$ で $a_k=0\ (k>K_1)$、$b_k=0\ (k>K_2)$ なら、$k>\max\{K_1,K_2\}$ で $a_k+b_k=0$、$\alpha a_k=0$ なので和・スカラー倍で閉じている。$a\in c_{00}$ で $a_k=0\ (k>K)$ なら $a=\sum_{k=1}^Ka_ke^{(k)}\in\operatorname{span}\{e^{(j)}\}$。逆に有限個の $e^{(j)}$ の線形結合は有限個の項しか $0$ でないので $c_{00}$ に属する。よって $c_{00}=\operatorname{span}\{e^{(j)}\mid j\in\mathbb{N}\}$。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'normed-space',
    title: 'ノルム空間',
    sub: 'ノルム・収束・閉部分空間・ノルムの同値（資料 第 2 章）',
    yomi: 'のるむくうかん',
    aliases: ['ノルム', 'のるむ', 'ノルム空間', 'のるむくうかん', 'ノルム収束', '最大値ノルム', 'さいだいちのるむ', '上限ノルム', '閉部分空間', 'へいぶぶんくうかん', 'ノルムの同値', 'どうちなのるむ', '同値なノルム', '有限次元'],
    kind: '用語',
    field: '関数解析',
    grade: '2年後期',
    importance: 3,
    prereq: ['vector-space', 'metric-space', 'closure', 'compactness', 'euclidean-space'],
    related: ['banach-space', 'hilbert-space', 'operator-norm'],
    notation: [
      NOTE_K,
      R`$\|\cdot\|_X:X\to\mathbb{R}$：ノルム。$\|f\|_X$ は「$f$ の長さ（大きさ）」。混乱のおそれがなければ $\|f\|$ と書く。点 $\cdot$ は「ここに元が入る」という目印。`,
      R`点列 $\{f_k\}\subset X$：番号 $k\in\mathbb{N}$ ごとに $f_k\in X$ がただ一つ定まる対応（資料の定義）。`,
      R`$\displaystyle\lim_{k\to\infty}f_k=f\ \text{in }X$：$X$ のノルムで収束すること（「in $X$」はどのノルムでの収束かを強調する書き方）。`,
      R`$\|f\|_{C(I)}:=\max_{x\in I}|f(x)|$（$I=[a,b]$）：最大値ノルム。$\|a\|_{\ell^1}:=\sum_{k=1}^\infty|a_k|$。`,
      R`$\overline A$：$A$ の閉包（ノルムから定まる距離 $d(f,g)=\|f-g\|$ についての[[closure#def-closure|閉包]]）。$N(a;\varepsilon)=\{f\mid\|f-a\|<\varepsilon\}$。`,
    ],
    synopsis: R`ノルムは「ベクトルの長さ」を公理化したもので、絶対値と同じ 3 つの性質（正値性・斉次性・三角不等式）をもつ。ノルムがあれば距離 $\|f-g\|$ が定まり、点列の収束・閉包・閉部分空間が考えられる。同じ線形空間でもノルムの入れ方は一つではないが、有限次元ならどのノルムも同値で、収束の意味は変わらない。無限次元ではそうはいかない。`,
    body: [
      { t: 'h2', id: 'def', text: 'ノルムの定義' },
      { t: 'def', id: 'def-norm', title: 'ノルム・ノルム空間', yomi: 'のるむ', imp: 3, text: R`$X$ を $\mathbb{K}$ 上の線形空間とする。写像 $\|\cdot\|_X:X\to\mathbb{R}$ が次をみたすとき<b class="term">ノルム</b>という。
<ol type="i"><li>（正値性）$\|f\|_X\ge0$、かつ $\|f\|_X=0\iff f=0$（$f\in X$）。</li><li>（斉次性）$\|\alpha f\|_X=|\alpha|\,\|f\|_X$（$\alpha\in\mathbb{K}$, $f\in X$）。</li><li>（三角不等式）$\|f+g\|_X\le\|f\|_X+\|g\|_X$（$f,g\in X$）。</li></ol>ノルムの定義された線形空間を<b class="term">ノルム空間</b>といい、$(X,\|\cdot\|_X)$ と書く。` },
      { t: 'note', title: '言い換え', text: R`(i)「長さは $0$ 以上で、$0$ になるのはゼロベクトルだけ」、(ii)「$\alpha$ 倍すると長さは $|\alpha|$ 倍」、(iii)「寄り道すると長くなる（三角形の二辺の和は他の一辺より長い）」。絶対値 $|\cdot|$ が数の大きさを測るのに対し、ノルムはベクトル（数列・関数など）の大きさを測る。$\mathbb{K}$ そのものでは絶対値がノルムになる。` },
      { t: 'prop', id: 'prop-norm-rev', title: '逆向きの三角不等式とノルムの連続性', yomi: 'ぎゃくさんかくふとうしき', imp: 2, text: R`ノルム空間 $X$ の任意の $f,g$ について $\bigl|\|f\|_X-\|g\|_X\bigr|\le\|f-g\|_X$。特に $f_k\to f$ in $X$ ならば $\|f_k\|_X\to\|f\|_X$。` },
      { t: 'proof', steps: [{ text: R`$\|f\|=\|(f-g)+g\|\le\|f-g\|+\|g\|$ より $\|f\|-\|g\|\le\|f-g\|$。$f,g$ を入れかえ、$\|g-f\|=\|(-1)(f-g)\|=|-1|\|f-g\|=\|f-g\|$（(ii)）を使うと $\|g\|-\|f\|\le\|f-g\|$。二つ合わせて結論。後半は $\bigl|\|f_k\|-\|f\|\bigr|\le\|f_k-f\|\to0$ とはさみうち。` }] },

      { t: 'h2', id: 'examples', text: 'ノルム空間の例' },
      { t: 'ex', id: 'ex-norm-rn', title: 'ℝⁿ・ℂⁿ・行列', text: R`<ol><li>$\mathbb{R}^n$ のユークリッドノルム $\|x\|_{\mathbb{R}^n}=\bigl(\sum x_j^2\bigr)^{1/2}$。(i)(ii) は直接計算（$\|\alpha x\|=\bigl(\sum\alpha^2x_j^2\bigr)^{1/2}=\sqrt{\alpha^2}\|x\|=|\alpha|\|x\|$）、(iii) は[[euclidean-space#thm-cs-rn|コーシー＝シュワルツの不等式]]から（[[euclidean-space#cor-norm-rn|ℝⁿ の記事]]）。</li><li>$\mathbb{C}^n$：$z=x+iy$（$x,y\in\mathbb{R}^n$）に対し $\|z\|_{\mathbb{C}^n}:=\bigl(\|x\|^2+\|y\|^2\bigr)^{1/2}=\bigl(\sum|z_j|^2\bigr)^{1/2}$。これは $z$ を $\binom xy\in\mathbb{R}^{2n}$ とみたときのユークリッドノルムなので、三角不等式は $\mathbb{R}^{2n}$ の場合から従う。</li><li>行列 $M(n;\mathbb{K})$：$\|A\|:=\bigl(\sum_{i,j}|a_{ij}|^2\bigr)^{1/2}$。成分を並べて $\mathbb{K}^{n^2}$ とみればよい。</li></ol>` },
      { t: 'ex', id: 'ex-norm-l1', title: 'ℓ¹ のノルム', text: R`$\|a\|_{\ell^1}:=\sum_{k=1}^\infty|a_k|$。(i)：和が $0$ なら各 $|a_k|=0$（非負の項の和が $0$）。(ii)：$\sum|\alpha a_k|=|\alpha|\sum|a_k|$。(iii)：各 $k$ で $|a_k+b_k|\le|a_k|+|b_k|$ を $k=1,\dots,n$ で足すと $\sum_{k=1}^n|a_k+b_k|\le\|a\|_{\ell^1}+\|b\|_{\ell^1}$。右辺は $n$ によらないので $n\to\infty$ として（[[sequence-convergence#prop-order|極限と不等式]]）$\|a+b\|_{\ell^1}\le\|a\|_{\ell^1}+\|b\|_{\ell^1}$。数列のノルム空間は[[sequence-spaces|数列空間]]で詳しく扱う。` },
      { t: 'ex', id: 'ex-norm-c', title: 'C(I) の最大値ノルム', text: R`$I=[a,b]$ とする。$f\in C(I)$ について $\|f\|_{C(I)}:=\max_{x\in I}|f(x)|$。最大値は $|f|\in C(I)$ に[[extreme-value#thm-evt|最大値の定理]]を使えば存在する。(i)：最大値が $0$ なら各 $x$ で $|f(x)|=0$。(ii)：$|\alpha f(x)|=|\alpha||f(x)|$ の最大値。(iii)：各 $x\in I$ で
$$|f(x)+g(x)|\le|f(x)|+|g(x)|\le\|f\|_{C(I)}+\|g\|_{C(I)}.$$
右辺は $x$ によらないので、左辺の最大値をとって $\|f+g\|_{C(I)}\le\|f\|_{C(I)}+\|g\|_{C(I)}$。このノルムでの収束は[[uniform-convergence#prop-unif-sup|一様収束]]そのものである。` },
      { t: 'ex', id: 'ex-norm-c1', title: 'C(I) の積分ノルム', text: R`$I=[a,b]$、$f\in C(I)$ について $\|f\|_{R^1(I)}:=\int_a^b|f(x)|\,dx$（資料の記号）もノルムになる。(i) の「$\|f\|=0\Rightarrow f=0$」に $f$ の連続性が必要なこと（[[integral-properties#prob-1|問題]]）に注意。同じ $C(I)$ に、最大値ノルムと積分ノルムという二つのノルムが入る。` },

      { t: 'h2', id: 'conv', text: '収束と距離' },
      { t: 'def', id: 'def-norm-conv', title: 'ノルム収束', yomi: 'のるむしゅうそく', imp: 3, text: R`ノルム空間 $X$ の点列 $\{f_k\}\subset X$ が $f\in X$ に<b class="term">収束する</b>（ノルム収束する）とは、
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall k\ge N,\quad\|f_k-f\|_X<\varepsilon$$
が成り立つことをいう。すなわち実数列 $\|f_k-f\|_X\to0$。$f$ を<b class="term">極限点</b>といい、$\displaystyle\lim_{k\to\infty}f_k=f$ (in $X$) と書く。` },
      { t: 'prop', id: 'prop-norm-metric', title: 'ノルムから距離が定まる', yomi: 'のるむからきょり', imp: 3, text: R`ノルム空間 $(X,\|\cdot\|_X)$ において $d(f,g):=\|f-g\|_X$ と定めると、$d$ は $X$ 上の[[metric-space#def-metric|距離]]になる。この距離での点列の収束は、ノルム収束と同じである。` },
      { t: 'proof', steps: [{ text: R`(1) $d(f,g)=\|f-g\|\ge0$、$d(f,g)=0\iff f-g=0\iff f=g$（ノルムの (i)。$f-g:=f+(-g)$ で、$f-g=0$ の両辺に $g$ を足すと $f=g$）。(2) $d(g,f)=\|g-f\|=\|(-1)(f-g)\|=\|f-g\|$（(ii)）。(3) $d(f,h)=\|(f-g)+(g-h)\|\le\|f-g\|+\|g-h\|$（(iii)）。収束の定義は $d(f_k,f)=\|f_k-f\|$ なので一致する。` }] },
      { t: 'note', title: 'ノルム空間は距離空間の一種', text: R`この命題により、[[metric-space|距離空間]]で準備した言葉（ε 近傍、開集合・閉集合、閉包、稠密、連続写像、コンパクト）が、すべてノルム空間でそのまま使える。逆に、距離空間には足し算がないので、ノルム空間とは限らない（たとえば離散距離）。` },
      { t: 'prop', id: 'prop-norm-arith', title: '収束と演算', yomi: 'しゅうそくとえんざん', imp: 2, text: R`$f_k\to f$、$g_k\to g$ in $X$、$\alpha_k\to\alpha$ in $\mathbb{K}$ ならば、$f_k+g_k\to f+g$、$\alpha_kf_k\to\alpha f$ in $X$。` },
      { t: 'proof', steps: [{ text: R`$\|(f_k+g_k)-(f+g)\|\le\|f_k-f\|+\|g_k-g\|\to0$。また $\alpha_kf_k-\alpha f=\alpha_k(f_k-f)+(\alpha_k-\alpha)f$ なので $\|\alpha_kf_k-\alpha f\|\le|\alpha_k|\|f_k-f\|+|\alpha_k-\alpha|\|f\|$。$\{\alpha_k\}$ は収束列なので有界（$|\alpha_k|\le K$）で、右辺は $K\|f_k-f\|+|\alpha_k-\alpha|\|f\|\to0$。` }] },
      { t: 'ex', id: 'ex-sin-k', title: 'C([0, 2π]) での収束の例', text: R`$I=[0,2\pi]$、$f_k(x):=\frac1k\sin(kx)$ とすると $f_k\in C(I)$ で $\|f_k-0\|_{C(I)}=\frac1k\max_{x\in I}|\sin(kx)|=\frac1k\to0$。よって $\displaystyle\lim_{k\to\infty}f_k=0$ in $C(I)$。一方、導関数 $f_k'(x)=\cos(kx)$ は小さくならない（[[uniform-convergence#diff|項別微分の注意]]）。` },

      { t: 'h2', id: 'closed-sub', text: '閉部分空間' },
      { t: 'def', id: 'def-closed-sub', title: '閉部分空間', yomi: 'へいぶぶんくうかん', imp: 3, text: R`ノルム空間 $X$ の部分空間 $A$ が、ノルムから定まる距離について[[open-closed#def-closed|閉集合]]であるとき、$A$ を $X$ の<b class="term">閉部分空間</b>という。` },
      { t: 'thm', id: 'thm-closure-sub', title: '部分空間の閉包は閉部分空間', yomi: 'ぶぶんくうかんのへいほう', imp: 3, text: R`ノルム空間 $X$ の部分空間 $X_0$ について、その閉包 $\overline{X_0}$ は $X$ の閉部分空間である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$\overline{X_0}$ が閉集合であることは[[closure#thm-closure-min|閉包の性質]]。$X_0\subset\overline{X_0}$ なので空でない。残りは和とスカラー倍で閉じていることである。` },
          { text: R`$f,g\in\overline{X_0}$、$\alpha\in\mathbb{K}$ とする。[[closure#thm-closure-seq|閉包の点列による特徴づけ]]より、$f_k\to f$、$g_k\to g$ となる点列 $\{f_k\},\{g_k\}\subset X_0$ がある。$X_0$ は部分空間なので $f_k+g_k\in X_0$、$\alpha f_k\in X_0$。` },
          {
            text: R`[[normed-space#prop-norm-arith|収束と演算]]より`,
            eqs: [[R`\|(f_k+g_k)-(f+g)\|_X\le\|f_k-f\|_X+\|g_k-g\|_X\xrightarrow[k\to\infty]{}0,\qquad\|\alpha f_k-\alpha f\|_X=|\alpha|\|f_k-f\|_X\xrightarrow[k\to\infty]{}0.`, R`三角不等式・斉次性`]],
          },
          { text: R`$f+g$ と $\alpha f$ は $X_0$ の点列の極限なので、再び点列による特徴づけより $\overline{X_0}$ に属する。` },
        ],
      },
      { t: 'rem', title: '資料の脚注 *2 の内容', text: R`資料の脚注は「閉集合の点列の極限点はその閉集合に属する」ことを、$\varepsilon/2$ を使って直接示している。これは[[closure#cor-closed-seq|閉集合の点列による特徴づけ]]の一般的な証明と同じである。` },
      { t: 'def', id: 'def-closed-span', title: '生成する閉部分空間', yomi: 'せいせいするへいぶぶんくうかん', imp: 2, text: R`ノルム空間 $X$ の部分集合 $A\ne\emptyset$ について、$A$ が[[vector-space#def-span|生成する部分空間]] $M=\operatorname{span}A$ の閉包 $\overline M$ を、$A$ が<b class="term">生成する閉部分空間</b>という。` },
      { t: 'prop', id: 'prop-closed-span-min', title: '生成する閉部分空間は最小の閉部分空間', yomi: 'さいしょうのへいぶぶんくうかん', imp: 2, text: R`$\overline{\operatorname{span}A}$ は $A$ を含む閉部分空間であり、$A$ を含む任意の閉部分空間 $L$ について $\overline{\operatorname{span}A}\subset L$。` },
      { t: 'proof', steps: [{ text: R`[[normed-space#thm-closure-sub|定理]]より閉部分空間で、$A\subset\operatorname{span}A\subset\overline{\operatorname{span}A}$。$L\supset A$ を閉部分空間とすると、$L$ は部分空間なので[[vector-space#prop-span-min|最小性]]より $\operatorname{span}A\subset L$。$L$ は閉集合なので、[[closure#thm-closure-min|閉包の最小性]]より $\overline{\operatorname{span}A}\subset L$。` }] },

      { t: 'h2', id: 'equiv', text: 'ノルムの同値' },
      { t: 'def', id: 'def-equiv', title: 'ノルムの同値', yomi: 'のるむのどうち', imp: 3, text: R`線形空間 $X$ の二つのノルム $\|\cdot\|_{X,1}$, $\|\cdot\|_{X,2}$ が<b class="term">同値</b>であるとは、定数 $c,C>0$ が存在して
$$c\|u\|_{X,2}\le\|u\|_{X,1}\le C\|u\|_{X,2}\qquad(u\in X)$$
が成り立つことをいう。` },
      { t: 'prop', id: 'prop-equiv-conv', title: '同値なノルムでは収束の意味が同じ', yomi: 'どうちなのるむとしゅうそく', imp: 2, text: R`$\|\cdot\|_{X,1}$ と $\|\cdot\|_{X,2}$ が同値ならば、点列 $\{f_k\}$ が $f$ に $\|\cdot\|_{X,1}$ で収束することと $\|\cdot\|_{X,2}$ で収束することは同値である。コーシー列であること、開集合・閉集合であることも、どちらのノルムで考えても同じである。` },
      { t: 'proof', steps: [{ text: R`$\|f_k-f\|_{X,1}\le C\|f_k-f\|_{X,2}$ と $\|f_k-f\|_{X,2}\le\frac1c\|f_k-f\|_{X,1}$ から、一方が $0$ に収束すれば他方も $0$ に収束する（はさみうち）。コーシー列も同様。開集合：$\|\cdot\|_{X,2}$ での半径 $\varepsilon$ の球は $\|\cdot\|_{X,1}$ での半径 $c\varepsilon$ の球を含み（$\|u-a\|_{X,1}<c\varepsilon\Rightarrow\|u-a\|_{X,2}<\varepsilon$）、逆も同様なので、「各点のまわりに球がとれる」という条件は両者で同じになる。` }] },
      { t: 'ex', id: 'ex-equiv-r2', title: 'ℝ² の三つのノルム', text: R`$x=(x_1,x_2)\in\mathbb{R}^2$ について $\|x\|_1:=|x_1|+|x_2|$、$\|x\|_2:=\sqrt{x_1^2+x_2^2}$、$\|x\|_\infty:=\max\{|x_1|,|x_2|\}$ はどれもノルムで、
$$\|x\|_\infty\le\|x\|_2\le\|x\|_1\le2\|x\|_\infty$$
が成り立つ（左から：$\max|x_j|^2\le x_1^2+x_2^2$、$x_1^2+x_2^2\le(|x_1|+|x_2|)^2$、$|x_1|+|x_2|\le2\max|x_j|$）。したがって三つは互いに同値である。単位球の形は違う（[[metric-space#examples|単位球の図]]）が、収束の意味は同じである。` },
      { t: 'thm', id: 'thm-equiv-fin', title: '有限次元ではすべてのノルムが同値', yomi: 'ゆうげんじげんのるむのどうち', imp: 3, text: R`$X$ を $\mathbb{K}$ 上の線形空間で $\dim X=d<\infty$（$d\in\mathbb{N}$）とする。このとき $X$ の任意の二つのノルムは同値である。` },
      { t: 'strategy', text: R`基底 $e_1,\dots,e_d$ の係数の最大値 $\|f\|_0:=\max|c_j|$ という「基準のノルム」を作り、任意のノルムがこれと同値であることを示す。上からの評価は三角不等式だけで出る。下からの評価が本題で、係数の「単位球面」$S=\{\max|c_j|=1\}$ がコンパクトであることと、そこでの最小値が正であることを使う。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>ステップ 1：基準のノルム。</b>$X$ の線形独立な元 $e_1,\dots,e_d$ をとる。[[vector-space#prop-basis|基底の命題]]より、任意の $f\in X$ は $f=\sum_{j=1}^dc_je_j$（$c_j\in\mathbb{K}$）と一意に表される。$\|f\|_0:=\max_{1\le j\le d}|c_j|$ とおくと、これはノルムである：(i) $\|f\|_0=0$ ならすべての $c_j=0$ で $f=0$。(ii) $\alpha f$ の係数は $\alpha c_j$（一意性）なので $\|\alpha f\|_0=|\alpha|\|f\|_0$。(iii) $f+g$ の係数は $c_j+c_j'$ なので $\max|c_j+c_j'|\le\max|c_j|+\max|c_j'|$。` },
          {
            text: R`<b>ステップ 2：上からの評価。</b>$\|\cdot\|$ を $X$ の任意のノルムとし、$M:=\sum_{j=1}^d\|e_j\|>0$ とおく。`,
            eqs: [[R`\|f\|=\Bigl\|\sum_{j=1}^dc_je_j\Bigr\|\le\sum_{j=1}^d|c_j|\,\|e_j\|\le\Bigl(\max_j|c_j|\Bigr)\sum_{j=1}^d\|e_j\|=M\|f\|_0.`, R`三角不等式（帰納法）・斉次性`]],
          },
          { text: R`<b>ステップ 3：関数 φ とその連続性。</b>$\varphi:\mathbb{K}^d\to\mathbb{R}$, $\varphi(c):=\bigl\|\sum_{j=1}^dc_je_j\bigr\|$ と定める。$c,c'\in\mathbb{K}^d$ について、逆向きの三角不等式とステップ 2 の計算より $|\varphi(c)-\varphi(c')|\le\bigl\|\sum(c_j-c_j')e_j\bigr\|\le M\max_j|c_j-c_j'|$。$\max_j|c_j-c_j'|\le\|c-c'\|$（$\mathbb{K}^d$ のユークリッドノルム。[[euclidean-space#cor-norm-rn|成分は長さ以下]]）なので、$\varphi$ は $\mathbb{K}^d$ 上でリプシッツ連続である。` },
          { text: R`<b>ステップ 4：S のコンパクト性。</b>$S:=\{c\in\mathbb{K}^d\mid\max_j|c_j|=1\}$ とおく（資料の「$\mathbb{K}^n$」は $\mathbb{K}^d$ の誤植）。$c\mapsto\max_j|c_j|$ は連続なので $S$ は $\{1\}$ の逆像として閉集合（[[metric-continuity#ex-level|例]]）、また $\|c\|\le\sqrt d\max|c_j|=\sqrt d$ なので有界。$\mathbb{K}^d$ は $\mathbb{R}^d$（$\mathbb{K}=\mathbb{R}$）または $\mathbb{R}^{2d}$（$\mathbb{K}=\mathbb{C}$）と同一視できるので、[[compactness#thm-heine-borel|有界閉集合は点列コンパクト]]。` },
          { text: R`<b>ステップ 5：最小値は正。</b>[[compactness#thm-compact-max|最大値・最小値の定理]]より、$\varphi$ は $S$ 上で最小値 $m=\varphi(c^*)$（$c^*\in S$）をとる。もし $m=0$ なら $\sum c^*_je_j=0$ で、線形独立性より $c^*=0$ となるが、$\max|c^*_j|=1$ に反する。よって $m>0$。` },
          {
            text: R`<b>ステップ 6：下からの評価。</b>$f\ne0$ とし $g:=\frac f{\|f\|_0}$ とおくと、$g$ の係数 $\frac{c_j}{\|f\|_0}$ の最大絶対値は $1$ なので、係数の組は $S$ に属し $\|g\|\ge m$。`,
            eqs: [[R`m\|f\|_0\le\|f\|_0\,\|g\|=\Bigl\|\|f\|_0\,g\Bigr\|=\|f\|.`, R`斉次性`]],
          },
          { text: R`$f=0$ なら両辺 $0$。以上で $m\|f\|_0\le\|f\|\le M\|f\|_0$（$f\in X$）。任意の二つのノルム $\|\cdot\|_{X,1},\|\cdot\|_{X,2}$ について、それぞれの定数を $m_1,M_1,m_2,M_2$ とすれば $\|u\|_{X,1}\le M_1\|u\|_0\le\frac{M_1}{m_2}\|u\|_{X,2}$、同様に $\|u\|_{X,1}\ge\frac{m_1}{M_2}\|u\|_{X,2}$。よって同値である。` },
        ],
      },
      { t: 'rem', title: '無限次元では同値でないノルムがある', text: R`$C([0,1])$ の最大値ノルム $\|\cdot\|_{C}$ と積分ノルム $\|\cdot\|_{R^1}$ は同値でない。$f_k(x)=x^k$ とすると $\|f_k\|_{R^1}=\int_0^1x^kdx=\frac1{k+1}\to0$ だが $\|f_k\|_C=1$。もし $\|f\|_C\le C\|f\|_{R^1}$ なら $1\le\frac C{k+1}$ がすべての $k$ で成り立つことになり矛盾する。$f_k\to0$ かどうかが、ノルムの選び方で変わってしまう（[[banach-space#ex-c-l1|完備性も変わる]]）。` },
      { t: 'qa', q: R`証明のどこで「有限次元」を使った？`, a: R`2 か所ある。(1) 基底が有限個で、係数の最大値 $\|f\|_0$ が定義できたこと。(2) 係数の単位球面 $S\subset\mathbb{K}^d$ がコンパクトだったこと（ボルツァーノ＝ワイエルシュトラス）。無限次元の単位球面はコンパクトでない（[[compactness#thm-heine-borel|点列コンパクトの記事の注意]]）ので、(2) が崩れる。` },
      { t: 'crux', text: R`有限次元では「どのノルムで測っても収束は同じ」なので、ノルムの選び方を気にする必要がない。無限次元ではノルムの選び方そのものが問題の一部になる。偏微分方程式の研究で $L^2$、$H^s$、$L^p$ などさまざまなノルムを使い分けるのは、このためである。` },

      { t: 'h2', id: 'problems', text: '問題（テスト予想）' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$C([0,1])$ において $f_k(x)=\dfrac{x}{k}$ は最大値ノルムで $0$ に収束することを示せ。`, hint: R`$\|f_k\|_{C}=\max_{x\in[0,1]}\frac xk$。`, answer: R`$\|f_k-0\|_{C([0,1])}=\max_{0\le x\le1}\frac{|x|}k=\frac1k\to0$。よって $f_k\to0$ in $C([0,1])$。`, space: 4 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$C([0,1])$ で $\|f\|_{R^1}\le\|f\|_C$ を示し、最大値ノルムで収束する点列は積分ノルムでも収束することを示せ。`, hint: R`$|f(x)|\le\|f\|_C$ を積分する。`, answer: R`各 $x$ で $|f(x)|\le\|f\|_C$ なので、積分の単調性より $\|f\|_{R^1}=\int_0^1|f|\le\int_0^1\|f\|_C\,dx=\|f\|_C$。$\|f_k-f\|_C\to0$ なら $0\le\|f_k-f\|_{R^1}\le\|f_k-f\|_C\to0$。（逆は成り立たない：上の注意の $x^k$。）`, space: 5 },
      { t: 'problem', id: 'prob-3', level: 3, title: '発展', text: R`ノルム空間 $X$ の部分空間 $M$ が $X$ の開集合ならば、$M=X$ であることを示せ。`, hint: R`$0\in M$ のまわりの球 $N(0;\varepsilon)\subset M$。任意の $f\ne0$ を縮めて球に入れる。`, answer: R`$0\in M$ で $M$ は開集合なので、$N(0;\varepsilon)\subset M$ となる $\varepsilon>0$ がある。$f\in X$, $f\ne0$ を任意にとり、$g:=\frac{\varepsilon}{2\|f\|}f$ とおくと $\|g\|=\frac\varepsilon2<\varepsilon$ なので $g\in M$。$M$ は部分空間なので $f=\frac{2\|f\|}\varepsilon g\in M$。$0\in M$ と合わせて $M=X$。`, space: 7 },
    ],
  });
})();
