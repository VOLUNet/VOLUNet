import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CompletePageProps {
  params: {
    id: string
  }
}

export default function CompletePage({ params }: CompletePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <Check className="h-12 w-12 text-white" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-slate-900 mb-4">応募が完了しました！</h1>
          <p className="text-lg text-slate-600 mb-12 max-w-lg mx-auto">
            ボランティア活動への応募が正常に完了しました。主催者からの連絡をお待ちください。
          </p>

          {/* Success Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-12">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-medium">応募情報が送信されました</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-medium">主催者に通知されました</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Check className="h-5 w-5" />
                <span className="font-medium">参加履歴に追加されました</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">次のステップ</h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                主催者からの連絡をお待ちください
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                プロフィールページから応募状況を確認できます
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                活動当日は時間に余裕をもってお越しください
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <Link href="/search">
            <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
              <ArrowLeft className="h-5 w-5 mr-3 group-hover:-translate-x-1 transition-transform" />
              ボランティア一覧に戻る
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
