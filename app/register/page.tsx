"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUser, getCurrentUser } from "@/lib/auth"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // 既にログインしているかチェック
  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      // 既にログインしている場合は自動的にホームページにリダイレクト
      router.push("/")
    } else {
      setIsCheckingAuth(false)
    }
  }, [router])

  // 入力値の変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // 入力時にエラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // フォームのバリデーション
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // 名前のバリデーション
    if (!formData.name.trim()) {
      newErrors.name = "名前を入力してください"
    }

    // メールアドレスのバリデーション
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください"
    }

    // パスワードのバリデーション
    if (!formData.password) {
      newErrors.password = "パスワードを入力してください"
    } else if (formData.password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください"
    }

    // パスワード確認のバリデーション
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "パスワードが一致しません"
    }

    // 既存ユーザーチェック
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const existingUser = users.find((user: any) => user.email === formData.email)
    if (existingUser) {
      newErrors.email = "このメールアドレスは既に登録されています"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // フォーム送信処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // 認証ユーティリティを使用してユーザー登録
      registerUser(formData.name, formData.email, formData.password)

      // 登録成功メッセージを表示（実際のアプリではトースト通知などを使用）
      alert("登録が完了しました！自動的にログインします。")

      // 新規登録フラグ付きでホームページにリダイレクト
      router.push("/?welcome=true")
    } catch (error) {
      console.error("登録エラー:", error)
      if (error instanceof Error) {
        setErrors({ form: error.message })
      } else {
        setErrors({ form: "登録中にエラーが発生しました。もう一度お試しください。" })
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 認証チェック中の表示
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">認証状態を確認中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/login"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">ログインに戻る</span>
            </Link>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Register Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            {/* VOLUNet Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent mb-2">
                VOLUNet
              </h1>
              <p className="text-slate-500 text-sm mb-6">主催者アカウント登録</p>
              <h2 className="text-xl font-bold text-slate-900">新規アカウント作成</h2>
            </div>

            {/* Form Error */}
            {errors.form && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{errors.form}</p>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-slate-700 font-medium mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-slate-500" />
                  名前
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="例：田中 太郎"
                  className={`bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 ${
                    errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

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
                  className={`bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 ${
                    errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
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
                    placeholder="6文字以上で入力"
                    className={`bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 pr-12 ${
                      errors.password ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-slate-500" />
                  パスワード（確認）
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="パスワードを再入力"
                    className={`bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 pr-12 ${
                      errors.confirmPassword ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl py-3 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? "登録中..." : "アカウント作成"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-500">
                既にアカウントをお持ちの方は{" "}
                <Link href="/login" className="text-slate-700 hover:text-slate-900 font-medium transition-colors">
                  ログイン
                </Link>
              </p>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mt-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">主催者アカウントについて</h3>
            <p className="text-blue-700 text-sm mb-2">
              主催者アカウントを作成すると、ボランティア活動の募集や管理ができるようになります。
            </p>
            <p className="text-blue-700 text-sm">登録情報はローカルに保存され、次回からは自動的にログインされます。</p>
          </div>
        </div>
      </main>
    </div>
  )
}
