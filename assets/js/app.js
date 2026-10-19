/* 解析学大全 — 描画・検索・ナビゲーション */
(function () {
  'use strict';

  const SITE = { jp: '解析学大全', en: 'Analysis Compendium' };
  const ARTS = window.ARTICLES || [];
  const BOOK = window.BOOK || [];
  const byId = Object.fromEntries(ARTS.map((a) => [a.id, a]));
  const KIND = {
    def: ['Def.', '定義'], thm: ['Thm.', '定理'], prop: ['Prop.', '命題'], lem: ['Lem.', '補題'],
    cor: ['Cor.', '系'], ax: ['Axiom', '公理'], ex: ['Ex.', '例'], rem: ['Rem.', '注意'], problem: ['Prob.', '問題'],
  };
  const NAMED = ['def', 'thm', 'prop', 'lem', 'cor', 'ax'];
  const MACROS = { '\\N': '\\mathbb{N}', '\\R': '\\mathbb{R}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}', '\\eps': '\\varepsilon' };
  const params = new URLSearchParams(location.search);
  const EMBED = params.get('embed') === '1';
  /* claude.ai 上の公開版では印刷画面を開けないので、PDF ボタンは案内に切り替える */
  const HOSTED = !!window.AC_HOSTED;
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem('ac.' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('ac.' + k, JSON.stringify(v)); } catch (e) { /* 保存できない環境では無視 */ } },
  };
  const HIST_MAX = 50, TAB_MAX = 8;

  /* アンカー（箱の id）→ 記事・ブロック */
  const ANCH = {};
  ARTS.forEach((a) => a.body.forEach((b) => { if (b.id) ANCH[a.id + '#' + b.id] = { art: a, block: b }; }));
  const chapterOf = (id) => {
    for (const c of BOOK) { const i = c.sections.indexOf(id); if (i >= 0) return { ch: c, idx: i + 1 }; }
    return null;
  };

  /* ---------------- 数式とリンク ---------------- */
  let PAGE = { mode: 'dict', inPage: new Set() };

  function tex(src, display, ctx) {
    if (src.includes('\\tag{#}')) src = ctx ? src.replace('\\tag{#}', '\\tag{' + ctx.eq() + '}') : src.replace('\\tag{#}', '');
    try { return katex.renderToString(src, { displayMode: display, throwOnError: false, macros: MACROS, strict: false }); }
    catch (e) { return esc(src); }
  }
  function href(id, anc) {
    if (PAGE.mode === 'book' && PAGE.inPage.has(id)) return '#' + (anc ? id + '--' + anc : 'sec-' + id);
    if (PAGE.mode === 'dict' && PAGE.cur === id && anc) return '#' + anc;
    return 'article.html?id=' + id + (EMBED ? '&embed=1' : '') + (anc ? '#' + anc : '');
  }
  /* [[id]]・[[id#anchor]]・[[id#anchor|表示名]]。表示名には数式 $…$ や単独の ] を含めてよい。 */
  const LINK_RE = /\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|((?:[^\]]|\](?!\]))+))?\]\]/g;
  function linkHTML(id, anc, labelHTML) {
    const a = byId[id];
    if (!a) return `<a class="wl missing" title="まだ作成していないページ">${labelHTML || esc(id)}</a>`;
    let text = labelHTML;
    if (!text) text = anc && ANCH[id + '#' + anc] ? ANCH[id + '#' + anc].block.title : a.title;
    return `<a class="wl" href="${href(id, anc)}" data-peek="${id}${anc ? '#' + anc : ''}">${text}</a>`;
  }
  function links(s) {
    return s.replace(LINK_RE, (m, id, anc, label) => linkHTML(id, anc, label));
  }
  /* 数式だけを描画する（リンクは扱わない） */
  function mathOnly(s, ctx) {
    const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
    let out = '', last = 0, m;
    while ((m = re.exec(s))) {
      out += s.slice(last, m.index);
      out += m[1] != null ? tex(m[1], true, ctx) : tex(m[2], false, ctx);
      last = re.lastIndex;
    }
    return out + s.slice(last);
  }
  /* 本文の描画：先にリンクを取り出し（表示名の数式も描画して）、残りの数式を描画してから戻す */
  function rich(s, ctx) {
    if (!s) return '';
    const store = [];
    const body = String(s).replace(LINK_RE, (m, id, anc, label) => {
      store.push(linkHTML(id, anc, label ? mathOnly(label, ctx) : null));
      return '\u0000' + (store.length - 1) + '\u0000';
    });
    return mathOnly(body, ctx).replace(/\u0000(\d+)\u0000/g, (m, i) => store[+i]);
  }
  /* 記事冒頭の「このページで使う記号」メモ（開閉式） */
  function symNote(art) {
    if (!art.notation || !art.notation.length) return '';
    const id = uid();
    return `<div class="note symnote"><button type="button" class="note-h" aria-expanded="false" data-tg="${id}"><span class="cap">Notation</span><span class="capjp">記号</span><span class="t">このページで使う記号と約束</span><span class="ar">▾</span></button><div class="collapsible note-b" id="${id}" hidden><ul class="symlist">${art.notation.map((n) => `<li>${rich(n)}</li>`).join('')}</ul></div></div>`;
  }
  const para = (h) => (/<(ol|ul|div)\b/.test(h) ? `<div class="txt">${h}</div>` : `<p>${h}</p>`);
  window.renderMathIn = function (el) {
    el.querySelectorAll('label').forEach((lb) => {
      lb.childNodes.forEach((nd) => {
        if (nd.nodeType === 3 && nd.textContent.includes('$')) {
          const span = document.createElement('span');
          span.innerHTML = rich(nd.textContent);
          nd.replaceWith(span);
        }
      });
    });
  };

  /* ---------------- 記事本文の描画 ---------------- */
  let uidN = 0;
  const uid = () => 'u' + (++uidN);

  function renderBody(art, o) {
    const book = o.mode === 'book';
    const aid = (id) => (book ? art.id + '--' + id : id);
    const toc = [];
    const nums = [];
    const figs = [];
    let sec = 0, k = 0, eqn = 0;
    const label = () => (book ? `${o.ch}.${++o.cnt.item}` : `${Math.max(sec, 1)}.${++k}`);
    const ctx = { eq: () => (book ? `${o.ch}.${++o.cnt.eq}` : `${Math.max(sec, 1)}.${++eqn}`) };
    let html = '';
    for (const b of art.body) {
      switch (b.t) {
        case 'h2': {
          sec++; k = 0; eqn = 0;
          const n = book ? `${o.ch}.${o.secIdx}.${sec}` : `${sec}`;
          const id = aid(b.id || 's' + sec);
          toc.push({ id, label: n, title: b.text, children: [] });
          html += book ? `<h3 class="sub" id="${id}"><span class="n">${n}</span>${esc(b.text)}</h3>` : `<h2 class="sec" id="${id}"><span class="n">${n}</span>${esc(b.text)}</h2>`;
          break;
        }
        case 'p': html += para(rich(b.text, ctx)); break;
        case 'strategy': html += `<div class="strategy"><span class="cap">Strategy</span><span class="capjp">方針</span>${rich(b.text, ctx)}</div>`; break;
        case 'crux': html += `<div class="crux"><span class="cap">Crux</span><span class="capjp">核心</span>${para(rich(b.text, ctx))}</div>`; break;
        case 'note': {
          const id = uid();
          html += `<div class="note"><button type="button" class="note-h" aria-expanded="false" data-tg="${id}"><span class="cap">Note</span><span class="capjp">メモ</span><span class="t">${rich(b.title)}</span><span class="ar">▾</span></button><div class="collapsible note-b" id="${id}" hidden>${para(rich(b.text, ctx))}</div></div>`;
          break;
        }
        case 'html': {
          const no = book ? `${o.ch}.${++o.cnt.fig}` : `${++o.cnt.fig}`;
          html += `<figure class="fig plain">${b.html}${b.caption ? `<figcaption><span class="fno">図 ${no}</span>${rich(b.caption)}</figcaption>` : ''}</figure>`;
          break;
        }
        case 'table': html += `<div class="tblwrap">${rich(b.html, ctx)}</div>`; break;
        case 'qa': {
          const id = uid();
          html += `<div class="qa"><button type="button" class="qa-q" aria-expanded="false" data-tg="${id}"><span class="qm">Q</span><span class="qa-t">${rich(b.q, ctx)}</span><span class="ar">▾</span></button><div class="collapsible qa-a" id="${id}" hidden><span class="am">A</span><div class="qa-body">${para(rich(b.a, ctx))}</div></div></div>`;
          break;
        }
        case 'fig': {
          const no = book ? `${o.ch}.${++o.cnt.fig}` : `${++o.cnt.fig}`;
          figs.push(b);
          html += `<figure class="fig"><div class="g" data-fig="${figs.length - 1}"></div><figcaption><span class="fno">図 ${no}</span>${rich(b.caption)}</figcaption></figure>`;
          break;
        }
        case 'proof': {
          const id = uid();
          html += `<div class="proof-ctl">${b.sketch ? `<button type="button" class="pbtn" aria-expanded="false" data-tg="${id}s">概略の証明 <span class="ar">▸</span></button>` : ''}<button type="button" class="pbtn" aria-expanded="false" data-tg="${id}f">厳密な証明 <span class="ar">▸</span></button></div>`;
          if (b.sketch) html += `<div class="collapsible proof proof-sketch" id="${id}s" hidden><div class="proof-h">Proof sketch.<span class="k">概略</span></div><p>${rich(b.sketch, ctx)}</p></div>`;
          const steps = (b.steps || []).map((st, i) => {
            const eqs = (st.eqs || []).map(([l, w]) => `<div class="eqline"><div>${tex('\\displaystyle ' + l, false)}</div><div class="why">${rich(w)}</div></div>`).join('');
            const wid = uid();
            const why = st.why ? `<button type="button" class="whybtn" aria-expanded="false" data-tg="${wid}">なぜ？ ▾</button><div class="collapsible whybox" id="${wid}" hidden><span class="cap">Why</span>${rich(st.why, ctx)}</div>` : '';
            return `<div class="step"><span class="sn">${i + 1}</span><div>${rich(st.text, ctx)}${why && !eqs ? why : ''}${eqs}${why && eqs ? why : ''}</div></div>`;
          }).join('');
          html += `<div class="collapsible proof proof-full" id="${id}f" hidden><div class="proof-h">Proof.<span class="k">証明</span></div>${steps}<div class="qed">∎</div></div>`;
          break;
        }
        default: {
          if (!KIND[b.t]) break;
          const [en, jp] = KIND[b.t];
          const num = label();
          const id = aid(b.id || uid());
          const imp = b.imp === 3 ? '<span class="badge top">★ 最重要</span>' : b.imp === 2 ? '<span class="badge">重要</span>' : '';
          const diff = b.t === 'problem' ? `<span class="diff">難易度 ${'●'.repeat(b.level || 1)}${'○'.repeat(3 - (b.level || 1))}</span>` : '';
          let extra = '';
          if (b.t === 'problem') {
            const h = uid(), a = uid();
            extra = `<div class="ans-ctl">${b.hint ? `<button type="button" class="pbtn" aria-expanded="false" data-tg="${h}">ヒント <span class="ar">▸</span></button>` : ''}${b.answer ? `<button type="button" class="pbtn" aria-expanded="false" data-tg="${a}">解答を見る <span class="ar">▸</span></button>` : ''}</div>`;
            if (b.hint) extra += `<div class="collapsible hintbox" id="${h}" hidden><span class="cap">Hint</span>${rich(b.hint, ctx)}</div>`;
            if (b.answer) extra += `<div class="collapsible ansbox" id="${a}" hidden><span class="cap">Answer</span>${rich(b.answer, ctx)}</div>`;
            extra += `<div class="print-only ans-space"><span class="cap">解答欄</span>${'<div class="ln"></div>'.repeat(b.space || 5)}</div>`;
          }
          html += `<div class="box ${b.t}" id="${id}" data-jp="${jp}"><div class="box-head"><span class="tag" data-jp="${jp}">${en} ${num}</span>${b.title ? `<span class="box-title">${rich(b.title)}</span>` : ''}${imp}${diff}</div><div class="box-body">${para(rich(b.text, ctx))}${extra}</div></div>`;
          const entry = { id, label: `${en} ${num}`, title: b.title || '', kind: b.t };
          nums.push(entry);
          if (toc.length && b.t !== 'rem' && b.t !== 'ex') toc[toc.length - 1].children.push(entry);
        }
      }
    }
    return { html, toc, nums, figs };
  }

  function mountFigs(root, figs) {
    root.querySelectorAll('.g[data-fig]').forEach((el) => {
      const spec = figs[+el.dataset.fig];
      if (spec && window.Graph) window.Graph.mount(el, spec);
    });
  }

  /* ---------------- 開閉・プレビュー ---------------- */
  function bindToggles(root) {
    root.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-tg]');
      if (!btn) return;
      const t = document.getElementById(btn.dataset.tg);
      if (!t) return;
      const open = t.hidden;
      t.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
    });
  }
  function setAll(selector, open) {
    document.querySelectorAll(selector).forEach((btn) => {
      const t = document.getElementById(btn.dataset.tg);
      if (t) { t.hidden = !open; btn.setAttribute('aria-expanded', String(open)); }
    });
  }

  function bindPeek() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const pk = document.createElement('div');
    pk.className = 'peek';
    document.body.appendChild(pk);
    let tm = null, cur = null;
    document.addEventListener('mouseover', (e) => {
      const a = e.target.closest('a.wl[data-peek]');
      if (!a || a === cur) return;
      cur = a; clearTimeout(tm);
      tm = setTimeout(() => {
        const [id, anc] = a.dataset.peek.split('#');
        const art = byId[id];
        let h;
        if (anc && ANCH[id + '#' + anc]) {
          const b = ANCH[id + '#' + anc].block;
          const kd = KIND[b.t] ? KIND[b.t][1] : '';
          h = `<div class="ph">${esc(art.title)} ・ ${kd}</div><div class="pt">${rich(b.title || '')}</div><div>${rich(b.text)}</div>`;
        } else {
          h = `<div class="ph">${esc(art.kind)} ・ ${esc(art.field)}</div><div class="pt">${esc(art.title)}</div><div>${rich(art.synopsis)}</div>`;
        }
        pk.innerHTML = h + '<div class="pf">クリックで開く</div>';
        const r = a.getBoundingClientRect();
        pk.classList.add('show');
        const w = pk.offsetWidth;
        pk.style.left = Math.max(12, Math.min(window.scrollX + r.left, window.scrollX + document.documentElement.clientWidth - w - 12)) + 'px';
        pk.style.top = window.scrollY + r.bottom + 8 + 'px';
      }, 220);
    });
    document.addEventListener('mouseout', (e) => {
      const a = e.target.closest('a.wl[data-peek]');
      if (a && !a.contains(e.relatedTarget)) { clearTimeout(tm); cur = null; pk.classList.remove('show'); }
    });
  }

  /* ---------------- 検索 ---------------- */
  function norm(s) {
    return String(s || '')
      .normalize('NFKC').toLowerCase()
      .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
      .replace(/[\s・\-‐－―ー〜~,，、。.()（）「」$\\]/g, '');
  }
  const INDEX = [];
  ARTS.forEach((a) => {
    INDEX.push({ kind: 'page', title: a.title, sub: a.sub, yomi: a.yomi, field: a.field, href: 'article.html?id=' + a.id, where: a.field, keys: [a.title, a.yomi, ...(a.aliases || [])].map(norm) });
    a.body.forEach((b) => {
      if (NAMED.includes(b.t) && b.title) {
        INDEX.push({ kind: b.t, title: b.title, yomi: b.yomi || '', field: a.field, href: 'article.html?id=' + a.id + '#' + b.id, where: a.title, keys: [b.title, b.yomi || ''].filter(Boolean).map(norm) });
      }
    });
  });
  const KORD = { page: 0, def: 1, thm: 2, ax: 3, prop: 4, cor: 5, lem: 6 };
  function search(q, filt) {
    const nq = norm(q);
    if (!nq) return [];
    const res = [];
    for (const e of INDEX) {
      if (filt && filt.field && e.field !== filt.field) continue;
      if (filt && filt.kinds && !filt.kinds.has(e.kind)) continue;
      let sc = null;
      for (const key of e.keys) {
        if (!key) continue;
        const s = key === nq ? 0 : key.startsWith(nq) ? 1 : key.includes(nq) ? 2 : null;
        if (s != null && (sc == null || s < sc)) sc = s;
      }
      if (sc != null) res.push({ e, sc });
    }
    res.sort((a, b) => a.sc - b.sc || KORD[a.e.kind] - KORD[b.e.kind] || a.e.title.length - b.e.title.length);
    return res.map((r) => r.e);
  }
  const kindTag = (k) => (k === 'page' ? 'ページ' : KIND[k][0].replace('.', ''));

  function attachSuggest(input, box, opts) {
    opts = opts || {};
    let items = [], sel = -1;
    const go = (h) => (opts.onPick ? opts.onPick(h) : (location.href = EMBED ? h + '&embed=1' : h));
    const render = () => {
      const q = input.value.trim();
      if (!q) { box.classList.remove('show'); return; }
      items = search(q).slice(0, 10);
      sel = -1;
      box.innerHTML = items.length
        ? items.map((e, i) => `<div class="sg" data-i="${i}"><span class="k ${e.kind}">${kindTag(e.kind)}</span><span class="t">${esc(e.title)}</span><span class="where">${esc(e.where)}</span></div>`).join('') + (opts.onPick ? '' : `<div class="sg" data-all="1"><span class="k page">検索</span>「${esc(q)}」をすべての結果で見る</div>`)
        : `<div class="sg-empty">「${esc(q)}」に一致する項目はありません</div>`;
      box.classList.add('show');
    };
    const hi = () => box.querySelectorAll('.sg').forEach((el, i) => el.classList.toggle('sel', i === sel));
    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('keydown', (e) => {
      const n = box.querySelectorAll('.sg').length;
      if (e.key === 'ArrowDown') { sel = Math.min(n - 1, sel + 1); hi(); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(-1, sel - 1); hi(); e.preventDefault(); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (sel >= 0 && sel < items.length) go(items[sel].href);
        else if (!opts.onPick && input.value.trim()) location.href = 'search.html?q=' + encodeURIComponent(input.value.trim());
        else if (opts.onPick && items[0]) go(items[0].href);
      } else if (e.key === 'Escape') { box.classList.remove('show'); input.blur(); }
    });
    box.addEventListener('mousedown', (e) => {
      const it = e.target.closest('.sg');
      if (!it) return;
      e.preventDefault();
      if (it.dataset.all) location.href = 'search.html?q=' + encodeURIComponent(input.value.trim());
      else go(items[+it.dataset.i].href);
    });
    input.addEventListener('blur', () => setTimeout(() => box.classList.remove('show'), 120));
  }

  /* 「/」キーで検索へ */
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      const i = document.querySelector('.bigsearch input, .hsearch input');
      if (i) { e.preventDefault(); const hd = document.querySelector('header.site'); if (hd) hd.classList.add('searching'); i.focus(); }
    }
  });

  /* ---------------- タブ・履歴 ---------------- */
  function addTab(h, title) {
    const tabs = store.get('tabs', []);
    const t = tabs.find((x) => x.href === h);
    if (t) t.title = title; else { tabs.push({ href: h, title }); while (tabs.length > TAB_MAX) tabs.shift(); }
    store.set('tabs', tabs);
  }
  function addHist(h, title, kind) {
    const hs = store.get('hist', []).filter((x) => x.href !== h);
    hs.unshift({ href: h, title, kind, t: Date.now() });
    store.set('hist', hs.slice(0, HIST_MAX));
  }
  function tabsHTML(cur) {
    const tabs = store.get('tabs', []);
    return `<div class="tabstrip" role="tablist"><a class="tab tab-home${cur === 'home' ? ' on' : ''}" href="index.html" title="ホーム"><svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 7.2 8 2l6 5.2V14H9.6v-3.8H6.4V14H2z" fill="currentColor"/></svg></a>${tabs.map((t) => `<a class="tab${t.href === cur ? ' on' : ''}" href="${esc(t.href)}" title="${esc(t.title)}"><span class="tt">${esc(t.title)}</span><button type="button" class="x" data-close="${esc(t.href)}" aria-label="タブを閉じる">×</button></a>`).join('')}<a class="tabnew" href="index.html" title="新しいタブ（ホーム）">＋</a></div>`;
  }
  function bindTabs(cur) {
    document.addEventListener('click', (e) => {
      const x = e.target.closest('[data-close]');
      if (!x) return;
      e.preventDefault(); e.stopPropagation();
      const h = x.dataset.close;
      let tabs = store.get('tabs', []);
      const i = tabs.findIndex((t) => t.href === h);
      tabs = tabs.filter((t) => t.href !== h);
      store.set('tabs', tabs);
      if (h === cur) location.href = tabs.length ? tabs[Math.max(0, i - 1)].href : 'index.html';
      else x.closest('.tab').remove();
    });
  }

  /* ---------------- ヘッダー ---------------- */
  function headerHTML(active, cur) {
    const nav = [['book', 'book.html', '教科書'], ['index', 'sakuin.html', '索引'], ['problems', 'problems.html', '問題'], ['roadmap', 'roadmap.html', 'ロードマップ']];
    return `${tabsHTML(cur)}<header class="site">
      <button type="button" class="icon-btn js-drawer" aria-label="目次を開く">☰</button>
      <a class="brand" href="index.html"><span class="jp">${SITE.jp}</span><span class="en">${SITE.en}</span></a>
      <div class="hsearch"><span class="mag">⌕</span><input type="search" placeholder="用語・定理を検索（ひらがな可）" aria-label="検索" autocomplete="off"><kbd>/</kbd><div class="suggest"></div></div>
      <nav class="main">${nav.map(([k, h, t]) => `<a href="${h}"${k === active ? ' class="on"' : ''}>${t}</a>`).join('')}</nav>
      <div class="tools">${active === 'article' || active === 'chapter' ? '<button type="button" class="btn js-split">⇆ 並べて表示</button><button type="button" class="btn dark js-pdf">PDF</button>' : ''}</div>
      <button type="button" class="icon-btn js-msearch" aria-label="検索">⌕</button>
    </header>`;
  }
  function bindHeader() {
    const hd = document.querySelector('header.site');
    if (!hd) return;
    const inp = hd.querySelector('.hsearch input');
    attachSuggest(inp, hd.querySelector('.suggest'));
    hd.querySelector('.js-msearch').addEventListener('click', () => { hd.classList.add('searching'); inp.focus(); });
    inp.addEventListener('blur', () => setTimeout(() => hd.classList.remove('searching'), 150));
    const dr = hd.querySelector('.js-drawer');
    dr.addEventListener('click', () => document.documentElement.classList.toggle('drawer'));
  }

  /* ---------------- 目次・スクロール追従 ---------------- */
  function tocHTML(toc, title) {
    return `<div class="toc-h">${esc(title || '目次')}</div><ol>${toc.map((s) => `<li><a href="#${s.id}" data-spy="${s.id}"><span class="lbl">${s.label}</span>${esc(s.title)}</a>${s.children.length ? `<ol>${s.children.map((c) => `<li><a href="#${c.id}" data-spy="${c.id}"><span class="lbl">${c.label}</span>${rich(c.title)}</a></li>`).join('')}</ol>` : ''}</li>`).join('')}</ol>`;
  }
  function tocTools(withPdf) {
    return `<div class="toc-tools"><button type="button" class="js-open-proofs">証明をすべて開く</button><button type="button" class="js-open-notes">メモをすべて開く</button><button type="button" class="js-open-qa">Q&amp;A をすべて開く</button><button type="button" class="js-close-all">すべて閉じる</button>${withPdf ? '<button type="button" class="js-pdf">PDF で保存</button><button type="button" class="js-split">並べて表示</button>' : ''}</div>`;
  }
  function bindTocTools() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-open-proofs')) setAll('.proof-ctl [data-tg]', true);
      if (e.target.closest('.js-open-notes')) setAll('.note-h[data-tg]', true);
      if (e.target.closest('.js-open-qa')) setAll('.qa-q[data-tg]', true);
      if (e.target.closest('.js-close-all')) setAll('[data-tg]', false);
      if (e.target.closest('.toc a') || e.target.closest('.drawer-ov')) document.documentElement.classList.remove('drawer');
    });
  }
  function bindSpy() {
    const links = [...document.querySelectorAll('.toc a[data-spy], .m-tocbar a[data-spy]')];
    const ids = [...new Set(links.map((a) => a.dataset.spy))];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr-h')) || 56) + 60;
      let cur = els[0];
      for (const el of els) { if (el.getBoundingClientRect().top < y) cur = el; else break; }
      links.forEach((a) => a.classList.toggle('on', cur && a.dataset.spy === cur.id));
      // 親の節もハイライト
      const on = document.querySelector('.toc a.on');
      if (on) { const li = on.closest('ol ol') && on.closest('ol ol').parentElement; if (li) li.querySelector(':scope > a').classList.add('on'); }
      const mt = document.querySelector('.m-tocbar a.on');
      if (mt) { const bar = mt.parentElement; const l = mt.offsetLeft - bar.clientWidth / 2 + mt.clientWidth / 2; bar.scrollTo({ left: l, behavior: 'smooth' }); }
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------------- PDF 設定 ---------------- */
  const PDF_OPTS = [
    ['sketch', '概略の証明', true], ['full', '厳密な証明', true], ['why', '「なぜ？」の補足', false], ['note', 'メモ', true],
    ['fig', 'グラフ・図', true], ['qa', 'Q&A の答え', true], ['prob', '問題', true], ['hint', 'ヒント', false], ['ans', '解答', false], ['space', '解答欄（広め）', true],
  ];
  function pdfModalHTML(what) {
    if (HOSTED) {
      return `<div class="modal-ov" id="pdfmodal"><div class="modal" role="dialog" aria-label="PDF 出力について">
      <h3>PDF で保存</h3><p class="d">claude.ai 上の表示では、ブラウザの印刷画面を開けないため PDF に保存できません。PDF が必要なときは、Claude に「${esc(what)} を PDF にして」と頼むか、GitHub から取り出したフォルダの index.html を手元のブラウザで開いてください。手元で開けば、含める項目を選んで A4 で保存できます。</p>
      <div class="row"><button type="button" class="pbtn js-cancel">閉じる</button></div>
    </div></div>`;
    }
    return '';
  }
  function applyPdfOpts(opts) {
    PDF_OPTS.forEach(([k]) => document.body.classList.toggle('p-no-' + k, !opts[k]));
  }
  /* 通常版：「PDF」ボタンは、あらかじめ作ってある PDF をそのままダウンロードする */
  function pdfFile() {
    const chNo = params.get('ch'), aid = params.get('id');
    if (chNo != null && chNo !== '') {
      const c = BOOK.find((x) => String(x.no) === String(chNo));
      if (c) return { href: 'pdf/ch' + String(c.no).padStart(2, '0') + '.pdf', name: '第' + c.no + '章_' + c.title + '.pdf' };
    } else if (aid && byId[aid]) return { href: 'pdf/a/' + aid + '.pdf', name: byId[aid].title + '.pdf' };
    return null;
  }
  function bindPdf() {
    // 印刷（PDF 書き出し）時の標準設定：ヒント・解答・「なぜ？」は含めない
    if (!HOSTED) {
      const o = {}; PDF_OPTS.forEach(([k, , d]) => (o[k] = d));
      if (params.get('pdf')) { const want = new Set(params.get('pdf').split(',')); PDF_OPTS.forEach(([k]) => (o[k] = want.has(k))); }
      applyPdfOpts(o);
    }
    const m = document.getElementById('pdfmodal');
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.js-pdf')) return;
      document.documentElement.classList.remove('drawer');
      if (HOSTED) { if (m) m.classList.add('show'); return; }
      const f = pdfFile();
      if (!f) return;
      const a = document.createElement('a');
      a.href = f.href; a.download = f.name; document.body.appendChild(a); a.click(); a.remove();
    });
    if (m) m.addEventListener('click', (e) => { if (e.target.closest('.js-cancel') || e.target === m) m.classList.remove('show'); });
  }

  /* ---------------- 共通の骨組み ---------------- */
  function shell(active, cur, main, extras) {
    return (EMBED ? '' : headerHTML(active, cur)) + (extras && extras.mtoc ? extras.mtoc : '') + main + '<div class="drawer-ov"></div>' + (extras && extras.modal ? extras.modal : '');
  }
  function backlinks(id) {
    const re = new RegExp('\\[\\[' + id.replace(/[-]/g, '\\-') + '[\\]|#]');
    return ARTS.filter((a) => a.id !== id && JSON.stringify(a.body).match(re));
  }
  function common(cur) {
    bindHeader();
    bindTabs(cur);
    bindTocTools();
    bindToggles(document.body);
    bindPeek();
    bindPdf();
    if (EMBED) {
      document.documentElement.classList.add('embed');
      document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (a && /^(article|book)\.html/.test(a.getAttribute('href')) && !a.getAttribute('href').includes('embed=1')) {
          e.preventDefault();
          const h = a.getAttribute('href');
          location.href = h.replace(/(\?[^#]*)/, '$1&embed=1');
        }
      });
    }
    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-split')) {
        const id = params.get('id');
        location.href = 'split.html?l=' + encodeURIComponent(id ? 'article.html?id=' + id : 'book.html?ch=' + params.get('ch'));
      }
    });
  }
  const mtocHTML = (toc) => `<nav class="m-tocbar" aria-label="節">${toc.map((s) => `<a href="#${s.id}" data-spy="${s.id}">${s.label} ${esc(s.title)}</a>`).join('')}</nav>`;

  /* ================= 記事ページ ================= */
  function articlePage() {
    const id = params.get('id') || ARTS[0].id;
    const art = byId[id];
    const app = document.getElementById('app');
    if (!art) { app.innerHTML = shell('article', '', `<div class="layout"><div></div><article class="doc"><h1 class="title">ページが見つかりません</h1><p class="ui">「${esc(id)}」というページはまだありません。<a class="wl" href="index.html">ホームへ戻る</a></p></article></div>`); common(''); return; }
    PAGE = { mode: 'dict', cur: id, inPage: new Set([id]) };
    const cur = 'article.html?id=' + id;
    document.title = art.title + ' — ' + SITE.jp;
    if (!EMBED) { addTab(cur, art.title); addHist(cur, art.title, art.kind); }
    const r = renderBody(art, { mode: 'dict', cnt: { fig: 0 } });
    const chap = chapterOf(id);
    const back = backlinks(id);
    const impChip = art.importance === 3 ? '<span class="chip imp">★ 最重要</span>' : art.importance === 2 ? '<span class="chip imp">重要</span>' : '';
    const main = `<div class="layout">
      <nav class="toc" aria-label="目次">${tocHTML(r.toc)}${tocTools(true)}</nav>
      <article class="doc">
        <div class="pdf-head"><span>${SITE.jp}</span><span>${esc(art.field)} ／ ${esc(art.title)}</span></div>
        <div class="crumbs"><a href="sakuin.html">辞書</a> › ${esc(art.grade || '')} › ${esc(art.field)} › <b>${esc(art.title)}</b></div>
        <h1 class="title">${esc(art.title)}${art.sub ? `<span class="sub">${esc(art.sub)}</span>` : ''}</h1>
        <div class="meta"><span class="chip kind">${esc(art.kind)}</span><span class="chip">分野：${esc(art.field)}</span>${art.grade ? `<span class="chip">学年：${esc(art.grade)}</span>` : ''}${impChip}${art.status === 'wip' ? '<span class="chip wip">作成中</span>' : ''}</div>
        ${art.prereq && art.prereq.length ? `<div class="prereq"><span class="lbl">このページを読む前に</span>${art.prereq.map((p) => links('[[' + p + ']]')).join('')}</div>` : ''}
        <div class="synopsis"><span class="cap">Synopsis</span><span class="capjp">梗概</span><p>${rich(art.synopsis)}</p></div>
        ${symNote(art)}
        ${r.html}
      </article>
      <aside class="rel">
        <div class="rel-sec"><div class="rel-h">関連ページ</div>${(art.related || []).map((p) => links('[[' + p + ']]')).join('') || '<span class="ui" style="color:var(--muted)">なし</span>'}</div>
        <div class="rel-sec"><div class="rel-h">このページの番号</div><div class="num-list">${r.nums.map((n) => `<a href="#${n.id}" style="color:var(--${n.kind === 'problem' ? 'prob' : n.kind})">${n.label}</a>`).join('')}</div></div>
        ${chap ? `<div class="rel-sec"><div class="rel-h">教科書で読む</div><a href="book.html?ch=${chap.ch.no}#sec-${id}">第 ${chap.ch.no} 章　${esc(chap.ch.title)} §${chap.ch.no}.${chap.idx}</a></div>` : ''}
        <div class="rel-sec"><div class="rel-h">このページを参照しているページ</div>${back.map((a) => `<a href="article.html?id=${a.id}">${esc(a.title)}</a>`).join('') || '<span style="color:var(--muted)">なし</span>'}</div>
      </aside>
    </div>`;
    app.innerHTML = shell('article', cur, main, { mtoc: mtocHTML(r.toc), modal: pdfModalHTML('「' + art.title + '」のページ') });
    mountFigs(app, r.figs);
    common(cur);
    bindSpy();
    if (location.hash) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) setTimeout(() => t.scrollIntoView(), 50); }
  }

  /* ================= 教科書 ================= */
  function bookIndexPage() {
    const app = document.getElementById('app');
    document.title = '教科書 — ' + SITE.jp;
    const main = `<div class="page-wrap"><h1 class="title">教科書</h1><p class="lead ui">章ごとに、辞書のページを順番に並べて通読できる形にしたものです。内容は辞書と同じで、章の導入と章末のまとめが加わります。章ごとに 1 冊の PDF として保存できます。</p>
      <div class="ch-list">${BOOK.map((c) => `<a class="ch-card${c.sections.length ? '' : ' off'}" href="${c.sections.length ? 'book.html?ch=' + c.no : '#'}"><span class="gl">${esc(c.glyph)}</span><span class="cn">第 ${c.no} 章</span><span class="ct">${esc(c.title)}</span><span class="cg">${esc(c.grade)}</span><span class="cs">${c.sections.length ? c.sections.map((s, i) => `§${c.no}.${i + 1} ${esc(byId[s].title)}`).join('<br>') : '準備中'}</span></a>`).join('')}</div></div>`;
    app.innerHTML = shell('book', 'book.html', main);
    common('book.html');
  }

  function chapterPage() {
    const no = +params.get('ch');
    const c = BOOK.find((x) => x.no === no);
    if (!c || !c.sections.length) return bookIndexPage();
    const app = document.getElementById('app');
    const cur = 'book.html?ch=' + no;
    const title = `第 ${no} 章　${c.title}`;
    document.title = title + ' — ' + SITE.jp;
    if (!EMBED) { addTab(cur, '第' + no + '章 ' + c.title); addHist(cur, title, '教科書'); }
    PAGE = { mode: 'book', inPage: new Set(c.sections) };
    const cnt = { item: 0, eq: 0, fig: 0 };
    const allFigs = [];
    const toc = [];
    let body = '';
    c.sections.forEach((sid, i) => {
      const art = byId[sid];
      const r = renderBody(art, { mode: 'book', ch: no, secIdx: i + 1, cnt });
      r.figs.forEach((f) => allFigs.push(f));
      // 図の番号を全体で通すため data-fig を振り直す
      let html = r.html.replace(/data-fig="(\d+)"/g, (m, k) => `data-fig="${allFigs.length - r.figs.length + +k}"`);
      toc.push({ id: 'sec-' + sid, label: `${no}.${i + 1}`, title: art.title, children: r.toc.map((s) => ({ id: s.id, label: s.label, title: s.title })) });
      body += `<section class="book-section" id="sec-${sid}"><h2 class="sec"><span class="n">${no}.${i + 1}</span>${esc(art.title)}<a class="to-dict ui" href="article.html?id=${sid}">辞書で開く ↗</a></h2>
        <div class="synopsis"><span class="cap">Synopsis</span><span class="capjp">梗概</span><p>${rich(art.synopsis)}</p></div>${symNote(art)}${html}</section>`;
    });
    const prev = BOOK.filter((x) => x.no < no && x.sections.length).pop();
    const next = BOOK.find((x) => x.no > no && x.sections.length);
    const main = `<div class="layout">
      <nav class="toc" aria-label="目次">${tocHTML(toc, '第 ' + no + ' 章の目次')}${tocTools(true)}</nav>
      <article class="doc">
        <div class="pdf-head"><span>${SITE.jp}　教科書</span><span>${esc(title)}</span></div>
        <div class="crumbs"><a href="book.html">教科書</a> › <b>第 ${no} 章</b></div>
        <h1 class="title"><span class="chno">第 ${no} 章</span>${esc(c.title)}</h1>
        <div class="meta"><span class="chip kind">教科書</span><span class="chip">${esc(c.grade)}</span><span class="chip">${c.sections.length} 節</span></div>
        ${c.intro ? `<div class="chapter-intro">${rich(c.intro)}</div>` : ''}
        ${body}
        ${c.summary ? `<div class="chapter-sum"><span class="cap">Summary</span><span class="capjp">この章のまとめ</span><p>${rich(c.summary)}</p></div>` : ''}
        <div class="ch-nav ui">${prev ? `<a href="book.html?ch=${prev.no}">← 第 ${prev.no} 章 ${esc(prev.title)}</a>` : '<span></span>'}${next ? `<a href="book.html?ch=${next.no}">第 ${next.no} 章 ${esc(next.title)} →</a>` : ''}</div>
      </article>
      <aside class="rel">
        <div class="rel-sec"><div class="rel-h">章の一覧</div>${BOOK.map((x) => (x.sections.length ? `<a href="book.html?ch=${x.no}"${x.no === no ? ' style="font-weight:700;color:var(--accent)"' : ''}>第 ${x.no} 章　${esc(x.title)}</a>` : `<span style="display:block;color:var(--muted);padding:2px 0">第 ${x.no} 章　${esc(x.title)}（準備中）</span>`)).join('')}</div>
        <div class="rel-sec"><div class="rel-h">この章を 1 冊の PDF に</div><button type="button" class="btn dark js-pdf" style="width:100%">PDF で保存</button></div>
      </aside>
    </div>`;
    app.innerHTML = shell('chapter', cur, main, { mtoc: mtocHTML(toc), modal: pdfModalHTML('「' + title + '」') });
    mountFigs(app, allFigs);
    common(cur);
    bindSpy();
    if (location.hash) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) setTimeout(() => t.scrollIntoView(), 50); }
  }

  /* ================= 索引 ================= */
  const ROWS = [['あ', 'あいうえお'], ['か', 'かきくけこがぎぐげご'], ['さ', 'さしすせそざじずぜぞ'], ['た', 'たちつてとだぢづでど'], ['な', 'なにぬねの'], ['は', 'はひふへほばびぶべぼぱぴぷぺぽ'], ['ま', 'まみむめも'], ['や', 'やゆよ'], ['ら', 'らりるれろ'], ['わ', 'わをん']];
  const rowOf = (y) => { const c = norm(y)[0] || ''; const r = ROWS.find(([, s]) => s.includes(c)); return r ? r[0] : 'A–Z'; };
  function indexPage() {
    const app = document.getElementById('app');
    document.title = '索引 — ' + SITE.jp;
    const mode = params.get('by') === 'field' ? 'field' : 'kana';
    const entries = INDEX.slice().sort((a, b) => norm(a.yomi || a.title).localeCompare(norm(b.yomi || b.title), 'ja'));
    const groups = {};
    entries.forEach((e) => { const g = mode === 'kana' ? rowOf(e.yomi || e.title) : e.field; (groups[g] = groups[g] || []).push(e); });
    const order = mode === 'kana' ? ROWS.map((r) => r[0]).concat('A–Z') : Object.keys(groups);
    const main = `<div class="page-wrap"><h1 class="title">索引</h1>
      <div class="seg ui"><a href="sakuin.html"${mode === 'kana' ? ' class="on"' : ''}>五十音順</a><a href="sakuin.html?by=field"${mode === 'field' ? ' class="on"' : ''}>分野別</a></div>
      ${mode === 'kana' ? `<div class="kana-nav ui">${order.map((g) => (groups[g] ? `<a href="#g-${g}">${g}</a>` : `<span>${g}</span>`)).join('')}</div>` : ''}
      ${order.filter((g) => groups[g]).map((g) => `<section class="idx-group" id="g-${esc(g)}"><h2 class="idx-h">${esc(g)}<span class="cnt ui">${groups[g].length}</span></h2><ul class="idx-list">${groups[g].map((e) => `<li><a href="${e.href}"><span class="k ${e.kind} ui">${kindTag(e.kind)}</span><span class="t">${esc(e.title)}</span><span class="y ui">${esc(e.yomi)}</span><span class="w ui">${esc(e.where)}</span></a></li>`).join('')}</ul></section>`).join('')}
    </div>`;
    app.innerHTML = shell('index', 'sakuin.html', main);
    common('sakuin.html');
  }

  /* ================= 検索結果 ================= */
  function searchPage() {
    const app = document.getElementById('app');
    const q = params.get('q') || '';
    document.title = '検索：' + q + ' — ' + SITE.jp;
    const fields = [...new Set(ARTS.map((a) => a.field))];
    const kinds = [['page', 'ページ'], ['def', '定義'], ['thm', '定理'], ['prop', '命題'], ['cor', '系'], ['ax', '公理']];
    const main = `<div class="page-wrap"><h1 class="title">検索</h1>
      <div class="sbar ui"><input type="search" class="sq" value="${esc(q)}" placeholder="用語・定理を検索（ひらがな可）" autocomplete="off">
        <select class="sf"><option value="">すべての分野</option>${fields.map((f) => `<option>${esc(f)}</option>`).join('')}</select></div>
      <div class="kchips ui">${kinds.map(([k, t]) => `<label><input type="checkbox" value="${k}" checked>${t}</label>`).join('')}</div>
      <div class="sres"></div></div>`;
    app.innerHTML = shell('', 'search', main);
    common('search');
    const run = () => {
      const qq = app.querySelector('.sq').value;
      const field = app.querySelector('.sf').value;
      const ks = new Set([...app.querySelectorAll('.kchips input:checked')].map((c) => c.value));
      const res = search(qq, { field, kinds: ks });
      app.querySelector('.sres').innerHTML = qq.trim()
        ? `<p class="ui" style="color:var(--muted);font-size:12.5px">${res.length} 件</p><ul class="idx-list">${res.map((e) => `<li><a href="${e.href}"><span class="k ${e.kind} ui">${kindTag(e.kind)}</span><span class="t">${esc(e.title)}</span><span class="y ui">${esc(e.yomi)}</span><span class="w ui">${esc(e.where)}</span></a></li>`).join('')}</ul>`
        : '';
    };
    app.querySelectorAll('.sq, .sf, .kchips input').forEach((el) => el.addEventListener('input', run));
    run();
  }

  /* ================= 問題一覧 ================= */
  function problemsPage() {
    const app = document.getElementById('app');
    document.title = '問題 — ' + SITE.jp;
    PAGE = { mode: 'dict', inPage: new Set() };
    const list = [];
    ARTS.forEach((a) => a.body.forEach((b) => { if (b.t === 'problem') list.push({ a, b }); }));
    const main = `<div class="page-wrap"><h1 class="title">問題</h1><p class="lead ui">各ページに置いた問題の一覧です。解答は各ページで開けます。</p>
      <ul class="prob-list">${list.map(({ a, b }) => `<li><a href="article.html?id=${a.id}#${b.id}"><span class="diff ui">${'●'.repeat(b.level || 1)}${'○'.repeat(3 - (b.level || 1))}</span><span class="pt">${rich(b.text)}</span><span class="w ui">${esc(a.title)}</span></a></li>`).join('')}</ul></div>`;
    app.innerHTML = shell('problems', 'problems.html', main);
    common('problems.html');
  }

  /* ================= ロードマップ ================= */
  function roadmapPage() {
    const app = document.getElementById('app');
    document.title = 'ロードマップ — ' + SITE.jp;
    const later = [['今後の予定', ['偏微分・全微分（第 8 章）', '重積分（第 9 章）', '位相空間', '複素解析', 'スペクトル理論']]];
    const grades = [...new Set(BOOK.map((c) => c.grade))];
    const main = `<div class="page-wrap"><h1 class="title">ロードマップ</h1><p class="lead ui">学部 1 年から研究の入口まで、学ぶ順番の地図です。色の付いた章は読めます。</p>
      <div class="road">${grades.map((g) => `<div class="road-row"><div class="road-g ui">${esc(g)}</div><div class="road-nodes">${BOOK.filter((c) => c.grade === g).map((c) => `<a class="node${c.sections.length ? '' : ' off'}" href="${c.sections.length ? 'book.html?ch=' + c.no : '#'}"><span class="gl">${esc(c.glyph)}</span><span class="nt">第 ${c.no} 章<br><b>${esc(c.title)}</b></span></a>`).join('<span class="arr">→</span>')}</div></div>`).join('')}
      ${later.map(([g, ts]) => `<div class="road-row"><div class="road-g ui">${g}</div><div class="road-nodes">${ts.map((t) => `<span class="node off"><span class="nt"><b>${t}</b><br>準備中</span></span>`).join('<span class="arr">→</span>')}</div></div>`).join('')}</div></div>`;
    app.innerHTML = shell('roadmap', 'roadmap.html', main);
    common('roadmap.html');
  }

  /* ================= 並べて表示 ================= */
  function splitPage() {
    const app = document.getElementById('app');
    document.title = '並べて表示 — ' + SITE.jp;
    const L = params.get('l') || '', Rr = params.get('r') || '';
    const pane = (side, src) => `<div class="pane" data-side="${side}"><div class="pane-bar ui"><span class="side">${side === 'l' ? '左' : '右'}</span><div class="hsearch pane-search"><span class="mag">⌕</span><input type="search" placeholder="表示するページを検索" autocomplete="off"><div class="suggest"></div></div></div>${src ? `<iframe src="${esc(src)}${src.includes('?') ? '&' : '?'}embed=1" title="${side}"></iframe>` : '<div class="pane-empty ui">上の欄で、並べて表示するページを検索してください。</div>'}</div>`;
    const main = `<div class="split-switch ui"><button type="button" data-s="l" class="on">左のページ</button><button type="button" data-s="r">右のページ</button></div><div class="split" data-show="l">${pane('l', L)}${pane('r', Rr)}</div>`;
    app.innerHTML = shell('', 'split', main);
    common('split');
    app.querySelectorAll('.pane').forEach((p) => {
      attachSuggest(p.querySelector('input'), p.querySelector('.suggest'), {
        onPick: (h) => {
          const q = new URLSearchParams(location.search);
          q.set(p.dataset.side, h);
          location.search = q.toString();
        },
      });
    });
    app.querySelectorAll('.split-switch button').forEach((b) => b.addEventListener('click', () => {
      app.querySelector('.split').dataset.show = b.dataset.s;
      app.querySelectorAll('.split-switch button').forEach((x) => x.classList.toggle('on', x === b));
    }));
  }

  /* ================= ホーム ================= */
  function homePage() {
    const app = document.getElementById('app');
    document.title = SITE.jp + ' — ' + SITE.en;
    PAGE = { mode: 'dict', inPage: new Set() };
    const hist = store.get('hist', []);
    const named = [];
    ARTS.forEach((a) => a.body.forEach((b) => { if ((b.t === 'thm' || b.t === 'def' || b.t === 'prop') && b.title) named.push({ a, b }); }));
    const d = new Date();
    const pick = named[(d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % named.length];
    const lastBook = hist.find((h) => h.href.startsWith('book.html?ch='));
    const tiles = BOOK.map((c) => `<a class="qt${c.sections.length ? '' : ' off'}" href="${c.sections.length ? 'book.html?ch=' + c.no : 'roadmap.html'}"><span class="gl">${esc(c.glyph)}</span><span class="qn ui">第 ${c.no} 章</span><span class="qx">${esc(c.title)}</span></a>`).join('')
      + `<a class="qt sp" href="roadmap.html"><span class="gl">⇢</span><span class="qn ui">全体の地図</span><span class="qx">ロードマップ</span></a><a class="qt sp" href="sakuin.html"><span class="gl">あ</span><span class="qn ui">五十音・分野別</span><span class="qx">索引</span></a><a class="qt sp" href="problems.html"><span class="gl">?</span><span class="qn ui">演習</span><span class="qx">問題</span></a>`;
    const [en, jp] = KIND[pick.b.t];
    const main = `${tabsHTML('home')}<div class="home">
      <svg class="home-bg" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${homeBg()}</svg>
      <div class="home-top ui"><a href="book.html">教科書</a><a href="sakuin.html">索引</a><a href="problems.html">問題</a><a href="roadmap.html">ロードマップ</a></div>
      <main class="hero">
        <div class="logo"><span class="jp">${SITE.jp}</span><span class="en">${SITE.en}</span></div>
        <div class="bigsearch"><span class="mag">⌕</span><input type="search" placeholder="用語・定理を検索（ひらがなでも可）" aria-label="検索" autocomplete="off" autofocus><kbd>/</kbd><div class="suggest"></div></div>
        <div class="hero-btns ui"><button type="button" class="js-go">辞書で引く</button><button type="button" class="js-lucky">ランダムな定理</button></div>
        <div class="quick">${tiles}</div>
      </main>
      <section class="feed">
        <div class="card"><h4 class="ui">最近見たページ</h4>${hist.length ? `<ul class="hist ui">${hist.slice(0, 6).map((h) => `<li><a href="${esc(h.href)}"><span class="k ui">${esc(h.kind || '')}</span>${esc(h.title)}</a></li>`).join('')}</ul>` : '<p class="ui empty">まだありません。検索するか、上の章から読み始めてください。</p>'}</div>
        <div class="card"><h4 class="ui">続きから読む</h4>${lastBook ? `<a class="cont" href="${esc(lastBook.href)}"><span class="ct">${esc(lastBook.title)}</span><span class="ui">教科書</span></a>` : `<a class="cont" href="book.html?ch=1"><span class="ct">第 1 章　実数とその性質</span><span class="ui">最初から読む</span></a>`}<a class="cont" href="article.html?id=sequence-convergence"><span class="ct">数列の収束（ε-N 論法）</span><span class="ui">おすすめ</span></a></div>
        <div class="card today"><h4 class="ui">今日の一項目</h4><div class="box ${pick.b.t}" data-jp="${jp}"><div class="box-head"><span class="tag">${en}</span><span class="box-title">${rich(pick.b.title)}</span></div><div class="box-body">${para(rich(pick.b.text))}</div></div><a class="more ui" href="article.html?id=${pick.a.id}#${pick.b.id}">「${esc(pick.a.title)}」で読む →</a></div>
      </section>
      <footer class="home-foot ui">${SITE.jp}　個人用の解析学リファレンス　・　<a href="sakuin.html">索引</a>　・　<a href="book.html">教科書</a></footer>
    </div>`;
    app.innerHTML = main;
    bindTabs('home');
    bindPeek();
    const inp = app.querySelector('.bigsearch input');
    attachSuggest(inp, app.querySelector('.bigsearch .suggest'));
    app.querySelector('.js-go').addEventListener('click', () => { const q = inp.value.trim(); location.href = q ? 'search.html?q=' + encodeURIComponent(q) : 'sakuin.html'; });
    app.querySelector('.js-lucky').addEventListener('click', () => { const r = named[Math.floor(Math.random() * named.length)]; location.href = 'article.html?id=' + r.a.id + '#' + r.b.id; });
  }
  function homeBg() {
    let s = '';
    // 収束していく数列とグラフの曲線を薄く描く（背景装飾）
    let path = 'M0,420';
    for (let x = 0; x <= 1200; x += 6) { const t = x / 1200 * 14 + 0.4; path += ` L${x},${420 - 170 * Math.sin(3 * t) / t}`; }
    s += `<path d="${path}" fill="none" stroke="#c9a227" stroke-width="1.4" opacity=".35"/>`;
    s += `<line x1="0" y1="420" x2="1200" y2="420" stroke="#c9a227" stroke-width="1" opacity=".25" stroke-dasharray="6 6"/>`;
    for (let n = 1; n <= 40; n++) { const x = 40 + n * 28; const y = 560 + 120 * Math.pow(-1, n) / n; s += `<circle cx="${x}" cy="${y}" r="3" fill="#8c1c13" opacity=".16"/>`; }
    s += `<path d="M700,0 C780,180 900,240 1200,260" fill="none" stroke="#233d6b" stroke-width="1" opacity=".14"/>`;
    s += `<path d="M640,0 C760,230 920,300 1200,310" fill="none" stroke="#233d6b" stroke-width="1" opacity=".1"/>`;
    return s;
  }

  window.App = { article: articlePage, book: () => (params.get('ch') ? chapterPage() : bookIndexPage()), index: indexPage, search: searchPage, problems: problemsPage, roadmap: roadmapPage, split: splitPage, home: homePage };
})();
