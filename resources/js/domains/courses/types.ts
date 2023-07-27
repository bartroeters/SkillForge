export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  createdAt: string;
  categoryIds: number[];
  studentIds: number[];
  lessonIds: number[];
}