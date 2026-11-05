# 練習1：必須・任意バリデーション

## 問題

プロフィールを検証する`profileSchema`のひな形が定義されています。
以下の要件を満たすバリデーションをZodで実装してください。

### 対象ファイル

[/src/exercises/01-required-optional/schema.ts](/src/exercises/01-required-optional/schema.ts)

### バリデーション要件

- `displayName`：必須。1文字以上の文字列
- `email`：必須。メールアドレス形式の文字列
- `nickname`：任意。指定する場合は1文字以上の文字列
- `bio`：任意。指定する場合は160文字以下の文字列

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex01
```

## 解説・ヒント

`z.object()`のプロパティは、何も指定しなければ必須です。スキーマに`.optional()`を追加すると、その値に加えて`undefined`も許可され、オブジェクトではプロパティ自体を省略できます。

```ts
const settingsSchema = z.object({
  theme: z.string(), // 必須
  locale: z.string().optional(), // undefined も許容
});
```

`.optional()`より前に指定した制約は、値が存在する場合に適用されます。そのため、任意項目でも、値が指定されていれば形式や長さを検証できます。

| メソッド      | 許可する値                        |
| ------------- | --------------------------------- |
| `.optional()` | 元の型または`undefined`           |
| `.nullable()` | 元の型または`null`                |
| `.nullish()`  | 元の型、`null`、または`undefined` |

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/01-required-optional/schema.ts](/solution/exercises/01-required-optional/schema.ts)
