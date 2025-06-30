"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

// ボランティア活動データの型定義
type VolunteerActivity = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  participants: number
  maxParticipants: number
}

export default function VolunteerDetailPage() {
  const params = useParams()  // URLパラメータを取得
  const { id } = params       // 活動IDを取得
  const [activity, setActivity] = useState<VolunteerActivity | null>(null) // 活動詳細データを保持
  const [error, setError] = useState("")  // エラーメッセージ用ステート

  useEffect(() => {
    // APIから活動詳細データを取得する非同期関数
    const fetchActivity = async () => {
      try {
        // BearerトークンをAuthorizationヘッダーに付与してAPI呼び出し
        const res = await fetch(`/api/activities/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`
          }
        })
        if (!res.ok) throw new Error("データ取得に失敗しました") // レスポンスエラー処理
        const data = await res.json()  // JSONデータをパース
        setActivity(data)              // ステートにセット
      } catch (err) {
        // エラーが発生した場合はメッセージをセット
        setError(err instanceof Error ? err.message : "不明なエラー")
      }
    }
    if (id) fetchActivity() // idがあればデータ取得実行
  }, [id])

  // エラーがあれば赤文字で表示
  if (error) {
    return <p className="text-center text-red-500">{error}</p>
  }

  // 活動データがまだ読み込み中の場合の表示
  if (!activity) {
    return <p className="text-center text-slate-600">読み込み中...</p>
  }

  // 活動詳細の画面表示
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      {/* 活動一覧ページへの戻るリンク */}
      <Link href="/organizer/activities" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="h-5 w-5 mr-2" />
        戻る
      </Link>

      {/* 活動タイトル */}
      <h1 className="text-2xl font-bold mb-4">{activity.title}</h1>

      {/* 活動の各詳細情報 */}
      <p className="text-slate-700 mb-2">日付: {activity.date}</p>
      <p className="text-slate-700 mb-2">時間: {activity.time}</p>
      <p className="text-slate-700 mb-2">場所: {activity.location}</p>
      <p className="text-slate-700 mb-2">参加者: {activity.participants}/{activity.maxParticipants}</p>
      <p className="text-slate-700">{activity.description}</p>
    </div>
  )
}
