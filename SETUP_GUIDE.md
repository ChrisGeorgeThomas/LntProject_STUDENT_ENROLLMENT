# Setup Guide - Student Enrollment System

## Quick Start Guide

### Step 1: Prerequisites Check

Ensure you have the following installed on your system:

```bash
# Check Node.js version (should be v18+)
node --version

# Check npm version (should be v11+)
npm --version

# Check Angular CLI (should be v21+)
ng version
```

If any tools are missing, install them:
- **Node.js & npm**: Visit https://nodejs.org/
- **Angular CLI**: Run `npm install -g @angular/cli@latest`

### Step 2: Project Dependencies

The project is configured with the following key dependencies:

```json
{
  "@angular/common": "^21.0.0",
  "@angular/compiler": "^21.0.0",
  "@angular/core": "^21.0.0",
  "@angular/forms": "^21.0.0",
  "@angular/platform-browser": "^21.0.0",
  "@angular/router": "^21.0.0",
  "@angular/ssr": "^21.0.0",
  "@angular/material": "^21.0.0",  // Added
  "@angular/cdk": "^21.0.0",       // Added
  "rxjs": "~7.8.0",
  "typescript": "~5.9.2"
}
```

### Step 3: Installation Steps

1. **Navigate to project directory**
   ```bash
   cd c:\Users\DELL\student-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Angular Material** (if not already done)
   ```bash
   npm install @angular/material @angular/cdk
   ```

4. **Verify installation**
   ```bash
   ng version
   ```

### Step 4: Start Development Server

```bash
npm start
# or
ng serve
```

Output should show:
```
✔ Compiled successfully.
⠙ Generating browser application bundles (6 of 6)...

Initial chunk files | Names           | Raw size | Gzip size
bundle.js           | main            | 400 kB   | 120 kB

Application bundle generation complete. [2.345 seconds]

Watch mode enabled. Watching for file changes in the workspace..
```

Visit: **http://localhost:4200**

## File Structure Overview

```
student-app/
├── public/
│   └── assets/
│       └── data/
│           ├── students.json      # Student mock data
│           └── courses.json       # Course mock data
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.ts      # Component logic
│   │   │   │   ├── navbar.html    # Template
│   │   │   │   └── navbar.css     # Styles
│   │   │   ├── student-list/
│   │   │   ├── course-list/
│   │   │   └── enroll-student/
│   │   ├── services/
│   │   │   ├── student.service.ts
│   │   │   ├── course.service.ts
│   │   │   └── enrollment.service.ts
│   │   ├── models/
│   │   │   ├── student.model.ts
│   │   │   ├── course.model.ts
│   │   │   └── enrollment.model.ts
│   │   ├── pipes/
│   │   │   ├── filter-by-name.pipe.ts
│   │   │   └── filter-by-department.pipe.ts
│   │   ├── directives/
│   │   │   ├── limited-seats-highlight.directive.ts
│   │   │   └── active-enrollment.directive.ts
│   │   ├── app.ts                 # Root component
│   │   ├── app.routes.ts          # Routing config
│   │   ├── app.config.ts          # App configuration
│   │   └── app.html               # Root template
│   ├── main.ts                    # Bootstrap file
│   ├── main.server.ts             # SSR bootstrap
│   ├── server.ts                  # Server configuration
│   └── styles.css                 # Global styles
├── angular.json                   # Angular CLI config
├── tsconfig.json                  # TypeScript config
├── package.json                   # Dependencies
├── README.md                       # Project overview
└── PROJECT_DOCUMENTATION.md       # Detailed documentation
```

## Key Configuration Files

### angular.json
- Defines build and serve configurations
- Asset and style paths
- Output structure
- Build options

### tsconfig.json
- TypeScript compiler options
- Module resolution
- Type checking settings

### app.config.ts
- Angular application configuration
- Provider setup (Router, HttpClient, etc.)
- Global providers

### app.routes.ts
- Application routing configuration
- Route definitions
- Redirects and default routes

## Component Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────┐
│                 HTTP Client                         │
│         (Fetch from JSON or Mock)                   │
└────────────────────┬────────────────────────────────┘
                     │
             ┌───────▼────────┐
             │    Service     │
             │  (Observable)  │
             └───────┬────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
    ┌───▼──┐    ┌───▼──┐    ┌───▼──┐
    │Comp1 │    │Comp2 │    │Comp3 │
    └──────┘    └──────┘    └──────┘

Components subscribe to service observables
Services manage data via BehaviorSubjects
```

## Running Different Commands

### Development Commands
```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode build
npm run watch
```

