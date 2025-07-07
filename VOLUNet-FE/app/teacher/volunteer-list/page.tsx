"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVolunteerStore, type VolunteerActivity } from "@/lib/store";
import axios from "axios";

export default function TeacherVolunteerListPage() {
  //ボランティアリスト
  const [volunteerActivities, setVolunteerActivities] = useState<
    VolunteerActivity[]
  >([]);
  const setActivities = useVolunteerStore((state) => state.setActivities);

  //googleドライブからのURLから表示できる形式に変更
  function convertGoogleDriveUrl(url: string) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url; // 変換できなければそのまま返す
  }

  type RawVolunteer = {
    id: number;
    volunteerName: string;
    description: string;
    organizationName: string;
    eventDate: string;
    location: string;
    locationImageUrl: string;
  };

  // 初期化時にストアからデータを取得
  useEffect(() => {
    // 募集中のボランティアのみ表示
    axios
      .get("http://localhost:8787/volunteer-list")
      .then((response) => {
        const mappedActivities: VolunteerActivity[] = response.data.map(
          (item: RawVolunteer) => {
            const event = new Date(item.eventDate);
            return {
              id: item.id,
              title: item.volunteerName,
              organizer: item.organizationName,
              date: event.toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }), // 例: 2025/07/01
              time: event.toLocaleTimeString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }), // 例: 11:48
              location: item.location,
              participants: 0,
              maxParticipants: 0,
              category: "", // APIにないので空文字
              description: item.description,
              image: convertGoogleDriveUrl(item.locationImageUrl),
              status: "募集中",
              sharedByTeacher: true,
            };
          }
        );
        setVolunteerActivities(mappedActivities);
        setActivities(mappedActivities);
      })

      .catch((error) => {
        console.error("ボランティア取得エラー:", error);
      });
  }, [setActivities]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/teacher"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">
              ボランティア一覧（先生用）
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Info Card */}
          <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              先生用ボランティア管理
            </h3>
            <p className="text-blue-700 text-sm mb-2">
              こちらでは主催者が募集したボランティア活動を確認できます。
            </p>
            <p className="text-blue-700 text-sm">
              生徒に適したボランティアを選んで「共有」ボタンを押すと、生徒側のボランティア一覧に表示されます。
            </p>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-slate-600">
              <span className="font-semibold text-slate-900">
                {volunteerActivities.length}
              </span>
              件のボランティア活動があります
              <span className="ml-4 text-sm">
                （共有済み:{" "}
                {volunteerActivities.filter((a) => a.sharedByTeacher).length}
                件）
              </span>
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

                  {activity.sharedByTeacher && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="h-6 w-6 text-green-500 bg-white rounded-full" />
                    </div>
                  )}
                </div>

                {/* Activity Info - flex-grow to fill available space */}
                <div className="space-y-3 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {activity.title}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2 flex-grow">
                    {activity.description}
                  </p>

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

                  {/* Action Button - positioned at bottom */}
                  <div className="pt-4">
                    <Link href={`/teacher/volunteer/${activity.id}`}>
                      <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl py-2 text-sm font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
                        {activity.sharedByTeacher ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            共有済み・詳細確認
                          </>
                        ) : (
                          <>
                            <Share2 className="h-4 w-4 mr-2" />
                            詳細確認・共有
                          </>
                        )}
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
              <p className="text-slate-600 mb-4">
                現在募集中のボランティア活動はありません
              </p>
              <Link href="/teacher">
                <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
                  ホームに戻る
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
