"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Edit3, Star, Calendar, MapPin, Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export default function OrganizerProfilePage() {
  // ユーザープロフィール情報を管理するstate
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  // ローディング状態を管理するstate
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ローカルストレージからユーザー情報を取得
    const userEmail = localStorage.getItem("userEmail")
    const userName = localStorage.getItem("userName")

    if (userEmail) {
      // 保存されたプロフィール情報を取得
      const savedProfile = localStorage.getItem(`profile_${userEmail}`)

      if (savedProfile) {
        // 保存されたプロフィールがある場合はそれを使用
        setUserProfile(JSON.parse(savedProfile))
      } else {
        // 保存されたプロフィールがない場合、基本情報のみ設定
        setUserProfile({
          name: userName || "ユーザー",
          email: userEmail,
          location: "大阪府大阪市",
          organization: "",
          activityField: "環境保護",
          experience: "1年未満",
          website: "",
          bio: "",
          avatar: "/placeholder.svg?height=120&width=120",
        })
      }
    }
    // ローディング完了
    setIsLoading(false)
  }, [])

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

  // プロフィールが見つからない場合のエラー表示
  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">プロフィール情報が見つかりません</h1>
          <p className="text-slate-600 mb-6">ログインしてからアクセスしてください。</p>
          <Link href="/login">
            <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
              ログインページへ
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // 統計情報（サンプルデータ）
  const stats = {
    rating: 3.5,
    reviewCount: 24,
    organizationCount: 18,
    joinDate: "2023年4月",
  }

  // 募集したボランティア活動（サンプルデータ）
  const organizedActivities = [
    {
      id: 1,
      title: "地域清掃ボランティア",
      date: "2024年1月15日",
      location: "大阪城公園",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      title: "高齢者支援活動",
      date: "2024年1月22日",
      location: "住吉区コミュニティセンター",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      title: "子ども食堂お手伝い",
      date: "2024年2月5日",
      location: "天王寺区民センター",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー部分 - 戻るボタンと編集ボタン */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>

            <Link href="/profile/organizer/edit">
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-4 py-2 text-sm font-medium shadow-sm"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                プロフィール編集
              </Button>
            </Link>
          </div>

          {/* プロフィールカード */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
            <div className="flex items-start space-x-6">
              {/* アバター画像 */}
              <div>
                <Image
                  src={userProfile.avatar || "/placeholder.svg?height=120&width=120"}
                  alt={userProfile.name}
                  width={120}
                  height={120}
                  className="rounded-2xl border-4 border-white shadow-lg"
                />
              </div>

              {/* ユーザー情報 */}
              <div className="flex-1">
                {/* ユーザー名 */}
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{userProfile.name}</h1>

                {/* 所属組織 */}
                {userProfile.organization && <p className="text-lg text-slate-700 mb-3">{userProfile.organization}</p>}

                {/* 評価と主催回数 */}
                <div className="flex items-center space-x-4 mb-4">
                  {/* 評価 */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(stats.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-slate-700">{stats.rating}</span>
                    <span className="text-slate-500">({stats.reviewCount}件の評価)</span>
                  </div>

                  {/* 区切り線 */}
                  <div className="h-6 w-px bg-slate-300"></div>

                  {/* 主催回数 */}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-slate-700">{stats.organizationCount}</span>
                    <span className="text-slate-500">回主催</span>
                  </div>
                </div>

                {/* 追加情報 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 mb-4">
                  {/* 主催開始日 */}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">主催開始: {stats.joinDate}</span>
                  </div>

                  {/* 居住地 */}
                  {userProfile.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{userProfile.location}</span>
                    </div>
                  )}

                  {/* 活動分野 */}
                  {userProfile.activityField && (
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">活動分野: {userProfile.activityField}</span>
                    </div>
                  )}

                  {/* 経験年数 */}
                  {userProfile.experience && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2" />
                      <span className="text-sm">経験: {userProfile.experience}</span>
                    </div>
                  )}
                </div>

                {/* ウェブサイト */}
                {userProfile.website && (
                  <div className="flex items-center text-slate-600 mb-4">
                    <Globe className="h-4 w-4 mr-2" />
                    <a
                      href={userProfile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      {userProfile.website}
                    </a>
                  </div>
                )}

                {/* 自己紹介 */}
                {userProfile.bio && (
                  <div className="text-slate-700 text-sm">
                    <p>{userProfile.bio}</p>
                  </div>
                )}

                {/* メールアドレス（参考表示） */}
                <div className="mt-4 text-xs text-slate-500">登録メール: {userProfile.email}</div>
              </div>
            </div>
          </div>

          {/* 募集したボランティア活動一覧 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">募集したボランティア</h2>

            {/* 活動リスト */}
            <div className="space-y-4">
              {organizedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    {/* 活動画像 */}
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      width={80}
                      height={80}
                      className="rounded-xl border-2 border-white shadow-sm"
                    />

                    {/* 活動情報 */}
                    <div className="flex-1">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{activity.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                          {/* 開催日 */}
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {activity.date}
                          </div>
                          {/* 開催場所 */}
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {activity.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 活動がない場合の表示 */}
            {organizedActivities.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">まだボランティア活動を募集していません</h3>
                <p className="text-slate-500 mb-6">新しいボランティア活動を募集してみましょう</p>
                <Link href="/recruit">
                  <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
                    ボランティアを募集する
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
