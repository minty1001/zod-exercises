# 練習6：その他の便利なバリデーション

## 問題

イベント情報を検証する`eventSchema`のひな形が定義されています。
プロパティは変更せず、以下の要件を満たすバリデーションをZodで実装してください。

### 対象ファイル

[/src/exercises/06-useful-validations/schema.ts](/src/exercises/06-useful-validations/schema.ts)

### バリデーション要件

| プロパティ  | 要件                                        |
| ----------- | ------------------------------------------- |
| `id`        | UUID形式の文字列                            |
| `title`     | 前後の空白を除去した結果が1文字以上の文字列 |
| `eventDate` | `YYYY-MM-DD`形式のISO日付文字列             |
| `startsAt`  | タイムゾーンを含むISO日時文字列             |
| `website`   | URL形式の文字列                             |
| `capacity`  | 数値へ変換した結果が正の整数となる値        |

## 合格条件

以下のコマンドを実行し、すべてのテストがパスすることを確認してください。

```bash
npm run test:ex06
```

## 解説・ヒント

Zodには、よく使う文字列形式のスキーマが用意されています。

| スキーマ           | 検証対象 | 有効な値の例                           |
| ------------------ | -------- | -------------------------------------- |
| `z.uuid()`         | UUID     | `550e8400-e29b-41d4-a716-446655440000` |
| `z.iso.date()`     | ISO日付  | `2026-04-01`                           |
| `z.iso.datetime()` | ISO日時  | `2026-04-01T10:30:00Z`                 |
| `z.url()`          | URL      | `https://example.com/events`           |

### 文字列の空白除去

`.trim()`は文字列の前後にある空白を除去します。**検証だけでなく値を変換する**ため、`parse()`や`safeParse()`の結果には空白除去後の文字列が入ります。

```ts
const nameSchema = z.string().trim().min(1);
const name = nameSchema.parse('  Zod  ');

console.log(name); // "Zod"
```

`.min(1)`より前に`.trim()`を指定すると、空白文字だけの入力を空文字として検証できます。

### 数値への変換

`z.coerce`は、**検証だけでなく入力値を変換します**。以下の例だと、入力を`Number()`で数値に変換してから検証するため、`parse()`や`safeParse()`の結果には変換後の数値が入ります。

```ts
const quantitySchema = z.coerce.number().int().positive();
const quantity = quantitySchema.parse('10');

console.log(quantity); // 10
```

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/06-useful-validations/schema.ts](/solution/exercises/06-useful-validations/schema.ts)
