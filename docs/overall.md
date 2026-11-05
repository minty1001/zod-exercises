# Zod v4 練習問題集

Zod v4の基本から実践的な使い方までを段階的に学ぶための練習問題集です。

## Exercise構成

| 問題                                               | テーマ                       | 主な学習内容                                  |
| -------------------------------------------------- | ---------------------------- | --------------------------------------------- |
| Exercise 0                                         | Zod単体のバリデーション      |                                               |
| [00](./exercise-00-basic.md)                       | バリデーションの基本         | 文字列、メールアドレス、数値の型と制約        |
| [01](./exercise-01-required-optional.md)           | 必須・任意バリデーション     | 必須項目と`.optional()`による任意項目         |
| [02](./exercise-02-error-messages.md)              | エラーメッセージの指定       | バリデーションごとのエラーメッセージ          |
| [03](./exercise-03-enum-array-builtins.md)         | enum・配列・標準組み込み型   | `z.enum()`、配列、`Date`、`BigInt`            |
| [04](./exercise-04-custom-validation.md)           | カスタムバリデーション       | `.refine()`による独自の検証条件               |
| [05](./exercise-05-cross-field-validation.md)      | 項目間バリデーション         | 複数項目を使った検証とエラーパス              |
| [06](./exercise-06-useful-validations.md)          | その他の便利なバリデーション | ISO形式、UUID、URL、値の変換                  |
| Exercise 1                                         | フォームとの統合             |                                               |
| [10](./exercise-10-form-basic.md)                  | React Hook FormとZodの統合   | `zodResolver()`によるフォームとスキーマの接続 |
| [11](./exercise-11-single-field-validation.md)     | 単項目バリデーション         | フォーム項目の文字列・数値の検証              |
| [12](./exercise-12-cross-field-form-validation.md) | 項目間バリデーション         | パスワードの一致確認とフォームへのエラー表示  |
| Sandbox                                            | 自由に動作を試せる環境       |                                               |
| [90](./exercise-90-zod-sandbox.md)                 | Zod単体のSandbox             | スキーマとテストを使った自由な動作確認        |
| [91](./exercise-91-form-sandbox.md)                | フォーム統合Sandbox          | React Hook FormとZodの自由な動作確認          |

### Exercise 0：Zod単体のバリデーション

Zod単体でスキーマを定義し、入力値を検証する方法を学びます。現在作成済みの問題は、基本的な型や制約、エラーメッセージ、カスタムバリデーションなどを扱います。

問題00から順に、下表の問題番号のリンクを開き、リンク先記載の手順に従って進めてください。

### Exercise 1：フォームとの統合

ZodとReact Hook Formを組み合わせ、フォームの入力値をZodスキーマで検証する方法を学びます。
React Hook Formの使い方を詳しく理解している必要はありません。入力値やエラーなどのフォーム状態を管理するライブラリであることが分かっていれば十分です。
入力フォームとバリデーションエラーの表示は実装済みです。問題10から順に、Zodとの連携やスキーマの実装に取り組んでください。

### Sandbox

Sandboxは、スキーマや入力値を自由に変更してZodの動作確認ができます。
[Sandbox 90](./exercise-90-zod-sandbox.md)はZod単体の環境です。`schema.ts`と`schema.test.ts`を編集し、Vitestで結果を確認します。
[Sandbox 91](./exercise-91-form-sandbox.md)はReact Hook FormとZodを統合した環境です。スキーマとフォームを編集し、ブラウザで入力時の動作を確認します。

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

## Exercise 1のファイル構成

Exercise 1では、各問題にReact Hook Formで作成済みのフォームが含まれます。
問題によって、`Form.tsx`または`schema.ts`の指定された箇所を編集します。

```text
src/exercises/<number>-<topic>/
├── Form.tsx         # React Hook Formで作成した入力フォーム
└── schema.ts       # フォームの入力値を検証するZodスキーマ

docs/
└── exercise-<number>-<topic>.md  # 問題文と解説・ヒント

solution/exercises/<number>-<topic>/
└── Form.tsxまたはschema.ts       # 問題ごとの解答例
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
