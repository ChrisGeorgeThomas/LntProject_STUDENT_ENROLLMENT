import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'enrollmentDate'];

  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  getStudentEnrollmentCount(studentId: number): number {
    let count = 0;
    this.enrollmentService.getEnrollmentsByStudent(studentId).subscribe((enrollments) => {
      count = enrollments.filter((e) => e.status === 'active').length;
    });
    return count;
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString();
  }
}
