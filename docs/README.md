# ドキュメント

KFD Studio Blogのドキュメント一覧です。本ブログはHono + Hono SSGを使用して構成されています。

## ドキュメント

| ドキュメント                       | 説明                                               |
| ---------------------------------- | -------------------------------------------------- |
| [アーキテクチャ](architecture.md)  | システムアーキテクチャ、データ構造、検索機能の詳細 |
| [開発ガイド](development-guide.md) | 開発フロー、セットアップ、トラブルシューティング   |
| [API仕様書](api-spec.md)           | APIエンドポイント、リクエスト形式                  |
| [デプロイガイド](deployment.md)    | Cloudflare Workersへのデプロイ手順と設定           |

## クイックリンク

- [README](../README.md) - プロジェクト概要
- [アーキテクチャ](architecture.md) - システム設計
- [開発ガイド](development-guide.md) - 開発手順
- [API仕様書](api-spec.md) - API仕様
- [デプロイガイド](deployment.md) - デプロイ手順

## 技術スタック

- **Hono v4.0+**: 軽量・高速なWebフレームワーク
- **Vite**: モダンなビルドツール
- **@cloudflare/vite-plugin**: Cloudflare Workers用Viteプラグイン
- **Hono SSG**: Static Site Generationをサポート
- **HonoX**: JSXベースのコンポーネント開発（オプション）
- **Cloudflare Workers**: デプロイプラットフォーム
- **GitHub**: Markdownファイルの管理

## デプロイフロー

1. 記事をGitHubリポジトリにコミット・プッシュ
2. Cloudflare Workersで自動ビルド実行（Vite）
3. Hono SSGで静的サイト生成
4. Cloudflare Workersにデプロイ
