# 練習5：項目間バリデーション

## 問題

ユーザー登録フォームを検証する`registrationSchema`のひな形が定義されています。
各項目の既存の条件は変更せず、以下の項目間バリデーションを追加してください。

### 対象ファイル

[/src/exercises/05-cross-field-validation/schema.ts](/src/exercises/05-cross-field-validation/schema.ts)

### バリデーション要件

- `password`：8文字以上の文字列
- `confirmPassword`：8文字以上の文字列
- `password`と`confirmPassword`の値が一致する
- 値が一致しない場合のメッセージ：`パスワードが一致しません`
- 値が一致しない場合のエラーパス：`confirmPassword`

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex05
```

## 解説・ヒント

オブジェクトスキーマに`.refine()`を追加すると、複数の項目を使った検証ができます。第1引数の関数には、各プロパティを持つオブジェクトが渡されます。

```ts
const periodSchema = z
  .object({
    start: z.date(),
    end: z.date(),
  })
  .refine((data) => data.start <= data.end, {
    error: '終了日は開始日以降にしてください',
    path: ['end'],
  });
```

`path`を指定すると、オブジェクト全体ではなく、関連する項目のエラーとして扱えます。

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/05-cross-field-validation/schema.ts](/solution/exercises/05-cross-field-validation/schema.ts)
