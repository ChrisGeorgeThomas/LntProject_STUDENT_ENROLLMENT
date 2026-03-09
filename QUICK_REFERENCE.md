# Quick Reference Guide

## Quick Start

### Installation & Running
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Navigate to
http://localhost:4200
```

## Main Pages

| Page | Route | Features |
|------|-------|----------|
| **Students** | `/students` | View all registered students with details |
| **Courses** | `/courses` | Browse available courses with enrollment info |
| **Enrollment** | `/enroll` | Enroll students in available courses |

## Key Components

### StudentListComponent
- **File**: `src/app/components/student-list/`
- **Purpose**: Display all students in table format
- **Services Used**: StudentService
- **Features**: Student listing, enrollment count

### CourseListComponent
- **File**: `src/app/components/course-list/`
- **Purpose**: Display available courses as cards
- **Services Used**: CourseService
- **Features**: Course details, enrollment bars, capacity indicators

### EnrollStudentComponent
- **File**: `src/app/components/enroll-student/`
- **Purpose**: Handle student course enrollment
- **Services Used**: StudentService, CourseService, EnrollmentService
- **Features**: Reactive form, validation, notifications

### NavBarComponent
- **File**: `src/app/components/navbar/`
- **Purpose**: Main navigation
- **Links**: /students, /courses, /enroll

## Data Models

### Student
```typescript
{
  id: number;
  name: string;
  email: string;
  department: string;
  enrollmentDate: Date;
  phone?: string;
}
```

### Course
```typescript
{
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
  
  // Computed properties:
  availableSeats: number;      // maxSeats - enrolledStudents
  isFullyEnrolled: boolean;    // enrolledStudents >= maxSeats
  enrollmentPercentage: number; // (enrolledStudents / maxSeats) * 100
}
```

### Enrollment
```typescript
{
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
```typescript
loadStudents()                    // Load students from JSON or mock
getStudents()                     // Get Observable of all students
getStudentById(id)                // Get single student by ID
addStudent(student)               // Add new student
updateStudent(student)            // Update existing student
deleteStudent(id)                 // Delete student
```

### CourseService
```typescript
loadCourses()                     // Load courses from JSON or mock
getCourses()                      // Get Observable of all courses
getCourseById(id)                 // Get single course by ID
addCourse(course)                 // Add new course
updateCourse(course)              // Update existing course
deleteCourse(id)                  // Delete course
enrollStudent(courseId)           // Increment enrollment count
```

### EnrollmentService
```typescript
getEnrollments()                  // Get all enrollments
getEnrollmentsByStudent(studentId)
getEnrollmentsByCourse(courseId)
enrollStudentInCourse(studentId, courseId)
dropCourse(enrollmentId)
```

## Custom Pipes

### FilterByName
Filters array by name field (case-insensitive)
```html
<div *ngFor="let item of items | filterByName: searchTerm">
  {{ item.name }}
</div>
```

### FilterByDepartment
Filters array by department field (case-insensitive)
```html
<div *ngFor="let item of items | filterByDepartment: 'Computer Science'">
  {{ item.name }}
</div>
```

## Custom Directives

### LimitedSeatsHighlight
Highlights elements based on enrollment capacity
```html
<div [appLimitedSeatsHighlight]="{ availableSeats: 5, maxSeats: 30 }">
  Content
</div>
```

Color Coding:
- **Green**: < 70% utilized
- **Yellow**: 70-89% utilized
- **Red**: 90%+ utilized

### ActiveEnrollment
Applies bottom border to active enrollments
```html
<div [appActiveEnrollment]="isActive">
  Active enrollment
</div>
```

## Routes

```typescript
/               → redirects to /students
/students       → StudentListComponent
/courses        → CourseListComponent
/enroll         → EnrollStudentComponent
```

## Common Tasks

### View All Students
1. Click "Students" in navbar
2. Browse student table
3. See all enrolled students

### Browse Courses
1. Click "Courses" in navbar
2. View course cards
3. Check available seats and enrollment status

### Enroll a Student
1. Click "Enrollment" in navbar
2. Select student from dropdown
3. Select course from dropdown
4. Click "Enroll Student"
5. See success message

### Check Course Capacity
1. Go to Courses page
2. Look at progress bar on course card
3. Check enrollment status (Available/Fully Enrolled)
4. Read "X / Y Enrolled" text

## Form Validation

### Enrollment Form
- **Student**: Required field
- **Course**: Required field
- Disabled options: Fully-booked courses
- Validation messages: Show below fields
- Submit button: Only enabled when form is valid

## Styling

### Color Scheme
- **Primary**: #1976d2 (Blue) - Navbar, buttons
- **Success**: #4caf50 (Green) - Available seats, success messages
- **Warning**: #ff9800 (Orange) - Moderate utilization
- **Error**: #f44336 (Red) - Errors, fully enrolled
- **Background**: #f5f5f5 (Light Gray)
- **Text**: #333 (Dark Gray)

### Responsive Breakpoints
- **Desktop**: Full layout (>1024px)
- **Tablet**: Adjusted grid (768px-1024px)
- **Mobile**: Single column (<768px)

## File Locations

```
Key Files:
├── src/app/app.ts                    # Root component
├── src/app/app.routes.ts            # All routes
├── src/app/app.config.ts            # App config
├── src/main.ts                      # Bootstrap file
├── src/styles.css                   # Global styles
├── public/assets/data/students.json # Student data
├── public/assets/data/courses.json  # Course data
├── PROJECT_DOCUMENTATION.md         # Full docs
├── SETUP_GUIDE.md                   # Setup instructions
├── ARCHITECTURE.md                  # Technical details
└── README.md                        # Overview
```

## Common Commands

```bash
# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Check for errors
ng lint

# Format code
ng format
```

## Tips & Tricks

1. **Hot Reload**: Changes auto-reload in dev mode
2. **DevTools**: F12 → Sources tab to debug TypeScript
3. **Network**: Check Network tab for data loading
4. **Unsubscribe**: Services handle subscriptions automatically
5. **Type Safety**: Use interfaces for better IDE support

## Mock Data

### Students (5 records)
- John Doe (CS)
- Jane Smith (Engineering)
- Mike Johnson (Business)
- Sarah Williams (CS)
- David Brown (Mathematics)

### Courses (6 records)
- CS101: Intro to CS
- CS202: Data Structures
- MATH101: Calculus I
- ENG101: English Composition
- PHY201: Physics II
- BUS101: Business Fundamentals

### Enrollments (5 records)
- John → CS101, CS202
- Jane → CS101, MATH101
- Mike → ENG101
- Plus more...

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 4200 in use | `ng serve --port 4201` |
| Module not found | `npm install` |
| Compilation error | Check `ng lint` output |
| Data not loading | Check `/assets/data/` files exist |
| Service not injecting | Verify `providedIn: 'root'` |
| Form not validating | Check `Validators.required` |

## Next Learning Steps

1. Study Angular official documentation
2. Explore RxJS operators (map, filter, etc.)
3. Add more components and features
4. Implement real API integration
5. Add unit and E2E tests
6. Implement state management (NgRx)

## Resources

- **Angular**: https://angular.dev
- **TypeScript**: https://www.typescriptlang.org
- **RxJS**: https://rxjs.dev
- **Angular Material**: https://material.angular.io
- **Tailwind CSS**: https://tailwindcss.com

## Project Statistics

- **Total Components**: 4
- **Total Services**: 3
- **Total Models**: 3
- **Total Pipes**: 2
- **Total Directives**: 2
- **Total Routes**: 4
- **Mock Data Records**: 5 + 6 + 5 = 16
- **Lines of Code**: ~3500+
- **Documentation Pages**: 3+

---

**Quick Reference v1.0**  
Last Updated: March 2026
