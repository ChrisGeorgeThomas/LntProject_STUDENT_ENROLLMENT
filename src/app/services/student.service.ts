import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = '/assets/data/students.json';
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public students$ = this.studentsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.http.get<Student[]>(this.apiUrl).subscribe(
      (data) => {
        this.studentsSubject.next(data);
      },
      (error) => {
        console.error('Error loading students:', error);
        // Fallback to mock data if file not found
        this.studentsSubject.next(this.getMockStudents());
      }
    );
  }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return new Observable((observer) => {
      this.students$.subscribe((students) => {
        observer.next(students.find((s) => s.id === id));
        observer.complete();
      });
    });
  }

  addStudent(student: Student): void {
    const currentStudents = this.studentsSubject.value;
    const newStudent: Student = {
      ...student,
      id: Math.max(...currentStudents.map((s) => s.id), 0) + 1
    };
    this.studentsSubject.next([...currentStudents, newStudent]);
  }

  updateStudent(student: Student): void {
    const currentStudents = this.studentsSubject.value;
    const index = currentStudents.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      currentStudents[index] = student;
      this.studentsSubject.next([...currentStudents]);
    }
  }

  deleteStudent(id: number): void {
    const currentStudents = this.studentsSubject.value;
    this.studentsSubject.next(currentStudents.filter((s) => s.id !== id));
  }

  private getMockStudents(): Student[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@university.edu',
        department: 'Computer Science',
        enrollmentDate: new Date('2023-09-01'),
        phone: '555-0101'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        department: 'Engineering',
        enrollmentDate: new Date('2023-09-01'),
        phone: '555-0102'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@university.edu',
        department: 'Business',
        enrollmentDate: new Date('2023-09-15'),
        phone: '555-0103'
      },
      {
        id: 4,
        name: 'Sarah Williams',
        email: 'sarah.williams@university.edu',
        department: 'Computer Science',
        enrollmentDate: new Date('2023-09-20'),
        phone: '555-0104'
      },
      {
        id: 5,
        name: 'David Brown',
        email: 'david.brown@university.edu',
        department: 'Mathematics',
        enrollmentDate: new Date('2023-10-01'),
        phone: '555-0105'
      }
    ];
  }
}
