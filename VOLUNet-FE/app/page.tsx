"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const token = localStorage.getItem("authToken")
    const name = localStorage.getItem("userName")

    if (!token) {
      router.push("/login")
    } else {
      setIsLoggedIn(true)
      setUserName(name || "ユーザー")
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    router.push("/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <p className="text-slate-600">読み込み中...</p>
      </div>
    )
  }

  if (!isLoggedIn) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      <main className="px-6 py-12 flex-1 flex flex-col">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
          {/* 上部ナビゲーション */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
                onClick={() => alert("生徒ページに切り替え（未実装）")}
              >
                生徒ページに切り替え
              </Button>
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
                onClick={() => alert("先生ページに切り替え（未実装）")}
              >
                先生ページに切り替え
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border border-red-200 hover:border-red-300 bg-red-50/80 backdrop-blur-sm hover:bg-red-50 text-red-700 hover:text-red-800 transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm"
              >
                ログアウト
              </Button>
            </div>

            <Link
              href="/profile/organizer"
              className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all border border-slate-200 hover:border-slate-300 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-600" />
              </div>
              <span className="font-medium text-slate-800">{userName}</span>
            </Link>
          </div>

          {/* 中央コンテンツ */}
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="mb-16">
              <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent transform hover:scale-105 transition-transform cursor-pointer">
                VOLUNet
              </h1>
              <p className="text-slate-500 mt-2 text-sm">ボランティアをつなぐプラットフォーム</p>
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

          {/* 下部ボタン群 */}
          <div className="flex flex-col items-center space-y-6 pb-8">
            <Link
              href="/recruit"
              className="inline-flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-2xl px-16 py-5 text-xl font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group"
            >
              <span className="mr-4">ボランティアを募る</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link href="/organizer/activities">
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-3 text-sm font-medium shadow-sm group"
              >
                <Calendar className="h-4 w-4 mr-2" />
                募集・開催したボランティア
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}