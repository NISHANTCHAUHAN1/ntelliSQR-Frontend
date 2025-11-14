export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Todo {
  _id: string;
  user: string;
  title: string;
  description?: string | null;
  completed: boolean;
  dueDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
