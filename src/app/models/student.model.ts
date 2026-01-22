export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  availableSeats: number;
}