# memoir

## システム

 - [Expo](https://expo.io/)
 - [React Native](https://reactnative.dev/)

## デザイン
 - Font by Roboto Condensed & Noto Sans JP
 - Icons by [Icons8](https://icons8.jp/)


## セットアップ


### CI環境

#### アプリ内コンフィグ

##### レビュー環境
```
$ base64 -i .env.development | pbcopy
```

##### 本番環境
```
$ base64 -i .env.production | pbcopy
```


#### Expoコンフィグ
```
$ base64 -i scripts/appConfig.js | pbcopy
```

# コード生成

## 新規画面作成
```
$ yarn hygen page new
```

## コンポーネント作成
```
$ yarn hygen component new
```

## テストコード追加
```
$ yarn hygen test new
```

# Visual Testing

## 画像更新 

```
$ yarn loki:update
```

## ローカル比較

```
$ yarn loki:test
```

## reg-suit

```
$ npx reg-suit run
```