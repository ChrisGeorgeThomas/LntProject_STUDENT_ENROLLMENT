import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list';
import { CourseListComponent } from './components/course-list/course-list';
import { EnrollStudentComponent } from './components/enroll-student/enroll-student';

export const routes: Routes = [
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'enroll',
    component: EnrollStudentComponent
  },
  {
    path: '',
    redirectTo: '/students',
    pathMatch: 'full'
  }
];
