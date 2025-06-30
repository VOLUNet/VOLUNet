"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RecruitPage() {
  const router = useRouter()

  // 入力フォームの状態をuseStateで管理
  const [formData, setFormData] = useState({
    activityName: "",     // ボランティア名
    location: "",         // 開催場所
    date: "",             // 開催日
    timeHour: "09",       // 開始時（時）
    timeMinute: "00",     // 開始時（分）
    maxParticipants: "15",// 最大参加人数
    category: "環境保護",  // カテゴリ（環境保護など）
    description: "",      // 活動概要
  })

  const [error, setError] = useState<string | null>(null) // 入力エラー表示用

  // 入力フォームの値が変更されたらstate更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError(null) // エラーがあればクリア
  }

  // 「確認へ進む」ボタン押下時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 簡単なバリデーション（必須項目チェック）
    if (!formData.activityName.trim()) {
      setError("ボランティア名を入力してください")
      return
    }
    if (!formData.location.trim()) {
      setError("開催場所を入力してください")
      return
    }
    if (!formData.date) {
      setError("開催日を入力してください")
      return
    }
    if (!formData.description.trim()) {
      setError("活動概要を入力してください")
      return
    }

    // 入力値をURLパラメータとして作成
    const params = new URLSearchParams({
      "activity-name": formData.activityName,
      location: formData.location,
      date: formData.date,
      "time-hour": formData.timeHour,
      "time-minute": formData.timeMinute,
      "max-participants": formData.maxParticipants,
      category: formData.category,
      description: formData.description,
    })

    // 確認画面へ遷移（URLにパラメータを付けて渡す）
    router.push(`/recruit/confirm?${params.toString()}`)
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">ボランティアを募集する</h1>

      {/* 入力エラー表示 */}
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ボランティア名入力 */}
        <input
          name="activityName"
          placeholder="ボランティア名"
          value={formData.activityName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* 開催場所入力 */}
        <input
          name="location"
          placeholder="開催場所"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* 開催日入力 */}
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* 開始時間（時・分）セレクトボックス */}
        <div className="flex space-x-2">
          <select
            name="timeHour"
            value={formData.timeHour}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
            required
          >
            {[...Array(24)].map((_, i) => (
              <option key={i} value={i.toString().padStart(2, "0")}>
                {i.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <select
            name="timeMinute"
            value={formData.timeMinute}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
            required
          >
            {[0, 15, 30, 45].map(m => (
              <option key={m} value={m.toString().padStart(2, "0")}>
                {m.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>

        {/* 最大参加人数入力 */}
        <input
          name="maxParticipants"
          type="number"
          min="1"
          max="100"
          value={formData.maxParticipants}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />

        {/* カテゴリ選択 */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        >
          <option value="環境保護">環境保護</option>
          <option value="福祉">福祉</option>
          <option value="地域活動">地域活動</option>
        </select>

        {/* 活動概要入力 */}
        <textarea
          name="description"
          placeholder="活動概要"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          rows={4}
          required
        />

        {/* 確認画面へ進むボタン */}
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 px-6 rounded hover:bg-blue-800 transition"
        >
          確認へ進む
        </button>
      </form>
    </main>
  )
}
