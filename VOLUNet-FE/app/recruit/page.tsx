"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Info,
  Users,
  AlertCircle,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { useImagePreviewStore } from "@/lib/store"

export default function RecruitPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    activityName: "",
    location: "",
    date: "",
    timeHour: "09",
    timeMinute: "00",
    maxParticipants: "15",
    category: "環境保護",
    description: "",
  })

  const imagePreview = useImagePreviewStore((state) => state.imagePreview)
  const setImagePreview = useImagePreviewStore((state) => state.setImagePreview)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageRemove = () => {
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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

    setError(null)

    const params = new URLSearchParams({
      "activity-name": formData.activityName,
      location: formData.location,
      date: formData.date,
      "time-hour": formData.timeHour,
      "time-minute": formData.timeMinute,
      "max-participants": formData.maxParticipants,
      category: formData.category,
      description: formData.description,
      "has-image": imagePreview ? "true" : "false",
    })

    router.push(`/recruit/confirm?${params.toString()}`)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">
              ボランティアを募集する
            </h1>
            <div className="w-20"></div>
          </div>

          {/* エラー表示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* フォーム */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
            <form onSubmit={handleSubmit}>
              {/* ボランティア名 */}
              <div className="mb-6">
                <Label
                  htmlFor="activityName"
                  className="text-slate-700 font-medium mb-2 flex items-center"
                >
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  ボランティア名<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="activityName"
                  name="activityName"
                  value={formData.activityName}
                  onChange={handleChange}
                  placeholder="例：地域清掃ボランティア"
                  className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12"
                  required
                />
              </div>

              {/* カテゴリ */}
              <div className="mb-6">
                <Label
                  htmlFor="category"
                  className="text-slate-700 font-medium mb-2 flex items-center"
                >
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  カテゴリ<span className="text-red-500 ml-1">*</span>
                </Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-white/80 border border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 px-3 py-2 w-full appearance-none"
                  required
                >
                  <option value="環境保護">環境保護</option>
                  <option value="福祉">福祉</option>
                  <option value="地域活動">地域活動</option>
                </select>
              </div>

              {/* 活動画像 */}
              <div className="mb-6">
                <Label
                  htmlFor="image"
                  className="text-slate-700 font-medium mb-2 flex items-center"
                >
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  活動画像
                  <span className="text-slate-500 ml-1 text-sm">(任意)</span>
                </Label>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-slate-400 transition-colors">
                    <input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="cursor-pointer flex flex-col items-center space-y-2"
                    >
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                        <Upload className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="text-slate-600">
                        <span className="font-medium">クリックして画像をアップロード</span>
                        <p className="text-sm text-slate-500 mt-1">
                          PNG, JPG, GIF (最大10MB)
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="活動画像プレビュー"
                      className="w-full h-48 object-cover rounded-xl border-2 border-white shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={handleImageRemove}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                    <div className="mt-2 text-center">
                      <label
                        htmlFor="image"
                        className="text-sm text-slate-600 hover:text-slate-900 cursor-pointer underline"
                      >
                        画像を変更
                      </label>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 開催場所 */}
              <div className="mb-6">
                <Label
                  htmlFor="location"
                  className="text-slate-700 font-medium mb-2 flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                  開催場所<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="例：大阪城公園"
                  className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12"
                  required
                />
              </div>

              {/* 日時 */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label
                    htmlFor="date"
                    className="text-slate-700 font-medium mb-2 flex items-center"
                  >
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    開催日<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="timeHour"
                    className="text-slate-700 font-medium mb-2 flex items-center"
                  >
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    開始時間<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="flex items-center space-x-2">
                    <select
                      id="timeHour"
                      name="timeHour"
                      value={formData.timeHour}
                      onChange={handleChange}
                      className="bg-white/80 border border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 px-3 py-2 appearance-none flex-1 text-center"
                      required
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i.toString().padStart(2, "0")}>
                          {i.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                    <span className="text-slate-700 font-medium">:</span>
                    <select
                      id="timeMinute"
                      name="timeMinute"
                      value={formData.timeMinute}
                      onChange={handleChange}
                      className="bg-white/80 border border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12 px-3 py-2 appearance-none flex-1 text-center"
                      required
                    >
                      {[0, 15, 30, 45].map((m) => (
                        <option key={m} value={m.toString().padStart(2, "0")}>
                          {m.toString().padStart(2, "0")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 募集人数 */}
              <div className="mb-6">
                <Label
                  htmlFor="maxParticipants"
                  className="text-slate-700 font-medium mb-2 flex items-center"
                >
                  <Users className="h-4 w-4 mr-2 text-slate-500" />
                  募集人数<span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  placeholder="例：15"
                  className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl h-12"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  1〜100人の範囲で入力してください
                </p>
              </div>

              {/* 活動概要 */}
              <div className="mb-8">
                <Label
                  htmlFor="description"
                  className="text-slate-700 font-medium mb-2 flex items-center"
                >
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  活動概要<span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="ボランティア活動の詳細を入力してください..."
                  className="bg-white/80 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-xl min-h-[150px]"
                  required
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-6 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  確認
                </Button>
              </div>
            </form>
          </div>

          {/* Tips */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              募集のヒント
            </h3>
            <ul className="space-y-2 text-blue-700 text-sm">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                ボランティア名はわかりやすく簡潔に
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                カテゴリは募集内容にあったものを選びましょう
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                活動画像があればより参加意欲が高まります
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                開催日時は正確に入力してください
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-blue-200 rounded-full mr-2 mt-1 flex-shrink-0"></span>
                活動概要は詳しく丁寧に書きましょう
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}