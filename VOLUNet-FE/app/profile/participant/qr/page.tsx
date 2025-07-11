import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QrCodePage() {
  // サンプルデータ
  const user = {
    name: "杉村　志弥",
    avatar: "/ruru.jpg?height=120&width=120",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <main className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/profile/participant"
              className="flex items-center text-slate-600 hover:text-slate-900 transition-colors group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">戻る</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">プロフィールQRコード</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>

          {/* QR Code Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">QRコード</h2>
              <p className="text-slate-600 text-sm">このQRコードを読み取ると、あなたのプロフィールが表示されます</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-inner mx-auto w-64 h-64 flex items-center justify-center mb-6">
              <div className="relative w-56 h-56">
                <Image
                  src="/qrcode.png?height=224&width=224&text=QR+Code"
                  alt="QR Code"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-white shadow-sm">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <p className="text-slate-700 font-medium">{user.name}</p>
              </div>

              <div className="bg-blue-50/60 backdrop-blur-sm rounded-2xl p-4 border border-blue-100 shadow-sm mb-6">
                <p className="text-blue-700 text-sm">
                  このQRコードは、ボランティア活動の参加時に主催者に提示してください。
                </p>
              </div>

              <Link href="/profile/participant">
                <Button
                  variant="outline"
                  className="border border-slate-200 hover:border-slate-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all rounded-xl px-6 py-2 text-sm font-medium shadow-sm"
                >
                  プロフィールに戻る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
