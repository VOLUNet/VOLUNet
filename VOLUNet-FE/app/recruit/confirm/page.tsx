"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Clock, Info, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConfirmPage() {
  const searchParams = useSearchParams()

  // URLパラメータから値を取得
  const formData = {
    activityName: searchParams.get("activity-name") || "地域清掃ボランティア",
    location: searchParams.get("location") || "大阪城公園",
    date: searchParams.get("date") || "2024-02-15",
    timeHour: searchParams.get("time-hour") || "09",
    timeMinute: searchParams.get("time-minute") || "00",
    maxParticipants: searchParams.get("max-participants") || "15",
    category: searchParams.get("category") || "環境保護",
    description:
      searchParams.get("description") ||
      "大阪城公園周辺の清掃活動を行います。軍手とゴミ袋は主催者が用意いたします。雨天の場合は翌週に延期いたします。",
  }

  // 日付をフォーマット
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  // 時間をフォーマット
  const formatTime = (hour: string, minute: string) => {
    return `${hour}:${minute}`
  }

  // 確認ページから完了ページへのリンクにパラメータを引き継ぐ
  const completeUrl = `/recruit/complete?${new URLSearchParams({
    "activity-name": formData.activityName,
    location: formData.location,
    date: formData.date,
    "time-hour": formData.timeHour,
    "time-minute": formData.timeMinute,
    "max-participants": formData.maxParticipants,
    category: formData.category,
    description: formData.description,
  }).toString()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/recruit"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">入力内容の確認</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Confirmation Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
            <div className="space-y-6">
              {/* Activity Name */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">ボランティア名</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">{formData.activityName}</p>
              </div>

              {/* Category */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">カテゴリ</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">{formData.category}</p>
              </div>

              {/* Location */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">開催場所</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">{formData.location}</p>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-6 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm font-medium text-slate-600">開催日</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">{formatDate(formData.date)}</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-slate-500" />
                    <span className="text-sm font-medium text-slate-600">開始時間</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatTime(formData.timeHour, formData.timeMinute)}
                  </p>
                </div>
              </div>

              {/* Max Participants */}
              <div className="border-b border-slate-200 pb-4">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">募集人数</span>
                </div>
                <p className="text-lg font-semibold text-slate-900">{formData.maxParticipants}人</p>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center mb-2">
                  <Info className="h-4 w-4 mr-2 text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">活動概要</span>
                </div>
                <p className="text-slate-900 leading-relaxed whitespace-pre-wrap">{formData.description}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Link href="/recruit">
              <Button
                variant="outline"
                className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-8 py-3 text-sm font-medium shadow-sm"
              >
                修正する
              </Button>
            </Link>
            <Link href={completeUrl}>
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-3 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                完了
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