### Development Server Options
```bash
# Use different port
ng serve --port 4201

# Disable polling
ng serve --poll false

# Enable source maps
ng serve --source-map

# Production optimizations
ng serve --configuration=production
```

## Mock Data Format

### students.json
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@university.edu",
    "department": "Computer Science",
    "enrollmentDate": "2023-09-01",
    "phone": "555-0101"
  }
]
```

### courses.json
```json
[
  {
    "id": 1,
    "code": "CS101",
    "name": "Introduction to Computer Science",
    "description": "Learn the fundamentals of computer science",
    "instructor": "Dr. Sarah Miller",
    "credits": 3,
    "maxSeats": 30,
    "enrolledStudents": 28,
    "schedule": "MWF 10:00-11:00 AM",
    "department": "Computer Science"
  }
]
```

## Service Usage Examples

### Using StudentService
```typescript
import { StudentService } from './services/student.service';

constructor(private studentService: StudentService) {}

ngOnInit() {
  this.studentService.getStudents().subscribe(students => {
    console.log(students);
  });
}
```

### Using CourseService
```typescript
import { CourseService } from './services/course.service';

constructor(private courseService: CourseService) {}

ngOnInit() {
  this.courseService.getCourses().subscribe(courses => {
    this.courses = courses;
  });
}
```

### Using EnrollmentService
```typescript
import { EnrollmentService } from './services/enrollment.service';

constructor(private enrollmentService: EnrollmentService) {}

enrollStudent(studentId: number, courseId: number) {
  this.enrollmentService.enrollStudentInCourse(studentId, courseId);
}
```

## Building and Deployment

### Build for Production
```bash
ng build --configuration production
```

This creates `dist/student-app/` with optimized bundles.

### Serve Production Build Locally
```bash
ng serve --serve --configuration production
```

### Deploy to Server
```bash
# Standard web server (Nginx, Apache)
- Copy contents of dist/student-app/browser/ to web root

# Node.js server (includes SSR)
npm run serve:ssr:student-app
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Module Not Found
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 2. Port 4200 Already in Use
```bash
# Solution: Use different port
ng serve --port 4201
```

#### 3. Build Fails with Memory Error
```bash
# Solution: Increase Node memory
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

#### 4. Module Compilation Error
```bash
# Solution: Clear Angular cache
ng cache clean
# or
rm -rf .angular
npm run build
```

#### 5. CORS Issues
Solution: Not applicable - mock data is local

#### 6. Service Data Not Loading
Check:
- Browser developer tools (F12)
- Network tab for `/assets/data/` files
- Console for error messages
- Verify JSON file paths in services

## Development Tips

### 1. Hot Module Replacement
Angular's dev server automatically reloads on file changes. Just save and refresh!

### 2. Debugging
```bash
# In Chrome DevTools:
# - Sources tab to view TypeScript
# - Console for logs
# - Network tab to inspect requests

console.log('Debug:', variable);
```

### 3. Code Navigation
```bash
# Go to definition
Ctrl + Click on symbol

# Find all references
Ctrl + Shift + H (VS Code)

# Go to line
Ctrl + G
```

### 4. Formatting
```bash
# Format on save
VS Code: Enable "Format on Save"

# Prettier installed
npm install -g prettier
prettier --write src/
```

### 5. Linting
Angular project includes ESLint configuration. Check for issues:
```bash
ng lint
```

## Next Steps

1. **Run the application**
   ```bash
   npm start
   ```

2. **Navigate through pages**
   - Go to Students page
   - Go to Courses page
   - Try enrolling a student

3. **Explore the code**
   - Study component structure
   - Review service patterns
   - Check routing setup

4. **Make modifications**
   - Add new properties to models
   - Create new components
   - Enhance styling

5. **Test features**
   - Verify form validation
   - Test navigation
   - Check data persistence

## Performance Monitoring

### Check Bundle Size
```bash
ng build --stats-json
npm install -g webpack-bundle-analyzer
webpack-bundle-analyzer dist/student-app/browser/stats.json
```

### Monitor Performance
Use Chrome DevTools:
- Lighthouse (Performance, Accessibility, SEO)
- Network tab for load time
- Performance tab for runtime performance

## Additional Resources

- **Angular Documentation**: https://angular.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **RxJS Guide**: https://rxjs.dev/guide/overview
- **Angular CLI**: https://angular.dev/tools/cli

## Support

If you encounter issues:
1. Check PROJECT_DOCUMENTATION.md for detailed info
2. Review the code comments and structure
3. Check browser console for error messages
4. Verify all dependencies are installed correctly

---

**Setup Last Updated**: March 2026
