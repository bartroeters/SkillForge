export default interface Review {
  id: number;
  userId: number;
  courseId: number;
  rating: string;
  comment: string;
}