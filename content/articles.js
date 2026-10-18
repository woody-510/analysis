/* 記事データ（試作）
   1 記事 = 1 オブジェクト。本文 body はブロックの配列。
   テキスト中の記法：$…$ / $$…$$ = 数式、[[id]] / [[id#anchor|表示]] = 内部リンク、\tag{#} = 自動の式番号 */
(function () {
  const R = String.raw;
  const A = (window.ARTICLES = []);

  /* ------------------------------------------------------------ */
  A.push({
    id: 'sequence-convergence',
    title: '数列の収束',
    sub: 'ε-N 論法',
    yomi: 'すうれつのしゅうそく',
    aliases: ['いぷしろんえぬろんぽう', 'ε-N論法', 'イプシロンエヌ論法', '収束', 'しゅうそく', '極限', 'きょくげん'],
    kind: '用語',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['supremum', 'abs-triangle', 'logic-quantifiers'],
    related: ['monotone-convergence', 'cauchy-sequence', 'logic-quantifiers', 'supremum'],
    synopsis: R`どれほど小さな誤差 $\varepsilon$ を指定されても、ある番号 $N$ から先の項はすべて $\alpha$ から $\varepsilon$ 以内に収まる。これが「数列 $\{a_n\}$ が $\alpha$ に収束する」ことの厳密な意味である。`,
    body: [
      { t: 'h2', id: 'intuition', text: '直感：「近づく」とは何か' },
      { t: 'p', text: R`高校では「$n$ を限りなく大きくすると $a_n$ が $\alpha$ に限りなく近づく」と習った。しかし「限りなく」は曖昧である。どのくらい大きくすれば、どのくらい近づくのか。解析学ではこれを、<em>誤差の許容幅</em> $\varepsilon$ と<em>番号</em> $N$ のやりとりとして言い直す。` },
      { t: 'fig', type: 'seq', preset: 'alt', caption: R`$a_n = 1 + \dfrac{(-1)^n\cdot 1.2}{n}$ と $\alpha = 1$。$\varepsilon$ を動かすと、帯 $(\alpha-\varepsilon,\ \alpha+\varepsilon)$ に入り続ける最初の番号 $N$ が変わる。$\varepsilon$ を小さくするほど $N$ は大きくなる。` },
      { t: 'p', text: R`図の帯は「$\alpha$ からの誤差が $\varepsilon$ 未満」の範囲である。収束するとは、<em>どんなに細い帯</em>を用意されても、ある番号から先の点がすべてその帯の中に収まることだ。最初の数項が帯の外にあるのは一向にかまわない。` },
      { t: 'note', title: 'ε は「相手が出す挑戦」、N は「こちらの返答」', text: R`収束の定義はゲームとして読むとわかりやすい。相手がどんなに小さい $\varepsilon>0$ を突きつけてきても、こちらは必ず「この番号から先なら大丈夫」という $N$ を返せる——それが収束である。$\varepsilon$ が小さくなるほど、返す $N$ は大きくなってよい。つまり $N$ は $\varepsilon$ に応じて決めてよい（$N$ は $\varepsilon$ の関数である）。` },

      { t: 'h2', id: 'definition', text: '定義' },
      { t: 'def', id: 'def-conv', title: '数列の収束', yomi: 'すうれつのしゅうそく', imp: 3, text: R`数列 $\{a_n\}$ が実数 $\alpha$ に<b class="term">収束する</b>とは、次が成り立つことをいう。
$$\forall \varepsilon>0,\ \exists N\in\mathbb{N}\ \text{ s.t. }\ \forall n\ge N,\quad |a_n-\alpha|<\varepsilon. \tag{#}$$
このとき $\alpha$ を $\{a_n\}$ の<b class="term">極限</b>（極限値）といい、$\displaystyle\lim_{n\to\infty}a_n=\alpha$ または $a_n\to\alpha\ (n\to\infty)$ と書く。` },
      { t: 'note', title: '定義を 4 つの部品に分けて読む', text: R`<ol><li>$\forall\varepsilon>0$：どんな正の誤差に対しても</li><li>$\exists N\in\mathbb{N}$：ある番号 $N$ が存在して</li><li>$\forall n\ge N$：$N$ 以降のすべての番号 $n$ について</li><li>$|a_n-\alpha|<\varepsilon$：$a_n$ と $\alpha$ の差が $\varepsilon$ 未満</li></ol>記号の意味は [[logic-quantifiers]] を参照。` },
      { t: 'def', id: 'def-div', title: '発散', yomi: 'はっさん', imp: 2, text: R`数列 $\{a_n\}$ がどの実数にも収束しないとき、$\{a_n\}$ は<b class="term">発散する</b>という。特に
$$\forall M\in\mathbb{R},\ \exists N\in\mathbb{N}\ \text{ s.t. }\ \forall n\ge N,\quad a_n>M$$
が成り立つとき、$\{a_n\}$ は $+\infty$ に発散するといい、$\displaystyle\lim_{n\to\infty}a_n=+\infty$ と書く。` },
      { t: 'rem', title: '∀ と ∃ の順番を入れ替えてはいけない', text: R`「$\exists N,\ \forall\varepsilon>0,\ \forall n\ge N,\ |a_n-\alpha|<\varepsilon$」と書くと、$N$ が $\varepsilon$ によらず一つに決まることになる。このとき $n\ge N$ なら $|a_n-\alpha|$ はすべての正の数より小さいので $a_n=\alpha$ となる。つまり「ある番号から先はずっと $a_n=\alpha$」という、はるかに強い主張になってしまう。` },

      { t: 'h2', id: 'properties', text: '基本的な性質' },
      { t: 'thm', id: 'thm-unique', title: '極限の一意性', yomi: 'きょくげんのいちいせい', imp: 2, text: R`数列 $\{a_n\}$ が $\alpha$ にも $\beta$ にも収束するならば、$\alpha=\beta$ である。` },
      { t: 'strategy', text: R`$\alpha$ と $\beta$ の距離 $|\alpha-\beta|$ が、任意の $\varepsilon>0$ に対して $2\varepsilon$ より小さいことを示す。そのような $0$ 以上の数は $0$ しかない。` },
      {
        t: 'proof',
        sketch: R`十分先の番号 $n$ では、$a_n$ は $\alpha$ にも $\beta$ にも $\varepsilon$ 以内まで近い。三角不等式で $|\alpha-\beta|\le|\alpha-a_n|+|a_n-\beta|<2\varepsilon$。$\varepsilon$ はいくらでも小さくとれるので $|\alpha-\beta|=0$。`,
        steps: [
          { text: R`$\varepsilon>0$ を任意にとる。$a_n\to\alpha$ より、ある $N_1\in\mathbb{N}$ が存在して、$n\ge N_1$ ならば $|a_n-\alpha|<\varepsilon$ である。同様に $a_n\to\beta$ より、ある $N_2\in\mathbb{N}$ が存在して、$n\ge N_2$ ならば $|a_n-\beta|<\varepsilon$ である。` },
          {
            text: R`$n=\max\{N_1,N_2\}$ とおく。この $n$ は $n\ge N_1$ と $n\ge N_2$ を両方みたすので、`,
            eqs: [
              [R`|\alpha-\beta| = |(\alpha-a_n)+(a_n-\beta)|`, R`$a_n$ を引いて足す`],
              [R`\phantom{|\alpha-\beta|} \le |\alpha-a_n| + |a_n-\beta|`, R`三角不等式 [[abs-triangle#prop-tri|Prop.]]`],
              [R`\phantom{|\alpha-\beta|} < \varepsilon+\varepsilon = 2\varepsilon.`, R`$N_1,\,N_2$ の取り方`],
            ],
          },
          {
            text: R`$\varepsilon>0$ は任意だったので、$0\le|\alpha-\beta|<2\varepsilon$ がすべての $\varepsilon>0$ について成り立つ。よって $|\alpha-\beta|=0$、すなわち $\alpha=\beta$ である。`,
            why: R`$x=|\alpha-\beta|\ge0$ とする。もし $x>0$ なら、$\varepsilon=x/2>0$ とおくと $x<2\varepsilon=x$ となり矛盾する。したがって $x=0$ である。「任意の正の数より小さい非負の数は $0$」という論法は、この先何度も使う。`,
          },
        ],
      },
      { t: 'crux', text: R`$\varepsilon$ は<em>こちらが自由に選べる</em>。二つの極限の距離より小さい $\varepsilon$ を選べば、$a_n$ が両方に同時に $\varepsilon$ 以内まで近づくことはできない。この「$\varepsilon$ を後から都合よく選ぶ」発想は、解析学全体で何度も使われる。` },

      { t: 'prop', id: 'prop-bdd', title: '収束列の有界性', yomi: 'しゅうそくれつのゆうかいせい', imp: 2, text: R`収束する数列は有界である。すなわち $a_n\to\alpha$ ならば、ある $M>0$ が存在して、すべての $n\in\mathbb{N}$ について $|a_n|\le M$ が成り立つ。` },
      { t: 'strategy', text: R`$\varepsilon=1$ として定義を使うと、$N$ 番目から先は $|a_n|<|\alpha|+1$ で抑えられる。残りは最初の有限個 $a_1,\dots,a_{N-1}$ だけなので、それらと合わせて最大値をとればよい。` },
      {
        t: 'proof',
        sketch: R`「十分先」は極限の近くに閉じ込められ、「最初の有限個」は最大値で抑えられる。両方の大きいほうを $M$ とすればよい。`,
        steps: [
          { text: R`収束の定義で $\varepsilon=1$ とすると、ある $N$ が存在して、$n\ge N$ ならば $|a_n-\alpha|<1$ である。` },
          {
            text: R`$n\ge N$ のとき、`,
            eqs: [
              [R`|a_n| = |(a_n-\alpha)+\alpha|`, R`$\alpha$ を引いて足す`],
              [R`\phantom{|a_n|} \le |a_n-\alpha|+|\alpha|`, R`三角不等式`],
              [R`\phantom{|a_n|} < 1+|\alpha|.`, R`$N$ の取り方`],
            ],
          },
          {
            text: R`$M=\max\{|a_1|,\,|a_2|,\,\dots,\,|a_{N-1}|,\ 1+|\alpha|\}$ とおく。有限個の数の最大値なので $M$ は確定し、すべての $n$ について $|a_n|\le M$ が成り立つ。`,
            why: R`$n\le N-1$ なら $|a_n|$ は最大値をとる候補の一つなので $|a_n|\le M$。$n\ge N$ なら手順 2 より $|a_n|<1+|\alpha|\le M$。どちらの場合も $|a_n|\le M$ である。最大値がとれるのは候補が<em>有限個</em>だからで、無限個だと最大値が存在するとは限らない。`,
          },
        ],
      },
      { t: 'rem', title: '逆は成り立たない', text: R`有界であっても収束するとは限らない。たとえば $a_n=(-1)^n$ は $|a_n|\le1$ で有界だが、$1$ と $-1$ を行き来し続けるので収束しない（下の [[sequence-convergence#ex-osc|例]] を参照）。有界に加えて「単調」であれば収束する。これが [[monotone-convergence]] である。` },

      { t: 'prop', id: 'prop-arith', title: '極限の四則演算', yomi: 'きょくげんのしそくえんざん', imp: 2, text: R`$a_n\to\alpha$、$b_n\to\beta$ とする。このとき次が成り立つ。
<ol><li>$a_n+b_n\to\alpha+\beta$</li><li>$a_nb_n\to\alpha\beta$</li><li>$\beta\ne0$ ならば、十分大きいすべての $n$ で $b_n\ne0$ であり、$\dfrac{a_n}{b_n}\to\dfrac{\alpha}{\beta}$</li></ol>` },
      { t: 'strategy', text: R`和は誤差を $\varepsilon/2$ ずつ配分する。積は $a_nb_n-\alpha\beta=a_n(b_n-\beta)+\beta(a_n-\alpha)$ と<em>一方ずつ動かす</em>形に分け、$a_n$ を[[sequence-convergence#prop-bdd|有界性]]で抑える。商は $1/b_n\to1/\beta$ を示せば積に帰着する。` },
      {
        t: 'proof',
        sketch: R`どれも「目標の差」を「仮定で小さくできる差」の和に分解し、それぞれを $\varepsilon$ の何分の一かに抑える。商では、$b_n$ が $0$ に近づきすぎないこと（$|b_n|>|\beta|/2$）を先に確保するのが要点である。`,
        steps: [
          { text: R`<b>和</b>：$\varepsilon>0$ を任意にとる。$n\ge N_1$ で $|a_n-\alpha|<\varepsilon/2$、$n\ge N_2$ で $|b_n-\beta|<\varepsilon/2$ となる $N_1,N_2$ をとる。$n\ge\max\{N_1,N_2\}$ ならば`,
            eqs: [[R`|(a_n+b_n)-(\alpha+\beta)| \le |a_n-\alpha|+|b_n-\beta| < \tfrac{\varepsilon}{2}+\tfrac{\varepsilon}{2}=\varepsilon.`, R`三角不等式`]] },
          { text: R`<b>積</b>：収束列は有界なので、すべての $n$ で $|a_n|\le M$ となる $M>0$ がある。すると`,
            eqs: [
              [R`|a_nb_n-\alpha\beta| = |a_n(b_n-\beta)+\beta(a_n-\alpha)|`, R`$a_n\beta$ を引いて足す`],
              [R`\phantom{|a_nb_n-\alpha\beta|} \le |a_n|\,|b_n-\beta|+|\beta|\,|a_n-\alpha|`, R`三角不等式`],
              [R`\phantom{|a_nb_n-\alpha\beta|} \le M|b_n-\beta|+|\beta|\,|a_n-\alpha|.`, R`$|a_n|\le M$`],
            ] },
          { text: R`$\varepsilon>0$ に対し、$n\ge N_3$ で $|b_n-\beta|<\dfrac{\varepsilon}{2M}$、$n\ge N_4$ で $|a_n-\alpha|<\dfrac{\varepsilon}{2(|\beta|+1)}$ となるようにとる。$n\ge\max\{N_3,N_4\}$ ならば、上の式は $\dfrac{\varepsilon}{2}+\dfrac{|\beta|}{|\beta|+1}\cdot\dfrac{\varepsilon}{2}<\varepsilon$ となる。`,
            why: R`$|\beta|$ で割らずに $|\beta|+1$ で割るのは、$\beta=0$ のときに $0$ で割ってしまうのを避けるためである。$\dfrac{|\beta|}{|\beta|+1}<1$ なので、これで十分小さくなる。` },
          { text: R`<b>商</b>：$\beta\ne0$ とする。$\varepsilon=|\beta|/2>0$ として収束の定義を使うと、$n\ge N_5$ で $|b_n-\beta|<|\beta|/2$。このとき $|b_n|>|\beta|/2>0$ なので $b_n\ne0$ である。`,
            why: R`[[abs-triangle#cor-rev|逆向きの三角不等式]]より $|b_n|\ge|\beta|-|\beta-b_n|>|\beta|-\dfrac{|\beta|}{2}=\dfrac{|\beta|}{2}$。$b_n$ が $\beta$ の近くにいれば、$0$ からも離れている、ということである。` },
          { text: R`$n\ge N_5$ のとき`,
            eqs: [
              [R`\left|\frac1{b_n}-\frac1\beta\right| = \frac{|\beta-b_n|}{|b_n|\,|\beta|}`, R`通分する`],
              [R`\phantom{\left|\frac1{b_n}-\frac1\beta\right|} < \frac{2}{|\beta|^2}\,|b_n-\beta|.`, R`$|b_n|>|\beta|/2$`],
            ] },
          { text: R`$\varepsilon>0$ に対し $n\ge N_6$ で $|b_n-\beta|<\dfrac{|\beta|^2}{2}\varepsilon$ となるようにとれば、$n\ge\max\{N_5,N_6\}$ で $\left|\frac1{b_n}-\frac1\beta\right|<\varepsilon$。よって $\frac1{b_n}\to\frac1\beta$ であり、積の結果と合わせて $\frac{a_n}{b_n}=a_n\cdot\frac1{b_n}\to\frac\alpha\beta$。` },
        ],
      },
      { t: 'prop', id: 'prop-order', title: '極限と不等式', yomi: 'きょくげんとふとうしき', imp: 2, text: R`$a_n\to\alpha$、$b_n\to\beta$ で、すべての $n$ について $a_n\le b_n$ ならば、$\alpha\le\beta$ である。` },
      { t: 'strategy', text: R`背理法。$\alpha>\beta$ と仮定し、二つの極限のちょうど真ん中 $\frac{\alpha+\beta}{2}$ で線を引く。十分先では $a_n$ はその上、$b_n$ はその下にあるので、$a_n\le b_n$ に反する。` },
      {
        t: 'proof',
        sketch: R`$\varepsilon=\frac{\alpha-\beta}{2}$ にとると、二つの $\varepsilon$ 帯は重ならない。十分先の $a_n$ は上の帯、$b_n$ は下の帯にいるので $b_n<a_n$ となり矛盾。`,
        steps: [
          { text: R`$\alpha>\beta$ と仮定し、$\varepsilon=\dfrac{\alpha-\beta}{2}>0$ とおく。十分大きい $N$ をとると、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ かつ $|b_n-\beta|<\varepsilon$。` },
          { text: R`このとき`,
            eqs: [
              [R`a_n > \alpha-\varepsilon = \tfrac{\alpha+\beta}{2}`, R`$|a_n-\alpha|<\varepsilon$ の左半分`],
              [R`b_n < \beta+\varepsilon = \tfrac{\alpha+\beta}{2}`, R`$|b_n-\beta|<\varepsilon$ の右半分`],
            ] },
          { text: R`したがって $b_n<a_n$ となり、仮定 $a_n\le b_n$ に矛盾する。よって $\alpha\le\beta$。` },
        ],
      },
      { t: 'rem', title: '「<」は極限で「≤」に変わる', text: R`すべての $n$ で $a_n<b_n$ でも、$\alpha<\beta$ とは限らない。たとえば $a_n=0$、$b_n=\frac1n$ は $a_n<b_n$ だが、極限はどちらも $0$ である。極限をとると、厳密な不等号は等号つきに弱まりうる。` },
      { t: 'cor', id: 'cor-squeeze', title: 'はさみうちの原理', yomi: 'はさみうちのげんり', imp: 2, text: R`すべての $n$ で $a_n\le c_n\le b_n$ であり、$a_n\to\alpha$、$b_n\to\alpha$ ならば、$c_n\to\alpha$ である。` },
      {
        t: 'proof',
        sketch: R`十分先では $a_n$ も $b_n$ も $\alpha$ の $\varepsilon$ 帯の中にいる。その間に挟まれた $c_n$ も帯の中にいるしかない。`,
        steps: [
          { text: R`$\varepsilon>0$ に対し、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ かつ $|b_n-\alpha|<\varepsilon$ となる $N$ をとる。` },
          { text: R`$n\ge N$ ならば`, eqs: [[R`\alpha-\varepsilon < a_n \le c_n \le b_n < \alpha+\varepsilon`, R`$N$ の取り方と仮定`]] },
          { text: R`すなわち $|c_n-\alpha|<\varepsilon$。よって $c_n\to\alpha$。` },
        ],
      },

      { t: 'ex', id: 'ex-inv', title: '1/n → 0', text: R`$\displaystyle\lim_{n\to\infty}\frac1n=0$ を定義に従って示す。$\varepsilon>0$ を任意にとる。[[supremum#thm-arch|アルキメデスの原理]]より $N>\dfrac1\varepsilon$ となる $N\in\mathbb{N}$ がとれる。すると $n\ge N$ のとき
$$\left|\frac1n-0\right|=\frac1n\le\frac1N<\varepsilon.$$
よって $\dfrac1n\to0$ である。` },
      { t: 'note', title: '「N の見つけ方」は逆算する', text: R`証明では $N$ が天下り的に出てくるが、実際には<em>ゴールから逆算</em>して見つける。$\frac1n<\varepsilon$ にしたい $\Rightarrow$ $n>\frac1\varepsilon$ ならよい $\Rightarrow$ だから $N>\frac1\varepsilon$ にとる、という順に考え、清書では逆向きに書く。` },

      { t: 'h2', id: 'graph', text: 'グラフで確かめる' },
      { t: 'p', text: R`下の図では数列の式を自由に書き換えられる。プリセットを選ぶか、$n$ を使った式（例：<code>sin(n)/n</code>、<code>(1+1/n)^n</code>）を入力し、$\alpha$ と $\varepsilon$ を動かしてみよう。$N$ が見つからない場合は、その $\alpha$ には収束していないか、確認した範囲の外で初めて帯に入り続ける。` },
      { t: 'fig', type: 'seq', preset: 'e', editable: true, caption: R`式・極限の候補 $\alpha$・誤差 $\varepsilon$ を変えて、$N$ の変化を観察する。$(1+1/n)^n\to e$ はゆっくり収束するため、$\varepsilon$ を小さくすると $N$ が急に大きくなる。` },

      { t: 'h2', id: 'counter', text: '反例と注意' },
      { t: 'ex', id: 'ex-osc', title: '(−1)ⁿ は発散する', text: R`$a_n=(-1)^n$ はどの実数 $\alpha$ にも収束しない。実際、$\alpha$ に収束すると仮定して $\varepsilon=1$ ととると、十分大きいすべての $n$ で $|a_n-\alpha|<1$ である。$n$ が偶数のとき $|1-\alpha|<1$、奇数のとき $|-1-\alpha|<1$ なので、
$$2=|1-(-1)|\le|1-\alpha|+|\alpha-(-1)|<1+1=2$$
となり矛盾する。` },
      { t: 'fig', type: 'seq', preset: 'osc', caption: R`$a_n=(-1)^n,\ \alpha=1$。$\varepsilon\le 2$ ではどこまで行っても帯の外の点（奇数番目）が現れるので、$N$ は見つからない。` },

      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-1', level: 1, title: '基本', text: R`$\varepsilon$-$N$ 論法を用いて、$\displaystyle\lim_{n\to\infty}\frac{1}{n^2}=0$ を示せ。`, hint: R`$\dfrac1{n^2}\le\dfrac1n$ を使うと、[[sequence-convergence#ex-inv|例]] と同じ $N$ でよい。`, answer: R`$\varepsilon>0$ を任意にとる。アルキメデスの原理より $N>\frac1\varepsilon$ となる $N\in\mathbb{N}$ がとれる。$n\ge N$ のとき $n^2\ge n$ なので、$\left|\frac1{n^2}-0\right|=\frac1{n^2}\le\frac1n\le\frac1N<\varepsilon$。よって $\frac1{n^2}\to0$。`, space: 6 },
      { t: 'problem', id: 'prob-2', level: 2, title: '標準', text: R`$a_n\to\alpha$ ならば $|a_n|\to|\alpha|$ であることを示せ。また、逆が成り立たない例を挙げよ。`, hint: R`逆向きの三角不等式 $\bigl||x|-|y|\bigr|\le|x-y|$（[[abs-triangle#cor-rev|Cor.]]）を使う。`, answer: R`$\varepsilon>0$ に対し、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ となる $N$ をとる。逆向きの三角不等式より $\bigl||a_n|-|\alpha|\bigr|\le|a_n-\alpha|<\varepsilon$。よって $|a_n|\to|\alpha|$。逆の反例：$a_n=(-1)^n$ は $|a_n|=1\to1$ だが、$\{a_n\}$ 自身は収束しない。`, space: 8 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'logic-quantifiers',
    title: '論理記号 ∀・∃',
    sub: '全称記号と存在記号',
    yomi: 'ろんりきごう',
    aliases: ['ぜんしょうきごう', 'そんざいきごう', '全称記号', '存在記号', 'すべての', 'ある', '否定'],
    kind: '用語',
    field: '論理と集合',
    grade: '1年前期',
    importance: 3,
    prereq: [],
    related: ['sequence-convergence'],
    synopsis: R`「すべての」を $\forall$、「ある（存在する）」を $\exists$ と書く。解析学の定義はこの二つの組み合わせでできており、<em>並ぶ順番</em>と<em>否定のとり方</em>が理解の鍵になる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-forall', title: '全称記号・存在記号', yomi: 'ぜんしょうきごう', imp: 3, text: R`$P(x)$ を $x$ についての条件とする。
<ul><li>$\forall x,\ P(x)$：すべての $x$ について $P(x)$ が成り立つ。</li><li>$\exists x\ \text{s.t.}\ P(x)$：$P(x)$ が成り立つような $x$ が（少なくとも一つ）存在する。</li></ul>` },
      { t: 'h2', id: 'neg', text: '否定のとり方' },
      { t: 'prop', id: 'prop-neg', title: '否定の規則', yomi: 'ひていのきそく', imp: 2, text: R`$$\neg(\forall x,\ P(x)) \iff \exists x,\ \neg P(x),\qquad \neg(\exists x,\ P(x)) \iff \forall x,\ \neg P(x).$$` },
      { t: 'ex', id: 'ex-negconv', title: '収束しないことの言い換え', text: R`[[sequence-convergence#def-conv|収束の定義]]を否定すると、「$a_n$ は $\alpha$ に収束しない」は
$$\exists\varepsilon>0,\ \forall N\in\mathbb{N},\ \exists n\ge N\ \text{ s.t. }\ |a_n-\alpha|\ge\varepsilon$$
となる。$\forall$ と $\exists$ を入れ替え、最後の不等式を否定する。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'abs-triangle',
    title: '絶対値と三角不等式',
    sub: '',
    yomi: 'ぜったいちとさんかくふとうしき',
    aliases: ['さんかくふとうしき', '三角不等式', 'ぜったいち', '絶対値', 'ぎゃくさんかくふとうしき'],
    kind: '用語',
    field: '実数',
    grade: '1年前期',
    importance: 3,
    prereq: [],
    related: ['sequence-convergence'],
    synopsis: R`$|x-y|$ は数直線上の 2 点の距離である。三角不等式 $|x+y|\le|x|+|y|$ は「寄り道すると遠回りになる」ことを表し、極限の議論のほぼすべてで使われる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-abs', title: '絶対値', yomi: 'ぜったいち', imp: 2, text: R`実数 $x$ に対し、$|x|=\begin{cases}x & (x\ge0)\\ -x & (x<0)\end{cases}$ と定める。` },
      { t: 'h2', id: 'tri', text: '三角不等式' },
      { t: 'prop', id: 'prop-tri', title: '三角不等式', yomi: 'さんかくふとうしき', imp: 3, text: R`任意の実数 $x,y$ について $|x+y|\le|x|+|y|$。` },
      { t: 'strategy', text: R`$-|x|\le x\le|x|$ を $x$ と $y$ について足し合わせる。` },
      {
        t: 'proof',
        sketch: R`$\pm$ 両側から挟んで足すだけである。`,
        steps: [
          { text: R`絶対値の定義より $-|x|\le x\le |x|$、$-|y|\le y\le|y|$。辺々足して $-(|x|+|y|)\le x+y\le |x|+|y|$。` },
          { text: R`$-c\le t\le c\ (c\ge0)$ は $|t|\le c$ と同値なので、$|x+y|\le|x|+|y|$。`, why: R`$t\ge0$ なら $|t|=t\le c$。$t<0$ なら $|t|=-t\le c$（$-c\le t$ の両辺に $-1$ を掛けた）。` },
        ],
      },
      { t: 'cor', id: 'cor-rev', title: '逆向きの三角不等式', yomi: 'ぎゃくさんかくふとうしき', imp: 2, text: R`任意の実数 $x,y$ について $\bigl||x|-|y|\bigr|\le|x-y|$。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'supremum',
    title: '上限・下限',
    sub: '実数の連続性',
    yomi: 'じょうげん・かげん',
    aliases: ['じょうげん', 'かげん', 'sup', 'inf', 'じょうげんこうり', '上限公理', 'じつすうのれんぞくせい', '実数の連続性', 'あるきめですのげんり', 'アルキメデスの原理'],
    kind: '用語',
    field: '実数',
    grade: '1年前期',
    importance: 3,
    prereq: ['logic-quantifiers'],
    related: ['monotone-convergence', 'sequence-convergence'],
    synopsis: R`上に有界な集合の「最小の上界」を上限 $\sup$ という。<em>上に有界な空でない集合には必ず上限がある</em>——これを実数の公理として認めることが、解析学全体の出発点になる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-sup', title: '上界・上限', yomi: 'じょうげん', imp: 3, text: R`$A\subset\mathbb{R}$ とする。すべての $a\in A$ について $a\le M$ となる $M$ を $A$ の<b class="term">上界</b>という。上界が存在するとき $A$ は上に有界であるという。上界のうち最小のものを $A$ の<b class="term">上限</b>といい、$\sup A$ と書く。` },
      { t: 'ax', id: 'ax-sup', title: '上限公理（実数の連続性）', yomi: 'じょうげんこうり', imp: 3, text: R`上に有界な空でない部分集合 $A\subset\mathbb{R}$ は、必ず上限 $\sup A\in\mathbb{R}$ をもつ。` },
      { t: 'prop', id: 'prop-sup-eps', title: '上限の ε による特徴づけ', yomi: 'じょうげんのいぷしろんによるとくちょうづけ', imp: 3, text: R`$s=\sup A$ であることは、次の 2 条件と同値である。
<ol><li>すべての $a\in A$ について $a\le s$。</li><li>任意の $\varepsilon>0$ に対し、$s-\varepsilon<a$ となる $a\in A$ が存在する。</li></ol>` },
      { t: 'h2', id: 'arch', text: 'アルキメデスの原理' },
      { t: 'thm', id: 'thm-arch', title: 'アルキメデスの原理', yomi: 'あるきめですのげんり', imp: 2, text: R`任意の実数 $x$ に対し、$N>x$ となる自然数 $N$ が存在する。` },
      { t: 'strategy', text: R`背理法。$\mathbb{N}$ が上に有界だと仮定して上限 $s$ をとり、$s-1$ がもはや上界でないことから矛盾を導く。` },
      {
        t: 'proof',
        sketch: R`自然数全体に上限 $s$ があるなら、$s-1$ より大きい自然数 $m$ がある。すると $m+1>s$ となり、$s$ が上界であることに反する。`,
        steps: [
          { text: R`結論を否定し、ある $x$ について、すべての $N\in\mathbb{N}$ で $N\le x$ と仮定する。すると $\mathbb{N}$ は上に有界で空でないので、上限公理より $s=\sup\mathbb{N}$ が存在する。` },
          { text: R`上限の特徴づけで $\varepsilon=1$ とすると、$s-1<m$ となる $m\in\mathbb{N}$ がある。このとき $m+1>s$ かつ $m+1\in\mathbb{N}$ なので、$s$ が $\mathbb{N}$ の上界であることに矛盾する。` },
        ],
      },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'monotone-convergence',
    title: '単調収束定理',
    sub: '',
    yomi: 'たんちょうしゅうそくていり',
    aliases: ['たんちょうしゅうそく', '有界単調数列', 'ゆうかいたんちょうすうれつ'],
    kind: '定理',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'supremum'],
    related: ['cauchy-sequence', 'supremum'],
    synopsis: R`上に有界な単調増加数列は必ず収束し、その極限は値の集合の上限に等しい。極限の値がわからなくても「収束すること」だけは保証できる、強力な定理である。`,
    body: [
      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-mct', title: '単調収束定理', yomi: 'たんちょうしゅうそくていり', imp: 3, text: R`$\{a_n\}$ が単調増加（$a_1\le a_2\le\cdots$）かつ上に有界ならば、$\{a_n\}$ は収束し、$\displaystyle\lim_{n\to\infty}a_n=\sup_{n}a_n$ である。` },
      { t: 'strategy', text: R`候補 $s=\sup\{a_n\}$ を[[supremum#ax-sup|上限公理]]で用意し、[[supremum#prop-sup-eps|上限の ε 特徴づけ]]で $s-\varepsilon<a_N$ となる $N$ を見つける。あとは単調性で $N$ 以降すべてに広げる。` },
      {
        t: 'proof',
        sketch: R`上限 $s$ のすぐ下 $s-\varepsilon$ を超える項 $a_N$ が必ずある。単調増加なので、それ以降の項はすべて $s-\varepsilon$ と $s$ の間に挟まれる。`,
        steps: [
          { text: R`集合 $\{a_n\mid n\in\mathbb{N}\}$ は空でなく上に有界なので、上限公理より $s=\sup_n a_n$ が存在する。` },
          { text: R`$\varepsilon>0$ を任意にとる。上限の特徴づけより、$s-\varepsilon<a_N$ となる $N$ が存在する。` },
          {
            text: R`$n\ge N$ とすると、`,
            eqs: [
              [R`s-\varepsilon < a_N \le a_n \le s`, R`単調増加・$s$ は上界`],
              [R`\therefore\ |a_n-s| < \varepsilon.`, R`$s-\varepsilon<a_n\le s$ を書き直す`],
            ],
          },
          { text: R`したがって $a_n\to s$ である。` },
        ],
      },
      { t: 'crux', text: R`極限の<em>値</em>を知らなくても、上限公理が「行き先」$s$ を用意してくれる。収束の証明に必要なのは、行き先の存在と、そこへ近づく仕組み（単調性）の二つだけである。` },
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
    synopsis: R`有界な数列は、それ自身が収束しなくても、<em>収束する部分列</em>を必ずもつ。最大値の定理やコーシー列の収束など、「何かが存在すること」を示す場面で繰り返し使われる。`,
    body: [
      { t: 'h2', id: 'subseq', text: '部分列' },
      { t: 'def', id: 'def-subseq', title: '部分列', yomi: 'ぶぶんれつ', imp: 2, text: R`自然数の狭義単調増加列 $n_1<n_2<n_3<\cdots$ をとり、数列 $\{a_n\}$ から $a_{n_1},a_{n_2},a_{n_3},\dots$ を順に抜き出した数列 $\{a_{n_k}\}_{k\in\mathbb{N}}$ を、$\{a_n\}$ の<b class="term">部分列</b>という。` },
      { t: 'note', title: '添字が二段になるのに慣れる', text: R`部分列の $k$ 番目の項は $a_{n_k}$ である。$k$ は「部分列の中で何番目か」、$n_k$ は「元の数列で何番目か」を表す。たとえば偶数番目だけを抜き出すと $n_k=2k$ で、部分列は $a_2,a_4,a_6,\dots$ となる。` },
      { t: 'prop', id: 'prop-subseq-conv', title: '収束列の部分列', yomi: 'しゅうそくれつのぶぶんれつ', imp: 2, text: R`$a_n\to\alpha$ ならば、$\{a_n\}$ の任意の部分列も $\alpha$ に収束する。` },
      {
        t: 'proof',
        sketch: R`$n_k\ge k$ なので、部分列は元の数列より「先へ進むのが速い」。元の数列が $N$ 番目から帯に入るなら、部分列も $k\ge N$ で帯に入る。`,
        steps: [
          { text: R`まず、すべての $k$ について $n_k\ge k$ である。`, why: R`帰納法。$n_1\ge1$ は自然数だから成り立つ。$n_k\ge k$ と仮定すると、$n_{k+1}>n_k\ge k$ で、$n_{k+1}$ は整数なので $n_{k+1}\ge k+1$。` },
          { text: R`$\varepsilon>0$ に対し、$n\ge N$ で $|a_n-\alpha|<\varepsilon$ となる $N$ をとる。$k\ge N$ ならば $n_k\ge k\ge N$ なので $|a_{n_k}-\alpha|<\varepsilon$。よって $a_{n_k}\to\alpha$。` },
        ],
      },
      { t: 'rem', title: '使い方は「対偶」が多い', text: R`この命題は「収束しないこと」を示すのに便利である。異なる値に収束する部分列が二つ見つかれば、元の数列は収束しない。たとえば $(-1)^n$ の偶数番目は $1$、奇数番目は $-1$ に収束するので、$(-1)^n$ は発散する。` },

      { t: 'h2', id: 'stmt', text: '主張' },
      { t: 'thm', id: 'thm-bw', title: 'ボルツァーノ＝ワイエルシュトラスの定理', yomi: 'ぼるつぁーの・わいえるしゅとらすのていり', imp: 3, text: R`有界な実数列は、収束する部分列をもつ。` },
      { t: 'strategy', text: R`二段構えで示す。① どんな数列にも単調な部分列がある（[[bolzano-weierstrass#lem-mono|補題]]）。② 有界で単調なら収束する（[[monotone-convergence]]）。①が本題で、「山」という見方を使う。` },

      { t: 'h2', id: 'mono', text: '単調な部分列の存在' },
      { t: 'lem', id: 'lem-mono', title: '単調部分列の補題', yomi: 'たんちょうぶぶんれつのほだい', imp: 2, text: R`任意の実数列は、単調な（単調増加または単調減少の）部分列をもつ。` },
      { t: 'p', text: R`番号 $n$ が<b class="term">山</b>であるとは、$a_n$ がそれより後ろのどの項以上でもあること、すなわち「すべての $m>n$ について $a_n\ge a_m$」が成り立つことをいう。山の項からは、後ろを見渡しても自分より高い項がない。` },
      { t: 'fig', type: 'subseq', preset: 'alt', editable: true, caption: R`▲ が山の項、赤い点と線が取り出した単調部分列。山が無限個あれば山の項を並べるだけで単調減少になる。山が有限個なら、最後の山より後ろから「次の、自分以上の項」をたどって単調増加な部分列を作る。` },
      { t: 'strategy', text: R`山が無限個あるか、有限個しかないかで場合を分ける。` },
      {
        t: 'proof',
        sketch: R`山が無限個なら、山の番号を小さい順に並べた部分列は単調減少。山が有限個なら、最後の山より後ろの番号はどれも山でないので、「自分以上の項が後ろに必ずある」。これをたどれば単調増加な部分列ができる。`,
        steps: [
          { text: R`<b>山が無限個ある場合。</b>山の番号を小さい順に $n_1<n_2<\cdots$ とする。$n_k$ は山で $n_{k+1}>n_k$ なので、$a_{n_k}\ge a_{n_{k+1}}$。よって $\{a_{n_k}\}$ は単調減少な部分列である。` },
          { text: R`<b>山が有限個しかない場合。</b>最後の山の番号より大きい番号 $n_1$ をとる（山が一つもなければ $n_1=1$）。$n_1$ 以降の番号はどれも山ではない。` },
          { text: R`$n_1$ は山でないので、$a_{n_2}>a_{n_1}$ となる $n_2>n_1$ が存在する。$n_2$ も山でないので、$a_{n_3}>a_{n_2}$ となる $n_3>n_2$ が存在する。これを繰り返して、$a_{n_1}<a_{n_2}<a_{n_3}<\cdots$ となる部分列が得られる。`, why: R`「$n$ が山でない」は、山の定義「すべての $m>n$ で $a_n\ge a_m$」の否定なので、「ある $m>n$ で $a_n<a_m$」となる（[[logic-quantifiers#prop-neg|否定の規則]]）。つまり後ろに必ず自分より大きい項がある。` },
        ],
      },
      { t: 'h2', id: 'proof', text: '定理の証明' },
      {
        t: 'proof',
        sketch: R`補題で単調な部分列をとる。元の数列が有界なので、部分列も有界。有界な単調列は収束する。`,
        steps: [
          { text: R`$\{a_n\}$ を有界な数列とし、すべての $n$ で $|a_n|\le M$ とする。補題より単調な部分列 $\{a_{n_k}\}$ がとれる。` },
          { text: R`部分列の項も元の数列の項なので $|a_{n_k}|\le M$、すなわち部分列も有界である。` },
          { text: R`単調増加なら[[monotone-convergence|単調収束定理]]により収束する。単調減少なら、$\{-a_{n_k}\}$ が上に有界な単調増加列なので収束し、$\{a_{n_k}\}$ も収束する。`, why: R`$b_k=-a_{n_k}$ とおくと、$a_{n_k}\ge a_{n_{k+1}}$ は $b_k\le b_{k+1}$ と同じこと。$b_k\to\beta$ なら、[[sequence-convergence#prop-arith|四則演算]]（定数 $-1$ を掛ける）より $a_{n_k}=-b_k\to-\beta$。` },
        ],
      },
      { t: 'crux', text: R`どんな数列にも単調な部分列が<em>隠れている</em>。そして「有界＋単調＝収束」。この二つを組み合わせるだけで、極限の値を一切知らないまま、収束する部分列の存在が保証される。` },
      { t: 'h2', id: 'ex', text: '例と注意' },
      { t: 'ex', id: 'ex-bw-alt', title: '(−1)ⁿ(1 + 1/n)', text: R`$a_n=(-1)^n\left(1+\frac1n\right)$ は $|a_n|\le2$ で有界だが収束しない。偶数番目 $a_{2k}=1+\frac1{2k}\to1$、奇数番目 $a_{2k-1}=-1-\frac1{2k-1}\to-1$ が収束する部分列である。` },
      { t: 'rem', title: '「有界」は外せない', text: R`$a_n=n$ はどんな部分列も $a_{n_k}=n_k\ge k\to\infty$ となり、収束する部分列をもたない。定理の仮定「有界」が本質的であることがわかる。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-bw-1', level: 1, title: '基本', text: R`$a_n=(-1)^n+\dfrac1n$ について、収束する部分列を二つ挙げ、それぞれの極限を求めよ。また、$\{a_n\}$ が収束しない理由を述べよ。`, hint: R`偶数番目と奇数番目に分ける。`, answer: R`$a_{2k}=1+\frac1{2k}\to1$、$a_{2k-1}=-1+\frac1{2k-1}\to-1$。もし $a_n\to\alpha$ なら、[[bolzano-weierstrass#prop-subseq-conv|部分列も同じ極限に収束する]]ので $\alpha=1$ かつ $\alpha=-1$ となり矛盾する。よって収束しない。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'cauchy-sequence',
    title: 'コーシー列',
    sub: '',
    yomi: 'こーしーれつ',
    aliases: ['こーしー', 'Cauchy列', '基本列', 'きほんれつ'],
    kind: '用語',
    field: '数列と極限',
    grade: '1年前期',
    importance: 3,
    prereq: ['sequence-convergence', 'bolzano-weierstrass'],
    related: ['monotone-convergence', 'bolzano-weierstrass'],
    synopsis: R`項どうしが互いにいくらでも近づく数列をコーシー列という。極限の値を使わずに「収束しそうか」を判定できる。実数ではコーシー列は必ず収束する（実数の完備性）。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-cauchy', title: 'コーシー列', yomi: 'こーしーれつ', imp: 3, text: R`数列 $\{a_n\}$ が<b class="term">コーシー列</b>であるとは、次が成り立つことをいう。
$$\forall\varepsilon>0,\ \exists N\in\mathbb{N}\ \text{ s.t. }\ \forall m,n\ge N,\quad |a_m-a_n|<\varepsilon. \tag{#}$$` },
      { t: 'thm', id: 'thm-conv-cauchy', title: '収束列はコーシー列', yomi: 'しゅうそくれつはこーしーれつ', imp: 2, text: R`収束する数列はコーシー列である。` },
      {
        t: 'proof',
        sketch: R`$a_m$ と $a_n$ がともに極限 $\alpha$ の $\varepsilon/2$ 以内にあれば、互いの距離は $\varepsilon$ 未満である。`,
        steps: [
          { text: R`$a_n\to\alpha$ とし、$\varepsilon>0$ を任意にとる。$n\ge N$ で $|a_n-\alpha|<\varepsilon/2$ となる $N$ をとる。` },
          {
            text: R`$m,n\ge N$ ならば`,
            eqs: [[R`|a_m-a_n|\le|a_m-\alpha|+|\alpha-a_n|<\tfrac{\varepsilon}{2}+\tfrac{\varepsilon}{2}=\varepsilon.`, R`三角不等式`]],
          },
        ],
      },
      { t: 'thm', id: 'thm-cauchy-conv', title: 'コーシー列は収束する（実数の完備性）', yomi: 'じつすうのかんびせい', imp: 3, text: R`実数のコーシー列は収束する。` },
      { t: 'strategy', text: R`極限の候補を[[bolzano-weierstrass|ボルツァーノ＝ワイエルシュトラスの定理]]で作る。コーシー列は有界なので収束部分列 $a_{n_k}\to\alpha$ がある。あとは「項どうしが近い」性質で、数列全体を $\alpha$ に引き寄せる。` },
      {
        t: 'proof',
        sketch: R`有界 → 収束部分列がある → 部分列の極限 $\alpha$ の近くに部分列の項があり、十分先の項はその部分列の項に近いので、$\alpha$ にも近い（$\varepsilon/2+\varepsilon/2$）。`,
        steps: [
          { text: R`<b>有界であること。</b>定義で $\varepsilon=1$ とすると、$m,n\ge N$ で $|a_m-a_n|<1$。特に $n\ge N$ で $|a_n|\le|a_n-a_N|+|a_N|<1+|a_N|$。$M=\max\{|a_1|,\dots,|a_{N-1}|,\ 1+|a_N|\}$ とおけば、すべての $n$ で $|a_n|\le M$。`, why: R`[[sequence-convergence#prop-bdd|収束列の有界性]]と同じ論法である。「十分先」は $a_N$ の近くに閉じ込め、「最初の有限個」は最大値で抑える。` },
          { text: R`ボルツァーノ＝ワイエルシュトラスの定理より、収束する部分列 $a_{n_k}\to\alpha$ がとれる。` },
          { text: R`$\varepsilon>0$ を任意にとる。コーシー列であることから、$m,n\ge N$ で $|a_m-a_n|<\varepsilon/2$ となる $N$ をとる。また $a_{n_k}\to\alpha$ より、$|a_{n_k}-\alpha|<\varepsilon/2$ かつ $n_k\ge N$ となる $k$ を一つとる。`, why: R`$a_{n_k}\to\alpha$ なので、十分大きいすべての $k$ で $|a_{n_k}-\alpha|<\varepsilon/2$。さらに $n_k\ge k$ なので、$k\ge N$ にとれば $n_k\ge N$ もみたす。両方をみたす $k$ が一つあれば十分である。` },
          { text: R`$n\ge N$ ならば`,
            eqs: [
              [R`|a_n-\alpha| \le |a_n-a_{n_k}|+|a_{n_k}-\alpha|`, R`三角不等式`],
              [R`\phantom{|a_n-\alpha|} < \tfrac{\varepsilon}{2}+\tfrac{\varepsilon}{2}=\varepsilon.`, R`$n,\,n_k\ge N$ と $k$ の取り方`],
            ] },
          { text: R`よって $a_n\to\alpha$ である。` },
        ],
      },
      { t: 'crux', text: R`コーシー列の定義には極限の値が出てこない。それでも収束が言えるのは、実数に「穴がない」（上限公理）からである。実際、有理数だけの世界では $\sqrt2$ に近づく有理数列はコーシー列なのに、有理数の中に極限がない。` },
    ],
  });
})();
