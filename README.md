# memoir

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/K3K5E9FLI)

終わったタスク、積み上げよう。1 週間を振り返るアプリ。

<div style="display:flex">
    <img src="./doc/001.jpg" width="320" style="padding:3px"/>
    <img src="./doc/002.jpg" width="320" style="padding:3px"/>
</div>
<div style="display:flex">
    <img src="./doc/003.jpg" width="320" style="padding:3px"/>
    <img src="./doc/004.jpg" width="320" style="padding:3px"/>
</div>

## 各リポジトリのリンク

| リポジトリ内容   | URL                                                |
| ---------------- | -------------------------------------------------- |
| アプリ           | https://github.com/wheatandcat/memoir              |
| バックエンド     | https://github.com/wheatandcat/memoir-backend      |
| LP サイト        | https://github.com/wheatandcat/memoir-lp           |
| 開発ドキュメント | https://github.com/wheatandcat/memoir-handbook     |
| Push 通知        | https://github.com/wheatandcat/memoir-notification |
| ツール系         | https://github.com/wheatandcat/memoir-tools        |

## 使用技術/デザインのリンク

## 技術

- [Expo](https://expo.io/)
- [React Native](https://reactnative.dev/)

## デザイン

- Font by Roboto Condensed & Noto Sans JP
- Icons by [Icons8](https://icons8.jp/)

# コマンド

## 診断

```bash
$ npx expo-doctor
```


### iOS

#### 初回のみeas build

```bash
$ pnpm ios:build:dev
```

#### ローカル用のbuild

```bash
$ npx expo run:ios
```

#### 起動

```bash
$ pnpm expo:start
```

### Android

#### 初回のみeas build

```bash
$ pnpm android:build:dev
```

#### ローカル用のbuild

```bash
$ npx expo run:android
```

#### 起動

```bash
$ pnpm expo:start
```

## ビルド

### iOS

#### dev

```bash
$ pnpm ios:build:dev
$ expo start --dev-client
```

#### production

```bash
$ pnpm ios:build
```

### Android

#### dev

```bash
$ pnpm android:build:dev
$ expo start --dev-client
```

#### production

```bash
$ pnpm android:build
```

## ビルド & ストアアップロード

```bash
$ pnpm store:upload
```

## Storybook

### 起動

```bash
$ pnpm storybook:ios
```

### Storybook Server

```bash
$ pnpm start-server
```

# コード生成

## 新規画面作成

```bash
$ pnpm hygen page new
```

## コンポーネント作成

```bash
$ pnpm hygen component new
```

## テストコード追加

```bash
$ pnpm hygen test new
```

# ライセンスの出力

```bash
$ npx npm-license-crawler --dependencies --production --onlyDirectDependencies --omitVersion --json ./src/licenses.json
```

# Visual Testing

## 画像更新

```bash
$ pnpm loki:update
```

## ローカル比較

```bash
$ pnpm loki:test
```

## reg-suit

```bash
$ npx reg-suit run
```

# CI 環境

## レビュー環境

### アプリ内コンフィグ

```bash
$ base64 -i .env.development | pbcopy
```

## 本番環境

### アプリ内コンフィグ

```bash
$ base64 -i .env.production | pbcopy
```
