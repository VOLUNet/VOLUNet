"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, MapPin, Calendar, Clock, Users, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useImagePreviewStore } from "@/lib/store"

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activityName = searchParams.get("activity-name") || ""
  const location = searchParams.get("location") || ""
  const date = searchParams.get("date") || ""
  const timeHour = searchParams.get("time-hour") || "09"
  const timeMinute = searchParams.get("time-minute") || "00"
  const maxParticipants = searchParams.get("max-participants") || "15"
  const category = searchParams.get("category") || ""
  const description = searchParams.get("description") || ""
  const hasImage = searchParams.get("has-image") === "true"

  const imagePreview = useImagePreviewStore((state) => state.imagePreview)
  const setImagePreview = useImagePreviewStore((state) => state.setImagePreview)

  const handleBack = () => router.back()

  const handleSubmit = () => {
    // ここは画像アップロードやstore保存はなし。単純に遷移だけ。
    setImagePreview(null)
    router.push("/recruit/complete")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </button>
            <h1 className="text-2xl font-bold text-slate-900">内容の確認</h1>
            <div className="w-20" />
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8 space-y-6">
            {hasImage && imagePreview && (
              <img
                src={imagePreview}
                alt="活動画像プレビュー"
                className="w-full h-48 object-cover rounded-xl border-2 border-white shadow-sm"
              />
            )}
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">{activityName}</h2>
              <p className="text-slate-700">{description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-700">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>
                  {timeHour}:{timeMinute}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>最大{maxParticipants}人</span>
              </div>
              <div className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>{category}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-6 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              送信
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}