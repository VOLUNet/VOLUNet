"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  User,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVolunteerStore, type VolunteerActivity } from "@/lib/store";
import { useParams } from "next/navigation";
import axios from "axios";

export default function TeacherVolunteerDetailPage() {
  const activities = useVolunteerStore((state) => state.activities);
  const shareActivity = useVolunteerStore((state) => state.shareActivity);
  const [volunteerActivity, setVolunteerActivity] =
    useState<VolunteerActivity | null>(null);
  const { id } = useParams();

  useEffect(() => {
    // IDに基づいて活動を検索
    const activity = activities.find(
      (a) => a.id === Number.parseInt(id as string)
    );
    if (activity) {
      setVolunteerActivity(activity);
    }
  }, [activities, id]);

  // 共有処理
  const handleShare = async () => {
    if (!volunteerActivity) return;

    try {
      const response = await axios.put(
        `http://localhost:8787/volunteer/${volunteerActivity.id}`
      );
      console.log(response.data.message); // 成功メッセージの表示（任意）

      // storeの状態を更新する（必要であれば）
      shareActivity(volunteerActivity.id);
      // alert("生徒に共有しました！");
    } catch (error) {
      console.error("共有エラー:", error);
      // alert("共有に失敗しました。");
    }
  };

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
          <Link href="/teacher/volunteer-list">
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
              href="/teacher/volunteer-list"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">
              ボランティア詳細（先生用）
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
                {volunteerActivity.isSharedToStudents && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-2 px-3 py-1 bg-green-100/90 backdrop-blur-sm rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        共有済み
                      </span>
                    </div>
                  </div>
                )}
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

            {/* Teacher Action */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <div className="text-center">
                {volunteerActivity.isSharedToStudents ? (
                  <>
                    <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      このボランティアは生徒に共有済みです
                    </h3>
                    <p className="text-slate-600 mb-6">
                      生徒はボランティア一覧でこの活動を確認し、参加申し込みができます。
                    </p>
                    <Link href="/student">
                      <Button
                        variant="outline"
                        className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-8 py-3 text-sm font-medium shadow-sm"
                      >
                        生徒ページを確認
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      このボランティアを生徒に共有しますか？
                    </h3>
                    <p className="text-slate-600 mb-6">
                      共有すると、生徒のボランティア一覧にこの活動が表示され、参加申し込みができるようになります。
                    </p>
                    <Button
                      onClick={handleShare}
                      className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      <Share2 className="h-5 w-5 mr-3" />
                      生徒に共有する
                    </Button>
                  </>
                )}
                <p className="text-xs text-slate-500 mt-4">
                  ※共有後も、いつでも共有を取り消すことができます
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
