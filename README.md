# 解析学大全（試作）

個人用の解析学リファレンス。辞書（1 用語 1 ページ）と教科書（章ごとの通読）の両方で、同じ内容を読める。

## 開き方

フォルダごと手元に置き、`index.html` をブラウザで開く。インターネット接続は不要（フォントと数式描画はすべて同梱）。

うまく表示されない場合は、このフォルダで簡易サーバーを起動して `http://localhost:8080/` を開く。

```
npx http-server -p 8080 .
```

## claude.ai で公開するとき

`python3 tools/build_artifact.py <出力フォルダ>` で公開用の版を作る。フォントを Google Fonts から読み込み、印刷画面を開けない公開先では PDF ボタンが案内に切り替わる。

## ファイル構成

| 場所 | 中身 |
|---|---|
| `index.html` ほか | 各画面（ホーム・記事・教科書・索引・検索・問題・ロードマップ・並べて表示） |
| `content/articles.js` | 記事データ（第 1・2 章）。1 記事 = 1 オブジェクト |
| `content/continuity.js` | 記事データ（第 4 章 関数の極限と連続） |
| `content/derivative.js` | 記事データ（第 5 章 微分） |
| `content/book.js` | 教科書の章立て（記事 id の並び） |
| `assets/css/` | 見た目（`site.css` 共通・印刷、`pages.css` 各画面） |
| `assets/js/app.js` | 描画・検索・タブ・目次・PDF 設定 |
| `assets/js/graph.js` | 式を書き換えられるグラフ（数式パーサー込み） |
| `assets/fonts/`, `assets/vendor/katex/` | 同梱フォントと KaTeX |

## 記事の書き方（要点）

- 数式は `$…$`（文中）と `$$…$$`（別行）。式番号は `\tag{#}` で自動。
- 内部リンクは `[[記事id]]`、`[[記事id#箱のid|表示名]]`。
- ブロックの種類：`h2` `p` `def` `thm` `prop` `lem` `cor` `ax` `ex` `rem` `note` `strategy` `proof` `crux` `fig` `problem`。
- 図（`fig`）の `type`：`seq`（数列と ε 帯）、`epsdelta`（ε-δ。`cont: true` で連続性）、`ivt`（中間値）、`tangent`（割線と接線）、`rolle`・`mvt`（ロル／平均値）、`extrema`（最大最小）、`subseq`（部分列）。`editable: true` で式を書き換えられる。

## 配色の考え方

根本的なものほど強い色にしている。定義＝朱赤、公理＝墨、定理＝紺、命題＝深緑、系＝紫、補題＝灰、例＝青緑、注意＝琥珀。重要度の印も赤。モノクロ印刷でも、定義は「左の太線」、定理は「枠」と形で区別できる。
