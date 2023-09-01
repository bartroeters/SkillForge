export default interface Course {
  id: number;
  title: string;
  description: string;
  programme: string;
  prospects: string;
  research: string;
  thumbnail: string;
  price: number;
  createdAt: string;
  categoryIds: number[];
  studentIds: number[];
  lessonIds: number[];
}