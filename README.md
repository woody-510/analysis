# 解析学事典（試作）

個人用の解析学リファレンス。辞書（1 用語 1 ページ）と教科書（章ごとの通読）の両方で、同じ内容を読める。

## 開き方

フォルダごと手元に置き、`index.html` をブラウザで開く。インターネット接続は不要（フォントと数式描画はすべて同梱）。

うまく表示されない場合は、このフォルダで簡易サーバーを起動して `http://localhost:8080/` を開く。

```
npx http-server -p 8080 .
```

## ファイル構成

| 場所 | 中身 |
|---|---|
| `index.html` ほか | 各画面（ホーム・記事・教科書・索引・検索・問題・ロードマップ・並べて表示） |
| `content/articles.js` | 記事データ。1 記事 = 1 オブジェクト |
| `content/book.js` | 教科書の章立て（記事 id の並び） |
| `assets/css/` | 見た目（`site.css` 共通・印刷、`pages.css` 各画面） |
| `assets/js/app.js` | 描画・検索・タブ・目次・PDF 設定 |
| `assets/js/graph.js` | 式を書き換えられるグラフ |
| `assets/fonts/`, `assets/vendor/katex/` | 同梱フォントと KaTeX |

## 記事の書き方（要点）

- 数式は `$…$`（文中）と `$$…$$`（別行）。式番号は `\tag{#}` で自動。
- 内部リンクは `[[記事id]]`、`[[記事id#箱のid|表示名]]`。
- ブロックの種類：`h2` `p` `def` `thm` `prop` `lem` `cor` `ax` `ex` `rem` `note` `strategy` `proof` `crux` `fig` `problem`。
