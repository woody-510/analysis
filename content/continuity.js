/* 第 4 章：関数の極限と連続 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'function-limit',
    title: '関数の極限',
    sub: 'ε-δ 論法',
    yomi: 'かんすうのきょくげん',
    aliases: ['いぷしろんでるたろんぽう', 'ε-δ論法', 'イプシロンデルタ論法', 'いぷしろんでるた', 'でるた', '極限', 'きょくげん'],
    kind: '用語',
    field: '関数の極限と連続',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'logic-quantifiers', 'abs-triangle'],
    related: ['continuity', 'sequence-convergence', 'differentiability'],
    notation: [
      R`$I\subset\mathbb{R}$：区間。開区間 $(p,q)=\{x\in\mathbb{R}\mid p<x<q\}$、閉区間 $[p,q]=\{x\in\mathbb{R}\mid p\le x\le q\}$（[[sets#def-interval|区間の記号]]）。`,
      R`$I\setminus\{a\}$：$I$ から点 $a$ を除いた集合。$f:I\setminus\{a\}\to\mathbb{R}$ は「$a$ では定義されていなくてもよい関数」。`,
      R`$\varepsilon>0$, $\delta>0$：正の実数。$\delta=\delta(\varepsilon)$ は「$\delta$ は $\varepsilon$ に応じて決まる」。`,
      R`$\displaystyle\lim_{x\to a}f(x)=L$：$x\to a$ のとき $f(x)$ は $L\in\mathbb{R}$ に収束する。$x\to a+0$ は右から、$x\to a-0$ は左から。`,
    ],
    synopsis: R`どれほど小さな誤差 $\varepsilon$ を指定されても、$x$ を $a$ から $\delta$ 未満の距離まで近づければ（$x=a$ は除く）、$f(x)$ は $L$ から $\varepsilon$ 以内に収まる。これが $\displaystyle\lim_{x\to a}f(x)=L$ の厳密な意味である。`,
    body: [
      { t: 'h2', id: 'intuition', text: '直感：ε-N から ε-δ へ' },
      { t: 'p', text: R`数列の収束では「番号 $n$ が<em>十分先</em>なら $a_n$ は $\alpha$ に近い」を $\varepsilon$ と $N$ で表した。関数の極限では「$x$ が $a$ に<em>十分近く</em>なら $f(x)$ は $L$ に近い」を $\varepsilon$ と $\delta$ で表す。$N$ の役目を $\delta$ が担う。` },
      { t: 'fig', type: 'epsdelta', preset: 'sq', caption: R`$f(x)=x^2,\ a=1,\ L=1$。横の帯が $L\pm\varepsilon$、縦の帯が $a\pm\delta$。縦の帯の中では、グラフ（赤く太い部分）がすべて横の帯に収まる。$\varepsilon$ を小さくすると、それに応じて $\delta$ も小さくなる。` },
      { t: 'note', title: 'ε-N との対応表', text: R`<ul><li>数列：$\forall\varepsilon>0\ \exists N\ \forall n\ge N,\ |a_n-\alpha|<\varepsilon$</li><li>関数：$\forall\varepsilon>0\ \exists\delta>0\ \forall x,\ 0<|x-a|<\delta\Rightarrow|f(x)-L|<\varepsilon$</li></ul>「$n\ge N$（十分先）」が「$0<|x-a|<\delta$（十分近く）」に置き換わっただけで、読み方の型は同じである。` },

      { t: 'h2', id: 'definition', text: '定義' },
      { t: 'def', id: 'def-flim', title: '関数の極限', yomi: 'かんすうのきょくげん', imp: 3, text: R`$I\subset\mathbb{R}$ を開区間、$a\in I$、$f:I\setminus\{a\}\to\mathbb{R}$、$L\in\mathbb{R}$ とする。$x\to a$ のとき $f(x)$ が $L$ に<b class="term">収束する</b>とは、次が成り立つことをいう。
$$\forall\varepsilon>0,\ \exists\delta=\delta(\varepsilon)>0\ \text{ s.t. }\ \forall x\in I,\quad 0<|x-a|<\delta\ \Longrightarrow\ |f(x)-L|<\varepsilon. \tag{#}$$
このとき $\displaystyle\lim_{x\to a}f(x)=L$ または $f(x)\to L\ (x\to a)$ と書く。` },
      { t: 'rem', title: '「0 <」が付いている理由', text: R`条件 $0<|x-a|$ は「$x=a$ は考えない」という意味である。極限は $a$ の<em>近く</em>での振る舞いだけで決まり、$a$ での値（定義されていなくてもよい）とは無関係である。たとえば $f:\mathbb{R}\setminus\{1\}\to\mathbb{R}$, $f(x)=\dfrac{x^2-1}{x-1}$ は $x=1$ で定義されないが、$x\ne1$ では $f(x)=x+1$ なので $\displaystyle\lim_{x\to1}f(x)=2$ である。` },
      { t: 'ex', id: 'ex-x2', title: 'lim x² = 1（x → 1）', text: R`$f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ とする。$\varepsilon>0$ を任意にとる。まず $|x^2-1|=|x-1|\,|x+1|$ と分解する。$|x-1|<1$ ならば $0<x<2$ なので $|x+1|<3$、したがって $|x^2-1|<3|x-1|$ である。そこで
$$\delta=\min\left\{1,\ \frac{\varepsilon}{3}\right\}$$
とおくと（$\delta=\delta(\varepsilon)>0$）、$x\in\mathbb{R}$, $0<|x-1|<\delta$ のとき $|x^2-1|<3|x-1|<3\cdot\dfrac\varepsilon3=\varepsilon$。よって $\displaystyle\lim_{x\to1}x^2=1$。` },
      { t: 'qa', q: R`$x=a$ で $f$ が定義されていなくても、極限は考えられる？`, a: R`考えられる。定義は $0<|x-a|<\delta$、つまり $x\ne a$ の点しか見ないので、$f(a)$ の値は一切使わない。差分商 $\frac{f(x)-f(a)}{x-a}$ のように「$x=a$ で分母が $0$ になる式」の極限を扱えるのは、このおかげである。` },
      { t: 'note', title: 'δ を min でとる理由', text: R`$\delta$ は二つの役目を同時に果たしている。① $|x-1|<1$ を保証して $|x+1|$ を $3$ で抑える。② $3|x-1|<\varepsilon$ を保証する。両方を満たすには、それぞれの条件の小さい方をとればよい。この「とりあえず $\delta\le1$ にしておいて余計な因子を定数で抑える」技は、多項式や分数式の極限でいつも使う。` },

      { t: 'h2', id: 'sequential', text: '数列による特徴づけ' },
      { t: 'thm', id: 'thm-seq-crit', title: '関数の極限の数列による特徴づけ', yomi: 'かんすうのきょくげんのすうれつによるとくちょうづけ', imp: 3, text: R`$I\subset\mathbb{R}$ を開区間、$a\in I$、$f:I\setminus\{a\}\to\mathbb{R}$、$L\in\mathbb{R}$ とする。次の 2 条件は同値である。
<ol><li>$\displaystyle\lim_{x\to a}f(x)=L$</li><li>すべての $n\in\mathbb{N}$ で $x_n\in I\setminus\{a\}$ であり $x_n\to a$ となる任意の実数列 $\{x_n\}$ について、$f(x_n)\to L$</li></ol>` },
      { t: 'strategy', text: R`(1)⇒(2) は、$f$ の $\delta$ を数列の $N$ に変換するだけである。(2)⇒(1) は対偶を示す。(1) が成り立たないなら、$a$ にいくらでも近いところに「$L$ から $\varepsilon_0$ 以上離れる点」があるので、$\delta=\frac1n$ として点を一つずつ拾えば、(2) を破る数列ができる。` },
      {
        t: 'proof',
        sketch: R`(1)⇒(2)：$x_n$ は十分先で $a$ の $\delta$ 近くに入るので、$f(x_n)$ は $L$ の $\varepsilon$ 近くに入る。(2)⇒(1)：否定から、$a$ の $\frac1n$ 近くにある「悪い点」$x_n$ を集めると、$x_n\to a$ なのに $f(x_n)\not\to L$ となる。`,
        steps: [
          { text: R`<b>(1)⇒(2)。</b>$\varepsilon>0$ を任意にとり、(1) の $\delta=\delta(\varepsilon)>0$ をとる。$x_n\to a$ なので、ある $N=N(\delta)\in\mathbb{N}$ が存在して $n\ge N$ ならば $|x_n-a|<\delta$。さらに $x_n\ne a$ なので $0<|x_n-a|<\delta$、よって $|f(x_n)-L|<\varepsilon$。これは $f(x_n)\to L$ を意味する。` },
          { text: R`<b>(2)⇒(1)。</b>(1) が成り立たないと仮定する。(1) を否定すると、ある $\varepsilon_0>0$ が存在して、任意の $\delta>0$ に対し、$0<|x-a|<\delta$ かつ $|f(x)-L|\ge\varepsilon_0$ となる $x$ が存在する。`, why: R`[[logic-quantifiers#prop-neg|否定の規則]]により、$\forall\varepsilon\,\exists\delta\,\forall x\,(P\Rightarrow Q)$ の否定は $\exists\varepsilon\,\forall\delta\,\exists x\,(P\text{ かつ }\neg Q)$ である。「$P\Rightarrow Q$」の否定は「$P$ なのに $Q$ でない」。` },
          { text: R`各 $n\in\mathbb{N}$ について $\delta=\frac1n$ とおき、上の $x\in I$ を一つ選んで $x_n$ とする。すると $x_n\in I\setminus\{a\}$、$0<|x_n-a|<\frac1n$ かつ $|f(x_n)-L|\ge\varepsilon_0$。` },
          { text: R`$|x_n-a|<\frac1n\to0$ なので $x_n\to a$、また $x_n\ne a$ である。しかし $f(x_n)$ はどの項も $L$ から $\varepsilon_0$ 以上離れているので、$f(x_n)\to L$ ではない。これは (2) に反する。`, why: R`$x_n\to a$ の確認：$\varepsilon>0$ に対して[[supremum#thm-arch|アルキメデスの原理]]で $N>\frac1\varepsilon$ をとると、$n\ge N$ で $|x_n-a|<\frac1n\le\frac1N<\varepsilon$。` },
        ],
      },
      { t: 'crux', text: R`この定理は<em>数列と関数の橋</em>である。数列について示した四則演算・不等式・はさみうちの結果が、この橋を渡るだけで関数の極限にもそのまま使える。逆に「極限がない」ことを示すには、行き先の違う数列を二つ見つければよい。` },
      { t: 'cor', id: 'cor-flim-arith', title: '関数の極限の四則演算', yomi: 'かんすうのきょくげんのしそくえんざん', imp: 2, text: R`$I\subset\mathbb{R}$ を開区間、$a\in I$、$f,g:I\setminus\{a\}\to\mathbb{R}$、$L,M\in\mathbb{R}$ とし、$\displaystyle\lim_{x\to a}f(x)=L$、$\displaystyle\lim_{x\to a}g(x)=M$ とする。このとき $x\to a$ で $f(x)+g(x)\to L+M$、$f(x)g(x)\to LM$。さらに $M\ne0$ ならば、ある $\delta_0>0$ があって $0<|x-a|<\delta_0$（$x\in I$）で $g(x)\ne0$ となり、$\dfrac{f(x)}{g(x)}\to\dfrac LM$。` },
      {
        t: 'proof',
        steps: [
          { text: R`商の場合の $\delta_0$ は、$\varepsilon=\frac{|M|}2$ に対する $\delta$ をとればよい（$|g(x)-M|<\frac{|M|}2$ なら $|g(x)|>\frac{|M|}2>0$）。$x_n\in I\setminus\{a\}$（商のときは $0<|x_n-a|<\delta_0$ もみたす）で $x_n\to a$ となる任意の実数列をとる。定理より $f(x_n)\to L$、$g(x_n)\to M$。[[sequence-convergence#prop-arith|数列の極限の四則演算]]より $f(x_n)+g(x_n)\to L+M$、$f(x_n)g(x_n)\to LM$、$\frac{f(x_n)}{g(x_n)}\to\frac LM$。数列は任意だったので、再び定理より結論を得る。` },
        ],
      },

      { t: 'h2', id: 'onesided', text: '片側極限・一意性・不等式' },
      { t: 'def', id: 'def-onesided-lim', title: '右側極限・左側極限', yomi: 'みぎがわきょくげん', imp: 2, text: R`$I\subset\mathbb{R}$ を区間、$a\in\mathbb{R}$ を $I$ の点または端点とし、任意の $\delta_0>0$ で $I\cap(a,a+\delta_0)\ne\varnothing$ とする。$f:I\setminus\{a\}\to\mathbb{R}$、$L\in\mathbb{R}$ について
$$\lim_{x\to a+0}f(x)=L\ :\Longleftrightarrow\ \forall\varepsilon>0\ \exists\delta=\delta(\varepsilon)>0\ \text{ s.t. }\ \forall x\in I,\ \ 0<x-a<\delta\Rightarrow|f(x)-L|<\varepsilon$$
を<b class="term">右側極限</b>という。条件を $0<a-x<\delta$ に替えたもの（このときは $I\cap(a-\delta_0,a)\ne\varnothing$ を仮定する）を<b class="term">左側極限</b>といい、$\displaystyle\lim_{x\to a-0}f(x)$ と書く。$a=0$ のときは $x\to+0$、$x\to-0$ と書く。` },
      { t: 'rem', id: 'rem-onesided', title: '片側に点がないときは考えない', text: R`右側極限は、$a$ の右側のいくらでも近くに $I$ の点がある場合（任意の $\delta_0>0$ で $I\cap(a,a+\delta_0)\ne\varnothing$）だけ考える。たとえば $I=[0,1]$、$a=1$ では、$0<x-1<\delta$ をみたす $x\in I$ が一つもない。すると「その $x$ について $|f(x)-L|<\varepsilon$」は<em>どんな $L$ でも</em>成り立ってしまい（[[propositional-logic#rem-vacuous|空虚な真]]）、極限が一つに決まらない。だから区間の右端では右側極限を考えない。` },
      { t: 'prop', id: 'prop-two-sided', title: '両側極限と片側極限', yomi: 'りょうがわきょくげんとかたがわきょくげん', imp: 2, text: R`$I\subset\mathbb{R}$ を開区間、$a\in I$、$f:I\setminus\{a\}\to\mathbb{R}$、$L\in\mathbb{R}$ とする。$\displaystyle\lim_{x\to a}f(x)=L$ であることは、右側極限と左側極限がともに存在して $L$ に等しいことと同値である。` },
      {
        t: 'proof',
        steps: [
          { text: R`(⇒) 両側極限の $\delta$ は、$0<x-a<\delta$ の $x$ にも $0<a-x<\delta$ の $x$ にも使えるので、そのまま右側・左側の $\delta$ になる。` },
          { text: R`(⇐) $\varepsilon>0$ に対し、右側の $\delta_1$ と左側の $\delta_2$ をとり、$\delta=\min\{\delta_1,\delta_2\}$ とおく。$0<|x-a|<\delta$ ならば、$x>a$ のときは $0<x-a<\delta_1$、$x<a$ のときは $0<a-x<\delta_2$ なので、どちらでも $|f(x)-L|<\varepsilon$。` },
        ],
      },
      { t: 'thm', id: 'thm-flim-unique', title: '関数の極限の一意性', yomi: 'かんすうのきょくげんのいちいせい', imp: 2, text: R`$I\subset\mathbb{R}$ を開区間、$a\in I$、$f:I\setminus\{a\}\to\mathbb{R}$、$L,M\in\mathbb{R}$ とする。$\displaystyle\lim_{x\to a}f(x)=L$ かつ $\displaystyle\lim_{x\to a}f(x)=M$ ならば、$L=M$ である。片側極限についても同様である。` },
      {
        t: 'proof',
        sketch: R`[[sequence-convergence#thm-unique|数列の極限の一意性]]と同じ。$a$ の十分近くの<em>一点</em> $x$ で、$f(x)$ が $L$ にも $M$ にも近いことを使う。`,
        steps: [
          { text: R`$L\ne M$ と仮定し、$\varepsilon=\frac{|L-M|}{2}>0$ とおく。$0<|x-a|<\delta_1$ で $|f(x)-L|<\varepsilon$、$0<|x-a|<\delta_2$ で $|f(x)-M|<\varepsilon$ となる $\delta_1,\delta_2$ をとる。` },
          { text: R`$0<|x-a|<\min\{\delta_1,\delta_2\}$ をみたす $x$ を一つとると`, eqs: [[R`|L-M|\le|L-f(x)|+|f(x)-M|<2\varepsilon=|L-M|`, R`三角不等式`]], why: R`ここで「$0<|x-a|<\min\{\delta_1,\delta_2\}$ をみたす $x$ が定義域内に<em>存在する</em>」ことを使っている。$a$ の近くに定義域の点がなければ、上の片側極限の注意と同じく、どんな値も「極限」になってしまう。` },
          { text: R`$|L-M|<|L-M|$ は矛盾なので、$L=M$。` },
        ],
      },
      { t: 'prop', id: 'prop-flim-order', title: '関数の極限と不等式', yomi: 'かんすうのきょくげんとふとうしき', imp: 2, text: R`$\delta_0>0$、$F:(0,\delta_0)\to\mathbb{R}$ とし、すべての $h\in(0,\delta_0)$ で $F(h)\le0$ とする。ある $L\in\mathbb{R}$ について $\displaystyle\lim_{h\to+0}F(h)=L$ ならば、$L\le0$ である。（左側極限で $F(h)\ge0$ なら $L\ge0$ も同様）` },
      { t: 'strategy', text: R`背理法。$L>0$ なら、$\varepsilon=L$ にとると $F(h)$ は $L$ から $L$ 未満しかずれられないので $0$ を下回れない。これが $F(h)\le0$ とぶつかる。` },
      {
        t: 'proof',
        steps: [
          { text: R`$L>0$ と仮定し、$\varepsilon=L$ とおく。極限の定義より、$0<h<\delta$ ならば $|F(h)-L|<L$ となる $\delta>0$ がある。` },
          { text: R`絶対値を外すと`, eqs: [[R`-L<F(h)-L<L,\quad\text{すなわち}\quad 0<F(h)<2L.`, R`$|t|<L\iff-L<t<L$`]] },
          { text: R`$h_0=\frac12\min\{\delta,\delta_0\}$ とおくと、$0<h_0<\delta$ より $F(h_0)>0$、$0<h_0<\delta_0$ より $F(h_0)\le0$。矛盾するので $L\le0$。` },
        ],
      },
      { t: 'rem', title: '「<」は極限で「≤」に弱まる', text: R`$F(h)=-h$ は $h>0$ でつねに $F(h)<0$ だが、$\displaystyle\lim_{h\to+0}F(h)=0$ である。仮定が $F(h)<0$ でも、結論は $L<0$ ではなく $L\le0$ までしか言えない。` },
      { t: 'fig', type: 'plot', preset: 'negh', caption: R`$F(h)=-h$（$0<h\le1$）。どの $h>0$ でも負だが、$h\to+0$ の極限は $0$（白丸は $h=0$ が含まれないことを表す）。` },
      { t: 'qa', q: R`$\delta$ は何に依存して決まる？`, a: R`$\varepsilon$ に依存する。定義が「$\forall\varepsilon\ \exists\delta$」の順なので、$\varepsilon$ を見てから $\delta$ を選んでよい。点 $a$ にも依存してよい（[[continuity#def-cont|連続]]では $\delta=\delta(\varepsilon,a)$ と書くことがある）。一方、$x$ に依存させてはいけない。$\delta$ を決めてから「すべての $x$」を調べるからである。` },
      { t: 'qa', q: R`なぜ $\varepsilon=L$ と選ぶのか？`, a: R`$F(h)$ が $L$ から $L$ 未満しかずれなければ、$F(h)$ は $0$ より上にいるしかない（$0<F(h)<2L$）。「$L$ と $0$ の距離」をそのまま誤差に使うと、$0$ を超えられないことが言える。` },

      { t: 'h2', id: 'graph', text: 'グラフで確かめる' },
      { t: 'p', text: R`式・点 $a$・極限の候補 $L$ を変えて、$\varepsilon$ に対して $\delta$ がどう決まるかを観察しよう。<code>x*sin(1/x)</code> は $a=0$ の近くで激しく振動するが、振幅が $|x|$ で押さえられるので $L=0$ に収束する。<code>sign(x)</code> は $a=0$ で極限をもたない。` },
      { t: 'fig', type: 'epsdelta', preset: 'xsin', editable: true, caption: R`$\delta$ は「$a$ から最も近い、帯の外に出る点」までの距離で決まる。どんなに $\varepsilon$ を小さくしても $\delta>0$ がとれれば、極限は $L$ である。` },

      { t: 'h2', id: 'counter', text: '反例' },
      { t: 'ex', id: 'ex-sign', title: 'sign(x) は x → 0 で極限をもたない', text: R`$\operatorname{sign}(x)$ は $x>0$ で $1$、$x<0$ で $-1$、$x=0$ で $0$ をとる関数である。$x_n=\frac1n\to0$ では $\operatorname{sign}(x_n)=1\to1$、$x_n=-\frac1n\to0$ では $\operatorname{sign}(x_n)=-1\to-1$。行き先が違うので、[[function-limit#thm-seq-crit|数列による特徴づけ]]より $x\to0$ の極限は存在しない。` },
      { t: 'fig', type: 'epsdelta', preset: 'sign', caption: R`$\operatorname{sign}(x),\ a=0,\ L=0$。$\varepsilon\le1$ では、$0$ のどれだけ近くにも帯の外の点がある。$L$ をどう選んでも同じことが起きる。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-fl-1', level: 1, title: '基本', text: R`$f:\mathbb{R}\to\mathbb{R}$, $f(x)=3x-1$ とする。$\varepsilon$-$\delta$ 論法を用いて、$\displaystyle\lim_{x\to2}(3x-1)=5$ を示せ。`, hint: R`$|(3x-1)-5|=3|x-2|$。`, answer: R`$\varepsilon>0$ に対し $\delta=\frac\varepsilon3$ とおく。$0<|x-2|<\delta$ ならば $|(3x-1)-5|=3|x-2|<3\delta=\varepsilon$。よって $\lim_{x\to2}(3x-1)=5$。`, space: 5 },
      { t: 'problem', id: 'prob-fl-2', level: 2, title: '標準', text: R`$f:\mathbb{R}\setminus\{0\}\to\mathbb{R}$, $f(x)=x\sin\frac1x$ とする。$\displaystyle\lim_{x\to0}f(x)=0$ を示せ。（$|\sin t|\le1$ は認めてよい）`, hint: R`$\left|x\sin\frac1x\right|\le|x|$ から、$\delta=\varepsilon$ でよい。`, answer: R`$\varepsilon>0$ に対し $\delta=\varepsilon$ とおく。$0<|x|<\delta$ ならば $\left|x\sin\frac1x-0\right|=|x|\left|\sin\frac1x\right|\le|x|<\varepsilon$。よって極限は $0$。$\sin\frac1x$ 自身は $x\to0$ で極限をもたないが、$|x|$ で押さえ込まれるので積は $0$ に収束する。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'continuity',
    title: '連続関数',
    sub: 'ε-δ による連続性',
    yomi: 'れんぞくかんすう',
    aliases: ['れんぞく', '連続', '連続性', 'れんぞくせい', 'ふれんぞく', '不連続', 'でぃりくれかんすう', 'ディリクレ関数'],
    kind: '用語',
    field: '関数の極限と連続',
    grade: '1年前期',
    importance: 3,
    prereq: ['function-limit'],
    related: ['intermediate-value', 'extreme-value', 'differentiability'],
    notation: [
      R`$I\subset\mathbb{R}$：区間。$f:I\to\mathbb{R}$ は「$I$ のすべての点で定義された実数値関数」。`,
      R`$C(I)$：$I$ 上の連続関数全体の集合。$f\in C(I)$ は「$f$ は $I$ 上で連続」。`,
      R`$\delta=\delta(\varepsilon,a)>0$：$\delta$ は誤差 $\varepsilon>0$ と点 $a\in I$ に応じて決まる。`,
      R`$g\circ f$：合成関数 $(g\circ f)(x)=g(f(x))$（[[maps#def-comp|写像の合成]]）。`,
    ],
    synopsis: R`$f$ が点 $a$ で連続とは、$x$ を $a$ に十分近づければ $f(x)$ が $f(a)$ にいくらでも近くなること。極限の言葉では $\displaystyle\lim_{x\to a}f(x)=f(a)$。「グラフがつながっている」という直感を、ε-δ で厳密にしたものである。`,
    body: [
      { t: 'h2', id: 'definition', text: '定義' },
      { t: 'def', id: 'def-cont', title: '連続', yomi: 'れんぞく', imp: 3, text: R`$I$ を区間、$f:I\to\mathbb{R}$、$a\in I$ とする。$f$ が $a$ で<b class="term">連続</b>であるとは、次が成り立つことをいう。
$$\forall\varepsilon>0,\ \exists\delta=\delta(\varepsilon,a)>0\ \text{ s.t. }\ \forall x\in I,\quad |x-a|<\delta\ \Longrightarrow\ |f(x)-f(a)|<\varepsilon. \tag{#}$$
$I$ のすべての点で連続なとき、$f$ は $I$ 上で<b class="term">連続</b>（連続関数）であるという。` },
      { t: 'fig', type: 'epsdelta', preset: 'sqrt', cont: true, caption: R`$f(x)=\sqrt x$ の $a=1$ での連続性。極限のときと違い、帯の中心は $f(a)$ そのもの（黒丸）である。` },
      { t: 'note', title: '極限との違いは「0 <」と「L = f(a)」の二点だけ', text: R`[[function-limit#def-flim|関数の極限]]の定義と比べると、① $0<|x-a|$ の「$0<$」がない（$x=a$ を含めてよい。$|f(a)-f(a)|=0<\varepsilon$ なので自動的に成り立つ）、② 行き先 $L$ が $f(a)$ になっている。したがって、$a$ が区間の内部の点なら「$f$ が $a$ で連続 $\iff\displaystyle\lim_{x\to a}f(x)=f(a)$」である。` },
      { t: 'rem', title: '区間の端では片側だけを見る', text: R`定義の「$\forall x\in I$」により、$a$ が区間の端点なら、区間の内側からの近づき方だけを考えることになる。たとえば $\sqrt x$ は $[0,\infty)$ 上の関数として $x=0$ で連続である。` },

      { t: 'def', id: 'def-ci', title: '連続関数の集合 C(I)', yomi: 'れんぞくかんすうのしゅうごう', imp: 1, text: R`区間 $I$ 上の連続関数全体の集合を
$$C(I):=\{f:I\to\mathbb{R}\mid f\text{ は }I\text{ のすべての点で連続}\}$$
と書く。「$f\in C([a,b])$」は「$f$ は閉区間 $[a,b]$ 上で連続」と同じ意味である。` },
      { t: 'qa', q: R`連続の定義の $\delta$ は、点 $a$ によって変わってよい？`, a: R`よい。定義は「各点 $a$ ごとに」述べられているので、$\delta$ は $\varepsilon$ と $a$ の両方に依存してよい（$\delta=\delta(\varepsilon,a)$）。たとえば $f(x)=\frac1x$ を $(0,\infty)$ で考えると、$a$ が $0$ に近いほどグラフが急になり、同じ $\varepsilon$ に対して必要な $\delta$ は小さくなる。$\delta$ を $a$ によらず一つにとれるとき、$f$ は<b class="term">一様連続</b>であるという。` },
      { t: 'qa', q: R`「$f$ は $I$ 上で連続」と「$f$ は $I$ の各点で連続」は違う？`, a: R`同じ意味である（定義そのもの）。違いが生まれるのは「一様連続」のように、量化子 $\forall a$ と $\exists\delta$ の順番を入れ替えたときである。$\forall\varepsilon\,\forall a\,\exists\delta$（連続）と $\forall\varepsilon\,\exists\delta\,\forall a$（一様連続）では、後者のほうが強い。` },

      { t: 'h2', id: 'properties', text: '基本的な性質' },
      { t: 'prop', id: 'prop-cont-seq', title: '連続性の数列による特徴づけ', yomi: 'れんぞくせいのすうれつによるとくちょうづけ', imp: 3, text: R`$I\subset\mathbb{R}$ を区間、$f:I\to\mathbb{R}$、$a\in I$ とする。$f$ が $a$ で連続であることは、「すべての $n\in\mathbb{N}$ で $x_n\in I$ であり $x_n\to a$ となる任意の実数列 $\{x_n\}$ について $f(x_n)\to f(a)$」と同値である。` },
      {
        t: 'proof',
        sketch: R`[[function-limit#thm-seq-crit|関数の極限の数列による特徴づけ]]と同じ証明である。違いは $x_n=a$ となる項があってもよい点だけで、そのとき $|f(x_n)-f(a)|=0$ なので何も困らない。`,
        steps: [
          { text: R`(⇒) $\varepsilon>0$ に対する $\delta$ をとり、$n\ge N$ で $|x_n-a|<\delta$ となる $N$ をとれば、$n\ge N$ で $|f(x_n)-f(a)|<\varepsilon$。` },
          { text: R`(⇐) 対偶。連続でないなら、ある $\varepsilon_0>0$ と、$|x_n-a|<\frac1n$ かつ $|f(x_n)-f(a)|\ge\varepsilon_0$ をみたす $x_n\in I$ がとれる。$x_n\to a$ だが $f(x_n)\not\to f(a)$ である。` },
        ],
      },
      { t: 'prop', id: 'prop-cont-arith', title: '連続関数の和・積・商', yomi: 'れんぞくかんすうのわ・せき・しょう', imp: 2, text: R`$I\subset\mathbb{R}$ を区間、$f,g:I\to\mathbb{R}$ が $a\in I$ で連続とする。このとき $f+g$、$fg$（$(f+g)(x)=f(x)+g(x)$、$(fg)(x)=f(x)g(x)$）も $a$ で連続である。さらに $g(a)\ne0$ ならば、ある $\delta_0>0$ について $J:=I\cap(a-\delta_0,a+\delta_0)$ 上で $g\ne0$ となり、$\dfrac fg:J\to\mathbb{R}$ も $a$ で連続である。特に $f,g\in C(I)$ ならば $f+g,\ fg\in C(I)$。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x_n\to a$ とすると、上の命題より $f(x_n)\to f(a)$、$g(x_n)\to g(a)$。[[sequence-convergence#prop-arith|数列の極限の四則演算]]より $f(x_n)+g(x_n)\to f(a)+g(a)$、$f(x_n)g(x_n)\to f(a)g(a)$、$\frac{f(x_n)}{g(x_n)}\to\frac{f(a)}{g(a)}$。数列は任意なので、再び上の命題より結論を得る。`, why: R`商については、$g(a)\ne0$ のとき $g$ の連続性から $a$ の近くで $g(x)\ne0$ となり、$\frac fg$ が $a$ の近くで定義されることにも注意する（[[intermediate-value#lem-sign|符号の保存]]と同じ論法）。` },
        ],
      },
      { t: 'prop', id: 'prop-cont-comp', title: '連続関数の合成', yomi: 'れんぞくかんすうのごうせい', imp: 2, text: R`$I,J\subset\mathbb{R}$ を区間、$f:I\to\mathbb{R}$ で $f(I)\subset J$、$g:J\to\mathbb{R}$ とする。$f$ が $a\in I$ で連続、$g$ が $b=f(a)$ で連続ならば、合成関数 $g\circ f:I\to\mathbb{R}$ は $a$ で連続である。` },
      { t: 'strategy', text: R`$\varepsilon$ を $g$ に渡して $\eta$ を受け取り、その $\eta$ を $f$ に渡して $\delta$ を受け取る。「誤差の受け渡し」を二段階で行う。` },
      {
        t: 'proof',
        sketch: R`ゴール側から逆にたどる：$g(y)$ を $g(b)$ の $\varepsilon$ 近くにするには $y$ を $b$ の $\eta$ 近くにすればよく、$f(x)$ を $b=f(a)$ の $\eta$ 近くにするには $x$ を $a$ の $\delta$ 近くにすればよい。`,
        steps: [
          { text: R`$\varepsilon>0$ を任意にとる。$g$ は $b$ で連続なので、ある $\eta=\eta(\varepsilon)>0$ が存在して、$y\in J$, $|y-b|<\eta$ ならば $|g(y)-g(b)|<\varepsilon$。` },
          { text: R`$f$ は $a$ で連続なので、この $\eta$ を「誤差」として使うと、ある $\delta=\delta(\eta)>0$ が存在して、$x\in I$, $|x-a|<\delta$ ならば $|f(x)-f(a)|<\eta$。` },
          { text: R`$x\in I$, $|x-a|<\delta$ ならば、$y=f(x)\in J$ は $|y-b|<\eta$ をみたすので、$|g(f(x))-g(f(a))|<\varepsilon$。よって $g\circ f$ は $a$ で連続。` },
        ],
      },
      { t: 'ex', id: 'ex-poly', title: '多項式は連続', text: R`$c\in\mathbb{R}$ とする。定数関数 $f:\mathbb{R}\to\mathbb{R}$, $f(x)=c$ は（どんな $\delta$ でも $|f(x)-f(a)|=0$ なので）連続であり、$f(x)=x$ は $\delta=\varepsilon$ で連続である。和と積は連続性を保つので、これらから作られる多項式 $p(x)=c_0+c_1x+\cdots+c_nx^n$（$n\in\mathbb{N}\cup\{0\}$、各 $c_k\in\mathbb{R}$）はすべて $C(\mathbb{R})$ に属する。分母が $0$ にならない点では、有理関数（多項式の商）も連続である。` },
      { t: 'ex', id: 'ex-abs-cont', title: '|x| は連続', text: R`[[abs-triangle#cor-rev|逆向きの三角不等式]]より $\bigl||x|-|a|\bigr|\le|x-a|$。したがって $\delta=\varepsilon$ とおけば、$|x-a|<\delta\Rightarrow\bigl||x|-|a|\bigr|<\varepsilon$。` },

      { t: 'h2', id: 'graph', text: 'グラフで確かめる' },
      { t: 'fig', type: 'epsdelta', preset: 'sq', cont: true, editable: true, caption: R`連続性のモード（$L=f(a)$ に固定）。プリセットの <code>sign(x)</code>（$a=0$）では、$f(0)=0$ の $\varepsilon$ 帯からすぐ外れる点が $0$ のいくらでも近くにあるので、$\delta$ が見つからない。` },

      { t: 'h2', id: 'counter', text: '反例と注意' },
      { t: 'ex', id: 'ex-dirichlet', title: 'ディリクレ関数はどこでも不連続', text: R`$D:\mathbb{R}\to\mathbb{R}$, $D(x)=\begin{cases}1&(x\in\mathbb{Q})\\0&(x\notin\mathbb{Q})\end{cases}$ とする。どんな区間にも有理数と無理数が含まれる（有理数・無理数の稠密性）ので、どの点 $a$ のどれだけ近くにも $D$ の値が $1$ の点と $0$ の点がある。$\varepsilon=\frac12$ に対してどんな $\delta$ も条件をみたさず、$D$ はすべての点で不連続である。` },
      { t: 'ex', id: 'ex-xd', title: 'x·D(x) は 0 でだけ連続', text: R`$g(x)=xD(x)$ とする。$|g(x)-g(0)|=|x|D(x)\le|x|$ なので、$\delta=\varepsilon$ で $0$ において連続である。一方 $a\ne0$ では、$a$ の近くで $g$ の値は $0$ と $a$ の近くの値を行き来するので不連続である。「連続な点が一点だけ」の関数もありうる。` },
      { t: 'note', title: '「グラフがつながっている」は定義ではない', text: R`直感として有用だが、上の $xD(x)$ のように「描けない」関数の連続性は、直感では判断できない。連続性は<em>一点ごと</em>の性質であり、区間全体のつながりは[[intermediate-value|中間値の定理]]として、定義から証明すべき事実である。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-cont-1', level: 1, title: '基本', text: R`$f:\mathbb{R}\to\mathbb{R}$, $f(x)=x^2$ が $a=2$ で連続であることを、$\varepsilon$-$\delta$ 論法で示せ。`, hint: R`$|x^2-4|=|x-2|\,|x+2|$。$|x-2|<1$ なら $|x+2|<5$。`, answer: R`$\varepsilon>0$ に対し $\delta=\min\{1,\frac\varepsilon5\}$ とおく。$|x-2|<\delta$ ならば $|x-2|<1$ より $1<x<3$、よって $|x+2|<5$。したがって $|x^2-4|=|x-2|\,|x+2|<5\cdot\frac\varepsilon5=\varepsilon$。`, space: 6 },
      { t: 'problem', id: 'prob-cont-2', level: 2, title: '標準', text: R`$a>0$ とし、$f:(0,\infty)\to\mathbb{R}$, $f(x)=\dfrac1x$ とする。$f$ が $a$ で連続であることを、$\varepsilon$-$\delta$ 論法で示せ。`, hint: R`$\left|\frac1x-\frac1a\right|=\frac{|x-a|}{|x|a}$。まず $\delta\le\frac a2$ として $x>\frac a2$ を保証する。`, answer: R`$\delta=\min\left\{\frac a2,\ \frac{a^2}{2}\varepsilon\right\}$ とおく。$|x-a|<\delta$ ならば $x>a-\frac a2=\frac a2>0$ なので、$\left|\frac1x-\frac1a\right|=\frac{|x-a|}{xa}<\frac{2}{a^2}|x-a|<\frac2{a^2}\cdot\frac{a^2}{2}\varepsilon=\varepsilon$。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'intermediate-value',
    title: '中間値の定理',
    sub: '',
    yomi: 'ちゅうかんちのていり',
    aliases: ['ちゅうかんち', '中間値', 'ふごうのほぞん', '符号の保存', '方程式の解の存在'],
    kind: '定理',
    field: '関数の極限と連続',
    grade: '1年前期',
    importance: 3,
    prereq: ['continuity', 'supremum'],
    related: ['extreme-value', 'continuity', 'rolle'],
    notation: [
      R`$a,b\in\mathbb{R}$, $a<b$。$[a,b]$ は閉区間、$(a,b)$ は開区間。`,
      R`$f\in C([a,b])$：$f:[a,b]\to\mathbb{R}$ は $[a,b]$ のすべての点で連続。`,
      R`$\sup S$：集合 $S\subset\mathbb{R}$ の上限（[[supremum]]）。`,
    ],
    synopsis: R`閉区間で連続な関数は、両端の値の間にあるすべての値を途中で必ずとる。「グラフがつながっている」という直感を定理にしたもので、方程式の解の存在を示す基本的な道具である。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-ivt', title: '中間値の定理', yomi: 'ちゅうかんちのていり', imp: 3, text: R`$a,b\in\mathbb{R}$, $a<b$、$f\in C([a,b])$ とし、$c\in\mathbb{R}$ が $f(a)$ と $f(b)$ の間の値（$f(a)<c<f(b)$ または $f(a)>c>f(b)$）ならば、$f(\xi)=c$ となる $\xi\in(a,b)$ が存在する。` },
      { t: 'fig', type: 'ivt', preset: 'wave', editable: true, caption: R`赤い破線が $y=c$、赤い点が $f(\xi)=c$ となる点 $\xi$。下端の黄色い帯が集合 $S=\{x\in[a,b]\mid f(x)<c\}$、紺の破線が $s=\sup S$。証明ではこの $s$ が求める $\xi$ になることを示す（$\xi$ が複数あるときは、$s$ は一番右のものになる）。` },
      { t: 'note', title: '当たり前に見えるが、中身は「実数の連続性」', text: R`もし数直線に「穴」があれば、この定理は崩れる。たとえば有理数だけの世界で $f(x)=x^2-2$ を $[0,2]$ 上で考えると、$f(0)=-2<0<2=f(2)$ なのに、$f(x)=0$ となる有理数 $x$（$=\sqrt2$）は存在しない。証明に[[supremum#ax-sup|上限公理]]が必要になるのはこのためである。` },

      { t: 'h2', id: 'lemma', text: '符号の保存' },
      { t: 'lem', id: 'lem-sign', title: '符号の保存', yomi: 'ふごうのほぞん', imp: 2, text: R`$I\subset\mathbb{R}$ を区間、$f:I\to\mathbb{R}$ が $s\in I$ で連続、$c\in\mathbb{R}$ とする。$f(s)>c$ ならば、ある $\delta>0$ が存在して、$x\in I$, $|x-s|<\delta$ をみたすすべての $x$ について $f(x)>c$ である。$f(s)<c$ の場合も同様に、$s$ の近くで $f(x)<c$ となる。` },
      {
        t: 'proof',
        sketch: R`$f(s)$ と $c$ の差 $f(s)-c$ を $\varepsilon$ に選べば、$s$ の近くの $f(x)$ は $c$ より下に落ちられない。`,
        steps: [
          { text: R`$\varepsilon:=f(s)-c>0$ とおく。連続性より、$x\in I$, $|x-s|<\delta$ ならば $|f(x)-f(s)|<\varepsilon$ となる $\delta=\delta(\varepsilon,s)>0$ がとれる。` },
          { text: R`このとき`, eqs: [[R`f(x) > f(s)-\varepsilon = c.`, R`$|f(x)-f(s)|<\varepsilon$ の左半分`]] },
        ],
      },

      { t: 'h2', id: 'proof', text: '証明' },
      { t: 'strategy', text: R`$f(a)<c<f(b)$ の場合を示せば十分。集合 $S=\{x\in[a,b]\mid f(x)<c\}$ の上限 $s$ をとる。$s$ は「$f$ が $c$ を下回っている最後の場所」であり、$f(s)<c$ と $f(s)>c$ のどちらを仮定しても、[[intermediate-value#lem-sign|符号の保存]]で $s$ が上限であることに矛盾する。` },
      {
        t: 'proof',
        sketch: R`$f(s)<c$ なら、$s$ の少し右でも $f<c$ なので、$s$ より大きい $S$ の元があることになる。$f(s)>c$ なら、$s$ の少し左には $S$ の元がないので、$s$ より小さい上界があることになる。どちらも上限の定義に反するので $f(s)=c$。`,
        steps: [
          { text: R`$f(a)<c<f(b)$ と仮定してよい。`, why: R`$f(a)>c>f(b)$ のときは $g=-f$ と $-c$ を考えると、$g$ は連続で $g(a)<-c<g(b)$。$g(\xi)=-c$ となる $\xi$ は $f(\xi)=c$ をみたす。` },
          { text: R`$S=\{x\in[a,b]\mid f(x)<c\}$ とおく。$f(a)<c$ より $a\in S$ なので $S$ は空でなく、$b$ は $S$ の上界である。[[supremum#ax-sup|上限公理]]より $s=\sup S$ が存在し、$a\le s\le b$。`, why: R`$a\in S$ なので $a\le\sup S=s$。$b$ は上界で、$s$ は最小の上界なので $s\le b$。` },
          { text: R`<b>$f(s)<c$ と仮定する。</b>$f(b)>c$ なので $s\ne b$、すなわち $s<b$。符号の保存より、$|x-s|<\delta$ ならば $f(x)<c$ となる $\delta>0$ がある。$x=\min\{s+\frac\delta2,\ b\}$ とおくと、$s<x\le b$ かつ $|x-s|<\delta$ なので $f(x)<c$、すなわち $x\in S$。これは $s$ が $S$ の上界であることに反する。`, why: R`$s<b$ と $\frac\delta2>0$ より、$x$ は $s$ より真に大きい。また $x\le b$ なので $x\in[a,b]$ であり、$S$ の元になれる。上界 $s$ より大きい元があるのは矛盾である。` },
          { text: R`<b>$f(s)>c$ と仮定する。</b>$f(a)<c$ なので $s\ne a$。符号の保存より、$|x-s|<\delta$ ならば $f(x)>c$ となる $\delta>0$ がある。すると区間 $(s-\delta,\ s]$ には $S$ の元が一つもない。$S$ の元はすべて $s$ 以下なので、結局すべて $s-\delta$ 以下であり、$s-\delta$ は $S$ の上界になる。これは $s$ が最小の上界であることに反する。`, why: R`$x\in S$ を任意にとる。$x\le s$ である（$s$ は上界）。もし $x>s-\delta$ なら $|x-s|<\delta$ なので $f(x)>c$ となり、$x\in S$（つまり $f(x)<c$）に反する。よって $x\le s-\delta$。` },
          { text: R`以上より $f(s)=c$。さらに $f(a)\ne c$、$f(b)\ne c$ なので $s\ne a,b$、すなわち $\xi=s\in(a,b)$ が求めるものである。` },
        ],
      },
      { t: 'crux', text: R`上限 $\sup S$ で「$c$ を下回る最後の場所」を<em>つかまえ</em>、連続性（符号の保存）で $f(s)<c$ と $f(s)>c$ の両方の可能性を<em>潰す</em>。実数の連続性と関数の連続性が、ちょうど一回ずつ使われている。` },

      { t: 'h2', id: 'apply', text: '応用' },
      { t: 'ex', id: 'ex-root', title: 'x³ + x − 1 = 0 は (0, 1) に解をもつ', text: R`$f:[0,1]\to\mathbb{R}$, $f(x)=x^3+x-1$ は多項式なので連続で、$f(0)=-1<0<1=f(1)$。中間値の定理より、$f(\xi)=0$ となる $\xi\in(0,1)$ が存在する。区間を半分ずつに絞る（二分法）と、$\xi\approx0.6823$ がわかる。` },
      { t: 'fig', type: 'ivt', preset: 'cubic', caption: R`$x^3-x-1$ on $[1,2]$。$c$ を動かすと、$f(\xi)=c$ となる $\xi$ が連続的に動く。` },

      { t: 'h2', id: 'counter', text: '仮定を外すと' },
      { t: 'p', text: R`$f$ が連続でなければ、値をとばすことができる。下の図の関数は $x=1$ で跳び、$-0.2$ と $0.8$ の間の値をとらない。` },
      { t: 'fig', type: 'ivt', preset: 'jump', caption: R`不連続な $0.5\operatorname{sign}(x-1)+0.3x$。$c$ を跳びの間にとると $\xi$ が存在しない。それでも $s=\sup S$ は存在する（$s=1$）が、$f(s)=c$ にならない。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-ivt-1', level: 1, title: '基本', text: R`方程式 $\cos x=x$ が区間 $\left(0,\frac\pi2\right)$ に解をもつことを示せ。（$\cos$ の連続性は認めてよい）`, hint: R`$g(x)=\cos x-x$ の両端の符号を調べる。`, answer: R`$g(x)=\cos x-x$ は連続で、$g(0)=1>0$、$g\!\left(\frac\pi2\right)=-\frac\pi2<0$。中間値の定理より $g(\xi)=0$、すなわち $\cos\xi=\xi$ となる $\xi\in\left(0,\frac\pi2\right)$ が存在する。`, space: 5 },
      { t: 'problem', id: 'prob-ivt-2', level: 2, title: '標準', text: R`$f:[0,1]\to[0,1]$ が連続（$f\in C([0,1])$ かつすべての $x\in[0,1]$ で $0\le f(x)\le1$）ならば、$f(\xi)=\xi$ となる $\xi\in[0,1]$（不動点）が存在することを示せ。`, hint: R`$g(x)=f(x)-x$ とおくと $g(0)\ge0\ge g(1)$。等号の場合を別に扱う。`, answer: R`$g(x)=f(x)-x$ は連続。$f(0)\in[0,1]$ より $g(0)=f(0)\ge0$、$f(1)\le1$ より $g(1)=f(1)-1\le0$。$g(0)=0$ なら $\xi=0$、$g(1)=0$ なら $\xi=1$ でよい。そうでなければ $g(0)>0>g(1)$ なので、中間値の定理より $g(\xi)=0$ となる $\xi\in(0,1)$ がある。`, space: 7 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'extreme-value',
    title: '最大値・最小値の定理',
    sub: 'ワイエルシュトラスの定理',
    yomi: 'さいだいち・さいしょうちのていり',
    aliases: ['さいだいち', 'さいしょうち', '最大値', '最小値', '最大値の定理', 'わいえるしゅとらすのていり', '有界性', 'ゆうかいせい'],
    kind: '定理',
    field: '関数の極限と連続',
    grade: '1年前期',
    importance: 3,
    prereq: ['continuity', 'bolzano-weierstrass'],
    related: ['rolle', 'intermediate-value'],
    notation: [
      R`$a,b\in\mathbb{R}$, $a<b$。$f\in C([a,b])$：$f:[a,b]\to\mathbb{R}$ は連続。`,
      R`$\sup_{x\in[a,b]}f(x):=\sup\{f(x)\mid x\in[a,b]\}$：値の集合の上限。`,
      R`$\{x_{n_k}\}$：点列 $\{x_n\}$ の部分列（[[bolzano-weierstrass#def-subseq|部分列]]）。`,
    ],
    synopsis: R`閉区間 $[a,b]$ 上の連続関数は、最大値と最小値を必ずとる。ロルの定理・平均値の定理をはじめ、「最適な点が存在する」ことを保証する基本定理である。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-evt', title: '最大値・最小値の定理', yomi: 'さいだいち・さいしょうちのていり', imp: 3, text: R`$a,b\in\mathbb{R}$, $a<b$、$f\in C([a,b])$ ならば、$f$ は $[a,b]$ 上で最大値と最小値をとる。すなわち、ある $x_M,x_m\in[a,b]$ が存在して、すべての $x\in[a,b]$ について $f(x_m)\le f(x)\le f(x_M)$ が成り立つ。` },
      { t: 'fig', type: 'extrema', preset: 'poly', editable: true, caption: R`区間 $[a,b]$ 上の最大の点（赤）と最小の点（紺）。最大・最小は、区間の内部でも端点でもとりうる。` },
      { t: 'strategy', text: R`二段階で示す。① $f$ は有界である（[[extreme-value#lem-bdd|補題]]）。② 上限 $M=\sup f$ に近づく点列を作り、[[bolzano-weierstrass|ボルツァーノ＝ワイエルシュトラスの定理]]で収束部分列を取り出して、その極限で $f$ が $M$ に等しいことを示す。` },

      { t: 'h2', id: 'bdd', text: '有界性' },
      { t: 'lem', id: 'lem-bdd', title: '閉区間上の連続関数は有界', yomi: 'へいくかんじょうのれんぞくかんすうはゆうかい', imp: 2, text: R`$a,b\in\mathbb{R}$, $a<b$、$f\in C([a,b])$ ならば、ある $K\in\mathbb{R}$, $K>0$ が存在して、すべての $x\in[a,b]$ について $|f(x)|\le K$ である。` },
      {
        t: 'proof',
        sketch: R`有界でないなら、$|f(x_n)|>n$ となる点 $x_n$ がとれる。$x_n$ は $[a,b]$ の中にあるので収束部分列 $x_{n_k}\to\xi$ がある。連続性から $f(x_{n_k})\to f(\xi)$ なので $f(x_{n_k})$ は有界のはずだが、$|f(x_{n_k})|>n_k$ で発散する。`,
        steps: [
          { text: R`有界でないと仮定する。「$\exists K>0\ \forall x\in[a,b]\ |f(x)|\le K$」の否定より、各 $n\in\mathbb{N}$ について（$K=n$ として）$|f(x_n)|>n$ となる $x_n\in[a,b]$ が存在する。` },
          { text: R`$\{x_n\}$ は $a\le x_n\le b$ で有界なので、ボルツァーノ＝ワイエルシュトラスの定理より収束部分列 $x_{n_k}\to\xi$ がとれる。さらに $a\le\xi\le b$ である。`, why: R`すべての $k$ で $a\le x_{n_k}\le b$ なので、[[sequence-convergence#prop-order|極限と不等式]]より $a\le\xi\le b$。<em>区間が閉じている</em>（端点を含む）ことがここで効く。開区間 $(a,b)$ だと、極限 $\xi$ が端点になって区間からはみ出すかもしれない。` },
          { text: R`$f$ は $\xi$ で連続なので、[[continuity#prop-cont-seq|数列による特徴づけ]]より $f(x_{n_k})\to f(\xi)$。収束列は有界なので、ある $K'$ で $|f(x_{n_k})|\le K'$ がすべての $k$ で成り立つ。` },
          { text: R`一方 $|f(x_{n_k})|>n_k\ge k$ なので、$k>K'$ とすると矛盾する。よって $f$ は有界である。` },
        ],
      },

      { t: 'h2', id: 'proof', text: '定理の証明' },
      {
        t: 'proof',
        sketch: R`$M=\sup f$ のすぐ下 $M-\frac1n$ を超える値をとる点 $x_n$ を集め、収束部分列 $x_{n_k}\to\xi$ をとる。$f(x_{n_k})$ は $M-\frac1{n_k}$ と $M$ に挟まれて $M$ に収束し、同時に連続性から $f(\xi)$ に収束するので、$f(\xi)=M$。`,
        steps: [
          { text: R`補題より値の集合 $\{f(x)\mid x\in[a,b]\}$ は空でなく上に有界なので、上限公理より $M=\sup_{x\in[a,b]}f(x)$ が存在する。` },
          { text: R`各 $n$ について、$M-\frac1n$ は上界でないので、$f(x_n)>M-\frac1n$ となる $x_n\in[a,b]$ が存在する。`, why: R`$M$ は最小の上界なので、それより小さい $M-\frac1n$ は上界でない。「上界でない」とは「それを超える値 $f(x_n)$ がある」ということ（[[supremum#prop-sup-eps|上限の ε 特徴づけ]]で $\varepsilon=\frac1n$ としたもの）。` },
          { text: R`ボルツァーノ＝ワイエルシュトラスの定理より収束部分列 $x_{n_k}\to\xi$ がとれ、補題の証明と同様に $\xi\in[a,b]$。` },
          { text: R`すべての $k$ で`, eqs: [[R`M-\frac1{n_k} < f(x_{n_k}) \le M`, R`$x_n$ の取り方・$M$ は上界`]] },
          { text: R`$\frac1{n_k}\le\frac1k\to0$ なので、[[sequence-convergence#cor-squeeze|はさみうちの原理]]より $f(x_{n_k})\to M$。一方、連続性より $f(x_{n_k})\to f(\xi)$。[[sequence-convergence#thm-unique|極限の一意性]]より $f(\xi)=M$。$x_M=\xi$ とおけばよい。` },
          { text: R`最小値は $-f$ に同じ議論を適用すればよい。$-f$ の最大値をとる点で、$f$ は最小値をとる。` },
        ],
      },
      { t: 'qa', q: R`$f(x_{n_k})$ が $M$ に近づくだけで、実際には $M$ をとらない（振動する）ことはない？`, a: R`ない。存在は「近づく」ことからではなく、<em>極限の点</em> $\xi$ で $f(\xi)=M$ が成り立つことから言っている。$f(x_{n_k})\to M$ と、連続性による $f(x_{n_k})\to f(\xi)$ の二つが同時に成り立つので、極限の一意性から $f(\xi)=M$ である。連続性を外すと、この最後の一歩が崩れる（下の反例）。` },
      { t: 'crux', text: R`上限 $M$ は「値の世界」で存在が保証される（上限公理）。それを「点の世界」の $\xi$ に引き戻すのが、ボルツァーノ＝ワイエルシュトラスの定理と連続性である。閉区間の「閉」が、取り出した極限 $\xi$ を区間の中に留める。` },

      { t: 'h2', id: 'counter', text: '仮定を外すと' },
      { t: 'rem', title: '三つの仮定はどれも外せない', text: R`<ul><li><b>閉区間でない</b>：$f(x)=x$ は $(0,1)$ 上で連続だが、上限 $1$ をとる点がなく最大値をもたない。</li><li><b>有界な区間でない</b>：$f(x)=x$ は $[0,\infty)$ 上で連続だが、上に有界でない。</li><li><b>連続でない</b>：$[0,1]$ 上で $f(x)=x\ (x<1)$、$f(1)=0$ とすると、値は $1$ にいくらでも近づくが $1$ をとらない。</li></ul>` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-evt-1', level: 1, title: '基本', text: R`$f:(-1,1)\to\mathbb{R}$, $f(x)=x^2$ とする。最小値は存在するが、最大値は存在しないことを示せ。また、最大値・最小値の定理のどの仮定が成り立っていないか答えよ。`, hint: R`上限は $1$ だが、$x^2=1$ となる $x$ は $(-1,1)$ にない。`, answer: R`$f(0)=0\le f(x)$ なので最小値は $0$。一方 $f(x)<1$ がすべての $x\in(-1,1)$ で成り立ち、$x_n=1-\frac1n$ で $f(x_n)\to1$ なので $\sup f=1$。$1$ をとる点はないので最大値は存在しない。成り立っていない仮定は「区間が閉じている」こと。`, space: 6 },
    ],
  });
})();
