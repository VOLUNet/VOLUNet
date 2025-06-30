import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TeacherPage() {
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
              <Link href="/student">
                <Button
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
                >
                  生徒ページに切り替え
                </Button>
              </Link>
            </div>
            {/* プロフィールアイコンを削除 */}
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            {/* VOLUNet Title */}
            <div className="mb-16">
              <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-pointer">
                VOLUNet
              </h1>
              <p className="text-slate-500 mt-2 text-sm">ボランティアをつなぐプラットフォーム - 先生用</p>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 whitespace-nowrap">
                生徒に適したボランティアを選んで共有しましょう
              </h2>
              <p className="text-slate-600 mb-12 text-lg whitespace-nowrap">
                募集されているボランティア活動を確認し、生徒に適したものを選んで共有できます。
              </p>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col items-center space-y-6 pb-8">
            <Link
              href="/teacher/volunteer-list"
              className="inline-flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-2xl px-16 py-5 text-xl font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
            >
              <span className="mr-4">ボランティア一覧を確認</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/student">
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm group"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                生徒ページを確認
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
