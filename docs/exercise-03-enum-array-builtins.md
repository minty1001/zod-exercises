# 練習3：enum・配列・標準組み込み型

## 問題

チーム情報を検証する`teamSchema`と、関連するスキーマのひな形が定義されています。
定義名とプロパティは変更せず、以下の要件を満たすバリデーションをZodで実装してください。

### 対象ファイル

[/src/exercises/03-enum-array-builtins/schema.ts](/src/exercises/03-enum-array-builtins/schema.ts)

### バリデーション要件

- `roleSchema`：`admin`、`member`、`viewer`のいずれか
- `userSchema.name`：1文字以上の文字列
- `userSchema.role`：`roleSchema`に適合する値
- `teamSchema.users`：各要素が`userSchema`に適合する配列
- `teamSchema.createdAt`：`Date`インスタンス
- `teamSchema.totalPoints`：`bigint`型の値

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex03
```

## 解説・ヒント

### enum

`z.enum()`に文字列の候補を指定すると、いずれかの値だけを許可するスキーマを作成できます。

```ts
const statusSchema = z.enum(['draft', 'published']);
```

### 配列

`z.array()`には要素のスキーマを指定します。オブジェクトスキーマを指定した場合、すべての要素がその形に適合するか検証されます。

```ts
const articleSchema = z.object({
  title: z.string(),
});

const articlesSchema = z.array(articleSchema);
```

### 標準組み込み型

ZodにはJavaScriptの標準組み込み型を検証するスキーマがあります。`z.date()`は`Date`インスタンス、`z.bigint()`は`bigint`型の値を検証します。

```ts
const publishedAtSchema = z.date();
const viewCountSchema = z.bigint();
```

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/03-enum-array-builtins/schema.ts](/solution/exercises/03-enum-array-builtins/schema.ts)
