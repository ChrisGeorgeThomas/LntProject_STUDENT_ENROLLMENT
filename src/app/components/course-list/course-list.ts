import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { student } from '../../services/student';
import { Course } from '../../models/types';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses: Course[] = [];
  showForm = false;
  newCourse: Partial<Course> = {};
  editingId: number | null = null;

  constructor(private studentService: student) {}

  ngOnInit() {
    this.studentService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  openForm() {
    this.showForm = true;
    this.editingId = null;
    this.newCourse = {};
  }

  closeForm() {
    this.showForm = false;
    this.newCourse = {};
    this.editingId = null;
  }

  addCourse() {
    if (this.newCourse.title && this.newCourse.code && this.newCourse.instructor) {
      this.studentService.addCourse({
        title: this.newCourse.title || '',
        code: this.newCourse.code || '',
        instructor: this.newCourse.instructor || '',
        availableSeats: this.newCourse.availableSeats || 30,
        totalSeats: this.newCourse.totalSeats || 30,
        schedule: this.newCourse.schedule || '',
        description: this.newCourse.description || ''
      } as Omit<Course, 'id'>);
      this.closeForm();
    }
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.studentService.deleteCourse(id);
    }
  }

  editCourse(course: Course) {
    this.newCourse = { ...course };
    this.editingId = course.id;
    this.showForm = true;
  }

  updateCourse() {
    if (this.editingId) {
      this.studentService.updateCourse(this.editingId, this.newCourse as Partial<Course>);
      this.closeForm();
    }
  }

  saveCourse() {
    if (this.editingId) {
      this.updateCourse();
    } else {
      this.addCourse();
    }
  }
}

