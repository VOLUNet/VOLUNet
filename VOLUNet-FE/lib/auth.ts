// 認証関連のユーティリティ関数

/**
 * ランダムなトークンを生成する
 * @returns ランダムに生成されたトークン文字列
 */
export function generateToken(): string {
  // 現在時刻とランダム値を組み合わせてトークンを生成
  return `${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`
}

/**
 * ユーザー情報の型定義
 */
export interface User {
  id: string
  name: string
  email: string
  password: string // 実際のアプリではハッシュ化が必要
  createdAt: string
  token?: string // 認証トークン
}

/**
 * ユーザーを登録する
 * @param name ユーザー名
 * @param email メールアドレス
 * @param password パスワード
 * @returns 登録したユーザー情報（パスワードを除く）
 */
export function registerUser(
  name: string,
  email: string,
  password: string
): Omit<User, "password"> {
  // 既存のユーザーリストを取得
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[]

  // 既存ユーザーチェック
  const existingUser = users.find((user) => user.email === email)
  if (existingUser) {
    throw new Error("このメールアドレスは既に登録されています")
  }

  // 新しいトークンを生成
  const token = generateToken()

  // 新しいユーザーを作成
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password, // 実際のアプリではハッシュ化が必要
    createdAt: new Date().toISOString(),
    token,
  }

  // ユーザーリストに追加して保存
  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  // ログイン状態を保存
  localStorage.setItem("authToken", token)
  localStorage.setItem("userEmail", email)
  localStorage.setItem("userName", name)

  // パスワードを除いたユーザー情報を返す// パスワードを除外
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = newUser
  return userWithoutPassword
}

/**
 * ユーザーをログインさせる
 * @param email メールアドレス
 * @param password パスワード
 * @returns ログインしたユーザー情報（パスワードを除く）
 */
export function loginUser(
  email: string,
  password: string
): Omit<User, "password"> {
  // ユーザーリストを取得
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[]

  // メールアドレスとパスワードが一致するユーザーを検索
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    throw new Error("メールアドレスまたはパスワードが正しくありません")
  }

  // 新しいトークンを生成
  const token = generateToken()
  user.token = token

  // ユーザー情報を更新
  localStorage.setItem("users", JSON.stringify(users))

  // ログイン状態を保存
  localStorage.setItem("authToken", token)
  localStorage.setItem("userEmail", user.email)
  localStorage.setItem("userName", user.name)

  // パスワードを除いたユーザー情報を返す
  // パスワードを除外
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * 現在ログイン中のユーザー情報を取得する
 * @returns ログイン中のユーザー情報（パスワードを除く）またはnull
 */
export function getCurrentUser(): Omit<User, "password"> | null {
  const token = localStorage.getItem("authToken")
  const email = localStorage.getItem("userEmail")

  if (!token || !email) {
    return null
  }

  // ユーザーリストを取得
  const users = JSON.parse(localStorage.getItem("users") || "[]") as User[]

  // トークンとメールアドレスが一致するユーザーを検索
  const user = users.find((u) => u.email === email && u.token === token)

  if (!user) {
    // トークンが無効な場合はログアウト状態にする
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    return null
  }

  // パスワードを除いたユーザー情報を返す
  // パスワードを除外
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * ユーザーをログアウトさせる
 */
export function logoutUser(): void {
  const email = localStorage.getItem("userEmail")

  if (email) {
    // ユーザーリストを取得
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[]

    // ユーザーのトークンをクリア
    const userIndex = users.findIndex((u) => u.email === email)
    if (userIndex !== -1) {
      users[userIndex].token = undefined
      localStorage.setItem("users", JSON.stringify(users))
    }
  }

  // ログイン状態をクリア
  localStorage.removeItem("authToken")
  localStorage.removeItem("userEmail")
  localStorage.removeItem("userName")
}
