"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProfileEditPage() {
  const router = useRouter()

  // サンプルデータ（実際はデータベースから取得）
  const [profile, setProfile] = useState({
    name: "佐藤 花子",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "大阪府大阪市",
    bio: "大学生です。環境問題に関心があり、地域のボランティア活動に積極的に参加しています。",
    email: "hanako.sato@example.com",
    phone: "090-1234-5678",
  })

  // 入力値の変更を処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  // フォーム送信処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // ここでデータを保存する処理を実装
    // 実際のアプリではAPIリクエストなどを行う

    // 保存成功後、プロフィールページに戻る
    router.push("/profile/participant")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/profile/participant"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">プロフィール編集</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
              {/* Avatar Upload */}
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

              {/* Basic Info */}
              <div className="space-y-6">
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

                <div>
                  <Label htmlFor="bio" className="text-slate-700 font-medium mb-2 block">
                    自己紹介
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">連絡先情報</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block">
                    メールアドレス
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-medium mb-2 block">
                    電話番号
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">プライバシーについて</h3>
              <p className="text-blue-700 text-sm mb-2">
                メールアドレスと電話番号は、ボランティア活動の主催者のみに共有されます。
              </p>
              <p className="text-blue-700 text-sm">その他のプロフィール情報は、VOLUNetの利用者に公開されます。</p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Link href="/profile/participant">
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
