/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollStudent } from './enroll-student';
import { student } from '../../services/student';

describe('EnrollStudent Component', () => {
  let component: EnrollStudent;
  let fixture: ComponentFixture<EnrollStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollStudent],
      providers: [student]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollStudent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
