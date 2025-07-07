"use client";

import { useEffect, useState } from "react";
import { useVolunteerStore, type VolunteerActivity } from "@/lib/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function ConfirmPage() {
  const { id } = useParams();
  const router = useRouter();
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const activities = useVolunteerStore((state) => state.activities);
  const [volunteerActivity, setVolunteerActivity] =
    useState<VolunteerActivity | null>(null);

  useEffect(() => {
    const activity = activities.find(
      (a) => a.id === Number.parseInt(id as string)
    );
    if (activity) {
      setVolunteerActivity(activity);
    }
  }, [activities, id]);

  if (!volunteerActivity) {
    return <div>データ読み込み中、または該当活動がありません</div>;
  }

  // 応募処理
  const handleApply = () => {
    // ここに応募処理を実装
    router.push(`/volunteer/${id}/complete`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href={`/volunteer/${id}`}
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">応募確認</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Activity Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                ボランティア情報
              </h2>
              <div className="bg-slate-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  {volunteerActivity.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <span className="font-medium">開催日:</span>
                      <span className="ml-2">{volunteerActivity.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <span className="font-medium">開始時間:</span>
                      <span className="ml-2">{volunteerActivity.time}〜</span>
                    </div>
                  </div>
                  <div className="flex items-center text-slate-600 col-span-2">
                    <MapPin className="h-5 w-5 mr-3 text-slate-400" />
                    <div>
                      <span className="font-medium">場所:</span>
                      <span className="ml-2">{volunteerActivity.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                参加規約
              </h2>
              <div className="bg-slate-50 p-6 rounded-xl mb-6 max-h-80 overflow-y-auto">
                <div className="text-slate-700 space-y-4">
                  <p>
                    1.
                    参加者は、活動日時・場所を確認し、時間厳守でご参加ください。
                  </p>
                  <p>
                    2.
                    活動中は主催者の指示に従い、安全に配慮して行動してください。
                  </p>
                  <p>
                    3.
                    体調不良や急な予定変更で参加できなくなった場合は、速やかに主催者へご連絡ください。
                  </p>
                  <p>
                    4.
                    活動中の事故やケガについては、原則として自己責任となります。
                  </p>
                  <p>
                    5.
                    活動中に撮影された写真等は、VOLUNetの広報活動で使用される場合があります。
                  </p>
                  <p>
                    6.
                    個人情報は活動に関する連絡以外の目的で使用されることはありません。
                  </p>
                  <p>
                    7.
                    参加者は互いに尊重し合い、ハラスメント行為は一切禁止します。
                  </p>
                  <p>
                    8.
                    主催者が不適切と判断した場合、参加をお断りすることがあります。
                  </p>
                  <p>
                    9.
                    活動内容や開催状況は、天候や諸事情により変更・中止となる場合があります。
                  </p>
                  <p>10. 本規約は予告なく変更される場合があります。</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mb-8">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked: boolean | undefined) =>
                    setAgreeToTerms(checked === true)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-slate-700 leading-relaxed cursor-pointer"
                >
                  上記の参加規約に同意します。また、主催者からの連絡を受け取ることに同意します。
                </label>
              </div>

              <div className="flex justify-center">
                <Button
                  className="bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 text-white rounded-xl px-12 py-4 text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  disabled={!agreeToTerms}
                  onClick={handleApply}
                >
                  応募する
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
