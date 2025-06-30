import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface VolunteerActivity {
  id: number
  title: string
  organizer: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  category: string
  description: string
  image: string
  status: "募集中" | "終了"
  sharedByTeacher: boolean // 先生によって共有されたかどうか
}

interface VolunteerStore {
  activities: VolunteerActivity[]
  addActivity: (activity: Omit<VolunteerActivity, "id" | "participants" | "status" | "sharedByTeacher">) => void
  shareActivity: (id: number) => void // 先生が共有する機能
  getNextId: () => number
}

// サンプルデータ
const initialActivities: VolunteerActivity[] = [
  {
    id: 1,
    title: "地域清掃ボランティア",
    organizer: "大阪環境サークル",
    date: "2024年2月15日",
    time: "09:00",
    location: "大阪城公園",
    participants: 8,
    maxParticipants: 15,
    category: "環境保護",
    description: "大阪城公園周辺の清掃活動を行います。軍手とゴミ袋は主催者が用意いたします。",
    image: "/placeholder.svg?height=120&width=120",
    status: "募集中",
    sharedByTeacher: false,
  },
  {
    id: 2,
    title: "高齢者支援活動",
    organizer: "シニアサポート大阪",
    date: "2024年2月18日",
    time: "14:00",
    location: "住吉区コミュニティセンター",
    participants: 5,
    maxParticipants: 10,
    category: "福祉",
    description: "高齢者の方々との交流や簡単なお手伝いをしていただきます。",
    image: "/placeholder.svg?height=120&width=120",
    status: "募集中",
    sharedByTeacher: true, // サンプルとして1つは共有済み
  },
  {
    id: 3,
    title: "子ども食堂お手伝い",
    organizer: "みんなの食堂",
    date: "2024年2月20日",
    time: "16:00",
    location: "天王寺区民センター",
    participants: 12,
    maxParticipants: 20,
    category: "子育て支援",
    description: "子ども食堂での調理補助や配膳のお手伝いをお願いします。",
    image: "/placeholder.svg?height=120&width=120",
    status: "募集中",
    sharedByTeacher: false,
  },
  {
    id: 4,
    title: "図書館整理ボランティア",
    organizer: "大阪市立図書館",
    date: "2024年2月22日",
    time: "10:00",
    location: "中央図書館",
    participants: 3,
    maxParticipants: 8,
    category: "教育",
    description: "図書の整理や修繕作業をお手伝いいただきます。",
    image: "/placeholder.svg?height=120&width=120",
    status: "募集中",
    sharedByTeacher: true, // サンプルとして1つは共有済み
  },
  {
    id: 5,
    title: "動物愛護センター支援",
    organizer: "アニマルケア大阪",
    date: "2024年2月25日",
    time: "13:00",
    location: "大阪市動物愛護センター",
    participants: 6,
    maxParticipants: 12,
    category: "動物愛護",
    description: "動物のお世話や施設の清掃をお手伝いいただきます。",
    image: "/placeholder.svg?height=120&width=120",
    status: "募集中",
    sharedByTeacher: false,
  },
  {
    id: 6,
    title: "災害復興支援活動",
    organizer: "関西災害支援ネットワーク",
    date: "2024年2月28日",
    time: "08:00",
    location: "被災地域（詳細は後日連絡）",
    participants: 15,
    maxParticipants: 30,
    category: "災害支援",
    description: "災害復興のための清掃作業や物資配布のお手伝いをお願いします。",
    image: "/placeholder.svg?height=120&width=120",
    status: "募集中",
    sharedByTeacher: false,
  },
]

export const useVolunteerStore = create<VolunteerStore>()(
  persist(
    (set, get) => ({
      activities: initialActivities,
      addActivity: (activity) => {
        const newActivity: VolunteerActivity = {
          ...activity,
          id: get().getNextId(),
          participants: 0,
          status: "募集中",
          sharedByTeacher: false,
        }
        set((state) => ({
          activities: [...state.activities, newActivity],
        }))
      },
      shareActivity: (id) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, sharedByTeacher: true } : activity,
          ),
        }))
      },
      getNextId: () => {
        const activities = get().activities
        return activities.length > 0 ? Math.max(...activities.map((a) => a.id)) + 1 : 1
      },
    }),
    {
      name: "volunteer-storage",
    },
  ),
)
