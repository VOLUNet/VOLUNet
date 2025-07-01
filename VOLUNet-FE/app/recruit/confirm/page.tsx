"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function ConfirmPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)  // 送信中状態管理
  const [error, setError] = useState<string | null>(null)  // 送信エラー表示用

  // URLパラメータからフォームデータを取得
  const formData = {
    activityName: searchParams.get("activity-name") || "",
    location: searchParams.get("location") || "",
    date: searchParams.get("date") || "",
    timeHour: searchParams.get("time-hour") || "09",
    timeMinute: searchParams.get("time-minute") || "00",
    maxParticipants: searchParams.get("max-participants") || "15",
    category: searchParams.get("category") || "環境保護",
    description: searchParams.get("description") || "",
  }

  // 日付を「YYYY年M月D日」形式に整形する関数
  const formatDate = (dateString: string) => {
    const d = new Date(dateString)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
  }

  // 時間を「HH:MM」形式に整形する関数
  const formatTime = (hour: string, minute: string) => `${hour}:${minute}`

  // 「完了」ボタン押下時のAPI送信処理
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // バックエンドに送るデータ整形
      const postData = {
        title: formData.activityName,
        date: formatDate(formData.date),
        time: formatTime(formData.timeHour, formData.timeMinute),
        location: formData.location,
        maxParticipants: Number.parseInt(formData.maxParticipants),
        category: formData.category,
        description: formData.description,
      }

      // API送信（URLは実際のバックエンドに合わせて変更してください）
      const res = await fetch("/api/volunteer/recruit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (!res.ok) throw new Error("API送信失敗")

      // 送信成功したら完了画面へ遷移
      router.push("/recruit/complete")
    } catch (err) {
      // エラー発生時はエラーメッセージを表示し送信状態を解除
      setError("登録に失敗しました。もう一度お試しください。")
      setIsSubmitting(false)
    }
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">入力内容の確認</h1>

      {/* エラー表示 */}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      {/* 入力内容表示 */}
      <div className="space-y-4">
        <p><strong>ボランティア名:</strong> {formData.activityName}</p>
        <p><strong>カテゴリ:</strong> {formData.category}</p>
        <p><strong>開催場所:</strong> {formData.location}</p>
        <p><strong>開催日:</strong> {formatDate(formData.date)}</p>
        <p><strong>開始時間:</strong> {formatTime(formData.timeHour, formData.timeMinute)}</p>
        <p><strong>募集人数:</strong> {formData.maxParticipants}人</p>
        <p><strong>活動概要:</strong> <br />{formData.description}</p>
      </div>

      {/* 修正と送信のボタン */}
      <div className="mt-6 flex space-x-4">
        {/* 修正ボタンは前の画面に戻る */}
        <button
          onClick={() => router.back()}
          className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
          disabled={isSubmitting}
        >
          修正する
        </button>

        {/* 完了ボタンはAPI送信 */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
        >
          {isSubmitting ? "処理中..." : "完了"}
        </button>
      </div>
    </main>
  )
}