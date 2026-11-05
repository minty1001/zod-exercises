# 練習10：React Hook FormとZodの基本的な統合

## 前提知識

この問題に取り組むうえで、React Hook Formの使い方を詳しく理解している必要はありません。
React Hook Formが、入力値やエラーなどのフォーム状態を管理するライブラリであることが分かっていれば十分です。

## 問題

ログインフォームと、その入力値を検証する`loginSchema`が定義されています。
フォームの入力欄、送信処理、バリデーションエラーの表示は実装済みです。

React Hook Formが`loginSchema`を使って入力値を検証するように、フォームへZodのresolverを設定してください。

### 学習のゴール

resolverを介してZodのバリデーションスキーマをReact Hook Formへ組み込み、フォームの入力値をそのスキーマで検証できるようになることがゴールです。
この問題では、`zodResolver(loginSchema)`がZodスキーマとReact Hook Formを接続する役割を持ちます。

### 対象ファイル

[/src/exercises/10-form-basic/Form.tsx](/src/exercises/10-form-basic/Form.tsx)

### 実装要件

- `@hookform/resolvers/zod`から`zodResolver`をインポートする
- `useForm()`の`resolver`に、`loginSchema`から作成したresolverを設定する
- 入力欄、エラー表示、送信処理は変更しない

## 合格条件

以下のコマンドでアプリを起動し、ブラウザで`http://localhost:5173/#/exercise/10`を開いてください。

```bash
npm run dev
```

画面を操作し、以下のチェックリストをすべて満たすことを確認してください。

- [ ] メールアドレス形式ではない値と8文字未満のパスワードを入力して「ログイン」を押すと、両方の入力欄にエラーメッセージが表示される
- [ ] メールアドレスへ`user@example.com`、パスワードへ8文字以上の値を入力して「ログイン」を押すと、エラーメッセージが表示されない
- [ ] 正しい入力値で送信すると、フォームの下に`送信成功：user@example.com`と表示される

## 解説・ヒント

React Hook Formの`useForm()`は、`resolver`を設定すると外部のスキーマライブラリを使って入力値を検証できます。
Zodを利用する場合は、`@hookform/resolvers/zod`が提供する`zodResolver`へスキーマを渡します。

```tsx
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
});
```

フォーム送信時にスキーマの検証が実行され、検証に失敗した項目は`formState.errors`に格納されます。
この問題ではエラーを表示する処理が既に実装されているため、resolverを設定すると画面へメッセージが表示されます。

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/10-form-basic/Form.tsx](/solution/exercises/10-form-basic/Form.tsx)
