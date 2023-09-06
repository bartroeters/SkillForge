export interface Review {
  id: number;
  userId: number;
  courseId: number;
  rating: number;
  comment: string;
  createdAt: string;
}