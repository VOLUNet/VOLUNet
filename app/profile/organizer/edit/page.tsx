"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// ユーザープロフィールの型定義
interface UserProfile {
  name: string
  email: string
  organization?: string
  location?: string
  activityField?: string
  experience?: string
  website?: string
  bio?: string
  avatar?: string
}

export default function OrganizerProfileEditPage() {
  const router = useRouter()
  // ローディング状態を管理するstate
  const [isLoading, setIsLoading] = useState(true)
  // プロフィール情報を管理するstate
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    organization: "",
    location: "大阪府大阪市",
    activityField: "環境保護",
    experience: "1年未満",
    website: "",
    bio: "",
    avatar: "/placeholder.svg?height=120&width=120",
  })

  useEffect(() => {
    // ローカルストレージからユーザー情報を取得
    const userEmail = localStorage.getItem("userEmail")
    const userName = localStorage.getItem("userName")

    if (userEmail) {
      // 保存されたプロフィール情報を取得
      const savedProfile = localStorage.getItem(`profile_${userEmail}`)

      if (savedProfile) {
        // 保存されたプロフィールがある場合はそれを使用
        setProfile(JSON.parse(savedProfile))
      } else {
        // 保存されたプロフィールがない場合、基本情報のみ設定
        setProfile((prev) => ({
          ...prev,
          name: userName || "ユーザー",
          email: userEmail,
        }))
      }
    } else {
      // ログインしていない場合はログインページにリダイレクト
      router.push("/login")
      return
    }
    // ローディング完了
    setIsLoading(false)
  }, [router])

  // 入力値の変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // プロフィール情報をローカルストレージに保存
    localStorage.setItem(`profile_${profile.email}`, JSON.stringify(profile))

    // ユーザー名も更新
    localStorage.setItem("userName", profile.name)

    // 保存成功後、プロフィールページに戻る
    router.push("/profile/organizer")
  }

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* ヘッダー部分 - 戻るボタンとタイトル */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/profile/organizer"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">プロフィール編集</h1>
            <div className="w-20"></div> {/* 中央揃えのためのスペーサー */}
          </div>

          {/* 編集フォーム */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
              {/* アバターアップロード部分 */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <Image
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                    width={120}
                    height={120}
                    className="rounded-2xl border-4 border-white shadow-lg"
                  />
                  <button
                    type="button"
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-700 rounded-full border-4 border-white flex items-center justify-center hover:bg-slate-600 transition-colors"
                  >
                    <Upload className="h-4 w-4 text-white" />
                  </button>
                </div>
                <p className="text-sm text-slate-500">プロフィール画像を変更</p>
              </div>

              {/* 基本情報フォーム */}
              <div className="space-y-6">
                {/* 名前入力 */}
                <div>
                  <Label htmlFor="name" className="text-slate-700 font-medium mb-2 block">
                    名前
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                    required
                  />
                </div>

                {/* メールアドレス（変更不可） */}
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block">
                    メールアドレス
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    className="bg-slate-100 border-slate-200 rounded-xl cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-slate-500 mt-1">メールアドレスは変更できません</p>
                </div>

                {/* 団体・組織名 */}
                <div>
                  <Label htmlFor="organization" className="text-slate-700 font-medium mb-2 block">
                    団体・組織名
                  </Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={profile.organization}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                    placeholder="例：大阪環境サークル"
                  />
                </div>

                {/* 居住地 */}
                <div>
                  <Label htmlFor="location" className="text-slate-700 font-medium mb-2 block">
                    居住地
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                  />
                </div>

                {/* 主な活動分野 */}
                <div>
                  <Label htmlFor="activityField" className="text-slate-700 font-medium mb-2 block">
                    主な活動分野
                  </Label>
                  <select
                    id="activityField"
                    name="activityField"
                    value={profile.activityField}
                    onChange={handleChange}
                    className="bg-white/80 border border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 px-3 py-2 w-full appearance-none"
                  >
                    <option value="環境保護">環境保護</option>
                    <option value="福祉">福祉</option>
                    <option value="教育">教育</option>
                    <option value="子育て支援">子育て支援</option>
                    <option value="動物愛護">動物愛護</option>
                    <option value="災害支援">災害支援</option>
                    <option value="地域活動">地域活動</option>
                    <option value="国際協力">国際協力</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                {/* 主催経験年数 */}
                <div>
                  <Label htmlFor="experience" className="text-slate-700 font-medium mb-2 block">
                    主催経験年数
                  </Label>
                  <select
                    id="experience"
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    className="bg-white/80 border border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 px-3 py-2 w-full appearance-none"
                  >
                    <option value="1年未満">1年未満</option>
                    <option value="1年">1年</option>
                    <option value="2年">2年</option>
                    <option value="3年">3年</option>
                    <option value="4年">4年</option>
                    <option value="5年以上">5年以上</option>
                  </select>
                </div>

                {/* ウェブサイト・SNS */}
                <div>
                  <Label htmlFor="website" className="text-slate-700 font-medium mb-2 block">
                    ウェブサイト・SNS
                  </Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={profile.website}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                    placeholder="https://example.com"
                  />
                </div>

                {/* 自己紹介・活動理念 */}
                <div>
                  <Label htmlFor="bio" className="text-slate-700 font-medium mb-2 block">
                    自己紹介・活動理念
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl min-h-[120px]"
                    placeholder="あなたの活動理念や目標について教えてください"
                  />
                </div>
              </div>
            </div>

            {/* プライバシー注意事項 */}
            <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">プライバシーについて</h3>
              <p className="text-blue-700 text-sm mb-2">
                プロフィール情報はローカルに保存され、VOLUNetの利用者に公開されます。
              </p>
              <p className="text-blue-700 text-sm">メールアドレスは参加者との連絡時のみ使用されます。</p>
            </div>

            {/* アクションボタン */}
            <div className="flex justify-center space-x-4">
              <Link href="/profile/organizer">
                <Button
                  type="button"
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-8 py-3 text-sm font-medium shadow-sm"
                >
                  キャンセル
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-3 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                保存する
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
