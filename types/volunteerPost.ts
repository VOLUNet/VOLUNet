// types/volunteerPost.ts
export type VolunteerPost = {
  userId: number;
  organizationName: string;
  volunteerName: string;
  category: "EnvironmentProtection" | "Welfare" | "CommunityActivity";
  location: string;
  locationImageUrl: string;
  eventDate: number;
  maxPeople: number;
  description: string;
};
