"use client"

import { useRouter } from "next/navigation"
import { ArrowRight, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const userName = "杉村 志弥"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <main className="px-6 py-12 flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex space-x-3">
              <Button
                onClick={() => router.push("/student")}
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
              >
                生徒ページに切り替え
              </Button>

              <Button
                onClick={() => router.push("/teacher")}
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
              >
                先生ページに切り替え
              </Button>
            </div>

            {/* User Profile Button */}
            <button
              onClick={() => router.push("/profile/organizer")}
              className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all border border-slate-200 hover:border-slate-300 shadow-sm group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-600" />
              </div>
              <div className="font-medium text-slate-800">{userName}</div>
            </button>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-16">
              <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-pointer">
                VOLUNet
              </h1>
              <p className="text-slate-500 mt-2 text-sm">ボランティアをつなぐプラットフォーム</p>
            </div>

            <div className="max-w-4xl mb-8">
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                ようこそ、{userName}さん
              </h2>
            </div>

            <div className="max-w-4xl">
              <h2 className="text-4xl font-bold text-slate-900 mb-6 whitespace-nowrap">
                新しいボランティア活動を始めませんか？
              </h2>
              <p className="text-slate-600 mb-12 text-lg whitespace-nowrap">
                あなたの地域でボランティアを募集して、より良いコミュニティを一緒に作りましょう。
              </p>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex flex-col items-center space-y-6 pb-8">
            <button
              onClick={() => router.push("/recruit")}
              className="inline-flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-2xl px-16 py-5 text-xl font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
            >
              <span className="mr-4">ボランティアを募る</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <Button
              onClick={() => router.push("/organizer/activities")}
              variant="outline"
              className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm group"
            >
              <Calendar className="h-4 w-4 mr-2" />
              募集・開催したボランティア
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}