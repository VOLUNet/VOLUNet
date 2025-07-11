"use client"

import Link from "next/link"
import { Check, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CompletePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Check className="h-12 w-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-slate-900 mb-4">募集を開始しました！</h1>
          <p className="text-lg text-slate-600 mb-12 max-w-lg mx-auto">
            ボランティア活動の募集が正常に開始されました。参加者からの応募をお待ちください。
          </p>

          {/* Success Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-12">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-medium">募集が公開されました</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-medium">参加者への通知を送信しました</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-medium">プロフィールページに追加されました</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">次のステップ</h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                参加者からの応募があった場合、メールで通知されます
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                プロフィールページから募集状況を確認できます
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                活動当日の連絡事項は参加者に直接お知らせください
              </li>
            </ul>
          </div>

          {/* Home Button */}
          <Link href="/">
            <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
              <Home className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              ホームに戻る
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

      {/* ホーム画面へ戻るリンク */}
      <a
        href="/"
        className="inline-block bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
      >
        ホームに戻る
      </a>
    </main>
  )

