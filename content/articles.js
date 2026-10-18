/* 第 1 章：実数、第 2 章：数列と極限
   1 記事 = 1 オブジェクト。本文 body はブロックの配列。
   テキスト中の記法：$…$ / $$…$$ = 数式、[[id]] / [[id#anchor|表示]] = 内部リンク、\tag{#} = 自動の式番号 */
(function () {
  const R = String.raw;
  const A = (window.ARTICLES = window.ARTICLES || []);

  /* ============================================================
     第 1 章 実数
     ============================================================ */
  A.push({
    id: 'abs-triangle',
    title: '絶対値と三角不等式',
    sub: '',
    yomi: 'ぜったいちとさんかくふとうしき',
    aliases: ['さんかくふとうしき', '三角不等式', 'ぜったいち', '絶対値', 'ぎゃくさんかくふとうしき', '逆向きの三角不等式', '距離'],
    kind: '用語',
    field: '実数',
    grade: '1年前期',
    importance: 3,
    prereq: ['inequalities'],
    related: ['sequence-convergence', 'inequalities'],
    notation: [
      R`$\mathbb{R}$：実数全体の集合。$x\in\mathbb{R}$ は「$x$ は実数」と読む。`,
      R`$|x|$：実数 $x$ の絶対値。$|x-y|$ は数直線上の 2 点 $x,y$ の距離。`,
      R`$c\ge0$ のとき「$|t|\le c\iff -c\le t\le c$」をよく使う（[[abs-triangle#prop-abs-basic|基本性質]]）。`,
    ],
    synopsis: R`実数 $x,y\in\mathbb{R}$ に対し、$|x-y|$ は数直線上の 2 点の距離である。三角不等式 $|x+y|\le|x|+|y|$ は「寄り道すると遠回りになる」ことを表し、極限の議論のほぼすべてで使われる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と基本性質' },
      { t: 'def', id: 'def-abs', title: '絶対値', yomi: 'ぜったいち', imp: 2, text: R`実数 $x\in\mathbb{R}$ に対し、その<b class="term">絶対値</b> $|x|\in\mathbb{R}$ を
$$|x|:=\begin{cases}x & (x\ge0)\\ -x & (x<0)\end{cases}$$
で定める。$x,y\in\mathbb{R}$ に対し、$|x-y|$ を $x$ と $y$ の<b class="term">距離</b>という。` },
      { t: 'prop', id: 'prop-abs-basic', title: '絶対値の基本性質', yomi: 'ぜったいちのきほんせいしつ', imp: 3, text: R`$x,y\in\mathbb{R}$、$c\in\mathbb{R}$ とする。
<ol><li>$|x|\ge0$ であり、$|x|=0\iff x=0$。</li><li>$|-x|=|x|$、$|xy|=|x|\,|y|$。</li><li>$-|x|\le x\le|x|$。</li><li>$c\ge0$ のとき、$|x|\le c\iff -c\le x\le c$。同様に $|x|<c\iff -c<x<c$。</li></ol>` },
      {
        t: 'proof',
        sketch: R`どれも $x\ge0$ と $x<0$ の場合分けで定義に戻せばよい。`,
        steps: [
          { text: R`(1) $x\ge0$ なら $|x|=x\ge0$、$x<0$ なら $|x|=-x>0$。$|x|=0$ となるのは $x\ge0$ かつ $x=0$ の場合だけである。` },
          { text: R`(2) $|-x|=|x|$ は $x$ の符号で場合分けすればよい。$|xy|=|x||y|$ は $x,y$ の符号の 4 通りの組合せそれぞれで、両辺が $xy$ または $-xy$ で一致することを確かめる。` },
          { text: R`(3) $x\ge0$ なら $-|x|=-x\le0\le x=|x|$。$x<0$ なら $-|x|=x<0<-x=|x|$。` },
          { text: R`(4) (⇒) $|x|\le c$ とする。(3) より $x\le|x|\le c$、また $-x\le|-x|=|x|\le c$ なので $-c\le x$。(⇐) $-c\le x\le c$ とする。$x\ge0$ なら $|x|=x\le c$、$x<0$ なら $|x|=-x\le c$（$-c\le x$ の両辺に $-1$ を掛けた）。$<$ の場合も同じ議論である。` },
        ],
      },
      { t: 'note', title: '「|x − a| < ε」は「a − ε < x < a + ε」', text: R`(4) で $x$ を $x-a$、$c$ を $\varepsilon>0$ にすると、$|x-a|<\varepsilon\iff a-\varepsilon<x<a+\varepsilon$。「$x$ は $a$ から距離 $\varepsilon$ 未満」と「$x$ は区間 $(a-\varepsilon,a+\varepsilon)$ の中」は同じことである。極限の証明では、この二つを何度も行き来する。` },

      { t: 'h2', id: 'tri', text: '三角不等式' },
      { t: 'prop', id: 'prop-tri', title: '三角不等式', yomi: 'さんかくふとうしき', imp: 3, text: R`任意の $x,y\in\mathbb{R}$ について $|x+y|\le|x|+|y|$。` },
      { t: 'strategy', text: R`$-|x|\le x\le|x|$ と $-|y|\le y\le|y|$ を辺々足し、基本性質 (4) で絶対値の形に戻す。` },
      {
        t: 'proof',
        sketch: R`$\pm$ 両側から挟んで足すだけである。`,
        steps: [
          { text: R`基本性質 (3) より`, eqs: [
            [R`-|x|\le x\le|x|,\qquad -|y|\le y\le|y|.`, R`[[abs-triangle#prop-abs-basic|基本性質]] (3)`],
            [R`-(|x|+|y|)\le x+y\le|x|+|y|.`, R`辺々足す`],
          ] },
          { text: R`$c=|x|+|y|\ge0$ に基本性質 (4) を使うと $|x+y|\le|x|+|y|$。` },
        ],
      },
      { t: 'cor', id: 'cor-tri-dist', title: '距離の三角不等式', yomi: 'きょりのさんかくふとうしき', imp: 3, text: R`任意の $x,y,z\in\mathbb{R}$ について $|x-z|\le|x-y|+|y-z|$。` },
      { t: 'proof', steps: [{ text: R`$x-z=(x-y)+(y-z)$ に三角不等式を使う。` }] },
      { t: 'note', title: '「引いて足す」技', text: R`$|a_n-\alpha|$ を評価したいとき、間に別の量 $b$ をはさんで $|a_n-\alpha|\le|a_n-b|+|b-\alpha|$ とする。この「$b$ を引いて足す」は、収束の証明で最もよく使う一手である。` },
      { t: 'cor', id: 'cor-rev', title: '逆向きの三角不等式', yomi: 'ぎゃくさんかくふとうしき', imp: 2, text: R`任意の $x,y\in\mathbb{R}$ について $\bigl||x|-|y|\bigr|\le|x-y|$。` },
      {
        t: 'proof',
        sketch: R`$|x|=|(x-y)+y|\le|x-y|+|y|$ と、$x,y$ を入れ替えた式の両方を使う。`,
        steps: [
          { text: R`三角不等式より`, eqs: [
            [R`|x|=|(x-y)+y|\le|x-y|+|y|,`, R`$y$ を引いて足す`],
            [R`|y|=|(y-x)+x|\le|y-x|+|x|=|x-y|+|x|.`, R`同様。$|y-x|=|x-y|$`],
          ] },
          { text: R`移項すると $|x|-|y|\le|x-y|$ かつ $-(|x|-|y|)\le|x-y|$。基本性質 (4) より $\bigl||x|-|y|\bigr|\le|x-y|$。` },
        ],
      },
      { t: 'qa', q: R`三角不等式で等号が成り立つのはいつ？`, a: R`$|x+y|=|x|+|y|$ となるのは $xy\ge0$（$x,y$ が同符号か、どちらかが $0$）のときに限る。符号が逆だと打ち消し合って、左辺のほうが小さくなる。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'supremum',
    title: '上限・下限',
    sub: '実数の連続性',
    yomi: 'じょうげん・かげん',
    aliases: ['じょうげん', 'かげん', 'sup', 'inf', 'ちゅうみつ', '稠密', 'ちゅうみつせい', '整数部分', 'せいすうぶぶん', 'がうすきごう', 'ガウス記号', 'ゆうりすう', '有理数', 'じょうげんこうり', '上限公理', 'じつすうのれんぞくせい', '実数の連続性', 'あるきめですのげんり', 'アルキメデスの原理', '上界', 'じょうかい', '下界', 'かかい', '最大値', 'さいだいち', 'max'],
    kind: '用語',
    field: '実数',
    grade: '1年前期',
    importance: 3,
    prereq: ['logic-quantifiers', 'sets'],
    related: ['monotone-convergence', 'sequence-convergence'],
    notation: [
      R`$A\subset\mathbb{R}$：$A$ は実数からなる集合（[[sets#def-subset|部分集合]]）。$\varnothing$ は空集合。`,
      R`$\sup A$：$A$ の上限（最小の上界）。$\inf A$：$A$ の下限（最大の下界）。`,
      R`$\max A$：$A$ の最大値（$A$ の元のうち最大のもの）。`,
      R`$\mathbb{N}=\{1,2,3,\dots\}$：自然数全体（$0$ は含めない）。`,
      R`$\varepsilon>0$ と書いたら、$\varepsilon$ は正の実数。`,
    ],
    synopsis: R`集合 $A\subset\mathbb{R}$ の「最小の上界」を上限 $\sup A$ という。<em>空でなく上に有界な $A\subset\mathbb{R}$ は必ず上限をもつ</em>——これを実数の公理として認めることが、解析学全体の出発点になる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-sup', title: '上界・上限', yomi: 'じょうげん', imp: 3, text: R`$A\subset\mathbb{R}$ とする。
<ul><li>$M\in\mathbb{R}$ が $A$ の<b class="term">上界</b>である $:\Longleftrightarrow$ $\forall a\in A,\ a\le M$。</li><li>$A$ が<b class="term">上に有界</b>である $:\Longleftrightarrow$ $A$ の上界 $M\in\mathbb{R}$ が存在する。</li><li>$s\in\mathbb{R}$ が $A$ の<b class="term">上限</b>である $:\Longleftrightarrow$ (i) $s$ は $A$ の上界であり、(ii) $A$ の任意の上界 $M$ について $s\le M$。このとき $s=\sup A$ と書く。</li></ul>
下界・下に有界・<b class="term">下限</b> $\inf A$ も、不等号の向きを逆にして同様に定める。上にも下にも有界なとき、$A$ は<b class="term">有界</b>であるという。` },
      { t: 'def', id: 'def-max', title: '最大値・最小値', yomi: 'さいだいち', imp: 2, text: R`$A\subset\mathbb{R}$ とする。$m\in A$ が $A$ の上界であるとき、$m$ を $A$ の<b class="term">最大値</b>といい $\max A$ と書く。最小値 $\min A$ も同様に定める。` },
      { t: 'ex', id: 'ex-sup-open', title: '上限は集合に属するとは限らない', text: R`$A=(0,1)=\{x\in\mathbb{R}\mid0<x<1\}$ とする。$1$ は上界であり、$M<1$ ならば $\max\{M,\tfrac12\}<x<1$ となる $x\in A$（たとえば $x=\frac{\max\{M,1/2\}+1}2$）があるので $M$ は上界でない。よって $\sup A=1$ だが、$1\notin A$ なので $\max A$ は存在しない。` },
      { t: 'prop', id: 'prop-sup-unique', title: '上限の一意性', yomi: 'じょうげんのいちいせい', imp: 1, text: R`$A\subset\mathbb{R}$ の上限は、存在すればただ一つである。` },
      { t: 'proof', steps: [{ text: R`$s,s'\in\mathbb{R}$ がともに $A$ の上限とする。$s'$ は上界で $s$ は最小の上界なので $s\le s'$。役割を入れ替えて $s'\le s$。よって $s=s'$。` }] },
      { t: 'ax', id: 'ax-sup', title: '上限公理（実数の連続性）', yomi: 'じょうげんこうり', imp: 3, text: R`空でなく上に有界な部分集合 $A\subset\mathbb{R}$ は、上限 $\sup A\in\mathbb{R}$ をもつ。` },
      { t: 'qa', q: R`公理は証明しなくてよいのか？`, a: R`よい。公理は「実数とはこういう性質をもつものだ」と<em>約束</em>する出発点である。四則演算と大小関係の規則（$a\le b$ なら $a+c\le b+c$ など）と、この上限公理をまとめて認めると、解析学の定理はすべてそこから証明できる。有理数 $\mathbb{Q}$ は四則演算と大小関係はみたすが上限公理をみたさない（$\{x\in\mathbb{Q}\mid x^2<2\}$ に有理数の上限がない）。上限公理が実数と有理数を分ける。` },

      { t: 'h2', id: 'eps', text: '上限の ε による特徴づけ' },
      { t: 'prop', id: 'prop-sup-eps', title: '上限の ε による特徴づけ', yomi: 'じょうげんのいぷしろんによるとくちょうづけ', imp: 3, text: R`$A\subset\mathbb{R}$ は空でなく上に有界、$s\in\mathbb{R}$ とする。$s=\sup A$ であることは、次の 2 条件と同値である。
<ol><li>任意の $a\in A$ について $a\le s$。</li><li>任意の $\varepsilon>0$ に対し、$s-\varepsilon<a$ をみたす $a=a(\varepsilon)\in A$ が存在する。</li></ol>` },
      { t: 'strategy', text: R`(2) は「$s$ より少しでも小さい数 $s-\varepsilon$ は、もう上界でない」と言っている。これは上限の定義 (ii)「$s$ は最小の上界」の言い換えである。` },
      {
        t: 'proof',
        sketch: R`(⇒) $s-\varepsilon<s$ なので $s-\varepsilon$ は上界になれず、それを超える元がある。(⇐) $s$ より小さい上界 $M$ があれば、$\varepsilon=s-M$ として (2) を使うと $M$ を超える元が出てきて矛盾する。`,
        steps: [
          { text: R`<b>(⇒)</b> $s=\sup A$ とする。(1) は「$s$ は上界」そのもの。$\varepsilon>0$ を任意にとる。$s-\varepsilon<s$ であり、$s$ は最小の上界なので、$s-\varepsilon$ は上界でない。` },
          { text: R`「$s-\varepsilon$ は上界でない」は「$\forall a\in A,\ a\le s-\varepsilon$」の否定なので、ある $a\in A$ で $a>s-\varepsilon$。これが (2) である。`, why: R`[[logic-quantifiers#prop-neg|否定の規則]]により、$\forall a\in A,\ a\le s-\varepsilon$ の否定は $\exists a\in A,\ a>s-\varepsilon$。` },
          { text: R`<b>(⇐)</b> (1)(2) を仮定する。(1) より $s$ は上界。上限の定義 (ii) を背理法で示す。$A$ の上界 $M$ で $M<s$ となるものがあったとし、$\varepsilon=s-M>0$ とおく。(2) より $a\in A$ で $a>s-\varepsilon=M$ となるものがあるが、これは $M$ が上界であることに反する。よって任意の上界 $M$ について $s\le M$ であり、$s=\sup A$。` },
        ],
      },
      { t: 'fig', type: 'plot', preset: 'negh', caption: R`（参考）集合の上限・下限の感覚：$h>0$ の範囲でつねに負の関数 $F(h)=-h$ の値の集合 $\{F(h)\mid0<h\le1\}=[-1,0)$ は、上限 $0$ をもつが最大値をもたない。` },
      { t: 'cor', id: 'cor-inf', title: '下限の存在と特徴づけ', yomi: 'かげんのそんざい', imp: 2, text: R`空でなく下に有界な $A\subset\mathbb{R}$ は下限 $\inf A\in\mathbb{R}$ をもち、$\inf A=-\sup(-A)$ である。ここで $-A:=\{-a\mid a\in A\}$。さらに $t=\inf A$ であることは、「$\forall a\in A,\ t\le a$」かつ「$\forall\varepsilon>0\ \exists a\in A,\ a<t+\varepsilon$」と同値である。` },
      {
        t: 'proof',
        steps: [
          { text: R`$m\in\mathbb{R}$ が $A$ の下界 $\iff$ $\forall a\in A,\ m\le a$ $\iff$ $\forall a\in A,\ -a\le-m$ $\iff$ $-m$ は $-A$ の上界。よって $-A$ は空でなく上に有界で、上限公理より $s=\sup(-A)$ が存在する。` },
          { text: R`$-s$ が $A$ の下限であることを確かめる。$s$ は $-A$ の上界なので $-s$ は $A$ の下界。$A$ の任意の下界 $m$ について $-m$ は $-A$ の上界なので $s\le-m$、すなわち $m\le-s$。よって $-s$ は最大の下界で、$\inf A=-s=-\sup(-A)$。` },
          { text: R`特徴づけは、[[supremum#prop-sup-eps|上限の特徴づけ]]を $-A$ と $s=-t$ に適用し、不等号を $-1$ 倍して書き直したものである。` },
        ],
      },

      { t: 'h2', id: 'arch', text: 'アルキメデスの原理' },
      { t: 'thm', id: 'thm-arch', title: 'アルキメデスの原理', yomi: 'あるきめですのげんり', imp: 2, text: R`任意の $x\in\mathbb{R}$ に対し、$N>x$ をみたす $N\in\mathbb{N}$ が存在する。` },
      { t: 'strategy', text: R`背理法。$\mathbb{N}$ が上に有界だと仮定して上限 $s$ をとり、$s-1$ がもはや上界でないことから矛盾を導く。` },
      {
        t: 'proof',
        sketch: R`自然数全体に上限 $s$ があるなら、$s-1$ より大きい自然数 $m$ がある。すると $m+1>s$ となり、$s$ が上界であることに反する。`,
        steps: [
          { text: R`結論を否定し、ある $x\in\mathbb{R}$ について、すべての $N\in\mathbb{N}$ で $N\le x$ と仮定する。すると $\mathbb{N}\subset\mathbb{R}$ は上に有界（$x$ が上界）で空でない（$1\in\mathbb{N}$）ので、上限公理より $s=\sup\mathbb{N}\in\mathbb{R}$ が存在する。` },
          { text: R`上限の特徴づけ (2) で $\varepsilon=1$ とすると、$s-1<m$ となる $m\in\mathbb{N}$ がある。このとき $m+1\in\mathbb{N}$ かつ $m+1>s$ なので、$s$ が $\mathbb{N}$ の上界であることに矛盾する。` },
        ],
      },
      { t: 'cor', id: 'cor-arch', title: '1/N はいくらでも小さくできる', yomi: 'あるきめですのげんりのけい', imp: 2, text: R`任意の $\varepsilon>0$ に対し、$\dfrac1N<\varepsilon$ をみたす $N=N(\varepsilon)\in\mathbb{N}$ が存在する。` },
      { t: 'proof', steps: [{ text: R`アルキメデスの原理を $x=\frac1\varepsilon\in\mathbb{R}$ に使うと、$N>\frac1\varepsilon$ となる $N\in\mathbb{N}$ がある。両辺に正の数 $\frac\varepsilon N$ を掛けて $\varepsilon>\frac1N$。` }] },
      { t: 'note', title: '「N = N(ε)」という書き方', text: R`$N(\varepsilon)$ は「$N$ は $\varepsilon$ に応じて決まる」ことを表す書き方で、$N$ が $\varepsilon$ の関数であるという意味である。$\varepsilon$ を小さくすると、それに応じて $N$ を大きくとり直してよい。` },
      { t: 'h2', id: 'dense', text: '整数部分と有理数の稠密性' },
      { t: 'prop', id: 'prop-floor', title: '整数部分（ガウス記号）', yomi: 'せいすうぶぶん', imp: 2, text: R`任意の $y\in\mathbb{R}$ に対し、$m\le y<m+1$ をみたす $m\in\mathbb{Z}$ がただ一つ存在する。この $m$ を $\lfloor y\rfloor$（または $[y]$）と書き、$y$ の<b class="term">整数部分</b>という。` },
      {
        t: 'proof',
        steps: [
          { text: R`<b>存在。</b>アルキメデスの原理より $N_2>-y$ となる $N_2\in\mathbb{N}$ があり、$y+N_2>0$。さらにアルキメデスの原理より、集合 $A:=\{k\in\mathbb{N}\mid k>y+N_2\}$ は空でない。$\mathbb{N}$ の空でない部分集合は最小元をもつ（<b class="term">整列性</b>。[[proof-methods#thm-induction|数学的帰納法]]と同値な $\mathbb{N}$ の性質）ので、$k_0:=\min A$ がとれる。` },
          { text: R`$k_0\in A$ より $k_0>y+N_2$。また $k_0-1\le y+N_2$ である：$k_0\ge2$ なら $k_0-1\in\mathbb{N}$ は $k_0$ より小さいので $A$ に属さず、$k_0-1\le y+N_2$。$k_0=1$ なら $k_0-1=0<y+N_2$。よって $m:=k_0-1-N_2\in\mathbb{Z}$ とおけば $m\le y<m+1$。` },
          { text: R`<b>一意性。</b>$m,m'\in\mathbb{Z}$ がともに条件をみたすとすると、$m\le y<m'+1$ と $m'\le y<m+1$ から $m-m'<1$ かつ $m'-m<1$。整数の差で絶対値が $1$ 未満のものは $0$ だけなので $m=m'$。` },
        ],
      },
      { t: 'prop', id: 'prop-dense', title: '有理数・無理数の稠密性', yomi: 'ゆうりすうのちゅうみつせい', imp: 2, text: R`$p,q\in\mathbb{R}$, $p<q$ ならば、$p<r<q$ をみたす有理数 $r\in\mathbb{Q}$ と、$p<s<q$ をみたす無理数 $s\in\mathbb{R}\setminus\mathbb{Q}$ が存在する。` },
      {
        t: 'proof',
        sketch: R`目盛りの間隔 $\frac1n$ を区間の幅 $q-p$ より細かくすれば、目盛り $\frac mn$ のどれかが必ず区間に落ちる。`,
        steps: [
          { text: R`<b>有理数。</b>$q-p>0$ なので、[[supremum#cor-arch|アルキメデスの原理の系]]より $\frac1n<q-p$ となる $n\in\mathbb{N}$ がある。$m:=\lfloor np\rfloor+1\in\mathbb{Z}$ とおくと、[[supremum#prop-floor|整数部分]]の定義より $m-1\le np<m$。` },
          {
            text: R`$r:=\frac mn\in\mathbb{Q}$ とおくと、$np<m$ より $p<r$ で、`,
            eqs: [[R`r=\frac mn\le\frac{np+1}n=p+\frac1n<p+(q-p)=q.`, R`$m\le np+1$ と $\frac1n<q-p$`]],
          },
          { text: R`<b>無理数。</b>今示したことを区間 $(p-\sqrt2,\ q-\sqrt2)$ に使うと、$p-\sqrt2<r<q-\sqrt2$ をみたす $r\in\mathbb{Q}$ がある。$s:=r+\sqrt2$ とおけば $p<s<q$。もし $s\in\mathbb{Q}$ なら $\sqrt2=s-r\in\mathbb{Q}$ となり、[[proof-methods#ex-sqrt2|√2 は無理数]]であることに矛盾する。よって $s$ は無理数である。` },
        ],
      },
      { t: 'note', title: '「どんな短い区間にも」が大事', text: R`この命題から、どんな区間 $(p,q)$（$p<q$）にも有理数と無理数が<em>無数に</em>含まれることがわかる（一つ見つけたら、その左右の小区間にまた適用すればよい）。[[continuity#ex-dirichlet|ディリクレ関数]]がいたるところ不連続であること、[[riemann-integral#ex-dirichlet-int|リーマン積分できない]]ことの根拠になる。` },
    ],
  });

  /* ============================================================
     第 2 章 数列と極限
     ============================================================ */
  A.push({
    id: 'sequence-convergence',
    title: '数列の収束',
    sub: 'ε-N 論法',
    yomi: 'すうれつのしゅうそく',
    aliases: ['いぷしろんえぬろんぽう', 'ε-N論法', 'イプシロンエヌ論法', '収束', 'しゅうそく', '極限', 'きょくげん', 'はさみうち', '極限の四則演算'],
    kind: '用語',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['supremum', 'abs-triangle', 'logic-quantifiers'],
    related: ['monotone-convergence', 'cauchy-sequence', 'bolzano-weierstrass', 'epsilon-delta-howto'],
    notation: [
      R`実数列 $\{a_n\}$（$\{a_n\}_{n\in\mathbb{N}}$ とも書く）：各 $n\in\mathbb{N}$ に実数 $a_n\in\mathbb{R}$ を一つずつ対応させたもの。正確には写像 $\mathbb{N}\to\mathbb{R},\ n\mapsto a_n$。`,
      R`$\mathbb{N}=\{1,2,3,\dots\}$。$n\ge N$ と書いたら $n,N\in\mathbb{N}$。`,
      R`$\varepsilon>0$：正の実数。$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon$ に応じて決まる自然数。`,
      R`$\displaystyle\lim_{n\to\infty}a_n=\alpha$、$a_n\to\alpha\ (n\to\infty)$：$\{a_n\}$ は $\alpha\in\mathbb{R}$ に収束する。`,
      R`$\max\{N_1,N_2\}$：$N_1,N_2$ の大きいほう。`,
    ],
    synopsis: R`実数列 $\{a_n\}$ が $\alpha\in\mathbb{R}$ に収束するとは、どれほど小さな誤差 $\varepsilon>0$ を指定されても、ある番号 $N=N(\varepsilon)\in\mathbb{N}$ から先の項 $a_n$ がすべて $\alpha$ から $\varepsilon$ 未満の距離に収まることである。`,
    body: [
      { t: 'h2', id: 'intuition', text: '直感：「近づく」とは何か' },
      { t: 'p', text: R`高校では「$n$ を限りなく大きくすると $a_n$ が $\alpha$ に限りなく近づく」と習った。しかし「限りなく」は曖昧である。どのくらい大きくすれば、どのくらい近づくのか。解析学ではこれを、<em>誤差の許容幅</em> $\varepsilon$ と<em>番号</em> $N$ のやりとりとして言い直す。` },
      { t: 'fig', type: 'seq', preset: 'alt', caption: R`$a_n=1+\dfrac{(-1)^n\cdot1.2}{n}$ と $\alpha=1$。$\varepsilon$ を動かすと、帯 $(\alpha-\varepsilon,\ \alpha+\varepsilon)$ に入り続ける最初の番号 $N=N(\varepsilon)$ が変わる。$\varepsilon$ を小さくするほど $N$ は大きくなる。` },
      { t: 'p', text: R`図の帯は「$\alpha$ からの誤差が $\varepsilon$ 未満」の範囲である。収束するとは、<em>どんなに細い帯</em>を用意されても、ある番号から先の点がすべてその帯の中に収まることだ。最初の有限個の項が帯の外にあるのはかまわない。` },
      { t: 'note', title: 'ε は「相手が出す挑戦」、N は「こちらの返答」', text: R`収束の定義はゲームとして読むとわかりやすい。相手がどんなに小さい $\varepsilon>0$ を突きつけてきても、こちらは必ず「この番号から先なら大丈夫」という $N\in\mathbb{N}$ を返せる——それが収束である。$N$ は $\varepsilon$ を見てから決めてよいので、$N=N(\varepsilon)$ と書く。` },

      { t: 'h2', id: 'definition', text: '定義' },
      { t: 'def', id: 'def-conv', title: '数列の収束', yomi: 'すうれつのしゅうそく', imp: 3, text: R`実数列 $\{a_n\}$ と $\alpha\in\mathbb{R}$ について、$\{a_n\}$ が $\alpha$ に<b class="term">収束する</b>とは、次が成り立つことをいう。
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall n\in\mathbb{N},\quad n\ge N\ \Longrightarrow\ |a_n-\alpha|<\varepsilon. \tag{#}$$
このとき $\alpha$ を $\{a_n\}$ の<b class="term">極限</b>（極限値）といい、$\displaystyle\lim_{n\to\infty}a_n=\alpha$ または $a_n\to\alpha\ (n\to\infty)$ と書く。ある $\alpha\in\mathbb{R}$ に収束するとき、$\{a_n\}$ は<b class="term">収束する</b>という。` },
      { t: 'note', title: '定義を 4 つの部品に分けて読む', text: R`<ol><li>$\forall\varepsilon>0$：どんな正の誤差 $\varepsilon$ に対しても</li><li>$\exists N=N(\varepsilon)\in\mathbb{N}$：（$\varepsilon$ に応じて）ある番号 $N$ が存在して</li><li>$\forall n\in\mathbb{N},\ n\ge N\Rightarrow$：$N$ 以降のすべての番号 $n$ について</li><li>$|a_n-\alpha|<\varepsilon$：$a_n$ と $\alpha$ の距離が $\varepsilon$ 未満</li></ol>記号の意味は [[logic-quantifiers]]、書き方の型は [[epsilon-delta-howto]] を参照。` },
      { t: 'qa', q: R`$N$ は $n$ に依存してよい？`, a: R`いけない。量化子の順番は「$\forall\varepsilon\ \exists N\ \forall n$」なので、$N$ を決める時点では $n$ はまだ出てきていない。$N$ は $\varepsilon$ だけで決まり（$N=N(\varepsilon)$）、そのあとで「$n\ge N$ をみたす<em>すべての</em> $n$」を調べる。` },
      { t: 'def', id: 'def-div', title: '発散', yomi: 'はっさん', imp: 2, text: R`実数列 $\{a_n\}$ がどの $\alpha\in\mathbb{R}$ にも収束しないとき、$\{a_n\}$ は<b class="term">発散する</b>という。特に
$$\forall M\in\mathbb{R},\ \exists N=N(M)\in\mathbb{N}\ \text{ s.t. }\ \forall n\in\mathbb{N},\quad n\ge N\Longrightarrow a_n>M$$
が成り立つとき、$\{a_n\}$ は $+\infty$ に発散するといい、$\displaystyle\lim_{n\to\infty}a_n=+\infty$ と書く（$+\infty$ は実数ではない）。` },
      { t: 'rem', title: '∀ と ∃ の順番を入れ替えてはいけない', text: R`「$\exists N\in\mathbb{N},\ \forall\varepsilon>0,\ \forall n\ge N,\ |a_n-\alpha|<\varepsilon$」と書くと、$N$ が $\varepsilon$ によらず一つに決まることになる。このとき $n\ge N$ なら $|a_n-\alpha|$ はすべての正の数より小さいので $a_n=\alpha$ となる（[[inequalities#prop-le-eps|任意の正の数より小さい非負の数は 0]]）。つまり「ある番号から先はずっと $a_n=\alpha$」という、はるかに強い主張になってしまう。` },

      { t: 'h2', id: 'properties', text: '基本的な性質' },
      { t: 'thm', id: 'thm-unique', title: '極限の一意性', yomi: 'きょくげんのいちいせい', imp: 2, text: R`実数列 $\{a_n\}$ と $\alpha,\beta\in\mathbb{R}$ について、$a_n\to\alpha$ かつ $a_n\to\beta$ ならば、$\alpha=\beta$ である。` },
      { t: 'strategy', text: R`$\alpha$ と $\beta$ の距離 $|\alpha-\beta|$ が、任意の $\varepsilon>0$ に対して $2\varepsilon$ より小さいことを示す。そのような $0$ 以上の数は $0$ しかない。` },
      {
        t: 'proof',
        sketch: R`十分先の番号 $n$ では、$a_n$ は $\alpha$ にも $\beta$ にも $\varepsilon$ 未満の距離にある。三角不等式で $|\alpha-\beta|\le|\alpha-a_n|+|a_n-\beta|<2\varepsilon$。$\varepsilon>0$ はいくらでも小さくとれるので $|\alpha-\beta|=0$。`,
        steps: [
          { text: R`$\varepsilon>0$ を任意にとる。$a_n\to\alpha$ より、ある $N_1=N_1(\varepsilon)\in\mathbb{N}$ が存在して、$n\ge N_1$ ならば $|a_n-\alpha|<\varepsilon$。同様に $a_n\to\beta$ より、ある $N_2=N_2(\varepsilon)\in\mathbb{N}$ が存在して、$n\ge N_2$ ならば $|a_n-\beta|<\varepsilon$。` },
          {
            text: R`$n=\max\{N_1,N_2\}\in\mathbb{N}$ とおく。この $n$ は $n\ge N_1$ と $n\ge N_2$ を両方みたすので、`,
            eqs: [
              [R`|\alpha-\beta| = |(\alpha-a_n)+(a_n-\beta)|`, R`$a_n$ を引いて足す`],
              [R`\phantom{|\alpha-\beta|} \le |\alpha-a_n| + |a_n-\beta|`, R`[[abs-triangle#prop-tri|三角不等式]]`],
              [R`\phantom{|\alpha-\beta|} < \varepsilon+\varepsilon = 2\varepsilon.`, R`$N_1,\,N_2$ の取り方`],
            ],
          },
          {
            text: R`$\varepsilon>0$ は任意だったので、$0\le|\alpha-\beta|<2\varepsilon$ がすべての $\varepsilon>0$ について成り立つ。よって $|\alpha-\beta|=0$、すなわち $\alpha=\beta$ である。`,
            why: R`$x=|\alpha-\beta|\ge0$ とする。もし $x>0$ なら、$\varepsilon=\frac x2>0$ とおくと $x<2\varepsilon=x$ となり矛盾する。したがって $x=0$ である（[[inequalities#prop-le-eps|この論法]]は何度も使う）。`,
          },
        ],
      },
      { t: 'crux', text: R`$\varepsilon$ は<em>こちらが自由に選べる</em>。二つの極限の距離より小さい $\varepsilon$ を選べば、$a_n$ が両方に同時に $\varepsilon$ 未満まで近づくことはできない。この「$\varepsilon$ を後から都合よく選ぶ」発想は、解析学全体で何度も使われる。` },

      { t: 'def', id: 'def-bdd-seq', title: '有界な数列', yomi: 'ゆうかいなすうれつ', imp: 2, text: R`実数列 $\{a_n\}$ が<b class="term">有界</b>である $:\Longleftrightarrow$ ある $M\in\mathbb{R}$, $M>0$ が存在して、すべての $n\in\mathbb{N}$ について $|a_n|\le M$。<b class="term">上に有界</b> $:\Longleftrightarrow$ ある $M\in\mathbb{R}$ が存在して、すべての $n\in\mathbb{N}$ で $a_n\le M$。` },
      { t: 'prop', id: 'prop-bdd', title: '収束列の有界性', yomi: 'しゅうそくれつのゆうかいせい', imp: 2, text: R`実数列 $\{a_n\}$ が $\alpha\in\mathbb{R}$ に収束するならば、$\{a_n\}$ は有界である。` },
      { t: 'strategy', text: R`$\varepsilon=1$ として定義を使うと、$N$ 番目から先は $|a_n|<|\alpha|+1$ で抑えられる。残りは最初の有限個 $a_1,\dots,a_{N-1}$ だけなので、それらと合わせて最大値をとればよい。` },
      {
        t: 'proof',
        sketch: R`「十分先」は極限の近くに閉じ込められ、「最初の有限個」は最大値で抑えられる。両方の大きいほうを $M$ とすればよい。`,
        steps: [
          { text: R`収束の定義で $\varepsilon=1$ とすると、ある $N=N(1)\in\mathbb{N}$ が存在して、$n\ge N$ ならば $|a_n-\alpha|<1$。` },
          {
            text: R`$n\ge N$ のとき、`,
            eqs: [
              [R`|a_n| = |(a_n-\alpha)+\alpha|`, R`$\alpha$ を引いて足す`],
              [R`\phantom{|a_n|} \le |a_n-\alpha|+|\alpha|`, R`三角不等式`],
              [R`\phantom{|a_n|} < 1+|\alpha|.`, R`$N$ の取り方`],
            ],
          },
          {
            text: R`$M:=\max\{|a_1|,\,|a_2|,\,\dots,\,|a_{N-1}|,\ 1+|\alpha|\}$ とおく（$N=1$ のときは $M:=1+|\alpha|$）。有限個の実数の最大値なので $M\in\mathbb{R}$ は確定し、$M\ge1>0$ で、すべての $n\in\mathbb{N}$ について $|a_n|\le M$ が成り立つ。`,
            why: R`$n\le N-1$ なら $|a_n|$ は最大値をとる候補の一つなので $|a_n|\le M$。$n\ge N$ なら上の式より $|a_n|<1+|\alpha|\le M$。最大値がとれるのは候補が<em>有限個</em>だからで、無限個だと最大値が存在するとは限らない。`,
          },
        ],
      },
      { t: 'rem', title: '逆は成り立たない', text: R`有界であっても収束するとは限らない。たとえば $a_n=(-1)^n$ は $|a_n|\le1$ で有界だが、$1$ と $-1$ を行き来し続けるので収束しない（下の [[sequence-convergence#ex-osc|例]] を参照）。有界に加えて「単調」であれば収束する。これが [[monotone-convergence]] である。` },

      { t: 'prop', id: 'prop-arith', title: '極限の四則演算', yomi: 'きょくげんのしそくえんざん', imp: 2, text: R`実数列 $\{a_n\},\{b_n\}$ と $\alpha,\beta\in\mathbb{R}$ について、$a_n\to\alpha$、$b_n\to\beta$ とする。このとき次が成り立つ。
<ol><li>$a_n+b_n\to\alpha+\beta$</li><li>$a_nb_n\to\alpha\beta$（特に定数 $c\in\mathbb{R}$ について $ca_n\to c\alpha$）</li><li>$\beta\ne0$ ならば、ある $N_0\in\mathbb{N}$ が存在して $n\ge N_0$ で $b_n\ne0$ となり、数列 $\left\{\dfrac{a_n}{b_n}\right\}_{n\ge N_0}$ は $\dfrac{\alpha}{\beta}$ に収束する。</li></ol>` },
      { t: 'strategy', text: R`和は誤差を $\varepsilon/2$ ずつ配分する。積は $a_nb_n-\alpha\beta=a_n(b_n-\beta)+\beta(a_n-\alpha)$ と<em>一方ずつ動かす</em>形に分け、$a_n$ を[[sequence-convergence#prop-bdd|有界性]]で抑える。商は $1/b_n\to1/\beta$ を示せば積に帰着する。` },
      {
        t: 'proof',
        sketch: R`どれも「目標の差」を「仮定で小さくできる差」の和に分解し、それぞれを $\varepsilon$ の何分の一かに抑える。商では、$b_n$ が $0$ に近づきすぎないこと（$|b_n|>|\beta|/2$）を先に確保するのが要点である。`,
        steps: [
          { text: R`<b>和</b>：$\varepsilon>0$ を任意にとる。$n\ge N_1$ で $|a_n-\alpha|<\varepsilon/2$、$n\ge N_2$ で $|b_n-\beta|<\varepsilon/2$ となる $N_1=N_1(\varepsilon),\,N_2=N_2(\varepsilon)\in\mathbb{N}$ をとる。$n\ge\max\{N_1,N_2\}$ ならば`,
            eqs: [[R`|(a_n+b_n)-(\alpha+\beta)| \le |a_n-\alpha|+|b_n-\beta| < \tfrac{\varepsilon}{2}+\tfrac{\varepsilon}{2}=\varepsilon.`, R`三角不等式`]] },
          { text: R`<b>積</b>：収束列は有界なので、すべての $n\in\mathbb{N}$ で $|a_n|\le M$ となる $M\in\mathbb{R}$, $M>0$ がある。すると`,
            eqs: [
              [R`|a_nb_n-\alpha\beta| = |a_n(b_n-\beta)+\beta(a_n-\alpha)|`, R`$a_n\beta$ を引いて足す`],
              [R`\phantom{|a_nb_n-\alpha\beta|} \le |a_n|\,|b_n-\beta|+|\beta|\,|a_n-\alpha|`, R`三角不等式・$|xy|=|x||y|$`],
              [R`\phantom{|a_nb_n-\alpha\beta|} \le M|b_n-\beta|+|\beta|\,|a_n-\alpha|.`, R`$|a_n|\le M$`],
            ] },
          { text: R`$\varepsilon>0$ に対し、$n\ge N_3$ で $|b_n-\beta|<\dfrac{\varepsilon}{2M}$、$n\ge N_4$ で $|a_n-\alpha|<\dfrac{\varepsilon}{2(|\beta|+1)}$ となる $N_3,N_4\in\mathbb{N}$ をとる。$n\ge\max\{N_3,N_4\}$ ならば、上の式は $\dfrac{\varepsilon}{2}+\dfrac{|\beta|}{|\beta|+1}\cdot\dfrac{\varepsilon}{2}<\varepsilon$ となる。定数 $c$ 倍は、すべての項が $c$ の定数列 $b_n=c$（$c$ に収束する）との積として得られる。`,
            why: R`$|\beta|$ で割らずに $|\beta|+1$ で割るのは、$\beta=0$ のときに $0$ で割ってしまうのを避けるためである。$\dfrac{|\beta|}{|\beta|+1}<1$ なので、これで十分小さくなる。` },
          { text: R`<b>商</b>：$\beta\ne0$ とする。$\varepsilon=|\beta|/2>0$ として収束の定義を使うと、ある $N_0\in\mathbb{N}$ が存在して $n\ge N_0$ で $|b_n-\beta|<|\beta|/2$。このとき $|b_n|>|\beta|/2>0$ なので $b_n\ne0$ である。`,
            why: R`[[abs-triangle#cor-rev|逆向きの三角不等式]]より $|b_n|\ge|\beta|-|\beta-b_n|>|\beta|-\dfrac{|\beta|}{2}=\dfrac{|\beta|}{2}$。$b_n$ が $\beta$ の近くにいれば、$0$ からも離れている、ということである。` },
          { text: R`$n\ge N_0$ のとき`,
            eqs: [
              [R`\left|\frac1{b_n}-\frac1\beta\right| = \frac{|\beta-b_n|}{|b_n|\,|\beta|}`, R`通分する`],
              [R`\phantom{\left|\frac1{b_n}-\frac1\beta\right|} < \frac{2}{|\beta|^2}\,|b_n-\beta|.`, R`$|b_n|>|\beta|/2$`],
            ] },
          { text: R`$\varepsilon>0$ に対し、$n\ge N_5$ で $|b_n-\beta|<\dfrac{|\beta|^2}{2}\varepsilon$ となる $N_5\in\mathbb{N}$ をとれば、$n\ge\max\{N_0,N_5\}$ で $\left|\frac1{b_n}-\frac1\beta\right|<\varepsilon$。よって $\frac1{b_n}\to\frac1\beta$ であり、積の結果と合わせて $\frac{a_n}{b_n}=a_n\cdot\frac1{b_n}\to\frac\alpha\beta$。` },
        ],
      },
      { t: 'prop', id: 'prop-order', title: '極限と不等式', yomi: 'きょくげんとふとうしき', imp: 2, text: R`実数列 $\{a_n\},\{b_n\}$ と $\alpha,\beta\in\mathbb{R}$ について、$a_n\to\alpha$、$b_n\to\beta$ で、すべての $n\in\mathbb{N}$ について $a_n\le b_n$ ならば、$\alpha\le\beta$ である。` },
      { t: 'strategy', text: R`背理法。$\alpha>\beta$ と仮定し、二つの極限のちょうど真ん中 $\frac{\alpha+\beta}{2}$ で線を引く。十分先では $a_n$ はその上、$b_n$ はその下にあるので、$a_n\le b_n$ に反する。` },
      {
        t: 'proof',
        sketch: R`$\varepsilon=\frac{\alpha-\beta}{2}$ にとると、二つの $\varepsilon$ 帯は重ならない。十分先の $a_n$ は上の帯、$b_n$ は下の帯にいるので $b_n<a_n$ となり矛盾。`,
        steps: [
          { text: R`$\alpha>\beta$ と仮定し、$\varepsilon:=\dfrac{\alpha-\beta}{2}>0$ とおく。$N_1,N_2\in\mathbb{N}$ を、$n\ge N_1$ で $|a_n-\alpha|<\varepsilon$、$n\ge N_2$ で $|b_n-\beta|<\varepsilon$ となるようにとり、$n:=\max\{N_1,N_2\}$ とする。` },
          { text: R`このとき`,
            eqs: [
              [R`a_n > \alpha-\varepsilon = \tfrac{\alpha+\beta}{2},`, R`$|a_n-\alpha|<\varepsilon$ の左半分`],
              [R`b_n < \beta+\varepsilon = \tfrac{\alpha+\beta}{2}.`, R`$|b_n-\beta|<\varepsilon$ の右半分`],
            ] },
          { text: R`したがって $b_n<a_n$ となり、仮定 $a_n\le b_n$ に矛盾する。よって $\alpha\le\beta$。` },
        ],
      },
      { t: 'rem', title: '「<」は極限で「≤」に変わる', text: R`すべての $n$ で $a_n<b_n$ でも、$\alpha<\beta$ とは限らない。たとえば $a_n=0$、$b_n=\frac1n$ は $a_n<b_n$ だが、極限はどちらも $0$ である。極限をとると、厳密な不等号は等号つきに弱まりうる。また仮定は「ある $N_0\in\mathbb{N}$ 以降で $a_n\le b_n$」でも同じ証明が通る（$n$ を $\max\{N_0,N_1,N_2\}$ にとればよい）。` },
      { t: 'cor', id: 'cor-squeeze', title: 'はさみうちの原理', yomi: 'はさみうちのげんり', imp: 2, text: R`実数列 $\{a_n\},\{b_n\},\{c_n\}$ と $\alpha\in\mathbb{R}$ について、すべての $n\in\mathbb{N}$ で $a_n\le c_n\le b_n$ であり、$a_n\to\alpha$、$b_n\to\alpha$ ならば、$c_n\to\alpha$ である。` },
      {
        t: 'proof',
        sketch: R`十分先では $a_n$ も $b_n$ も $\alpha$ の $\varepsilon$ 帯の中にいる。その間に挟まれた $c_n$ も帯の中にいるしかない。`,
        steps: [
          { text: R`$\varepsilon>0$ を任意にとり、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ かつ $|b_n-\alpha|<\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとる（それぞれの $N$ の大きいほう）。` },
          { text: R`$n\ge N$ ならば`, eqs: [[R`\alpha-\varepsilon < a_n \le c_n \le b_n < \alpha+\varepsilon`, R`$N$ の取り方と仮定`]] },
          { text: R`すなわち $|c_n-\alpha|<\varepsilon$（[[abs-triangle#prop-abs-basic|基本性質]] (4)）。よって $c_n\to\alpha$。` },
        ],
      },

      { t: 'ex', id: 'ex-inv', title: '1/n → 0', text: R`$\displaystyle\lim_{n\to\infty}\frac1n=0$ を定義に従って示す。$\varepsilon>0$ を任意にとる。[[supremum#cor-arch|アルキメデスの原理の系]]より $\frac1N<\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ がとれる。すると $n\in\mathbb{N}$, $n\ge N$ のとき
$$\left|\frac1n-0\right|=\frac1n\le\frac1N<\varepsilon.$$
よって $\dfrac1n\to0$ である。` },
      { t: 'note', title: '「N の見つけ方」は逆算する', text: R`証明では $N$ が天下り的に出てくるが、実際には<em>ゴールから逆算</em>して見つける。$\frac1n<\varepsilon$ にしたい $\Rightarrow$ $n>\frac1\varepsilon$ ならよい $\Rightarrow$ だから $N>\frac1\varepsilon$ にとる、という順に考え、清書では逆向きに書く（[[epsilon-delta-howto]]）。` },

      { t: 'h2', id: 'graph', text: 'グラフで確かめる' },
      { t: 'p', text: R`下の図では数列の式を自由に書き換えられる。プリセットを選ぶか、$n$ を使った式（例：<code>sin(n)/n</code>、<code>(1+1/n)^n</code>）を入力し、$\alpha$ と $\varepsilon$ を動かしてみよう。$N$ が見つからない場合は、その $\alpha$ には収束していないか、確認した範囲（$n\le5000$）の外で初めて帯に入り続ける。` },
      { t: 'fig', type: 'seq', preset: 'e', editable: true, caption: R`式・極限の候補 $\alpha$・誤差 $\varepsilon$ を変えて、$N=N(\varepsilon)$ の変化を観察する。$(1+1/n)^n\to e$ はゆっくり収束するため、$\varepsilon$ を小さくすると $N$ が急に大きくなる。` },

      { t: 'h2', id: 'counter', text: '反例と注意' },
      { t: 'ex', id: 'ex-osc', title: '(−1)ⁿ は発散する', text: R`$a_n=(-1)^n$ はどの $\alpha\in\mathbb{R}$ にも収束しない。実際、ある $\alpha$ に収束すると仮定して $\varepsilon=1$ ととると、ある $N\in\mathbb{N}$ があって $n\ge N$ のすべてで $|a_n-\alpha|<1$ である。$n\ge N$ の偶数 $n$ では $|1-\alpha|<1$、奇数 $n$ では $|-1-\alpha|<1$ なので、
$$2=|1-(-1)|\le|1-\alpha|+|\alpha-(-1)|<1+1=2$$
となり矛盾する。` },
      { t: 'fig', type: 'seq', preset: 'osc', caption: R`$a_n=(-1)^n,\ \alpha=1$。$\varepsilon\le2$ ではどこまで行っても帯の外の点（奇数番目）が現れるので、$N$ は見つからない。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\varepsilon$-$N$ 論法を用いて、$\displaystyle\lim_{n\to\infty}\frac{1}{n^2}=0$ を示せ。`, hint: R`$n\in\mathbb{N}$ なら $\dfrac1{n^2}\le\dfrac1n$。[[sequence-convergence#ex-inv|例]] と同じ $N$ でよい。`, answer: R`$\varepsilon>0$ を任意にとる。アルキメデスの原理の系より $\frac1N<\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ がとれる。$n\in\mathbb{N}$, $n\ge N$ のとき $n^2\ge n$ なので、$\left|\frac1{n^2}-0\right|=\frac1{n^2}\le\frac1n\le\frac1N<\varepsilon$。よって $\frac1{n^2}\to0$。`, space: 6 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`実数列 $\{a_n\}$ と $\alpha\in\mathbb{R}$ について、$a_n\to\alpha$ ならば $|a_n|\to|\alpha|$ であることを示せ。また、逆が成り立たない例を挙げよ。`, hint: R`[[abs-triangle#cor-rev|逆向きの三角不等式]] $\bigl||x|-|y|\bigr|\le|x-y|$ を使う。`, answer: R`$\varepsilon>0$ に対し、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとる。逆向きの三角不等式より $n\ge N$ で $\bigl||a_n|-|\alpha|\bigr|\le|a_n-\alpha|<\varepsilon$。よって $|a_n|\to|\alpha|$。逆の反例：$a_n=(-1)^n$ は $|a_n|=1\to1$ だが、$\{a_n\}$ 自身は収束しない。`, space: 8 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'monotone-convergence',
    title: '単調収束定理',
    sub: '',
    yomi: 'たんちょうしゅうそくていり',
    aliases: ['たんちょうしゅうそく', '有界単調数列', 'ゆうかいたんちょうすうれつ', '単調増加', 'たんちょうぞうか', '単調減少'],
    kind: '定理',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'supremum'],
    related: ['bolzano-weierstrass', 'cauchy-sequence', 'supremum'],
    notation: [
      R`実数列 $\{a_n\}$：各 $a_n\in\mathbb{R}$（$n\in\mathbb{N}$）。`,
      R`$\sup_{n}a_n:=\sup\{a_n\mid n\in\mathbb{N}\}$：項の値全体の集合の上限。$\inf_n a_n$ も同様。`,
      R`$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon>0$ に応じて決まる番号。`,
    ],
    synopsis: R`上に有界な単調増加の実数列は必ず収束し、その極限は項の値全体の上限に等しい。極限の値がわからなくても「収束すること」だけは保証できる、強力な定理である。`,
    body: [
      { t: 'h2', id: 'stmt', text: '定義と主張' },
      { t: 'def', id: 'def-mono', title: '単調な数列', yomi: 'たんちょうなすうれつ', imp: 2, text: R`実数列 $\{a_n\}$ が<b class="term">単調増加</b>である $:\Longleftrightarrow$ すべての $n\in\mathbb{N}$ について $a_n\le a_{n+1}$。<b class="term">単調減少</b> $:\Longleftrightarrow$ すべての $n\in\mathbb{N}$ について $a_n\ge a_{n+1}$。どちらかであるとき<b class="term">単調</b>という。` },
      { t: 'prop', id: 'prop-mono-ext', title: '単調性は離れた項にも及ぶ', yomi: 'たんちょうせいのかくちょう', imp: 1, text: R`実数列 $\{a_n\}$ が単調増加ならば、$m,n\in\mathbb{N}$, $m\le n$ について $a_m\le a_n$。` },
      { t: 'proof', steps: [{ text: R`$m$ を固定し、$n\ge m$ についての帰納法で示す。$n=m$ では $a_m\le a_m$。$a_m\le a_n$ と仮定すると、単調増加の定義より $a_n\le a_{n+1}$ なので $a_m\le a_{n+1}$。` }] },
      { t: 'thm', id: 'thm-mct', title: '単調収束定理', yomi: 'たんちょうしゅうそくていり', imp: 3, text: R`実数列 $\{a_n\}$ が単調増加かつ上に有界ならば、$\{a_n\}$ は収束し、$\displaystyle\lim_{n\to\infty}a_n=\sup_{n\in\mathbb{N}}a_n$ である。` },
      { t: 'strategy', text: R`候補 $s=\sup_n a_n$ を[[supremum#ax-sup|上限公理]]で用意し、[[supremum#prop-sup-eps|上限の ε 特徴づけ]]で $s-\varepsilon<a_N$ となる $N$ を見つける。あとは単調性で $N$ 以降すべてに広げる。` },
      {
        t: 'proof',
        sketch: R`上限 $s$ のすぐ下 $s-\varepsilon$ を超える項 $a_N$ が必ずある。単調増加なので、それ以降の項はすべて $s-\varepsilon$ と $s$ の間に挟まれる。`,
        steps: [
          { text: R`集合 $S=\{a_n\mid n\in\mathbb{N}\}\subset\mathbb{R}$ は空でなく（$a_1\in S$）、仮定より上に有界なので、上限公理より $s=\sup S\in\mathbb{R}$ が存在する。` },
          { text: R`$\varepsilon>0$ を任意にとる。上限の特徴づけ (2) より、$s-\varepsilon<a_N$ となる項、すなわち番号 $N=N(\varepsilon)\in\mathbb{N}$ が存在する。` },
          {
            text: R`$n\in\mathbb{N}$, $n\ge N$ とすると、`,
            eqs: [
              [R`s-\varepsilon < a_N \le a_n \le s`, R`[[monotone-convergence#prop-mono-ext|単調性]]・$s$ は上界`],
              [R`\therefore\ |a_n-s| < \varepsilon.`, R`$s-\varepsilon<a_n\le s<s+\varepsilon$ を書き直す`],
            ],
          },
          { text: R`したがって $a_n\to s$ である。` },
        ],
      },
      { t: 'cor', id: 'cor-mct-dec', title: '単調減少版', yomi: 'たんちょうげんしょうばん', imp: 2, text: R`実数列 $\{a_n\}$ が単調減少かつ下に有界ならば、$\{a_n\}$ は収束し、$\displaystyle\lim_{n\to\infty}a_n=\inf_{n\in\mathbb{N}}a_n$ である。` },
      { t: 'proof', steps: [{ text: R`$b_n:=-a_n$ とおくと $\{b_n\}$ は単調増加かつ上に有界（$-a_n\le-m$、$m$ は下界）。定理より $b_n\to\sup_n b_n=-\inf_n a_n$（[[supremum#cor-inf|下限]]）。[[sequence-convergence#prop-arith|定数倍]]より $a_n=-b_n\to\inf_n a_n$。` }] },
      { t: 'crux', text: R`極限の<em>値</em>を知らなくても、上限公理が「行き先」$s$ を用意してくれる。収束の証明に必要なのは、行き先の存在と、そこへ近づく仕組み（単調性）の二つだけである。` },
      { t: 'ex', id: 'ex-mct-e', title: '(1 + 1/n)ⁿ は収束する', text: R`$a_n=(1+\frac1n)^n$ は単調増加で $a_n<3$ をみたす（二項展開で示せる）。したがって単調収束定理より収束する。その極限をネイピア数 $e$ と定義する（$e\approx2.718$）。収束の様子は[[sequence-convergence#graph|数列の収束のグラフ]]で確かめられる。` },
      { t: 'qa', q: R`「上に有界」を外すとどうなる？`, a: R`収束するとは限らない。$a_n=n$ は単調増加だが、どの実数にも収束しない（$+\infty$ に発散する）。上限公理を使うには、集合が上に有界であることが必要だからである。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'bolzano-weierstrass',
    title: 'ボルツァーノ＝ワイエルシュトラスの定理',
    sub: '有界数列の収束部分列',
    yomi: 'ぼるつぁーの・わいえるしゅとらすのていり',
    aliases: ['ぼるつぁーの', 'わいえるしゅとらす', 'BWの定理', '部分列', 'ぶぶんれつ', '収束部分列', 'しゅうそくぶぶんれつ', '山', 'やま'],
    kind: '定理',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'monotone-convergence'],
    related: ['cauchy-sequence', 'extreme-value', 'monotone-convergence'],
    notation: [
      R`$\{a_{n_k}\}_{k\in\mathbb{N}}$：部分列。$k$ は「部分列の中で何番目か」、$n_k\in\mathbb{N}$ は「元の数列で何番目か」。`,
      R`$n_1<n_2<\cdots$：番号 $n_k\in\mathbb{N}$ は狭義単調増加（同じ番号を二度使わず、後戻りしない）。`,
    ],
    synopsis: R`有界な実数列は、それ自身が収束しなくても、<em>収束する部分列</em>を必ずもつ。最大値の定理やコーシー列の収束など、「何かが存在すること」を示す場面で繰り返し使われる。`,
    body: [
      { t: 'h2', id: 'subseq', text: '部分列' },
      { t: 'def', id: 'def-subseq', title: '部分列', yomi: 'ぶぶんれつ', imp: 2, text: R`実数列 $\{a_n\}$ と、自然数の狭義単調増加列 $n_1<n_2<n_3<\cdots$（各 $n_k\in\mathbb{N}$）に対し、$b_k:=a_{n_k}\ (k\in\mathbb{N})$ で定まる実数列 $\{a_{n_k}\}_{k\in\mathbb{N}}$ を、$\{a_n\}$ の<b class="term">部分列</b>という。` },
      { t: 'note', title: '添字が二段になるのに慣れる', text: R`部分列の $k$ 番目の項は $a_{n_k}$ である。たとえば偶数番目だけを抜き出すと $n_k=2k$ で、部分列は $a_2,a_4,a_6,\dots$ となる。` },
      { t: 'prop', id: 'prop-nk-ge-k', title: 'n_k ≥ k', yomi: 'ぶぶんれつのばんごう', imp: 1, text: R`自然数の狭義単調増加列 $\{n_k\}$ について、すべての $k\in\mathbb{N}$ で $n_k\ge k$。` },
      { t: 'proof', steps: [{ text: R`帰納法。$n_1\ge1$ は $n_1\in\mathbb{N}$ だから成り立つ。$n_k\ge k$ と仮定すると、$n_{k+1}>n_k\ge k$ で、$n_{k+1}$ は整数なので $n_{k+1}\ge k+1$。` }] },
      { t: 'prop', id: 'prop-subseq-conv', title: '収束列の部分列', yomi: 'しゅうそくれつのぶぶんれつ', imp: 2, text: R`実数列 $\{a_n\}$ が $\alpha\in\mathbb{R}$ に収束するならば、$\{a_n\}$ の任意の部分列 $\{a_{n_k}\}$ も $\alpha$ に収束する。` },
      { t: 'proof', steps: [{ text: R`$\varepsilon>0$ に対し、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとる。$k\in\mathbb{N}$, $k\ge N$ ならば、上の命題より $n_k\ge k\ge N$ なので $|a_{n_k}-\alpha|<\varepsilon$。よって $a_{n_k}\to\alpha\ (k\to\infty)$。` }] },
      { t: 'rem', title: '使い方は「対偶」が多い', text: R`この命題は「収束しないこと」を示すのに便利である。異なる値に収束する部分列が二つ見つかれば、元の数列は収束しない。たとえば $(-1)^n$ の偶数番目は $1$、奇数番目は $-1$ に収束するので、$(-1)^n$ は発散する。` },

      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-bw', title: 'ボルツァーノ＝ワイエルシュトラスの定理', yomi: 'ぼるつぁーの・わいえるしゅとらすのていり', imp: 3, text: R`有界な実数列 $\{a_n\}$（ある $M>0$ ですべての $n\in\mathbb{N}$ について $|a_n|\le M$）は、収束する部分列 $\{a_{n_k}\}$ をもつ。` },
      { t: 'strategy', text: R`二段構えで示す。① どんな実数列にも単調な部分列がある（[[bolzano-weierstrass#lem-mono|補題]]）。② 有界で単調なら収束する（[[monotone-convergence]]）。①が本題で、「山」という見方を使う。` },

      { t: 'h2', id: 'mono', text: '単調な部分列の存在' },
      { t: 'lem', id: 'lem-mono', title: '単調部分列の補題', yomi: 'たんちょうぶぶんれつのほだい', imp: 2, text: R`任意の実数列 $\{a_n\}$ は、単調な（単調増加または単調減少の）部分列をもつ。` },
      { t: 'def', id: 'def-peak', title: '山', yomi: 'やま', imp: 1, text: R`実数列 $\{a_n\}$ について、番号 $n\in\mathbb{N}$ が<b class="term">山</b>である $:\Longleftrightarrow$ すべての $m\in\mathbb{N}$, $m>n$ について $a_n\ge a_m$。山の項からは、後ろを見渡しても自分より高い項がない。` },
      { t: 'fig', type: 'subseq', preset: 'alt', editable: true, caption: R`▲ が山の項、赤い点と線が取り出した単調部分列。山が無限個あれば山の項を並べるだけで単調減少になる。山が有限個なら、最後の山より後ろから「次の、自分より大きい項」をたどって単調増加な部分列を作る。（図は $n\le3000$ までの値で判定している）` },
      {
        t: 'proof',
        sketch: R`山が無限個なら、山の番号を小さい順に並べた部分列は単調減少。山が有限個なら、最後の山より後ろの番号はどれも山でないので、「自分より大きい項が後ろに必ずある」。これをたどれば単調増加な部分列ができる。`,
        steps: [
          { text: R`<b>山が無限個ある場合。</b>山の番号を小さい順に $n_1<n_2<\cdots$ とする。各 $k$ で $n_k$ は山で $n_{k+1}>n_k$ なので、$a_{n_k}\ge a_{n_{k+1}}$。よって $\{a_{n_k}\}$ は単調減少な部分列である。` },
          { text: R`<b>山が有限個しかない場合。</b>山が一つもなければ $n_1:=1$、あれば最後の山の番号を $p$ として $n_1:=p+1$ とおく。$n_1$ 以上の番号はどれも山ではない。` },
          { text: R`$n_k$ まで定まったとする（$n_k\ge n_1$ なので山でない）。山でないことから、$m>n_k$ かつ $a_m>a_{n_k}$ となる $m\in\mathbb{N}$ が存在する。そのような $m$ のうち最小のものを $n_{k+1}$ とおく。こうして帰納的に $n_1<n_2<\cdots$ が定まり、$a_{n_1}<a_{n_2}<\cdots$ である。`, why: R`「$n$ が山でない」は、山の定義「$\forall m\in\mathbb{N},\ m>n\Rightarrow a_n\ge a_m$」の否定なので、「$\exists m\in\mathbb{N},\ m>n$ かつ $a_n<a_m$」となる（[[logic-quantifiers#prop-neg|否定の規則]]）。「最小のもの」を選ぶのは、選び方を一つに決めて数列をきちんと定義するためである（自然数の空でない部分集合には最小元がある）。` },
        ],
      },
      { t: 'h2', id: 'proof', text: '定理の証明' },
      {
        t: 'proof',
        sketch: R`補題で単調な部分列をとる。元の数列が有界なので、部分列も有界。有界な単調列は収束する。`,
        steps: [
          { text: R`$\{a_n\}$ を有界な実数列とし、すべての $n\in\mathbb{N}$ で $|a_n|\le M$（$M>0$）とする。補題より単調な部分列 $\{a_{n_k}\}$ がとれる。` },
          { text: R`部分列の項も元の数列の項なので、すべての $k\in\mathbb{N}$ で $-M\le a_{n_k}\le M$。すなわち部分列は上にも下にも有界である。` },
          { text: R`単調増加なら[[monotone-convergence#thm-mct|単調収束定理]]により、単調減少なら[[monotone-convergence#cor-mct-dec|その単調減少版]]により、$\{a_{n_k}\}$ は収束する。` },
        ],
      },
      { t: 'crux', text: R`どんな数列にも単調な部分列が<em>隠れている</em>。そして「有界＋単調＝収束」。この二つを組み合わせるだけで、極限の値を一切知らないまま、収束する部分列の存在が保証される。` },
      { t: 'h2', id: 'ex', text: '例と注意' },
      { t: 'ex', id: 'ex-bw-alt', title: '(−1)ⁿ(1 + 1/n)', text: R`$a_n=(-1)^n\left(1+\frac1n\right)$ は $|a_n|\le2$ で有界だが収束しない。偶数番目 $a_{2k}=1+\frac1{2k}\to1$、奇数番目 $a_{2k-1}=-1-\frac1{2k-1}\to-1$ が収束する部分列である。` },
      { t: 'rem', title: '「有界」は外せない', text: R`$a_n=n$ はどんな部分列も $a_{n_k}=n_k\ge k$ となり、有界でないので収束しない（[[sequence-convergence#prop-bdd|収束列は有界]]）。定理の仮定「有界」が本質的であることがわかる。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-bw-1', level: 1, title: '基本', text: R`$a_n=(-1)^n+\dfrac1n\ (n\in\mathbb{N})$ について、収束する部分列を二つ挙げ、それぞれの極限を求めよ。また、$\{a_n\}$ が収束しない理由を述べよ。`, hint: R`偶数番目と奇数番目に分ける。`, answer: R`$a_{2k}=1+\frac1{2k}\to1$、$a_{2k-1}=-1+\frac1{2k-1}\to-1$。もし $a_n\to\alpha\in\mathbb{R}$ なら、[[bolzano-weierstrass#prop-subseq-conv|部分列も同じ極限に収束する]]ので $\alpha=1$ かつ $\alpha=-1$ となり矛盾する。よって収束しない。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'cauchy-sequence',
    title: 'コーシー列',
    sub: '実数の完備性',
    yomi: 'こーしーれつ',
    aliases: ['こーしー', 'Cauchy列', '基本列', 'きほんれつ', '完備', 'かんび', '完備性'],
    kind: '用語',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'bolzano-weierstrass'],
    related: ['monotone-convergence', 'bolzano-weierstrass'],
    notation: [
      R`$m,n\ge N$：$m\ge N$ かつ $n\ge N$（$m,n,N\in\mathbb{N}$）。`,
      R`$N=N(\varepsilon)\in\mathbb{N}$：$\varepsilon>0$ に応じて決まる番号。`,
    ],
    synopsis: R`項どうしが互いにいくらでも近づく実数列をコーシー列という。極限の値を使わずに「収束しそうか」を判定できる。実数のコーシー列は必ず収束する（実数の完備性）。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-cauchy', title: 'コーシー列', yomi: 'こーしーれつ', imp: 3, text: R`実数列 $\{a_n\}$ が<b class="term">コーシー列</b>（基本列）である $:\Longleftrightarrow$
$$\forall\varepsilon>0,\ \exists N=N(\varepsilon)\in\mathbb{N}\ \text{ s.t. }\ \forall m,n\in\mathbb{N},\quad m,n\ge N\Longrightarrow|a_m-a_n|<\varepsilon. \tag{#}$$` },
      { t: 'note', title: '収束の定義との違い', text: R`[[sequence-convergence#def-conv|収束の定義]]には行き先 $\alpha$ が出てくるが、コーシー列の定義には出てこない。「項どうしがまとまってくる」ことだけを述べている。` },
      { t: 'thm', id: 'thm-conv-cauchy', title: '収束列はコーシー列', yomi: 'しゅうそくれつはこーしーれつ', imp: 2, text: R`実数列 $\{a_n\}$ が収束するならば、$\{a_n\}$ はコーシー列である。` },
      {
        t: 'proof',
        sketch: R`$a_m$ と $a_n$ がともに極限 $\alpha$ の $\varepsilon/2$ 以内にあれば、互いの距離は $\varepsilon$ 未満である。`,
        steps: [
          { text: R`$a_n\to\alpha\in\mathbb{R}$ とし、$\varepsilon>0$ を任意にとる。$n\ge N$ で $|a_n-\alpha|<\varepsilon/2$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとる。` },
          { text: R`$m,n\in\mathbb{N}$, $m,n\ge N$ ならば`, eqs: [[R`|a_m-a_n|\le|a_m-\alpha|+|\alpha-a_n|<\tfrac{\varepsilon}{2}+\tfrac{\varepsilon}{2}=\varepsilon.`, R`[[abs-triangle#cor-tri-dist|三角不等式]]`]] },
        ],
      },
      { t: 'thm', id: 'thm-cauchy-conv', title: 'コーシー列は収束する（実数の完備性）', yomi: 'じつすうのかんびせい', imp: 3, text: R`実数のコーシー列 $\{a_n\}$ は、ある $\alpha\in\mathbb{R}$ に収束する。` },
      { t: 'strategy', text: R`極限の候補を[[bolzano-weierstrass|ボルツァーノ＝ワイエルシュトラスの定理]]で作る。コーシー列は有界なので収束部分列 $a_{n_k}\to\alpha$ がある。あとは「項どうしが近い」性質で、数列全体を $\alpha$ に引き寄せる。` },
      {
        t: 'proof',
        sketch: R`有界 → 収束部分列がある → 部分列の極限 $\alpha$ の近くに部分列の項があり、十分先の項はその部分列の項に近いので、$\alpha$ にも近い（$\varepsilon/2+\varepsilon/2$）。`,
        steps: [
          { text: R`<b>有界であること。</b>定義で $\varepsilon=1$ とすると、ある $N_0\in\mathbb{N}$ があって $m,n\ge N_0$ で $|a_m-a_n|<1$。特に $n\ge N_0$ で $|a_n|\le|a_n-a_{N_0}|+|a_{N_0}|<1+|a_{N_0}|$。$M:=\max\{|a_1|,\dots,|a_{N_0-1}|,\ 1+|a_{N_0}|\}$ とおけば、すべての $n\in\mathbb{N}$ で $|a_n|\le M$。`, why: R`[[sequence-convergence#prop-bdd|収束列の有界性]]と同じ論法である。「十分先」は $a_{N_0}$ の近くに閉じ込め、「最初の有限個」は最大値で抑える。` },
          { text: R`ボルツァーノ＝ワイエルシュトラスの定理より、収束する部分列 $a_{n_k}\to\alpha\in\mathbb{R}$ がとれる。これが極限の候補である。` },
          { text: R`$\varepsilon>0$ を任意にとる。コーシー列であることから、$m,n\ge N$ で $|a_m-a_n|<\varepsilon/2$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとる。また $a_{n_k}\to\alpha$ より、$|a_{n_k}-\alpha|<\varepsilon/2$ かつ $n_k\ge N$ となる $k\in\mathbb{N}$ を一つとる。`, why: R`$a_{n_k}\to\alpha$ なので、ある $K\in\mathbb{N}$ があって $k\ge K$ のすべてで $|a_{n_k}-\alpha|<\varepsilon/2$。さらに[[bolzano-weierstrass#prop-nk-ge-k|$n_k\ge k$]] なので、$k=\max\{K,N\}$ にとれば $n_k\ge N$ もみたす。` },
          { text: R`$n\in\mathbb{N}$, $n\ge N$ ならば`,
            eqs: [
              [R`|a_n-\alpha| \le |a_n-a_{n_k}|+|a_{n_k}-\alpha|`, R`三角不等式`],
              [R`\phantom{|a_n-\alpha|} < \tfrac{\varepsilon}{2}+\tfrac{\varepsilon}{2}=\varepsilon.`, R`$n,\,n_k\ge N$ と $k$ の取り方`],
            ] },
          { text: R`よって $a_n\to\alpha$ である。` },
        ],
      },
      { t: 'crux', text: R`コーシー列の定義には極限の値が出てこない。それでも収束が言えるのは、実数に「穴がない」（上限公理）からである。実際、有理数だけの世界では $\sqrt2$ に近づく有理数列はコーシー列なのに、有理数の中に極限がない。` },
      { t: 'qa', q: R`「隣どうしが近づく」（$|a_{n+1}-a_n|\to0$）ならコーシー列か？`, a: R`そうとは限らない。$a_n=1+\frac12+\cdots+\frac1n$ は $|a_{n+1}-a_n|=\frac1{n+1}\to0$ だが、$+\infty$ に発散する（[[series|級数]]の章で示す）。コーシー列の条件は「<em>どの二項</em>も（$m,n\ge N$ なら）近い」であり、隣どうしだけでは足りない。` },
    ],
  });
})();
