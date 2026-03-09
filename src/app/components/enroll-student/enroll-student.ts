import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Student } from '../../models/student.model';
import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'app-enroll-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './enroll-student.html',
  styleUrl: './enroll-student.css'
})
export class EnrollStudentComponent implements OnInit {
  students: Student[] = [];
  courses: CourseModel[] = [];
  enrollmentForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  selectedStudentId: number | null = null;
  selectedCourseId: number | null = null;

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private formBuilder: FormBuilder
  ) {
    this.enrollmentForm = this.formBuilder.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });

    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  submitEnrollment(): void {
    if (this.enrollmentForm.valid) {
      const studentId = parseInt(this.enrollmentForm.get('studentId')?.value, 10);
      const courseId = parseInt(this.enrollmentForm.get('courseId')?.value, 10);

      const selectedCourse = this.courses.find((c) => c.id === courseId);

      if (selectedCourse && selectedCourse.isFullyEnrolled) {
        this.errorMessage = 'This course is fully enrolled. Please select another course.';
        this.successMessage = '';
        return;
      }

      this.enrollmentService.enrollStudentInCourse(studentId, courseId);
      this.courseService.enrollStudent(courseId);

      const student = this.students.find((s) => s.id === studentId);
      const course = this.courses.find((c) => c.id === courseId);

      if (student && course) {
        this.successMessage = `✓ ${student.name} successfully enrolled in ${course.name}!`;
      } else {
        this.successMessage = '✓ Student enrolled successfully!';
      }
      this.errorMessage = '';

      this.enrollmentForm.reset();

      setTimeout(() => {
        this.successMessage = '';
      }, 5000);
    } else {
      this.errorMessage = 'Please select both a student and a course.';
      this.successMessage = '';
    }
  }

  getAvailableSeats(courseId: number): number {
    const course = this.courses.find((c) => c.id === courseId);
    return course ? course.availableSeats : 0;
  }
}
