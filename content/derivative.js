/* 第 5 章：微分 */
(function () {
  const R = String.raw;
  const A = window.ARTICLES;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'differentiability',
    title: '微分可能性',
    sub: '微分係数と導関数',
    yomi: 'びぶんかのうせい',
    aliases: ['びぶん', '微分', '微分係数', 'びぶんけいすう', '導関数', 'どうかんすう', '接線', 'せっせん', '微分可能', 'びぶんかのう', '積の微分', 'せきのびぶん', 'らいぷにっつ'],
    kind: '用語',
    field: '微分',
    grade: '1年前期',
    importance: 3,
    prereq: ['function-limit', 'continuity'],
    related: ['rolle', 'mean-value', 'continuity'],
    synopsis: R`$f$ が $a$ で微分可能とは、割線の傾き $\dfrac{f(a+h)-f(a)}{h}$ が $h\to0$ で一つの実数に収束すること。その値 $f'(a)$ が接線の傾きであり、$f$ を $a$ の近くで最もよく近似する一次関数を与える。`,
    body: [
      { t: 'h2', id: 'intuition', text: '直感：割線から接線へ' },
      { t: 'p', text: R`グラフ上の 2 点 $P=(a,f(a))$ と $Q=(a+h,f(a+h))$ を結ぶ直線（割線）の傾きは $\dfrac{f(a+h)-f(a)}{h}$ である。$Q$ を $P$ に近づける（$h\to0$）と、割線は接線に近づく。この極限が<em>接線の傾き</em>である。` },
      { t: 'fig', type: 'tangent', preset: 'sq', caption: R`$f(x)=x^2,\ a=1$。赤い実線が割線 $PQ$、紺の破線が接線。$h$ を $0$ に近づけると割線の傾きは $2=f'(1)$ に近づく。$h<0$（$Q$ が左側）から近づけても同じ値になる。` },

      { t: 'h2', id: 'definition', text: '定義' },
      { t: 'def', id: 'def-diff', title: '微分可能・微分係数', yomi: 'びぶんかのう', imp: 3, text: R`$f$ を、点 $a$ を含む開区間で定義された関数とする。極限
$$f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h} \tag{#}$$
が（実数として）存在するとき、$f$ は $a$ で<b class="term">微分可能</b>であるといい、$f'(a)$ を $a$ における<b class="term">微分係数</b>という。` },
      { t: 'def', id: 'def-deriv', title: '導関数', yomi: 'どうかんすう', imp: 2, text: R`$f$ が開区間 $I$ のすべての点で微分可能なとき、$f$ は $I$ で微分可能であるという。このとき $x\mapsto f'(x)$ を $f$ の<b class="term">導関数</b>といい、$f'$、$\dfrac{df}{dx}$ などと書く。` },
      { t: 'note', title: 'x = a + h と置けば、もう一つの形になる', text: R`$x=a+h$ とおくと、$h\to0$ は $x\to a$ と同じことなので
$$f'(a)=\lim_{x\to a}\frac{f(x)-f(a)}{x-a}.$$
どちらの形も使う。計算では $h$ の形、理論では $x$ の形が便利なことが多い。` },
      { t: 'prop', id: 'prop-linear', title: '一次近似による言い換え', yomi: 'いちじきんじ', imp: 2, text: R`$f$ が $a$ で微分可能で $f'(a)=A$ であることは、
$$f(a+h)=f(a)+Ah+r(h),\qquad \lim_{h\to0}\frac{r(h)}{h}=0$$
をみたす関数 $r$ が存在することと同値である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$r(h)=f(a+h)-f(a)-Ah$ と定めると、$h\ne0$ で $\dfrac{r(h)}{h}=\dfrac{f(a+h)-f(a)}{h}-A$。したがって「$\frac{r(h)}{h}\to0$」と「$\frac{f(a+h)-f(a)}{h}\to A$」は同じことである。` },
        ],
      },
      { t: 'note', title: '接線は「誤差が h より速く消える」直線', text: R`$y=f(a)+f'(a)(x-a)$ が接線である。上の命題は、接線とグラフのずれ $r(h)$ が、$h$ そのものより<em>速く</em> $0$ に近づくことを言っている。微分とは「関数を一次関数で近似すること」であり、この見方は多変数の微分にそのまま引き継がれる。` },

      { t: 'h2', id: 'continuity', text: '微分可能性と連続性' },
      { t: 'thm', id: 'thm-diff-cont', title: '微分可能ならば連続', yomi: 'びぶんかのうならばれんぞく', imp: 2, text: R`$f$ が $a$ で微分可能ならば、$f$ は $a$ で連続である。` },
      { t: 'strategy', text: R`$f(a+h)-f(a)$ を「割線の傾き」×「$h$」と書く。前者は $f'(a)$ に、後者は $0$ に近づくので、積は $0$ に近づく。` },
      {
        t: 'proof',
        sketch: R`$f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h\to f'(a)\cdot0=0$。`,
        steps: [
          { text: R`$h\ne0$ のとき`, eqs: [[R`f(a+h)-f(a)=\frac{f(a+h)-f(a)}{h}\cdot h.`, R`$h$ で割って掛ける`]] },
          { text: R`$h\to0$ のとき、右辺の第 1 因子は $f'(a)$ に、第 2 因子は $0$ に収束する。[[function-limit#cor-flim-arith|関数の極限の四則演算]]より、右辺は $f'(a)\cdot0=0$ に収束する。` },
          { text: R`よって $\displaystyle\lim_{h\to0}f(a+h)=f(a)$。これは $\displaystyle\lim_{x\to a}f(x)=f(a)$、すなわち $f$ が $a$ で連続であることを意味する。`, why: R`$x=a+h$ とおけば、$h\to0$ と $x\to a$ は同じことである。$a$ は開区間の内部の点なので、[[continuity#def-cont|連続]]は $\lim_{x\to a}f(x)=f(a)$ と同値である。` },
        ],
      },
      { t: 'rem', title: '逆は成り立たない：|x| は 0 で微分可能でない', text: R`$f(x)=|x|$ は $0$ で連続だが、$\dfrac{f(0+h)-f(0)}{h}=\dfrac{|h|}{h}$ は $h>0$ で $1$、$h<0$ で $-1$ である。$h\to0$ の極限は存在しないので、$0$ で微分可能でない。グラフが<em>尖っている</em>点では接線が一本に決まらない。` },
      { t: 'fig', type: 'tangent', preset: 'abs', caption: R`$|x|$ の $a=0$。$h>0$ と $h<0$ で割線の傾きの行き先が $1$ と $-1$ に分かれる（紺の点線は左右それぞれの方向）。` },
      { t: 'def', id: 'def-onesided', title: '片側微分係数', yomi: 'かたがわびぶんけいすう', imp: 1, text: R`$\displaystyle\lim_{h\to+0}\frac{f(a+h)-f(a)}{h}$ を<b class="term">右微分係数</b>、$\displaystyle\lim_{h\to-0}\frac{f(a+h)-f(a)}{h}$ を<b class="term">左微分係数</b>という。$f$ が $a$ で微分可能であることは、左右の微分係数がともに存在して等しいことと同値である。` },

      { t: 'h2', id: 'rules', text: '計算の規則' },
      { t: 'prop', id: 'prop-product', title: '和と積の微分', yomi: 'わとせきのびぶん', imp: 2, text: R`$f,g$ が $a$ で微分可能ならば、$f+g$、$fg$ も $a$ で微分可能で
$$(f+g)'(a)=f'(a)+g'(a),\qquad (fg)'(a)=f'(a)g(a)+f(a)g'(a).$$` },
      { t: 'strategy', text: R`積は、分子 $f(a+h)g(a+h)-f(a)g(a)$ に $f(a+h)g(a)$ を引いて足し、「$g$ だけ動かした差」と「$f$ だけ動かした差」に分ける（[[sequence-convergence#prop-arith|数列の積の極限]]と同じ発想）。` },
      {
        t: 'proof',
        sketch: R`和は差分商が和に分かれるだけ。積は $f(a+h)\dfrac{g(a+h)-g(a)}{h}+g(a)\dfrac{f(a+h)-f(a)}{h}$ と分け、$f(a+h)\to f(a)$（微分可能なら連続）を使う。`,
        steps: [
          { text: R`<b>和</b>：$\dfrac{(f+g)(a+h)-(f+g)(a)}{h}=\dfrac{f(a+h)-f(a)}{h}+\dfrac{g(a+h)-g(a)}{h}\to f'(a)+g'(a)$。` },
          { text: R`<b>積</b>：分子を次のように変形する。`,
            eqs: [
              [R`f(a+h)g(a+h)-f(a)g(a)`, R`もとの分子`],
              [R`=f(a+h)\bigl(g(a+h)-g(a)\bigr)+\bigl(f(a+h)-f(a)\bigr)g(a)`, R`$f(a+h)g(a)$ を引いて足す`],
            ] },
          { text: R`両辺を $h$ で割ると`,
            eqs: [[R`\frac{(fg)(a+h)-(fg)(a)}{h}=f(a+h)\cdot\frac{g(a+h)-g(a)}{h}+\frac{f(a+h)-f(a)}{h}\cdot g(a).`, R`$h\ne0$ で割る`]] },
          { text: R`$h\to0$ とすると、$f(a+h)\to f(a)$、$\frac{g(a+h)-g(a)}{h}\to g'(a)$、$\frac{f(a+h)-f(a)}{h}\to f'(a)$ なので、右辺は $f(a)g'(a)+f'(a)g(a)$ に収束する。`, why: R`$f(a+h)\to f(a)$ は、$f$ が $a$ で微分可能だから[[differentiability#thm-diff-cont|連続]]であることによる。ここで微分可能性から連続性を導いた定理が役に立つ。` },
        ],
      },
      { t: 'ex', id: 'ex-power', title: '(xⁿ)′ = n xⁿ⁻¹', text: R`$n$ についての帰納法で示す。$n=1$ のとき $\dfrac{(x+h)-x}{h}=1$ なので $(x)'=1$。$(x^n)'=nx^{n-1}$ と仮定すると、積の微分より
$$(x^{n+1})'=(x\cdot x^n)'=1\cdot x^n+x\cdot nx^{n-1}=(n+1)x^n.$$
定数関数の微分は $0$ なので、和の微分と合わせて、多項式はすべて微分可能である。` },

      { t: 'h2', id: 'graph', text: 'グラフで確かめる' },
      { t: 'p', text: R`式と点 $a$ を変え、$h$ を $0$ に近づけてみよう。<code>x*abs(x)</code> は $0$ で微分可能（傾き $0$）、<code>cbrt(x)</code> は $0$ で接線が垂直になり、傾きが実数にならないので微分可能でない。` },
      { t: 'fig', type: 'tangent', preset: 'sin', editable: true, caption: R`割線の傾きと微分係数の比較。微分可能でない点では、左右の傾きの違いや、傾きの発散が表示される。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-diff-1', level: 1, title: '基本', text: R`定義に従って、$f(x)=x^2$ の導関数が $f'(x)=2x$ であることを示せ。`, hint: R`$(x+h)^2-x^2$ を展開して $h$ で割る。`, answer: R`$\dfrac{(x+h)^2-x^2}{h}=\dfrac{2xh+h^2}{h}=2x+h\to2x\ (h\to0)$。よって $f'(x)=2x$。`, space: 4 },
      { t: 'problem', id: 'prob-diff-2', level: 2, title: '標準', text: R`$f(x)=x|x|$ は $x=0$ で微分可能か。可能ならば $f'(0)$ を求めよ。`, hint: R`$\dfrac{f(h)-f(0)}{h}=|h|$。`, answer: R`$\dfrac{f(0+h)-f(0)}{h}=\dfrac{h|h|}{h}=|h|\to0\ (h\to0)$。よって微分可能で $f'(0)=0$。$|x|$ は $0$ で微分可能でないが、$x$ を掛けると尖りが均されて微分可能になる。`, space: 5 },
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
    related: ['mean-value', 'extreme-value'],
    synopsis: R`両端で同じ高さの、なめらかにつながった関数のグラフには、傾きが $0$ になる点（水平な接線）が途中に必ずある。「最大値の存在」と「頂上では傾き $0$」を組み合わせた定理で、平均値の定理の土台になる。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-rolle', title: 'ロルの定理', yomi: 'ろるのていり', imp: 3, text: R`$f$ が $[a,b]$ で連続、$(a,b)$ で微分可能で、$f(a)=f(b)$ ならば、$f'(c)=0$ となる $c\in(a,b)$ が存在する。` },
      { t: 'fig', type: 'rolle', preset: 'poly', editable: true, caption: R`両端の高さが等しい（黒い点、赤い破線の弦が水平）。紺の点 $c$ で接線が水平になる。$c$ は一つとは限らない。` },

      { t: 'h2', id: 'fermat', text: 'フェルマーの補題' },
      { t: 'lem', id: 'lem-fermat', title: 'フェルマーの補題', yomi: 'ふぇるまーのほだい', imp: 2, text: R`$f$ が開区間 $I$ で定義され、$c\in I$ で $I$ 上の最大値をとるとする（すべての $x\in I$ で $f(x)\le f(c)$）。$f$ が $c$ で微分可能ならば、$f'(c)=0$ である。最小値の場合も同様である。` },
      { t: 'strategy', text: R`頂上 $c$ からは、右へ行っても左へ行っても下がる（正確には「上がらない」）。右側の割線の傾きは $\le0$、左側の割線の傾きは $\ge0$。極限をとると $f'(c)\le0$ かつ $f'(c)\ge0$。` },
      {
        t: 'proof',
        sketch: R`右から近づけた差分商は $0$ 以下、左から近づけた差分商は $0$ 以上。どちらも同じ $f'(c)$ に収束するので $f'(c)=0$。`,
        steps: [
          { text: R`$c$ は開区間 $I$ の内部の点なので、$|h|$ が十分小さければ $c+h\in I$。そのとき $f(c+h)-f(c)\le0$ である。` },
          { text: R`$h>0$ のとき、分子 $\le0$、分母 $>0$ なので $\dfrac{f(c+h)-f(c)}{h}\le0$。$h<0$ のとき、分子 $\le0$、分母 $<0$ なので $\dfrac{f(c+h)-f(c)}{h}\ge0$。` },
          { text: R`$h_n=\frac\delta n$（$\delta>0$ は $c\pm\delta\in I$ となる小さな数）とすると $h_n\to0$、$h_n>0$ なので、差分商の列は $f'(c)$ に収束し、各項は $\le0$。[[sequence-convergence#prop-order|極限と不等式]]より $f'(c)\le0$。同様に $h_n=-\frac\delta n$ とすると $f'(c)\ge0$。よって $f'(c)=0$。`, why: R`$f$ が $c$ で微分可能なので、$h\to0$ となる（$h\ne0$ の）どんな数列に沿っても差分商は $f'(c)$ に収束する（[[function-limit#thm-seq-crit|数列による特徴づけ]]）。関数の極限の不等式も、こうして数列の結果に帰着できる。` },
          { text: R`最小値の場合は $-f$ に適用すればよい。` },
        ],
      },
      { t: 'rem', title: '端点では成り立たない', text: R`補題は $c$ が<em>開区間の内部</em>にあることを使っている。閉区間の端点で最大になる場合（たとえば $f(x)=x$ の $[0,1]$ 上の最大点 $x=1$）は、片側からしか近づけず、$f'(c)=0$ とは限らない。` },

      { t: 'h2', id: 'proof', text: '証明' },
      { t: 'strategy', text: R`[[extreme-value|最大値・最小値の定理]]で最大点と最小点をとる。両方が端点にあれば $f$ は定数。そうでなければ、どちらかが区間の内部にあり、そこで[[rolle#lem-fermat|フェルマーの補題]]が使える。` },
      {
        t: 'proof',
        sketch: R`最大値 $M$ と最小値 $m$ がともに端点の値 $f(a)=f(b)$ なら定数関数で、どこでも $f'=0$。そうでなければ最大か最小が内部でとられ、そこで傾きが $0$。`,
        steps: [
          { text: R`$f$ は $[a,b]$ で連続なので、最大値・最小値の定理より、最大値 $M=f(x_M)$ と最小値 $m=f(x_m)$（$x_M,x_m\in[a,b]$）が存在する。` },
          { text: R`<b>$M=m$ の場合</b>：すべての $x$ で $m\le f(x)\le M=m$ なので $f$ は定数である。差分商はつねに $0$ なので、任意の $c\in(a,b)$ で $f'(c)=0$。` },
          { text: R`<b>$M>m$ の場合</b>：$M$ と $m$ のうち少なくとも一方は $f(a)\,(=f(b))$ と異なる。$M\ne f(a)$ としよう（$m\ne f(a)$ の場合も同様）。すると $x_M\ne a$ かつ $x_M\ne b$、つまり $x_M\in(a,b)$。`, why: R`もし $M=f(a)$ かつ $m=f(a)$ なら $M=m$ となり、場合分けに反する。また $x_M=a$ なら $M=f(a)$、$x_M=b$ なら $M=f(b)=f(a)$ となってしまうので、$x_M$ は端点ではない。` },
          { text: R`$f$ は開区間 $(a,b)$ 上で $x_M$ において最大値をとり、$x_M$ で微分可能である。フェルマーの補題より $f'(x_M)=0$。$c=x_M$ とおけばよい。` },
        ],
      },
      { t: 'crux', text: R`「最大値が存在する」（最大値・最小値の定理）＋「頂上では傾き $0$」（フェルマーの補題）。前者は<em>実数の連続性</em>から、後者は<em>微分の定義</em>から来る。両端の高さが等しいという条件は、最大点か最小点を内部に押し込むためだけに使われる。` },

      { t: 'h2', id: 'counter', text: '仮定を外すと' },
      { t: 'p', text: R`三つの仮定（$[a,b]$ で連続・$(a,b)$ で微分可能・$f(a)=f(b)$）は、どれを外しても結論が崩れる。` },
      { t: 'fig', type: 'rolle', preset: 'abs', caption: R`$|x|$ on $[-1,1]$。$f(-1)=f(1)$ だが、$x=0$（×印）で微分可能でない。傾きは $-1$ か $1$ しかとらず、$f'(c)=0$ となる点はない。` },
      { t: 'ex', id: 'ex-rolle-fail', title: '仮定ごとの反例', text: R`<ul><li><b>微分可能でない</b>：$f(x)=|x|$ on $[-1,1]$（上の図）。</li><li><b>端点で連続でない</b>：$f(x)=x\ (0\le x<1)$、$f(1)=0$ とすると $f(0)=f(1)=0$ で $(0,1)$ では $f'=1$。$x=1$ での不連続が、最大点を「区間の外」に逃がしている。</li><li><b>$f(a)\ne f(b)$</b>：$f(x)=x$ on $[0,1]$。$f'=1$ で、水平な接線はない（ただし[[mean-value|平均値の定理]]は成り立つ）。</li></ul>` },

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
    related: ['rolle', 'differentiability'],
    synopsis: R`区間の両端を結ぶ弦と平行な接線が、区間の途中に必ず引ける。「平均の変化率 $=$ ある点での瞬間の変化率」。導関数の符号から関数の増減を読み取る、すべての議論の出発点である。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-mvt', title: '平均値の定理', yomi: 'へいきんちのていり', imp: 3, text: R`$f$ が $[a,b]$ で連続、$(a,b)$ で微分可能ならば、
$$\frac{f(b)-f(a)}{b-a}=f'(c) \tag{#}$$
となる $c\in(a,b)$ が存在する。` },
      { t: 'fig', type: 'mvt', preset: 'cubic', editable: true, caption: R`赤い破線が両端を結ぶ弦、紺の破線が弦と平行な接線、紺の点が $c$。弦の傾き（平均の変化率）と同じ傾きの接線が、途中のどこかに必ずある。` },
      { t: 'note', title: '速度で読む', text: R`$f(t)$ を時刻 $t$ での位置とすると、左辺は区間 $[a,b]$ での<em>平均速度</em>、$f'(c)$ は時刻 $c$ での<em>瞬間の速度</em>である。「平均時速 60 km で走ったなら、どこかの瞬間にちょうど時速 60 km だった」と言っている。` },

      { t: 'h2', id: 'proof', text: '証明' },
      { t: 'strategy', text: R`弦の分だけ $f$ を「傾け直す」。$g(x)=f(x)-\{f(a)+m(x-a)\}$（$m$ は弦の傾き）は両端で $0$ になるので、[[rolle|ロルの定理]]が使える。` },
      {
        t: 'proof',
        sketch: R`$f$ から弦の一次関数を引いた $g$ は、$g(a)=g(b)=0$。ロルの定理で $g'(c)=0$、すなわち $f'(c)=m$。`,
        steps: [
          { text: R`$m=\dfrac{f(b)-f(a)}{b-a}$ とおき、$g(x)=f(x)-f(a)-m(x-a)$ と定める。` },
          { text: R`$g$ は $[a,b]$ で連続、$(a,b)$ で微分可能で、$g'(x)=f'(x)-m$ である。`, why: R`$f(a)+m(x-a)$ は一次関数（多項式）なので連続かつ微分可能で、その導関数は定数 $m$。連続関数・微分可能な関数の差はまた連続・微分可能であり（[[continuity#prop-cont-arith|和・積]]、[[differentiability#prop-product|和の微分]]。差は $-1$ 倍との和）、導関数は $f'(x)-m$ となる。` },
          { text: R`両端の値を計算すると`,
            eqs: [
              [R`g(a)=f(a)-f(a)-m\cdot0=0,`, R`$x=a$ を代入`],
              [R`g(b)=f(b)-f(a)-\frac{f(b)-f(a)}{b-a}(b-a)=0.`, R`$x=b$ を代入`],
            ] },
          { text: R`ロルの定理より $g'(c)=0$ となる $c\in(a,b)$ が存在する。$g'(c)=f'(c)-m$ なので $f'(c)=m$。` },
        ],
      },
      { t: 'crux', text: R`平均値の定理は<em>傾けたロルの定理</em>である。弦を基準に高さを測り直せば、両端の高さがそろい、ロルの定理の状況になる。` },

      { t: 'h2', id: 'cor', text: '系：導関数から関数の形を読む' },
      { t: 'cor', id: 'cor-const', title: '導関数が 0 なら定数', yomi: 'どうかんすうが0ならていすう', imp: 2, text: R`$f$ が $[a,b]$ で連続、$(a,b)$ で微分可能で、すべての $x\in(a,b)$ で $f'(x)=0$ ならば、$f$ は $[a,b]$ 上で定数である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x\in(a,b]$ を任意にとる。$[a,x]$ で平均値の定理を使うと、$f(x)-f(a)=f'(c)(x-a)$ となる $c\in(a,x)$ がある。$f'(c)=0$ なので $f(x)=f(a)$。` },
        ],
      },
      { t: 'cor', id: 'cor-incr', title: '導関数の符号と増減', yomi: 'どうかんすうのふごうとぞうげん', imp: 2, text: R`$f$ が区間 $I$ で微分可能で、すべての $x\in I$ で $f'(x)>0$ ならば、$f$ は $I$ で狭義単調増加である。$f'(x)<0$ ならば狭義単調減少である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$x<y$ を $I$ から任意にとる。$[x,y]$ で平均値の定理を使うと、$f(y)-f(x)=f'(c)(y-x)$ となる $c\in(x,y)$ がある。$f'(c)>0$、$y-x>0$ なので $f(y)>f(x)$。` },
        ],
      },
      { t: 'rem', title: '「区間で」が大事', text: R`$f(x)=\dfrac1x$ は $x\ne0$ で $f'(x)=-\dfrac1{x^2}<0$ だが、$f(-1)=-1<1=f(1)$ なので $\mathbb{R}\setminus\{0\}$ 全体では減少関数でない。定義域が区間でない（$0$ で切れている）ため、平均値の定理を $[-1,1]$ に使えないのである。` },
      { t: 'fig', type: 'mvt', preset: 'abs', caption: R`$|x|$ on $[-1,2]$。弦の傾きは $\frac13$ だが、$f'$ は $-1$ か $1$ しかとらない。$x=0$（×印）で微分可能でないので、平均値の定理の仮定をみたさない。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-mvt-1', level: 1, title: '基本', text: R`区間 $I$ 上で微分可能な $f,g$ が、すべての $x\in I$ で $f'(x)=g'(x)$ をみたすならば、$f-g$ は定数であることを示せ。`, hint: R`$h=f-g$ に[[mean-value#cor-const|導関数が 0 なら定数]]を使う。`, answer: R`$h=f-g$ とおくと $h'(x)=f'(x)-g'(x)=0$。$I$ の任意の 2 点 $x<y$ について、$[x,y]$ に系を適用すると $h(x)=h(y)$。よって $h$ は定数。`, space: 5 },
      { t: 'problem', id: 'prob-mvt-2', level: 2, title: '標準', text: R`任意の実数 $x,y$ について $|\sin x-\sin y|\le|x-y|$ を示せ。（$(\sin x)'=\cos x$ と $|\cos t|\le1$ は認めてよい）`, hint: R`$x\ne y$ として、$x,y$ を端点とする区間で平均値の定理を使う。`, answer: R`$x=y$ なら明らか。$x<y$ とすると、平均値の定理より $\sin y-\sin x=\cos c\,(y-x)$ となる $c\in(x,y)$ がある。よって $|\sin x-\sin y|=|\cos c|\,|x-y|\le|x-y|$。$x>y$ の場合も同様。`, space: 6 },
    ],
  });
})();
