import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  // ここを追加
  images: {
    remotePatterns: [
      // Google Drive 画像の高速配信ホスト
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc", // 変換URLで使う /uc?export=view&id=... のパス
      },

      /* ―― uc?export=view 方式を使う場合 ――
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc", // /uc?export=view&id=...
      },
      */
    ],
  },
};

export default nextConfig;
