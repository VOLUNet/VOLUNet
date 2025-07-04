import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface VolunteerActivity {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
  category: string;
  description: string;
  locationImageUrl: string;        // ★ 画像はここに集約
  status: "募集中" | "終了";
  sharedByTeacher: boolean;        // 先生が共有したかどうか
}

interface VolunteerStore {
  activities: VolunteerActivity[];
  addActivity: (
    activity: Omit<
      VolunteerActivity,
      "id" | "participants" | "status" | "sharedByTeacher"
    >
  ) => void;
  shareActivity: (id: number) => void; // 先生が共有する
  getNextId: () => number;
}

export const useVolunteerStore = create<VolunteerStore>()(
  persist(
    (set, get) => ({
      // 初期状態は空配列（サンプルデータなし）
      activities: [],

      addActivity: (activity) => {
        const newActivity: VolunteerActivity = {
          ...activity,
          id: get().getNextId(),
          participants: 0,
          status: "募集中",
          sharedByTeacher: false,
        };
        set((state) => ({
          activities: [...state.activities, newActivity],
        }));
      },

      shareActivity: (id) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id
              ? { ...activity, sharedByTeacher: true }
              : activity
          ),
        }));
      },

      getNextId: () => {
        const { activities } = get();
        return activities.length > 0
          ? Math.max(...activities.map((a) => a.id)) + 1
          : 1;
      },
    }),
    { name: "volunteer-storage" }
  )
);
