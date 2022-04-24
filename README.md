# memoir

## システム

 - [Expo](https://expo.io/)
 - [React Native](https://reactnative.dev/)

## デザイン
 - Font by Roboto Condensed & Noto Sans JP
 - Icons by [Icons8](https://icons8.jp/)


## CI環境

### アプリ内コンフィグ

#### レビュー環境
```bash
$ base64 -i .env.development | pbcopy
```

#### 本番環境
```bash
$ base64 -i .env.production | pbcopy
```


### Expoコンフィグ
```bash
$ base64 -i scripts/appConfig.js | pbcopy
```

### ライセンスの出力
```bash
$ npx npm-license-crawler --dependencies --production --onlyDirectDependencies --omitVersion --json ./src/licenses.json
```

# コード生成

## 新規画面作成
```bash
$ yarn hygen page new
```

## コンポーネント作成
```bash
$ yarn hygen component new
```

## テストコード追加
```bash
$ yarn hygen test new
```

# Visual Testing

## 画像更新 

```bash
$ yarn loki:update
```

## ローカル比較

```bash
$ yarn loki:test
```

## reg-suit

```bash
$ npx reg-suit run
```

## ビルド

### iOS

```bash
$ yarn ios:build
```

### Android

```bash
$ yarn android:build
```