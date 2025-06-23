import Link from "next/link"
import { ArrowRight, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function StudentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <main className="px-6 py-12 flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex space-x-3">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
                >
                  主催者ページに切り替え
                </Button>
              </Link>
              <Link href="/teacher">
                <Button
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
                >
                  先生ページに切り替え
                </Button>
              </Link>
            </div>

            <Link
              href="/profile/participant"
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center hover:from-slate-200 hover:to-slate-300 transition-all cursor-pointer shadow-lg border border-white/50"
            >
              <User className="h-6 w-6 text-slate-600" />
            </Link>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {/* VOLUNet Title */}
            <div className="mb-16">
              <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-pointer">
                VOLUNet
              </h1>
              <p className="text-slate-500 mt-2 text-sm">ボランティアをつなぐプラットフォーム</p>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 whitespace-nowrap">
                あなたに合ったボランティアを見つけよう
              </h2>
              <p className="text-slate-600 mb-12 text-lg whitespace-nowrap">
                興味のある活動に参加して、新しい経験や出会いを広げましょう。
              </p>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col items-center space-y-6 pb-8">
            <Link
              href="/search"
              className="inline-flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-2xl px-16 py-5 text-xl font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
            >
              <span className="mr-4">ボランティアを探す</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/profile/participant">
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm group"
              >
                <Heart className="h-4 w-4 mr-2" />
                参加履歴・お気に入り
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
