# 練習4：カスタムバリデーション

## 問題

パスワードを検証する`passwordSchema`のひな形が定義されています。
8文字以上という既存の条件は変更せず、以下のカスタムバリデーションを追加してください。

### 対象ファイル

[/src/exercises/04-custom-validation/schema.ts](/src/exercises/04-custom-validation/schema.ts)

### バリデーション要件

- 8文字以上の文字列
- 半角英大文字を1文字以上含む
- 数字を1文字以上含む
- カスタムバリデーションに失敗した場合のメッセージ：`大文字と数字をそれぞれ1文字以上含めてください`

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex04
```

## 解説・ヒント

`.refine()`を使うと、関数で独自の検証条件を定義できます。関数が`true`を返すと成功、`false`を返すと失敗です。

```ts
const evenNumberSchema = z.number().refine((value) => value % 2 === 0, {
  error: '偶数を入力してください',
});
```

文字列に特定の文字種が含まれるかは、正規表現の`.test()`で判定できます。

```ts
const hasLowercase = /[a-z]/.test('Zod4');
```

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/04-custom-validation/schema.ts](/solution/exercises/04-custom-validation/schema.ts)
