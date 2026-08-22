# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

memoir は「終わったタスク、積み上げよう。1 週間を振り返るアプリ」という React Native + Expo 製の日本語アプリ。日々のタスクを記録し、1 週間単位で振り返る。

関連リポジトリ（バックエンドは別リポジトリ）:

| 内容             | URL                                                |
| ---------------- | -------------------------------------------------- |
| バックエンド     | https://github.com/wheatandcat/memoir-backend      |
| LP               | https://github.com/wheatandcat/memoir-lp           |
| 開発ドキュメント | https://github.com/wheatandcat/memoir-handbook     |
| Push 通知        | https://github.com/wheatandcat/memoir-notification |

## セットアップ上の必須事項

**`pnpm codegen` を先に実行しないと、型チェックもテストもビルドも通らない。**
`queries/api/index.ts` と `queries/api/mocks.ts` は gitignore されており、codegen で生成される。CI の全ジョブが最初に `pnpm codegen` を実行しているのはこのため。codegen は memoir-backend の `main` から `schema.graphqls` を curl で取得するのでネットワークが必要。

`env/.env.local` / `.env.development` / `.env.production` も gitignore されている（初回は別途入手が必要）。`pnpm ios` などは内部で `scripts/{local,review,production}/setup.sh` を呼び、`env/*` をルートの `.env` にコピーしてから起動する。production の setup は `platform/` 配下の Firebase 設定ファイルもルートにコピーする。

## コマンド

```bash
# GraphQL コード生成（他の作業の前に必須）
pnpm codegen

# 型チェック（package.json に typecheck スクリプトは無い）
pnpm tsc

# Lint / フォーマット
pnpm lint:ci      # チェックのみ（CI と同じ）
pnpm format       # biome check --write（自動修正）

# テスト
TZ=Asia/Tokyo pnpm test
TZ=Asia/Tokyo pnpm test features/items          # ファイルパスで絞り込み
TZ=Asia/Tokyo pnpm test -t "各項目が正しく表示される"  # テスト名で絞り込み
pnpm test:watch

# ローカル実行（dev client ビルド）
pnpm dev:ios / pnpm dev:android
pnpm dev:ios:device / pnpm dev:android:device   # 実機
pnpm ios / pnpm android                          # Expo Go 相当の start

# Storybook（オンデバイス）
pnpm storybook:ios / pnpm storybook:android
pnpm storybook-generate   # storybook.requires.ts を再生成

# ビルド / 配信
pnpm ios:build / pnpm android:build     # EAS production
pnpm store:upload                       # 両プラットフォームビルド + 自動サブミット

# その他
pnpm unused-exports   # ts-unused-exports（CI で検証される）
npx expo-doctor
```

テストは **`TZ=Asia/Tokyo` 必須**。日付フォーマットの期待値（`"2021.01.01 / 金"` など）が JST + 日本語ロケール前提で書かれている。

Expo SDK やネイティブ依存を上げた後の初回ビルド前:

```bash
npx expo prebuild -p android --clean
rm -rf ~/Library/Developer/Xcode/DerivedData/* && npx expo prebuild -p ios --clean
```

pre-commit hook (husky) で `pnpm tsc` と `pnpm lint-staged` が走る。

## ディレクトリ構成

`src/` は無く、リポジトリルート直下にフラットに配置されている。`tsconfig.json` の path alias は `@/*` → リポジトリルート。

```
app/         expo-router のファイルベースルーティング。ほぼ features/ を re-export するだけの薄い層
components/  共通コンポーネント
  elements/  最小単位（Text, Button, View, Image, ...）
  layouts/   elements に該当しない共有コンポーネント（Card, Modal, Menu, ...）
features/    画面固有のコンポーネントとロジック
containers/  React Context の Provider（Maintenance, Notification）
hooks/       共有 Custom Hooks
lib/         共有関数（apollo, auth, dayjs, storage, styledSystem, testUtil, ...）
store/       zustand のグローバル状態
queries/     .gql ファイルと codegen 生成物（queries/api/）
mocks/       msw のハンドラとモックデータ
config/      theme.ts, firebase.ts
scripts/     アプリから参照されない独立スクリプト
```

Atomic Design（atoms/molecules/organisms）は**使っていない**。`components/elements` と `components/layouts` の 2 層。

## 画面の 4 層パターン

`features/<画面名>/components/` は必ず以下の 4 ファイル + `type.ts` で構成される。新しい画面を作るときはこの分割に従う。

| ファイル        | 役割                                                                                     |
| --------------- | ---------------------------------------------------------------------------------------- |
| `index.tsx`     | エントリ。ルーティングパラメータ（`useLocalSearchParams`）の取得、`useSentryBreadcrumb()` |
| `Connected.tsx` | Apollo の `useQuery` / `useMutation`、zustand、ローカル state、コールバック定義           |
| `Plain.tsx`     | `error` があれば `ErrorPage` を返す。クエリ結果を Page の props 形に整形                  |
| `Page.tsx`      | 純粋な UI。Storybook のストーリーはここに対して書く                                       |
| `type.ts`       | `ConnectedType` = Connected が Page へ渡すコールバック群の型                              |

