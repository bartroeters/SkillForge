export default interface Lesson {
  id: number;
  tutorId: number;
  title: string;
  description: string;
  videoContent: string;
  textContent: string;
  courseIds: number[];
  createdAt: string;
}
