# 練習12：フォームの項目間バリデーション

## 問題

ユーザー登録フォームとReact Hook Form・Zodの連携処理が実装されています。
入力欄とバリデーションエラーの表示、および各項目単体のバリデーションは実装済みです。

`registrationSchema`へ、パスワードと確認用パスワードが一致することを検証する項目間バリデーションを追加してください。

### 対象ファイル

[/src/exercises/12-cross-field-form-validation/schema.ts](/src/exercises/12-cross-field-form-validation/schema.ts)

### バリデーション要件

- `password`と`confirmPassword`の値が一致する
- 値が一致しない場合のメッセージ：`パスワードが一致しません`
- 値が一致しない場合のエラー表示位置：確認用パスワード入力欄の下
- 各プロパティに定義済みの条件は変更しない

## 合格条件

以下のコマンドでアプリを起動し、ブラウザで`http://localhost:5173/#/exercise/12`を開いてください。

```bash
npm run dev
```

画面を操作し、以下のチェックリストをすべて満たすことを確認してください。

- [ ] `password`と`confirmPassword`へ異なる8文字以上の値を入力して「登録」を押すと、確認用パスワード欄に`パスワードが一致しません`と表示される
- [ ] パスワードが一致しない場合、フォームの下に登録成功の内容が表示されない
- [ ] 両方のパスワードへ同じ8文字以上の値を入力すると、確認用パスワード欄の不一致エラーが表示されない
- [ ] 両方のパスワードへ同じ8文字以上の値を入力して送信すると、フォームの下に`登録成功`と表示される

## 解説・ヒント

オブジェクトスキーマの`.refine()`を使うと、複数項目の値を比較できます。

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

`path`には、エラーを紐づけるプロパティを指定します。
`zodResolver`は、このエラーパスをReact Hook Formの`errors`のキーへ変換します。
例えば、`path: ['end']`を指定すると、エラーは`end`プロパティに紐づき、`errors.end?.message`から取得できます。

## 解答ファイル

解答例は以下のファイルで確認できます。

[/solution/exercises/12-cross-field-form-validation/schema.ts](/solution/exercises/12-cross-field-form-validation/schema.ts)
