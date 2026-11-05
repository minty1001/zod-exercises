# 練習2：エラーメッセージの指定

## 問題

お問い合わせを検証する`contactSchema`のひな形が定義されています。
バリデーション条件は変更せず、以下のエラーメッセージを指定してください。

### 対象ファイル

[/src/exercises/02-error-messages/schema.ts](/src/exercises/02-error-messages/schema.ts)

### エラーメッセージ要件

- `name`が空文字：`名前を入力してください`
- `email`がメールアドレス形式ではない：`有効なメールアドレスを入力してください`
- `message`が10文字未満：`お問い合わせ内容は10文字以上で入力してください`

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex02
```

## 解説・ヒント

Zod 4では、スキーマや制約メソッドの第2引数に文字列、または`{ error: '...' }`を指定すると、標準のエラーメッセージを置き換えられます。

```ts
const productSchema = z.object({
  name: z.string().min(1, '商品名を入力してください'), // 文字列で指定
  price: z.number().positive({ error: '価格は正の数で入力してください' }), // { error: ... }で指定
});
```

`safeParse()`が失敗すると、`error.issues`に問題の一覧が格納されます。各issueの`path`には問題があるプロパティへのパス、`message`には指定したメッセージが入ります。

```ts
const result = productSchema.safeParse({ name: '', price: 0 });

if (!result.success) {
  console.log(result.error.issues);

  /**
   * [
   *   {
   *     origin: 'string',
   *     code: 'too_small',
   *     minimum: 1,
   *     inclusive: true,
   *     path: [ 'name' ],
   *     message: '商品名を入力してください'
   *   },
   *   {
   *     origin: 'number',
   *     code: 'too_small',
   *     minimum: 0,
   *     inclusive: false,
   *     path: [ 'price' ],
   *     message: '価格は正の数で入力してください'
   *   }
   * ]
   */
}
```

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/02-error-messages/schema.ts](/solution/exercises/02-error-messages/schema.ts)
