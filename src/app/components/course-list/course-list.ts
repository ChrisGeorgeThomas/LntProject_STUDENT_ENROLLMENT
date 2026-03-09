import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { CourseModel } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  courses: CourseModel[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  getEnrollmentStatus(course: CourseModel): string {
    return course.isFullyEnrolled ? 'Fully Enrolled' : 'Available';
  }

  getStatusClass(course: CourseModel): string {
    return course.isFullyEnrolled ? 'status-full' : 'status-available';
  }
}
