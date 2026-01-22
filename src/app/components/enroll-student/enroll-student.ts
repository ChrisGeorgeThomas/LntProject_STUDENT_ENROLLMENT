import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { student } from '../../services/student';
import { Student, Course, Enrollment } from '../../models/types';

@Component({
  selector: 'app-enroll-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enroll-student.html',
  styleUrl: './enroll-student.css'
})
export class EnrollStudent implements OnInit {
  students: Student[] = [];
  courses: Course[] = [];
  enrollments: Enrollment[] = [];
  selectedStudentId: number | null = null;
  selectedCourseId: number | null = null;
  enrollmentMessage = '';
  enrollmentStatus: 'success' | 'error' | 'idle' = 'idle';

  constructor(private studentService: student) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });

    this.studentService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.studentService.getEnrollments().subscribe(enrollments => {
      this.enrollments = enrollments;
    });
  }

  enrollStudent() {
    if (!this.selectedStudentId || !this.selectedCourseId) {
      this.enrollmentMessage = 'Please select both a student and a course';
      this.enrollmentStatus = 'error';
      return;
    }

    const success = this.studentService.enrollStudent(this.selectedStudentId, this.selectedCourseId);
    
    if (success) {
      const student = this.students.find(s => s.id === this.selectedStudentId);
      const course = this.courses.find(c => c.id === this.selectedCourseId);
      this.enrollmentMessage = `✅ Successfully enrolled ${student?.name} in ${course?.title}!`;
      this.enrollmentStatus = 'success';
      this.selectedStudentId = null;
      this.selectedCourseId = null;
    } else {
      this.enrollmentMessage = '❌ Unable to enroll. Student may already be enrolled or no seats available.';
      this.enrollmentStatus = 'error';
    }
  }

  unenrollStudent(enrollmentId: number) {
    if (confirm('Are you sure you want to unenroll from this course?')) {
      this.studentService.unenrollStudent(enrollmentId);
      this.enrollmentMessage = '✅ Successfully unenrolled from course!';
      this.enrollmentStatus = 'success';
    }
  }

  getStudentName(studentId: number): string {
    return this.students.find(s => s.id === studentId)?.name || 'Unknown';
  }

  getCourseName(courseId: number): string {
    return this.courses.find(c => c.id === courseId)?.title || 'Unknown';
  }

  getStudentEnrollments(studentId: number): Enrollment[] {
    return this.enrollments.filter(e => e.studentId === studentId);
  }
}
