// 完了画面は表示のみで簡単
export default function CompletePage() {
  return (
    <main className="p-8 max-w-xl mx-auto text-center">
      {/* 完了メッセージ */}
      <h1 className="text-3xl font-bold mb-4">募集を開始しました！</h1>
      <p className="mb-8">
        ボランティア活動の募集が正常に開始されました。参加者からの応募をお待ちください。
      </p>

      {/* ホーム画面へ戻るリンク */}
      <a
        href="/"
        className="inline-block bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800"
      >
        ホームに戻る
      </a>
    </main>
  )
}