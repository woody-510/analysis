/* 第 0 章：数学の言葉（大学 1 年生がまず知っておくべき記法と約束） */
(function () {
  const R = String.raw;
  const A = (window.ARTICLES = window.ARTICLES || []);

  /* ---- 図の部品（インライン SVG） ---- */
  const venn = (mode, label) => {
    const fills = {
      cup: '<circle cx="150" cy="95" r="62" fill="rgba(168,38,27,.22)"/><circle cx="230" cy="95" r="62" fill="rgba(168,38,27,.22)"/>',
      cap: '<clipPath id="vc1"><circle cx="150" cy="95" r="62"/></clipPath><circle cx="230" cy="95" r="62" fill="rgba(168,38,27,.35)" clip-path="url(#vc1)"/>',
      minus: '<mask id="vm1"><rect width="380" height="190" fill="#fff"/><circle cx="230" cy="95" r="62" fill="#000"/></mask><circle cx="150" cy="95" r="62" fill="rgba(168,38,27,.3)" mask="url(#vm1)"/>',
      comp: '<mask id="vm2"><rect width="380" height="190" fill="#fff"/><circle cx="150" cy="95" r="62" fill="#000"/></mask><rect x="40" y="16" width="300" height="158" fill="rgba(168,38,27,.18)" mask="url(#vm2)"/>',
    };
    return `<svg viewBox="0 0 380 190" role="img" aria-label="${label}"><rect x="40" y="16" width="300" height="158" fill="none" stroke="#6d665a"/>${fills[mode]}<circle cx="150" cy="95" r="62" fill="none" stroke="#222" stroke-width="1.5"/>${mode === 'comp' ? '' : '<circle cx="230" cy="95" r="62" fill="none" stroke="#222" stroke-width="1.5"/>'}<text x="112" y="62">A</text>${mode === 'comp' ? '' : '<text x="262" y="62">B</text>'}<text x="48" y="34">X</text><text x="190" y="184" text-anchor="middle">${label}</text></svg>`;
  };
  const mapDiagram = (pairs, nL, nR, label) => {
    const yL = (i) => 40 + i * 34, yR = (j) => 40 + j * 34;
    let s = `<svg viewBox="0 0 300 ${Math.max(nL, nR) * 34 + 50}" role="img" aria-label="${label}">`;
    s += `<ellipse cx="70" cy="${40 + (nL - 1) * 17}" rx="38" ry="${nL * 17 + 10}" fill="#f3f1ea" stroke="#6d665a"/><ellipse cx="230" cy="${40 + (nR - 1) * 17}" rx="38" ry="${nR * 17 + 10}" fill="#f3f1ea" stroke="#6d665a"/>`;
    s += '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#a8261b"/></marker></defs>';
    pairs.forEach(([i, j]) => (s += `<line x1="78" y1="${yL(i)}" x2="220" y2="${yR(j)}" stroke="#a8261b" stroke-width="1.4" marker-end="url(#ah)"/>`));
    for (let i = 0; i < nL; i++) s += `<circle cx="70" cy="${yL(i)}" r="4.5" fill="#222"/>`;
    for (let j = 0; j < nR; j++) s += `<circle cx="230" cy="${yR(j)}" r="4.5" fill="#222"/>`;
    s += `<text x="70" y="16" text-anchor="middle">X</text><text x="230" y="16" text-anchor="middle">Y</text><text x="150" y="${Math.max(nL, nR) * 34 + 42}" text-anchor="middle">${label}</text></svg>`;
    return s;
  };
  const numberLine = R`<svg viewBox="0 0 520 110" role="img" aria-label="数直線"><line x1="20" y1="60" x2="500" y2="60" stroke="#222"/><rect x="170" y="48" width="180" height="24" fill="rgba(242,194,48,.35)"/><circle cx="170" cy="60" r="5" fill="#fffdf5" stroke="#222" stroke-width="1.5"/><circle cx="350" cy="60" r="5" fill="#fffdf5" stroke="#222" stroke-width="1.5"/><line x1="260" y1="50" x2="260" y2="70" stroke="#a8261b" stroke-width="2"/><text x="260" y="92" text-anchor="middle" fill="#a8261b">a</text><text x="170" y="92" text-anchor="middle">a−ε</text><text x="350" y="92" text-anchor="middle">a+ε</text><path d="M262,36 L348,36" stroke="#233d6b" marker-end="url(#nl)" fill="none"/><text x="305" y="30" text-anchor="middle" fill="#233d6b">ε</text><defs><marker id="nl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#233d6b"/></marker></defs></svg>`;

  /* ------------------------------------------------------------ */
  A.push({
    id: 'math-language',
    title: '数学の文章の読み方',
    sub: '定義・定理・証明のルール',
    yomi: 'すうがくのぶんしょうのよみかた',
    aliases: ['定義', 'ていぎ', '定理', 'ていり', '命題', 'めいだい', '補題', 'ほだい', '系', 'けい', '公理', 'こうり', '明らか', '任意', 'にんい', '存在', '一意', 'いちい', '高々', 'たかだか', '十分大きい'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: [],
    related: ['propositional-logic', 'logic-quantifiers', 'proof-methods', 'notation-symbols'],
    notation: [
      R`$:=$ は「左辺を右辺で定義する」、$:\Longleftrightarrow$ は「左の性質を右の条件で定義する」（[[notation-symbols#def-defsym|定義の記号]]）。`,
      R`□ または ∎ は証明の終わり。`,
    ],
    synopsis: R`大学の数学書は「定義 → 定理 → 証明」の繰り返しでできている。定義は言葉の意味の約束、定理は証明された主張、証明は定義と既知の定理だけから結論を導く議論である。この約束と、「任意の」「ある」「一意」「高々」などの言葉の正確な意味を最初に押さえる。`,
    body: [
      { t: 'h2', id: 'blocks', text: '数学の文章を作る部品' },
      { t: 'table', html: R`<table class="tbl"><tr><th>名前</th><th>役割</th><th>例</th></tr>
<tr><td>定義（Definition）</td><td>言葉や記号の意味を<b>約束する</b>。証明はしない。</td><td>[[sequence-convergence#def-conv|数列の収束]]</td></tr>
<tr><td>公理（Axiom）</td><td>証明せずに正しいと<b>認める</b>出発点。</td><td>[[supremum#ax-sup|上限公理]]</td></tr>
<tr><td>定理（Theorem）</td><td>証明された主張のうち、特に重要なもの。</td><td>[[intermediate-value#thm-ivt|中間値の定理]]</td></tr>
<tr><td>命題（Proposition）</td><td>証明された主張。定理ほど中心的でないもの。</td><td>[[sequence-convergence#prop-bdd|収束列は有界]]</td></tr>
<tr><td>補題（Lemma）</td><td>定理を証明するための道具として示す主張。</td><td>[[rolle#lem-fermat|フェルマーの補題]]</td></tr>
<tr><td>系（Corollary）</td><td>定理からすぐに導かれる主張。</td><td>[[mean-value#cor-const|導関数が 0 なら定数]]</td></tr>
<tr><td>例・注意</td><td>理解を助ける具体例・見落としやすい点。</td><td>—</td></tr></table>` },
      { t: 'note', title: 'このサイトの色分け', text: R`根本的なものほど強い色にしている。定義＝朱赤、公理＝墨、定理＝紺、命題＝深緑、系＝紫、補題＝灰、例＝青緑、注意＝琥珀。枠の右側に透かしで「定義」「定理」などと書いてある。` },
      { t: 'h2', id: 'definition', text: '定義の読み方' },
      { t: 'rem', title: '定義の「とは…をいう」は「ならば」ではなく「同値」', text: R`「$\{a_n\}$ が収束するとは、〜が成り立つことをいう」という定義は、形の上では「〜ならば収束」のように見えるが、実際には<em>同値</em>（収束 $\iff$ 〜）の意味で使われる。定義は言葉に意味を与える約束なので、逆向きも当然成り立つ。このサイトでは誤解がないように $:\Longleftrightarrow$ と書く。` },
      { t: 'qa', q: R`定義を覚えるとき、何に注意すればよい？`, a: R`① 何についての定義か（「実数列 $\{a_n\}$ と $\alpha\in\mathbb{R}$ について」のような前提）、② 量化子の順番（$\forall\varepsilon\,\exists N\,\forall n$）、③ 不等号が $<$ か $\le$ か、の三つである。前提を落とすと、定義が意味をもたなくなることがある（たとえば[[function-limit#rem-onesided|区間の端での片側極限]]）。` },
      { t: 'h2', id: 'words', text: '数学でよく使う言葉' },
      { t: 'table', html: R`<table class="tbl"><tr><th>言葉</th><th>意味</th><th>記号</th></tr>
<tr><td>任意の $x$ について</td><td>すべての $x$ について（どの $x$ をとっても）</td><td>$\forall x$</td></tr>
<tr><td>ある $x$ が存在して</td><td>少なくとも一つの $x$ について</td><td>$\exists x$</td></tr>
<tr><td>一意に存在する</td><td>ちょうど一つ存在する</td><td>$\exists!\,x$</td></tr>
<tr><td>高々 $n$ 個</td><td>$n$ 個以下（$0$ 個もありうる）</td><td>—</td></tr>
<tr><td>少なくとも $n$ 個</td><td>$n$ 個以上</td><td>—</td></tr>
<tr><td>十分大きい $n$ で〜</td><td>ある $N\in\mathbb{N}$ があって、$n\ge N$ のすべての $n$ で〜</td><td>—</td></tr>
<tr><td>十分小さい $\delta>0$ で〜</td><td>ある $\delta_0>0$ があって、$0<\delta<\delta_0$ のすべての $\delta$ で〜</td><td>—</td></tr>
<tr><td>一般性を失わずに</td><td>他の場合も同じ議論で済むので、一つの場合だけ示す</td><td>w.l.o.g.</td></tr>
<tr><td>A と B は同値</td><td>A ならば B、かつ B ならば A</td><td>$A\iff B$</td></tr>
<tr><td>A は B の必要十分条件</td><td>A と B は同値</td><td>$A\iff B$</td></tr></table>` },
      { t: 'qa', q: R`「明らか」「同様に」と書いてあるときは、どう読めばよい？`, a: R`「著者には明らか」という意味であり、読者は自分で埋める必要がある。「同様に」は、どこをどう置き換えれば同じ議論になるかを確かめる。このサイトでは、そうした部分も「なぜ？」ボタンの補足や、場合を分けた手順として省略せずに書く。` },
      { t: 'qa', q: R`「ある $x$ が存在する」と言うとき、$x$ はいくつある？`, a: R`少なくとも一つ、という意味で、二つ以上あってもよい。ちょうど一つであることを言いたいときは「一意に存在する」「ただ一つ存在する」と書き、存在と一意性の両方を証明する（[[proof-methods#sec-unique|存在と一意性の証明]]）。` },
      { t: 'h2', id: 'proof', text: '証明とは' },
      { t: 'p', text: R`証明とは、<em>仮定</em>と<em>定義</em>と<em>すでに証明された定理・公理</em>だけを使って、結論を一歩ずつ導く議論である。図や直感は理解の助けになるが、証明の根拠にはならない。証明の型（直接証明・背理法・対偶・帰納法など）は [[proof-methods]] にまとめた。` },
      { t: 'note', title: '証明を読むときの三つの問い', text: R`<ol><li>この行は、前のどの行（またはどの定理）から出てくるか。</li><li>いま使っている文字は、何の元で、どこで導入されたか（$\varepsilon$ は任意にとったのか、$N$ は何に依存して選んだのか）。</li><li>仮定を全部使ったか。使っていない仮定があれば、証明が間違っているか、仮定が余分である。</li></ol>` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'propositional-logic',
    title: '命題と論理',
    sub: 'かつ・または・否定・ならば',
    yomi: 'めいだいとろんり',
    aliases: ['命題', 'めいだい', 'かつ', 'または', '否定', 'ひてい', 'ならば', '対偶', 'たいぐう', '逆', 'ぎゃく', '裏', 'うら', '必要条件', 'ひつようじょうけん', '十分条件', 'じゅうぶんじょうけん', '同値', 'どうち', '真理値表', 'しんりちひょう', 'ド・モルガン', 'どもるがん', '空虚な真', 'くうきょなしん'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['math-language'],
    related: ['logic-quantifiers', 'proof-methods'],
    notation: [
      R`$P,Q$：命題（正しいか正しくないかがはっきり決まる文）。`,
      R`$P\land Q$（$P$ かつ $Q$）、$P\lor Q$（$P$ または $Q$）、$\neg P$（$P$ でない）、$P\Rightarrow Q$（$P$ ならば $Q$）、$P\iff Q$（同値）。`,
      R`真理値：真（正しい）は T、偽（正しくない）は F と書く。`,
    ],
    synopsis: R`数学の主張は、「かつ」「または」「でない」「ならば」で組み立てられている。それぞれの意味を真理値表で正確に決め、対偶・否定・空虚な真といった、証明で何度も使う規則を確かめる。`,
    body: [
      { t: 'h2', id: 'def', text: '命題と論理記号' },
      { t: 'def', id: 'def-prop', title: '命題', yomi: 'めいだい', imp: 2, text: R`真（正しい）か偽（正しくない）かがはっきり決まる文を<b class="term">命題</b>という。たとえば「$2<3$」は真の命題、「$\sqrt2\in\mathbb{Q}$」は偽の命題である。「$x>0$」は $x$ を決めるまで真偽が決まらないので、命題ではなく<b class="term">条件</b>（$x$ についての条件）という。` },
      { t: 'def', id: 'def-connectives', title: 'かつ・または・否定・ならば', yomi: 'ろんりきごう', imp: 3, text: R`命題 $P,Q$ について、次の真理値表で $P\land Q$、$P\lor Q$、$\neg P$、$P\Rightarrow Q$ の真偽を定める。` },
      { t: 'table', html: R`<table class="tbl"><tr><th>$P$</th><th>$Q$</th><th>$P\land Q$（かつ）</th><th>$P\lor Q$（または）</th><th>$\neg P$（でない）</th><th>$P\Rightarrow Q$（ならば）</th></tr>
<tr><td>T</td><td>T</td><td>T</td><td>T</td><td>F</td><td>T</td></tr>
<tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr>
<tr><td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td></tr>
<tr><td>F</td><td>F</td><td>F</td><td>F</td><td>T</td><td>T</td></tr></table>` },
      { t: 'rem', title: '数学の「または」は両方でもよい', text: R`日常語の「AまたはB」はどちらか一方だけを指すことがあるが、数学の $P\lor Q$ は「少なくとも一方が真」であり、両方が真のときも真である。` },
      { t: 'rem', id: 'rem-vacuous', title: '空虚な真：仮定が偽なら「ならば」は真', text: R`真理値表の下 2 行のとおり、$P$ が偽なら $P\Rightarrow Q$ は $Q$ に関係なく真である。たとえば「$x\in\varnothing$ ならば $x>100$」はどんな $x$ についても真である（$x\in\varnothing$ が偽だから）。これを<b class="term">空虚な真</b>という。区間の端での[[function-limit#rem-onesided|片側極限]]で、点がない側を考えない理由はここにある。` },
      { t: 'qa', q: R`$P$ が偽なのに「$P$ ならば $Q$」が真、というのは変ではないか？`, a: R`「ならば」は「$P$ が成り立つ場合には、必ず $Q$ も成り立つ」という約束である。$P$ が成り立たない場合には、約束は破られていない。たとえば「雨が降ったら傘を持っていく」という約束は、雨が降らなかった日に傘を持っていかなくても破ったことにならない。` },
      { t: 'h2', id: 'equiv', text: '同値と、よく使う同値変形' },
      { t: 'def', id: 'def-iff', title: '同値・必要条件・十分条件', yomi: 'どうち', imp: 2, text: R`$P\iff Q$ $:\Longleftrightarrow$ $(P\Rightarrow Q)\land(Q\Rightarrow P)$。$P\Rightarrow Q$ が真のとき、$P$ は $Q$ であるための<b class="term">十分条件</b>、$Q$ は $P$ であるための<b class="term">必要条件</b>という。` },
      { t: 'prop', id: 'prop-demorgan', title: 'ド・モルガンの法則', yomi: 'どもるがんのほうそく', imp: 3, text: R`命題 $P,Q$ について $\neg(P\land Q)\iff(\neg P)\lor(\neg Q)$、$\neg(P\lor Q)\iff(\neg P)\land(\neg Q)$。` },
      { t: 'proof', steps: [{ text: R`$P,Q$ の真偽の 4 通りすべてで、両辺の真偽が一致することを真理値表で確かめる。たとえば $\neg(P\land Q)$ が偽になるのは $P,Q$ がともに真のときだけで、$(\neg P)\lor(\neg Q)$ が偽になるのも $\neg P,\neg Q$ がともに偽、すなわち $P,Q$ がともに真のときだけである。2 つ目も同様に確かめる。` }] },
      { t: 'prop', id: 'prop-contra', title: '対偶', yomi: 'たいぐう', imp: 3, text: R`$(P\Rightarrow Q)\iff(\neg Q\Rightarrow\neg P)$。右辺を左辺の<b class="term">対偶</b>という。また $\neg(P\Rightarrow Q)\iff P\land(\neg Q)$。` },
      { t: 'proof', steps: [{ text: R`$P\Rightarrow Q$ が偽になるのは「$P$ が真で $Q$ が偽」のときだけである（真理値表 2 行目）。$\neg Q\Rightarrow\neg P$ が偽になるのは「$\neg Q$ が真で $\neg P$ が偽」、すなわち同じく「$Q$ が偽で $P$ が真」のときだけ。よって両者は同値。また、$P\Rightarrow Q$ の否定が真になるのはちょうど「$P$ が真で $Q$ が偽」のときなので、$\neg(P\Rightarrow Q)\iff P\land\neg Q$。` }] },
      { t: 'rem', title: '逆・裏は元の命題と同値ではない', text: R`$P\Rightarrow Q$ に対し、$Q\Rightarrow P$ を<b class="term">逆</b>、$\neg P\Rightarrow\neg Q$ を<b class="term">裏</b>という。逆と裏は元の命題と同値ではない。たとえば「$a_n$ が収束するならば有界」（真）の逆「有界ならば収束」は偽である（$(-1)^n$）。対偶「有界でないならば収束しない」は真である。` },
      { t: 'qa', q: R`「$P\Rightarrow Q$ の否定」は「$P\Rightarrow\neg Q$」ではないのか？`, a: R`違う。$P\Rightarrow Q$ の否定は「$P$ なのに $Q$ でない」、すなわち $P\land\neg Q$ である。「$P\Rightarrow\neg Q$」は「$P$ なら必ず $Q$ でない」というずっと強い主張になってしまう。反例を挙げるとは、「$P$ をみたすのに $Q$ をみたさない例を一つ見つける」ことである。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-pl-1', level: 1, title: '基本', text: R`命題「$x>1$ ならば $x^2>1$」（$x\in\mathbb{R}$ についての主張）の逆・裏・対偶を書き、それぞれの真偽を答えよ。`, answer: R`逆：$x^2>1$ ならば $x>1$（偽。$x=-2$）。裏：$x\le1$ ならば $x^2\le1$（偽。$x=-2$）。対偶：$x^2\le1$ ならば $x\le1$（真。元の命題が真なので）。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'logic-quantifiers',
    title: '論理記号 ∀・∃',
    sub: '全称記号と存在記号',
    yomi: 'ろんりきごう',
    aliases: ['ぜんしょうきごう', 'そんざいきごう', '全称記号', '存在記号', 'すべての', 'ある', '否定', '量化子', 'りょうかし', 's.t.'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['propositional-logic'],
    related: ['sequence-convergence', 'epsilon-delta-howto'],
    notation: [
      R`$\forall x\in X,\ P(x)$：「$X$ のすべての元 $x$ について $P(x)$」。$\forall$ は All の A を逆さにした記号。`,
      R`$\exists x\in X\ \text{s.t.}\ P(x)$：「$P(x)$ をみたす $x\in X$ が存在する」。$\exists$ は Exist の E を裏返した記号。s.t. は such that（〜となるような）。`,
      R`$\exists!\,x$：「ただ一つ存在する」。`,
    ],
    synopsis: R`「すべての」を $\forall$、「ある（存在する）」を $\exists$ と書く。解析学の定義はこの二つの組み合わせでできており、<em>並ぶ順番</em>と<em>否定のとり方</em>が理解の鍵になる。`,
    body: [
      { t: 'h2', id: 'def', text: '定義' },
      { t: 'def', id: 'def-forall', title: '全称記号・存在記号', yomi: 'ぜんしょうきごう', imp: 3, text: R`$X$ を集合、$P(x)$ を $x\in X$ についての条件とする。
<ul><li>$\forall x\in X,\ P(x)$ $:\Longleftrightarrow$ $X$ のすべての元 $x$ について $P(x)$ が真。</li><li>$\exists x\in X\ \text{s.t.}\ P(x)$ $:\Longleftrightarrow$ $P(x)$ が真となる $x\in X$ が少なくとも一つ存在する。</li></ul>` },
      { t: 'note', title: '範囲を必ず書く', text: R`「$\forall x$」だけでは $x$ がどこを動くのかわからない。$\forall x\in\mathbb{R}$、$\exists N\in\mathbb{N}$、$\forall\varepsilon>0$（$\varepsilon$ は正の実数）のように、必ず範囲を添える。$\forall\varepsilon>0$ は $\forall\varepsilon\in\{t\in\mathbb{R}\mid t>0\}$ の略である。` },
      { t: 'h2', id: 'order', text: '順番が意味を変える' },
      { t: 'ex', id: 'ex-order', title: '∀∃ と ∃∀', text: R`<ul><li>$\forall x\in\mathbb{R}\ \exists y\in\mathbb{R}\ \text{s.t.}\ y>x$：どんな実数 $x$ にも、それより大きい実数 $y$ がある（真。$y=x+1$。$y$ は $x$ に応じて選んでよい）。</li><li>$\exists y\in\mathbb{R}\ \text{s.t.}\ \forall x\in\mathbb{R},\ y>x$：すべての実数より大きい実数 $y$ がある（偽。$x=y$ とすると $y>y$ になってしまう）。</li></ul>前者では $y=y(x)$ と $x$ に依存してよいが、後者では $y$ を先に一つ決めなければならない。` },
      { t: 'rem', title: '後ろの文字は前の文字に依存してよい', text: R`$\forall\varepsilon\ \exists N$ の順なら、$N$ は $\varepsilon$ に依存してよい（$N=N(\varepsilon)$）。$\exists N\ \forall\varepsilon$ の順なら、$N$ は $\varepsilon$ によらず一つに決まっていなければならない。依存関係は「左から右へ」だけ流れる。` },
      { t: 'h2', id: 'neg', text: '否定のとり方' },
      { t: 'prop', id: 'prop-neg', title: '否定の規則', yomi: 'ひていのきそく', imp: 3, text: R`$X$ を集合、$P(x)$ を $x\in X$ についての条件とすると
$$\neg\bigl(\forall x\in X,\ P(x)\bigr) \iff \exists x\in X\ \text{s.t.}\ \neg P(x),\qquad \neg\bigl(\exists x\in X\ \text{s.t.}\ P(x)\bigr) \iff \forall x\in X,\ \neg P(x).$$` },
      { t: 'proof', steps: [{ text: R`「すべての $x\in X$ で $P(x)$」が偽であることは、「$P(x)$ が偽となる $x\in X$ が少なくとも一つある」ことと同じである。2 つ目は、1 つ目を $\neg P$ に適用して両辺を否定すればよい（$\neg\neg P\iff P$）。` }] },
      { t: 'note', title: '否定の機械的な手順', text: R`<ol><li>$\forall$ を $\exists$ に、$\exists$ を $\forall$ に入れ替える（範囲 $\in X$ や $>0$ はそのまま）。</li><li>最後の条件を否定する：$<$ は $\ge$ に、$\le$ は $>$ に、「$A\Rightarrow B$」は「$A$ かつ $\neg B$」に（[[propositional-logic#prop-contra|ならばの否定]]）。</li></ol>` },
      { t: 'ex', id: 'ex-negconv', title: '収束しないことの言い換え', text: R`[[sequence-convergence#def-conv|収束の定義]] $\forall\varepsilon>0\ \exists N\in\mathbb{N}\ \forall n\in\mathbb{N}\ (n\ge N\Rightarrow|a_n-\alpha|<\varepsilon)$ を否定すると、「$\{a_n\}$ は $\alpha$ に収束しない」は
$$\exists\varepsilon>0\ \ \forall N\in\mathbb{N}\ \ \exists n\in\mathbb{N}\ \text{ s.t. }\ n\ge N\ \text{かつ}\ |a_n-\alpha|\ge\varepsilon$$
となる。「ある誤差 $\varepsilon$ について、どこまで先に行っても、帯の外にはみ出す項が現れる」と読む。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-lq-1', level: 1, title: '基本', text: R`$f:\mathbb{R}\to\mathbb{R}$、$a\in\mathbb{R}$ とする。「$f$ は $a$ で連続」の定義 $\forall\varepsilon>0\ \exists\delta>0\ \forall x\in\mathbb{R}\ (|x-a|<\delta\Rightarrow|f(x)-f(a)|<\varepsilon)$ を否定せよ。`, answer: R`$\exists\varepsilon>0\ \forall\delta>0\ \exists x\in\mathbb{R}\ \text{ s.t. }\ |x-a|<\delta\ \text{かつ}\ |f(x)-f(a)|\ge\varepsilon$。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'proof-methods',
    title: '証明の方法',
    sub: '直接証明・対偶・背理法・帰納法',
    yomi: 'しょうめいのほうほう',
    aliases: ['証明', 'しょうめい', '背理法', 'はいりほう', '対偶法', 'たいぐうほう', '数学的帰納法', 'きのうほう', '帰納法', '場合分け', 'ばあいわけ', '反例', 'はんれい', '一意性', 'いちいせい', '存在'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['propositional-logic', 'logic-quantifiers'],
    related: ['epsilon-delta-howto', 'math-language'],
    notation: [
      R`$n\in\mathbb{N}=\{1,2,3,\dots\}$。$P(n)$：自然数 $n$ についての条件。`,
      R`□：証明終わり。`,
    ],
    synopsis: R`証明にはいくつかの決まった型がある。直接証明・対偶法・背理法・場合分け・数学的帰納法・存在と一意性の証明・反例による否定。どの型を使うかを最初に宣言すると、読む人にも書く自分にも議論の筋が見えやすくなる。`,
    body: [
      { t: 'h2', id: 'direct', text: '直接証明' },
      { t: 'p', text: R`$P\Rightarrow Q$ を示すとき、$P$ を仮定し、定義と既知の定理を使って $Q$ を導く。最も基本の型である。` },
      { t: 'ex', id: 'ex-direct', title: '偶数の 2 乗は偶数', text: R`整数 $n$ が偶数ならば、$n=2k$（$k\in\mathbb{Z}$）と書けるので $n^2=4k^2=2(2k^2)$。$2k^2\in\mathbb{Z}$ なので $n^2$ は偶数。□` },
      { t: 'h2', id: 'contra', text: '対偶法' },
      { t: 'p', text: R`$P\Rightarrow Q$ の代わりに、[[propositional-logic#prop-contra|同値な対偶]] $\neg Q\Rightarrow\neg P$ を示す。「$Q$ でない」の方が扱いやすいときに使う。` },
      { t: 'ex', id: 'ex-contra', title: 'n² が偶数なら n は偶数', text: R`対偶「$n$ が奇数ならば $n^2$ は奇数」を示す。$n=2k+1$（$k\in\mathbb{Z}$）なら $n^2=4k^2+4k+1=2(2k^2+2k)+1$ は奇数。□` },
      { t: 'h2', id: 'absurd', text: '背理法' },
      { t: 'p', text: R`$Q$ を示したいとき、$\neg Q$ を仮定して矛盾（ある命題 $R$ と $\neg R$ の両方）を導く。すると $\neg Q$ は偽、すなわち $Q$ は真である。` },
      { t: 'ex', id: 'ex-sqrt2', title: '√2 は無理数', text: R`$\sqrt2\in\mathbb{Q}$ と仮定し、$\sqrt2=\frac pq$（$p,q\in\mathbb{N}$、既約）と書く。$p^2=2q^2$ なので $p^2$ は偶数、上の例より $p$ は偶数で $p=2r$。すると $4r^2=2q^2$、$q^2=2r^2$ となり $q$ も偶数。$p,q$ がともに偶数なのは既約であることに矛盾する。□` },
      { t: 'qa', q: R`背理法と対偶法はどう違う？`, a: R`対偶法は「$\neg Q$ から $\neg P$」という<em>決まったゴール</em>を目指す。背理法は「$P$ と $\neg Q$ から、<em>何でもよいから</em>矛盾」を目指す。対偶で書ける証明は、背理法より対偶で書いたほうが筋が見えやすい。` },
      { t: 'h2', id: 'cases', text: '場合分け' },
      { t: 'p', text: R`条件を、漏れも重なりもない場合（例：$x\ge0$ と $x<0$）に分け、それぞれで結論を示す。[[abs-triangle#prop-abs-basic|絶対値の性質]]の証明が典型である。場合が<em>すべてを尽くしている</em>ことを必ず確認する。` },
      { t: 'h2', id: 'induction', text: '数学的帰納法' },
      { t: 'thm', id: 'thm-induction', title: '数学的帰納法', yomi: 'すうがくてききのうほう', imp: 3, text: R`$P(n)$ を $n\in\mathbb{N}$ についての条件とする。(i) $P(1)$ が真、(ii) 任意の $k\in\mathbb{N}$ について $P(k)\Rightarrow P(k+1)$ が真、の二つが成り立てば、すべての $n\in\mathbb{N}$ について $P(n)$ は真である。` },
      { t: 'note', title: '帰納法は「自然数の性質」そのもの', text: R`この定理は、自然数の公理（ペアノの公理）の一つ、あるいは「$\mathbb{N}$ の空でない部分集合には最小元がある」（整列性）と同値である。後者を使えば、$P(n)$ が偽となる最小の $n$ をとって矛盾を導く形で証明できる。` },
      { t: 'ex', id: 'ex-ind-sum', title: '1 + 2 + … + n = n(n+1)/2', text: R`$P(n)$：$\sum_{k=1}^nk=\frac{n(n+1)}2$。$P(1)$：$1=\frac{1\cdot2}2$ で真。$P(m)$ を仮定すると $\sum_{k=1}^{m+1}k=\frac{m(m+1)}2+(m+1)=\frac{(m+1)(m+2)}2$ で $P(m+1)$ が真。よってすべての $n\in\mathbb{N}$ で成り立つ。□` },
      { t: 'h2', id: 'sec-unique', text: '存在と一意性' },
      { t: 'p', text: R`「ただ一つ存在する」は二つの主張からなる。<b>存在</b>：条件をみたすものを一つ見つける（または構成する）。<b>一意性</b>：条件をみたすものが二つ $x,x'$ あったとして $x=x'$ を示す。[[sequence-convergence#thm-unique|極限の一意性]]や[[supremum#prop-sup-unique|上限の一意性]]は後者の典型である。` },
      { t: 'h2', id: 'counter', text: '反例による否定' },
      { t: 'p', text: R`「すべての $x$ で $P(x)$」を否定するには、[[logic-quantifiers#prop-neg|否定の規則]]より $P(x)$ が偽となる $x$ を<em>一つ</em>示せば十分である。これを<b class="term">反例</b>という。逆に、例をいくつ挙げても「すべての $x$ で $P(x)$」の証明にはならない。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-pm-1', level: 1, title: '基本', text: R`数学的帰納法で、すべての $n\in\mathbb{N}$ について $2^n\ge n+1$ を示せ。`, answer: R`$n=1$：$2\ge2$。$2^k\ge k+1$ を仮定すると $2^{k+1}=2\cdot2^k\ge2(k+1)=2k+2\ge k+2$。よって $n=k+1$ でも成り立つ。`, space: 5 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'sets',
    title: '集合の記法',
    sub: '∈・⊂・∪・∩・区間',
    yomi: 'しゅうごうのきほう',
    aliases: ['集合', 'しゅうごう', '元', 'げん', '要素', '部分集合', 'ぶぶんしゅうごう', '和集合', 'わしゅうごう', '共通部分', 'きょうつうぶぶん', '差集合', '補集合', 'ほしゅうごう', '空集合', 'くうしゅうごう', '直積', 'ちょくせき', '区間', 'くかん', '開区間', '閉区間', '自然数', '整数', '有理数', '実数', '複素数'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['propositional-logic'],
    related: ['maps', 'logic-quantifiers'],
    notation: [
      R`$x\in A$：$x$ は集合 $A$ の元。$x\notin A$：元でない。`,
      R`$\{x\in X\mid P(x)\}$：$X$ の元のうち条件 $P(x)$ をみたすもの全体（「$\mid$」の代わりに「$;$」と書く本もある）。`,
      R`$\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}\subset\mathbb{C}$：自然数・整数・有理数・実数・複素数。`,
    ],
    synopsis: R`集合は「ものの集まり」で、集まりの一つ一つを元という。元であること（$\in$）、含まれること（$\subset$）、和・共通部分・差・補集合・直積、そして数の集合と区間の記号は、解析学のすべての文章の土台である。`,
    body: [
      { t: 'h2', id: 'basic', text: '集合と元' },
      { t: 'def', id: 'def-set', title: '集合・元', yomi: 'しゅうごう', imp: 2, text: R`ある対象がそれに属するかどうかがはっきり決まる集まりを<b class="term">集合</b>といい、集合 $A$ に属する対象を $A$ の<b class="term">元</b>（要素）という。$x$ が $A$ の元であることを $x\in A$、そうでないことを $x\notin A$ と書く。元を一つももたない集合を<b class="term">空集合</b>といい $\varnothing$ と書く。` },
      { t: 'note', title: '集合の書き方：外延と内包', text: R`<ul><li>外延的記法：元を並べる。$\{1,2,3\}$、$\{2,4,6,\dots\}$。</li><li>内包的記法：条件で書く。$\{x\in\mathbb{R}\mid x^2<2\}$（$x^2<2$ をみたす実数全体）、$\{2k\mid k\in\mathbb{N}\}$（正の偶数全体）。</li></ul>` },
      { t: 'def', id: 'def-numbers', title: '数の集合', yomi: 'かずのしゅうごう', imp: 3, text: R`$\mathbb{N}=\{1,2,3,\dots\}$：自然数全体（このサイトでは $0$ を含めない）。$\mathbb{Z}$：整数全体。$\mathbb{Q}=\{\frac pq\mid p\in\mathbb{Z},\ q\in\mathbb{N}\}$：有理数全体。$\mathbb{R}$：実数全体。$\mathbb{C}=\{a+bi\mid a,b\in\mathbb{R}\}$：複素数全体（$i^2=-1$）。$\mathbb{K}$ は「$\mathbb{R}$ または $\mathbb{C}$」の意味で使う。` },
      { t: 'h2', id: 'subset', text: '部分集合と集合の相等' },
      { t: 'def', id: 'def-subset', title: '部分集合・集合の相等', yomi: 'ぶぶんしゅうごう', imp: 3, text: R`集合 $A,B$ について、
<ul><li>$A\subset B$ $:\Longleftrightarrow$ $\forall x\ (x\in A\Rightarrow x\in B)$。$A$ は $B$ の<b class="term">部分集合</b>という。</li><li>$A=B$ $:\Longleftrightarrow$ $A\subset B$ かつ $B\subset A$。</li><li>$A\subsetneq B$ $:\Longleftrightarrow$ $A\subset B$ かつ $A\ne B$（真部分集合）。</li></ul>` },
      { t: 'rem', title: '⊂ は「等しい場合も含む」', text: R`このサイトでは $A\subset B$ を「$A=B$ の場合も含む」意味で使う。本によっては $\subseteq$ と書き、$\subset$ を真部分集合に使うものもあるので、読む本の約束を確認する。` },
      { t: 'note', title: '集合が等しいことの示し方', text: R`$A=B$ を示すには、「$x\in A$ を任意にとって $x\in B$ を示す」と「$x\in B$ を任意にとって $x\in A$ を示す」の二つを行う。片方だけでは $A\subset B$ しか言えていない。` },
      { t: 'h2', id: 'ops', text: '集合の演算' },
      { t: 'def', id: 'def-setops', title: '和集合・共通部分・差・補集合', yomi: 'しゅうごうのえんざん', imp: 3, text: R`集合 $X$ の部分集合 $A,B\subset X$ について
<ul><li>$A\cup B:=\{x\in X\mid x\in A\ \text{または}\ x\in B\}$（和集合）</li><li>$A\cap B:=\{x\in X\mid x\in A\ \text{かつ}\ x\in B\}$（共通部分）</li><li>$A\setminus B:=\{x\in X\mid x\in A\ \text{かつ}\ x\notin B\}$（差集合）</li><li>$A^c:=X\setminus A$（補集合。全体 $X$ を決めてはじめて意味をもつ）</li></ul>` },
      { t: 'html', html: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:6px">${venn('cup', 'A ∪ B')}${venn('cap', 'A ∩ B')}${venn('minus', 'A ∖ B')}${venn('comp', 'Aᶜ = X ∖ A')}</div>`, caption: R`ベン図。色の付いた部分が、それぞれの集合を表す。外の長方形が全体集合 $X$。` },
      { t: 'prop', id: 'prop-set-demorgan', title: '集合のド・モルガンの法則', yomi: 'しゅうごうのどもるがん', imp: 2, text: R`$A,B\subset X$ について $(A\cup B)^c=A^c\cap B^c$、$(A\cap B)^c=A^c\cup B^c$。より一般に、添字集合 $\Lambda$ と $A_\lambda\subset X\ (\lambda\in\Lambda)$ について $\left(\bigcup_{\lambda\in\Lambda}A_\lambda\right)^c=\bigcap_{\lambda\in\Lambda}A_\lambda^c$、$\left(\bigcap_{\lambda\in\Lambda}A_\lambda\right)^c=\bigcup_{\lambda\in\Lambda}A_\lambda^c$。` },
      { t: 'proof', steps: [{ text: R`$x\in X$ について、$x\in(A\cup B)^c\iff\neg(x\in A\lor x\in B)\iff(x\notin A)\land(x\notin B)\iff x\in A^c\cap B^c$（[[propositional-logic#prop-demorgan|論理のド・モルガン]]）。他も同様で、一般の場合は $\forall,\exists$ の[[logic-quantifiers#prop-neg|否定の規則]]を使う：$x\notin\bigcup A_\lambda\iff\neg(\exists\lambda,\ x\in A_\lambda)\iff\forall\lambda,\ x\notin A_\lambda$。` }] },
      { t: 'def', id: 'def-product', title: '直積', yomi: 'ちょくせき', imp: 2, text: R`集合 $A,B$ に対し、$A\times B:=\{(a,b)\mid a\in A,\ b\in B\}$（順序対全体）を<b class="term">直積</b>という。$\mathbb{R}^2=\mathbb{R}\times\mathbb{R}$、$\mathbb{R}^n=\mathbb{R}\times\cdots\times\mathbb{R}$（$n$ 個）。` },
      { t: 'h2', id: 'interval', text: '区間' },
      { t: 'def', id: 'def-interval', title: '区間の記号', yomi: 'くかん', imp: 3, text: R`$a,b\in\mathbb{R}$, $a<b$ について
<ul><li>$(a,b):=\{x\in\mathbb{R}\mid a<x<b\}$（開区間）、$[a,b]:=\{x\in\mathbb{R}\mid a\le x\le b\}$（閉区間）</li><li>$[a,b):=\{x\mid a\le x<b\}$、$(a,b]:=\{x\mid a<x\le b\}$（半開区間）</li><li>$(a,\infty):=\{x\mid x>a\}$、$[a,\infty):=\{x\mid x\ge a\}$、$(-\infty,b)$ なども同様。$(-\infty,\infty)=\mathbb{R}$。</li></ul>これらを<b class="term">区間</b>という。$\infty$ は数ではなく「上限なし」を表す記号なので、$[a,\infty]$ とは書かない。` },
      { t: 'html', html: numberLine, caption: R`開区間 $(a-\varepsilon,a+\varepsilon)$。白丸は端点を含まないことを表す。この区間は $\{x\in\mathbb{R}\mid|x-a|<\varepsilon\}$ と同じ集合である。` },
      { t: 'qa', q: R`$(a,b)$ は点の座標と同じ書き方では？`, a: R`同じ記号を二つの意味で使う。文脈で区別する（「区間 $(a,b)$」「点 $(a,b)\in\mathbb{R}^2$」）。紛らわしいときは開区間を $]a,b[$ と書く本もある。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-sets-1', level: 1, title: '基本', text: R`$A=[0,2)$、$B=(1,3]$（$\mathbb{R}$ の部分集合、全体を $X=\mathbb{R}$）とする。$A\cup B$、$A\cap B$、$A\setminus B$、$A^c$ を区間の記号で書け。`, answer: R`$A\cup B=[0,3]$、$A\cap B=(1,2)$、$A\setminus B=[0,1]$、$A^c=(-\infty,0)\cup[2,\infty)$。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'maps',
    title: '写像と関数',
    sub: '定義域・像・単射・全射・合成',
    yomi: 'しゃぞうとかんすう',
    aliases: ['写像', 'しゃぞう', '関数', 'かんすう', '定義域', 'ていぎいき', '値域', 'ちいき', '像', 'ぞう', '逆像', 'ぎゃくぞう', '単射', 'たんしゃ', '全射', 'ぜんしゃ', '全単射', 'ぜんたんしゃ', '合成', 'ごうせい', '逆写像', 'ぎゃくしゃぞう', '逆関数', '制限', 'せいげん', '恒等写像'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['sets'],
    related: ['continuity', 'derivative-rules'],
    notation: [
      R`$f:X\to Y$：$X$ の各元に $Y$ の元を一つずつ対応させる写像。$x\mapsto f(x)$ は対応のさせ方。`,
      R`$f(S)$：$S\subset X$ の像。$f^{-1}(T)$：$T\subset Y$ の逆像（逆写像がなくても定義される）。`,
      R`$g\circ f$：合成。$f^{-1}$：逆写像（全単射のときだけ）。$f|_S$：$S$ への制限。$\mathrm{id}_X$：恒等写像。`,
    ],
    synopsis: R`写像 $f:X\to Y$ は、集合 $X$ の各元に集合 $Y$ の元を<em>ちょうど一つ</em>対応させる規則である。値が実数のときは関数ともいう。像・逆像・単射・全射・合成・逆写像は、連続性や線形作用素を語るための基本語彙である。`,
    body: [
      { t: 'h2', id: 'def', text: '写像' },
      { t: 'def', id: 'def-map', title: '写像', yomi: 'しゃぞう', imp: 3, text: R`集合 $X,Y$ について、$X$ の各元 $x$ に $Y$ の元 $f(x)$ をちょうど一つ対応させる規則 $f$ を、$X$ から $Y$ への<b class="term">写像</b>といい $f:X\to Y$ と書く。$X$ を<b class="term">定義域</b>、$Y$ を<b class="term">終域</b>という。$Y=\mathbb{R}$ や $\mathbb{C}$ のとき、写像を<b class="term">関数</b>ともいう。二つの写像 $f,g:X\to Y$ が等しい $:\Longleftrightarrow$ すべての $x\in X$ で $f(x)=g(x)$。` },
      { t: 'rem', title: '定義域まで含めて一つの写像', text: R`$f(x)=x^2$ という式だけでは写像は決まらない。$f:\mathbb{R}\to\mathbb{R}$ と $g:[0,\infty)\to\mathbb{R}$ は同じ式でも別の写像である（$g$ は単射だが $f$ はそうでない）。このサイトで「$f:I\to\mathbb{R}$」のように毎回定義域を書くのはこのためである。` },
      { t: 'def', id: 'def-image', title: '像・逆像', yomi: 'ぞう', imp: 2, text: R`$f:X\to Y$、$S\subset X$、$T\subset Y$ について $f(S):=\{f(x)\mid x\in S\}\subset Y$（$S$ の<b class="term">像</b>）、$f^{-1}(T):=\{x\in X\mid f(x)\in T\}\subset X$（$T$ の<b class="term">逆像</b>）。$f(X)$ を $f$ の<b class="term">値域</b>という。` },
      { t: 'qa', q: R`$f^{-1}(T)$ は逆写像 $f^{-1}$ がないと書けない？`, a: R`書ける。逆像 $f^{-1}(T)$ は「$f$ で $T$ に送られる点全体」という集合で、$f$ が全単射でなくても定義される。たとえば $f(x)=x^2$（$\mathbb{R}\to\mathbb{R}$）で $f^{-1}(\{4\})=\{-2,2\}$、$f^{-1}(\{-1\})=\varnothing$。記号が同じなので文脈で区別する。` },
      { t: 'h2', id: 'inj', text: '単射・全射・全単射' },
      { t: 'def', id: 'def-injsurj', title: '単射・全射・全単射', yomi: 'たんしゃ', imp: 3, text: R`$f:X\to Y$ について
<ul><li>$f$ は<b class="term">単射</b> $:\Longleftrightarrow$ $\forall x,x'\in X\ (f(x)=f(x')\Rightarrow x=x')$（異なる点は異なる値に送られる）。</li><li>$f$ は<b class="term">全射</b> $:\Longleftrightarrow$ $\forall y\in Y\ \exists x\in X\ \text{s.t.}\ f(x)=y$（$f(X)=Y$）。</li><li>$f$ は<b class="term">全単射</b> $:\Longleftrightarrow$ 単射かつ全射。</li></ul>` },
      { t: 'html', html: `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:6px">${mapDiagram([[0, 0], [1, 2], [2, 3]], 3, 4, '単射だが全射でない')}${mapDiagram([[0, 0], [1, 0], [2, 1], [3, 2]], 4, 3, '全射だが単射でない')}${mapDiagram([[0, 1], [1, 2], [2, 0]], 3, 3, '全単射')}</div>`, caption: R`矢印は $x\mapsto f(x)$。単射は「矢印の先が重ならない」、全射は「右側のどの点にも矢印が届く」。` },
      { t: 'h2', id: 'comp', text: '合成・逆写像・制限' },
      { t: 'def', id: 'def-comp', title: '合成写像', yomi: 'ごうせいしゃぞう', imp: 3, text: R`$f:X\to Y$、$g:Y\to Z$ に対し、$g\circ f:X\to Z$ を $(g\circ f)(x):=g(f(x))$ で定め、<b class="term">合成写像</b>という。$f$ を先に、$g$ を後に施す（右から順に読む）。` },
      { t: 'def', id: 'def-inverse', title: '逆写像・恒等写像・制限', yomi: 'ぎゃくしゃぞう', imp: 2, text: R`$\mathrm{id}_X:X\to X,\ x\mapsto x$ を<b class="term">恒等写像</b>という。$f:X\to Y$ が全単射のとき、各 $y\in Y$ に $f(x)=y$ となるただ一つの $x$ を対応させる写像 $f^{-1}:Y\to X$ を<b class="term">逆写像</b>という。$f^{-1}\circ f=\mathrm{id}_X$、$f\circ f^{-1}=\mathrm{id}_Y$ である。$S\subset X$ について $f|_S:S\to Y,\ x\mapsto f(x)$ を $f$ の $S$ への<b class="term">制限</b>という。` },
      { t: 'ex', id: 'ex-inverse', title: '定義域を絞って逆関数を作る', text: R`$f:\mathbb{R}\to\mathbb{R},\ f(x)=x^2$ は単射でも全射でもない。定義域と終域を $[0,\infty)$ に絞った $g:[0,\infty)\to[0,\infty),\ g(x)=x^2$ は全単射で、逆写像は $g^{-1}(y)=\sqrt y$ である。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-maps-1', level: 1, title: '基本', text: R`$f:\mathbb{R}\to\mathbb{R},\ f(x)=2x+1$ が全単射であることを示し、逆写像を求めよ。`, answer: R`単射：$2x+1=2x'+1\Rightarrow x=x'$。全射：任意の $y\in\mathbb{R}$ に対し $x=\frac{y-1}2$ とすれば $f(x)=y$。逆写像は $f^{-1}(y)=\frac{y-1}2$。`, space: 4 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'notation-symbols',
    title: '記号と略記',
    sub: ':=・∴・s.t.・max・複号同順',
    yomi: 'きごうとりゃっき',
    aliases: ['記号', 'きごう', '略記', 'りゃっき', '定義記号', 'ゆえに', 'なぜならば', 'max', 'min', 'ガウス記号', '床関数', '階乗', 'かいじょう', '複号同順', 'ふくごうどうじゅん', 'iff', 'wlog', '恒等的に等しい'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 2,
    prereq: ['math-language'],
    related: ['greek-letters', 'symbol-table', 'sigma-notation'],
    notation: [R`この記事自体が記号の説明である。一覧は [[symbol-table]]。`],
    synopsis: R`教科書や黒板で説明なしに使われる記号と略記をまとめる。定義の記号 $:=$ と $:\Longleftrightarrow$、$\therefore$・$\because$、s.t.・i.e.・iff、$\max$・$\min$、ガウス記号、複号同順などである。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と論理の記号' },
      { t: 'def', id: 'def-defsym', title: '定義の記号', yomi: 'ていぎのきごう', imp: 2, text: R`<ul><li>$A:=B$：「$A$ を $B$ で定義する」（新しい記号 $A$ を、すでに意味のわかっている $B$ で決める）。$B=:A$ とも書く。</li><li>$P:\Longleftrightarrow Q$：「性質 $P$ を条件 $Q$ で定義する」。</li><li>$f\equiv c$：「$f$ は恒等的に $c$（すべての点で値 $c$）」。</li></ul>` },
      { t: 'rem', title: '定義の右辺に定義したい記号を使わない', text: R`「$f'(x):=f'(x)$」のように、定義の右辺に左辺と同じ記号が出てくると何も決めていない（「犬とは犬である」）。定義は必ず「新しい記号 $:=$ すでに意味のあるもの」の形にする。` },
      { t: 'table', html: R`<table class="tbl"><tr><th>記号・略記</th><th>読み・意味</th></tr>
<tr><td>$\therefore$</td><td>ゆえに</td></tr><tr><td>$\because$</td><td>なぜならば</td></tr>
<tr><td>s.t.</td><td>such that（〜となるような）</td></tr><tr><td>i.e.</td><td>すなわち</td></tr><tr><td>e.g.</td><td>たとえば</td></tr>
<tr><td>iff</td><td>if and only if（同値、$\iff$）</td></tr><tr><td>w.l.o.g.</td><td>一般性を失わずに</td></tr>
<tr><td>□、∎、Q.E.D.</td><td>証明終わり</td></tr>
<tr><td>$\Rightarrow$</td><td>ならば（極限の「$\to$」や写像の「$\to$」と区別する）</td></tr></table>` },
      { t: 'h2', id: 'func', text: 'よく使う関数記号' },
      { t: 'def', id: 'def-maxmin', title: 'max・min・ガウス記号・階乗', yomi: 'まっくす', imp: 2, text: R`<ul><li>$\max\{a_1,\dots,a_n\}$：有限個の実数 $a_1,\dots,a_n$ の最大値。$\min$ は最小値。</li><li>$\lfloor x\rfloor:=\max\{k\in\mathbb{Z}\mid k\le x\}$（$x\in\mathbb{R}$ 以下の最大の整数。ガウス記号 $[x]$ とも書く）。</li><li>$n!:=1\cdot2\cdots n$（$n\in\mathbb{N}$）、$0!:=1$。</li></ul>` },
      { t: 'note', title: 'max は「両方の条件を同時にみたす」ために使う', text: R`$n\ge N_1$ で条件 A、$n\ge N_2$ で条件 B が成り立つとき、$N:=\max\{N_1,N_2\}$ とすれば $n\ge N$ で A と B が同時に成り立つ。$\delta$ の場合は $\min$ を使う（$|x-a|<\min\{\delta_1,\delta_2\}$ なら両方の $\delta$ より近い）。` },
      { t: 'def', id: 'def-pm', title: '複号同順', yomi: 'ふくごうどうじゅん', imp: 1, text: R`式の中に $\pm$ や $\mp$ が複数あるとき、「上の符号どうし・下の符号どうしを組にする」ことを<b class="term">複号同順</b>という。たとえば $\cos(x\pm y)=\cos x\cos y\mp\sin x\sin y$ は、$\cos(x+y)=\cos x\cos y-\sin x\sin y$ と $\cos(x-y)=\cos x\cos y+\sin x\sin y$ の二つをまとめて書いたもの。` },
      { t: 'h2', id: 'writing', text: '書き分けに注意する文字' },
      { t: 'table', html: R`<table class="tbl"><tr><th>文字</th><th>紛らわしい文字</th><th>書き分け</th></tr>
<tr><td>$\varepsilon$（イプシロン）</td><td>$\in$（属する）</td><td>$\varepsilon$ は丸く小さく、$\in$ は角ばって大きく</td></tr>
<tr><td>$\varnothing$（空集合）</td><td>$\phi$（ファイ）</td><td>$\varnothing$ は丸に斜線</td></tr>
<tr><td>$\rho$（ロー）</td><td>$p$</td><td>$\rho$ は上を丸く閉じる</td></tr>
<tr><td>$\nu$（ニュー）</td><td>$v$</td><td>$\nu$ は左下が尖る</td></tr>
<tr><td>$\mathbb{R},\mathbb{N}$</td><td>$R,N$</td><td>縦線を一本二重にする（黒板太字）</td></tr></table>` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'greek-letters',
    title: 'ギリシャ文字',
    sub: '読み方と使われ方',
    yomi: 'ぎりしゃもじ',
    aliases: ['ぎりしゃ', 'アルファ', 'ベータ', 'ガンマ', 'デルタ', 'イプシロン', 'ゼータ', 'イータ', 'シータ', 'ラムダ', 'ミュー', 'ニュー', 'クシー', 'グザイ', 'パイ', 'ロー', 'シグマ', 'タウ', 'ファイ', 'カイ', 'プサイ', 'オメガ'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 2,
    prereq: [],
    related: ['notation-symbols', 'symbol-table'],
    notation: [R`読みは日本の数学で一般的なもの。複数ある場合は併記した。`],
    synopsis: R`解析学ではギリシャ文字が大量に出てくる。$\varepsilon$ と $\delta$ は小さい正の数、$\alpha$ や $\beta$ は極限値、$\lambda$ は添字や固有値、$\sigma,\tau,\rho$ はずれを表す関数——といった「よくある使われ方」とあわせて覚える。`,
    body: [
      { t: 'h2', id: 'table', text: '一覧' },
      { t: 'table', html: R`<table class="tbl"><tr><th>小文字</th><th>大文字</th><th>読み</th><th>このサイトでの主な使われ方</th></tr>
<tr><td>$\alpha$</td><td>$A$</td><td>アルファ</td><td>数列の極限値、スカラー</td></tr>
<tr><td>$\beta$</td><td>$B$</td><td>ベータ</td><td>二つ目の極限値・スカラー</td></tr>
<tr><td>$\gamma$</td><td>$\Gamma$</td><td>ガンマ</td><td>定数、ガンマ関数 $\Gamma$</td></tr>
<tr><td>$\delta$</td><td>$\Delta$</td><td>デルタ</td><td>ε-δ の $\delta$、クロネッカーのデルタ $\delta_{jk}$、ラプラシアン $\Delta$</td></tr>
<tr><td>$\varepsilon,\epsilon$</td><td>$E$</td><td>イプシロン</td><td>任意の小さい正の数</td></tr>
<tr><td>$\zeta$</td><td>$Z$</td><td>ゼータ</td><td>ゼータ関数</td></tr>
<tr><td>$\eta$</td><td>$H$</td><td>イータ</td><td>二つ目の小さい正の数</td></tr>
<tr><td>$\theta,\vartheta$</td><td>$\Theta$</td><td>シータ</td><td>角度、$0<\theta<1$ の補助変数</td></tr>
<tr><td>$\iota$</td><td>$I$</td><td>イオタ</td><td>（まれ）</td></tr>
<tr><td>$\kappa$</td><td>$K$</td><td>カッパ</td><td>定数</td></tr>
<tr><td>$\lambda$</td><td>$\Lambda$</td><td>ラムダ</td><td>添字 $\lambda\in\Lambda$、固有値、スカラー</td></tr>
<tr><td>$\mu$</td><td>$M$</td><td>ミュー</td><td>測度、定数</td></tr>
<tr><td>$\nu$</td><td>$N$</td><td>ニュー</td><td>添字、測度</td></tr>
<tr><td>$\xi$</td><td>$\Xi$</td><td>クシー（グザイ）</td><td>中間値の点、フーリエ変換の変数</td></tr>
<tr><td>$o$</td><td>$O$</td><td>オミクロン</td><td>ランダウ記号 $o$, $O$</td></tr>
<tr><td>$\pi$</td><td>$\Pi$</td><td>パイ</td><td>円周率、積の記号 $\prod$</td></tr>
<tr><td>$\rho$</td><td>$P$</td><td>ロー</td><td>1 次近似のずれ、距離</td></tr>
<tr><td>$\sigma$</td><td>$\Sigma$</td><td>シグマ</td><td>和の記号 $\sum$、ずれを表す関数</td></tr>
<tr><td>$\tau$</td><td>$T$</td><td>タウ</td><td>時刻、ずれを表す関数</td></tr>
<tr><td>$\upsilon$</td><td>$\Upsilon$</td><td>ウプシロン</td><td>（まれ）</td></tr>
<tr><td>$\varphi,\phi$</td><td>$\Phi$</td><td>ファイ</td><td>関数、写像 $\Phi$</td></tr>
<tr><td>$\chi$</td><td>$X$</td><td>カイ</td><td>特性関数 $\chi_A$</td></tr>
<tr><td>$\psi$</td><td>$\Psi$</td><td>プサイ</td><td>関数、波動関数</td></tr>
<tr><td>$\omega$</td><td>$\Omega$</td><td>オメガ</td><td>領域 $\Omega$、角振動数</td></tr></table>` },
      { t: 'note', title: 'ε と δ はなぜ「小さい数」なのか', text: R`慣習である。$\varepsilon$ は「error（誤差）」の頭文字 e、$\delta$ は「difference（差）」の d に当たるギリシャ文字だと説明されることが多い。` },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'inequalities',
    title: '不等式の扱い方',
    sub: '評価の基本ルール',
    yomi: 'ふとうしきのあつかいかた',
    aliases: ['不等式', 'ふとうしき', '評価', 'ひょうか', '大小関係', '絶対値の不等式', '任意の正の数', '上から抑える'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['sets'],
    related: ['abs-triangle', 'epsilon-delta-howto'],
    notation: [
      R`$a,b,c\in\mathbb{R}$。$a\le b$ は「$a<b$ または $a=b$」。`,
      R`「評価する」：ある量を、扱いやすい量で上から（または下から）抑えること。`,
    ],
    synopsis: R`解析学の証明の大部分は不等式の変形（評価）である。足す・掛ける・逆数をとるときの規則、「大きいほうに置き換えて上から抑える」考え方、そして「任意の正の数より小さい非負の数は $0$」という論法を確実に使えるようにする。`,
    body: [
      { t: 'h2', id: 'rules', text: '基本ルール' },
      { t: 'prop', id: 'prop-ineq-rules', title: '不等式の基本規則', yomi: 'ふとうしきのきほんきそく', imp: 3, text: R`$a,b,c,d\in\mathbb{R}$ とする。
<ol><li>$a\le b$ かつ $b\le c$ ならば $a\le c$（推移律）。</li><li>$a\le b$ ならば $a+c\le b+c$。$a\le b$ かつ $c\le d$ ならば $a+c\le b+d$。</li><li>$a\le b$ かつ $c>0$ ならば $ac\le bc$。$c<0$ ならば $ac\ge bc$（向きが逆になる）。</li><li>$0<a\le b$ ならば $\frac1b\le\frac1a$（逆数で向きが逆になる）。</li><li>$0\le a\le b$ かつ $0\le c\le d$ ならば $ac\le bd$。</li></ol>どの規則も、$\le$ を $<$ に替えても成り立つ（(5) では $a<b$ かつ $0<c\le d$ など、正の数の仮定に注意）。` },
      { t: 'note', title: '実数の順序の公理から導かれる', text: R`これらは実数の順序の公理（$a\le b\Rightarrow a+c\le b+c$、$0\le a,\ 0\le b\Rightarrow0\le ab$ など）から導かれる。たとえば (3) の $c<0$ の場合は、$b-a\ge0$ と $-c>0$ から $(b-a)(-c)\ge0$、すなわち $ac\ge bc$。` },
      { t: 'rem', title: '負の数を掛けると向きが逆になる', text: R`$a<b$ の両辺に $-1$ を掛けると $-a>-b$。$-\varepsilon<x-a$ から $a-x<\varepsilon$ を得る、といった変形で頻繁に使う。両辺に「符号のわからない数」を掛けてはいけない。` },
      { t: 'h2', id: 'abs', text: '絶対値の不等式' },
      { t: 'p', text: R`$\varepsilon>0$ のとき $|x-a|<\varepsilon\iff a-\varepsilon<x<a+\varepsilon$（[[abs-triangle#prop-abs-basic|絶対値の基本性質]]）。距離の言葉と区間の言葉を自由に行き来できるようにする。` },
      { t: 'html', html: numberLine, caption: R`$|x-a|<\varepsilon$ をみたす $x$ 全体は、開区間 $(a-\varepsilon,\ a+\varepsilon)$。` },
      { t: 'h2', id: 'estimate', text: '評価の考え方' },
      { t: 'note', title: '「上から抑える」とは', text: R`$|a_n-\alpha|<\varepsilon$ を示したいとき、$|a_n-\alpha|$ そのものを計算する必要はない。$|a_n-\alpha|\le B_n$ となる扱いやすい量 $B_n$ を見つけ、$B_n<\varepsilon$ を示せば十分である。例：$\left|\frac{\sin n}{n}\right|\le\frac1n$（$|\sin n|\le1$）。` },
      { t: 'ex', id: 'ex-estimate', title: '分母を小さくすると分数は大きくなる', text: R`$n\in\mathbb{N}$ について $\dfrac{1}{n^2+n+1}\le\dfrac1{n^2}\le\dfrac1n$。分母を<em>小さい</em>量に置き換えると、正の分数は<em>大きく</em>なる（規則 (4)）。評価では「目標に合わせて、扱いやすいほうへ大きく（または小さく）置き換える」。` },
      { t: 'h2', id: 'zero', text: '任意の正の数より小さい' },
      { t: 'prop', id: 'prop-le-eps', title: '任意の正の数以下の非負の数は 0', yomi: 'にんいのせいのすういか', imp: 3, text: R`$x\in\mathbb{R}$, $x\ge0$ とする。任意の $\varepsilon>0$ について $x\le\varepsilon$（または $x<\varepsilon$）ならば、$x=0$ である。` },
      { t: 'proof', steps: [{ text: R`$x>0$ と仮定すると、$\varepsilon:=\frac x2>0$ について仮定より $x\le\frac x2$。両辺から $\frac x2$ を引いて $\frac x2\le0$、すなわち $x\le0$ となり、$x>0$ に矛盾する。よって $x=0$。`, why: R`「$\varepsilon$ は任意」なので、こちらに都合のよい $\varepsilon=\frac x2$ を選んでよい。ε-δ 論法の中心にある考え方である。` }] },
      { t: 'cor', id: 'cor-eq-eps', title: '等式を不等式で示す', yomi: 'とうしきをふとうしきでしめす', imp: 2, text: R`$a,b\in\mathbb{R}$ について、任意の $\varepsilon>0$ で $|a-b|<\varepsilon$ ならば $a=b$。また、任意の $\varepsilon>0$ で $a<b+\varepsilon$ ならば $a\le b$。` },
      { t: 'proof', steps: [{ text: R`前半は命題を $x=|a-b|$ に使う。後半：$a>b$ と仮定し $\varepsilon:=a-b>0$ とすると、$a<b+(a-b)=a$ となり矛盾。` }] },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-ineq-1', level: 1, title: '基本', text: R`$n\in\mathbb{N}$ について $\left|\dfrac{2n+(-1)^n}{n}-2\right|\le\dfrac1n$ を示せ。`, answer: R`$\left|\frac{2n+(-1)^n}{n}-2\right|=\left|\frac{(-1)^n}{n}\right|=\frac{|(-1)^n|}{n}=\frac1n$。`, space: 3 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'sigma-notation',
    title: 'Σ 記号と添字',
    sub: '和・積・添字のずらし',
    yomi: 'しぐまきごうとそえじ',
    aliases: ['しぐま', 'Σ', '総和', 'そうわ', '添字', 'そえじ', '和の記号', '積の記号', 'Π', 'ぱい', '二重和', 'クロネッカーのデルタ'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 2,
    prereq: ['sets'],
    related: ['series', 'notation-symbols'],
    notation: [
      R`$\sum_{k=m}^n a_k:=a_m+a_{m+1}+\cdots+a_n$（$m\le n$ の整数、各 $a_k\in\mathbb{R}$ または $\mathbb{C}$）。`,
      R`$\prod_{k=m}^n a_k:=a_ma_{m+1}\cdots a_n$。$\delta_{jk}$：クロネッカーのデルタ。`,
    ],
    synopsis: R`$\sum$ は和の、$\prod$ は積の略記である。添字 $k$ は「仮の文字」で、他の文字に替えても意味は変わらない。添字をずらす、和を分ける・入れ替える、といった操作を確実に行えるようにする。`,
    body: [
      { t: 'h2', id: 'def', text: '定義と基本規則' },
      { t: 'def', id: 'def-sum', title: '和の記号', yomi: 'わのきごう', imp: 2, text: R`整数 $m\le n$ と数 $a_m,\dots,a_n$ について、$\sum_{k=m}^na_k:=a_m+a_{m+1}+\cdots+a_n$ と定める（正確には帰納的に $\sum_{k=m}^ma_k:=a_m$、$\sum_{k=m}^{n+1}a_k:=\sum_{k=m}^na_k+a_{n+1}$）。$m>n$ のときは $\sum_{k=m}^na_k:=0$（空和）とする。` },
      { t: 'prop', id: 'prop-sum-rules', title: '和の基本規則', yomi: 'わのきほんきそく', imp: 2, text: R`数 $a_k,b_k$ と定数 $c$ について
<ol><li>$\sum_{k=m}^n(a_k+b_k)=\sum_{k=m}^na_k+\sum_{k=m}^nb_k$、$\sum_{k=m}^nca_k=c\sum_{k=m}^na_k$。</li><li>（添字のずらし）整数 $p$ について $\sum_{k=m}^na_k=\sum_{j=m+p}^{n+p}a_{j-p}$。</li><li>（分割）$m\le l<n$ のとき $\sum_{k=m}^na_k=\sum_{k=m}^la_k+\sum_{k=l+1}^na_k$。</li><li>（望遠鏡和）$\sum_{k=m}^n(a_{k+1}-a_k)=a_{n+1}-a_m$。</li></ol>` },
      { t: 'proof', steps: [{ text: R`いずれも $n$ についての帰納法で示せる。たとえば (4)：$n=m$ では $a_{m+1}-a_m$。$n$ で成り立つとすると $\sum_{k=m}^{n+1}(a_{k+1}-a_k)=(a_{n+1}-a_m)+(a_{n+2}-a_{n+1})=a_{n+2}-a_m$。` }] },
      { t: 'ex', id: 'ex-geom-sum', title: '等比数列の和', text: R`$r\in\mathbb{R}$, $r\ne1$、$n\in\mathbb{N}\cup\{0\}$ について $\sum_{k=0}^nr^k=\dfrac{1-r^{n+1}}{1-r}$。実際 $(1-r)\sum_{k=0}^nr^k=\sum_{k=0}^n(r^k-r^{k+1})=1-r^{n+1}$（望遠鏡和）。級数・ノイマン級数で何度も使う。` },
      { t: 'qa', q: R`添字の文字を $k$ から $j$ に替えてもよい？`, a: R`よい。$\sum_{k=1}^na_k$ と $\sum_{j=1}^na_j$ は同じ数である。添字は和の中だけで意味をもつ「仮の文字」（束縛変数）なので、外で使っている文字（たとえば $n$）とだけは重ならないようにする。` },
      { t: 'def', id: 'def-kronecker', title: 'クロネッカーのデルタ', yomi: 'くろねっかーのでるた', imp: 1, text: R`整数 $j,k$ について $\delta_{jk}:=1\ (j=k)$、$\delta_{jk}:=0\ (j\ne k)$。$\sum_{k=1}^n\beta_k\delta_{jk}=\beta_j$（$1\le j\le n$）が成り立つ（和の中で $k=j$ の項だけが残る）。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-sigma-1', level: 1, title: '基本', text: R`$\displaystyle\sum_{k=1}^n\frac1{k(k+1)}$ を求めよ。`, hint: R`$\frac1{k(k+1)}=\frac1k-\frac1{k+1}$ と分けて望遠鏡和にする。`, answer: R`$\sum_{k=1}^n\left(\frac1k-\frac1{k+1}\right)=1-\frac1{n+1}=\frac n{n+1}$。`, space: 3 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'epsilon-delta-howto',
    title: 'ε-δ 論法の書き方',
    sub: '答案の型と、よくある間違い',
    yomi: 'いぷしろんでるたろんぽうのかきかた',
    aliases: ['ε-δ', 'εδ', 'いぷしろんでるた', 'ε-N', '答案', 'とうあん', '書き方', 'かきかた', 'テンプレート', '下書き', '清書'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 3,
    prereq: ['logic-quantifiers', 'inequalities'],
    related: ['sequence-convergence', 'function-limit', 'continuity'],
    notation: [
      R`$\varepsilon>0$, $\delta>0$：正の実数。$N=N(\varepsilon)\in\mathbb{N}$、$\delta=\delta(\varepsilon)$：$\varepsilon$ に応じて選ぶ。`,
    ],
    synopsis: R`ε-N・ε-δ の証明は、ほぼ決まった型で書ける。「$\varepsilon>0$ を任意にとる → $N$（または $\delta$）を $\varepsilon$ から決める → $n\ge N$（$|x-a|<\delta$）とする → 目標の不等式を示す」。下書きでは目標から逆算して $N$ を見つけ、清書では順向きに書く。`,
    body: [
      { t: 'h2', id: 'template', text: '答案の型（数列）' },
      { t: 'note', title: '型：$a_n\to\alpha$ を示す', text: R`<ol><li>「$\varepsilon>0$ を任意にとる。」</li><li>「$N=N(\varepsilon)\in\mathbb{N}$ を、〇〇となるようにとる（理由：アルキメデスの原理、など）。」</li><li>「$n\in\mathbb{N}$, $n\ge N$ とする。」</li><li>「このとき $|a_n-\alpha|\le\cdots<\varepsilon$。」（各変形に理由）</li><li>「よって $a_n\to\alpha$。」</li></ol>` },
      { t: 'ex', id: 'ex-howto-seq', title: '(2n + 1)/(n + 3) → 2', text: R`<b>下書き</b>：$\left|\frac{2n+1}{n+3}-2\right|=\frac{5}{n+3}<\frac5n$。$\frac5n<\varepsilon$ にしたい $\iff n>\frac5\varepsilon$。<br><b>清書</b>：$\varepsilon>0$ を任意にとる。アルキメデスの原理より $N>\frac5\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとる。$n\in\mathbb{N}$, $n\ge N$ とすると
$$\left|\frac{2n+1}{n+3}-2\right|=\frac5{n+3}<\frac5n\le\frac5N<\varepsilon.$$
よって $\frac{2n+1}{n+3}\to2$。□` },
      { t: 'h2', id: 'template-fn', text: '答案の型（関数）' },
      { t: 'note', title: '型：$\lim_{x\to a}f(x)=L$ を示す', text: R`<ol><li>「$\varepsilon>0$ を任意にとる。」</li><li>「$\delta=\delta(\varepsilon):=\min\{1,\ \cdots\}>0$ とおく。」（$\min$ の 1 つ目で $x$ を $a$ の近くに閉じ込め、余計な因子を定数で抑える）</li><li>「$x\in I$, $0<|x-a|<\delta$ とする。」</li><li>「このとき $|f(x)-L|\le\cdots<\varepsilon$。」</li></ol>具体例は[[function-limit#ex-x2|$\lim x^2=1$]] を参照。` },
      { t: 'h2', id: 'mistakes', text: 'よくある間違い' },
      { t: 'rem', title: '間違い 1：N を n で決める', text: R`「$N=n+1$ とおく」は誤り。$N$ は $n$ より<em>前に</em>決まっていなければならない（$\forall\varepsilon\ \exists N\ \forall n$ の順）。$N$ は $\varepsilon$ だけから決める。` },
      { t: 'rem', title: '間違い 2：δ を x で決める', text: R`「$\delta=|x-a|+1$」なども同様に誤り。$\delta$ は $\varepsilon$（と点 $a$）だけから決める。` },
      { t: 'rem', title: '間違い 3：結論から出発する', text: R`「$|a_n-\alpha|<\varepsilon$ とすると…よって $n>\frac5\varepsilon$」と書くと、示すべきことを仮定してしまっている。逆算は下書きで行い、清書は「$N$ をこうとる → だから不等式が成り立つ」の順向きに書く。` },
      { t: 'rem', title: '間違い 4：不等号の向き・等号の扱い', text: R`途中の評価に $\le$ があっても、最後に一つでも $<$ があれば結論は $<\varepsilon$ でよい（$a\le b<c\Rightarrow a<c$）。逆に、すべて $\le$ のときは $\le\varepsilon$ までしか言えない。その場合は最初の $\varepsilon$ を $\frac\varepsilon2$ にするなどして調整する。` },
      { t: 'qa', q: R`$\varepsilon/2$ や $\varepsilon/3$ は、いつ使う？`, a: R`目標の量を、いくつかの「小さくできる量」の和で抑えるときに使う。二つの和なら各 $\frac\varepsilon2$、三つなら各 $\frac\varepsilon3$ にすれば、合計が $\varepsilon$ になる。「$\varepsilon/2$ にできるのは、$\varepsilon$ が任意だから $\frac\varepsilon2$ も正の数として定義に代入できる」ことによる。` },
      { t: 'h2', id: 'problems', text: '問題' },
      { t: 'problem', id: 'prob-howto-1', level: 1, title: '基本', text: R`$\varepsilon$-$N$ 論法で $\displaystyle\lim_{n\to\infty}\frac{3n-1}{n+2}=3$ を示せ。`, answer: R`$\left|\frac{3n-1}{n+2}-3\right|=\frac7{n+2}<\frac7n$。$\varepsilon>0$ に対し $N>\frac7\varepsilon$ となる $N=N(\varepsilon)\in\mathbb{N}$ をとると、$n\ge N$ で $\frac7{n+2}<\frac7n\le\frac7N<\varepsilon$。`, space: 6 },
    ],
  });

  /* ------------------------------------------------------------ */
  A.push({
    id: 'symbol-table',
    title: '記号表',
    sub: '読み方と初出ページ',
    yomi: 'きごうひょう',
    aliases: ['記号一覧', 'きごういちらん', '記号', 'きごう', 'よみかた'],
    kind: '基礎',
    field: '数学の言葉',
    grade: '1年前期',
    importance: 2,
    prereq: [],
    related: ['notation-symbols', 'greek-letters'],
    notation: [R`各記号の詳しい説明は、右の列のページを参照。`],
    synopsis: R`このサイトで使う記号を、読み方・意味・説明ページの順に並べた一覧である。記号の意味がわからなくなったら、ここを引く。`,
    body: [
      { t: 'h2', id: 'logic', text: '論理' },
      { t: 'table', html: R`<table class="tbl"><tr><th>記号</th><th>読み</th><th>意味</th><th>ページ</th></tr>
<tr><td>$\forall$</td><td>フォーオール</td><td>すべての</td><td>[[logic-quantifiers]]</td></tr>
<tr><td>$\exists$</td><td>イグジスト</td><td>存在する</td><td>[[logic-quantifiers]]</td></tr>
<tr><td>$\neg,\ \land,\ \lor$</td><td>ノット、アンド、オア</td><td>否定、かつ、または</td><td>[[propositional-logic]]</td></tr>
<tr><td>$\Rightarrow,\ \iff$</td><td>ならば、同値</td><td></td><td>[[propositional-logic]]</td></tr>
<tr><td>$:=,\ :\Longleftrightarrow$</td><td>定義する</td><td></td><td>[[notation-symbols]]</td></tr></table>` },
      { t: 'h2', id: 'set', text: '集合と写像' },
      { t: 'table', html: R`<table class="tbl"><tr><th>記号</th><th>読み</th><th>意味</th><th>ページ</th></tr>
<tr><td>$\in,\ \notin$</td><td>属する</td><td>元である／でない</td><td>[[sets]]</td></tr>
<tr><td>$\subset$</td><td>含まれる</td><td>部分集合（等号を含む）</td><td>[[sets]]</td></tr>
<tr><td>$\cup,\ \cap,\ \setminus,\ A^c$</td><td>カップ、キャップ</td><td>和、共通部分、差、補集合</td><td>[[sets]]</td></tr>
<tr><td>$\varnothing$</td><td>空集合</td><td></td><td>[[sets]]</td></tr>
<tr><td>$\mathbb{N},\mathbb{Z},\mathbb{Q},\mathbb{R},\mathbb{C}$</td><td>エヌ、ゼット、キュー、アール、シー</td><td>数の集合</td><td>[[sets]]</td></tr>
<tr><td>$(a,b),\ [a,b]$</td><td>開区間、閉区間</td><td></td><td>[[sets]]</td></tr>
<tr><td>$f:X\to Y$</td><td></td><td>写像</td><td>[[maps]]</td></tr>
<tr><td>$g\circ f$</td><td>ジー・マル・エフ</td><td>合成</td><td>[[maps]]</td></tr>
<tr><td>$f^{-1}$</td><td>エフインバース</td><td>逆写像・逆像</td><td>[[maps]]</td></tr></table>` },
      { t: 'h2', id: 'analysis', text: '解析' },
      { t: 'table', html: R`<table class="tbl"><tr><th>記号</th><th>読み</th><th>意味</th><th>ページ</th></tr>
<tr><td>$|x|$</td><td>絶対値</td><td></td><td>[[abs-triangle]]</td></tr>
<tr><td>$\sup A,\ \inf A$</td><td>スープ、インフ</td><td>上限、下限</td><td>[[supremum]]</td></tr>
<tr><td>$\max,\ \min$</td><td>マックス、ミン</td><td>最大値、最小値</td><td>[[notation-symbols]]</td></tr>
<tr><td>$\lim_{n\to\infty}a_n$</td><td>リミット</td><td>極限</td><td>[[sequence-convergence]]</td></tr>
<tr><td>$\sum,\ \prod$</td><td>シグマ、パイ</td><td>和、積</td><td>[[sigma-notation]]</td></tr>
<tr><td>$f'(a),\ \frac{df}{dx}$</td><td>エフダッシュ</td><td>微分係数、導関数</td><td>[[differentiability]]</td></tr>
<tr><td>$C(I)$</td><td>シー・アイ</td><td>$I$ 上の連続関数全体</td><td>[[continuity#def-ci|連続関数]]</td></tr>
<tr><td>$\varepsilon,\ \delta$</td><td>イプシロン、デルタ</td><td>小さい正の数</td><td>[[greek-letters]]</td></tr></table>` },
    ],
  });
})();
