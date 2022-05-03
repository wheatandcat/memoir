# memoir

終わったタスク、積み上げよう。1週間を振り返るアプリ。

<div style="display:flex">
    <img src="./doc/001.jpg" width="320" style="padding:3px"/>
    <img src="./doc/002.jpg" width="320" style="padding:3px"/>
</div>
<div style="display:flex">
    <img src="./doc/003.jpg" width="320" style="padding:3px"/>
    <img src="./doc/004.jpg" width="320" style="padding:3px"/>
</div>


## 各リポジトリのリンク

|  リポジトリ内容  |  URL  |
| ---- | ---- |
|  アプリ  |  https://github.com/wheatandcat/memoir  |
|  バックエンド  |  https://github.com/wheatandcat/memoir-backend  |
|  LPサイト  |  https://github.com/wheatandcat/memoir-lp  |
|  開発ドキュメント  |  https://github.com/wheatandcat/memoir-handbook  |
|  Push通知  |  https://github.com/wheatandcat/memoir-notification  |
|  ツール系  |  https://github.com/wheatandcat/memoir-tools  |


## 使用技術/デザインのリンク

## 技術

 - [Expo](https://expo.io/)
 - [React Native](https://reactnative.dev/)

## デザイン
 - Font by Roboto Condensed & Noto Sans JP
 - Icons by [Icons8](https://icons8.jp/)


# コマンド

## ローカル起動

### iOS 

```bash
$ yarn ios
```


### Android

```bash
$ yarn android
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

# ライセンスの出力

```bash
$ npx npm-license-crawler --dependencies --production --onlyDirectDependencies --omitVersion --json ./src/licenses.json
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

# CI環境

## レビュー環境

### アプリ内コンフィグ 

```bash
$ base64 -i .env.development | pbcopy
```

### Expoコンフィグ
```bash
$ base64 -i scripts/review/appConfig.js | pbcopy
```

## 本番環境

### アプリ内コンフィグ 

```bash
$ base64 -i .env.production | pbcopy
```


### Expoコンフィグ
```bash
$ base64 -i scripts/production/appConfig.js | pbcopy
```
