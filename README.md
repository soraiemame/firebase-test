# 東大音感AR予約システム

詳しい仕様は [SPEC.md](./SPEC.md) を参照してください。

## 環境構築

- volta: https://docs.volta.sh/guide/getting-started
- yarn: `volta install yarn@4`

## パッケージのインストール

```zsh
yarn install
```

## 開発用サーバーの起動

```zsh
yarn dev
```

開発時には，本番環境とは隔離された[ダミーのDB](https://docs.google.com/spreadsheets/d/1cdd5Rf5LhScQblmDxsVbLzgdz2LWtUsKL42n-yP4Fxs/edit?usp=sharing)に接続されます。ダミーのDBは，GAS部分も含めて好きにいじって構いません。（ただしGAS部分は使い終わったら元に戻しておくことを推奨します。）
