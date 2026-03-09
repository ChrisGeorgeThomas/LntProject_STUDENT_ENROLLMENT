# Student Course Enrollment and Management System

A comprehensive Angular-based web application for managing student enrollments in courses. The system provides features for viewing students, browsing available courses, and managing course enrollments with a professional user interface.

## Project Overview

This application demonstrates modern Angular development practices including:
- Angular v21 with standalone components
- TypeScript with interfaces and classes for type safety
- Reactive programming with RxJS Observables
- Component-based architecture
- Routing and navigation
- Form handling with validation
- Custom pipes and directives
- Material Design principles
- Responsive UI

## Technology Stack

- **Framework**: Angular v21+
- **Language**: TypeScript v5.9+
- **Styling**: CSS3
- **HTTP Client**: Angular HttpClient for API calls
- **State Management**: RxJS BehaviorSubjects
- **Forms**: Reactive Forms & Template-driven Forms
- **Development Server**: Angular CLI

## Features

### Core Features
1. **Student Management**
   - View all registered students
   - Display student details (name, email, department, enrollment date)
   - Contact information display

2. **Course Management**
   - Browse available courses
   - View course details (instructor, department, credits, schedule)
   - Visual enrollment capacity indicators
   - Color-coded enrollment status

3. **Student Enrollment**
   - Enroll students in available courses
   - Prevent enrollment in fully booked courses
   - Form validation for enrollment
   - Success/error notifications
   - Real-time enrollment updates

4. **Navigation**
   - Intuitive navigation bar
   - Quick access to main sections
   - Router-based page transitions

### Custom Features
- **Custom Pipes**: FilterByName, FilterByDepartment
- **Custom Directives**: LimitedSeatsHighlight, ActiveEnrollment
- **Data Visualization**: Enrollment progress bars
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/              # Navigation component
│   │   ├── student-list/        # Student listing component
│   │   ├── course-list/         # Course listing component
│   │   └── enroll-student/      # Enrollment form component
│   ├── services/
│   │   ├── student.service.ts   # Student data management
│   │   ├── course.service.ts    # Course data management
│   │   └── enrollment.service.ts # Enrollment data management
│   ├── models/
│   │   ├── student.model.ts     # Student interface & class
│   │   ├── course.model.ts      # Course interface & class
│   │   └── enrollment.model.ts  # Enrollment interface & class
│   ├── pipes/
│   │   ├── filter-by-name.pipe.ts
│   │   └── filter-by-department.pipe.ts
│   ├── directives/
│   │   ├── limited-seats-highlight.directive.ts
│   │   └── active-enrollment.directive.ts
│   ├── app.ts                   # Root component
│   ├── app.routes.ts            # Route configuration
│   └── app.config.ts            # Application configuration
├── assets/
│   └── data/
│       ├── students.json        # Mock student data
│       └── courses.json         # Mock course data
└── styles.css                   # Global styles
```

## Data Models

### Student Model
```typescript
interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  enrollmentDate: Date;
  phone?: string;
}
```

### Course Model
```typescript
interface Course {
  id: number;
  code: string;
  name: string;
  description: string;
  instructor: string;
  credits: number;
  maxSeats: number;
  enrolledStudents: number;
  schedule: string;
  department: string;
  availableSeats: number;        // Computed property
  isFullyEnrolled: boolean;      // Computed property
  enrollmentPercentage: number;  // Computed property
}
```

### Enrollment Model
```typescript
interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrollmentDate: Date;
  grade?: string;
  status: 'active' | 'completed' | 'dropped';
}
```

## Services

### StudentService
Manages all student-related data operations:
- Load students from JSON or mock data
- Get all students with real-time updates via Observable
- Get student by ID
- Add new student
- Update existing student
- Delete student

### CourseService
Manages all course-related data operations:
- Load courses from JSON or mock data
- Get all courses with real-time updates via Observable
- Get course by ID
- Add new course
- Update existing course
- Delete course
- Enroll student in course (updates seat count)

### EnrollmentService
Manages student enrollments:
- Get all enrollments
- Get enrollments by student
- Get enrollments by course
- Enroll student in course
- Drop course
- Check enrollment status

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | StudentListComponent | Redirects to /students |
| `/students` | StudentListComponent | View all students |
| `/courses` | CourseListComponent | Browse all courses |
| `/enroll` | EnrollStudentComponent | Enroll student in course |

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v11 or higher)
- Angular CLI (v21 or higher)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install @angular/material @angular/cdk
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Navigate to the application**
   ```
   http://localhost:4200
   ```

## Running the Application

### Development Server
```bash
npm start
# or
ng serve
```
The application will be available at `http://localhost:4200`

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

