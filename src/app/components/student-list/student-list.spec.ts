/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentList } from './student-list';
import { student } from '../../services/student';

describe('StudentList Component', () => {
  let component: StudentList;
  let fixture: ComponentFixture<StudentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentList],
      providers: [student]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
