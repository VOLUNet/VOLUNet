"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVolunteerStore, type VolunteerActivity } from "@/lib/store"

export default function OrganizerActivitiesPage() {
  // Zustandストアからボランティア活動データを取得
  const activities = useVolunteerStore((state) => state.activities)
  // 募集中と終了したボランティアを分けて管理するためのstate
  const [activeActivities, setActiveActivities] = useState<VolunteerActivity[]>([])
  const [pastActivities, setPastActivities] = useState<VolunteerActivity[]>([])

  // 初期化時にストアからデータを取得し、状態に応じて分類
  useEffect(() => {
    // 募集中と終了したボランティアに分ける
    setActiveActivities(activities.filter((activity) => activity.status === "募集中"))
    setPastActivities(activities.filter((activity) => activity.status === "終了"))
  }, [activities]) // activitiesが変更されたら再実行

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* ヘッダー部分 - タイトルと戻るボタン */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group">
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">募集または開催したボランティア</h1>
            <div className="w-20"></div> {/* 中央揃えのためのスペーサー */}
          </div>

          {/* 募集中のボランティア活動セクション */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
              募集中のボランティア
            </h2>

            {/* 募集中の活動がある場合はグリッドで表示 */}
            {activeActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all flex flex-col h-full"
                  >
                    <div className="flex flex-grow">
                      {/* 活動のサムネイル画像 */}
                      <div className="mr-5 flex-shrink-0">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          width={100}
                          height={100}
                          className="rounded-2xl border-2 border-white shadow-sm"
                        />
                      </div>

                      {/* 活動の詳細情報 */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{activity.title}</h3>

                        <div className="space-y-1 mb-3 flex-grow">
                          {/* 開催日 */}
                          <div className="flex items-center text-sm text-slate-600">
                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.date}
                          </div>

                          {/* 開始時間 */}
                          <div className="flex items-center text-sm text-slate-600">
                            <Clock className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.time}〜
                          </div>

                          {/* 開催場所 */}
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.location}
                          </div>

                          {/* 参加者数 */}
                          <div className="flex items-center text-sm text-slate-600">
                            <Users className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.participants}/{activity.maxParticipants}人参加
                          </div>
                        </div>

                        {/* 詳細ボタン - カードの下部に配置 */}
                        <div className="mt-auto">
                          <Link href={`/organizer/activities/${activity.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-lg text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              詳細
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 募集中の活動がない場合の表示
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg text-center">
                <p className="text-slate-600 mb-4">現在募集中のボランティア活動はありません</p>
                <Link href="/recruit">
                  <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
                    ボランティアを募集する
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* 終了したボランティア活動セクション */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
              <div className="w-2 h-8 bg-slate-400 rounded-full mr-3"></div>
              終了したボランティア
            </h2>

            {/* 終了した活動がある場合はグリッドで表示 */}
            {pastActivities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 border border-white/50 shadow-md hover:shadow-lg transition-all flex flex-col h-full"
                  >
                    <div className="flex flex-grow">
                      {/* 活動のサムネイル画像（終了した活動は少し透明に） */}
                      <div className="mr-5 flex-shrink-0">
                        <Image
                          src={activity.image || "/placeholder.svg"}
                          alt={activity.title}
                          width={100}
                          height={100}
                          className="rounded-2xl border-2 border-white shadow-sm opacity-80"
                        />
                      </div>

                      {/* 活動の詳細情報 */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-slate-700 mb-2">{activity.title}</h3>

                        <div className="space-y-1 mb-3 flex-grow">
                          {/* 開催日 */}
                          <div className="flex items-center text-sm text-slate-500">
                            <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.date}
                          </div>

                          {/* 開始時間 */}
                          <div className="flex items-center text-sm text-slate-500">
                            <Clock className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.time}〜
                          </div>

                          {/* 開催場所 */}
                          <div className="flex items-center text-sm text-slate-500">
                            <MapPin className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.location}
                          </div>

                          {/* 参加者数 */}
                          <div className="flex items-center text-sm text-slate-500">
                            <Users className="h-4 w-4 mr-2 text-slate-400" />
                            {activity.participants}/{activity.maxParticipants}人参加
                          </div>
                        </div>

                        {/* 詳細ボタン - カードの下部に配置 */}
                        <div className="mt-auto">
                          <Link href={`/organizer/activities/${activity.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-lg text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              詳細
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // 終了した活動がない場合の表示
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg text-center">
                <p className="text-slate-600">過去に開催したボランティア活動はありません</p>
              </div>
            )}
          </div>

          {/* 新規ボランティア募集ボタン */}
          <div className="mt-12 text-center">
            <Link href="/recruit">
              <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                新しいボランティアを募集する
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}