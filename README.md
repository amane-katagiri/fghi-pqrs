# FGHI PQRS

[個人サイトとフィードのつかいかた](https://ama.ne.jp/post/feed-and-you/)という記事のために書かれた Atom フィードジェネレーターの小さなサンプルです。[Qwik](https://qwik.builder.io/)・[Tailwind CSS](https://tailwindcss.com/)・[Modular Forms](https://modularforms.dev/)などで実装されています。

FGHI PQRS では、フィード出力機能を持たない個人サイトからでも、サイト情報と記事の更新情報を入力することで有効な Atom フィードを生成できます。現在以下の機能が実装されています。

- ウィザード形式を用いたサイト情報の入力
- シンプルでカラフルなカード UI による更新情報の登録
- Atom 配信フォーマットを完全に満たす最低限のフィード出力

以下の機能はまだ実装されていません。

- URL を入力した際にサイトや記事のタイトルを取得する機能
- 完成したフィードをサービス内で直接ホスティングする機能
- 他のフォーマットによるフィード出力
- JavaScript が無効な環境への対応

[fghipqrs.ama.ne.jp](https://fghipqrs.ama.ne.jp/)で[Cloudflare Pages](https://pages.cloudflare.com/)にデプロイされたデモ環境を利用できます。
