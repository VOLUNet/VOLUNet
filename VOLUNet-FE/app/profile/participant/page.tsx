import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Edit3,
  Star,
  Calendar,
  MapPin,
  Users,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ParticipantProfilePage() {
  // サンプルデータ
  const user = {
    name: "杉村　志弥",
    avatar: "/ruru.jpg?height=120&width=120",
    rating: 4.6,
    reviewCount: 18,
    participationCount: 36, // 参加数
    joinDate: "2023年4月",
    location: "大阪府大阪市",
    bio: "大学生です。環境問題に関心があり、地域のボランティア活動に積極的に参加しています。",
  };

  const participatedActivities = [
    {
      id: 1,
      title: "地域清掃ボランティア",
      date: "2024年1月15日",
      location: "大阪城公園",
      organizer: "大阪環境サークル",
      status: "完了",
      rating: 5,
      image: "/oosakajou.jpg?height=80&width=80",
    },
    {
      id: 2,
      title: "高齢者支援活動",
      date: "2024年1月22日",
      location: "住吉区コミュニティセンター",
      organizer: "シニアサポート大阪",
      status: "完了",
      rating: 4,
      image: "/sumiyosi.jpg?height=80&width=80",
    },
    {
      id: 3,
      title: "子ども食堂お手伝い",
      date: "2024年2月5日",
      location: "天王寺区民センター",
      organizer: "みんなの食堂",
      status: "参加予定",
      rating: null,
      image: "/tennnouzi.jpg?height=80&width=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/student"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>

            <div className="flex space-x-3">
              <Link href="/profile/participant/qr">
                <Button
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR表示
                </Button>
              </Link>
              <Link href="/profile/participant/edit">
                <Button
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  プロフィール編集
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg mb-8">
            <div className="flex items-start space-x-6">
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={120}
                  height={120}
                  className="rounded-2xl border-4 border-white shadow-lg"
                />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {user.name}
                </h1>

                {/* Rating and Participation */}
                <div className="flex items-center space-x-4 mb-4">
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(user.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-slate-700">
                      {user.rating}
                    </span>
                    <span className="text-slate-500">
                      ({user.reviewCount}件の評価)
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-6 w-px bg-slate-300"></div>

                  {/* Participation Count */}
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-lg font-semibold text-slate-700">
                      {user.participationCount}
                    </span>
                    <span className="text-slate-500">回参加</span>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center space-x-6 text-slate-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">参加開始: {user.joinDate}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{user.location}</span>
                  </div>
                </div>

                {/* Bio */}
                {user.bio && (
                  <div className="text-slate-700 text-sm">
                    <p>{user.bio}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Participated Activities */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              参加したボランティア活動
            </h2>

            <div className="space-y-4">
              {participatedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    {/* Activity Image */}
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      width={80}
                      height={80}
                      className="rounded-xl border-2 border-white shadow-sm"
                    />

                    {/* Activity Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {activity.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {activity.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {activity.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              主催: {activity.organizer}
                            </div>
                          </div>
                          {/* Rating for completed activities */}
                          {activity.rating && (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-slate-500">
                                あなたの評価:
                              </span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < activity.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            activity.status === "完了"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State (if no activities) */}
            {participatedActivities.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  まだボランティア活動に参加していません
                </h3>
                <p className="text-slate-500 mb-6">
                  新しいボランティア活動に参加してみましょう
                </p>
                <Link href="/student">
                  <Button className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-6 py-2">
                    ボランティアを探す
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
