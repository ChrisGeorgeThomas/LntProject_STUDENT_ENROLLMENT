export interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  maxSeats: number;
  enrolledStudents: number;
  schedule: string;
  department: string;
  availableSeats?: number;
  isFullyEnrolled?: boolean;
  enrollmentPercentage?: number;
}

export class CourseModel implements Course {
  id: number;
  code: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  maxSeats: number;
  enrolledStudents: number;
  schedule: string;
  department: string;

  constructor(
    id: number,
    code: string,
    name: string,
    description: string,
    instructor: string,
    credits: number,
    maxSeats: number,
    enrolledStudents: number,
    schedule: string,
    department: string
  ) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.description = description;
    this.instructor = instructor;
    this.credits = credits;
    this.maxSeats = maxSeats;
    this.enrolledStudents = enrolledStudents;
    this.schedule = schedule;
    this.department = department;
  }

  get availableSeats(): number {
    return this.maxSeats - this.enrolledStudents;
  }

  get isFullyEnrolled(): boolean {
    return this.enrolledStudents >= this.maxSeats;
  }

  get enrollmentPercentage(): number {
    return (this.enrolledStudents / this.maxSeats) * 100;
  }
}

export class CourseHelper {
  static getAvailableSeats(course: Course): number {
    return course.maxSeats - course.enrolledStudents;
  }

  static isFullyEnrolled(course: Course): boolean {
    return course.enrolledStudents >= course.maxSeats;
  }

  static getEnrollmentPercentage(course: Course): number {
    return (course.enrolledStudents / course.maxSeats) * 100;
  }
}
