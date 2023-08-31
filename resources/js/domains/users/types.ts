export interface User {
  id: number
  firstName: string
  lastName: string
  profilePicture: string;
  email: string
  isAdmin: boolean
  createdAt: string
  courseIds: number[]
};

export interface UserToRegister extends User {
  password: string
  repeatedPassword: string
};