import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private enrollmentsSubject = new BehaviorSubject<Enrollment[]>([]);
  public enrollments$ = this.enrollmentsSubject.asObservable();

  constructor() {
    this.initializeEnrollments();
  }

  private initializeEnrollments(): void {
    this.enrollmentsSubject.next(this.getMockEnrollments());
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.enrollments$;
  }

  getEnrollmentsByStudent(studentId: number): Observable<Enrollment[]> {
    return new Observable((observer) => {
      this.enrollments$.subscribe((enrollments) => {
        observer.next(enrollments.filter((e) => e.studentId === studentId));
        observer.complete();
      });
    });
  }

  getEnrollmentsByCourse(courseId: number): Observable<Enrollment[]> {
    return new Observable((observer) => {
      this.enrollments$.subscribe((enrollments) => {
        observer.next(enrollments.filter((e) => e.courseId === courseId));
        observer.complete();
      });
    });
  }

  enrollStudentInCourse(studentId: number, courseId: number): void {
    const currentEnrollments = this.enrollmentsSubject.value;
    const exists = currentEnrollments.some(
      (e) => e.studentId === studentId && e.courseId === courseId
    );

    if (!exists) {
      const newEnrollment: Enrollment = {
        id: Math.max(...currentEnrollments.map((e) => e.id), 0) + 1,
        studentId,
        courseId,
        enrollmentDate: new Date(),
        status: 'active'
      };
      this.enrollmentsSubject.next([...currentEnrollments, newEnrollment]);
    }
  }

  dropCourse(enrollmentId: number): void {
    const currentEnrollments = this.enrollmentsSubject.value;
    const enrollment = currentEnrollments.find((e) => e.id === enrollmentId);
    if (enrollment) {
      enrollment.status = 'dropped';
      this.enrollmentsSubject.next([...currentEnrollments]);
    }
  }

  private getMockEnrollments(): Enrollment[] {
    return [
      {
        id: 1,
        studentId: 1,
        courseId: 1,
        enrollmentDate: new Date('2023-09-05'),
        status: 'active'
      },
      {
        id: 2,
        studentId: 1,
        courseId: 2,
        enrollmentDate: new Date('2023-09-05'),
        status: 'active'
      },
      {
        id: 3,
        studentId: 2,
        courseId: 1,
        enrollmentDate: new Date('2023-09-06'),
        status: 'active'
      },
      {
        id: 4,
        studentId: 2,
        courseId: 3,
        enrollmentDate: new Date('2023-09-06'),
        status: 'active'
      },
      {
        id: 5,
        studentId: 3,
        courseId: 4,
        enrollmentDate: new Date('2023-09-10'),
        status: 'active'
      }
    ];
  }
}
