/* 数式パーサーと、式を書き換えられる図（数列・ε-δ・中間値・接線・ロル／平均値・最大最小・部分列） */
(function () {
  'use strict';

  /* ================= 数式パーサー =================
     使える記号：+ - * / ^ ( )、変数 x または n、定数 pi e、
     関数 sin cos tan exp log ln sqrt cbrt abs sign floor step（x ≥ 0 で 1、x < 0 で 0）
     「;」で区切ると複数の式を一度に描ける（plot の図）。
     「2x」「3(x+1)」「x(x-1)」のような掛け算の省略も可。 */
  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp, log: Math.log, ln: Math.log,
    sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, sign: Math.sign, floor: Math.floor,
    step: (x) => (x >= 0 ? 1 : 0),
  };
  const CONSTS = { pi: Math.PI, e: Math.E };
  const WORDS = Object.keys(FUNCS).concat(Object.keys(CONSTS), ['n', 'x']).sort((a, b) => b.length - a.length);

  function tokenize(src) {
    const s = String(src).replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/π/g, 'pi');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        const v = Number(s.slice(i, j));
        if (isNaN(v)) throw new Error('数の書き方が正しくない');
        out.push({ k: 'num', v }); i = j;
      } else if (/[a-z]/i.test(c)) {
        let j = i; while (j < s.length && /[a-z]/i.test(s[j])) j++;
        let w = s.slice(i, j).toLowerCase();
        while (w.length) {
          const f = WORDS.find((k) => w.startsWith(k));
          if (!f) throw new Error('「' + w + '」は使えない記号');
          out.push(FUNCS[f] ? { k: 'fn', v: f } : f === 'n' || f === 'x' ? { k: 'var' } : { k: 'num', v: CONSTS[f] });
          w = w.slice(f.length);
        }
        i = j;
      } else if ('+-*/^()'.includes(c)) { out.push({ k: 'op', v: c }); i++; }
      else throw new Error('「' + c + '」は使えない記号');
    }
    const res = [];
    for (const b of out) {
      const a = res[res.length - 1];
      const endsVal = a && (a.k === 'num' || a.k === 'var' || (a.k === 'op' && a.v === ')'));
      const startsVal = b.k === 'num' || b.k === 'var' || b.k === 'fn' || (b.k === 'op' && b.v === '(');
      if (endsVal && startsVal) res.push({ k: 'op', v: '*' });
      res.push(b);
    }
    return res;
  }

  function parse(src) {
    const T = tokenize(src);
    let p = 0;
    const isOp = (v) => T[p] && T[p].k === 'op' && T[p].v === v;
    const expr = () => { let n = term(); while (isOp('+') || isOp('-')) { const o = T[p++].v; n = { o, a: n, b: term() }; } return n; };
    const term = () => { let n = unary(); while (isOp('*') || isOp('/')) { const o = T[p++].v; n = { o, a: n, b: unary() }; } return n; };
    const unary = () => { if (isOp('-')) { p++; return { o: 'neg', a: unary() }; } if (isOp('+')) { p++; return unary(); } return power(); };
    const power = () => { const base = atom(); if (isOp('^')) { p++; return { o: '^', a: base, b: unary() }; } return base; };
    function atom() {
      const t = T[p];
      if (!t) throw new Error('式が途中で終わっている');
      if (t.k === 'num') { p++; return { o: 'num', v: t.v }; }
      if (t.k === 'var') { p++; return { o: 'var' }; }
      if (t.k === 'fn') {
        p++;
        if (!isOp('(')) throw new Error(t.v + ' の後には ( が必要');
        p++; const a = expr();
        if (!isOp(')')) throw new Error(') が足りない');
        p++; return { o: 'fn', f: t.v, a };
      }
      if (isOp('(')) { p++; const a = expr(); if (!isOp(')')) throw new Error(') が足りない'); p++; return a; }
      throw new Error('「' + (t.v || '') + '」の位置がおかしい');
    }
    const tree = expr();
    if (p < T.length) throw new Error('式の終わりに余分な記号がある');
    return tree;
  }
  function ev(nd, x) {
    switch (nd.o) {
      case 'num': return nd.v;
      case 'var': return x;
      case 'neg': return -ev(nd.a, x);
      case '+': return ev(nd.a, x) + ev(nd.b, x);
      case '-': return ev(nd.a, x) - ev(nd.b, x);
      case '*': return ev(nd.a, x) * ev(nd.b, x);
      case '/': return ev(nd.a, x) / ev(nd.b, x);
      case '^': return Math.pow(ev(nd.a, x), ev(nd.b, x));
      case 'fn': return FUNCS[nd.f](ev(nd.a, x));
    }
    return NaN;
  }
  function compile(src) { const t = parse(src); return (x) => ev(t, x); }
  function num(src) {
    const v = compile(src)(0);
    if (!isFinite(v)) throw new Error('「' + src + '」の値が定まらない');
    return v;
  }

  /* ================= 描画の道具 ================= */
  let uid = 0;
  const fmt = (v) => {
    if (!isFinite(v)) return '—';
    const a = Math.abs(v);
    if (a !== 0 && (a < 0.01 || a >= 1e4)) return v.toExponential(1);
    return String(+v.toFixed(a < 0.1 ? 3 : 2));
  };
  function niceStep(r) {
    const raw = r / 6, p = Math.pow(10, Math.floor(Math.log10(raw))), m = raw / p;
    return (m < 1.5 ? 1 : m < 3 ? 2 : m < 7 ? 5 : 10) * p;
  }
  function autoY(f, xmin, xmax, extra) {
    const v = [];
    for (let i = 0; i <= 400; i++) { const y = f(xmin + (xmax - xmin) * i / 400); if (isFinite(y)) v.push(y); }
    v.sort((a, b) => a - b);
    let lo = v.length ? v[Math.floor(v.length * 0.02)] : -1, hi = v.length ? v[Math.ceil(v.length * 0.98) - 1] : 1;
    (extra || []).forEach((y) => { if (isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } });
    if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.1;
    return [lo - pad, hi + pad];
  }
  /* 座標系：軸・目盛り・クリップ領域 */
  function frame(o) {
    const W = o.W || 680, H = o.H || 260, L = 44, R = 14, T = 12, B = 26;
    const { xmin, xmax, ymin, ymax } = o;
    const X = (x) => L + (x - xmin) / (xmax - xmin) * (W - L - R);
    const Y = (y) => T + (ymax - y) / (ymax - ymin) * (H - T - B);
    const id = 'c' + (++uid);
    let s = `<defs><clipPath id="${id}"><rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}"/></clipPath>
      <pattern id="${id}h" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="rgba(242,194,48,.22)"/><line x1="0" y1="0" x2="0" y2="7" stroke="#b08a10" stroke-width="1" stroke-opacity=".45"/></pattern>
      <pattern id="${id}v" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="7" height="7" fill="rgba(35,61,107,.08)"/><line x1="0" y1="0" x2="0" y2="7" stroke="#233d6b" stroke-width="1" stroke-opacity=".28"/></pattern></defs>`;
    const sx = niceStep(xmax - xmin), sy = niceStep(ymax - ymin);
    for (let t = Math.ceil(xmin / sx) * sx; t <= xmax + 1e-9; t += sx) s += `<line class="grid" x1="${X(t)}" x2="${X(t)}" y1="${T}" y2="${H - B}"/><text class="lab sm" x="${X(t)}" y="${H - 9}" text-anchor="middle">${fmt(+t.toFixed(10))}</text>`;
    for (let t = Math.ceil(ymin / sy) * sy; t <= ymax + 1e-9; t += sy) s += `<line class="grid" x1="${L}" x2="${W - R}" y1="${Y(t)}" y2="${Y(t)}"/><text class="lab sm" x="${L - 6}" y="${Y(t) + 3.5}" text-anchor="end">${fmt(+t.toFixed(10))}</text>`;
    const y0 = ymin <= 0 && ymax >= 0 ? Y(0) : H - B, x0 = xmin <= 0 && xmax >= 0 ? X(0) : L;
    s += `<line class="axis" x1="${L}" x2="${W - R}" y1="${y0}" y2="${y0}"/><line class="axis" x1="${x0}" x2="${x0}" y1="${T}" y2="${H - B}"/>`;
    return { X, Y, W, H, L, R, T, B, id, s, clip: `clip-path="url(#${id})"`, hatchH: `url(#${id}h)`, hatchV: `url(#${id}v)` };
  }
  /* 曲線：値が飛ぶところ（不連続点）では線を切る */
  function curve(F, f, a, b, cls, n) {
    n = n || 800;
    let d = '', prev = null;
    const jump = (F.H - F.T - F.B) * 0.35;
    for (let i = 0; i <= n; i++) {
      const x = a + (b - a) * i / n, y = f(x);
      if (!isFinite(y)) { prev = null; continue; }
      const px = F.X(x), py = Math.max(-2000, Math.min(2000, F.Y(y)));
      if (prev && Math.abs(py - prev) < jump) d += `L${px.toFixed(1)},${py.toFixed(1)}`;
      else d += `M${px.toFixed(1)},${py.toFixed(1)}`;
      prev = py;
    }
    return `<path class="${cls || 'curve'}" d="${d}" ${F.clip}/>`;
  }
  const svgWrap = (F, inner) => `<svg viewBox="0 0 ${F.W} ${F.H}" role="img">${F.s}${inner}</svg>`;
  const dot = (F, x, y, cls, r) => `<circle class="${cls}" cx="${F.X(x)}" cy="${F.Y(y)}" r="${r || 4.5}"/>`;
  const vline = (F, x, cls) => `<line class="${cls}" x1="${F.X(x)}" x2="${F.X(x)}" y1="${F.T}" y2="${F.H - F.B}"/>`;
  const hline = (F, y, cls) => `<line class="${cls}" x1="${F.L}" x2="${F.W - F.R}" y1="${F.Y(y)}" y2="${F.Y(y)}" ${F.clip}/>`;
  const text = (F, x, y, t, cls, anchor, dx, dy) => `<text class="lab ${cls || ''}" x="${F.X(x) + (dx || 0)}" y="${F.Y(y) + (dy || 0)}" text-anchor="${anchor || 'start'}">${t}</text>`;
  const seg = (F, x1, y1, x2, y2, cls) => `<line class="${cls}" x1="${F.X(x1)}" y1="${F.Y(y1)}" x2="${F.X(x2)}" y2="${F.Y(y2)}" ${F.clip}/>`;

  /* 数値微分（左右の差分商） */
  const dLeft = (f, x, k) => (f(x) - f(x - k)) / k;
  const dRight = (f, x, k) => (f(x + k) - f(x)) / k;
  const dCenter = (f, x, k) => (f(x + k) - f(x - k)) / (2 * k);
  function bisect(g, lo, hi) {
    let glo = g(lo);
    for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2, gm = g(m); if (!isFinite(gm)) return null; if ((gm < 0) === (glo < 0)) { lo = m; glo = gm; } else hi = m; }
    return (lo + hi) / 2;
  }

  /* ================= 図の種類 ================= */
  const logRange = (lo, hi) => ({ to: (v) => Math.round(1000 * Math.log(v / lo) / Math.log(hi / lo)), from: (s) => lo * Math.pow(hi / lo, s / 1000) });

  const TYPES = {};

  /* ---- 数列と ε 帯 ---- */
  const NCHECK = 5000;
  function findN(f, alpha, eps) {
    let last = 0;
    for (let n = 1; n <= NCHECK; n++) {
      const v = f(n);
      if (!isFinite(v)) return { error: 'n = ' + n + ' で値が定まらない' };
      if (Math.abs(v - alpha) >= eps) last = n;
    }
    return last >= NCHECK - 1 ? { N: null } : { N: last + 1 };
  }
  TYPES.seq = {
    presets: {
      alt: { label: '1 + (−1)ⁿ·1.2 / n', expr: '1 + (-1)^n*1.2/n', alpha: '1', eps: 0.25 },
      inv: { label: '1 / n', expr: '1/n', alpha: '0', eps: 0.15 },
      e: { label: '(1 + 1/n)ⁿ → e', expr: '(1+1/n)^n', alpha: 'e', eps: 0.08 },
      sinn: { label: 'sin(n) / n', expr: 'sin(n)/n', alpha: '0', eps: 0.1 },
      sqrt: { label: '√(n+1) − √n', expr: 'sqrt(n+1)-sqrt(n)', alpha: '0', eps: 0.1 },
      osc: { label: '(−1)ⁿ（発散）', expr: '(-1)^n', alpha: '1', eps: 0.5 },
    },
    fields: [
      { k: 'expr', label: '$a_n =$', kind: 'text', w: 200 },
      { k: 'alpha', label: '$\\alpha =$', kind: 'num' },
      { k: 'eps', label: '$\\varepsilon$', kind: 'range', ...logRange(0.01, 1) },
    ],
    play: { k: 'eps', from: 0.8, to: 0.02, label: 'ε を小さくしていく' },
    frames: (st) => [st.eps * 2, st.eps, st.eps / 2.5].map((e) => ({ eps: Math.min(1, Math.max(0.01, e)) })),
    draw(st, sz) {
      const f = st.fn, alpha = st.alphaV, eps = st.eps;
      const r = findN(f, alpha, eps);
      if (r.error) return { msg: r.error };
      const N = r.N;
      const W = sz.W || 680, H = sz.H || 240, L = 54, Rr = 18, T = 16, B = 30;
      let nMax = N ? Math.ceil(N * 1.6) + 6 : 30;
      nMax = Math.max(24, Math.min(nMax, 160));
      const vals = [];
      for (let n = 1; n <= nMax; n++) vals.push(f(n));
      let lo = Math.min(alpha - eps, ...vals), hi = Math.max(alpha + eps, ...vals);
      const cap = Math.max(eps * 12, 0.5);
      lo = Math.max(lo, alpha - cap); hi = Math.min(hi, alpha + cap);
      const pad = (hi - lo) * 0.08 || 0.5; lo -= pad; hi += pad;
      const dx = (W - L - Rr) / nMax;
      const x = (n) => L + (n - 0.5) * dx;
      const y = (v) => T + (hi - Math.max(lo, Math.min(hi, v))) * (H - T - B) / (hi - lo);
      const r0 = Math.max(2, Math.min(4.4, dx * 0.32));
      const id = 'h' + (++uid);
      let s = `<defs><pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="rgba(242,194,48,.20)"/><line x1="0" y1="0" x2="0" y2="7" stroke="#b08a10" stroke-width="1" stroke-opacity=".45"/></pattern></defs>`;
      s += `<rect x="${L}" y="${y(alpha + eps)}" width="${W - L - Rr}" height="${y(alpha - eps) - y(alpha + eps)}" fill="url(#${id})"/>`;
      s += `<line class="edge" x1="${L}" x2="${W - Rr}" y1="${y(alpha + eps)}" y2="${y(alpha + eps)}"/><line class="edge" x1="${L}" x2="${W - Rr}" y1="${y(alpha - eps)}" y2="${y(alpha - eps)}"/>`;
      s += `<line class="alpha" x1="${L}" x2="${W - Rr}" y1="${y(alpha)}" y2="${y(alpha)}"/>`;
      s += `<line class="axis" x1="${L}" x2="${W - Rr}" y1="${H - B}" y2="${H - B}"/><line class="axis" x1="${L}" x2="${L}" y1="${T}" y2="${H - B}"/>`;
      if (N && N <= nMax) { const xn = x(N) - dx / 2; s += `<line class="nline" x1="${xn}" x2="${xn}" y1="${T}" y2="${H - B}"/><text class="lab acc" x="${xn + 5}" y="${T + 11}">N = ${N}</text>`; }
      s += `<text class="lab" x="${L - 8}" y="${y(alpha) + 4}" text-anchor="end">α</text>`;
      if (y(alpha - eps) - y(alpha + eps) > 22) s += `<text class="lab sm" x="${L - 8}" y="${y(alpha + eps) + 4}" text-anchor="end">α+ε</text><text class="lab sm" x="${L - 8}" y="${y(alpha - eps) + 4}" text-anchor="end">α−ε</text>`;
      const step = nMax <= 30 ? 4 : nMax <= 60 ? 10 : 20;
      for (let n = 1; n <= nMax; n++) {
        const v = vals[n - 1];
        const inside = N ? n >= N : Math.abs(v - alpha) < eps;
        s += `<line class="stem" x1="${x(n)}" x2="${x(n)}" y1="${y(alpha)}" y2="${y(v)}"/>`;
        if (v < lo || v > hi) s += `<path d="M${x(n) - 4},${y(v) + (v > hi ? 6 : -6)} L${x(n)},${y(v)} L${x(n) + 4},${y(v) + (v > hi ? 6 : -6)}" fill="none" stroke="#777"/>`;
        else s += `<circle class="${inside ? 'pin' : 'pout'}" cx="${x(n)}" cy="${y(v)}" r="${r0}"/>`;
        if (n === 1 || n % step === 0) s += `<text class="lab sm" x="${x(n)}" y="${H - 12}" text-anchor="middle">${n}</text>`;
      }
      s += `<text class="lab sm" x="${W - Rr}" y="${H - 12}" text-anchor="end">n</text>`;
      return {
        svg: `<svg viewBox="0 0 ${W} ${H}" role="img">${s}</svg>`,
        out: N ? 'N = ' + N : 'N は見つからない',
        msg: N ? '' : `n ≤ ${NCHECK} の範囲では、帯の外に出る項が最後まで現れる。この α には収束していない可能性が高い。`,
        cap: `ε = ${fmt(eps)}　${N ? 'N = ' + N : 'N なし'}`,
      };
    },
  };

  /* ---- 関数の極限・連続（ε-δ） ---- */
  function findDelta(f, a, L, eps, R) {
    let dmin = R;
    const check = (x) => { const v = f(x); if (isFinite(v) && Math.abs(v - L) >= eps) dmin = Math.min(dmin, Math.abs(x - a)); };
    for (let i = 1; i <= 4000; i++) { const t = (i / 4000) * R; check(a + t); check(a - t); }
    for (let j = 1; j <= 52; j++) { const t = R * Math.pow(2, -j); check(a + t); check(a - t); }
    return dmin < R * 1e-9 ? null : dmin;
  }
  TYPES.epsdelta = {
    presets: {
      sq: { label: 'x²（a = 1）', expr: 'x^2', a: '1', L: '1', eps: 0.5, R: 1.5 },
      sinc: { label: 'sin(x)/x（a = 0）', expr: 'sin(x)/x', a: '0', L: '1', eps: 0.1, R: 6 },
      xsin: { label: 'x·sin(1/x)（a = 0）', expr: 'x*sin(1/x)', a: '0', L: '0', eps: 0.15, R: 0.6 },
      sqrt: { label: '√x（a = 1）', expr: 'sqrt(x)', a: '1', L: '1', eps: 0.25, R: 1 },
      rec: { label: '1/x（a = 1）', expr: '1/x', a: '1', L: '1', eps: 0.3, R: 0.9 },
      sign: { label: 'sign(x)（a = 0・極限なし）', expr: 'sign(x)', a: '0', L: '0', eps: 0.5, R: 1 },
    },
    fields: [
      { k: 'expr', label: '$f(x) =$', kind: 'text', w: 170 },
      { k: 'a', label: '$a =$', kind: 'num' },
      { k: 'L', label: '$L =$', kind: 'num', hideIf: (st) => st.cont },
      { k: 'eps', label: '$\\varepsilon$', kind: 'range', ...logRange(0.01, 2) },
    ],
    play: { k: 'eps', from: 1.5, to: 0.02, label: 'ε を小さくしていく' },
    frames: (st) => [st.eps * 2, st.eps, st.eps / 3].map((e) => ({ eps: Math.min(2, Math.max(0.01, e)) })),
    draw(st, sz) {
      const f = st.fn, a = st.aV, R = st.R || 1.5;
      const L = st.cont ? f(a) : st.LV;
      if (!isFinite(L)) return { msg: 'f(a) の値が定まらない（連続を調べるには a で定義されている必要がある）' };
      const eps = st.eps;
      const dm = findDelta(f, a, L, eps, R);
      const delta = dm ? Math.min(dm * 0.96, R) : null;
      const xmin = a - R, xmax = a + R;
      const [ymin, ymax] = autoY(f, xmin, xmax, [L - eps * 1.3, L + eps * 1.3]);
      const F = frame({ W: sz.W, H: sz.H, xmin, xmax, ymin, ymax });
      let s = `<rect x="${F.L}" y="${F.Y(L + eps)}" width="${F.W - F.L - F.R}" height="${F.Y(L - eps) - F.Y(L + eps)}" fill="${F.hatchH}" ${F.clip}/>`;
      s += hline(F, L + eps, 'edge') + hline(F, L - eps, 'edge') + hline(F, L, 'alpha');
      if (delta) {
        s += `<rect x="${F.X(a - delta)}" y="${F.T}" width="${F.X(a + delta) - F.X(a - delta)}" height="${F.H - F.T - F.B}" fill="${F.hatchV}"/>`;
        s += vline(F, a - delta, 'dedge') + vline(F, a + delta, 'dedge');
      }
      s += vline(F, a, 'aline');
      s += curve(F, f, xmin, xmax, 'curve');
      if (delta) s += curve(F, f, a - delta, a + delta, 'curve hi', 400);
      const fa = f(a);
      if (st.cont) s += dot(F, a, L, 'pin');
      else { s += `<circle class="pout" cx="${F.X(a)}" cy="${F.Y(L)}" r="4.5"/>`; if (isFinite(fa) && Math.abs(fa - L) > 1e-9 && fa >= ymin && fa <= ymax) s += dot(F, a, fa, 'pin', 3.5); }
      s += text(F, xmin, L, st.cont ? 'f(a)' : 'L', 'acc', 'start', 4, -5);
      if (delta && F.X(a + delta) - F.X(a - delta) > 34) { s += text(F, a - delta, ymin, 'a−δ', 'sm nav', 'middle', 0, -4) + text(F, a + delta, ymin, 'a+δ', 'sm nav', 'middle', 0, -4); }
      return {
        svg: svgWrap(F, s),
        out: delta ? 'δ = ' + fmt(delta) : 'δ は見つからない',
        msg: delta ? '' : `a のどれだけ近くにも、帯の外に出る点がある。${st.cont ? 'f は a で連続でない' : 'x → a のとき f(x) は L に近づかない'}。`,
        cap: `ε = ${fmt(eps)}　${delta ? 'δ = ' + fmt(delta) : 'δ なし'}`,
      };
    },
  };

  /* ---- 中間値の定理 ---- */
  TYPES.ivt = {
    presets: {
      cubic: { label: 'x³ − x − 1 on [1, 2]', expr: 'x^3 - x - 1', a: '1', b: '2', t: 1 / 6 },
      wave: { label: 'sin(3x) + x on [0, 3]', expr: 'sin(3x) + x', a: '0', b: '3', t: 0.42 },
      cos: { label: 'cos(x) − x on [0, π/2]', expr: 'cos(x) - x', a: '0', b: 'pi/2', t: 0.389 },
      jump: { label: '不連続：0.5·sign(x−1) + 0.3x on [0, 2]', expr: '0.5*sign(x-1) + 0.3*x', a: '0', b: '2', t: 0.38 },
    },
    fields: [
      { k: 'expr', label: '$f(x) =$', kind: 'text', w: 170 },
      { k: 'a', label: '$a =$', kind: 'num' },
      { k: 'b', label: '$b =$', kind: 'num' },
      { k: 't', label: '$c$', kind: 'range', to: (v) => Math.round(v * 1000), from: (s) => s / 1000, show: (st) => fmt(st.fn(st.aV) + st.t * (st.fn(st.bV) - st.fn(st.aV))) },
    ],
    play: { k: 't', from: 0.02, to: 0.98, linear: true, label: 'c を動かす' },
    frames: () => [{ t: 0.25 }, { t: 0.5 }, { t: 0.75 }],
    draw(st, sz) {
      const f = st.fn, a = st.aV, b = st.bV;
      if (!(b > a)) return { msg: 'a < b となるように入力してください' };
      const fa = f(a), fb = f(b);
      if (!isFinite(fa) || !isFinite(fb)) return { msg: 'f(a) または f(b) の値が定まらない' };
      if (Math.abs(fb - fa) < 1e-12) return { msg: 'f(a) = f(b) なので、間の値 c をとれない' };
      const c = fa + st.t * (fb - fa), up = fb > fa;
      const g = (x) => f(x) - c;
      // S = { x ∈ [a,b] : f(x) が c の「始点側」にある }、s = sup S
      const n = 3000;
      let s = a;
      const segs = [];
      let open = null;
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n, v = f(x);
        const inS = isFinite(v) && (up ? v < c : v > c);
        if (inS) { s = x; if (open == null) open = x; } else if (open != null) { segs.push([open, a + (b - a) * (i - 1) / n]); open = null; }
      }
      if (open != null) segs.push([open, b]);
      const roots = [];
      for (let i = 0; i < n; i++) {
        const x0 = a + (b - a) * i / n, x1 = a + (b - a) * (i + 1) / n, g0 = g(x0), g1 = g(x1);
        if (!isFinite(g0) || !isFinite(g1)) continue;
        if (g0 === 0) roots.push(x0);
        else if ((g0 < 0) !== (g1 < 0)) { const r = bisect(g, x0, x1); if (r != null && Math.abs(g(r)) < 1e-6 * (1 + Math.abs(c))) roots.push(r); }
      }
      const pad = (b - a) * 0.08;
      const [ymin, ymax] = autoY(f, a - pad, b + pad, [fa, fb, c]);
      const F = frame({ W: sz.W, H: sz.H, xmin: a - pad, xmax: b + pad, ymin, ymax });
      let h = '';
      const yb = F.H - F.B;
      segs.forEach(([p, q]) => (h += `<line class="sband" x1="${F.X(p)}" x2="${F.X(q)}" y1="${yb - 3}" y2="${yb - 3}"/>`));
      h += vline(F, a, 'aline') + vline(F, b, 'aline');
      h += hline(F, c, 'cline');
      h += curve(F, f, a - pad, b + pad, 'curve');
      h += dot(F, a, fa, 'pend', 4) + dot(F, b, fb, 'pend', 4);
      h += vline(F, s, 'sline') + `<text class="lab nav" x="${F.X(s) + 4}" y="${F.T + 11}">s = sup S</text>`;
      roots.forEach((r, i) => (h += dot(F, r, c, 'pin', 5) + text(F, r, c, 'ξ' + (roots.length > 1 ? sub(i + 1) : ''), 'acc', 'middle', 0, -9)));
      h += text(F, a - pad, c, 'c', 'acc', 'start', 4, -5);
      h += text(F, a, ymin, 'a', 'sm', 'middle', 0, -4) + text(F, b, ymin, 'b', 'sm', 'middle', 0, -4);
      return {
        svg: svgWrap(F, h),
        out: roots.length ? `f(ξ) = c となる ξ：${roots.map(fmt).join(', ')}` : 'f(ξ) = c となる ξ がない',
        msg: roots.length ? '' : 'f が連続でないため、間の値 c をとばしてしまう。中間値の定理は「連続」の仮定がないと成り立たない。',
        cap: `c = ${fmt(c)}　${roots.length ? 'ξ ≈ ' + roots.map(fmt).join(', ') : 'ξ なし'}`,
      };
    },
  };
  const sub = (k) => String(k).split('').map((d) => '₀₁₂₃₄₅₆₇₈₉'[+d]).join('');

  /* ---- 割線と接線 ---- */
  TYPES.tangent = {
    presets: {
      sq: { label: 'x²（a = 1）', expr: 'x^2', a: '1', h: 0.8, R: 2 },
      sin: { label: 'sin x（a = 0.8）', expr: 'sin(x)', a: '0.8', h: 0.9, R: 3 },
      abs: { label: '|x|（a = 0・微分不可能）', expr: 'abs(x)', a: '0', h: 0.7, R: 1.5 },
      xabs: { label: 'x|x|（a = 0・微分可能）', expr: 'x*abs(x)', a: '0', h: 0.7, R: 1.5 },
      cbrt: { label: '∛x（a = 0・接線が垂直）', expr: 'cbrt(x)', a: '0', h: 0.7, R: 1.5 },
      peak: { label: '1 − (x−1)²（頂上 a = 1）', expr: '1-(x-1)^2', a: '1', h: 0.6, R: 1.2 },
    },
    fields: [
      { k: 'expr', label: '$f(x) =$', kind: 'text', w: 170 },
      { k: 'a', label: '$a =$', kind: 'num' },
      { k: 'h', label: '$h$', kind: 'range', to: (v) => Math.round(Math.sign(v) * 1000 * (Math.log10(Math.abs(v)) + 3) / 3.2), from: (s) => (s < 0 ? -1 : 1) * Math.pow(10, -3 + 3.2 * Math.max(Math.abs(s), 1) / 1000), min: -1000 },
    ],
    play: { k: 'h', from: 1.2, to: 0.002, label: 'h を 0 に近づける' },
    frames: () => [{ h: 1 }, { h: 0.4 }, { h: 0.08 }],
    draw(st, sz) {
      const f = st.fn, a = st.aV, h = st.h, R = st.R || 2;
      const fa = f(a), fh = f(a + h);
      if (!isFinite(fa) || !isFinite(fh)) return { msg: 'f(a) または f(a+h) の値が定まらない' };
      const m = (fh - fa) / h;
      const k = 1e-6, dl = dLeft(f, a, k), dr = dRight(f, a, k);
      const big = Math.abs(dl) > 1e4 || Math.abs(dr) > 1e4;
      const diff = !big && Math.abs(dl - dr) < 1e-3 * (1 + Math.abs(dl));
      const d = (dl + dr) / 2;
      const xmin = a - R, xmax = a + R;
      const [ymin, ymax] = autoY(f, xmin, xmax, [fa]);
      const F = frame({ W: sz.W, H: sz.H, xmin, xmax, ymin, ymax });
      let s = curve(F, f, xmin, xmax, 'curve');
      s += seg(F, xmin, fa + m * (xmin - a), xmax, fa + m * (xmax - a), 'secant');
      if (diff) s += seg(F, xmin, fa + d * (xmin - a), xmax, fa + d * (xmax - a), 'tan');
      else if (!big) { s += seg(F, a, fa, xmax, fa + dr * (xmax - a), 'tan half') + seg(F, xmin, fa + dl * (xmin - a), a, fa, 'tan half'); }
      s += `<line class="hstep" x1="${F.X(a)}" x2="${F.X(a + h)}" y1="${F.Y(fa)}" y2="${F.Y(fa)}" ${F.clip}/><line class="hstep" x1="${F.X(a + h)}" x2="${F.X(a + h)}" y1="${F.Y(fa)}" y2="${F.Y(fh)}" ${F.clip}/>`;
      s += dot(F, a, fa, 'pnav', 4.5) + dot(F, a + h, fh, 'pin', 4.5);
      s += text(F, a, fa, 'P', 'nav', 'end', -7, -7) + text(F, a + h, fh, 'Q', 'acc', 'start', 7, -7);
      return {
        svg: svgWrap(F, s),
        out: `割線の傾き = ${fmt(m)}　／　${diff ? "f′(a) ≈ " + fmt(d) : big ? '傾きが無限大' : '左右の傾き ' + fmt(dl) + ' と ' + fmt(dr)}`,
        msg: diff ? '' : big ? '差分商が限りなく大きくなる（接線が垂直）。極限が実数にならないので、a で微分可能でない。' : 'h > 0 と h < 0 で差分商の行き先が違う。極限が一つに定まらないので、a で微分可能でない。',
        cap: `h = ${fmt(h)}　傾き ${fmt(m)}`,
      };
    },
  };

  /* ---- ロルの定理・平均値の定理・最大最小 ---- */
  function fnPlot(mode) {
    return {
      presets: mode === 'extrema' ? {
        poly: { label: 'x³ − 3x on [−1.8, 2.2]', expr: 'x^3 - 3x', a: '-1.8', b: '2.2' },
        wave: { label: 'sin x + 0.5 sin 3x on [0, 4]', expr: 'sin(x) + 0.5*sin(3x)', a: '0', b: '4' },
        abs: { label: '|x − 1| − x/3 on [−1, 3]', expr: 'abs(x-1) - x/3', a: '-1', b: '3' },
      } : mode === 'rolle' ? {
        sin: { label: 'sin x on [0, π]', expr: 'sin(x)', a: '0', b: 'pi' },
        poly: { label: 'x(x−1)(x−2) on [0, 2]', expr: 'x(x-1)(x-2)', a: '0', b: '2' },
        wave: { label: 'sin 3x + 0.3 on [0, π]', expr: 'sin(3x) + 0.3', a: '0', b: 'pi' },
        abs: { label: '|x| on [−1, 1]（微分不可能な点あり）', expr: 'abs(x)', a: '-1', b: '1' },
        semi: { label: '半円 √(1−x²) on [−1, 1]（端点で接線が垂直）', expr: 'sqrt(1-x^2)', a: '-1', b: '1' },
        sin2: { label: 'sin x on [0, 2π]（c が二つ）', expr: 'sin(x)', a: '0', b: '2pi' },
        jumpend: { label: 'x − step(x−1) on [0, 1]（端点で不連続）', expr: 'x - step(x-1)', a: '0', b: '1' },
        lin: { label: 'x on [0, 1]（f(a) ≠ f(b)）', expr: 'x', a: '0', b: '1' },
      } : {
        cubic: { label: 'x³ on [−1, 2]', expr: 'x^3', a: '-1', b: '2' },
        sqrt: { label: '√x on [0, 4]', expr: 'sqrt(x)', a: '0', b: '4' },
        exp: { label: 'eˣ on [0, 1]', expr: 'exp(x)', a: '0', b: '1' },
        e2x: { label: 'e²ˣ on [2, 5]', expr: 'exp(2x)', a: '2', b: '5' },
        abs: { label: '|x| on [−1, 2]（微分不可能な点あり）', expr: 'abs(x)', a: '-1', b: '2' },
      },
      fields: [
        { k: 'expr', label: '$f(x) =$', kind: 'text', w: 170 },
        { k: 'a', label: '$a =$', kind: 'num' },
        { k: 'b', label: '$b =$', kind: 'num' },
      ],
      draw(st, sz) {
        const f = st.fn, a = st.aV, b = st.bV;
        if (!(b > a)) return { msg: 'a < b となるように入力してください' };
        const fa = f(a), fb = f(b);
        if (!isFinite(fa) || !isFinite(fb)) return { msg: 'f(a) または f(b) の値が定まらない' };
        const pad = (b - a) * 0.08;
        const [ymin, ymax] = autoY(f, a - pad, b + pad, [fa, fb]);
        const F = frame({ W: sz.W, H: sz.H, xmin: a - pad, xmax: b + pad, ymin, ymax });
        let s = vline(F, a, 'aline') + vline(F, b, 'aline');
        s += curve(F, f, a - pad, b + pad, 'curve faint') + curve(F, f, a, b, 'curve');
        s += text(F, a, ymin, 'a', 'sm', 'middle', 0, -4) + text(F, b, ymin, 'b', 'sm', 'middle', 0, -4);
        const n = 2400, k = 1e-6;
        // 微分不可能な点（左右の差分商が食い違う点）
        const kinks = [];
        for (let i = 1; i < n; i++) {
          const x = a + (b - a) * i / n, x1 = a + (b - a) * (i + 1) / n;
          const d0 = dCenter(f, x, k), d1 = dCenter(f, x1, k);
          if (isFinite(d0) && isFinite(d1) && Math.abs(d1 - d0) > 0.5 * (1 + Math.abs(d0))) {
            const xm = (x + x1) / 2, sx = bisect((t) => dCenter(f, t, k) - (d0 + d1) / 2, x, x1) || xm;
            if (Math.abs(dLeft(f, sx, k) - dRight(f, sx, k)) > 1e-3 * (1 + Math.abs(d0)) && !kinks.some((q) => Math.abs(q - sx) < (b - a) / 200)) kinks.push(sx);
          }
        }
        // 不連続な点（値が跳ぶ点）。区間を半分ずつ狭めても差が残れば跳びとみなす。端点も含む
        const range = (ymax - ymin) || 1, jumps = [];
        for (let i = 0; i < n; i++) {
          let lo = a + (b - a) * i / n, hi = a + (b - a) * (i + 1) / n;
          if (!(Math.abs(f(hi) - f(lo)) > 0.15 * range)) continue;
          for (let r = 0; r < 40; r++) { const m = (lo + hi) / 2; if (Math.abs(f(m) - f(lo)) > Math.abs(f(hi) - f(m))) hi = m; else lo = m; }
          const q = (lo + hi) / 2;
          if (Math.abs(f(hi) - f(lo)) > 0.1 * range && !jumps.some((t) => Math.abs(t - q) < (b - a) / 200)) jumps.push(q);
        }
        for (let i = kinks.length - 1; i >= 0; i--) if (jumps.some((t) => Math.abs(t - kinks[i]) < (b - a) / 100)) kinks.splice(i, 1);
        kinks.forEach((q) => (s += `<path class="kink" d="M${F.X(q) - 5},${F.Y(f(q)) - 5} l10,10 m0,-10 l-10,10"/>`));
        jumps.forEach((q) => (s += vline(F, q, 'jline') + `<text class="lab sm" x="${F.X(q) + 4}" y="${F.T + 11}">不連続</text>`));
        const jumpMsg = jumps.length ? `x ≈ ${jumps.map(fmt).join(', ')} で連続でない（値が跳んでいる）。` : '';
        if (mode === 'extrema') {
          let imax = a, imin = a;
          for (let i = 0; i <= n; i++) { const x = a + (b - a) * i / n, v = f(x); if (v > f(imax)) imax = x; if (v < f(imin)) imin = x; }
          s += hline(F, f(imax), 'maxline') + hline(F, f(imin), 'minline');
          s += dot(F, imax, f(imax), 'pin', 5.5) + text(F, imax, f(imax), '最大', 'acc', 'middle', 0, -10);
          s += dot(F, imin, f(imin), 'pnav', 5.5) + text(F, imin, f(imin), '最小', 'nav', 'middle', 0, 18);
          return { svg: svgWrap(F, s), out: `最大値 ${fmt(f(imax))}（x = ${fmt(imax)}）　最小値 ${fmt(f(imin))}（x = ${fmt(imin)}）`, msg: jumpMsg ? jumpMsg + '最大値・最小値の定理の仮定（連続）をみたさないので、最大・最小が存在するとは限らない。' : '', cap: '' };
        }
        const m = (fb - fa) / (b - a);
        const rolleOK = Math.abs(fb - fa) < 1e-9 * (1 + Math.abs(fa));
        s += seg(F, a, fa, b, fb, 'chord');
        s += dot(F, a, fa, 'pend', 4) + dot(F, b, fb, 'pend', 4);
        const g = (x) => dCenter(f, x, k) - m;
        const cs = [];
        for (let i = 1; i < n - 1; i++) {
          const x0 = a + (b - a) * i / n, x1 = a + (b - a) * (i + 1) / n, g0 = g(x0), g1 = g(x1);
          if (!isFinite(g0) || !isFinite(g1) || (g0 < 0) === (g1 < 0)) continue;
          const r = bisect(g, x0, x1);
          if (r == null) continue;
          const okDiff = Math.abs(dLeft(f, r, k) - dRight(f, r, k)) < 1e-3 * (1 + Math.abs(m));
          if (okDiff && Math.abs(g(r)) < 1e-3 * (1 + Math.abs(m)) && !cs.some((q) => Math.abs(q - r) < (b - a) / 500)) cs.push(r);
        }
        const L = (b - a) * 0.22;
        cs.forEach((c, i) => {
          s += seg(F, c - L, f(c) - m * L, c + L, f(c) + m * L, 'tan');
          s += dot(F, c, f(c), 'pnav', 4.5) + text(F, c, f(c), 'c' + (cs.length > 1 ? sub(i + 1) : ''), 'nav', 'middle', 0, m >= 0 ? 18 : -10);
        });
        const head = mode === 'rolle' ? (rolleOK ? '' : 'f(a) ≠ f(b) なので、ロルの定理の仮定をみたさない（平均値の定理の形なら成り立つ）。') : '';
        const fail = cs.length ? '' : jumps.length ? jumpMsg + '連続性の仮定が崩れているため、条件をみたす c が存在しない。' : kinks.length ? '微分不可能な点があるため、条件をみたす c が存在しない。' : '条件をみたす c が見つからない。';
        return {
          svg: svgWrap(F, s),
          out: `${mode === 'rolle' ? 'f(a) = ' + fmt(fa) + '，f(b) = ' + fmt(fb) : '弦の傾き = ' + fmt(m)}　／　${cs.length ? (mode === 'rolle' && rolleOK ? "f′(c) = 0" : "f′(c) = " + fmt(m)) + ' となる c：' + cs.map(fmt).join(', ') : 'c なし'}`,
          msg: head + fail,
          cap: '',
        };
      },
    };
  }
  TYPES.rolle = fnPlot('rolle');
  TYPES.mvt = fnPlot('mvt');
  TYPES.extrema = fnPlot('extrema');

  /* ---- 複数の式を重ねて描く（反例・模式図） ---- */
  TYPES.plot = {
    presets: {
      negh: { label: 'F(h) = −h on (0, 1]', expr: '-x', a: '0', b: '1', ends: 'oc', names: ['F(h)'] },
      inv: { label: 'x³ と ∛x（逆関数）', expr: 'x^3; cbrt(x)', a: '-1.5', b: '1.5', names: ['x³', '∛x'] },
      rho: { label: '階段関数 f と ρ(x) = f(x)/x', expr: 'step(x-1); step(x-1)/x', a: '-1', b: '3', names: ['f(x)', 'ρ(x)'] },
      xxd: { label: 'x²D(x) の模式図', expr: 'x^2; 0', a: '-1.2', b: '1.2', dashed: true, names: ['有理数での値 x²', '無理数での値 0'] },
      mvtF: { label: 'f = x³、弦、その差 F', expr: 'x^3; 3x+2; x^3-(3x+2)', a: '-1', b: '2', names: ['f(x) = x³', '弦 y = 3x + 2', 'F(x) = f(x) − 弦'] },
    },
    fields: [
      { k: 'expr', label: '$y =$', kind: 'text', w: 230 },
      { k: 'a', label: '$a =$', kind: 'num' },
      { k: 'b', label: '$b =$', kind: 'num' },
    ],
    draw(st, sz) {
      const fns = st.exprFns, a = st.aV, b = st.bV;
      if (!(b > a)) return { msg: 'a < b となるように入力してください' };
      let lo = Infinity, hi = -Infinity;
      fns.forEach((f) => { const [l, h] = autoY(f, a, b, []); lo = Math.min(lo, l); hi = Math.max(hi, h); });
      const pad = (b - a) * 0.04;
      const F = frame({ W: sz.W, H: sz.H, xmin: a - pad, xmax: b + pad, ymin: lo, ymax: hi });
      let s = '';
      const cls = (i) => (st.dashed ? 'curve dash' + (i ? ' alt' : '') : ['curve', 'curve alt', 'curve alt2'][Math.min(i, 2)]);
      fns.forEach((f, i) => (s += curve(F, f, a, b, cls(i))));
      const e = st.ends || '', f0 = fns[0];
      [[a, e[0], 1], [b, e[1], -1]].forEach(([x, t, dir]) => {
        if (!t) return;
        const v = t === 'o' ? f0(x + dir * 1e-9) : f0(x);
        if (isFinite(v)) s += `<circle class="${t === 'o' ? 'pout' : 'pend'}" cx="${F.X(x)}" cy="${F.Y(v)}" r="4.5"/>`;
      });
      const names = st.names || String(st.expr).split(';');
      names.forEach((nm, i) => {
        const y = F.T + 14 + i * 16;
        s += `<line class="${cls(i)}" x1="${F.L + 10}" x2="${F.L + 34}" y1="${y - 4}" y2="${y - 4}"/><text class="lab sm" x="${F.L + 40}" y="${y}">${nm}</text>`;
      });
      return { svg: svgWrap(F, s), out: '', msg: '', cap: '' };
    },
  };

  /* ---- 1次近似：接線からのずれ (x − a)ρ(x) ---- */
  TYPES.linear = {
    presets: {
      sq: { label: 'x²（a = 1）', expr: 'x^2', a: '1', h: 0.9, R: 1.6 },
      exp: { label: 'eˣ（a = 0）', expr: 'exp(x)', a: '0', h: 1, R: 1.6 },
      sin: { label: 'sin x（a = 0.5）', expr: 'sin(x)', a: '0.5', h: 1.2, R: 2 },
    },
    fields: [
      { k: 'expr', label: '$f(x) =$', kind: 'text', w: 170 },
      { k: 'a', label: '$a =$', kind: 'num' },
      { k: 'h', label: '$x-a$', kind: 'range', to: (v) => Math.round(Math.sign(v) * 1000 * (Math.log10(Math.abs(v)) + 3) / 3.2), from: (s) => (s < 0 ? -1 : 1) * Math.pow(10, -3 + 3.2 * Math.max(Math.abs(s), 1) / 1000), min: -1000 },
    ],
    play: { k: 'h', from: 1.4, to: 0.002, label: 'x を a に近づける' },
    frames: () => [{ h: 1 }, { h: 0.5 }, { h: 0.15 }],
    draw(st, sz) {
      const f = st.fn, a = st.aV, h = st.h, R = st.R || 1.6, fa = f(a), k = 1e-6;
      if (!isFinite(fa)) return { msg: 'f(a) の値が定まらない' };
      const dl = dLeft(f, a, k), dr = dRight(f, a, k);
      if (!(Math.abs(dl - dr) < 1e-3 * (1 + Math.abs(dl))) || Math.abs(dl) > 1e4) return { msg: 'a で微分可能でないので、1次近似の直線（接線）が一本に定まらない。' };
      const L = (dl + dr) / 2, x = a + h, fx = f(x), tx = fa + L * h, gap = fx - tx;
      const xmin = a - R, xmax = a + R;
      const [ymin, ymax] = autoY(f, xmin, xmax, [fa, tx]);
      const F = frame({ W: sz.W, H: sz.H, xmin, xmax, ymin, ymax });
      let s = curve(F, f, xmin, xmax, 'curve');
      s += seg(F, xmin, fa + L * (xmin - a), xmax, fa + L * (xmax - a), 'tan');
      s += `<line class="gap" x1="${F.X(x)}" x2="${F.X(x)}" y1="${F.Y(tx)}" y2="${F.Y(fx)}" ${F.clip}/>`;
      s += dot(F, a, fa, 'pnav', 4.5) + dot(F, x, fx, 'pin', 4.5) + dot(F, x, tx, 'pnav', 3.5);
      s += text(F, x, (fx + tx) / 2, '(x−a)ρ(x)', 'acc', h > 0 ? 'start' : 'end', h > 0 ? 7 : -7, 4);
      s += text(F, a, fa, 'a', 'nav', 'end', -7, -7);
      return {
        svg: svgWrap(F, s),
        out: `ずれ = ${fmt(gap)}　／　ρ(x) = ずれ ÷ (x − a) = ${fmt(gap / h)}`,
        msg: '',
        cap: `x − a = ${fmt(h)}　ρ(x) = ${fmt(gap / h)}`,
      };
    },
  };

  /* ---- コーシーの平均値の定理：曲線 (g(t), f(t)) の弦と平行な接線 ---- */
  TYPES.cauchy = {
    presets: {
      pw: { label: 'f = x², g = x³ on [0, 1]', expr: 'x^2', g: 'x^3', a: '0', b: '1' },
      circ: { label: 'f = sin x, g = cos x on [0, π/2]', expr: 'sin(x)', g: 'cos(x)', a: '0', b: 'pi/2' },
      expq: { label: 'f = eˣ, g = x² on [0.5, 2]', expr: 'exp(x)', g: 'x^2', a: '0.5', b: '2' },
    },
    fields: [
      { k: 'expr', label: '$f(x) =$', kind: 'text', w: 130 },
      { k: 'g', label: '$g(x) =$', kind: 'text', w: 130 },
      { k: 'a', label: '$a =$', kind: 'num' },
      { k: 'b', label: '$b =$', kind: 'num' },
    ],
    draw(st, sz) {
      const f = st.fn, g = st.gFn, a = st.aV, b = st.bV, k = 1e-6;
      if (!(b > a)) return { msg: 'a < b となるように入力してください' };
      const fa = f(a), fb = f(b), ga = g(a), gb = g(b);
      if (![fa, fb, ga, gb].every(isFinite)) return { msg: '端点での値が定まらない' };
      const N = 600, P = [];
      for (let i = 0; i <= N; i++) { const t = a + (b - a) * i / N; P.push([g(t), f(t)]); }
      const xs = P.map((q) => q[0]).filter(isFinite), ys = P.map((q) => q[1]).filter(isFinite);
      let x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      const px = (x1 - x0) * 0.12 || 0.5, py = (y1 - y0) * 0.12 || 0.5;
      const F = frame({ W: sz.W, H: sz.H, xmin: x0 - px, xmax: x1 + px, ymin: y0 - py, ymax: y1 + py });
      let s = `<path class="curve" d="${P.map((q, i) => (i ? 'L' : 'M') + F.X(q[0]).toFixed(1) + ',' + F.Y(q[1]).toFixed(1)).join('')}" ${F.clip}/>`;
      s += seg(F, ga, fa, gb, fb, 'chord');
      s += dot(F, ga, fa, 'pend', 4) + dot(F, gb, fb, 'pend', 4);
      s += text(F, ga, fa, 't = a', 'sm', 'start', 7, 14) + text(F, gb, fb, 't = b', 'sm', 'start', 7, -8);
      const H = (t) => dCenter(f, t, k) * (gb - ga) - dCenter(g, t, k) * (fb - fa);
      const cs = [];
      for (let i = 1; i < N - 1; i++) {
        const t0 = a + (b - a) * i / N, t1 = a + (b - a) * (i + 1) / N, h0 = H(t0), h1 = H(t1);
        if (!isFinite(h0) || !isFinite(h1) || (h0 < 0) === (h1 < 0)) continue;
        const r = bisect(H, t0, t1);
        if (r != null && !cs.some((q) => Math.abs(q - r) < (b - a) / 300)) cs.push(r);
      }
      const diag = Math.hypot(x1 - x0, y1 - y0) * 0.22;
      cs.forEach((c, i) => {
        const dg = dCenter(g, c, k), df = dCenter(f, c, k), len = Math.hypot(dg, df) || 1;
        const ux = dg / len * diag, uy = df / len * diag;
        s += seg(F, g(c) - ux, f(c) - uy, g(c) + ux, f(c) + uy, 'tan');
        s += dot(F, g(c), f(c), 'pnav', 4.5) + text(F, g(c), f(c), 't = ' + fmt(c), 'nav', 'end', -8, -8);
      });
      s += `<text class="lab sm" x="${F.W - F.R}" y="${F.H - F.B - 6}" text-anchor="end">横軸 g</text><text class="lab sm" x="${F.L + 6}" y="${F.T + 12}">縦軸 f</text>`;
      const chord = (fb - fa) / (gb - ga);
      return {
        svg: svgWrap(F, s),
        out: `弦の傾き = ${fmt(chord)}　／　${cs.length ? 'f′(c)/g′(c) が弦の傾きに等しい c：' + cs.map(fmt).join(', ') : 'c が見つからない'}`,
        msg: '',
        cap: '',
      };
    },
  };

  /* ---- 部分列（ボルツァーノ＝ワイエルシュトラス） ---- */
  TYPES.subseq = {
    presets: {
      alt: { label: '(−1)ⁿ(1 + 1/n)', expr: '(-1)^n*(1+1/n)' },
      sin: { label: 'sin n', expr: 'sin(n)' },
      cos: { label: 'cos n + 1/n', expr: 'cos(n) + 1/n' },
      inc: { label: '1 − 1/n', expr: '1 - 1/n' },
    },
    fields: [{ k: 'expr', label: '$a_n =$', kind: 'text', w: 200 }],
    draw(st, sz) {
      const f = st.fn, M = 3000, D = 50;
      const a = [NaN];
      for (let n = 1; n <= M; n++) { const v = f(n); if (!isFinite(v)) return { msg: 'n = ' + n + ' で値が定まらない' }; a.push(v); }
      // 山：それより後ろのどの項以上でもある項（確認は n ≤ M の範囲）
      const sufMax = new Array(M + 2).fill(-Infinity);
      for (let n = M; n >= 1; n--) sufMax[n] = Math.max(a[n], sufMax[n + 1]);
      const peaks = [];
      for (let n = 1; n <= D; n++) if (a[n] >= sufMax[n + 1]) peaks.push(n);
      let sub = [], kind;
      if (peaks.length && peaks[peaks.length - 1] > D * 0.6) { sub = peaks; kind = 'dec'; }
      else {
        const n0 = (peaks.length ? peaks[peaks.length - 1] : 0) + 1;
        sub = [n0];
        while (sub.length < 400) {
          const last = sub[sub.length - 1];
          let m = last + 1; while (m <= M && a[m] < a[last]) m++;
          if (m > M) break;
          sub.push(m);
        }
        kind = 'inc';
      }
      const W = sz.W || 680, H = sz.H || 250, L = 44, Rr = 14, T = 14, B = 28;
      const vals = a.slice(1, D + 1);
      let lo = Math.min(...vals), hi = Math.max(...vals); const pad = (hi - lo) * 0.12 || 0.5; lo -= pad; hi += pad;
      const dx = (W - L - Rr) / D, x = (n) => L + (n - 0.5) * dx, y = (v) => T + (hi - v) * (H - T - B) / (hi - lo);
      let s = `<line class="axis" x1="${L}" x2="${W - Rr}" y1="${H - B}" y2="${H - B}"/><line class="axis" x1="${L}" x2="${L}" y1="${T}" y2="${H - B}"/>`;
      if (lo < 0 && hi > 0) s += `<line class="grid" x1="${L}" x2="${W - Rr}" y1="${y(0)}" y2="${y(0)}"/>`;
      const shown = sub.filter((n) => n <= D);
      s += `<polyline class="subline" points="${shown.map((n) => x(n) + ',' + y(a[n])).join(' ')}"/>`;
      for (let n = 1; n <= D; n++) {
        const inSub = shown.includes(n);
        s += `<circle class="${inSub ? 'pin' : 'pout'}" cx="${x(n)}" cy="${y(a[n])}" r="3.6"/>`;
        if (peaks.includes(n)) s += `<path class="peak" d="M${x(n) - 4},${y(a[n]) - 7} l4,-6 l4,6 z"/>`;
        if (n === 1 || n % 10 === 0) s += `<text class="lab sm" x="${x(n)}" y="${H - 11}" text-anchor="middle">${n}</text>`;
      }
      s += `<text class="lab sm" x="${W - Rr}" y="${H - 11}" text-anchor="end">n</text>`;
      const list = shown.slice(0, 8).join(', ') + (shown.length > 8 ? ', …' : '');
      return {
        svg: `<svg viewBox="0 0 ${W} ${H}" role="img">${s}</svg>`,
        out: kind === 'dec' ? `山は無限個 → 山の項を並べると単調減少（n = ${list}）` : `山は ${peaks.length ? 'n = ' + peaks.join(', ') + ' の有限個' : '一つもない'} → n = ${sub[0]} から単調増加な部分列（n = ${list}）`,
        msg: '', cap: '',
      };
    },
  };

  /* ================= 図の組み立て ================= */
  function mountFig(el, spec) {
    const T = TYPES[spec.type];
    if (!T) return;
    const keys = Object.keys(T.presets);
    const pk = T.presets[spec.preset] ? spec.preset : keys[0];
    const st = Object.assign({ cont: !!spec.cont }, T.presets[pk]);
    const editable = !!spec.editable;
    const fields = T.fields.filter((fd) => !(fd.hideIf && fd.hideIf(st)));
    const ctl = [];
    if (editable && keys.length > 1) ctl.push(`<label>プリセット <select class="g-pre">${keys.map((k) => `<option value="${k}"${k === pk ? ' selected' : ''}>${T.presets[k].label}</option>`).join('')}<option value="" disabled>（自分で入力した式）</option></select></label>`);
    fields.forEach((fd) => {
      if (fd.kind === 'range') ctl.push(`<label>${fd.label} <input type="range" data-k="${fd.k}" min="${fd.min != null ? fd.min : 0}" max="1000" value="${fd.to(st[fd.k])}"><span class="val" data-v="${fd.k}"></span></label>`);
      else if (editable) ctl.push(`<label>${fd.label} <input type="text" data-k="${fd.k}" class="${fd.kind === 'num' ? 'small' : ''}" value="${st[fd.k]}" spellcheck="false" autocomplete="off"${fd.w ? ` style="width:${fd.w}px"` : ''}></label>`);
    });
    ctl.push('<span class="out g-out"></span>');
    if (T.play) ctl.push(`<button type="button" class="pbtn play g-play">▶ ${T.play.label}</button>`);
    el.innerHTML = `<div class="fig-ctl">${ctl.join('')}</div><div class="fig-msg g-msg"></div><div class="${T.frames ? 'fig-live ' : 'fig-static '}g-svg"></div>${T.frames ? '<div class="print-only fig-frames g-frames"></div>' : ''}`;
    if (window.renderMathIn) window.renderMathIn(el.querySelector('.fig-ctl'));
    const $ = (c) => el.querySelector(c);

    function prepare() {
      const msg = $('.g-msg');
      msg.textContent = '';
      el.querySelectorAll('input[type=text]').forEach((i) => i.classList.remove('bad'));
      for (const fd of T.fields) {
        if (fd.kind !== 'text') continue;
        try {
          const parts = String(st[fd.k]).split(';').map((q) => q.trim()).filter(Boolean);
          if (!parts.length) throw new Error('式が空になっている');
          st[fd.k + 'Fns'] = parts.map(compile);
          st[fd.k + 'Fn'] = st[fd.k + 'Fns'][0];
        } catch (e) { msg.textContent = '式を読み取れません：' + e.message; const i = el.querySelector(`input[data-k="${fd.k}"]`); if (i) i.classList.add('bad'); return false; }
      }
      st.fn = st.exprFn;
      for (const fd of T.fields) {
        if (fd.kind !== 'num' || (fd.hideIf && fd.hideIf(st))) continue;
        try { st[fd.k + 'V'] = num(st[fd.k]); }
        catch (e) { msg.textContent = e.message; const i = el.querySelector(`input[data-k="${fd.k}"]`); if (i) i.classList.add('bad'); return false; }
      }
      return true;
    }
    function draw() {
      if (!st.fn) return;
      fields.forEach((fd) => { if (fd.kind === 'range') { const v = el.querySelector(`[data-v="${fd.k}"]`); try { v.textContent = fd.show ? fd.show(st) : fmt(st[fd.k]); } catch (e) { v.textContent = ''; } } });
      let r;
      try { r = T.draw(st, {}); } catch (e) { r = { msg: '描画できません：' + e.message }; }
      $('.g-msg').textContent = r.msg || '';
      $('.g-out').textContent = r.out ? '→ ' + r.out : '';
      if (r.svg) $('.g-svg').innerHTML = r.svg;
    }
    function frames() {
      if (!T.frames || !st.fn) return;
      $('.g-frames').innerHTML = T.frames(st).map((o) => {
        const s2 = Object.assign({}, st, o);
        let r; try { r = T.draw(s2, { W: 360, H: 210 }); } catch (e) { r = {}; }
        return r.svg ? `<div class="fr">${r.svg}<div class="frc">${r.cap || ''}</div></div>` : '';
      }).join('');
    }
    const full = () => { if (prepare()) { draw(); frames(); } };

    el.querySelectorAll('input[type=range]').forEach((inp) => {
      const fd = T.fields.find((x) => x.k === inp.dataset.k);
      inp.addEventListener('input', () => { st[fd.k] = fd.from(+inp.value); draw(); });
      inp.addEventListener('change', frames);
    });
    let tm;
    el.querySelectorAll('input[type=text]').forEach((inp) => inp.addEventListener('input', () => {
      const pre = $('.g-pre'); if (pre) pre.value = '';
      clearTimeout(tm);
      tm = setTimeout(() => { st[inp.dataset.k] = inp.value; full(); }, 250);
    }));
    const pre = $('.g-pre');
    if (pre) pre.addEventListener('change', () => {
      const p = T.presets[pre.value];
      Object.assign(st, p);
      el.querySelectorAll('input[data-k]').forEach((i) => {
        const fd = T.fields.find((x) => x.k === i.dataset.k);
        if (i.type === 'range') i.value = fd.to(st[fd.k]); else i.value = st[fd.k];
      });
      full();
    });
    if (T.play) {
      let anim = null;
      const btn = $('.g-play'), label = '▶ ' + T.play.label;
      const fd = T.fields.find((x) => x.k === T.play.k);
      btn.addEventListener('click', () => {
        if (anim) { cancelAnimationFrame(anim); anim = null; btn.textContent = label; return; }
        const t0 = performance.now(), { from, to } = T.play, dur = 5000;
        btn.textContent = '■ 停止';
        const tick = (t) => {
          const q = Math.min(1, (t - t0) / dur);
          st[fd.k] = T.play.linear ? from + (to - from) * q : from * Math.pow(to / from, q);
          el.querySelector(`input[data-k="${fd.k}"]`).value = fd.to(st[fd.k]);
          draw();
          if (q < 1) anim = requestAnimationFrame(tick); else { anim = null; btn.textContent = label; frames(); }
        };
        anim = requestAnimationFrame(tick);
      });
    }
    full();
  }

  window.Graph = { mount: mountFig, compile, types: Object.keys(TYPES) };
})();
