# Architecture Overview

## System Architecture

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    Angular Application                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              Root Component (App)                    │ │
│  │                                                       │ │
│  │  ┌────────────────────────────────────────────────┐ │ │
│  │  │  NavBar Component                              │ │ │
│  │  │  - Navigation Links to /students, /courses... │ │ │
│  │  └────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  ┌────────────────────────────────────────────────┐ │ │
│  │  │         Router Outlet (Dynamic)               │ │ │
│  │  │                                                │ │ │
│  │  │  ┌──────────────────────────────────────────┐ │ │
│  │  │  │ StudentListComponent                     │ │ │
│  │  │  │ CourseListComponent                      │ │ │
│  │  │  │ EnrollStudentComponent                   │ │ │
│  │  │  └──────────────────────────────────────────┘ │ │
│  │  └────────────────────────────────────────────────┘ │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌──────────┐  ┌───────────┐  ┌────────────────┐         │
│  │ Services │  │   Models  │  │ Pipes/Dirs     │         │
│  ├──────────┤  ├───────────┤  ├────────────────┤         │
│  │ Student  │  │ Student   │  │FilterByName    │         │
│  │ Course   │  │ Course    │  │LimitedSeats    │         │
│  │Enrollment│  │Enrollment │  │ActiveEnroll    │         │
│  └──────────┘  └───────────┘  └────────────────┘         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │           Data Source (Mock JSON)                   │ │
│  │  - students.json                                    │ │
│  │  - courses.json                                     │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
AppComponent (Root)
│
├── NavBarComponent (Standalone)
│
└── RouterOutlet (Dynamic Content)
    │
    ├── StudentListComponent
    │   ├── Template
    │   ├── Logic
    │   └── Styles
    │
    ├── CourseListComponent
    │   ├── Template
    │   ├── Logic
    │   └── Styles
    │
    └── EnrollStudentComponent
        ├── ReactiveForm
        ├── Template
        ├── Logic
        └── Styles
