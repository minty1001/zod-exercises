# Sandbox 91：フォームとの統合

React Hook FormとZodを統合したフォームを自由に変更し、ブラウザで動作を確認するためのSandboxです。
練習問題ではないため、決められた要件や合格条件はありません。

## 編集するファイル

- [/src/exercises/91-form-sandbox/schema.ts](/src/exercises/91-form-sandbox/schema.ts)：フォームの入力値を検証するZodスキーマを定義します
- [/src/exercises/91-form-sandbox/Form.tsx](/src/exercises/91-form-sandbox/Form.tsx)：入力欄、エラー表示、送信処理を編集します

スキーマのプロパティを追加または削除するときは、`Form.tsx`の入力欄とエラー表示も同じプロパティ名に合わせてください。

## 動作確認

以下のコマンドでアプリを起動してください。

```bash
npm run dev
```

ブラウザで`http://localhost:5173/#/exercise/91`を開き、入力値を変えて送信します。
検証に失敗した場合のエラーメッセージと、検証に成功した場合の送信結果を画面で確認できます。