## Usage Guide

### Viewing Students
1. Click "Students" in the navigation bar
2. View the table of all registered students
3. See student details including enrollment date and contact information

### Browsing Courses
1. Click "Courses" in the navigation bar
2. View course cards with enrollment information
3. Check available seats and enrollment status
4. Visual indicators show capacity status:
   - Green: Plenty of seats available
   - Yellow: 70% or more filled
   - Red: 90% or more filled

### Enrolling a Student
1. Click "Enrollment" in the navigation bar
2. Select a student from the dropdown
3. Select an available course from the list
4. Click "Enroll Student" button
5. See success notification upon successful enrollment
6. Error message if course is full

## Custom Pipes Usage

### FilterByName Pipe
Filters items by name field:
```html
<div *ngFor="let item of items | filterByName: searchTerm">
  {{ item.name }}
</div>
```

### FilterByDepartment Pipe
Filters items by department field:
```html
<div *ngFor="let item of items | filterByDepartment: departmentName">
  {{ item.department }}
</div>
```

## Custom Directives Usage

### LimitedSeatsHighlight Directive
Highlights elements based on enrollment capacity:
```html
<div [appLimitedSeatsHighlight]="{ availableSeats: 5, maxSeats: 30 }">
  Course with limited seats
</div>
```

### ActiveEnrollment Directive
Highlights active enrollments:
```html
<div [appActiveEnrollment]="isActive">
  Active enrollment
</div>
```

## API Integration

### Mock Data
The application uses JSON files for mock data:
- `public/assets/data/students.json` - Student data
- `public/assets/data/courses.json` - Course data

Data is loaded via Angular's HttpClient and cached using RxJS BehaviorSubjects.

### Data Flow
```
Component
    ↓
Service (Observable)
    ↓
HttpClient / Mock Data
    ↓
Cache (BehaviorSubject)
    ↓
Component (subscription)
```

## Form Validation

### Enrollment Form
- **Student Field**: Required
- **Course Field**: Required
- **Validation Messages**: Show below invalid fields
- **Real-time Validation**: Validates on touch/change

## Responsive Design

The application is fully responsive:
- **Desktop**: Full-width layout with optimal spacing
- **Tablet**: Adjusted grid layout
- **Mobile**: Single-column layout, optimized touch targets

## Performance Considerations

1. **Lazy Loading**: Routes can be optimized for lazy loading
2. **Change Detection**: OnPush strategy can be implemented
3. **Memory Management**: Proper unsubscribe of observables
4. **Efficient Rendering**: trackBy functions in *ngFor

## Future Enhancements

1. **Authentication & Authorization**
   - User login / logout
   - Role-based access control

2. **Real API Integration**
   - Replace mock data with actual backend API
   - HTTP interceptors for global error handling

3. **Advanced Features**
   - Grade management
   - Course feedback and ratings
   - Schedule conflicts detection
   - Prerequisites checking

4. **UI/UX Improvements**
   - Angular Material components
   - Animations and transitions
   - Dark mode support
   - Accessible design (WCAG 2.1)

5. **Testing**
   - Unit tests with Jasmine/Karma
   - E2E tests with Cypress
   - Component testing

## Troubleshooting

### Port Already in Use
If port 4200 is busy:
```bash
ng serve --port 4201
```

### Module Not Found Errors
Ensure all dependencies are installed:
```bash
npm install
```

### CORS Issues
Mock data is served from the same origin, no CORS issues expected.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is provided as-is for educational purposes.

## Support

For issues or questions:
1. Check the documentation
2. Review the code structure
3. Check browser console for errors
4. Verify all dependencies are installed

## Project Statistics

- **Components**: 4 (Navbar, StudentList, CourseList, EnrollStudent)
- **Services**: 3 (Student, Course, Enrollment)
- **Models**: 3 (Student, Course, Enrollment)
- **Pipes**: 2 (FilterByName, FilterByDepartment)
- **Directives**: 2 (LimitedSeatsHighlight, ActiveEnrollment)
- **Routes**: 4 (/students, /courses, /enroll, /)
- **Mock Data Records**: 5 students, 6 courses, 5 enrollments

## Version History

### v1.0.0 (Initial Release)
- Core student management features
- Course listing and management
- Student enrollment functionality
- Custom pipes and directives
- Responsive design
- Form validation

---

**Last Updated**: March 2026  
**Angular Version**: v21.0.0  
**TypeScript Version**: v5.9.2