```

## Data Flow Architecture

### 1. Service-Based Data Management

```
┌─────────────────────────────────────────────────────────┐
│              Component                                   │
├─────────────────────────────────────────────────────────┤
│  ngOnInit() {                                            │
│    this.service.getData().subscribe(data => {           │
│      this.items = data;  // Update component state      │
│    });                                                  │
│  }                                                       │
└─────────────────────────────────────────────────────────┘
                        │ Injects
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Service                                     │
├─────────────────────────────────────────────────────────┤
│  private dataSubject = new BehaviorSubject([]);        │
│  public data$ = this.dataSubject.asObservable();       │
│                                                         │
│  getData(): Observable<Data[]> {                       │
│    return this.data$;  // Return shared observable    │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
                        │ Subscribes to
                        ▼
┌─────────────────────────────────────────────────────────┐
│              Data Source                                │
├─────────────────────────────────────────────────────────┤
│  - HttpClient (loads from JSON)                        │
│  - Mock data (fallback)                                │
│  - Local state (updated)                               │
└─────────────────────────────────────────────────────────┘
```

### 2. Reactive Flow with Observables

```
User Action
    │
    ▼
Component Method (submitEnrollment)
    │
    ├─→ Validate Form
    │
    ├─→ Call Service Methods
    │   ├─→ enrollmentService.enrollStudentInCourse()
    │   └─→ courseService.enrollStudent()
    │
    ├─→ Update Component State
    │   ├─→ successMessage
    │   └─→ errorMessage
    │
    ▼
Template Update (Automatic via Change Detection)
    │
    ▼
User Sees Result
```

## Service Architecture

### StudentService Structure

```typescript
StudentService {
  // Private State
  - apiUrl: string
  - studentsSubject: BehaviorSubject<Student[]>
  
  // Public Observables
  + students$: Observable<Student[]>
  
  // Public Methods
  + loadStudents(): void
  + getStudents(): Observable<Student[]>
  + getStudentById(id): Observable<Student>
  + addStudent(student): void
  + updateStudent(student): void
  + deleteStudent(id): void
  
  // Private Methods
  - getMockStudents(): Student[]
}
```

### Data Caching Strategy

```
Load Data
    │
    ▼
Check Cache (BehaviorSubject)
    │
    ├─→ Data Exists
    │   └─→ Emit from Cache
    │
    └─→ Data Not Exists
        ├─→ Call HttpClient
        ├─→ Update Cache
        └─→ Emit Updated Data
```

## Routing Architecture

### Route Configuration

```typescript
routes: Routes = [
  {
    path: 'students',
    component: StudentListComponent
    // Lazy loading can be added
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
]
```

### Navigation Flow

```
NavBar Click
    │
    ▼
routerLink="/students"
    │
    ▼
Router matches route
    │
    ▼
StudentListComponent loads
    │
    ▼
Component ngOnInit()
    │
    ▼
Service fetches data
    │
    ▼
Observable updates
    │
    ▼
Template renders
    │
    ▼
User sees StudentList page
```

## Form Architecture

### Reactive Form Flow

```
┌──────────────────────────────────────────────┐
│      Template (Reactive Form)                │
│                                              │
│  <form [formGroup]="enrollmentForm">        │
│    <select formControlName="studentId">     │
│    <select formControlName="courseId">      │
│    <button (ngSubmit)="submitEnrollment">   │
│  </form>                                    │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│         FormGroup (Component)                │
│                                              │
│  enrollmentForm = this.formBuilder.group({   │
│    studentId: ['', Validators.required],    │
│    courseId: ['', Validators.required]      │
│  })                                         │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│     Validation & State Management            │
│                                              │
│  - Check validity                           │
│  - Emit valueChanges                        │
│  - Provide statusChanges                    │
└──────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────┐
│         Form Submission                      │
│                                              │
│  submitEnrollment() {                       │
│    if (enrollmentForm.valid) {              │
│      // Process enrollment                  │
│    }                                        │
│  }                                          │
└──────────────────────────────────────────────┘
```

## Dependency Injection Architecture

```
┌────────────────────────────────────────────┐
│         Application Config                 │
│  (app.config.ts)                           │
├────────────────────────────────────────────┤
│  providers: [                              │
│    provideRouter(routes),                  │
│    provideHttpClient(),                    │
│    provideBrowserGlobalErrorListeners(),   │
│    provideClientHydration(...)             │
│  ]                                         │
└────────────────────────────────────────────┘
            │
            ├─→ Global Providers
            │
            ▼
┌────────────────────────────────────────────┐
│         Service (providedIn: 'root')       │
│                                            │
│  Constructor Injection:                    │
│  constructor(private http: HttpClient)    │
└────────────────────────────────────────────┘
            │
            ├─→ Singleton instance
            │
            ▼
┌────────────────────────────────────────────┐
│         Component                          │
│                                            │
│  Constructor Injection:                    │
│  constructor(private service: Service)    │
└────────────────────────────────────────────┘
```

## State Management Pattern

### Observable Pattern (Reactive)

```
Component Layer
    │   ▲
    │   │
    ├─→ subscribe()
    │   ├── Receiving Data
    │   └── Automatic Updates
    │
Service Layer
    │   ▲
    │   │
    ├─→ BehaviorSubject
    │   ├── Current State
    │   └── New Values
    │
Data Layer
    │   
    ├─→ HttpClient
    │   ├── Fetch
    │   └── Mock Data
```

### Data Update Flow

```
1. User Action
   │
2. Service Method Called
   ├─→ Update Internal State
   ├─→ Emit New Value
   │
3. Component Subscribed
   ├─→ Receives New Data
   ├─→ Updates Component State
   │
4. Change Detection
   ├─→ Detects Data Change
   ├─→ Marks for Check
   │
5. Template Update
   ├─→ Re-renders
   ├─→ Shows New Data
```

## Error Handling Architecture

```
Try to Fetch Data
    │
    ├─→ Success
    │   └─→ Update BehaviorSubject
    │       └─→ Emit Data to Components
    │
    └─→ Error
        ├─→ Log Error
        ├─→ Fallback to Mock Data
        └─→ Emit Fallback Data to Components
```

## Custom Features Architecture

### Pipes

```
Data Input
    │
    ▼
FilterByName Pipe
    │
    ├─→ Check searchTerm
    ├─→ Filter items by name
    │
    ▼
Filtered Output
```

### Directives

```
Element Directive Applied
    │
    ▼
LimitedSeatsHighlight (@Input binding)
    │
    ├─→ Calculate occupancy
    ├─→ Apply styles
    │   ├── Red (90%+)
    │   ├── Yellow (70%+)
    │   └── Green (<70%)
    │
    ▼
Styled Element
```

## Performance Optimization Strategies

### 1. Change Detection
```typescript
// OnPush Strategy (Optional Enhancement)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 2. Lazy Loading (Future)
```typescript
// Routes can be lazy loaded
const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent)
  }
]
```

### 3. Memory Management
```typescript
ngOnDestroy() {
  // Unsubscribe when component is destroyed
  this.subscription?.unsubscribe();
}
```

## Build Optimization

### Production Build Process

```
Index.html
    │
    ├─→ Main Bundle (app code)
    ├─→ Vendor Bundle (Angular, RxJS)
    └─→ Styles Bundle (CSS)
        │
        ▼
    Minification
        │
        ▼
    Tree Shaking
        │
        ▼
    Compression
        │
        ▼
    Optimized Output
        └─→ dist/student-app/
```

## Security Considerations

### 1. Input Validation
- Form validation on client-side
- Type safety via TypeScript
- Sanitization via Angular templates

### 2. Data Protection
- HttpClient for safe HTTP operations
- No sensitive data in localStorage (currently)
- CORS handled by same-origin policy

### 3. Template Security
- Angular's built-in XSS protection
- No use of innerHTML/bypassSecurityTrustHtml
- Safe property binding

## Scalability Considerations

### For Growth

1. **Multiple Features**
   - More components/modules
   - Feature-based folder structure
   - Shared module for common utilities

2. **Real Backend**
   - Replace mock data with API
   - Add HTTP interceptors
   - Implement error handling

3. **State Management**
   - Consider NgRx for complex state
   - Or Akita for simpler cases

4. **Testing**
   - Unit tests (Jasmine)
   - E2E tests (Cypress)
   - Integration tests

## Technology Stack Justification

| Technology | Purpose | Why Chosen |
|-----------|---------|-----------|
| Angular 21 | Framework | Latest, stable, feature-rich |
| TypeScript | Language | Type safety, better tooling |
| RxJS | Reactive | Powerful async handling |
| Standalone Components | Architecture | Simplified, modern approach |
| HTTP Client | Data Fetching | Built-in, secure, optimized |
| Reactive Forms | Forms | More powerful, testable |
| Custom Directives | Functionality | Reusable, maintainable |
| Custom Pipes | Transformations | Clean, readable templates |

---

**Architecture Document**  
Version: 1.0  
Last Updated: March 2026