すべて `memo()` でラップしてデフォルトエクスポートする。`app/(app)/**/index.tsx` はこの `features/.../components` を import するだけ。

深い階層の画面は `features/setting/memoir/components/` のようにネストする。

## GraphQL

- `queries/*.gql` に query/mutation を定義 → `pnpm codegen` → `queries/api/index.ts` に `XxxDocument`（TypedDocumentNode）と型が生成される。
- コンポーネントからは `useQuery(ItemDocument, { variables })` の形で使う。gql タグを直接書かない。
- Apollo Client は `lib/apollo.ts` の `makeApolloClient()` で構築。authLink が Firebase の ID トークン（無ければ AsyncStorage の `USER_ID_KEY`）をヘッダに付与し、errorLink が GraphQL エラーを Sentry 送信 + `Alert.alert` 表示する。
- `graphql-codegen-typescript-mock-data` が `queries/api/mocks.ts` に `anItem()` / `aUser()` 等のモックファクトリを生成。テストの msw ハンドラはこれを使う。
- キャッシュ操作（日付変更時など）は `cache.evict({ id: "ROOT_QUERY", fieldName: ..., args: ... })` + `cache.gc()` の形で書かれている（`features/items/components/Connected.tsx` 参照）。

## 状態管理と認証

- グローバル状態は **zustand**（`store/*.ts`）。Recoil や Redux は使っていない。
- 認証セッションは `ctx.tsx` の `SessionProvider` / `useSession()`（expo-router の推奨パターン）。`hooks/useStorageState` で SecureStore に永続化。
- `app/(app)/_layout.tsx` がガード。`session` が無ければ `/sign-in` に `Redirect`。
- Firebase Authentication 本体は `lib/auth.ts` / `lib/firebase.ts` / `hooks/useFirebaseAuth.tsx`。

## スタイリング

`config/theme.ts` の `theme()` が単一のソース。色（primary/secondary/base/accent1/accent2/error/background の light/main/dark）と `SPACE` 配列を持つ。

`components/elements/Text` は `lib/styledSystem/*` の関数（`styleFontSize`, `styleFontColor`, `styleFontVariant` など）で props からスタイルを組み立てる styled-system 風の実装。新しい element も同じ流儀に合わせる。Android では `fontWeight` を落として `fontFamily`（`RobotoCondensed-Bold` / `NotoSansJP-Bold`）で太さを表現している。

## テスト

- `jest-expo` preset + `@testing-library/react-native`。テストは対象と同じ階層の `__tests__/` に `*.test.tsx` で置く。
- API モックは **msw**。`setupTests.js` が `mocks/server.ts` を `listen()` し、`mocks/handler.ts` のデフォルトハンドラを適用する。
- レンダリングは `lib/testUtil.tsx` の `testRenderer` を使う。ApolloProvider でラップされ、引数で msw ハンドラを差し替えられる:

  ```tsx
  const renderPage = testRenderer(<ItemDetail />);
  renderPage(graphql.query(ItemDocument, ({ variables }) => HttpResponse.json({ data: { ... } })));
  ```

- `setupTests.js` に firebase / expo-notifications / expo-router / AsyncStorage / safe-area-context などのグローバルモックが集約されている。新しいネイティブ依存を入れてテストが落ちる場合はここに追加する。
- Detox / E2E は**存在しない**。

## Storybook

React Native のオンデバイス Storybook（Web 版ではない）。`index.ts` がエントリで、`EXPO_PUBLIC_STORYBOOK_ENABLED=true` のときだけ `./.storybook` を require し、通常は `expo-router/entry` を読む。ストーリーは `(components|features)/**/*.stories.tsx` から収集される。

## CI

`push` のたびに `tsc` / `lint` / `jest` / `unused-exports` の 4 ワークフローが走る（すべて `pnpm codegen` を先に実行）。`unused-exports` があるため、使われていない export を残すと CI が落ちる。

## Hygen テンプレートについて

`_templates/` に page/component/test のテンプレートがあるが、**生成先パスが旧構成（`src/components/atoms/...`）のままで現行のディレクトリ構成と一致しない**。かつ `package.json` に `new:*` スクリプトも無い。新規ファイルは既存の近いファイルをコピーして作るほうが確実。

## PR 作成手順

`.cursor/rules/create-pullrequest.mdc` に定義あり。要点:

- issue のリンクが提供されていなければ、必ずユーザーに確認する。無い場合はその旨を PR 本文に明記。
- `git diff origin/main...HEAD | cat` で差分を確認してからタイトル・本文を書く。
- 指示がない限り **Draft** で作成する。
- 本文は `.github/PULL_REQUEST_TEMPLATE.md` に従う。

```bash
git push origin HEAD && \
echo -e "{{PRテンプレートを1行に変換}}" | \
gh pr create --draft --title "{{PRタイトル}}" --body-file - && \
gh pr view --web
```
