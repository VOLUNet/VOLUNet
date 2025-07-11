export const volunteerSeed = [
  // これから実施されるボランティア（未来2件）
  {
    organizerName: "梅田環境美化推進会",
    category: "EnvironmentProtection",
    volunteerName: "茶屋町周辺のごみ拾い活動",
    location: "大阪府大阪市北区茶屋町",
    locationImageUrl:
      "https://drive.google.com/file/d/1RDZtRHEMaGprgT9gj4ugYgUzxi_okvZO/view?usp=sharing",
    eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    currentPeople: 8,
    maxPeople: 20,
    description: "通勤・通学路にもなる茶屋町エリアでごみ拾いを行う活動です。",
    isSharedToStudents: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    organizerName: "中津福祉サポートセンター",
    category: "Welfare",
    volunteerName: "中津町の高齢者見守り訪問",
    location: "大阪府大阪市北区中津",
    locationImageUrl:
      "https://drive.google.com/file/d/1_bX2KIW46s8ub4Mu6FLVKlRpuWAfFhkn/view?usp=sharing",
    eventDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    currentPeople: 5,
    maxPeople: 10,
    description: "高齢者世帯への簡単な声かけや安否確認を行う活動です。",
    isSharedToStudents: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // すでに終了したボランティア（過去2件）
  {
    organizerName: "大阪駅前第3ビル自治会",
    category: "CommunityActivity",
    volunteerName: "地域夏祭りの設営・案内ボランティア",
    location: "大阪府大阪市北区梅田",
    locationImageUrl:
      "https://drive.google.com/file/d/14olC8Wx3Jatg9O4mvg-vWt3UPRr904Ob/view?usp=sharing",
    eventDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    currentPeople: 18,
    maxPeople: 25,
    description: "ステージ設営、案内、清掃などを行う地域夏祭りの支援活動です。",
    isSharedToStudents: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    organizerName: "扇町公園緑化委員会",
    category: "EnvironmentProtection",
    volunteerName: "扇町公園の落ち葉掃除と花壇整備",
    location: "大阪府大阪市北区扇町",
    locationImageUrl:
      "https://drive.google.com/file/d/1X6B8qqeF8LjrMYmFeP3PBOgNpMtQckfg/view?usp=sharing",
    eventDate: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
    currentPeople: 12,
    maxPeople: 15,
    description: "扇町公園で落ち葉清掃と花壇整備を行う緑化活動です。",
    isSharedToStudents: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
