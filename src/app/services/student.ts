import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student, Course, Enrollment } from '../models/types'; 

@Injectable({
  providedIn: 'root'
})
export class student {
  private studentsSubject = new BehaviorSubject<Student[]>([
    { id: 1, name: 'Alice Smith', email: 'alice@univ.edu', department: 'Computer Science', phone: '555-0101', enrolledAt: new Date('2024-01-15') },
    { id: 2, name: 'Bob Johnson', email: 'bob@univ.edu', department: 'Mechanical Engineering', phone: '555-0102', enrolledAt: new Date('2024-02-10') },
    { id: 3, name: 'Carol Davis', email: 'carol@univ.edu', department: 'Mathematics', phone: '555-0103', enrolledAt: new Date('2024-03-05') }
  ]);

  private coursesSubject = new BehaviorSubject<Course[]>([
    { id: 101, title: 'Angular Fundamentals', code: 'CS301', instructor: 'Dr. NG', availableSeats: 15, totalSeats: 30, schedule: 'Mon/Wed 10:00 AM', description: 'Learn Angular framework basics' },
    { id: 102, title: 'Advanced TypeScript', code: 'CS302', instructor: 'Prof. Script', availableSeats: 10, totalSeats: 25, schedule: 'Tue/Thu 2:00 PM', description: 'Master TypeScript advanced features' },
    { id: 103, title: 'Web Design Essentials', code: 'CS201', instructor: 'Mrs. Web', availableSeats: 20, totalSeats: 35, schedule: 'Mon/Wed/Fri 9:00 AM', description: 'Modern web design principles' }
  ]);

  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([
    { id: 1001, studentId: 1, courseId: 101, enrollmentDate: new Date('2024-01-20'), status: 'active' },
    { id: 1002, studentId: 1, courseId: 102, enrollmentDate: new Date('2024-02-15'), status: 'active' },
    { id: 1003, studentId: 2, courseId: 101, enrollmentDate: new Date('2024-02-20'), status: 'active' },
    { id: 1004, studentId: 3, courseId: 103, enrollmentDate: new Date('2024-03-10'), status: 'active' }
  ]);

  students$ = this.studentsSubject.asObservable();
  courses$ = this.coursesSubject.asObservable();
  enrollments$ = this.enrollmentsSubject.asObservable();

  // Student methods
  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  getStudentById(id: number): Student | undefined {
    return this.studentsSubject.value.find(s => s.id === id);
  }

  addStudent(newStudent: Omit<Student, 'id'>): void {
    const students = this.studentsSubject.value;
    const maxId = Math.max(...students.map(s => s.id), 0);
    const student: Student = {
      ...newStudent,
      id: maxId + 1,
      enrolledAt: newStudent.enrolledAt || new Date()
    };
    this.studentsSubject.next([...students, student]);
  }

  updateStudent(id: number, updates: Partial<Student>): void {
    const students = this.studentsSubject.value.map(s =>
      s.id === id ? { ...s, ...updates } : s
    );
    this.studentsSubject.next(students);
  }

  deleteStudent(id: number): void {
    const students = this.studentsSubject.value.filter(s => s.id !== id);
    this.studentsSubject.next(students);
    // Also remove their enrollments
    const enrollments = this.enrollmentsSubject.value.filter(e => e.studentId !== id);
    this.enrollmentsSubject.next(enrollments);
  }

  // Course methods
  getCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: number): Course | undefined {
    return this.coursesSubject.value.find(c => c.id === id);
  }

  addCourse(newCourse: Omit<Course, 'id'>): void {
    const courses = this.coursesSubject.value;
    const maxId = Math.max(...courses.map(c => c.id), 100);
    const course: Course = {
      ...newCourse,
      id: maxId + 1
    };
    this.coursesSubject.next([...courses, course]);
  }

  updateCourse(id: number, updates: Partial<Course>): void {
    const courses = this.coursesSubject.value.map(c =>
      c.id === id ? { ...c, ...updates } : c
    );
    this.coursesSubject.next(courses);
  }

  deleteCourse(id: number): void {
    const courses = this.coursesSubject.value.filter(c => c.id !== id);
    this.coursesSubject.next(courses);
    // Also remove enrollments for this course
    const enrollments = this.enrollmentsSubject.value.filter(e => e.courseId !== id);
    this.enrollmentsSubject.next(enrollments);
  }

  // Enrollment methods
  getEnrollments(): Observable<Enrollment[]> {
    return this.enrollments$;
  }

  enrollStudent(studentId: number, courseId: number): boolean {
    const enrollment = this.enrollmentsSubject.value.find(
      e => e.studentId === studentId && e.courseId === courseId
    );

    if (enrollment) {
      return false; // Already enrolled
    }

    const course = this.getCourseById(courseId);
    if (!course || course.availableSeats <= 0) {
      return false; // No seats available
    }

    const enrollments = this.enrollmentsSubject.value;
    const maxId = Math.max(...enrollments.map(e => e.id), 1000);

    const newEnrollment: Enrollment = {
      id: maxId + 1,
      studentId,
      courseId,
      enrollmentDate: new Date(),
      status: 'active'
    };

    this.enrollmentsSubject.next([...enrollments, newEnrollment]);
    
    // Decrease available seats
    this.updateCourse(courseId, { availableSeats: course.availableSeats - 1 });

    return true;
  }

  unenrollStudent(enrollmentId: number): void {
    const enrollment = this.enrollmentsSubject.value.find(e => e.id === enrollmentId);
    
    if (enrollment) {
      const course = this.getCourseById(enrollment.courseId);
      if (course) {
        this.updateCourse(enrollment.courseId, { 
          availableSeats: course.availableSeats + 1 
        });
      }
    }

    const enrollments = this.enrollmentsSubject.value.filter(e => e.id !== enrollmentId);
    this.enrollmentsSubject.next(enrollments);
  }

  getStudentEnrollments(studentId: number): Enrollment[] {
    return this.enrollmentsSubject.value.filter(e => e.studentId === studentId);
  }

  getCourseEnrollments(courseId: number): Enrollment[] {
    return this.enrollmentsSubject.value.filter(e => e.courseId === courseId);
  }
}