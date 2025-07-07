"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = () => {
    // バリデーションや認証は無しで遷移だけする
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6 py-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/student" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group">
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">生徒ページへ</span>
          </Link>
          <div className="w-20" /> {/* Spacer for centering */}
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
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleLogin()
            }}
            className="space-y-6"
          >
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl py-3 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ログイン
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
          <p className="text-blue-700 text-sm">一度ログインすると、次回からは自動的にログインされます。</p>
        </div>
      </div>
    </div>
  )
}