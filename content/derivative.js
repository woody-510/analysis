/* 第 5 章：微分 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'differentiability',
    title: '微分可能性',
    sub: '微分係数・片側微分・1次近似',
    yomi: 'びぶんかのうせい',
    aliases: ['びぶん', '微分', '微分係数', 'びぶんけいすう', '導関数', 'どうかんすう', '接線', 'せっせん', '微分可能', 'びぶんかのう', '右微分係数', '左微分係数', '片側微分', 'かたがわびぶん', '1次近似', 'いちじきんじ', 'ρ', 'ろー', 'カラテオドリ'],
    kind: '用語',
    field: '微分',
    grade: '1年前期',
    importance: 3,
    prereq: ['function-limit', 'continuity'],
    related: ['derivative-rules', 'rolle', 'mean-value'],
    notation: [
      R`$I\subset\mathbb{R}$：開区間（両端を含まない区間）。$f:I\to\mathbb{R}$。`,
      R`$f'(a)\in\mathbb{R}$：$a$ における微分係数（数）。$f'$：導関数（関数 $I\to\mathbb{R}$）。`,
      R`$f'_+(a)$, $f'_-(a)$：右・左微分係数。$h\to+0$ は「$h>0$ を保って $0$ に近づける」。`,
      R`$C(I)$：$I$ 上の連続関数全体。$\rho$（ロー）：1 次近似のずれを表す関数。`,
      R`$\delta=\delta(\varepsilon)>0$：$\varepsilon$ に応じて決まる正の実数。`,
    ],
    synopsis: R`$f$ が $a$ で微分可能とは、割線の傾き $\dfrac{f(x)-f(a)}{x-a}$ が $x\to a$ で一つの実数に収束すること。言い換えると、$a$ の近くで $f$ が<em>直線でよく近似できる</em>（1次近似）ことである。`,
    body: [
      { t: 'h2', id: 'intuition', text: '直感：割線から接線へ' },
      { t: 'p', text: R`グラフ上の 2 点 $P=(a,f(a))$ と $Q=(a+h,f(a+h))$ を結ぶ直線（割線）の傾きは $\dfrac{f(a+h)-f(a)}{h}$ である。これを<b class="term">差分商</b>という。$Q$ を $P$ に近づける（$h\to0$）と割線は接線に近づき、差分商の行き先が<em>接線の傾き</em>になる。` },
      { t: 'fig', type: 'tangent', preset: 'sq', caption: R`$f(x)=x^2,\ a=1$。赤い実線が割線 $PQ$、紺の破線が接線。$h\to0$ で割線の傾きは $2=f'(1)$ に近づく。$h<0$（$Q$ が左側）から近づけても同じ値になる。` },

      { t: 'h2', id: 'definition', text: '定義' },
      { t: 'def', id: 'def-diff', title: '微分可能・微分係数', yomi: 'びぶんかのう', imp: 3, text: R`$I$ を開区間、$f:I\to\mathbb{R}$、$a\in I$ とする。極限
$$f'(a):=\lim_{x\to a}\frac{f(x)-f(a)}{x-a} \tag{#}$$
が（実数として）存在するとき、$f$ は $a$ で<b class="term">微分可能</b>であるといい、$f'(a)$ を $a$ における<b class="term">微分係数</b>という。$x=a+h$ とおけば $f'(a)=\displaystyle\lim_{h\to0}\frac{f(a+h)-f(a)}{h}$ とも書ける。` },
      { t: 'ex', id: 'ex-x2-def', title: 'x² の微分係数', text: R`$f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$、$a\in\mathbb{R}$ とすると、$x\ne a$ では $\dfrac{x^2-a^2}{x-a}=x+a$ と約分できるので、$x\to a$ で $2a$ に収束する。よって $f'(a)=2a$。` },
      { t: 'qa', q: R`差分商は $x=a$ で分母が $0$ になり定義されない。それで極限をとってよいのか？`, a: R`よい。[[function-limit#def-flim|極限の定義]]は $0<|x-a|$、つまり $x\ne a$ の点しか見ない。上の例で $\frac{x^2-a^2}{x-a}=x+a$ と約分できるのも、$x\ne a$ の範囲だけを考えているからである。` },
      { t: 'qa', q: R`$h=x-a$ と置き換えてよい根拠は？`, a: R`$x$ を $a+h$ と書き直しただけである。「$0<|x-a|<\delta$ をみたす $x\in I$」と「$0<|h|<\delta$ かつ $a+h\in I$ をみたす $h$」は、$h\mapsto a+h$ によって一対一に対応する（たとえば $a=2$ なら $x=2.01\leftrightarrow h=0.01$）。対応する点どうしで差分商の値も同じなので、二つの極限の主張は同じ内容であり、同じ $\delta$ がそのまま使える。` },
      { t: 'qa', q: R`なぜ開区間で定義するのか？`, a: R`$a$ の左右両側から近づくために、$a$ の両側に $I$ の点が必要だからである。閉区間の端点のように片側にしか点がない場合は、下の[[differentiability#def-onesided|片側微分係数]]で扱う。` },
      { t: 'qa', q: R`差分商が $+\infty$ に発散するときは？`, a: R`微分可能とはいわない。微分係数は<em>実数</em>の極限値として定義されるからである。たとえば $\sqrt[3]{x}$ は $0$ で $\frac{\sqrt[3]h}{h}=\frac1{\sqrt[3]{h^2}}\to+\infty$ となり、接線は縦（垂直）になる。` },
      { t: 'fig', type: 'tangent', preset: 'cbrt', caption: R`$\sqrt[3]x$ の $a=0$。$h\to0$ で割線はどんどん立ち上がり、傾きは実数に収束しない。` },
      { t: 'def', id: 'def-deriv', title: '導関数', yomi: 'どうかんすう', imp: 2, text: R`$f$ が開区間 $I$ のすべての点で微分可能なとき、$f$ は $I$ 上で微分可能であるという。このとき $f':I\to\mathbb{R},\ x\mapsto f'(x)$ を $f$ の<b class="term">導関数</b>といい、$\dfrac{df}{dx}$ とも書く。` },
      { t: 'qa', q: R`$f'(a)$ と $f'$ は何が違う？`, a: R`$f'(a)$ は<em>数</em>、$f'$ は<em>関数</em>である。$f(x)=x^2$ なら $f'(3)=6$ は数で、$f'$ は関数 $x\mapsto2x$。$\frac{df}{dx}$ は一つの記号であり、$df$ を $dx$ で割った分数ではない。` },

      { t: 'h2', id: 'onesided', text: '片側微分係数と区間の端' },
      { t: 'def', id: 'def-onesided', title: '右微分係数・左微分係数', yomi: 'かたがわびぶんけいすう', imp: 2, text: R`$I\subset\mathbb{R}$ を区間、$f:I\to\mathbb{R}$、$a\in I$ とする（右微分係数は $a$ が $I$ の右端でないとき、左微分係数は左端でないときに考える）。
$$f'_\pm(a):=\lim_{h\to\pm0}\frac{f(a+h)-f(a)}{h}\qquad(\text{複号同順})$$
が存在するとき、$f'_+(a)$ を<b class="term">右微分係数</b>、$f'_-(a)$ を<b class="term">左微分係数</b>という。右と左はそれぞれ独立に定義され、片方だけ存在することもある。` },
      { t: 'note', title: '「複号同順」の読み方', text: R`$\pm$ と $\mp$ が並ぶ式では、上の符号どうし・下の符号どうしを組にする。上の式なら「$+$ と $+0$」「$-$ と $-0$」の二つの式をまとめて書いている。` },
      { t: 'thm', id: 'thm-onesided', title: '微分可能性と片側微分係数', yomi: 'びぶんかのうせいとかたがわびぶんけいすう', imp: 2, text: R`$I$ を開区間、$a\in I$ とする。$f$ が $a$ で微分可能であることは、$f'_+(a)$ と $f'_-(a)$ がともに存在して $f'_+(a)=f'_-(a)$ となることと同値である。このとき $f'(a)$ はその共通の値である。` },
      { t: 'proof', steps: [{ text: R`差分商 $F(h)=\frac{f(a+h)-f(a)}{h}$ に[[function-limit#prop-two-sided|両側極限と片側極限]]の命題を $h\to0$ で使うだけである。$F$ が $h=0$ で定義されないことは、極限が $h\ne0$ しか見ないので問題ない。` }] },
      { t: 'ex', id: 'ex-abs-onesided', title: '|x| は 0 で微分可能でない', text: R`$\dfrac{|h|}{h}=\begin{cases}1&(h>0)\\-1&(h<0)\end{cases}$ なので $f'_+(0)=1\ne-1=f'_-(0)$。定理より $|x|$ は $0$ で微分可能でない。` },
      { t: 'fig', type: 'tangent', preset: 'abs', caption: R`$|x|$ の $a=0$。$h>0$ と $h<0$ で割線の傾きの行き先が $1$ と $-1$ に分かれる（紺の点線は左右それぞれの方向）。` },
      { t: 'rem', title: '右微分係数は区間の右端では考えない', text: R`$I=[0,1]$、$a=1$ では、$h>0$ で $1+h\in I$ となる $h$ が一つもない。[[function-limit#rem-onesided|片側極限の注意]]と同じく、そのとき「その $h$ について差分商が $L$ に近い」はどんな $L$ でも成り立ってしまう（空虚な真）。だから右端では右微分係数を、左端では左微分係数を考えない。` },
      { t: 'def', id: 'def-closed-diff', title: '閉区間上の微分可能性', yomi: 'へいくかんじょうのびぶんかのうせい', imp: 1, text: R`$f:[a,b]\to\mathbb{R}$ が $(a,b)$ で微分可能で、$f'_+(a)$ と $f'_-(b)$ が存在するとき、$f$ は $[a,b]$ 上で微分可能であるという。このとき端点では $f'(a):=f'_+(a)$、$f'(b):=f'_-(b)$ と定める。` },
      { t: 'qa', q: R`$f$ は $[a,b]$ 上の関数なのに「$(a,b)$ で微分可能」とはどういう意味？`, a: R`$f$ を $(a,b)$ だけで考えた関数（制限 $f|_{(a,b)}$）が微分可能、という意味である。内部の点での微分係数は、その点の<em>近く</em>の値だけで決まるので、制限しても値は変わらない。` },
      { t: 'ex', id: 'ex-sqrt-end', title: '√x は 0 で右微分係数をもたない', text: R`$\dfrac{\sqrt h-0}{h}=\dfrac1{\sqrt h}\to+\infty\ (h\to+0)$ なので $f'_+(0)$ は存在しない。それでも $\sqrt x$ は $[0,1]$ で連続、$(0,1)$ で微分可能なので、[[rolle|ロルの定理]]や[[mean-value|平均値の定理]]の仮定はみたしている。これらの定理は端点での微分可能性を要求しない。` },

      { t: 'h2', id: 'rho', text: 'ρ による言い換え（1次近似）' },
      { t: 'thm', id: 'thm-rho', title: '微分可能性の 1 次近似による特徴づけ', yomi: 'びぶんかのうせいのいちじきんじによるとくちょうづけ', imp: 3, text: R`$I$ を開区間、$f:I\to\mathbb{R}$、$a\in I$ とする。$f$ が $a$ で微分可能であることは、次をみたす定数 $L\in\mathbb{R}$ と関数 $\rho:I\to\mathbb{R}$ が存在することと同値である。
$$f(x)=f(a)+(x-a)L+(x-a)\rho(x)\quad(x\in I),\qquad \rho(a)=0,\quad \rho\text{ は }a\text{ で連続}.$$
このとき $L=f'(a)$ である。` },
      { t: 'fig', type: 'linear', preset: 'sq', editable: true, caption: R`紺の破線が直線 $y=f(a)+(x-a)L$（接線）、赤い縦線がグラフとのずれ $(x-a)\rho(x)$。$x\to a$ とすると、ずれは $x-a$ よりも速く $0$ に近づく（$\rho(x)\to0$）。` },
      { t: 'strategy', text: R`(⇒) $\rho$ を「差分商 $-f'(a)$」と定めれば、等式は自動的に成り立ち、$\rho(x)\to0$ は微分可能性そのものである。(⇐) 等式を $x-a$ で割れば差分商が $L+\rho(x)$ になる。` },
      {
        t: 'proof',
        sketch: R`$\rho$ は「差分商と $f'(a)$ のずれ」にすぎない。微分可能 $\iff$ そのずれが $0$ に近づく、と言い直しているだけである。`,
        steps: [
          { text: R`<b>(⇒)</b> $L=f'(a)$ とし、$\rho(x):=\dfrac{f(x)-f(a)}{x-a}-f'(a)\ (x\ne a)$、$\rho(a):=0$ と定める。` },
          { text: R`この $\rho$ が条件をみたすことを確かめる。(i) 等式：$x\ne a$ では定義を代入して整理すれば成り立ち、$x=a$ では両辺とも $f(a)$。(ii) $\rho(a)=0$ は定義どおり。(iii) $x\to a$ で $\rho(x)\to f'(a)-f'(a)=0=\rho(a)$ なので、$\rho$ は $a$ で連続。`, why: R`(iii) は[[function-limit#cor-flim-arith|関数の極限の四則演算]]による。言えるのは「$a$ で連続」までで、$I$ 全体での $\rho$ の連続性は一般には言えない（下の注意）。` },
          { text: R`<b>(⇐)</b> $x\ne a$ で等式の両辺を $x-a$ で割ると`, eqs: [[R`\frac{f(x)-f(a)}{x-a}=L+\rho(x)\ \xrightarrow[x\to a]{}\ L+\rho(a)=L.`, R`$\rho$ は $a$ で連続`]] },
          { text: R`よって $f$ は $a$ で微分可能で、$f'(a)=L$。` },
        ],
      },
      { t: 'qa', q: R`$\rho(a)=0$ という条件は何のため？`, a: R`$x=a$ では $(x-a)\rho(x)=0$ なので、等式は $\rho(a)$ の値に関係なく成り立つ。$\rho(a)=0$ と決めておくと、「$\rho$ は $a$ で連続」が「$\rho(x)\to0$」とちょうど同じ意味になる。` },
      { t: 'qa', q: R`$L$ や $\rho$ は一つに決まる？`, a: R`$L$ は差分商の極限値なので、[[function-limit#thm-flim-unique|極限の一意性]]から一つに決まる。$\rho$ も $x\ne a$ では等式から $\rho(x)=\frac{f(x)-f(a)}{x-a}-L$ と決まってしまう。` },
      { t: 'rem', title: 'ρ に「区間全体で連続」までは求められない', text: R`$I=\mathbb{R}$、$a=0$、$f(x)=\begin{cases}0&(x<1)\\1&(x\ge1)\end{cases}$（階段関数）とする。$0$ の近くで $f\equiv0$ なので $f'(0)=0$ で微分可能である。しかし $x\ne0$ では等式から $\rho(x)=\frac{f(x)}{x}$ と決まり、これは $x=1$ で $0$ から $1$ に跳ぶ。選び直す余地はないので、$\rho$ に $I$ 全体での連続性を要求すると定理は偽になる。微分可能性は<em>$a$ の近くだけ</em>で決まる性質だからである。` },
      { t: 'fig', type: 'plot', preset: 'rho', caption: R`階段関数 $f$（黒）と $\rho(x)=f(x)/x$（赤の破線）。原点の近くは平らなので $f'(0)=0$ だが、$\rho$ は $x=1$ で跳ぶ。` },
      { t: 'qa', q: R`この言い換えは何の役に立つ？`, a: R`割り算を使わずに微分可能性を表せることである。① 多変数関数では「$x-a$ で割る」ことができない（ベクトルでは割れない）ので、この形がそのまま全微分の定義になる。② [[derivative-rules#thm-chain|合成関数の微分法]]を、$0$ で割る危険なしに証明できる。` },

      { t: 'h2', id: 'continuity', text: '微分可能性と連続性' },
      { t: 'thm', id: 'thm-diff-cont', title: '微分可能ならば連続', yomi: 'びぶんかのうならばれんぞく', imp: 2, text: R`$I\subset\mathbb{R}$ を開区間、$f:I\to\mathbb{R}$、$a\in I$ とする。$f$ が $a$ で微分可能ならば、$f$ は $a$ で連続である。` },
      {
        t: 'proof',
        sketch: R`1 次近似の式 $f(x)=f(a)+(x-a)f'(a)+(x-a)\rho(x)$ で $x\to a$ とすれば、後ろの 2 項が消える。`,
        steps: [
          { text: R`[[differentiability#thm-rho|1 次近似による特徴づけ]]より $f(x)=f(a)+(x-a)f'(a)+(x-a)\rho(x)$（$\rho(x)\to0$）と書ける。` },
          { text: R`$x\to a$ のとき $(x-a)\to0$、$\rho(x)\to0$ なので、右辺は $f(a)$ に収束する。よって $\displaystyle\lim_{x\to a}f(x)=f(a)$、すなわち $f$ は $a$ で連続である。`, why: R`ここで使うのは $\rho$ の<em>$a$ での</em>連続性だけである。$\rho$ を使わずに書くなら、$x\ne a$ で $f(x)=f(a)+\frac{f(x)-f(a)}{x-a}\cdot(x-a)\to f(a)+f'(a)\cdot0$ としてもよい。` },
        ],
      },
      { t: 'rem', title: '逆は成り立たない', text: R`$|x|$ は $0$ で連続だが微分可能でない（上の[[differentiability#ex-abs-onesided|例]]）。また、右微分係数 $f'_+(a)$ が存在すれば、同じ証明を右側だけで行って、$f$ は $a$ で右から連続であることがわかる。` },
      { t: 'ex', id: 'ex-x2d', title: 'x²D(x) は 0 でだけ微分可能', text: R`$D:\mathbb{R}\to\mathbb{R}$ を[[continuity#ex-dirichlet|ディリクレ関数]]とし、$f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2D(x)$ とおく。$\left|\frac{f(h)-f(0)}{h}\right|=|h|D(h)\le|h|\to0$ なので、$f$ は $0$ で微分可能で $f'(0)=0$。一方 $a\ne0$ では、$a$ の近くで値が $x^2$ と $0$ の間を行き来するので連続でなく、したがって微分可能でもない。「一点でだけ微分可能」な関数も存在する。` },
      { t: 'fig', type: 'plot', preset: 'xxd', caption: R`$x^2D(x)$ の模式図（実際の値は、有理数で上の曲線、無理数で $x$ 軸上にある）。$0$ と $x^2$ に挟まれるので、原点での接線は $x$ 軸になる。` },

      { t: 'h2', id: 'graph', text: 'グラフで確かめる' },
      { t: 'p', text: R`式と点 $a$ を変え、$h$ を $0$ に近づけてみよう。<code>x*abs(x)</code> は $0$ で微分可能（傾き $0$）、<code>cbrt(x)</code> は接線が垂直になるので微分可能でない。` },
      { t: 'fig', type: 'tangent', preset: 'sin', editable: true, caption: R`割線の傾きと微分係数の比較。微分可能でない点では、左右の傾きの違いや、傾きの発散が表示される。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-diff-1', level: 1, title: '基本', text: R`定義に従って、$f(x)=x^3$ の微分係数 $f'(a)$ を求めよ。`, hint: R`$x^3-a^3=(x-a)(x^2+ax+a^2)$。`, answer: R`$x\ne a$ で $\dfrac{x^3-a^3}{x-a}=x^2+ax+a^2\to3a^2\ (x\to a)$。よって $f'(a)=3a^2$。`, space: 4 },
      { t: 'problem', id: 'prob-diff-2', level: 2, title: '標準', text: R`$f(x)=x|x|$ は $x=0$ で微分可能か。可能ならば $f'(0)$ を求めよ。また、1 次近似の形で $\rho$ を具体的に書け。`, hint: R`$\dfrac{f(h)-f(0)}{h}=|h|$。`, answer: R`$\dfrac{f(h)-f(0)}{h}=\dfrac{h|h|}{h}=|h|\to0$ なので微分可能で $f'(0)=0$。$f(x)=0+x\cdot0+x\cdot|x|$ より $\rho(x)=|x|$（$\rho(0)=0$、$0$ で連続）。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'derivative-rules',
    title: '微分の計算規則',
    sub: '四則演算・合成関数・逆関数',
    yomi: 'びぶんのけいさんきそく',
    aliases: ['積の微分', 'せきのびぶん', '商の微分', 'しょうのびぶん', '合成関数の微分', 'ごうせいかんすうのびぶん', '連鎖律', 'れんさりつ', 'チェインルール', '逆関数の微分', 'ぎゃくかんすうのびぶん', 'らいぷにっつ'],
    kind: '定理',
    field: '微分',
    grade: '1年前期',
    importance: 3,
    prereq: ['differentiability'],
    related: ['differentiability', 'mean-value'],
    notation: [
      R`$I,J\subset\mathbb{R}$：開区間。$c_1,c_2\in\mathbb{R}$：定数。`,
      R`$f\circ g$：合成関数 $(f\circ g)(x)=f(g(x))$。$g(I)\subset J$ は「$g$ の値がすべて $J$ に入る」。`,
      R`$f^{-1}$：逆関数（[[maps#def-inverse|逆写像]]）。`,
    ],
    synopsis: R`和・積・商・合成の微分公式を、定義から証明する。積の微分では「微分可能なら連続」が効き、合成関数の微分では 1 次近似の形を使うことで「$0$ で割ってしまう」穴を避けられる。`,
    body: [
      { t: 'h2', id: 'arith', text: '四則演算' },
      { t: 'thm', id: 'thm-arith-diff', title: '微分と四則演算', yomi: 'びぶんとしそくえんざん', imp: 3, text: R`$I$ を開区間、$f,g:I\to\mathbb{R}$ が $a\in I$ で微分可能とする。$c_1,c_2$ を定数とすると
<ol><li>$(c_1f+c_2g)'(a)=c_1f'(a)+c_2g'(a)$</li><li>$(fg)'(a)=f'(a)g(a)+f(a)g'(a)$</li><li>$g(a)\ne0$ ならば $\left(\dfrac fg\right)'(a)=\dfrac{f'(a)g(a)-f(a)g'(a)}{g(a)^2}$</li></ol>` },
      { t: 'rem', title: '「I は開区間」を省かない', text: R`「$I\subset\mathbb{R}$」とだけ書くと、$I=\mathbb{N}$ のような点がばらばらの集合も含まれ、そもそも微分係数が定義されない。[[differentiability#def-diff|定義]]に合わせて開区間とする。` },
      { t: 'strategy', text: R`積は、分子に $f(a)g(a+h)$ を引いて足し、「$f$ だけ動かした差」と「$g$ だけ動かした差」に分ける。商は先に $\left(\frac1g\right)'=-\frac{g'}{g^2}$ を示し、$\frac fg=f\cdot\frac1g$ として積に帰着させる。` },
      {
        t: 'proof',
        sketch: R`(1) は差分商が線形に分かれるだけ。(2) は $\frac{f(a+h)-f(a)}{h}g(a+h)+f(a)\frac{g(a+h)-g(a)}{h}$ と分け、$g(a+h)\to g(a)$（微分可能なら連続）を使う。(3) は $\frac1g$ の微分と積の組み合わせ。`,
        steps: [
          { text: R`<b>(1)</b> $\dfrac{(c_1f+c_2g)(a+h)-(c_1f+c_2g)(a)}{h}=c_1\dfrac{f(a+h)-f(a)}{h}+c_2\dfrac{g(a+h)-g(a)}{h}\to c_1f'(a)+c_2g'(a)$。` },
          { text: R`<b>(2)</b> 分子を変形する。`, eqs: [
            [R`f(a+h)g(a+h)-f(a)g(a)`, R`もとの分子`],
            [R`=\bigl(f(a+h)-f(a)\bigr)g(a+h)+f(a)\bigl(g(a+h)-g(a)\bigr)`, R`$f(a)g(a+h)$ を引いて足す`],
          ] },
          { text: R`$h$ で割って $h\to0$ とすると、$\dfrac{f(a+h)-f(a)}{h}\cdot g(a+h)+f(a)\cdot\dfrac{g(a+h)-g(a)}{h}\to f'(a)g(a)+f(a)g'(a)$。`, why: R`$g(a+h)\to g(a)$ は、$g$ が $a$ で微分可能だから[[differentiability#thm-diff-cont|連続]]であることによる。各部分の極限が存在するので、[[function-limit#cor-flim-arith|四則演算]]により全体の極限も存在する。等式の列は「右端の極限が存在する → だから左端の極限も存在する」と右から左へ読む。` },
          { text: R`<b>(3)</b> $g$ は $a$ で連続で $g(a)\ne0$ なので、$|h|$ が十分小さければ $g(a+h)\ne0$。そのとき`, eqs: [
            [R`\frac1h\left(\frac1{g(a+h)}-\frac1{g(a)}\right)=-\frac{g(a+h)-g(a)}{h}\cdot\frac1{g(a+h)\,g(a)}`, R`通分する`],
            [R`\xrightarrow[h\to0]{}\ -\frac{g'(a)}{g(a)^2}.`, R`$g(a+h)\to g(a)\ne0$`],
          ], why: R`$g(a+h)\ne0$ は[[intermediate-value#lem-sign|符号の保存]]（$g(a)>0$ なら近くでも $g>0$、$g(a)<0$ なら近くでも $g<0$）から従う。分母が $0$ にならないことを先に確保してから割る。` },
          { text: R`$\left(\frac1g\right)'(a)=-\frac{g'(a)}{g(a)^2}$ と (2) から、$\left(\frac fg\right)'(a)=\left(f\cdot\frac1g\right)'(a)=\frac{f'(a)}{g(a)}-\frac{f(a)g'(a)}{g(a)^2}=\frac{f'(a)g(a)-f(a)g'(a)}{g(a)^2}$。` },
        ],
      },
      { t: 'ex', id: 'ex-power', title: '(xⁿ)′ = n xⁿ⁻¹（n は整数）', text: R`$n\ge1$ のときは帰納法で示す。$(x)'=1$ であり、$(x^n)'=nx^{n-1}$ と仮定すると、積の微分より $(x^{n+1})'=(x\cdot x^n)'=1\cdot x^n+x\cdot nx^{n-1}=(n+1)x^n$。$n=-m\ (m\ge1)$ のときは、$x\ne0$ で商の微分より $(x^{-m})'=\left(\frac1{x^m}\right)'=-\frac{mx^{m-1}}{x^{2m}}=-mx^{-m-1}$。` },

      { t: 'h2', id: 'chain', text: '合成関数の微分' },
      { t: 'thm', id: 'thm-chain', title: '合成関数の微分法', yomi: 'ごうせいかんすうのびぶんほう', imp: 3, text: R`$I,J$ を開区間、$g:I\to\mathbb{R}$ で $g(I)\subset J$、$f:J\to\mathbb{R}$ とする。$g$ が $a\in I$ で微分可能、$f$ が $b=g(a)$ で微分可能ならば、$f\circ g$ は $a$ で微分可能で
$$(f\circ g)'(a)=f'(g(a))\,g'(a). \tag{#}$$` },
      { t: 'rem', title: 'よく見る証明の穴', text: R`$\dfrac{f(g(x))-f(g(a))}{x-a}=\dfrac{f(g(x))-f(g(a))}{g(x)-g(a)}\cdot\dfrac{g(x)-g(a)}{x-a}$ と変形する証明は、$g(x)=g(a)$ となる $x$ が $a$ のいくらでも近くにあると成り立たない（$0$ で割っている）。たとえば $g$ が定数関数や、$g(x)=x^2\sin\frac1x\ (x\ne0),\ g(0)=0$ のような関数がそうである。` },
      { t: 'strategy', text: R`割り算を使わない[[differentiability#thm-rho|1 次近似の形]]で $g$ と $f$ を書き、代入する。$0$ で割る場面が一度も出てこない。` },
      {
        t: 'proof',
        sketch: R`$g(x)-g(a)=(x-a)(g'(a)+\sigma(x))$、$f(y)-f(b)=(y-b)(f'(b)+\rho(y))$ を代入すると、$f(g(x))-f(g(a))=(x-a)(g'(a)+\sigma(x))(f'(b)+\rho(g(x)))$。$x\to a$ で後ろの因子は $g'(a)f'(b)$ に近づく。`,
        steps: [
          { text: R`1 次近似の形より、$a$ で連続で $\sigma(a)=0$ の $\sigma$ と、$b$ で連続で $\rho(b)=0$ の $\rho$ を用いて`, eqs: [
            [R`g(x)-g(a)=(x-a)\bigl(g'(a)+\sigma(x)\bigr)\quad(x\in I),`, R`$g$ は $a$ で微分可能`],
            [R`f(y)-f(b)=(y-b)\bigl(f'(b)+\rho(y)\bigr)\quad(y\in J)`, R`$f$ は $b$ で微分可能`],
          ] },
          { text: R`2 番目の式に $y=g(x)$ を代入し、1 番目の式を使うと`, eqs: [
            [R`f(g(x))-f(g(a))=\bigl(g(x)-g(a)\bigr)\bigl(f'(b)+\rho(g(x))\bigr)`, R`$b=g(a)$`],
            [R`=(x-a)\bigl(g'(a)+\sigma(x)\bigr)\bigl(f'(b)+\rho(g(x))\bigr).`, R`1 番目の式`],
          ] },
          { text: R`$\tau(x):=\bigl(g'(a)+\sigma(x)\bigr)\bigl(f'(b)+\rho(g(x))\bigr)-g'(a)f'(b)$ とおくと、$f(g(x))=f(g(a))+(x-a)\,g'(a)f'(b)+(x-a)\tau(x)$ であり、$\tau(a)=0$。` },
          { text: R`$\tau$ は $a$ で連続である。よって 1 次近似による特徴づけ（⇐）から、$f\circ g$ は $a$ で微分可能で $(f\circ g)'(a)=g'(a)f'(b)$。`, why: R`$\sigma$ は $a$ で連続。$g$ は $a$ で微分可能なので連続、$\rho$ は $b=g(a)$ で連続なので、[[continuity#prop-cont-comp|合成]] $\rho\circ g$ は $a$ で連続。連続関数の和と積は連続なので、$\tau$ も $a$ で連続である。` },
        ],
      },
      { t: 'crux', text: R`「$x-a$ で割った形」ではなく「$x-a$ を掛けた形」で微分可能性を表すと、合成しても<em>割り算が一度も出てこない</em>。$g(x)=g(a)$ となる点がいくらあっても、議論は崩れない。` },
      { t: 'ex', id: 'ex-chain', title: '((x² + 1)⁵)′', text: R`$g(x)=x^2+1$、$f(y)=y^5$ とすると、$((x^2+1)^5)'=f'(g(x))g'(x)=5(x^2+1)^4\cdot2x=10x(x^2+1)^4$。` },

      { t: 'h2', id: 'inverse', text: '逆関数の微分' },
      { t: 'thm', id: 'thm-inv-diff', title: '逆関数の微分法', yomi: 'ぎゃくかんすうのびぶんほう', imp: 2, text: R`$I\subset\mathbb{R}$ を開区間、$f\in C(I)$ は狭義単調とし、$a\in I$ で微分可能かつ $f'(a)\ne0$ とする。このとき $J:=f(I)$ は開区間で、逆関数 $f^{-1}:J\to I$ は $b=f(a)$ で微分可能で、$(f^{-1})'(b)=\dfrac1{f'(a)}$ である。` },
      { t: 'note', title: '証明は逆関数の連続性のあとで', text: R`証明には「連続で狭義単調な関数の逆関数は連続」という事実が必要で、これは連続関数の章で扱う。公式そのものは、$f(f^{-1}(y))=y$ を[[derivative-rules#thm-chain|合成関数の微分法]]で微分すると $f'(f^{-1}(y))\,(f^{-1})'(y)=1$ となることから覚えられる。` },
      { t: 'qa', q: R`条件 $f'(a)\ne0$ は外せる？`, a: R`外せない。$f(x)=x^3$ は狭義増加で微分可能だが $f'(0)=0$ であり、逆関数 $\sqrt[3]y$ は $0$ で微分可能でない（接線が垂直）。グラフを直線 $y=x$ で折り返すと、水平な接線は垂直な接線になる。` },
      { t: 'fig', type: 'plot', preset: 'inv', caption: R`$x^3$（黒）とその逆関数 $\sqrt[3]x$（赤の破線）。原点で $x^3$ の接線は水平、$\sqrt[3]x$ の接線は垂直。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-rules-1', level: 1, title: '基本', text: R`$h(x)=\dfrac{x}{x^2+1}$ の導関数を求めよ。`, answer: R`商の微分より $h'(x)=\dfrac{1\cdot(x^2+1)-x\cdot2x}{(x^2+1)^2}=\dfrac{1-x^2}{(x^2+1)^2}$。`, space: 4 },
      { t: 'problem', id: 'prob-rules-2', level: 2, title: '標準', text: R`$g$ が $a$ で微分可能で $g(a)\ne0$ のとき、$\left(\dfrac1g\right)'(a)=-\dfrac{g'(a)}{g(a)^2}$ を、合成関数の微分法を使って導け。`, hint: R`$\frac1g=f\circ g$、$f(y)=\frac1y$ とみる。$f'(y)=-\frac1{y^2}$（$y\ne0$）。`, answer: R`$f(y)=\frac1y$ は $y\ne0$ で微分可能で $f'(y)=-\frac1{y^2}$。$g(a)\ne0$ なので $f$ は $g(a)$ の近くの開区間で定義され、合成関数の微分法より $\left(\frac1g\right)'(a)=f'(g(a))g'(a)=-\frac{g'(a)}{g(a)^2}$。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'rolle',
    title: 'ロルの定理',
    sub: '',
    yomi: 'ろるのていり',
    aliases: ['ろる', 'ふぇるまーのほだい', 'フェルマーの補題', '極値', 'きょくち', '極大', '極小'],
    kind: '定理',
    field: '微分',
    grade: '1年前期',
    importance: 3,
    prereq: ['differentiability', 'extreme-value'],
    related: ['mean-value', 'cauchy-mean-value', 'extreme-value'],
    notation: [
      R`$a,b\in\mathbb{R}$, $a<b$。$f\in C([a,b])$：$f:[a,b]\to\mathbb{R}$ は連続。`,
      R`「$f$ は $(a,b)$ で微分可能」：$f$ を $(a,b)$ に制限した関数が、$(a,b)$ の各点で微分可能。`,
      R`$f\equiv\text{const.}$：$f$ は定数関数。`,
    ],
    synopsis: R`両端で同じ高さの、なめらかにつながった関数のグラフには、傾きが $0$ になる点（水平な接線）が途中に必ずある。「最大値の存在」と「頂上では傾き $0$」を組み合わせた定理で、平均値の定理・コーシーの平均値の定理の土台になる。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-rolle', title: 'ロルの定理', yomi: 'ろるのていり', imp: 3, text: R`$a,b\in\mathbb{R}$, $a<b$ とし、$f\in C([a,b])$ は $(a,b)$ で微分可能で、$f(a)=f(b)$ とする。このとき、$f'(c)=0$ となる $c\in(a,b)$ が存在する。` },
      { t: 'rem', title: '「a < b」を書く理由', text: R`$a=b$ だと $(a,b)=\varnothing$ となり、$c$ をとる場所がない。区間の定義で $a<b$ が約束されているなら確認にすぎないが、主張に明示しておくと誤解がない。` },
      { t: 'fig', type: 'rolle', preset: 'poly', editable: true, caption: R`両端の高さが等しい（黒い点、赤い破線の弦が水平）。紺の点 $c$ で接線が水平になる。$c$ は一つとは限らない。` },

      { t: 'h2', id: 'fermat', text: 'フェルマーの補題' },
      { t: 'lem', id: 'lem-fermat', title: 'フェルマーの補題', yomi: 'ふぇるまーのほだい', imp: 2, text: R`$I\subset\mathbb{R}$ を開区間、$f:I\to\mathbb{R}$ とし、$f$ が $c\in I$ で $I$ 上の最大値をとるとする（すべての $x\in I$ で $f(x)\le f(c)$）。$f$ が $c$ で微分可能ならば、$f'(c)=0$ である。最小値の場合も同様である。` },
      { t: 'fig', type: 'tangent', preset: 'peak', caption: R`頂上 $a=1$ から右へ行く割線（$h>0$）は下り坂で傾き $\le0$、左から頂上へ来る割線（$h<0$）は上り坂で傾き $\ge0$。両方の行き先が同じ $f'(c)$ なので、$f'(c)=0$ しかありえない。` },
      { t: 'strategy', text: R`頂上 $c$ の右側と左側で、差分商の符号が逆になる。$h\to+0$ と $h\to-0$ を<em>別々に</em>とり、[[function-limit#prop-flim-order|関数の極限と不等式]]を使う。` },
      {
        t: 'proof',
        sketch: R`右から近づけた差分商は $0$ 以下、左から近づけた差分商は $0$ 以上。どちらも同じ $f'(c)$ に収束するので $f'(c)=0$。`,
        steps: [
          { text: R`$c$ は開区間 $I$ の内部の点なので、$(c-\delta_0,c+\delta_0)\subset I$ となる $\delta_0>0$ がある。$0<|h|<\delta_0$ ならば $c+h\in I$ なので $f(c+h)-f(c)\le0$。` },
          { text: R`差分商の符号を見る。`, eqs: [
            [R`\frac{f(c+h)-f(c)}{h}\le0\quad(0<h<\delta_0),`, R`分子 $\le0$、分母 $>0$`],
            [R`\frac{f(c+h)-f(c)}{h}\ge0\quad(-\delta_0<h<0).`, R`分子 $\le0$、分母 $<0$`],
          ] },
          { text: R`$f$ は $c$ で微分可能なので、[[differentiability#thm-onesided|片側微分係数]] $f'_+(c),f'_-(c)$ が存在して $f'(c)$ に等しい。関数の極限と不等式より $f'_+(c)\le0$、$f'_-(c)\ge0$。`, why: R`符号が右と左で逆なので、「$h\to0$」をひとまとめにすると不等式が言えない。$h\to+0$ と $h\to-0$ に分け、それぞれの極限が<em>存在すること</em>を先に確保してから、極限と不等式の命題を使う。` },
          { text: R`したがって $0\le f'_-(c)=f'(c)=f'_+(c)\le0$、すなわち $f'(c)=0$。最小値の場合は $-f$ に適用する。` },
        ],
      },
      { t: 'rem', title: '端点では成り立たない', text: R`補題は $c$ が<em>開区間の内部</em>にあることを使っている（$\delta_0$ がとれる）。閉区間の端点で最大になる場合、たとえば $f(x)=x$ の $[0,1]$ 上の最大点 $x=1$ では、片側からしか近づけず、$f'(c)=0$ とは限らない。` },

      { t: 'h2', id: 'proof', text: '証明' },
      { t: 'strategy', text: R`[[extreme-value|最大値・最小値の定理]]で最大点と最小点をとる。両方が端点の値なら $f$ は定数。そうでなければ、どちらかが区間の内部にあり、そこで[[rolle#lem-fermat|フェルマーの補題]]が使える。` },
      {
        t: 'proof',
        sketch: R`最大値 $M$ と最小値 $m$ がともに $f(a)=f(b)$ なら定数関数で、どこでも $f'=0$。そうでなければ最大か最小が内部でとられ、そこで傾きが $0$。`,
        steps: [
          { text: R`$f$ は $[a,b]$ で連続なので、最大値・最小値の定理より、最大値 $M=f(x_M)$ と最小値 $m=f(x_m)$（$x_M,x_m\in[a,b]$）が存在する。` },
          { text: R`<b>$M=m$ の場合</b>：すべての $x$ で $m\le f(x)\le M=m$ なので $f$ は定数（$f\equiv\text{const.}$）である。差分商はつねに $0$ なので、任意の $c\in(a,b)$ で $f'(c)=0$。` },
          { text: R`<b>$M>m$ の場合</b>：$M$ と $m$ のうち少なくとも一方は $f(a)\,(=f(b))$ と異なる。$M\ne f(a)$ としよう。すると $x_M\ne a$ かつ $x_M\ne b$、つまり $x_M\in(a,b)$。`, why: R`もし $M=f(a)$ かつ $m=f(a)$ なら $M=m$ となり、場合分けに反する。また $x_M=a$ なら $M=f(a)$、$x_M=b$ なら $M=f(b)=f(a)$ となるので、$x_M$ は端点ではない。` },
          { text: R`$f$ は開区間 $(a,b)$ 上で $x_M$ において最大値をとり、$x_M$ で微分可能なので、フェルマーの補題より $f'(x_M)=0$。$c=x_M$ とおけばよい。$m\ne f(a)$ の場合は、最小点 $x_m$ に同じ議論を行う（フェルマーの補題の最小値版）。` },
        ],
      },
      { t: 'qa', q: R`最大値をとる点が「内側にある」のは、不等式だけで言えるのか？ 値が振動して最大値をとらない場合は？`, a: R`最大値を<em>とる点の存在</em>は、不等式ではなく最大値・最小値の定理で保証している（閉区間上の連続関数は、値を実際にとる点がある）。だから「近づくだけでとらない」場合はすでに除かれている。不等式の役目は、その点が端点でないことを示すことだけである。端点での連続性を外すと、最大値をとらない例ができる（下の図）。` },
      { t: 'qa', q: R`「最小値の場合も同様」の中身は？`, a: R`$-f$ を考えればよい。$-f$ も定理の仮定をみたし、$f$ の最小点は $-f$ の最大点である。そこで $(-f)'(c)=0$ なら $f'(c)=-(-f)'(c)=0$。` },
      { t: 'crux', text: R`「最大値が存在する」（最大値・最小値の定理）＋「頂上では傾き $0$」（フェルマーの補題）。前者は<em>実数の連続性</em>から、後者は<em>微分の定義</em>から来る。両端の高さが等しいという条件は、最大点か最小点を内部に押し込むためだけに使われる。` },

      { t: 'h2', id: 'counter', text: '仮定を外すと' },
      { t: 'p', text: R`三つの仮定（$[a,b]$ で連続・$(a,b)$ で微分可能・$f(a)=f(b)$）は、どれを外しても結論が崩れる。` },
      { t: 'fig', type: 'rolle', preset: 'jumpend', caption: R`<b>端点で連続でない</b>：$f(x)=x\ (0\le x<1)$、$f(1)=0$。$f(0)=f(1)$ で $(0,1)$ では微分可能だが $f'=1$。$x=1$ での不連続が、最大点を「区間の外」に逃がしている（最大値・最小値の定理の反例にもなる）。` },
      { t: 'fig', type: 'rolle', preset: 'abs', caption: R`<b>途中で微分可能でない</b>：$|x|$ on $[-1,1]$。$f(-1)=f(1)$ だが、$x=0$（×印）で微分可能でない。傾きは $-1$ か $1$ しかとらない。` },
      { t: 'fig', type: 'rolle', preset: 'lin', caption: R`<b>$f(a)\ne f(b)$</b>：$x$ on $[0,1]$。傾きはずっと $1$。両端の高さが違えば、水平な接線はなくてよい（ただし[[mean-value|平均値の定理]]は成り立つ）。` },

      { t: 'h2', id: 'more', text: '結論について' },
      { t: 'qa', q: R`端点で微分可能でなくてもよい？`, a: R`よい。定理が要求するのは $(a,b)$ での微分可能性だけである。たとえば半円 $\sqrt{1-x^2}$ は $x=\pm1$ で接線が垂直になり微分可能でないが、$[-1,1]$ で連続・$(-1,1)$ で微分可能なので、$c=0$ がとれる。` },
      { t: 'fig', type: 'rolle', preset: 'semi', caption: R`半円 $\sqrt{1-x^2}$ on $[-1,1]$。両端では接線が垂直だが、頂上 $c=0$ で水平な接線がある。` },
      { t: 'qa', q: R`$c$ は一つ？`, a: R`一つとは限らない。定理は「少なくとも一つ存在する」と言っている。たとえば $\sin x$ on $[0,2\pi]$ では $c=\frac\pi2,\frac{3\pi}2$ の二つ。` },
      { t: 'fig', type: 'rolle', preset: 'sin2', caption: R`$\sin x$ on $[0,2\pi]$。山と谷の両方で接線が水平になる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-rolle-1', level: 2, title: '標準', text: R`方程式 $x^3+x-1=0$ は、実数解をちょうど一つもつことを示せ。`, hint: R`存在は[[intermediate-value|中間値の定理]]。一意性は、解が二つあると仮定してロルの定理を使う。`, answer: R`$f(x)=x^3+x-1$ とする。$f(0)=-1<0<1=f(1)$ より、中間値の定理から解が少なくとも一つある。解が二つ $p<q$ あるとすると $f(p)=f(q)=0$ なので、ロルの定理より $f'(c)=3c^2+1=0$ となる $c\in(p,q)$ がある。しかし $3c^2+1\ge1>0$ なので矛盾。よって解はちょうど一つ。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'mean-value',
    title: '平均値の定理',
    sub: 'ラグランジュの平均値の定理',
    yomi: 'へいきんちのていり',
    aliases: ['へいきんち', '平均値', 'らぐらんじゅ', '増減', 'ぞうげん', '単調増加', 'たんちょうぞうか', '導関数が0'],
    kind: '定理',
    field: '微分',
    grade: '1年前期',
    importance: 3,
    prereq: ['rolle'],
    related: ['rolle', 'cauchy-mean-value', 'differentiability'],
    notation: [
      R`$a,b\in\mathbb{R}$, $a<b$。$f\in C([a,b])$ かつ $f$ は $(a,b)$ で微分可能。`,
      R`$c\in(a,b)$：定理が存在を主張する点（$c$ は一つとは限らない）。`,
    ],
    synopsis: R`区間の両端を結ぶ弦と平行な接線が、区間の途中に必ず引ける。「平均の変化率 $=$ ある点での瞬間の変化率」。導関数の符号から関数の増減を読み取る、すべての議論の出発点である。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-mvt', title: '平均値の定理', yomi: 'へいきんちのていり', imp: 3, text: R`$a,b\in\mathbb{R}$, $a<b$ とし、$f\in C([a,b])$ は $(a,b)$ で微分可能とする。このとき
$$\frac{f(b)-f(a)}{b-a}=f'(c) \tag{#}$$
となる $c\in(a,b)$ が存在する。` },
      { t: 'fig', type: 'mvt', preset: 'cubic', editable: true, caption: R`赤い破線が両端を結ぶ弦、紺の破線が弦と平行な接線、紺の点が $c$。弦が水平なら、これはロルの定理そのものである。` },
      { t: 'note', title: '速度で読む', text: R`$f(t)$ を時刻 $t$ での位置とすると、左辺は区間 $[a,b]$ での<em>平均速度</em>、$f'(c)$ は時刻 $c$ での<em>瞬間の速度</em>である。「平均時速 60 km で走ったなら、どこかの瞬間にちょうど時速 60 km だった」と言っている。` },

      { t: 'h2', id: 'proof', text: '証明' },
      { t: 'strategy', text: R`弦の分だけ $f$ を「傾け直す」。$F(x)=f(x)-\{f(a)+m(x-a)\}$（$m$ は弦の傾き）は両端で $0$ になるので、[[rolle|ロルの定理]]が使える。` },
      { t: 'fig', type: 'plot', preset: 'mvtF', caption: R`$f(x)=x^3$ on $[-1,2]$（黒）、弦 $y=3x+2$（赤の破線）、その差 $F(x)=f(x)-(3x+2)$（紺）。$F$ は両端で $0$ になる。` },
      {
        t: 'proof',
        sketch: R`$f$ から弦の一次関数を引いた $F$ は $F(a)=F(b)=0$。ロルの定理で $F'(c)=0$、すなわち $f'(c)=m$。`,
        steps: [
          { text: R`$m=\dfrac{f(b)-f(a)}{b-a}$ とおき、$F(x)=f(x)-f(a)-m(x-a)$ と定める。` },
          { text: R`$F$ は $[a,b]$ で連続、$(a,b)$ で微分可能で、$F'(x)=f'(x)-m$ である。`, why: R`$f(a)+m(x-a)$ は一次関数なので連続かつ微分可能で、導関数は定数 $m$。[[continuity#prop-cont-arith|連続関数の差]]は連続、[[derivative-rules#thm-arith-diff|微分可能な関数の差]]は微分可能である。` },
          { text: R`両端の値を計算すると`, eqs: [
            [R`F(a)=f(a)-f(a)-m\cdot0=0,`, R`$x=a$ を代入`],
            [R`F(b)=f(b)-f(a)-\frac{f(b)-f(a)}{b-a}(b-a)=0.`, R`$x=b$ を代入`],
          ] },
          { text: R`ロルの定理より $F'(c)=0$ となる $c\in(a,b)$ が存在する。$F'(c)=f'(c)-m$ なので $f'(c)=m$。` },
        ],
      },
      { t: 'crux', text: R`平均値の定理は<em>傾けたロルの定理</em>である。弦を基準に高さを測り直せば、両端の高さがそろい、ロルの定理の状況になる。` },
      { t: 'qa', q: R`[[cauchy-mean-value|コーシーの平均値の定理]]から導く本もあるのはなぜ？`, a: R`コーシーの平均値の定理で $g(x)=x$ とおくと、ちょうど平均値の定理になる。コーシーの方を先に示せば、一回の証明で両方が得られるからである。ここでは直感がつかみやすいように、弦を引く直接の証明を先に置いた。` },

      { t: 'h2', id: 'cor', text: '系：導関数から関数の形を読む' },
      { t: 'cor', id: 'cor-const', title: '導関数が 0 なら定数', yomi: 'どうかんすうが0ならていすう', imp: 2, text: R`$a,b\in\mathbb{R}$, $a<b$ とし、$f\in C([a,b])$ が $(a,b)$ で微分可能で、すべての $x\in(a,b)$ で $f'(x)=0$ ならば、$f$ は $[a,b]$ 上で定数である。` },
      { t: 'proof', steps: [{ text: R`$x\in(a,b]$ を任意にとる。$[a,x]$ で平均値の定理を使うと、$f(x)-f(a)=f'(c)(x-a)$ となる $c\in(a,x)$ がある。$f'(c)=0$ なので $f(x)=f(a)$。` }] },
      { t: 'cor', id: 'cor-incr', title: '導関数の符号と増減', yomi: 'どうかんすうのふごうとぞうげん', imp: 2, text: R`$I\subset\mathbb{R}$ を区間（開・閉・半開のどれでもよい）、$f\in C(I)$ が $I$ の内部（端点を除いた部分）で微分可能とする。
<ol><li>内部のすべての $x$ で $f'(x)>0$ ならば、$f$ は $I$ で狭義単調増加である。$f'(x)<0$ ならば狭義単調減少である。</li><li>内部のすべての $x$ で $f'(x)\ge0$ ならば、$f$ は $I$ で単調増加（$x<y\Rightarrow f(x)\le f(y)$）である。$f'(x)\le0$ ならば単調減少である。</li></ol>` },
      { t: 'proof', steps: [{ text: R`$x<y$ を $I$ から任意にとる。$[x,y]\subset I$ で $f$ は連続、$(x,y)$（$I$ の内部に含まれる）で微分可能なので、平均値の定理より $f(y)-f(x)=f'(c)(y-x)$ となる $c\in(x,y)$ がある。(1) $f'(c)>0$、$y-x>0$ なので $f(y)>f(x)$。(2) $f'(c)\ge0$ なので $f(y)\ge f(x)$。減少の場合も符号を逆にして同じ。` }] },
      { t: 'rem', title: '「区間で」が大事', text: R`$f(x)=\dfrac1x$ は $x\ne0$ で $f'(x)=-\dfrac1{x^2}<0$ だが、$f(-1)=-1<1=f(1)$ なので $\mathbb{R}\setminus\{0\}$ 全体では減少関数でない。定義域が区間でない（$0$ で切れている）ため、平均値の定理を $[-1,1]$ に使えないのである。` },
      { t: 'fig', type: 'mvt', preset: 'abs', caption: R`$|x|$ on $[-1,2]$。弦の傾きは $\frac13$ だが、$f'$ は $-1$ か $1$ しかとらない。$x=0$（×印）で微分可能でないので、平均値の定理の仮定をみたさない。` },

      { t: 'h2', id: 'example', text: '例題' },
      { t: 'ex', id: 'ex-e2x', title: 'e²ˣ on [2, 5] の c', text: R`$f(x)=e^{2x}$、区間 $[2,5]$ について、平均値の定理の $c$ を求める（$(e^x)'=e^x$ と合成関数の微分法より $f'(x)=2e^{2x}$）。
$$2e^{2c}=\frac{e^{10}-e^4}{5-2}\quad\Longrightarrow\quad e^{2c}=\frac{e^{10}-e^4}{6}=\frac{e^4(e^6-1)}{6}.$$
両辺の対数をとって $c=\dfrac12\log\dfrac{e^4(e^6-1)}{6}=2+\dfrac12\log\dfrac{e^6-1}{6}\approx4.10$。` },
      { t: 'fig', type: 'mvt', preset: 'e2x', caption: R`$e^{2x}$ on $[2,5]$。右ほど急に増えるので、平均の傾きと同じ傾きの点は右寄り（$c\approx4.10$）になる。` },
      { t: 'qa', q: R`求めた $c$ が本当に $(2,5)$ に入っていることは、計算機なしで言える？`, a: R`言える。$f'(x)=2e^{2x}$ は狭義増加なので、方程式 $f'(x)=\frac{e^{10}-e^4}{3}$ の解は<em>高々一つ</em>。一方、平均値の定理が $(2,5)$ の中に解の存在を保証している。したがって、求めたただ一つの解 $c$ は自動的に $(2,5)$ に入る。直接確かめるなら、$c>2\iff\frac{e^6-1}{6}>1\iff e^6>7$ である。` },
      { t: 'qa', q: R`平均値の定理を使う前に確認すべきことは？`, a: R`仮定である。$e^{2x}$ は $\mathbb{R}$ 全体で連続かつ微分可能なので、$[2,5]$ で連続・$(2,5)$ で微分可能という仮定をみたす。また対数をとれるのは $\frac{e^{10}-e^4}{6}>0$ だからである。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-mvt-0', level: 1, title: '基本', text: R`$f(x)=x^2$ と区間 $[a,b]$ について、平均値の定理の $c$ を求めよ。`, answer: R`$\frac{b^2-a^2}{b-a}=a+b=2c$ より $c=\frac{a+b}2$（区間の中点）。`, space: 3 },
      { t: 'problem', id: 'prob-mvt-1', level: 1, title: '基本', text: R`区間 $I$ 上で微分可能な $f,g$ が、すべての $x\in I$ で $f'(x)=g'(x)$ をみたすならば、$f-g$ は定数であることを示せ。`, hint: R`$h=f-g$ に[[mean-value#cor-const|導関数が 0 なら定数]]を使う。`, answer: R`$h=f-g$ とおくと $h'(x)=f'(x)-g'(x)=0$。$I$ の任意の 2 点 $x<y$ について、$[x,y]$ に系を適用すると $h(x)=h(y)$。よって $h$ は定数。`, space: 5 },
      { t: 'problem', id: 'prob-mvt-2', level: 2, title: '標準', text: R`任意の実数 $x,y$ について $|\sin x-\sin y|\le|x-y|$ を示せ。（$(\sin x)'=\cos x$ と $|\cos t|\le1$ は認めてよい）`, hint: R`$x\ne y$ として、$x,y$ を端点とする区間で平均値の定理を使う。`, answer: R`$x=y$ なら明らか。$x<y$ とすると、平均値の定理より $\sin y-\sin x=\cos c\,(y-x)$ となる $c\in(x,y)$ がある。よって $|\sin x-\sin y|=|\cos c|\,|x-y|\le|x-y|$。$x>y$ の場合も同様。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'cauchy-mean-value',
    title: 'コーシーの平均値の定理',
    sub: '',
    yomi: 'こーしーのへいきんちのていり',
    aliases: ['こーしーのへいきんち', '一般化された平均値の定理', 'ろぴたる', 'ロピタル'],
    kind: '定理',
    field: '微分',
    grade: '1年前期',
    importance: 2,
    prereq: ['rolle', 'mean-value'],
    related: ['mean-value', 'rolle'],
    notation: [
      R`$a,b\in\mathbb{R}$, $a<b$。$f,g\in C([a,b])$ かつ $f,g$ は $(a,b)$ で微分可能。`,
      R`$\det$：行列式（Q&A でのみ使用）。`,
    ],
    synopsis: R`二つの関数 $f,g$ の変化の比は、ある点での微分係数の比に等しい。点 $(g(t),f(t))$ が描く曲線の弦と平行な接線がある、という平均値の定理の曲線版であり、ロピタルの定理やテイラーの定理の土台になる。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-cmvt', title: 'コーシーの平均値の定理', yomi: 'こーしーのへいきんちのていり', imp: 3, text: R`$a,b\in\mathbb{R}$, $a<b$ とし、$f,g\in C([a,b])$ は $(a,b)$ で微分可能で、すべての $x\in(a,b)$ で $g'(x)\ne0$ とする。このとき
$$\frac{f'(c)}{g'(c)}=\frac{f(b)-f(a)}{g(b)-g(a)} \tag{#}$$
となる $c\in(a,b)$ が存在する。` },
      { t: 'fig', type: 'cauchy', preset: 'pw', editable: true, caption: R`横軸に $g(t)$、縦軸に $f(t)$ をとって、$t$ を $a$ から $b$ まで動かした曲線。赤い破線が弦、紺の破線が弦と平行な接線。接線の向きは $(g'(t),f'(t))$ なので、その傾きは $\frac{f'(t)}{g'(t)}$ である。` },
      { t: 'note', title: '曲線で読む', text: R`$g(x)=x$ とすると曲線はただのグラフ $y=f(x)$ になり、定理は[[mean-value|平均値の定理]]そのものになる。コーシーの定理は、グラフに限らない「媒介変数表示された曲線」についての平均値の定理である。` },

      { t: 'h2', id: 'proof', text: '証明' },
      { t: 'strategy', text: R`$F(x)=\bigl(f(x)-f(a)\bigr)\bigl(g(b)-g(a)\bigr)-\bigl(g(x)-g(a)\bigr)\bigl(f(b)-f(a)\bigr)$ は両端で $0$ になるので、[[rolle|ロルの定理]]を使う。最後に分数の形にするため、分母が $0$ でないことを確かめる。` },
      {
        t: 'proof',
        sketch: R`$F$ にロルの定理を使うと $f'(c)(g(b)-g(a))=g'(c)(f(b)-f(a))$。$g'(c)\ne0$ と $g(b)\ne g(a)$ を確かめてから割る。`,
        steps: [
          { text: R`$F$ を上のように定める。$F$ は $f,g$ と定数の一次結合なので $[a,b]$ で連続、$(a,b)$ で微分可能で、$F'(x)=f'(x)\bigl(g(b)-g(a)\bigr)-g'(x)\bigl(f(b)-f(a)\bigr)$。` },
          { text: R`両端の値は`, eqs: [
            [R`F(a)=0\cdot\bigl(g(b)-g(a)\bigr)-0\cdot\bigl(f(b)-f(a)\bigr)=0,`, R`$x=a$ を代入`],
            [R`F(b)=\bigl(f(b)-f(a)\bigr)\bigl(g(b)-g(a)\bigr)-\bigl(g(b)-g(a)\bigr)\bigl(f(b)-f(a)\bigr)=0.`, R`$x=b$ を代入`],
          ] },
          { text: R`ロルの定理より、$F'(c)=0$ となる $c\in(a,b)$ がある。すなわち`, eqs: [[R`f'(c)\bigl(g(b)-g(a)\bigr)=g'(c)\bigl(f(b)-f(a)\bigr).`, R`$F'(c)=0$`]] },
          { text: R`$g(b)\ne g(a)$ である。もし $g(b)=g(a)$ なら、$g$ にロルの定理を使って $g'(d)=0$ となる $d\in(a,b)$ が得られ、仮定 $g'\ne0$ に反する。`, why: R`この一文がないと、右辺の分数 $\frac{f(b)-f(a)}{g(b)-g(a)}$ が定義されるかどうかがわからない。$F'(c)=0$ の式で証明を終えてしまうと、ここが抜け落ちる。` },
          { text: R`$g'(c)\ne0$（仮定）と $g(b)-g(a)\ne0$ より、両辺を $g'(c)\bigl(g(b)-g(a)\bigr)$ で割ると結論を得る。$g(x)=x$ とすれば（$g'=1\ne0$、$g(b)-g(a)=b-a$）平均値の定理になる。` },
        ],
      },
      { t: 'qa', q: R`$f$ と $g$ にそれぞれ平均値の定理を使って、割り算すればよいのでは？`, a: R`それでは $c$ が一致しない。$f(x)=x^2$、$g(x)=x^3$ on $[0,1]$ では、$f$ だけなら $2c=1$ より $c=\frac12$、$g$ だけなら $3c^2=1$ より $c=\frac1{\sqrt3}$。コーシーの定理の $c$ は $\frac{2c}{3c^2}=1$ より $c=\frac23$ で、どちらとも違う。<em>同じ点</em> $c$ で比がとれることが、この定理の中身である。` },
      { t: 'qa', q: R`仮定 $g'\ne0$ は何のため？`, a: R`$g'(c)\ne0$ と $g(b)\ne g(a)$ の両方を保証して、分数の形にするためである。分母を払った形 $f'(c)\bigl(g(b)-g(a)\bigr)=g'(c)\bigl(f(b)-f(a)\bigr)$ なら、この仮定がなくても証明の前半だけで成り立つ。` },
      { t: 'qa', q: R`行列式を使って $F$ を書く本があるのはなぜ？`, a: R`$F(x)$ は行列式 $\det\begin{pmatrix}f(x)&g(x)&1\\f(b)&g(b)&1\\f(a)&g(a)&1\end{pmatrix}$ と等しい（第 1 行で展開して比べるとわかる）。これは 3 点 $(f(x),g(x))$、$(f(b),g(b))$、$(f(a),g(a))$ が作る三角形の符号付き面積の 2 倍であり、$x=a,b$ では 2 点が重なって面積が $0$ になる。$F(a)=F(b)=0$ が計算なしでわかる、という利点がある。` },
      { t: 'html', html: R`<svg viewBox="0 0 420 220" role="img" aria-label="三角形の面積"><line x1="40" y1="190" x2="400" y2="190" stroke="#333"/><line x1="40" y1="190" x2="40" y2="14" stroke="#333"/><polygon points="90,160 330,120 200,40" fill="rgba(35,61,107,.12)" stroke="#233d6b" stroke-width="1.5"/><circle cx="90" cy="160" r="4" fill="#222"/><circle cx="330" cy="120" r="4" fill="#222"/><circle cx="200" cy="40" r="5" fill="#8c1c13"/><text x="96" y="178">(f(a), g(a))</text><text x="300" y="142">(f(b), g(b))</text><text x="208" y="34" fill="#8c1c13">(f(x), g(x))</text><text x="384" y="208">f</text><text x="26" y="22">g</text></svg>`, caption: R`$F(x)$ は、3 点が作る三角形の符号付き面積の 2 倍。$x$ が $a$ や $b$ に一致すると赤い点が他の点に重なり、面積は $0$ になる。` },
      { t: 'crux', text: R`二つの関数を<em>一本の曲線</em>にまとめると、平均値の定理がそのまま使える形になる。弦との「ずれ」を表す $F$ が両端で $0$、というロルの定理の型は、平均値の定理のときと全く同じである。` },

      { t: 'h2', id: 'example', text: '例' },
      { t: 'ex', id: 'ex-cmvt-circle', title: 'f = sin x, g = cos x on [0, π/2]', text: R`曲線 $(\cos t,\sin t)$ は単位円の四分円である。弦の傾きは $\frac{1-0}{0-1}=-1$、$\frac{f'(c)}{g'(c)}=\frac{\cos c}{-\sin c}=-1$ より $c=\frac\pi4$。円の弦と平行な接線は、弧のちょうど真ん中で接する。` },
      { t: 'fig', type: 'cauchy', preset: 'circ', caption: R`四分円 $(\cos t,\sin t)$、$0\le t\le\frac\pi2$。弦と平行な接線は $t=\frac\pi4$ で接する。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-cmvt-1', level: 1, title: '基本', text: R`$f(x)=x^2$、$g(x)=x^3$、区間 $[1,2]$ について、コーシーの平均値の定理の $c$ を求めよ。`, answer: R`$\frac{f(2)-f(1)}{g(2)-g(1)}=\frac37$、$\frac{f'(c)}{g'(c)}=\frac{2c}{3c^2}=\frac2{3c}$。$\frac2{3c}=\frac37$ より $c=\frac{14}9\in(1,2)$。`, space: 4 },
    ],
  });
  /* ------------------------------------------------------------ */
  A.push({
    id: 'taylor',
    title: 'テイラーの定理',
    sub: 'ラグランジュの剰余・ランダウの記号・極値の判定',
    yomi: 'ていらーのていり',
    aliases: ['テイラーの定理', 'ていらーのていり', 'テイラー展開', 'ていらーてんかい', 'マクローリン展開', 'まくろーりん', '剰余項', 'じょうよこう', 'ラグランジュの剰余', 'ランダウの記号', 'スモールオー', 'o記号', '極値判定', 'きょくちはんてい'],
    kind: '定理',
    field: '微分',
    grade: '1年前期',
    importance: 3,
    prereq: ['rolle', 'mean-value', 'derivative-rules'],
    related: ['power-series', 'total-derivative', 'cauchy-mean-value'],
    notation: [
      R`$I\subset\mathbb{R}$：開区間。$n\in\mathbb{N}\cup\{0\}$。$f^{(k)}$：$k$ 次導関数（$f^{(0)}=f$）。`,
      R`$f$ が $I$ で <b>$n+1$ 回微分可能</b>：$f,f',\dots,f^{(n)}$ が $I$ で微分可能。$C^n(I)$：$n$ 回微分可能で $f^{(n)}$ が連続な関数全体。`,
      R`$T_n(x):=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k$：$a$ を中心とする $n$ 次のテイラー多項式。`,
      R`「$c$ は $a$ と $x$ の間」：$x>a$ なら $a<c<x$、$x<a$ なら $x<c<a$。`,
      R`ランダウの記号 $g(x)=o(h(x))\ (x\to a)$ $:\Longleftrightarrow$ $\displaystyle\lim_{x\to a}\frac{g(x)}{h(x)}=0$（$h(x)\ne0$、$x\ne a$）。「$h$ より速く $0$ に近づく」。`,
    ],
    synopsis: R`なめらかな関数は、一点の近くで多項式 $T_n(x)=\sum\frac{f^{(k)}(a)}{k!}(x-a)^k$ で近似でき、その誤差は $\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ と書ける（ラグランジュの剰余）。平均値の定理は $n=0$ の場合である。誤差の評価から、極限の計算、極値の判定、関数のべき級数展開が得られる。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-taylor', title: 'テイラーの定理（ラグランジュの剰余）', yomi: 'ていらーのていり', imp: 3, text: R`$I$ を開区間、$f:I\to\mathbb{R}$ を $I$ で $n+1$ 回微分可能、$a,x\in I$ とする。このとき $a$ と $x$ の間のある $c$（$x=a$ なら $c=a$）が存在して
$$f(x)=\sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x-a)^k+\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}.$$` },
      { t: 'strategy', text: R`$x$ を固定し、誤差を $K(x-a)^{n+1}$ と書いて $K$ を定める。「$t$ から見たテイラー多項式」との差 $g(t)$ を作ると $g(a)=g(x)=0$ となり、[[rolle#thm-rolle|ロルの定理]]で $g'(c)=0$。$g'$ は望遠鏡和で一項だけになり、そこから $K$ が読める。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x=a$ なら両辺とも $f(a)$。以下 $x\ne a$ とし、$K\in\mathbb{R}$ を $f(x)=T_n(x)+K(x-a)^{n+1}$ となるように定める（$(x-a)^{n+1}\ne0$ なので一つに決まる）。` },
          { text: R`$a$ と $x$ を端点とする閉区間 $J$ 上で $g(t):=f(x)-\sum_{k=0}^n\frac{f^{(k)}(t)}{k!}(x-t)^k-K(x-t)^{n+1}$ とおく。$f^{(k)}$（$k\le n$）は微分可能なので連続で、$g$ は $J$ 上連続・内部で微分可能。$g(x)=f(x)-f(x)=0$（$k\ge1$ の項は $(x-x)^k=0$）、$g(a)=f(x)-T_n(x)-K(x-a)^{n+1}=0$。` },
          {
            text: R`$g'$ を計算する。$k\ge1$ について積の微分より $\frac d{dt}\Bigl[\frac{f^{(k)}(t)}{k!}(x-t)^k\Bigr]=\frac{f^{(k+1)}(t)}{k!}(x-t)^k-\frac{f^{(k)}(t)}{(k-1)!}(x-t)^{k-1}$ で、$k=0$ では $f'(t)$。和をとると隣どうしが打ち消し合い（[[sigma-notation#prop-sum-rules|望遠鏡和]]）、`,
            eqs: [[R`g'(t)=-\frac{f^{(n+1)}(t)}{n!}(x-t)^n+K(n+1)(x-t)^n.`, R`望遠鏡和・$\frac d{dt}(x-t)^{n+1}=-(n+1)(x-t)^n$`]],
          },
          { text: R`ロルの定理より、$a$ と $x$ の間の $c$ で $g'(c)=0$。$c\ne x$ なので $(x-c)^n\ne0$ で割って $K(n+1)=\frac{f^{(n+1)}(c)}{n!}$、すなわち $K=\frac{f^{(n+1)}(c)}{(n+1)!}$。` },
        ],
      },
      { t: 'note', title: '言い換え', text: R`$n=0$ のときは $f(x)=f(a)+f'(c)(x-a)$ で、[[mean-value#thm-mvt|平均値の定理]]そのものである。テイラーの定理は「平均値の定理の高次版」で、$f$ を $n$ 次多項式で近似したときの誤差が、$(n+1)$ 次導関数の値一つで書けることを言っている。` },
      { t: 'cor', id: 'cor-peano', title: 'テイラーの定理（ペアノの剰余）', yomi: 'ぺあののじょうよ', imp: 2, text: R`$I$ を開区間、$a\in I$、$f\in C^n(I)$（$n\ge1$）とすると $f(x)=T_n(x)+o\bigl((x-a)^n\bigr)$（$x\to a$）。` },
      { t: 'proof', steps: [{ text: R`定理を $n-1$ に使うと $f(x)=T_{n-1}(x)+\frac{f^{(n)}(c_x)}{n!}(x-a)^n$（$c_x$ は $a$ と $x$ の間）。よって $\frac{f(x)-T_n(x)}{(x-a)^n}=\frac{f^{(n)}(c_x)-f^{(n)}(a)}{n!}$。$x\to a$ のとき $|c_x-a|\le|x-a|\to0$ で、$f^{(n)}$ は $a$ で連続なので右辺は $0$ に収束する。` }] },

      { t: 'h2', id: 'ex', text: '例' },
      { t: 'ex', id: 'ex-taylor-exp', title: 'eˣ のテイラー展開', text: R`$f(x)=e^x$ は何回微分しても $e^x$ なので、$a=0$ で $e^x=\sum_{k=0}^n\frac{x^k}{k!}+\frac{e^c}{(n+1)!}x^{n+1}$。$|x|\le M$ なら剰余は $\le\frac{e^M M^{n+1}}{(n+1)!}\to0$（比判定法で $\sum\frac{M^n}{n!}$ は収束するので項は $0$ に収束）。よって $e^x=\sum_{k=0}^\infty\frac{x^k}{k!}$（すべての $x$）。これは[[power-series#def-exp|べき級数による定義]]と一致する。` },
      { t: 'ex', id: 'ex-taylor-limit', title: '極限の計算', text: R`$\displaystyle\lim_{x\to0}\frac{\sin x-x}{x^3}$：$\sin$ に $a=0$、$n=3$ のテイラーの定理を使うと $\sin x=x-\frac{x^3}6+\frac{\sin c}{24}x^4$（$\sin^{(4)}=\sin$）。よって $\frac{\sin x-x}{x^3}=-\frac16+\frac{\sin c}{24}x$ で、$|\sin c|\le1$ より右辺の第 2 項は $0$ に収束する。答えは $-\frac16$。` },
      { t: 'thm', id: 'thm-second-test', title: '2 階導関数による極値の判定', yomi: 'きょくちのはんてい', imp: 2, text: R`$I$ を開区間、$f\in C^2(I)$、$a\in I$ で $f'(a)=0$ とする。$f''(a)>0$ ならば $f$ は $a$ で狭義の極小値をとり（$a$ の近くの $x\ne a$ で $f(x)>f(a)$）、$f''(a)<0$ ならば狭義の極大値をとる。` },
      { t: 'proof', steps: [{ text: R`$f''$ は $a$ で連続で $f''(a)>0$ なので、[[intermediate-value#lem-sign|符号の保存]]より、ある $\delta>0$ について $|t-a|<\delta$ なら $f''(t)>0$。$0<|x-a|<\delta$ とすると、$n=1$ のテイラーの定理より $f(x)=f(a)+f'(a)(x-a)+\frac{f''(c)}2(x-a)^2=f(a)+\frac{f''(c)}2(x-a)^2$ で、$c$ は $a$ と $x$ の間なので $|c-a|<\delta$、$f''(c)>0$。よって $f(x)>f(a)$。極大も同様。` }] },
      { t: 'rem', title: 'テイラー級数が元の関数に収束するとは限らない', text: R`$f(x)=e^{-1/x^2}$（$x\ne0$）、$f(0)=0$ は $\mathbb{R}$ 上で何回でも微分可能で、$f^{(k)}(0)=0$（すべての $k$）。テイラー級数はすべての係数が $0$ なので恒等的に $0$ だが、$f(x)>0$（$x\ne0$）。「無限回微分可能」と「べき級数で表せる（実解析的）」は違う。この違いは、偏微分方程式の解の[[dissipative-nls#smoothing|解析的平滑化・ジュブレイ級]]の研究にもつながる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-taylor-1', level: 1, title: '基本', text: R`$\displaystyle\lim_{x\to0}\frac{e^x-1-x}{x^2}$ を求めよ。`, hint: R`$n=1$ のテイラーの定理で $e^x=1+x+\frac{e^c}2x^2$。`, answer: R`$e^x=1+x+\frac{e^c}2x^2$（$c$ は $0$ と $x$ の間）なので $\frac{e^x-1-x}{x^2}=\frac{e^c}2$。$x\to0$ で $c\to0$ なので、$e^c\to1$（連続性）。答えは $\frac12$。`, space: 4 },
      { t: 'problem', id: 'prob-taylor-2', level: 2, title: '標準', text: R`$x\ge0$ について $x-\frac{x^2}2\le\log(1+x)\le x$ を示せ。`, hint: R`$\log(1+x)$ に $n=0$ と $n=1$ のテイラーの定理。$(\log(1+x))''=-\frac1{(1+x)^2}<0$。`, answer: R`$f(x)=\log(1+x)$、$f'=\frac1{1+x}$、$f''=-\frac1{(1+x)^2}$。$x>0$ で $n=1$：$f(x)=x+\frac{f''(c)}2x^2\le x$（$f''<0$）。$n=2$：$f'''=\frac2{(1+x)^3}>0$ なので $f(x)=x-\frac{x^2}2+\frac{f'''(c)}6x^3\ge x-\frac{x^2}2$。$x=0$ では等号。`, space: 6 },
    ],
  });
})();
