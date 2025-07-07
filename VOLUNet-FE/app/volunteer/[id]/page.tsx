"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVolunteerStore, type VolunteerActivity } from "@/lib/store";
import { useParams } from "next/navigation";

export default function VolunteerDetailPage() {
  const { id } = useParams();
  const activities = useVolunteerStore((state) => state.activities);
  const [volunteerActivity, setVolunteerActivity] =
    useState<VolunteerActivity | null>(null);

  useEffect(() => {
    // IDに基づいて活動を検索
    const activity = activities.find(
      (a) => a.id === Number.parseInt(id as string)
    );
    if (activity) {
      setVolunteerActivity(activity);
    }
  }, [activities, id]);

  // 活動が見つからない場合
  if (!volunteerActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            ボランティア活動が見つかりません
          </h1>
          <p className="text-slate-600 mb-6">
            指定されたIDのボランティア活動は存在しないか、削除された可能性があります。
          </p>
          <Link href="/search">
            <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
              ボランティア一覧に戻る
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/search"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">
              ボランティア詳細
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Activity Image and Basic Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <div className="relative mb-6">
                <Image
                  src={volunteerActivity.image || "/placeholder.svg"}
                  alt={volunteerActivity.title}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover rounded-2xl"
                />
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-6">
                {volunteerActivity.title}
              </h1>

              {/* Activity Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-5 w-5 mr-3 text-slate-400" />
                    <span className="font-medium">開催日:</span>
                    <span className="ml-2">{volunteerActivity.date}</span>
                  </div>

                  <div className="flex items-center text-slate-600">
                    <Clock className="h-5 w-5 mr-3 text-slate-400" />
                    <span className="font-medium">開始時間:</span>
                    <span className="ml-2">{volunteerActivity.time}〜</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-slate-600">
                    <MapPin className="h-5 w-5 mr-3 text-slate-400" />
                    <span className="font-medium">場所:</span>
                    <span className="ml-2">{volunteerActivity.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">主催者</h2>
              <div className="flex items-center space-x-4">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt={volunteerActivity.organizer}
                  width={60}
                  height={60}
                  className="rounded-xl border-2 border-white shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {volunteerActivity.organizer}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-purple-500" />
                      <span>主催者</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                活動概要
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  {volunteerActivity.description}
                </p>
              </div>
            </div>

            {/* Apply Button */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  このボランティアに参加しませんか？
                </h3>
                <p className="text-slate-600 mb-6">
                  参加をご希望の方は、下記のボタンから応募してください。
                </p>
                <Link href={`/volunteer/${id}/confirm`}>
                  <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    応募する
                  </Button>
                </Link>
                <p className="text-xs text-slate-500 mt-4">
                  ※応募後、主催者から詳細な連絡があります
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
