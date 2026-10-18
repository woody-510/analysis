/* 数式パーサーと「数列と ε 帯」の可変グラフ */
(function () {
  'use strict';

  /* ---------------- 数式パーサー ----------------
     使える記号：+ - * / ^ ( )、変数 n、定数 pi e、
     関数 sin cos tan exp log ln sqrt abs floor
     「2n」「3(n+1)」「n(n+1)」のような掛け算の省略も可。 */
  const FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, exp: Math.exp,
    log: Math.log, ln: Math.log, sqrt: Math.sqrt, abs: Math.abs, floor: Math.floor,
  };
  const CONSTS = { pi: Math.PI, e: Math.E };

  function tokenize(src) {
    const s = src.replace(/\s+/g, '').replace(/[−–]/g, '-').replace(/[×·]/g, '*').replace(/π/g, 'pi');
    const out = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/[0-9.]/.test(c)) {
        let j = i; while (j < s.length && /[0-9.]/.test(s[j])) j++;
        const v = parseFloat(s.slice(i, j));
        if (isNaN(v)) throw new Error('数の書き方が正しくない');
        out.push({ k: 'num', v }); i = j;
      } else if (/[a-z]/i.test(c)) {
        let j = i; while (j < s.length && /[a-z]/i.test(s[j])) j++;
        let w = s.slice(i, j).toLowerCase();
        // 「npi」「2nsin」などを既知の語に分解する
        while (w.length) {
          const f = Object.keys(FUNCS).concat(Object.keys(CONSTS), ['n']).sort((a, b) => b.length - a.length).find((k) => w.startsWith(k));
          if (!f) throw new Error('「' + w + '」は使えない記号');
          out.push(FUNCS[f] ? { k: 'fn', v: f } : f === 'n' ? { k: 'var' } : { k: 'num', v: CONSTS[f] });
          w = w.slice(f.length);
        }
        i = j;
      } else if ('+-*/^()'.includes(c)) { out.push({ k: 'op', v: c }); i++; }
      else throw new Error('「' + c + '」は使えない記号');
    }
    // 掛け算の省略を補う
    const res = [];
    for (let t = 0; t < out.length; t++) {
      const a = res[res.length - 1], b = out[t];
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
    const peek = () => T[p];
    const isOp = (v) => T[p] && T[p].k === 'op' && T[p].v === v;
    function expr() {
      let node = term();
      while (isOp('+') || isOp('-')) { const o = T[p++].v; node = { o, a: node, b: term() }; }
      return node;
    }
    function term() {
      let node = unary();
      while (isOp('*') || isOp('/')) { const o = T[p++].v; node = { o, a: node, b: unary() }; }
      return node;
    }
    function unary() {
      if (isOp('-')) { p++; return { o: 'neg', a: unary() }; }
      if (isOp('+')) { p++; return unary(); }
      return power();
    }
    function power() {
      const base = atom();
      if (isOp('^')) { p++; return { o: '^', a: base, b: unary() }; }
      return base;
    }
    function atom() {
      const t = peek();
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
      if (isOp('(')) {
        p++; const a = expr();
        if (!isOp(')')) throw new Error(') が足りない');
        p++; return a;
      }
      throw new Error('「' + (t.v || '') + '」の位置がおかしい');
    }
    const tree = expr();
    if (p < T.length) throw new Error('式の終わりに余分な記号がある');
    return tree;
  }

  function evaluate(node, n) {
    switch (node.o) {
      case 'num': return node.v;
      case 'var': return n;
      case 'neg': return -evaluate(node.a, n);
      case '+': return evaluate(node.a, n) + evaluate(node.b, n);
      case '-': return evaluate(node.a, n) - evaluate(node.b, n);
      case '*': return evaluate(node.a, n) * evaluate(node.b, n);
      case '/': return evaluate(node.a, n) / evaluate(node.b, n);
      case '^': return Math.pow(evaluate(node.a, n), evaluate(node.b, n));
      case 'fn': return FUNCS[node.f](evaluate(node.a, n));
    }
    return NaN;
  }

  function compile(src) {
    const tree = parse(src);
    return (n) => evaluate(tree, n);
  }

  /* ---------------- プリセット ---------------- */
  const PRESETS = {
    alt: { label: '1 + (−1)ⁿ·1.2 / n', expr: '1 + (-1)^n*1.2/n', alpha: '1', eps: 0.25 },
    inv: { label: '1 / n', expr: '1/n', alpha: '0', eps: 0.15 },
    e: { label: '(1 + 1/n)ⁿ → e', expr: '(1+1/n)^n', alpha: 'e', eps: 0.08 },
    sinn: { label: 'sin(n) / n', expr: 'sin(n)/n', alpha: '0', eps: 0.1 },
    sqrt: { label: '√(n+1) − √n', expr: 'sqrt(n+1)-sqrt(n)', alpha: '0', eps: 0.1 },
    osc: { label: '(−1)ⁿ（発散）', expr: '(-1)^n', alpha: '1', eps: 0.5 },
  };

  const NCHECK = 5000;

  /* 帯 (α−ε, α+ε) に n ≥ N でずっと入る最小の N を探す（NCHECK まで確認） */
  function findN(f, alpha, eps) {
    let last = 0;
    for (let n = 1; n <= NCHECK; n++) {
      const v = f(n);
      if (!isFinite(v)) return { error: 'n = ' + n + ' で値が定まらない' };
      if (Math.abs(v - alpha) >= eps) last = n;
    }
    if (last >= NCHECK - 1) return { N: null };
    return { N: last + 1 };
  }

  let uid = 0;
  function drawSVG(f, alpha, eps, N, opts) {
    const id = 'h' + (++uid);
    const W = opts.w || 680, H = opts.h || 240, L = 54, Rr = 18, T = 16, B = 30;
    let nMax = N ? Math.ceil(N * 1.6) + 6 : 30;
    nMax = Math.max(24, Math.min(nMax, 160));
    const vals = [];
    for (let n = 1; n <= nMax; n++) vals.push(f(n));
    let lo = Math.min(alpha - eps, ...vals), hi = Math.max(alpha + eps, ...vals);
    // 極端な初項で潰れないよう、表示範囲を帯の 12 倍までに抑える
    const cap = Math.max(eps * 12, 0.5);
    lo = Math.max(lo, alpha - cap); hi = Math.min(hi, alpha + cap);
    const pad = (hi - lo) * 0.08 || 0.5; lo -= pad; hi += pad;
    const x = (n) => L + (n - 0.5) * (W - L - Rr) / nMax;
    const y = (v) => T + (hi - Math.max(lo, Math.min(hi, v))) * (H - T - B) / (hi - lo);
    const dx = (W - L - Rr) / nMax;
    const r = Math.max(2, Math.min(4.4, dx * 0.32));
    let s = `<defs><pattern id="${id}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="7" fill="rgba(242,194,48,.20)"/><line x1="0" y1="0" x2="0" y2="7" stroke="#b08a10" stroke-width="1" stroke-opacity=".45"/></pattern></defs>`;
    s += `<rect x="${L}" y="${y(alpha + eps)}" width="${W - L - Rr}" height="${y(alpha - eps) - y(alpha + eps)}" fill="url(#${id})"/>`;
    s += `<line class="edge" x1="${L}" x2="${W - Rr}" y1="${y(alpha + eps)}" y2="${y(alpha + eps)}"/>`;
    s += `<line class="edge" x1="${L}" x2="${W - Rr}" y1="${y(alpha - eps)}" y2="${y(alpha - eps)}"/>`;
    s += `<line class="alpha" x1="${L}" x2="${W - Rr}" y1="${y(alpha)}" y2="${y(alpha)}"/>`;
    s += `<line class="axis" x1="${L}" x2="${W - Rr}" y1="${H - B}" y2="${H - B}"/>`;
    s += `<line class="axis" x1="${L}" x2="${L}" y1="${T}" y2="${H - B}"/>`;
    if (N && N <= nMax) {
      const xn = x(N) - dx / 2;
      s += `<line class="nline" x1="${xn}" x2="${xn}" y1="${T}" y2="${H - B}"/>`;
      s += `<text class="lab acc" x="${xn + 5}" y="${T + 11}">N = ${N}</text>`;
    }
    s += `<text class="lab" x="${L - 8}" y="${y(alpha) + 4}" text-anchor="end">α</text>`;
    if (y(alpha - eps) - y(alpha + eps) > 22) {
      s += `<text class="lab sm" x="${L - 8}" y="${y(alpha + eps) + 4}" text-anchor="end">α+ε</text>`;
      s += `<text class="lab sm" x="${L - 8}" y="${y(alpha - eps) + 4}" text-anchor="end">α−ε</text>`;
    }
    const step = nMax <= 30 ? 4 : nMax <= 60 ? 10 : 20;
    for (let n = 1; n <= nMax; n++) {
      const v = vals[n - 1];
      const inside = N ? n >= N : Math.abs(v - alpha) < eps;
      const out = v < lo || v > hi;
      s += `<line class="stem" x1="${x(n)}" x2="${x(n)}" y1="${y(alpha)}" y2="${y(v)}"/>`;
      if (out) s += `<path d="M${x(n) - 4},${y(v) + (v > hi ? 6 : -6)} L${x(n)},${y(v)} L${x(n) + 4},${y(v) + (v > hi ? 6 : -6)}" fill="none" stroke="#777"/>`;
      else s += `<circle class="${inside ? 'pin' : 'pout'}" cx="${x(n)}" cy="${y(v)}" r="${r}"/>`;
      if (n === 1 || n % step === 0) s += `<text class="lab sm" x="${x(n)}" y="${H - 12}" text-anchor="middle">${n}</text>`;
    }
    s += `<text class="lab sm" x="${W - Rr}" y="${H - 12}" text-anchor="end">n</text>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="数列のグラフ">${s}</svg>`;
  }

  const fmt = (v) => (v >= 0.1 ? v.toFixed(2) : v.toPrecision(2));
  const epsFromSlider = (v) => Math.pow(10, -2 + 2 * v / 1000); // 0.01 〜 1
  const sliderFromEps = (e) => Math.round(1000 * (Math.log10(e) + 2) / 2);

  function mountSeq(el, spec) {
    const p = PRESETS[spec.preset] || PRESETS.alt;
    const st = { expr: p.expr, alpha: p.alpha, eps: p.eps, f: null, a: 0 };
    const editable = !!spec.editable;
    const opts = Object.keys(PRESETS).map((k) => `<option value="${k}"${k === spec.preset ? ' selected' : ''}>${PRESETS[k].label}</option>`).join('') + '<option value="" disabled>（自分で入力した式）</option>';
    el.innerHTML = `
      <div class="fig-ctl">
        ${editable ? `<label>プリセット <select class="g-pre">${opts}</select></label>
        <label>$a_n =$ <input type="text" class="g-expr" value="${st.expr}" spellcheck="false" autocomplete="off"></label>
        <label>$\\alpha =$ <input type="text" class="g-alpha small" value="${st.alpha}" spellcheck="false"></label>` : ''}
        <label>$\\varepsilon$ <input type="range" class="g-eps" min="0" max="1000" value="${sliderFromEps(st.eps)}"><span class="val g-epsv"></span></label>
        <span class="out g-n"></span>
        <button type="button" class="pbtn play g-play">▶ ε を小さくしていく</button>
      </div>
      <div class="fig-msg g-msg"></div>
      <div class="fig-live g-svg"></div>
      <div class="print-only fig-frames g-frames"></div>`;
    if (window.renderMathIn) window.renderMathIn(el.querySelector('.fig-ctl'));
    const $ = (c) => el.querySelector(c);

    function rebuild() {
      const msg = $('.g-msg');
      msg.textContent = '';
      try {
        st.f = compile(st.expr);
        st.a = compile(st.alpha)(0);
        if (!isFinite(st.a)) throw new Error('α の値が定まらない');
        if (editable) { $('.g-expr').classList.remove('bad'); $('.g-alpha').classList.remove('bad'); }
      } catch (e) {
        msg.textContent = '式を読み取れません：' + e.message;
        if (editable) $('.g-expr').classList.add('bad');
        return false;
      }
      return true;
    }

    function draw() {
      if (!st.f) return;
      const r = findN(st.f, st.a, st.eps);
      $('.g-epsv').textContent = fmt(st.eps);
      if (r.error) { $('.g-msg').textContent = r.error; $('.g-n').textContent = ''; return; }
      $('.g-n').textContent = r.N ? '→ N = ' + r.N : '→ N は見つからない';
      $('.g-msg').textContent = r.N ? '' : `n ≤ ${NCHECK} の範囲では、帯の外に出る項が最後まで現れる。この α には収束していない可能性が高い。`;
      $('.g-svg').innerHTML = drawSVG(st.f, st.a, st.eps, r.N, {});
    }

    function drawFrames() {
      if (!st.f) return;
      const base = st.eps;
      const list = [base * 2, base, base / 2.5].map((e) => Math.min(1, Math.max(0.01, e)));
      $('.g-frames').innerHTML = list.map((e) => {
        const r = findN(st.f, st.a, e);
        return `<div class="fr">${drawSVG(st.f, st.a, e, r.N, { w: 360, h: 200 })}<div class="frc">ε = ${fmt(e)}　${r.N ? 'N = ' + r.N : 'N なし'}</div></div>`;
      }).join('');
    }

    function full() { if (rebuild()) { draw(); drawFrames(); } }

    $('.g-eps').addEventListener('input', (e) => { st.eps = epsFromSlider(+e.target.value); draw(); });
    $('.g-eps').addEventListener('change', drawFrames);
    if (editable) {
      $('.g-pre').addEventListener('change', (e) => {
        const q = PRESETS[e.target.value];
        st.expr = q.expr; st.alpha = q.alpha; st.eps = q.eps;
        $('.g-expr').value = q.expr; $('.g-alpha').value = q.alpha; $('.g-eps').value = sliderFromEps(q.eps);
        full();
      });
      let tm;
      const onType = () => { $('.g-pre').value = ''; clearTimeout(tm); tm = setTimeout(() => { st.expr = $('.g-expr').value; st.alpha = $('.g-alpha').value; full(); }, 250); };
      $('.g-expr').addEventListener('input', onType);
      $('.g-alpha').addEventListener('input', onType);
    }
    let anim = null;
    $('.g-play').addEventListener('click', () => {
      if (anim) { cancelAnimationFrame(anim); anim = null; $('.g-play').textContent = '▶ ε を小さくしていく'; return; }
      const t0 = performance.now(), from = 0.8, to = 0.02, dur = 5000;
      $('.g-play').textContent = '■ 停止';
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        st.eps = from * Math.pow(to / from, k);
        $('.g-eps').value = sliderFromEps(st.eps);
        draw();
        if (k < 1) anim = requestAnimationFrame(tick);
        else { anim = null; $('.g-play').textContent = '▶ ε を小さくしていく'; drawFrames(); }
      };
      anim = requestAnimationFrame(tick);
    });
    full();
  }

  window.Graph = { mountSeq, compile, findN };
})();
