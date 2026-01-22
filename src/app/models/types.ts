export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  phone?: string;
  enrolledAt?: Date;
}

export interface Course {
  id: number;
  title: string;
  code: string;
  instructor: string;
  availableSeats: number;
  totalSeats: number;
  schedule: string;
  description: string;
}

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  status: 'active' | 'completed' | 'dropped';
  grade?: string;
}