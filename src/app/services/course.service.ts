import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, CourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = '/assets/data/courses.json';
  private coursesSubject = new BehaviorSubject<CourseModel[]>([]);
  public courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  loadCourses(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        const courses = data.map(
          (c) =>
            new CourseModel(
              c.id,
              c.code,
              c.name,
              c.description,
              c.instructor,
              c.credits,
              c.maxSeats,
              c.enrolledStudents,
              c.schedule,
              c.department
            )
        );
        this.coursesSubject.next(courses);
      },
      (error) => {
        console.error('Error loading courses:', error);
        // Fallback to mock data if file not found
        this.coursesSubject.next(this.getMockCourses());
      }
    );
  }

  getCourses(): Observable<CourseModel[]> {
    return this.courses$;
  }

  getCourseById(id: number): Observable<CourseModel | undefined> {
    return new Observable((observer) => {
      this.courses$.subscribe((courses) => {
        observer.next(courses.find((c) => c.id === id));
        observer.complete();
      });
    });
  }

  addCourse(course: CourseModel): void {
    const currentCourses = this.coursesSubject.value;
    const newCourse = new CourseModel(
      Math.max(...currentCourses.map((c) => c.id), 0) + 1,
      course.code,
      course.name,
      course.description,
      course.instructor,
      course.credits,
      course.maxSeats,
      course.enrolledStudents,
      course.schedule,
      course.department
    );
    this.coursesSubject.next([...currentCourses, newCourse]);
  }

  updateCourse(course: CourseModel): void {
    const currentCourses = this.coursesSubject.value;
    const index = currentCourses.findIndex((c) => c.id === course.id);
    if (index !== -1) {
      currentCourses[index] = course;
      this.coursesSubject.next([...currentCourses]);
    }
  }

  deleteCourse(id: number): void {
    const currentCourses = this.coursesSubject.value;
    this.coursesSubject.next(currentCourses.filter((c) => c.id !== id));
  }

  enrollStudent(courseId: number): void {
    const currentCourses = this.coursesSubject.value;
    const course = currentCourses.find((c) => c.id === courseId);
    if (course && !course.isFullyEnrolled) {
      course.enrolledStudents++;
      this.coursesSubject.next([...currentCourses]);
    }
  }

  private getMockCourses(): CourseModel[] {
    return [
      new CourseModel(
        1,
        'CS101',
        'Introduction to Computer Science',
        'Learn the fundamentals of computer science',
        'Dr. Sarah Miller',
        3,
        30,
        28,
        'MWF 10:00-11:00 AM',
        'Computer Science'
      ),
      new CourseModel(
        2,
        'CS202',
        'Data Structures',
        'Explore fundamental data structures and algorithms',
        'Dr. James Wilson',
        4,
        25,
        20,
        'TuTh 2:00-3:30 PM',
        'Computer Science'
      ),
      new CourseModel(
        3,
        'MATH101',
        'Calculus I',
        'Introduction to differential calculus',
        'Dr. Robert Chen',
        4,
        35,
        32,
        'MWF 11:00 AM-12:00 PM',
        'Mathematics'
      ),
      new CourseModel(
        4,
        'ENG101',
        'English Composition',
        'Develop writing and communication skills',
        'Prof. Emma Davis',
        3,
        20,
        18,
        'TuTh 10:00-11:30 AM',
        'English'
      ),
      new CourseModel(
        5,
        'PHY201',
        'Physics II',
        'Electricity, magnetism, and optics',
        'Dr. Michael Anderson',
        4,
        28,
        25,
        'MWF 1:00-2:00 PM',
        'Physics'
      ),
      new CourseModel(
        6,
        'BUS101',
        'Business Fundamentals',
        'Introduction to business management',
        'Prof. Linda Thompson',
        3,
        40,
        35,
        'TuTh 1:00-2:30 PM',
        'Business'
      )
    ];
  }
}
