"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUser } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // 入力値の変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError("")
  }

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // 入力チェック
      if (!formData.email || !formData.password) {
        throw new Error("メールアドレスとパスワードを入力してください")
      }

      // 認証ユーティリティを使用してログイン
      loginUser(formData.email, formData.password)

      // ホームページにリダイレクト
      router.push("/")
    } catch (error) {
      console.error("ログインエラー:", error)

      if (error instanceof Error) {
        // デモモードとして、ユーザーが存在しない場合でもログイン許可
        if (
          error.message === "メールアドレスまたはパスワードが正しくありません" &&
          formData.email &&
          formData.password
        ) {
          // デモ用の仮ユーザーとしてログイン
          localStorage.setItem("authToken", `demo_${Date.now()}`)
          localStorage.setItem("userEmail", formData.email)
          localStorage.setItem("userName", "ゲストユーザー")
          router.push("/")
          return
        }

        setError(error.message)
      } else {
        setError("ログイン処理中にエラーが発生しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/student"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">生徒ページへ</span>
            </Link>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Login Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            {/* VOLUNet Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-2">
                VOLUNet
              </h1>
              <p className="text-slate-500 text-sm mb-6">主催者ログイン</p>
              <h2 className="text-xl font-bold text-slate-900">アカウントにログイン</h2>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-slate-700 font-medium mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-slate-500" />
                  メールアドレス
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" className="text-slate-700 font-medium mb-2 flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-slate-500" />
                  パスワード
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="パスワードを入力"
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl py-3 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-3">
              <Link href="/forgot-password" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                パスワードを忘れた方はこちら
              </Link>
              <div className="text-sm text-slate-500">
                アカウントをお持ちでない方は{" "}
                <Link href="/register" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                  新規登録
                </Link>
              </div>
            </div>
          </div>

          {/* Demo Info */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mt-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">デモ用ログイン</h3>
            <p className="text-blue-700 text-sm mb-2">
              このデモでは、任意のメールアドレスとパスワードでログインできます。
            </p>
            <p className="text-blue-700 text-sm">または、新規登録してアカウントを作成することもできます。</p>
          </div>
        </div>
      </main>
    </div>
  )
}
