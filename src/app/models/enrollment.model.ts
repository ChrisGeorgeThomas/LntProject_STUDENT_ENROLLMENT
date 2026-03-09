export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  grade?: string;
  status: 'active' | 'completed' | 'dropped';
}

export class EnrollmentModel implements Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  grade?: string;
  status: 'active' | 'completed' | 'dropped';

  constructor(
    id: number,
    studentId: number,
    courseId: number,
    enrollmentDate: Date,
    status: 'active' | 'completed' | 'dropped' = 'active',
    grade?: string
  ) {
    this.id = id;
    this.studentId = studentId;
    this.courseId = courseId;
    this.enrollmentDate = enrollmentDate;
    this.grade = grade;
    this.status = status;
  }
}
