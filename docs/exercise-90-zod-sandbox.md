# Sandbox 90：Zod単体

Zodのスキーマと入力値を自由に変更し、検証結果を確認するためのSandboxです。
練習問題ではないため、決められた要件や合格条件はありません。

## 編集するファイル

- [/src/exercises/90-zod-sandbox/schema.ts](/src/exercises/90-zod-sandbox/schema.ts)：試したいスキーマを定義します
- [/src/exercises/90-zod-sandbox/schema.test.ts](/src/exercises/90-zod-sandbox/schema.test.ts)：入力値、検証方法、期待する結果を記述します

## 動作確認

以下のコマンドを実行してください。

```bash
npm run test:sandbox
```

`schema.test.ts`のテスト結果と、`console.log()`で出力した`safeParse()`の結果をターミナルで確認できます。
スキーマや入力値を変更した後は、同じコマンドを再実行してください。
