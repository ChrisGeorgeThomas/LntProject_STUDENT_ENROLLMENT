import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { student } from '../../app/services/student';
import { Student } from '../../app/models/types';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList implements OnInit {
  students: Student[] = [];
  showForm = false;
  newStudent: Partial<Student> = {};
  editingId: number | null = null;

  constructor(private studentService: student) {}

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  openForm() {
    this.showForm = true;
    this.editingId = null;
    this.newStudent = {};
  }

  closeForm() {
    this.showForm = false;
    this.newStudent = {};
    this.editingId = null;
  }

  addStudent() {
    if (this.newStudent.name && this.newStudent.email && this.newStudent.department) {
      this.studentService.addStudent({
        name: this.newStudent.name,
        email: this.newStudent.email,
        department: this.newStudent.department,
        phone: this.newStudent.phone
      } as Omit<Student, 'id'>);
      this.closeForm();
    }
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }

  editStudent(student: Student) {
    this.newStudent = { ...student };
    this.editingId = student.id;
    this.showForm = true;
  }

  updateStudent() {
    if (this.editingId) {
      this.studentService.updateStudent(this.editingId, this.newStudent as Partial<Student>);
      this.closeForm();
    }
  }

  saveStudent() {
    if (this.editingId) {
      this.updateStudent();
    } else {
      this.addStudent();
    }
  }
}

