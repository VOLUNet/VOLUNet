"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVolunteerStore, type VolunteerActivity } from "@/lib/store"

export default function SearchPage() {
  const activities = useVolunteerStore((state) => state.activities)
  const [volunteerActivities, setVolunteerActivities] = useState<VolunteerActivity[]>([])

  // 初期化時にストアからデータを取得
  useEffect(() => {
    // 募集中かつ先生によって共有されたボランティアのみ表示
    const sharedActivities = activities.filter((activity) => activity.status === "募集中" && activity.sharedByTeacher)
    setVolunteerActivities(sharedActivities)
  }, [activities])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/student"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">ボランティア一覧</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Info Card */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">先生が選んだボランティア活動</h3>
            <p className="text-blue-700 text-sm">
              こちらに表示されているボランティア活動は、先生が生徒の皆さんに適していると判断して共有したものです。
            </p>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-900">{volunteerActivities.length}</span>
              件のボランティア活動があります
            </p>
          </div>

          {/* Volunteer Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteerActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full"
              >
                {/* Activity Image */}
                <div className="relative mb-4">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    width={120}
                    height={120}
                    className="w-full h-32 object-cover rounded-2xl"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-700">
                      {activity.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-100/90 backdrop-blur-sm rounded-lg text-xs font-medium text-green-700">
                      先生推奨
                    </span>
                  </div>
                </div>

                {/* Activity Info - flex-grow to fill available space */}
                <div className="space-y-3 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {activity.title}
                  </h3>

                  <Link href={`/volunteer/${activity.id}`}>
                    <p className="text-sm text-slate-600 line-clamp-2 flex-grow hover:text-slate-800 cursor-pointer transition-colors">
                      {activity.description}
                    </p>
                  </Link>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="h-4 w-4 mr-2 text-slate-400" />
                      主催: {activity.organizer}
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                      {activity.date}
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="h-4 w-4 mr-2 text-slate-400" />
                      {activity.time}〜
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                      {activity.location}
                    </div>
                  </div>

                  {/* Apply Button - positioned at bottom */}
                  <div className="pt-4">
                    <Link href={`/volunteer/${activity.id}`}>
                      <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl py-2 text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        参加申し込み
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {volunteerActivities.length === 0 && (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg text-center">
              <p className="text-slate-600 mb-4">現在、先生から共有されたボランティア活動はありません</p>
              <p className="text-slate-500 text-sm mb-6">先生がボランティア活動を共有するまでお待ちください</p>
              <Link href="/student">
                <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
                  ホームに戻る
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
