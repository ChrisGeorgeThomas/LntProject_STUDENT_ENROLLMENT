/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';

import { student } from './student';

describe('Student Service', () => {
  let service: student;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(student);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return students as observable', (done) => {
    service.getStudents().subscribe(students => {
      expect(students.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should return courses as observable', (done) => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should enroll student in course', (done) => {
    service.getEnrollments().subscribe(enrollments => {
      const initialCount = enrollments.length;
      const result = service.enrollStudent(1, 103);
      expect(result).toBe(true);
      done();
    });
  });
});

