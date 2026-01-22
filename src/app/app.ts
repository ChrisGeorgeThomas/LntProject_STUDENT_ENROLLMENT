import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the building blocks
import { Navbar } from './components/navbar/navbar';
import { StudentList } from './components/student-list/student-list';
import { CourseList } from './components/course-list/course-list';
import { EnrollStudent } from './components/enroll-student/enroll-student';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    StudentList,
    CourseList,
    EnrollStudent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Student Management Dashboard';
}
