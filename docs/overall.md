# Zod v4 練習問題集

Zod v4の基本から実践的な使い方までを段階的に学ぶための練習問題集です。

## Exercise構成

### Exercise 0：Zod単体のバリデーション

Zod単体でスキーマを定義し、入力値を検証する方法を学びます。現在作成済みの問題は、基本的な型や制約、エラーメッセージ、カスタムバリデーションなどを扱います。

問題00から順に、下表の問題番号のリンクを開き、リンク先記載の手順に従って進めてください。

| 問題                                          | テーマ                       | 主な学習内容                           |
| --------------------------------------------- | ---------------------------- | -------------------------------------- |
| [00](./exercise-00-basic.md)                  | バリデーションの基本         | 文字列、メールアドレス、数値の型と制約 |
| [01](./exercise-01-required-optional.md)      | 必須・任意バリデーション     | 必須項目と`.optional()`による任意項目  |
| [02](./exercise-02-error-messages.md)         | エラーメッセージの指定       | バリデーションごとのエラーメッセージ   |
| [03](./exercise-03-enum-array-builtins.md)    | enum・配列・標準組み込み型   | `z.enum()`、配列、`Date`、`BigInt`     |
| [04](./exercise-04-custom-validation.md)      | カスタムバリデーション       | `.refine()`による独自の検証条件        |
| [05](./exercise-05-cross-field-validation.md) | 項目間バリデーション         | 複数項目を使った検証とエラーパス       |
| [06](./exercise-06-useful-validations.md)     | その他の便利なバリデーション | ISO形式、UUID、URL、値の変換           |

### Exercise 1：フォームとの統合

Zodとフォームライブラリを組み合わせた入力検証を扱う予定です。このExerciseは未作成です。

## Exercise 0のファイル構成

各問題は、次の4ファイルで構成されています。`<number>-<topic>`には、`00-basic`のような問題番号とトピック名が入ります。

```text
src/exercises/<number>-<topic>/
├── schema.ts       # 問題に取り組むファイル
└── schema.test.ts  # 合格条件を定義したテスト

docs/
└── exercise-<number>-<topic>.md  # 問題文と解説・ヒント

solution/exercises/<number>-<topic>/
└── schema.ts       # 解答例
```

## `parse()`と`safeParse()`

スキーマによる検証には、`parse()`または`safeParse()`を使います。

| 検証メソッド  | 検証失敗の表現                 |
| ------------- | ------------------------------ |
| `parse()`     | 検証失敗を例外として表現する   |
| `safeParse()` | 検証失敗を戻り値として表現する |

### `parse()`

`parse()`では、検証失敗時に投げられる`ZodError`を`try...catch`で処理します。

```ts
try {
  const data = profileSchema.parse(input);
  console.log(data);
} catch (error) {
  console.error(error);
}
```

### `safeParse()`

`safeParse()`では、戻り値の`success`を使って成功と失敗を判定します。

```ts
const result = profileSchema.safeParse(input);

if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error.issues);
}
```
