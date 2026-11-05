# 練習0：バリデーションの基本

## 問題

ユーザー情報を検証する`userSchema`のひな形が定義されています。
以下の要件を満たすバリデーションをZodで実装してください。

### 対象ファイル

[/src/exercises/00-basic/schema.ts](/src/exercises/00-basic/schema.ts)

### バリデーション要件

- `name`：1文字以上の文字列
- `email`：メールアドレス形式の文字列
- `age`：18以上150未満の整数

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex00
```

## 解説・ヒント

### プリミティブ・文字列のバリデーション

Zodでは、値の型に対応する関数を使ってスキーマを作成します。

| スキーマ        | 検証対象            |
| --------------- | ------------------- |
| `z.number()`    | 数値（`NaN`を除く） |
| `z.int()`       | 整数                |
| `z.boolean()`   | 真偽値              |
| `z.null()`      | `null`              |
| `z.undefined()` | `undefined`         |
| `z.string()`    | 文字列              |

型のスキーマにメソッドをつなげると、長さ、値の範囲、形式などの制約を追加できます。
複数のメソッドをつないだ場合は、すべての条件を満たす必要があります。

```ts
const titleSchema = z.string().min(1).max(100);
const quantitySchema = z.number().nonnegative();
```

### オブジェクトのバリデーション

`z.object()`に、プロパティ名と対応するスキーマを指定してオブジェクト全体のスキーマを作成します。
オブジェクトを入れ子にする場合も、プロパティのスキーマとして別の`z.object()`を指定できます。

```ts
import { z } from 'zod';

const addressSchema = z.object({
  city: z.string(),
  postalCode: z.string(),
});

const profileSchema = z.object({
  displayName: z.string().min(1),
  isActive: z.boolean(),
  address: addressSchema,
});
```

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/00-basic/schema.ts](/solution/exercises/00-basic/schema.ts)
